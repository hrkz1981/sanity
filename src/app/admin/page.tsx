'use client'

import { useState } from 'react'
import Image from 'next/image'

interface ProductData {
  title: string
  image: string
  price: string
  description: string
  brand: string
  condition: string
  source: string
}

export default function AdminPage() {
  const [url, setUrl] = useState('')
  const [loading, setLoading] = useState(false)
  const [productData, setProductData] = useState<ProductData | null>(null)
  const [error, setError] = useState('')

  const handleScrape = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    setProductData(null)

    try {
      const response = await fetch('/api/scrape', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || '商品情報の取得に失敗しました')
      }

      setProductData(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : '予期しないエラーが発生しました')
    } finally {
      setLoading(false)
    }
  }

  const handleAddToSanity = async () => {
    if (!productData) return
    
    // ここでSanityに商品を追加する処理
    alert('Sanityへの保存機能は実装予定です')
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* ヘッダー */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">商品情報取得ツール</h1>
          <p className="mt-2 text-gray-600">
            ラクマの商品URLから商品情報を自動取得します
          </p>
        </div>

        {/* URL入力フォーム */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <form onSubmit={handleScrape} className="space-y-4">
            <div>
              <label htmlFor="url" className="block text-sm font-medium text-gray-700 mb-2">
                ラクマ商品URL
              </label>
              <input
                type="url"
                id="url"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="https://fril.jp/item/... または https://rakuma.rakuten.co.jp/item/..."
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                required
              />
            </div>
            
            <button
              type="submit"
              disabled={loading || !url}
              className="w-full bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  取得中...
                </span>
              ) : (
                '商品情報を取得'
              )}
            </button>
          </form>

          {/* エラー表示 */}
          {error && (
            <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-md">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm text-red-700">{error}</p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* 取得した商品情報の表示 */}
        {productData && (
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex justify-between items-start mb-6">
              <h2 className="text-xl font-semibold text-gray-900">取得した商品情報</h2>
              <button
                onClick={handleAddToSanity}
                className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
              >
                Sanityに追加
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* 商品画像 */}
              <div>
                {productData.image ? (
                  <div className="relative aspect-square rounded-lg overflow-hidden bg-gray-100">
                    <Image
                      src={productData.image}
                      alt={productData.title}
                      fill
                      className="object-cover"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement
                        target.src = 'https://via.placeholder.com/400x400/E5E7EB/9CA3AF?text=画像を読み込めません'
                      }}
                    />
                  </div>
                ) : (
                  <div className="aspect-square rounded-lg bg-gray-100 flex items-center justify-center">
                    <span className="text-gray-400">画像なし</span>
                  </div>
                )}
              </div>

              {/* 商品詳細 */}
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">商品名</label>
                  <p className="mt-1 text-sm text-gray-900 bg-gray-50 p-3 rounded-md">
                    {productData.title}
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">価格</label>
                  <p className="mt-1 text-lg font-bold text-gray-900 bg-gray-50 p-3 rounded-md">
                    ¥{Number(productData.price).toLocaleString()}
                  </p>
                </div>

                {productData.brand && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700">ブランド</label>
                    <p className="mt-1 text-sm text-gray-900 bg-gray-50 p-3 rounded-md">
                      {productData.brand}
                    </p>
                  </div>
                )}

                {productData.condition && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700">商品の状態</label>
                    <p className="mt-1 text-sm text-gray-900 bg-gray-50 p-3 rounded-md">
                      {productData.condition}
                    </p>
                  </div>
                )}

                {productData.description && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700">説明</label>
                    <p className="mt-1 text-sm text-gray-900 bg-gray-50 p-3 rounded-md max-h-32 overflow-y-auto">
                      {productData.description}
                    </p>
                  </div>
                )}

                <div>
                  <label className="block text-sm font-medium text-gray-700">取得元</label>
                  <p className="mt-1 text-sm text-gray-900 bg-gray-50 p-3 rounded-md">
                    {productData.source === 'rakuma' ? 'ラクマ' : productData.source}
                  </p>
                </div>
              </div>
            </div>

            {/* JSON表示（デバッグ用） */}
            <details className="mt-6">
              <summary className="cursor-pointer text-sm font-medium text-gray-700 hover:text-gray-900">
                取得データ詳細 (JSON)
              </summary>
              <pre className="mt-2 text-xs bg-gray-100 p-4 rounded-md overflow-auto">
                {JSON.stringify(productData, null, 2)}
              </pre>
            </details>
          </div>
        )}

        {/* 使用方法 */}
        <div className="mt-8 bg-blue-50 border border-blue-200 rounded-md p-4">
          <h3 className="text-sm font-medium text-blue-800 mb-2">使用方法</h3>
          <ol className="text-sm text-blue-700 space-y-1">
            <li>1. ラクマの商品ページURLをコピー</li>
            <li>2. 上記フォームにURLを貼り付け</li>
            <li>3. 「商品情報を取得」ボタンをクリック</li>
            <li>4. 取得された情報を確認</li>
            <li>5. 「Sanityに追加」で商品データベースに保存（予定）</li>
          </ol>
        </div>
      </div>
    </div>
  )
}