const request = require('supertest');

// テスト対象をインポート
const { app, canLogin } = require('./app');

// 関数を呼び出し、戻り値が期待通りか検証(Jest)
describe('【単体テスト】canLogin関数', () => {
    test('試行回数が4回の場合、trueを返すこと', () => {
        expect(canLogin(4)).toBe(true);
    });

    test('試行回数が5回の場合、falseを返すこと', () => {
        except(canLogin(5)).toBe(false);
    });
});

describe('【結合テスト】POST / loginルート', () => {
    test('試行回数が4回のリクエストに対して、ステータスコード200と成功メッセージを返すこと', async () => {
        // リクエストを送り、返されるレスポンスを検証(Supertest)
        const response = await request(app)
            .post('/login')
            .send({ attempts: 4 })
            .expect('Content-Type', /json/)
            .expect(200);

        // レスポンスメッセージが期待通りか検証(Jest)
        expect(response.body).toEqual({ message: 'ログイン成功!' });
    });

    test('試行回数が5回のリクエストに対して、ステータスコード403とロックメッセージを返すこと', async () => {
        // リクエストを送り、返されるレスポンスを検証(Supertest)
        const response = await request(app)
            .post('/login')
            .send({ attempts: 5})
            .expect('Content-Type', /json/)
            .expect(403)

        // レスポンスメッセージが期待通りか検証(Jest)
        expect(response.body).toEqual({ message: '試行回数超過のため、アカウントはロックされています。'});
    });
});

