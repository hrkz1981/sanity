import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'features',
  title: '機能セクション',
  type: 'object',
  fields: [
    defineField({
      name: 'headline',
      title: 'セクションタイトル',
      type: 'string',
    }),
    defineField({
      name: 'description',
      title: 'セクション説明',
      type: 'text',
    }),
    defineField({
      name: 'featureList',
      title: '機能一覧',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'title',
              title: '機能タイトル',
              type: 'string',
            },
            {
              name: 'description',
              title: '機能説明',
              type: 'text',
            },
            {
              name: 'icon',
              title: 'アイコン',
              type: 'image',
              options: {
                hotspot: true,
              }
            },
            {
              name: 'link',
              title: 'リンク（オプション）',
              type: 'url',
            }
          ],
          preview: {
            select: {
              title: 'title',
              subtitle: 'description',
              media: 'icon',
            },
          },
        }
      ]
    }),
    defineField({
      name: 'layout',
      title: 'レイアウト',
      type: 'string',
      options: {
        list: [
          {title: 'Grid (3列)', value: 'grid-3'},
          {title: 'Grid (2列)', value: 'grid-2'},
          {title: 'List', value: 'list'},
        ]
      },
      initialValue: 'grid-3'
    })
  ],
})