// モックデータ（開発用）
export const mockPosts = [
  {
    _id: '1',
    title: 'Sanity CMSの始め方',
    slug: { current: 'getting-started-with-sanity' },
    excerpt: 'Sanity CMSを使ってブログを作成する方法を学びましょう。',
    publishedAt: '2025-01-10',
    mainImage: {
      asset: {
        _id: 'image1',
        url: 'https://via.placeholder.com/600x400/4F46E5/FFFFFF?text=Sanity+CMS'
      },
      alt: 'Sanity CMS'
    },
    author: {
      name: '田中太郎',
      image: {
        asset: {
          _id: 'author1',
          url: 'https://via.placeholder.com/100x100/10B981/FFFFFF?text=田中'
        }
      }
    },
    categories: [
      {
        title: 'CMS',
        slug: { current: 'cms' },
        color: 'blue'
      }
    ]
  },
  {
    _id: '2',
    title: 'Next.jsでモダンなWebサイトを構築',
    slug: { current: 'modern-websites-with-nextjs' },
    excerpt: 'Next.jsの最新機能を使って高速なWebサイトを作る方法を解説します。',
    publishedAt: '2025-01-08',
    mainImage: {
      asset: {
        _id: 'image2',
        url: 'https://via.placeholder.com/600x400/059669/FFFFFF?text=Next.js'
      },
      alt: 'Next.js'
    },
    author: {
      name: '佐藤花子',
      image: {
        asset: {
          _id: 'author2',
          url: 'https://via.placeholder.com/100x100/DC2626/FFFFFF?text=佐藤'
        }
      }
    },
    categories: [
      {
        title: 'フロントエンド',
        slug: { current: 'frontend' },
        color: 'green'
      }
    ]
  },
  {
    _id: '3',
    title: 'ヘッドレスCMSのメリット',
    slug: { current: 'benefits-of-headless-cms' },
    excerpt: 'ヘッドレスCMSがもたらす柔軟性とパフォーマンスの向上について説明します。',
    publishedAt: '2025-01-05',
    mainImage: {
      asset: {
        _id: 'image3',
        url: 'https://via.placeholder.com/600x400/7C3AED/FFFFFF?text=Headless+CMS'
      },
      alt: 'Headless CMS'
    },
    author: {
      name: '山田次郎',
      image: {
        asset: {
          _id: 'author3',
          url: 'https://via.placeholder.com/100x100/F59E0B/FFFFFF?text=山田'
        }
      }
    },
    categories: [
      {
        title: 'アーキテクチャ',
        slug: { current: 'architecture' },
        color: 'purple'
      }
    ]
  }
]