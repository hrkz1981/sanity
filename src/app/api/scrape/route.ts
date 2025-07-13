import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const { url } = await request.json()
    
    if (!url) {
      return NextResponse.json({ error: 'URLが必要です' }, { status: 400 })
    }

    // ラクマのURLかチェック
    if (!url.includes('fril.jp') && !url.includes('rakuma.rakuten.co.jp')) {
      return NextResponse.json({ error: 'ラクマのURLを入力してください' }, { status: 400 })
    }

    // CORSを回避するために、サーバーサイドでスクレイピング
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
      }
    })

    if (!response.ok) {
      throw new Error('商品ページの取得に失敗しました')
    }

    const html = await response.text()
    
    // HTMLからメタデータを抽出
    const productData = extractProductData(html)
    
    return NextResponse.json(productData)
    
  } catch (error) {
    console.error('Scraping error:', error)
    return NextResponse.json(
      { error: '商品情報の取得に失敗しました' }, 
      { status: 500 }
    )
  }
}

function extractProductData(html: string) {
  // 基本的なHTML解析（実際のプロダクションではcheerioなどを使用）
  const titleMatch = html.match(/<title[^>]*>([^<]*)<\/title>/i)
  const ogImageMatch = html.match(/<meta[^>]*property="og:image"[^>]*content="([^"]*)"[^>]*>/i)
  const ogTitleMatch = html.match(/<meta[^>]*property="og:title"[^>]*content="([^"]*)"[^>]*>/i)
  const priceMatch = html.match(/¥([\d,]+)/g)
  
  // より具体的なラクマの構造に合わせた抽出
  let title = ''
  let image = ''
  let price = ''
  let numPrice = 0

  // タイトル抽出
  if (ogTitleMatch) {
    title = ogTitleMatch[1].replace(' | ラクマ', '').replace(' | フリル', '').trim()
  } else if (titleMatch) {
    title = titleMatch[1].replace(' | ラクマ', '').replace(' | フリル', '').trim()
  }

  // 画像抽出
  if (ogImageMatch) {
    image = ogImageMatch[1]
  }

  // 価格抽出（改良版）
  if (priceMatch && priceMatch.length > 0) {
    // 最初に見つかった価格を使用
    price = priceMatch[0].replace('¥', '').replace(/,/g, '')
    numPrice = parseInt(price) || 0
  }

  // より詳細な情報を抽取するための追加パターン
  const descriptionMatch = html.match(/<meta[^>]*name="description"[^>]*content="([^"]*)"[^>]*>/i)
  const brandMatch = html.match(/ブランド[：:]\s*([^<\n]*)/i)
  const conditionMatch = html.match(/商品の状態[：:]\s*([^<\n]*)/i)

  // カテゴリー推測
  let category = 'other'
  const titleLower = title.toLowerCase()
  if (titleLower.includes('トート') || titleLower.includes('tote')) {
    category = 'tote'
  } else if (titleLower.includes('ショルダー') || titleLower.includes('shoulder')) {
    category = 'shoulder'
  } else if (titleLower.includes('ハンドバッグ') || titleLower.includes('handbag')) {
    category = 'handbag'
  } else if (titleLower.includes('リュック') || titleLower.includes('バックパック')) {
    category = 'backpack'
  } else if (titleLower.includes('クラッチ')) {
    category = 'clutch'
  } else if (titleLower.includes('ボストン')) {
    category = 'boston'
  }

  // 状態マッピング
  let conditionValue = 'good'
  if (conditionMatch) {
    const cond = conditionMatch[1].toLowerCase()
    if (cond.includes('新品') || cond.includes('未使用')) {
      conditionValue = 'new'
    } else if (cond.includes('未使用に近い')) {
      conditionValue = 'like-new'
    } else if (cond.includes('やや傷') || cond.includes('やや汚れ')) {
      conditionValue = 'fair'
    } else if (cond.includes('傷') || cond.includes('汚れ')) {
      conditionValue = 'poor'
    } else if (cond.includes('状態が悪い')) {
      conditionValue = 'bad'
    }
  }

  // スラッグ生成
  const slug = title
    .toLowerCase()
    .replace(/[^a-zA-Z0-9\u3040-\u309F\u30A0-\u30FF\u4E00-\u9FAF]/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '')
    .substring(0, 96)

  return {
    title: title || '商品名を取得できませんでした',
    slug: slug,
    image: image || '',
    price: numPrice,
    priceString: price || '0',
    description: descriptionMatch ? descriptionMatch[1] : title,
    brand: brandMatch ? brandMatch[1].trim() : '',
    condition: conditionValue,
    category: category,
    isAvailable: true,
    featured: false,
    source: 'rakuma',
    fetchedAt: new Date().toISOString()
  }
}

// CORS対応
export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  })
}