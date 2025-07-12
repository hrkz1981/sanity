import { mockPosts } from '@/lib/mockData'
import Image from 'next/image'
import Link from 'next/link'

interface Post {
  _id: string
  title: string
  slug: { current: string }
  excerpt: string
  publishedAt: string
  mainImage?: {
    asset: {
      _id: string
      url: string
    }
    alt?: string
  }
  author?: {
    name: string
    image?: {
      asset: {
        _id: string
        url: string
      }
    }
  }
  categories?: Array<{
    title: string
    slug: { current: string }
    color: string
  }>
}

export default function BlogPage() {
  const posts = mockPosts

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8 text-center">ブログ記事</h1>
      
      {posts.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-600">まだ記事がありません。</p>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <article key={post._id} className="bg-white rounded-lg shadow-md overflow-hidden">
              {post.mainImage && (
                <div className="aspect-video relative">
                  <Image
                    src={post.mainImage.asset.url}
                    alt={post.mainImage.alt || post.title}
                    fill
                    className="object-cover"
                  />
                </div>
              )}
              
              <div className="p-6">
                <h2 className="text-xl font-semibold mb-2">
                  <Link 
                    href={`/blog/${post.slug.current}`}
                    className="hover:text-blue-600 transition-colors"
                  >
                    {post.title}
                  </Link>
                </h2>
                
                {post.excerpt && (
                  <p className="text-gray-600 mb-4 line-clamp-3">
                    {post.excerpt}
                  </p>
                )}
                
                <div className="flex items-center justify-between text-sm text-gray-500">
                  {post.author && (
                    <span>by {post.author.name}</span>
                  )}
                  
                  {post.publishedAt && (
                    <time>
                      {new Date(post.publishedAt).toLocaleDateString('ja-JP')}
                    </time>
                  )}
                </div>
                
                {post.categories && post.categories.length > 0 && (
                  <div className="flex gap-2 mt-4">
                    {post.categories.map((category) => (
                      <span
                        key={category.slug.current}
                        className={`px-2 py-1 text-xs rounded-full bg-${category.color}-100 text-${category.color}-800`}
                      >
                        {category.title}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </article>
          ))}
        </div>
      )}
      
      <div className="mt-8 text-center">
        <Link 
          href="/"
          className="text-blue-600 hover:text-blue-800 transition-colors"
        >
          ← ホームに戻る
        </Link>
      </div>
    </div>
  )
}