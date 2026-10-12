'use strict';

const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');

const packageJsonPath = path.join(__dirname, '..', 'package.json');
const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
const overrides = packageJson.overrides || {};
const directDependencies = new Set([
  ...Object.keys(packageJson.dependencies || {}),
  ...Object.keys(packageJson.devDependencies || {}),
  ...Object.keys(packageJson.optionalDependencies || {}),
  ...Object.keys(packageJson.peerDependencies || {})
]);

function parseJson(raw) {
  try {
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

function resolveLatestVersion(name) {
  const raw = execFileSync('npm', ['view', name, 'version', '--json'], {
    encoding: 'utf8'
  }).trim();
  const parsed = parseJson(raw);
  const latest = Array.isArray(parsed) ? parsed[parsed.length - 1] : parsed || raw.replace(/"/g, '');
  const normalized = String(latest).trim();

  if (!normalized || normalized === 'undefined') {
    throw new Error(`could not resolve latest version for ${name}`);
  }

  return normalized;
}

function resolveLatestVersionForRange(name, range) {
  const raw = execFileSync('npm', ['view', `${name}@${range}`, 'version', '--json'], {
    encoding: 'utf8'
  }).trim();
  const parsed = parseJson(raw);
  const latest = Array.isArray(parsed) ? parsed[parsed.length - 1] : parsed || raw.replace(/"/g, '');
  const normalized = String(latest).trim();

  if (!normalized || normalized === 'undefined') {
    throw new Error(`could not resolve latest version for ${name}@${range}`);
  }

  return normalized;
}

function isUpdatableSpec(spec) {
  if (typeof spec !== 'string') {
    return false;
  }

  const normalized = spec.trim();
  if (!normalized) {
    return false;
  }

  return !/^(file:|link:|workspace:|git\+|github:|https?:|npm:)/i.test(normalized);
}

function updateDependencyMap(sectionName, dependencies) {
  if (!dependencies || typeof dependencies !== 'object') {
    return;
  }

  for (const [name, current] of Object.entries(dependencies)) {
    if (!isUpdatableSpec(current)) {
      continue;
    }

    try {
      const prefixMatch = current.match(/^[^0-9]*/);
      const prefix = prefixMatch ? prefixMatch[0] : '';

      let resolvedVersion;
      try {
        resolvedVersion = resolveLatestVersionForRange(name, current);
      } catch {
        resolvedVersion = resolveLatestVersion(name);
      }

      const next = `${prefix}${resolvedVersion}`;

      if (next !== current) {
        dependencies[name] = next;
        changed = true;
        console.log(`Updated ${sectionName} ${name}: ${current} -> ${next}`);
      }
    } catch (error) {
      console.warn(`Skipping ${sectionName} ${name}: ${error.message}`);
    }
  }
}

function getAuditReport() {
  try {
    const raw = execFileSync('npm', ['audit', '--json'], { encoding: 'utf8' }).trim();
    return parseJson(raw);
  } catch (error) {
    const raw = (error && error.stdout ? String(error.stdout) : '').trim();
    return parseJson(raw);
  }
}

function getParentPackages(nodes, dependencyName) {
  if (!Array.isArray(nodes)) {
    return [];
  }

  const parents = new Set();

  for (const nodePath of nodes) {
    if (typeof nodePath !== 'string') {
      continue;
    }

    const parts = nodePath
      .split('/node_modules/')
      .filter(Boolean)
      .map((part) => part.replace(/^node_modules\//, ''));
    if (parts.length < 2) {
      continue;
    }

    const child = parts[parts.length - 1];
    const parent = parts[parts.length - 2];

    if (child === dependencyName && parent) {
      parents.add(parent);
    }
  }

  return Array.from(parents);
}

function hasDirectAdvisory(vuln, dependencyName) {
  if (!vuln || !Array.isArray(vuln.via)) {
    return false;
  }

  return vuln.via.some((entry) => {
    return entry && typeof entry === 'object' && !Array.isArray(entry) && entry.name === dependencyName;
  });
}

let changed = false;

updateDependencyMap('dependency', packageJson.dependencies);
updateDependencyMap('devDependency', packageJson.devDependencies);

for (const name of Object.keys(overrides)) {
  const current = overrides[name];

  if (name.startsWith('node_modules/')) {
    delete overrides[name];
    changed = true;
    console.log(`Removed invalid override key ${name}`);
    continue;
  }

  if (directDependencies.has(name) && typeof current === 'string') {
    // npm rejects direct dependency string overrides, but scoped object overrides are valid.
    delete overrides[name];
    changed = true;
    console.log(`Removed direct dependency override ${name}`);
  }
}

const auditReport = getAuditReport();
const vulnerabilities = auditReport && typeof auditReport === 'object' ? (auditReport.vulnerabilities || {}) : {};

for (const [name, vuln] of Object.entries(vulnerabilities)) {
  try {
    if (!hasDirectAdvisory(vuln, name)) {
      continue;
    }

    const targetVersion = resolveLatestVersion(name);
    const nextValue = `^${targetVersion}`;

    if (directDependencies.has(name)) {
      const parents = getParentPackages(vuln && vuln.nodes, name);

      for (const parent of parents) {
        const parentOverride = overrides[parent];
        if (parentOverride && typeof parentOverride !== 'object') {
          console.warn(`Skipping ${parent}>${name}: parent override is not an object.`);
          continue;
        }

        const scoped = parentOverride || {};
        if (scoped[name] !== nextValue) {
          scoped[name] = nextValue;
          overrides[parent] = scoped;
          changed = true;
          console.log(`Added scoped override ${parent}>${name}: ${nextValue}`);
        }
      }

      continue;
    }

    if (overrides[name] !== nextValue) {
      overrides[name] = nextValue;
      changed = true;
      console.log(`Updated override ${name}: ${nextValue}`);
    }
  } catch (error) {
    console.warn(`Skipping ${name}: ${error.message}`);
  }
}

function bumpOverrideSpec(label, name, current, useAbsoluteLatest) {
  const prefixMatch = typeof current === 'string' ? current.match(/^[^0-9]*/) : null;

  if (typeof current !== 'string' || prefixMatch === null) {
    console.warn(`Skipping ${label}: unsupported override format.`);
    return current;
  }

  try {
    // Top-level advisory pins use the absolute latest so they can leave a
    // still-vulnerable range. Nested pins are compatibility exceptions and
    // stay within their declared range.
    let normalizedLatest;
    if (useAbsoluteLatest) {
      normalizedLatest = resolveLatestVersion(name);
    } else {
      normalizedLatest = resolveLatestVersionForRange(name, current);
    }
    const next = `${prefixMatch[0]}${normalizedLatest}`;

    if (next !== current) {
      changed = true;
      console.log(`${label}: ${current} -> ${next}`);
      return next;
    }

    console.log(`${label}: ${current} (up to date)`);
    return current;
  } catch (error) {
    console.warn(`Skipping ${label}: ${error.message}`);
    return current;
  }
}

for (const name of Object.keys(overrides)) {
  const current = overrides[name];

  if (current && typeof current === 'object' && !Array.isArray(current)) {
    for (const [childName, childSpec] of Object.entries(current)) {
      current[childName] = bumpOverrideSpec(`${name}>${childName}`, childName, childSpec, false);
    }
    continue;
  }

  overrides[name] = bumpOverrideSpec(name, name, current, true);
}

if (!changed) {
  console.log('npm overrides already up to date.');
  process.exit(0);
}

packageJson.overrides = overrides;
fs.writeFileSync(packageJsonPath, `${JSON.stringify(packageJson, null, 2)}\n`);
console.log('Updated package.json overrides.');
