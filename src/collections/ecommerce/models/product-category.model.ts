import { CollectionConfig } from 'payload'

export const ProductCategory: CollectionConfig = {
  slug: 'product-category',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'label',
      type: 'text',
    },
  ],
}
