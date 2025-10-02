import { CollectionConfig } from 'payload'

export const Cart: CollectionConfig = {
  slug: 'cart',
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
      name: 'items',
      type: 'array',
      fields: [
        {
          name: 'product',
          type: 'relationship',
          relationTo: 'product',
          required: true,
          admin: {
            appearance: 'drawer',
          },
        },
        {
          name: 'quantity',
          type: 'number',
          required: true,
          min: 1,
          defaultValue: 1,
        },
      ],
    },
  ],
}
