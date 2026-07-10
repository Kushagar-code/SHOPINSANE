const fs = require('fs');
const path = require('path');

const workerPath = path.join(__dirname, '.vercel', 'output', 'static', '_worker.js', 'index.js');

if (fs.existsSync(workerPath)) {
  console.log(`Reading worker file: ${workerPath}`);
  let content = fs.readFileSync(workerPath, 'utf8');
  let changed = false;

  // Replace import/require of "async_hooks" with "node:async_hooks"
  // Note: we target the exact string matches for async_hooks imports/requires
  if (content.includes('"async_hooks"') || content.includes("'async_hooks'")) {
    content = content.replace(/"async_hooks"/g, '"node:async_hooks"');
    content = content.replace(/'async_hooks'/g, "'node:async_hooks'");
    changed = true;
  }

  if (changed) {
    fs.writeFileSync(workerPath, content, 'utf8');
    console.log('Successfully patched async_hooks to node:async_hooks in _worker.js');
  } else {
    console.log('async_hooks reference not found in _worker.js or already patched.');
  }
} else {
  console.error(`Error: Worker file not found at ${workerPath}`);
  process.exit(1);
}
