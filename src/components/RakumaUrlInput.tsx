'use client'

import { useState, useEffect } from 'react'
import { StringInputProps, set, unset } from 'sanity'

export default function RakumaUrlInput(props: StringInputProps) {
  const { onChange, value = '' } = props
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)

  const handleUrlChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value
    onChange(newValue ? set(newValue) : unset())
  }

  const fetchRakumaData = async () => {
    if (!value || !value.includes('fril.jp')) {
      setError('有効なラクマURLを入力してください')
      return
    }

    setIsLoading(true)
    setError(null)
    setSuccess(null)

    try {
      const response = await fetch('/api/scrape', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url: value }),
      })

      if (!response.ok) {
        throw new Error('商品情報の取得に失敗しました')
      }

      const data = await response.json()
      
      // 取得したデータを親のドキュメントに反映
      if (props.document && data.title) {
        // ここでSanityドキュメントの他のフィールドを更新
        // 実際の実装では、Sanity Clientを使用してドキュメントを更新
        setSuccess(`商品情報を取得しました: ${data.title}`)
        
        // ローカルストレージに一時保存（開発用）
        localStorage.setItem('rakumaProductData', JSON.stringify(data))
      }

    } catch (err) {
      setError(err instanceof Error ? err.message : '不明なエラーが発生しました')
    } finally {
      setIsLoading(false)
    }
  }

  const isValidRakumaUrl = value && (value.includes('fril.jp') || value.includes('rakuma.rakuten.co.jp'))

  return (
    <div className="space-y-3">
      <div className="flex gap-2">
        <input
          type="url"
          value={value}
          onChange={handleUrlChange}
          placeholder="https://item.fril.jp/..."
          className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="button"
          onClick={fetchRakumaData}
          disabled={!isValidRakumaUrl || isLoading}
          className={`px-4 py-2 rounded-md font-medium ${
            isValidRakumaUrl && !isLoading
              ? 'bg-purple-600 text-white hover:bg-purple-700'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}
        >
          {isLoading ? '取得中...' : '商品情報取得'}
        </button>
      </div>

      {isLoading && (
        <div className="flex items-center gap-2 text-blue-600">
          <div className="animate-spin h-4 w-4 border-2 border-blue-600 border-t-transparent rounded-full"></div>
          <span>ラクマから商品情報を取得中...</span>
        </div>
      )}

      {error && (
        <div className="p-3 bg-red-50 border border-red-200 rounded-md text-red-700">
          ❌ {error}
        </div>
      )}

      {success && (
        <div className="p-3 bg-green-50 border border-green-200 rounded-md text-green-700">
          ✅ {success}
        </div>
      )}

      {isValidRakumaUrl && (
        <div className="text-sm text-gray-600">
          💡 「商品情報取得」ボタンを押すと、ラクマから自動的に商品情報を取得できます
        </div>
      )}
    </div>
  )
}