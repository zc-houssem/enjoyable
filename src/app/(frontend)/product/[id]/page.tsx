import { ProductDetail } from '@/components/ProductItem'

export default function Page({ params }: { params: { id: string } }) {
  return <ProductDetail id={params.id} />
}
