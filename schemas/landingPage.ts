import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'landingPage',
  title: 'ランディングページ',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'ページタイトル',
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
      name: 'hero',
      title: 'ヒーローセクション',
      type: 'hero',
    }),
    defineField({
      name: 'features',
      title: '機能セクション',
      type: 'features',
    }),
    defineField({
      name: 'cta',
      title: 'CTA（行動喚起）',
      type: 'object',
      fields: [
        {
          name: 'headline',
          title: 'ヘッドライン',
          type: 'string',
        },
        {
          name: 'subheading',
          title: 'サブヘッドライン',
          type: 'text',
        },
        {
          name: 'buttonText',
          title: 'ボタンテキスト',
          type: 'string',
        },
        {
          name: 'buttonLink',
          title: 'ボタンリンク',
          type: 'url',
        },
        {
          name: 'backgroundColor',
          title: '背景色',
          type: 'string',
          options: {
            list: [
              {title: 'Blue', value: 'blue'},
              {title: 'Green', value: 'green'},
              {title: 'Purple', value: 'purple'},
              {title: 'Gray', value: 'gray'},
            ]
          }
        }
      ]
    }),
    defineField({
      name: 'testimonials',
      title: 'お客様の声',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'name',
              title: '名前',
              type: 'string',
            },
            {
              name: 'company',
              title: '会社名',
              type: 'string',
            },
            {
              name: 'testimonial',
              title: '証言',
              type: 'text',
            },
            {
              name: 'image',
              title: '写真',
              type: 'image',
            }
          ]
        }
      ]
    }),
    defineField({
      name: 'seo',
      title: 'SEO設定',
      type: 'object',
      fields: [
        {
          name: 'metaTitle',
          title: 'メタタイトル',
          type: 'string',
        },
        {
          name: 'metaDescription',
          title: 'メタディスクリプション',
          type: 'text',
          rows: 3,
        },
        {
          name: 'ogImage',
          title: 'OG画像',
          type: 'image',
        }
      ]
    })
  ],

  preview: {
    select: {
      title: 'title',
      subtitle: 'hero.headline',
    },
  },
})