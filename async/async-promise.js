// fsモジュールのpromiseを取り込む
const fs = require('fs/promises');

console.log('async1:読み込み開始');

fs.readFile('./async/async1.txt', 'utf-8')
    .then(data1 => {
        console.log(`async1の内容: ${data1}`);

        console.log(`async2:読み込み開始`);
        return fs.readFile('./async/async2.txt', 'utf-8');
    })
    .then(data2 => {
        console.log(`async2の内容: ${data2}`);

        console.log(`async3:読み込み開始`);
        return fs.readFile('./async/async3.txt', 'utf-8');
    })
    .then(data3 => {
        console.log(`async3の内容: ${data3}`);
    })
    .catch(err => {
        console.log(`エラー発生: ${err}`);
    });

// ファイルの読み込みの完了を待たずに先に進む
console.log(`ファイルの読み込みを待たずに処理を行います。`);