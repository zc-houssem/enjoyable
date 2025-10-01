import type { CollectionConfig } from 'payload'

export const Invoice: CollectionConfig = {
  slug: 'invoice',
  access: {
    read: () => true,
    create: () => true,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
    },
    {
      name: 'body',
      type: 'select',
      options: [
        {
          label: 'Hello',
          value: 'hello',
        },
        {
          label: 'World',
          value: 'world',
        },
      ],
      access: {
        read: () => true,
        create: () => true,
      },
    },
  ],
}
