const fs = require('fs');
const path = require('path');

function walk(dir) {
  let results = [];
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

const functionsDir = path.join(__dirname, '.vercel', 'output', 'functions');
if (fs.existsSync(functionsDir)) {
  const files = walk(functionsDir);
  let patchedCount = 0;
  files.forEach((file) => {
    let content = fs.readFileSync(file, 'utf8');
    let changed = false;
    
    if (content.includes('"async_hooks"') || content.includes("'async_hooks'")) {
      content = content.replace(/"async_hooks"/g, '"node:async_hooks"');
      content = content.replace(/'async_hooks'/g, "'node:async_hooks'");
      changed = true;
    }
    
    if (changed) {
      console.log(`Patched async_hooks in: ${path.relative(__dirname, file)}`);
      fs.writeFileSync(file, content, 'utf8');
      patchedCount++;
    }
  });
  console.log(`Successfully patched ${patchedCount} files.`);
} else {
  console.log('No .vercel/output/functions directory found');
}
