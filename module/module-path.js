// pathモジュールのインポート
const path = require('path');

// ファイルパス
const filePath = './users/samurai/docs/file.txt';

console.log(path.basename(filePath));
console.log(path.dirname(filePath));
console.log(path.extname(filePath));

// パスを組み立てる
const fullPath = path.join('projects', 'webapp', 'assets', 'logo.png')
console.log(fullPath);