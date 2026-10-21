const path = require('node:path');
const fs = require('node:fs');
const et = require('./excelExport');
const config = require('../config.json');
const sheetPath = path.resolve(__dirname, '..', config.sheetPath);
for (const file of fs.readdirSync(sheetPath).sort()) {
    if (/\.xlsx$/i.test(file) && !file.startsWith('~')) et.exportXlsxToTs(sheetPath, file);
}
