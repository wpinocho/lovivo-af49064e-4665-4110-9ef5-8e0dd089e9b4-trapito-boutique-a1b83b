import { useParams } from 'react-router-dom'
import { SEO } from '@/components/SEO'
import OrderTrackUI from './ui/OrderTrackUI'

const OrderTrack = () => {
  const { token } = useParams<{ token?: string }>()

  return (
    <>
      <SEO title="Rastrea tu pedido" noindex />
      <OrderTrackUI token={token} />
    </>
  )
}

export default OrderTrack