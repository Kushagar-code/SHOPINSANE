const fs = require('fs');
const path = require('path');

const vercelDir = path.join(__dirname, '.vercel');
if (!fs.existsSync(vercelDir)) {
  fs.mkdirSync(vercelDir);
}

fs.writeFileSync(
  path.join(vercelDir, 'project.json'),
  JSON.stringify({ projectId: 'dummy', orgId: 'dummy' }),
  'utf8'
);
console.log('Created dummy .vercel/project.json to allow offline vercel build');
