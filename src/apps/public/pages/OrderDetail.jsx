import { useParams, useNavigate } from 'react-router-dom'
import { CheckCircle2, Circle, ExternalLink, Download, ChevronLeft, MapPin, CreditCard, Clock } from 'lucide-react'
import { C } from '../theme'

const MOCK_ORDER = {
  id: 'BS-2026-001',
  date: '25 Mar 2026, 10:30 AM',
  total: 1372,
  discount: 28,
  delivery: 0,
  paymentMethod: 'UPI',
  address: {
    name: 'Neeraj Balana',
    mobile: '9876543210',
    line: 'Ward No. 12, Near Govt School, Anupgarh, Rajasthan — 335701',
  },
  items: [
    { name: 'Bayer Confidor 200 SL Insecticide', brand: 'Bayer',    size: '250ml', qty: 2, price: 480, img: 'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=80&h=80&fit=crop' },
    { name: 'Syngenta Ridomil Gold Fungicide',   brand: 'Syngenta', size: '100g',  qty: 1, price: 320, img: 'https://images.unsplash.com/photo-1471193945509-9ad0617afabf?w=80&h=80&fit=crop'  },
    { name: 'IFFCO NPK 19:19:19 Water Soluble',  brand: 'IFFCO',    size: '1kg',   qty: 3, price: 120, img: 'https://images.unsplash.com/photo-1628352081506-83c43123ed6d?w=80&h=80&fit=crop'  },
  ],
  tracking: [
    { stage: 'Order Placed',       time: '25 Mar, 10:30 AM', done: true,  active: false, link: null },
    { stage: 'Accepted by Vendor', time: '25 Mar, 10:55 AM', done: true,  active: false, link: null },
    { stage: 'Packed',             time: '25 Mar, 2:00 PM',  done: true,  active: false, link: null },
    { stage: 'Shipped',            time: '25 Mar, 9:00 AM',  done: true,  active: false, link: 'https://www.delhivery.com' },
    { stage: 'Out for Delivery',   time: '25 Mar, 11:00 AM', done: false, active: true,  link: null },
    { stage: 'Delivered',          time: 'Expected by 6 PM', done: false, active: false, link: null },
  ],
}

function TrackingDot({ done, active }) {
  if (done) {
    return (
      <div className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0"
        style={{ backgroundColor: C.primary }}>
        <CheckCircle2 size={18} color={C.white} />
      </div>
    )
  }
  if (active) {
    return (
      <div className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0"
        style={{ backgroundColor: C.accent, border: `2px solid ${C.accentDark}` }}>
        <div className="w-2.5 h-2.5 rounded-full bg-white" />
      </div>
    )
  }
  return (
    <div className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0"
      style={{ backgroundColor: C.gray200 }}>
      <Circle size={14} color={C.gray400} />
    </div>
  )
}

export default function OrderDetail() {
  const { id }   = useParams()
  const navigate = useNavigate()
  const order    = MOCK_ORDER

  return (
    <div className="max-w-2xl mx-auto px-4 py-6">

      {/* ── Back + Header ──────────────────────────── */}
      <button
        onClick={() => navigate('/orders')}
        className="flex items-center gap-1 text-sm font-semibold mb-4"
        style={{ color: C.primary }}
      >
        <ChevronLeft size={16} /> Back to Orders
      </button>

      <div className="flex items-start justify-between mb-5">
        <div>
          <h1 className="text-xl font-bold" style={{ color: C.gray900 }}>Order #{order.id}</h1>
          <p className="text-xs mt-0.5" style={{ color: C.gray400 }}>Placed on {order.date}</p>
        </div>
        <button
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold"
          style={{ border: `1.5px solid ${C.gray200}`, color: C.gray700 }}
        >
          <Download size={13} /> Invoice
        </button>
      </div>

      {/* ── Tracking Timeline ──────────────────────── */}
      <div
        className="bg-white rounded-2xl p-5 mb-4"
        style={{ border: `1.5px solid ${C.gray200}`, boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}
      >
        <h2 className="text-sm font-bold mb-5" style={{ color: C.gray900 }}>Order Tracking</h2>

        {order.tracking.map((t, idx) => {
          const isLast = idx === order.tracking.length - 1
          return (
            <div key={t.stage} className="flex gap-4">

              {/* Dot + connector line */}
              <div className="flex flex-col items-center">
                <TrackingDot done={t.done} active={t.active} />
                {!isLast && (
                  <div
                    className="w-0.5 my-1"
                    style={{ flex: 1, minHeight: 28, backgroundColor: t.done ? C.primary : C.gray200 }}
                  />
                )}
              </div>

              {/* Text */}
              <div className={`flex-1 ${isLast ? 'pb-0' : 'pb-5'}`}>
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <p
                        className="text-sm font-semibold"
                        style={{ color: t.active ? C.accent : t.done ? C.gray900 : C.gray400 }}
                      >
                        {t.stage}
                      </p>
                      {t.active && (
                        <span
                          className="text-[10px] font-bold px-2 py-0.5 rounded-full"
                          style={{ backgroundColor: `${C.accent}20`, color: C.accent }}
                        >
                          Current
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-1 mt-0.5">
                      <Clock size={11} style={{ color: C.gray400 }} />
                      <p className="text-xs" style={{ color: C.gray400 }}>{t.time}</p>
                    </div>
                  </div>
                  {t.link && (
                    <a
                      href={t.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 text-xs font-semibold flex-shrink-0 px-2.5 py-1 rounded-lg"
                      style={{ backgroundColor: C.primaryLight, color: C.primary }}
                    >
                      Delhivery <ExternalLink size={11} />
                    </a>
                  )}
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* ── Items ──────────────────────────────────── */}
      <div
        className="bg-white rounded-2xl p-5 mb-4"
        style={{ border: `1.5px solid ${C.gray200}`, boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}
      >
        <h2 className="text-sm font-bold mb-4" style={{ color: C.gray900 }}>
          Items ({order.items.length})
        </h2>
        <div className="flex flex-col">
          {order.items.map((item, i) => (
            <div
              key={i}
              className="flex gap-3 items-center py-3"
              style={{ borderTop: i !== 0 ? `1px solid ${C.gray200}` : 'none' }}
            >
              <div
                className="w-14 h-14 rounded-xl overflow-hidden flex-shrink-0"
                style={{ backgroundColor: C.gray50 }}
              >
                <img src={item.img} alt={item.name} className="w-full h-full object-cover" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[11px] font-bold uppercase tracking-wide" style={{ color: C.primary }}>{item.brand}</p>
                <p className="text-sm font-semibold line-clamp-1 mt-0.5" style={{ color: C.gray900 }}>{item.name}</p>
                <p className="text-xs mt-0.5" style={{ color: C.gray400 }}>
                  {item.size} &nbsp;·&nbsp; Qty: {item.qty}
                </p>
              </div>
              <p className="text-sm font-bold flex-shrink-0" style={{ color: C.gray900 }}>
                ₹{item.price * item.qty}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* ── Payment + Address ──────────────────────── */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

        <div
          className="bg-white rounded-2xl p-5"
          style={{ border: `1.5px solid ${C.gray200}` }}
        >
          <h2 className="text-sm font-bold mb-3" style={{ color: C.gray900 }}>Payment Summary</h2>
          <div className="flex flex-col gap-2">
            <div className="flex justify-between text-sm" style={{ color: C.gray700 }}>
              <span>Retail Price</span>
              <span>₹{order.total + order.discount}</span>
            </div>
            <div className="flex justify-between text-sm" style={{ color: C.green }}>
              <span>− 2% Online Discount</span>
              <span>− ₹{order.discount}</span>
            </div>
            <div className="flex justify-between text-sm" style={{ color: C.gray700 }}>
              <span>Delivery</span>
              <span style={{ color: order.delivery === 0 ? C.green : C.gray900 }}>
                {order.delivery === 0 ? 'FREE' : `₹${order.delivery}`}
              </span>
            </div>
            <div
              className="flex justify-between font-bold text-base pt-2"
              style={{ borderTop: `1px solid ${C.gray200}`, color: C.gray900 }}
            >
              <span>Total Paid</span>
              <span>₹{order.total}</span>
            </div>
            <div className="flex items-center gap-2 mt-1">
              <CreditCard size={13} style={{ color: C.gray400 }} />
              <span className="text-xs" style={{ color: C.gray400 }}>Paid via {order.paymentMethod}</span>
            </div>
          </div>
        </div>

        <div
          className="bg-white rounded-2xl p-5"
          style={{ border: `1.5px solid ${C.gray200}` }}
        >
          <h2 className="text-sm font-bold mb-3" style={{ color: C.gray900 }}>Delivery Address</h2>
          <div className="flex gap-2">
            <MapPin size={15} className="flex-shrink-0 mt-0.5" style={{ color: C.primary }} />
            <div>
              <p className="text-sm font-bold" style={{ color: C.gray900 }}>{order.address.name}</p>
              <p className="text-sm mt-0.5 leading-relaxed" style={{ color: C.gray500 }}>{order.address.line}</p>
              <p className="text-xs mt-1" style={{ color: C.gray400 }}>Mobile: {order.address.mobile}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}