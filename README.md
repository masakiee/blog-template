# masakiee/blog-template

## 環境構築

やるべきこと。

- AWS S3 バケットを作成する（ブログの HTML などを配置する）
- [任意] AWS CloudFront ディストリビューションを作成する（ブログを配信する）
- [任意] AWS Route 53 レコードを作成する（ドメインを設定する）
- AWS IAM ユーザーを作成し、トークンを生成する（リリースコマンドの実行に必要）

<<細かい手順を追記したい>>

## 各種手順

### リリース

記事の追加・更新・削除とデザイン変更などのリリースは全て同じコマンドで完了する。

コマンドを実行するために、以下のページを参考にAWS の aws cli をインストールする。

https://docs.aws.amazon.com/ja_jp/cli/latest/userguide/getting-started-install.html


```bash
aws configure
```

```bash
AWS_PROFILE=<profile> bash deploy/sync.sh
```

### 開発

```bash
# 確認用サーバー起動コマンド
npm run preview
# 開発ビルド (watch モード)
npm run dev
```

### ファビコンを変更する

`assets/favicon.ico` の画像を差し替える。

### URLのパスを変更する

ブログのURLのパスはファイルのパスと同じ。例えば `entries/2024/01/20/sample-blog-entry.md` というファイルがある場合、URLのパスは `entry/2024/01/20/sample-blog-entry` となる。`entries` ディレクトリ以下の構造は任意に変更できる。
