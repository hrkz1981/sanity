import { mockProducts } from '@/lib/mockData'
import Image from 'next/image'
import Link from 'next/link'

interface Product {
  _id: string
  title: string
  slug: { current: string }
  mainImage: {
    asset: {
      _id: string
      url: string
    }
    alt?: string
  }
  price: number
  originalPrice?: number
  brand?: string
  condition: string
  isAvailable: boolean
  featured: boolean
  category: string
  rakumaUrl: string
}

export default function ProductsPage() {
  const products = mockProducts
  const featuredProducts = products.filter(product => product.featured)
  const availableProducts = products.filter(product => product.isAvailable)

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* ヘッダー */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-gray-900">🛍️ Premium Bags</h1>
            </div>
            <nav className="flex space-x-8">
              <Link href="/" className="text-gray-500 hover:text-gray-900">ホーム</Link>
              <Link href="/products" className="text-indigo-600 font-medium">商品一覧</Link>
              <Link href="/blog" className="text-gray-500 hover:text-gray-900">ブログ</Link>
            </nav>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* ヒーロー */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-extrabold text-gray-900 sm:text-5xl">
            厳選された
            <span className="text-indigo-600"> プレミアムバッグ </span>
            コレクション
          </h2>
          <p className="mt-4 text-xl text-gray-600">
            ブランドバッグを手頃な価格でお届け。全商品の状態を詳しく掲載しています。
          </p>
        </div>

        {/* おすすめ商品 */}
        {featuredProducts.length > 0 && (
          <section className="mb-16">
            <h3 className="text-2xl font-bold text-gray-900 mb-8 flex items-center">
              <span className="bg-yellow-100 text-yellow-800 text-sm font-medium mr-2 px-2.5 py-0.5 rounded">⭐</span>
              おすすめ商品
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredProducts.map((product) => (
                <ProductCard key={product._id} product={product} featured={true} />
              ))}
            </div>
          </section>
        )}

        {/* 全商品 */}
        <section>
          <div className="flex justify-between items-center mb-8">
            <h3 className="text-2xl font-bold text-gray-900">
              販売中の商品 ({availableProducts.length}点)
            </h3>
            <div className="flex space-x-4">
              <select className="border border-gray-300 rounded-md px-3 py-2 text-sm">
                <option>カテゴリーで絞り込み</option>
                <option>ハンドバッグ</option>
                <option>ショルダーバッグ</option>
                <option>トートバッグ</option>
                <option>リュック・バックパック</option>
              </select>
              <select className="border border-gray-300 rounded-md px-3 py-2 text-sm">
                <option>価格順</option>
                <option>安い順</option>
                <option>高い順</option>
                <option>新着順</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {availableProducts.map((product) => (
              <ProductCard key={product._id} product={product} featured={false} />
            ))}
          </div>
        </section>

        {/* 売り切れ商品 */}
        {products.some(p => !p.isAvailable) && (
          <section className="mt-16">
            <h3 className="text-xl font-semibold text-gray-500 mb-6">売り切れ商品</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {products.filter(p => !p.isAvailable).map((product) => (
                <div key={product._id} className="relative opacity-60">
                  <ProductCard product={product} featured={false} />
                  <div className="absolute inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center rounded-lg">
                    <span className="bg-red-600 text-white px-4 py-2 rounded-full font-semibold">
                      SOLD OUT
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}
      </main>
    </div>
  )
}

function ProductCard({ product, featured }: { product: Product; featured: boolean }) {
  const discountPercentage = product.originalPrice 
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0

  return (
    <Link href={`/products/${product.slug.current}`}>
      <div className={`bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 ${featured ? 'ring-2 ring-yellow-400' : ''}`}>
        {/* 商品画像 */}
        <div className="relative aspect-square">
          <Image
            src={product.mainImage.asset.url}
            alt={product.mainImage.alt || product.title}
            fill
            className="object-cover"
          />
          
          {/* バッジ */}
          <div className="absolute top-2 left-2 flex flex-col space-y-2">
            {featured && (
              <span className="bg-yellow-500 text-white text-xs font-bold px-2 py-1 rounded">
                おすすめ
              </span>
            )}
            {discountPercentage > 0 && (
              <span className="bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
                {discountPercentage}% OFF
              </span>
            )}
            {!product.isAvailable && (
              <span className="bg-gray-500 text-white text-xs font-bold px-2 py-1 rounded">
                売り切れ
              </span>
            )}
          </div>

          {/* ブランド */}
          {product.brand && (
            <div className="absolute top-2 right-2">
              <span className="bg-black bg-opacity-70 text-white text-xs px-2 py-1 rounded">
                {product.brand}
              </span>
            </div>
          )}
        </div>

        {/* 商品情報 */}
        <div className="p-4">
          <h3 className="font-semibold text-gray-900 text-sm mb-2 line-clamp-2">
            {product.title}
          </h3>
          
          {/* 状態 */}
          <div className="mb-2">
            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
              {getConditionLabel(product.condition)}
            </span>
          </div>

          {/* 価格 */}
          <div className="mb-4">
            <div className="flex flex-col">
              <span className="text-lg font-bold text-gray-900">
                ¥{product.price.toLocaleString()}
              </span>
              {product.originalPrice && (
                <span className="text-sm text-gray-500 line-through">
                  定価 ¥{product.originalPrice.toLocaleString()}
                </span>
              )}
            </div>
          </div>
            
          {/* ボタン */}
          {product.isAvailable && (
            <div className="flex flex-col space-y-2">
              <a 
                href={product.rakumaUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-red-500 text-white px-4 py-3 rounded-md text-sm font-bold hover:bg-red-600 transition-colors text-center flex items-center justify-center shadow-md"
              >
                <span className="mr-2">🛍️</span>
                ラクマで購入する
              </a>
              <Link 
                href={`/products/${product.slug.current}`}
                className="bg-gray-100 text-gray-700 px-4 py-2 rounded-md text-sm font-medium hover:bg-gray-200 transition-colors text-center border"
              >
                詳細を見る
              </Link>
            </div>
          )}
        </div>
      </div>
    </Link>
  )
}

function getConditionLabel(condition: string): string {
  const labels: Record<string, string> = {
    'new': '新品・未使用',
    'like-new': '未使用に近い',
    'good': '目立った傷なし',
    'fair': 'やや傷あり',
    'poor': '傷や汚れあり',
    'bad': '状態が悪い',
  }
  return labels[condition] || condition
}