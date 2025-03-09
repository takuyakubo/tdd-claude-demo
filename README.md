# TDD Node.js Express Demo

Node.js、Express、Jestを使用したTDD（テスト駆動開発）のデモプロジェクト。

## インストール

```bash
npm install
```

## テストの実行

```bash
npm test
```

## 開発サーバーの起動

```bash
npm run dev
```

## 本番環境用の起動

```bash
npm start
```

## プロジェクト構造

- `index.js` - メインアプリケーションファイル
- `src/` - ソースコードディレクトリ
- `src/__tests__/` - ソースコードのテスト
- `routes/` - ルーティングファイル
- `routes/__tests__/` - ルーティングのテスト

## TDDプロセス

1. 失敗するテストを作成する
2. テストが通るように最小限の実装を行う
3. リファクタリングを行う
4. 繰り返す