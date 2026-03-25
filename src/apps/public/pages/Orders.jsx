import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Package, ChevronRight } from 'lucide-react'
import { C } from '../theme'

const FILTERS = [
  { label: 'Last 30 days',  value: '30d'  },
  { label: 'Last 3 months', value: '3m'   },
  { label: '2026',          value: '2026' },
  { label: '2025',          value: '2025' },
]

// itemStatus: 'active' | 'delivered' | 'cancelled' | 'refund'
const MOCK_ORDERS = [
  {
    id: 'BS-2026-001',
    date: '25 March 2026',
    total: 1372,
    paymentMethod: 'UPI',
    status: 'Out for Delivery',
    statusSub: 'Package is on the way',
    statusColor: C.accent,
    items: [
      { name: 'Bayer Confidor 200 SL Insecticide', brand: 'Bayer',    size: '250ml', qty: 2, price: 480, itemStatus: 'active',    returnWindow: null, img: 'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=200&h=200&fit=crop' },
      { name: 'Syngenta Ridomil Gold Fungicide',   brand: 'Syngenta', size: '100g',  qty: 1, price: 320, itemStatus: 'active',    returnWindow: null, img: 'https://images.unsplash.com/photo-1471193945509-9ad0617afabf?w=200&h=200&fit=crop' },
      { name: 'IFFCO NPK 19:19:19 Water Soluble',  brand: 'IFFCO',    size: '1kg',   qty: 3, price: 120, itemStatus: 'active',    returnWindow: null, img: 'https://images.unsplash.com/photo-1628352081506-83c43123ed6d?w=200&h=200&fit=crop' },
    ],
  },
  {
    id: 'BS-2026-002',
    date: '20 March 2026',
    total: 320,
    paymentMethod: 'Cash on Delivery',
    status: 'Delivered 22 March 2026',
    statusSub: 'Package was handed to recipient',
    statusColor: C.gray900,
    items: [
      { name: 'Syngenta Ridomil Gold Fungicide', brand: 'Syngenta', size: '100g', qty: 1, price: 320, itemStatus: 'delivered', returnWindow: 'Return window closes on 5 April 2026', img: 'https://images.unsplash.com/photo-1471193945509-9ad0617afabf?w=200&h=200&fit=crop' },
    ],
  },
  {
    id: 'BS-2026-003',
    date: '15 March 2026',
    total: 600,
    paymentMethod: 'UPI',
    status: 'Cancelled',
    statusSub: 'Your order was cancelled',
    statusColor: C.red,
    items: [
      { name: 'IFFCO NPK 19:19:19 Water Soluble', brand: 'IFFCO', size: '1kg', qty: 5, price: 120, itemStatus: 'refund', returnWindow: null, img: 'https://images.unsplash.com/photo-1628352081506-83c43123ed6d?w=200&h=200&fit=crop' },
    ],
  },
]

export default function Orders() {
  const navigate = useNavigate()
  const [filter, setFilter] = useState('30d')

  return (
    <div className="max-w-4xl mx-auto px-4 py-6">

      {/* ── Page header ─────────────────────────────── */}
      <div className="flex items-center justify-between mb-1">
        <h1 className="text-2xl font-bold" style={{ color: C.gray900 }}>Your Orders</h1>
        <div className="flex items-center gap-2">
          <span className="text-sm" style={{ color: C.gray500 }}>Show:</span>
          <select
            value={filter}
            onChange={e => setFilter(e.target.value)}
            className="text-sm font-semibold rounded-lg px-3 py-1.5 outline-none cursor-pointer"
            style={{ border: `1.5px solid ${C.gray200}`, color: C.gray900, backgroundColor: C.white }}
          >
            {FILTERS.map(f => (
              <option key={f.value} value={f.value}>{f.label}</option>
            ))}
          </select>
        </div>
      </div>
      <p className="text-sm mb-5" style={{ color: C.gray400 }}>{MOCK_ORDERS.length} orders</p>

      {/* ── Orders list ─────────────────────────────── */}
      {MOCK_ORDERS.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-24 gap-3">
          <Package size={52} strokeWidth={1.2} style={{ color: C.gray200 }} />
          <p className="font-semibold" style={{ color: C.gray500 }}>No orders found</p>
          <button onClick={() => navigate('/')} className="mt-2 px-5 py-2 rounded-lg text-sm font-bold text-white" style={{ backgroundColor: C.primary }}>
            Start Shopping
          </button>
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          {MOCK_ORDERS.map(order => (
            <div
              key={order.id}
              className="bg-white overflow-hidden"
              style={{ border: '1px solid #D5D9D9' }}
            >
              {/* ── Order header bar ── */}
              <div
                className="flex flex-wrap items-center justify-between px-4 py-2"
                style={{ backgroundColor: '#F0F2F2', borderBottom: '1px solid #D5D9D9' }}
              >
                <div className="flex flex-wrap gap-x-8 gap-y-1">
                  {[
                    { label: 'Order placed', val: order.date         },
                    { label: 'Total',        val: `₹${order.total}`  },
                    { label: 'Payment',      val: order.paymentMethod },
                  ].map(({ label, val }) => (
                    <div key={label}>
                      <p className="text-[10px] font-bold uppercase tracking-wider" style={{ color: C.gray400 }}>{label}</p>
                      <p className="text-sm font-semibold" style={{ color: C.gray900 }}>{val}</p>
                    </div>
                  ))}
                </div>

                <div className="flex items-center gap-4 flex-shrink-0">
                  <div className="text-right hidden sm:block">
                    <p className="text-[10px] font-bold uppercase tracking-wider" style={{ color: C.gray400 }}>Order ID</p>
                    <p className="text-xs font-semibold" style={{ color: C.gray500 }}>#{order.id}</p>
                  </div>
                  <button
                    onClick={() => navigate(`/orders/${order.id}`)}
                    className="flex items-center gap-1 text-xs font-semibold px-3 py-1.5 rounded-lg"
                    style={{ color: C.primary, border: `1.5px solid ${C.primary}`, backgroundColor: C.white }}
                    onMouseEnter={e => e.currentTarget.style.backgroundColor = C.primaryLight}
                    onMouseLeave={e => e.currentTarget.style.backgroundColor = C.white}
                  >
                    View order details <ChevronRight size={12} />
                  </button>
                </div>
              </div>

              {/* ── Status ── */}
              <div className="px-4 pt-3 pb-2">
                <p className="text-base font-bold" style={{ color: order.statusColor }}>{order.status}</p>
                <p className="text-sm" style={{ color: C.gray500 }}>{order.statusSub}</p>
              </div>

              {/* ── Items — each item has its own right action column ── */}
              <div className="flex flex-col">
                {order.items.map((item, idx) => (
                  <div
                    key={idx}
                    className="flex"
                    style={{ borderTop: `1px solid ${C.gray200}`, marginTop: idx === 0 ? 12 : 0 }}
                  >
                    {/* Left: image + details only */}
                    <div className="flex-1 min-w-0 px-4 py-3 flex gap-3 items-start">
                      <div
                        className="w-14 h-14 overflow-hidden flex-shrink-0 border"
                      style={{ borderColor: '#D5D9D9' }}
                        // style={{ borderColor: C.gray200, backgroundColor: C.gray50 }}
                      >
                        <img src={item.img} alt={item.name} className="w-full h-full object-cover" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-normal leading-snug" style={{ color: C.gray900 }}>
                          {item.name}
                        </p>
                        <p className="text-xs mt-0.5 text-gray-600" style={{ color: C.gray400 }}>
                          {item.brand} &nbsp;·&nbsp; {item.size} &nbsp;·&nbsp; Qty: {item.qty}
                        </p>
                        <p className="text-sm font-bold mt-1" style={{ color: C.gray900 }}>
                          ₹{item.price * item.qty}
                        </p>
                        {item.returnWindow && (
                          <p className="text-xs mt-1" style={{ color: C.gray400 }}>{item.returnWindow}</p>
                        )}
                      </div>
                    </div>

                    {/* Right: ALL CTAs stacked */}
                    <div
                      className="hidden sm:flex flex-col justify-center gap-2 px-4 py-3 w-56 flex-shrink-0"
                      style={{ borderLeft: '1px solid #D5D9D9', backgroundColor: '#FAFAFA' }}
                    >
                      {/* Buy it again */}
                      <button
                        className="w-full px-3 py-1.5 rounded text-xs font-bold text-black"
                        style={{ backgroundColor: '#FFD814', border: '1px solid #FCD200' }}
                        onMouseEnter={e => e.currentTarget.style.backgroundColor = C.accentDark}
                        onMouseLeave={e => e.currentTarget.style.backgroundColor = C.accent}
                      >
                        Buy it again
                      </button>

                      {/* View your item */}
                      <button
                        onClick={() => navigate(`/orders/${order.id}`)}
                        className="w-full px-3 py-1.5 rounded text-xs font-semibold text-center"
                        style={{ border: '1px solid #D5D9D9', backgroundColor: '#FFFFFF' }}
                        onMouseEnter={e => e.currentTarget.style.backgroundColor = C.primaryLight}
                        onMouseLeave={e => e.currentTarget.style.backgroundColor = C.white}
                      >
                        View your item
                      </button>

                      {/* Track / Refund — Yellow */}
                      {(item.itemStatus === 'active' || item.itemStatus === 'refund') && (
                        <button
                          className="w-full px-3 py-2 rounded-lg text-xs font-bold text-center transition-colors"
                          style={{
                            backgroundColor: '#FFD814',
                            border: '1px solid #FCD200',
                            color: '#0F1111',
                          }}
                          onMouseEnter={e => e.currentTarget.style.backgroundColor = '#FDE047'}
                          onMouseLeave={e => e.currentTarget.style.backgroundColor = '#FEF08A'}
                        >
                          {item.itemStatus === 'refund'
                            ? 'View Refund / Replace Status'
                            : 'Track Your Package'}
                        </button>
                      )}

                      {/* Post-delivery CTAs */}
                      {item.itemStatus === 'delivered' && (
                        <>
                          <button
                            className="w-full px-3 py-2 rounded-lg text-xs font-bold text-center transition-colors"
                            style={{ backgroundColor: '#FEF08A', border: '1.5px solid #EAB308', color: '#713F12' }}
                            onMouseEnter={e => e.currentTarget.style.backgroundColor = '#FDE047'}
                            onMouseLeave={e => e.currentTarget.style.backgroundColor = '#FEF08A'}
                          >
                            Track Your Package
                          </button>
                          {['Write Product Review', 'Leave Seller Feedback', 'Leave Delivery Feedback'].map(label => (
                            <button
                              key={label}
                              className="w-full px-3 py-2 rounded-lg text-xs font-semibold text-center transition-colors"
                              style={{ border: `1.5px solid ${C.gray200}`, color: C.gray700, backgroundColor: C.white }}
                              onMouseEnter={e => e.currentTarget.style.backgroundColor = C.primaryLight}
                              onMouseLeave={e => e.currentTarget.style.backgroundColor = C.white}
                            >
                              {label}
                            </button>
                          ))}
                        </>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}