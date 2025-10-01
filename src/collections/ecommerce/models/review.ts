import { CollectionConfig } from 'payload'

export const Review: CollectionConfig = {
  slug: 'review',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'buyer',
      type: 'relationship',
      relationTo: 'users',
      admin: {
        appearance: 'drawer',
      },
    },
    {
      name: 'rating',
      type: 'number',
      min: 0,
      max: 5,
    },
    {
      name: 'comment',
      type: 'richText',
    },
  ],
}
