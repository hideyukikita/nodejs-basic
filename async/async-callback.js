// fsモジュールを取り込む
const fs = require('fs');

// ファイルを読み込む
console.error(`ファイル読み込みを開始します。`);
fs.readFile('hello.js', 'utf-8', (err, data) => {
    // エラーが発生していたらエラー情報を出力
    if(err){
        console.error(`読み込みエラー:${err}`);
        return;
    }

    // ファイルの内容出力
    console.log(data);
});

// ファイルの読み込み完了を待たずに先に進む
console.log(`ファイルの読み込みを待たずに処理を行います。`);