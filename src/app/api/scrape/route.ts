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

  // タイトル抽出
  if (ogTitleMatch) {
    title = ogTitleMatch[1].replace(' | ラクマ', '').trim()
  } else if (titleMatch) {
    title = titleMatch[1].replace(' | ラクマ', '').trim()
  }

  // 画像抽出
  if (ogImageMatch) {
    image = ogImageMatch[1]
  }

  // 価格抽出
  if (priceMatch && priceMatch.length > 0) {
    price = priceMatch[0].replace('¥', '').replace(',', '')
  }

  // より詳細な情報を抽取するための追加パターン
  const descriptionMatch = html.match(/<meta[^>]*name="description"[^>]*content="([^"]*)"[^>]*>/i)
  const brandMatch = html.match(/ブランド[：:]\s*([^<\n]*)/i)
  const conditionMatch = html.match(/商品の状態[：:]\s*([^<\n]*)/i)

  return {
    title: title || '商品名を取得できませんでした',
    image: image || '',
    price: price || '0',
    description: descriptionMatch ? descriptionMatch[1] : '',
    brand: brandMatch ? brandMatch[1].trim() : '',
    condition: conditionMatch ? conditionMatch[1].trim() : '',
    source: 'rakuma'
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