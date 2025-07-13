import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'product',
  title: 'ラクマ商品',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: '商品名',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'スラッグ',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'mainImage',
      title: 'メイン画像',
      type: 'image',
      options: {
        hotspot: true,
      },
      validation: (Rule) => Rule.required(),
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Alt text',
        }
      ]
    }),
    defineField({
      name: 'gallery',
      title: '商品画像ギャラリー',
      type: 'array',
      of: [
        {
          type: 'image',
          options: {
            hotspot: true,
          },
          fields: [
            {
              name: 'alt',
              type: 'string',
              title: 'Alt text',
            }
          ]
        }
      ],
      validation: (Rule) => Rule.max(10),
    }),
    defineField({
      name: 'price',
      title: '価格（円）',
      type: 'number',
      validation: (Rule) => Rule.required().min(0),
    }),
    defineField({
      name: 'originalPrice',
      title: '定価（円）',
      type: 'number',
    }),
    defineField({
      name: 'brand',
      title: 'ブランド',
      type: 'string',
    }),
    defineField({
      name: 'condition',
      title: '商品の状態',
      type: 'string',
      options: {
        list: [
          {title: '新品・未使用', value: 'new'},
          {title: '未使用に近い', value: 'like-new'},
          {title: '目立った傷や汚れなし', value: 'good'},
          {title: 'やや傷や汚れあり', value: 'fair'},
          {title: '傷や汚れあり', value: 'poor'},
          {title: '全体的に状態が悪い', value: 'bad'},
        ]
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'size',
      title: 'サイズ',
      type: 'object',
      fields: [
        {
          name: 'width',
          title: '幅（cm）',
          type: 'number',
        },
        {
          name: 'height',
          title: '高さ（cm）',
          type: 'number',
        },
        {
          name: 'depth',
          title: '奥行き（cm）',
          type: 'number',
        },
      ]
    }),
    defineField({
      name: 'description',
      title: '商品説明',
      type: 'text',
      rows: 5,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'features',
      title: '商品の特徴・アピールポイント',
      type: 'array',
      of: [{type: 'string'}],
    }),
    defineField({
      name: 'rakumaUrl',
      title: 'ラクマ商品URL',
      type: 'url',
      validation: (Rule) => Rule.required(),
      description: 'ラクマ商品URLを入力すると、自動的に商品情報を取得します',
      components: {
        input: (props) => {
          // 動的インポートでコンポーネントを読み込み
          if (typeof window !== 'undefined') {
            const RakumaUrlInput = require('../src/components/RakumaUrlInput').default
            return RakumaUrlInput(props)
          }
          // サーバーサイドでは通常の入力フィールドを表示
          return props.renderDefault(props)
        }
      }
    }),
    defineField({
      name: 'autoFetchData',
      title: '自動データ取得',
      type: 'object',
      fields: [
        {
          name: 'lastFetched',
          title: '最終取得日時',
          type: 'datetime',
          readOnly: true,
        },
        {
          name: 'fetchStatus',
          title: '取得ステータス',
          type: 'string',
          readOnly: true,
          options: {
            list: [
              {title: '成功', value: 'success'},
              {title: '失敗', value: 'error'},
              {title: '取得中', value: 'fetching'},
            ]
          }
        },
        {
          name: 'originalData',
          title: '取得元データ',
          type: 'text',
          readOnly: true,
        }
      ],
      description: '自動取得されたデータの管理情報',
    }),
    defineField({
      name: 'isAvailable',
      title: '販売中',
      type: 'boolean',
      initialValue: true,
    }),
    defineField({
      name: 'category',
      title: 'カテゴリー',
      type: 'string',
      options: {
        list: [
          {title: 'ハンドバッグ', value: 'handbag'},
          {title: 'ショルダーバッグ', value: 'shoulder'},
          {title: 'トートバッグ', value: 'tote'},
          {title: 'リュック・バックパック', value: 'backpack'},
          {title: 'クラッチバッグ', value: 'clutch'},
          {title: 'ボストンバッグ', value: 'boston'},
          {title: 'その他', value: 'other'},
        ]
      }
    }),
    defineField({
      name: 'tags',
      title: 'タグ',
      type: 'array',
      of: [{type: 'string'}],
    }),
    defineField({
      name: 'featured',
      title: 'おすすめ商品',
      type: 'boolean',
      initialValue: false,
    }),
  ],

  preview: {
    select: {
      title: 'title',
      media: 'mainImage',
      price: 'price',
      condition: 'condition',
      isAvailable: 'isAvailable',
    },
    prepare(selection: any) {
      const {title, price, condition, isAvailable} = selection
      const status = isAvailable ? '販売中' : '売り切れ'
      return {
        title,
        subtitle: `¥${price?.toLocaleString()} - ${condition} - ${status}`,
        media: selection.media,
      }
    },
  },
})