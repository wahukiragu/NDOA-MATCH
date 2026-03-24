// inject.js — committed to GitHub, contains NO keys
const fs     = require('fs');
const pk     = process.env.NM_PK     || '';
const zapier = process.env.NM_ZAPIER || '';

const content = `window.__NM_PK__ = '${pk}';\nwindow.__NM_ZAPIER__ = '${zapier}';\n`;
fs.writeFileSync('inject-config.js', content);
console.log('Config injected successfully.');
