const fs = require('fs');
const path = require('path');

function walk(dir) {
  let results = [];
  if (!fs.existsSync(dir)) return results;
  const list = fs.readdirSync(dir);
  list.forEach((file) => {
    file = path.join(dir, file);
    const stat = fs.statSync(file);
    if (stat && stat.isDirectory()) {
      results = results.concat(walk(file));
    } else if (file.endsWith('.js')) {
      results.push(file);
    }
  });
  return results;
}

// We will patch files in both .vercel/output/functions AND .vercel/output/static/_worker.js
const targets = [
  path.join(__dirname, '.vercel', 'output', 'functions'),
  path.join(__dirname, '.vercel', 'output', 'static', '_worker.js')
];

let patchedCount = 0;

targets.forEach((targetDir) => {
  if (fs.existsSync(targetDir)) {
    console.log(`Scanning target directory: ${targetDir}`);
    const files = walk(targetDir);
    files.forEach((file) => {
      let content = fs.readFileSync(file, 'utf8');
      let changed = false;
      
      if (content.includes('"async_hooks"') || content.includes("'async_hooks'")) {
        content = content.replace(/"async_hooks"/g, '"node:async_hooks"');
        content = content.replace(/'async_hooks'/g, "'node:async_hooks'");
        changed = true;
      }
      
      if (changed) {
        fs.writeFileSync(file, content, 'utf8');
        console.log(`Patched async_hooks in: ${path.relative(__dirname, file)}`);
        patchedCount++;
      }
    });
  }
});

console.log(`Successfully patched ${patchedCount} files.`);
