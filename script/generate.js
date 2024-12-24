const fs = require('fs');
const path = require('path');

const metadataPath = path.join(__dirname, 'mate.json');
const metadata = JSON.parse(fs.readFileSync(metadataPath, 'utf8'));

const devScriptPath = path.join(__dirname, 'dev.js');
const devScriptContent = fs.readFileSync(devScriptPath, 'utf8');

function generateUserScriptMeta(metadata) {
  let meta = '';
  for (const [key, value] of Object.entries(metadata)) {
    if (typeof value !== 'string') {
      for (const item of value) {
        meta += `// @${key.padEnd(15)} ${item}\n`;
      }
      continue;
    }

    meta += `// @${key.padEnd(15)} ${value}\n`;
  }
  return '// ==UserScript==\n' + meta + '// ==/UserScript==\n';
}

const userScriptMeta = generateUserScriptMeta(metadata);
const fullScriptContent = `${userScriptMeta}\n\n${devScriptContent}`;

const outputFilePath = path.join(__dirname, '..', 'main.user.js');
fs.writeFileSync(outputFilePath, fullScriptContent, 'utf8');

console.log('main.user.js 文件已成功生成！');
