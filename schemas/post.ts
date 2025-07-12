import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'post',
  title: 'ブログ記事',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'タイトル',
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
      name: 'author',
      title: '著者',
      type: 'reference',
      to: {type: 'author'},
    }),
    defineField({
      name: 'mainImage',
      title: 'メイン画像',
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
    }),
    defineField({
      name: 'categories',
      title: 'カテゴリー',
      type: 'array',
      of: [{type: 'reference', to: {type: 'category'}}],
    }),
    defineField({
      name: 'publishedAt',
      title: '公開日',
      type: 'datetime',
    }),
    defineField({
      name: 'excerpt',
      title: '抜粋',
      type: 'text',
      rows: 4,
    }),
    defineField({
      name: 'body',
      title: '本文',
      type: 'blockContent',
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
      author: 'author.name',
      media: 'mainImage',
    },
    prepare(selection: any) {
      const {author} = selection
      return {...selection, subtitle: author && `著者: ${author}`}
    },
  },
})