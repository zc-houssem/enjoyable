import type { CollectionConfig } from 'payload'

export const Product: CollectionConfig = {
  slug: 'product',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
    },
    {
      name: 'description',
      type: 'richText',
    },
    {
      name: 'price',
      type: 'number',
      min: 0,
    },
    {
      name: 'stock',
      type: 'number',
      min: 0,
    },
    {
      name: 'discount',
      type: 'number',
      min: 0,
      max: 99,
    },
    {
      name: 'currency',
      type: 'relationship',
      relationTo: 'currency',
      admin: {
        appearance: 'drawer',
      },
    },
    {
      name: 'seller',
      type: 'relationship',
      relationTo: 'users',
    },
    {
      name: 'features',
      type: 'array',
      fields: [
        {
          name: 'feature',
          type: 'text',
        },
      ],
    },
    {
      name: 'category',
      type: 'relationship',
      relationTo: 'product-category',
      label: 'label',
      admin: {
        appearance: 'drawer',
      },
    },
    {
      name: 'brand',
      type: 'text',
    },
    {
      name: 'image',
      type: 'relationship',
      relationTo: 'media',
      hasMany: true,
    },
  ],
}
