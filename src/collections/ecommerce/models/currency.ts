import { CollectionConfig } from 'payload'

export const Currency: CollectionConfig = {
  slug: 'currency',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'label',
      type: 'text',
    },
    {
      name: 'symbol',
      type: 'text',
    },
    {
      name: 'alpha2',
      type: 'text',
    },
    {
      name: 'alpha3',
      type: 'text',
    },
  ],
}
