# 🚀 Sanity + Next.js デプロイガイド

## 手順1: Sanityプロジェクトの初期化

### A. Sanity CLIでプロジェクト作成
```bash
cd my-blog-frontend
sanity login  # すでにログイン済み
sanity init --project-id [新しいプロジェクトID] --dataset production
```

### B. 既存スキーマを適用
```bash
# スキーマファイルがすでに存在するので、初期化後に反映されます
npm run sanity:dev  # 開発サーバーで確認
```

## 手順2: Sanity Studioのデプロイ

### A. Studio名を設定
```bash
sanity deploy
```
- Studio名を入力（例：my-blog-cms）
- デプロイ先URL: https://my-blog-cms.sanity.studio

### B. 公開設定
```bash
# CORSオリジンを設定（本番サイトのURLを許可）
sanity cors add https://your-nextjs-site.vercel.app
sanity cors add http://localhost:3000  # 開発用
```

## 手順3: Next.jsアプリのデプロイ（Vercel）

### A. Vercelアカウント準備
1. [Vercel.com](https://vercel.com) でアカウント作成
2. GitHubアカウントと連携

### B. GitHubリポジトリの準備
```bash
# 最新コードをGitHubにプッシュ
git add .
git commit -m "Ready for deployment"
git push origin main
```

### C. Vercelでデプロイ
1. Vercel ダッシュボードで「New Project」
2. GitHubリポジトリを選択
3. フレームワーク: Next.js を選択
4. Root Directory: `my-blog-frontend` を指定

### D. 環境変数の設定
Vercelの環境変数に以下を設定：
```
NEXT_PUBLIC_SANITY_PROJECT_ID=your-project-id
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2023-05-03
SANITY_API_TOKEN=your-api-token（書き込み用）
```

## 手順4: APIトークンの取得

### A. Sanity管理画面で取得
1. https://sanity.io/manage でプロジェクトを選択
2. API → Tokens → Add API token
3. 名前: "Next.js App"
4. 権限: Editor または Viewer

## 手順5: 最終確認

### A. デプロイされたStudioの確認
- https://your-studio-name.sanity.studio にアクセス
- 商品データを追加・編集できることを確認

### B. デプロイされたNext.jsサイトの確認
- https://your-site.vercel.app にアクセス
- Sanityからデータが正常に取得されることを確認

## 📋 デプロイ後のチェックリスト

- [ ] Sanity Studioが正常に動作
- [ ] 商品データの追加・編集が可能
- [ ] Next.jsサイトでデータが表示される
- [ ] 商品取得ツールが動作する
- [ ] メルカリ・ラクマリンクが正常
- [ ] レスポンシブデザインが正常
- [ ] SEO設定が適用されている

## 🔧 トラブルシューティング

### よくある問題と解決法

1. **CORSエラー**
   ```bash
   sanity cors add https://your-site.vercel.app
   ```

2. **環境変数エラー**
   - Vercelの環境変数を再確認
   - プロジェクトIDが正しいか確認

3. **ビルドエラー**
   - TypeScriptエラーを修正
   - 不要なimportを削除

## 💡 運用のコツ

1. **定期的なバックアップ**
   ```bash
   sanity dataset export production backup.tar.gz
   ```

2. **ステージング環境の作成**
   ```bash
   sanity dataset create staging
   ```

3. **パフォーマンス監視**
   - Vercel Analytics を有効化
   - Sanity API使用量を監視