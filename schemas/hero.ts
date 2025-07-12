import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'hero',
  title: 'ヒーローセクション',
  type: 'object',
  fields: [
    defineField({
      name: 'headline',
      title: 'メインヘッドライン',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'subheading',
      title: 'サブヘッドライン',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'backgroundImage',
      title: '背景画像',
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
      name: 'primaryButton',
      title: 'プライマリボタン',
      type: 'object',
      fields: [
        {
          name: 'text',
          title: 'ボタンテキスト',
          type: 'string',
        },
        {
          name: 'link',
          title: 'リンク',
          type: 'url',
        }
      ]
    }),
    defineField({
      name: 'secondaryButton',
      title: 'セカンダリボタン',
      type: 'object',
      fields: [
        {
          name: 'text',
          title: 'ボタンテキスト',
          type: 'string',
        },
        {
          name: 'link',
          title: 'リンク',
          type: 'url',
        }
      ]
    }),
    defineField({
      name: 'layout',
      title: 'レイアウト',
      type: 'string',
      options: {
        list: [
          {title: 'Center', value: 'center'},
          {title: 'Left', value: 'left'},
          {title: 'Right', value: 'right'},
        ]
      },
      initialValue: 'center'
    })
  ],
})