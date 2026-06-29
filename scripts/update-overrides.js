'use strict';

const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');

const packageJsonPath = path.join(__dirname, '..', 'package.json');
const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
const overrides = packageJson.overrides || {};

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

function getAuditReport() {
  try {
    const raw = execFileSync('npm', ['audit', '--json'], { encoding: 'utf8' }).trim();
    return parseJson(raw);
  } catch (error) {
    const raw = (error && error.stdout ? String(error.stdout) : '').trim();
    return parseJson(raw);
  }
}

let changed = false;

const auditReport = getAuditReport();
const vulnerabilities = auditReport && typeof auditReport === 'object' ? (auditReport.vulnerabilities || {}) : {};

for (const [name, vuln] of Object.entries(vulnerabilities)) {
  if (Object.prototype.hasOwnProperty.call(overrides, name)) {
    continue;
  }

  try {
    let targetVersion = null;
    const fix = vuln && vuln.fixAvailable;

    if (fix && typeof fix === 'object' && !Array.isArray(fix) && fix.name === name && fix.version) {
      targetVersion = String(fix.version).trim();
    }

    if (!targetVersion) {
      targetVersion = resolveLatestVersion(name);
    }

    overrides[name] = `^${targetVersion}`;
    changed = true;
    console.log(`Added override ${name}: ^${targetVersion}`);
  } catch (error) {
    console.warn(`Skipping ${name}: ${error.message}`);
  }
}

const names = Object.keys(overrides);

for (const name of names) {
  const current = overrides[name];
  const prefixMatch = typeof current === 'string' ? current.match(/^[^0-9]*/) : null;

  if (typeof current !== 'string' || prefixMatch === null) {
    console.warn(`Skipping ${name}: unsupported override format.`);
    continue;
  }

  try {
    // Resolve latest version that still satisfies the current range to avoid
    // accidental breaking major jumps for tooling-sensitive overrides.
    const raw = execFileSync('npm', ['view', `${name}@${current}`, 'version', '--json'], {
      encoding: 'utf8'
    }).trim();
    let resolved = raw;

    try {
      resolved = JSON.parse(raw);
    } catch {
      // Keep raw text fallback for npm outputs that are not valid JSON.
    }

    const latest = Array.isArray(resolved) ? resolved[resolved.length - 1] : resolved;
    const normalizedLatest = String(latest).trim();

    if (!normalizedLatest || normalizedLatest === 'undefined') {
      throw new Error(`could not resolve latest version for ${name}@${current}`);
    }

    const next = `${prefixMatch[0]}${normalizedLatest}`;

    if (next !== current) {
      overrides[name] = next;
      changed = true;
      console.log(`${name}: ${current} -> ${next}`);
    } else {
      console.log(`${name}: ${current} (up to date)`);
    }
  } catch (error) {
    console.warn(`Skipping ${name}: ${error.message}`);
  }
}

if (!changed) {
  console.log('npm overrides already up to date.');
  process.exit(0);
}

packageJson.overrides = overrides;
fs.writeFileSync(packageJsonPath, `${JSON.stringify(packageJson, null, 2)}\n`);
console.log('Updated package.json overrides.');