// ブログ記事モックデータ
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

// 商品モックデータ
export const mockProducts = [
  {
    _id: 'product1',
    title: 'LOUIS VUITTON モノグラム ネヴァーフル MM トートバッグ',
    slug: { current: 'louis-vuitton-neverfull-mm' },
    mainImage: {
      asset: {
        _id: 'img1',
        url: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=400&h=400&fit=crop&crop=center'
      },
      alt: 'ルイ・ヴィトン ネヴァーフル'
    },
    price: 89000,
    originalPrice: 198000,
    brand: 'LOUIS VUITTON',
    condition: 'good',
    isAvailable: true,
    featured: true,
    category: 'tote',
    rakumaUrl: 'https://fril.jp/item/123456789'
  },
  {
    _id: 'product2', 
    title: 'CHANEL マトラッセ チェーンショルダーバッグ ブラック',
    slug: { current: 'chanel-matelasse-chain-shoulder' },
    mainImage: {
      asset: {
        _id: 'img2',
        url: 'https://images.unsplash.com/photo-1591370874773-6702e8f12fd8?w=400&h=400&fit=crop&crop=center'
      },
      alt: 'シャネル マトラッセ'
    },
    price: 128000,
    originalPrice: 280000,
    brand: 'CHANEL',
    condition: 'like-new',
    isAvailable: true,
    featured: true,
    category: 'shoulder',
    rakumaUrl: 'https://fril.jp/item/123456790'
  },
  {
    _id: 'product3',
    title: 'HERMES バーキン30 エトープ トゴレザー',
    slug: { current: 'hermes-birkin-30-etoupe' },
    mainImage: {
      asset: {
        _id: 'img3',
        url: 'https://images.unsplash.com/photo-1566150905458-1bf1fc113f0d?w=400&h=400&fit=crop&crop=center'
      },
      alt: 'エルメス バーキン30'
    },
    price: 1680000,
    originalPrice: 2100000,
    brand: 'HERMES',
    condition: 'like-new',
    isAvailable: true,
    featured: true,
    category: 'handbag',
    rakumaUrl: 'https://fril.jp/item/123456791'
  },
  {
    _id: 'product4',
    title: 'GUCCI GG マーモント スモール ショルダーバッグ',
    slug: { current: 'gucci-gg-marmont-small' },
    mainImage: {
      asset: {
        _id: 'img4',
        url: 'https://via.placeholder.com/400x400/013220/FFFFFF?text=GUCCI+GG'
      },
      alt: 'グッチ マーモント'
    },
    price: 78000,
    originalPrice: 165000,
    brand: 'GUCCI',
    condition: 'good',
    isAvailable: true,
    featured: false,
    category: 'shoulder',
    rakumaUrl: 'https://fril.jp/item/123456792'
  },
  {
    _id: 'product5',
    title: 'PRADA ナイロン バックパック リュック ブラック',
    slug: { current: 'prada-nylon-backpack-black' },
    mainImage: {
      asset: {
        _id: 'img5',
        url: 'https://via.placeholder.com/400x400/1a1a1a/FFFFFF?text=PRADA+Nylon'
      },
      alt: 'プラダ ナイロン バックパック'
    },
    price: 45000,
    originalPrice: 95000,
    brand: 'PRADA',
    condition: 'good',
    isAvailable: true,
    featured: false,
    category: 'backpack',
    rakumaUrl: 'https://fril.jp/item/123456793'
  },
  {
    _id: 'product6',
    title: 'CELINE ラゲージ マイクロ ハンドバッグ ベージュ',
    slug: { current: 'celine-luggage-micro-beige' },
    mainImage: {
      asset: {
        _id: 'img6',
        url: 'https://via.placeholder.com/400x400/D2B48C/000000?text=CELINE+Luggage'
      },
      alt: 'セリーヌ ラゲージ'
    },
    price: 165000,
    originalPrice: 385000,
    brand: 'CELINE',
    condition: 'fair',
    isAvailable: false,
    featured: false,
    category: 'handbag',
    rakumaUrl: 'https://fril.jp/item/123456794'
  },
  {
    _id: 'product7',
    title: 'BOTTEGA VENETA イントレチャート クラッチバッグ',
    slug: { current: 'bottega-veneta-intrecciato-clutch' },
    mainImage: {
      asset: {
        _id: 'img7',
        url: 'https://via.placeholder.com/400x400/8B4513/FFFFFF?text=BOTTEGA+VENETA'
      },
      alt: 'ボッテガヴェネタ クラッチ'
    },
    price: 52000,
    originalPrice: 125000,
    brand: 'BOTTEGA VENETA',
    condition: 'good',
    isAvailable: true,
    featured: false,
    category: 'clutch',
    rakumaUrl: 'https://fril.jp/item/123456795'
  },
  {
    _id: 'product8',
    title: 'DIOR サドルバッグ オブリーク ジャガード',
    slug: { current: 'dior-saddle-bag-oblique' },
    mainImage: {
      asset: {
        _id: 'img8',
        url: 'https://via.placeholder.com/400x400/B8860B/000000?text=DIOR+Saddle'
      },
      alt: 'ディオール サドルバッグ'
    },
    price: 198000,
    originalPrice: 490000,
    brand: 'DIOR',
    condition: 'like-new',
    isAvailable: true,
    featured: false,
    category: 'shoulder',
    rakumaUrl: 'https://fril.jp/item/123456796'
  },
  {
    _id: 'product9',
    title: '美品✨️TOD\'S トッズ 2way トートバッグ ハンドバッグ 肩掛け レザー',
    slug: { current: 'tods-2way-tote-bag' },
    mainImage: {
      asset: {
        _id: 'img9',
        url: 'https://img.fril.jp/img/775995401/l/2630482225.jpg?1752095872'
      },
      alt: 'TOD\'S トッズ 2way トートバッグ'
    },
    price: 24880,
    originalPrice: 45000,
    brand: 'TOD\'S',
    condition: 'like-new',
    isAvailable: true,
    featured: true,
    category: 'tote',
    rakumaUrl: 'https://item.fril.jp/dd5d72b495a60645e44b174d4c4da9a2'
  }
]