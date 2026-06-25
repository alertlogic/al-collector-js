'use strict';

const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');

const packageJsonPath = path.join(__dirname, '..', 'package.json');
const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
const overrides = packageJson.overrides || {};
const names = Object.keys(overrides);

if (!names.length) {
  console.log('No npm overrides defined...');
  process.exit(0);
}

let changed = false;

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
    const latest = execFileSync('npm', ['view', `${name}@${current}`, 'version', '--json'], {
      encoding: 'utf8'
    }).trim().replace(/"/g, '');
    const next = `${prefixMatch[0]}${latest}`;

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