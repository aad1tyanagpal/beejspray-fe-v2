import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { Trash2, Plus, Minus, ShoppingCart, ArrowRight, Tag } from 'lucide-react'
import { removeItem, updateQty } from '../../../features/cart/cartSlice'
import { C } from '../theme'

const DISCOUNT_PCT = 2

export default function Cart() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const items    = useSelector(s => s.cart.items)

  const FREE_DELIVERY_AT = 1000
  const subtotal   = items.reduce((sum, i) => sum + i.retailPrice * i.qty, 0)
  const discount   = Math.round(subtotal * DISCOUNT_PCT / 100)
  const delivery   = subtotal >= FREE_DELIVERY_AT ? 0 : 99
  const total      = subtotal - discount + delivery
  const amtNeeded  = FREE_DELIVERY_AT - subtotal
  const totalSaved = items.reduce((sum, i) => sum + Math.max(0, i.mrp - i.retailPrice) * i.qty, 0)

  // ── Empty state ────────────────────────────────────────────
  if (items.length === 0) return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center gap-4 px-4">
      <ShoppingCart size={56} strokeWidth={1.2} style={{ color: C.gray200 }} />
      <p className="text-lg font-bold" style={{ color: C.gray700 }}>Your cart is empty</p>
      <p className="text-sm text-center" style={{ color: C.gray400 }}>
        Add products from the store to see them here.
      </p>
      <button
        onClick={() => navigate('/')}
        className="mt-2 px-6 py-2.5 rounded-lg text-sm font-bold text-white"
        style={{ backgroundColor: C.primary }}
        onMouseEnter={e => e.currentTarget.style.backgroundColor = C.primaryDark}
        onMouseLeave={e => e.currentTarget.style.backgroundColor = C.primary}
      >
        Continue Shopping
      </button>
    </div>
  )

  return (
    <div className="max-w-[1100px] mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold mb-6" style={{ color: C.gray900 }}>
        Shopping Cart
        <span className="text-base font-normal ml-2" style={{ color: C.gray400 }}>
          ({items.length} {items.length === 1 ? 'item' : 'items'})
        </span>
      </h1>

      <div className="flex flex-col lg:flex-row gap-6 items-start">

        {/* ── Left: Cart Items ────────────────────────────── */}
        <div className="flex-1 flex flex-col gap-3 w-full">

          {/* Savings banner */}
          {totalSaved > 0 && (
            <div
              className="flex items-center gap-2 px-4 py-3 rounded-xl"
              style={{ backgroundColor: C.primaryLight, border: `1px solid ${C.sectionBg3Border}` }}
            >
              <Tag size={15} style={{ color: C.primary }} />
              <p className="text-sm font-semibold" style={{ color: C.primaryDark }}>
                You're saving ₹{totalSaved} on MRP with BeejSpray prices!
              </p>
            </div>
          )}

          {items.map(item => (
            <div
              key={item.id}
              className="bg-white rounded-2xl p-4 flex gap-4"
              style={{ border: `1.5px solid ${C.gray200}`, boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}
            >
              {/* Image */}
              <div
                className="w-20 h-20 rounded-xl overflow-hidden flex-shrink-0"
                style={{ backgroundColor: C.gray50 }}
              >
                <img src={item.img} alt={item.name} className="w-full h-full object-cover" />
              </div>

              {/* Details */}
              <div className="flex-1 min-w-0 flex flex-col gap-1">
                <p className="text-[11px] font-bold uppercase tracking-wide" style={{ color: C.primary }}>
                  {item.brand}
                </p>
                <p className="text-sm font-semibold leading-snug line-clamp-2" style={{ color: C.gray900 }}>
                  {item.name}
                </p>
                <p className="text-xs" style={{ color: C.gray400 }}>Size: {item.size}</p>

                {/* Price row */}
                <div className="flex items-baseline gap-2 mt-1">
                  <span className="text-base font-extrabold" style={{ color: C.gray900 }}>
                    ₹{item.retailPrice}
                  </span>
                  {item.mrp > item.retailPrice && (
                    <span className="text-xs line-through" style={{ color: C.gray400 }}>₹{item.mrp}</span>
                  )}
                  {item.mrp > item.retailPrice && (
                    <span
                      className="text-[10px] font-bold px-1.5 py-0.5 rounded"
                      style={{ backgroundColor: C.accentLight, color: C.accentDark }}
                    >
                      {Math.round((item.mrp - item.retailPrice) / item.mrp * 100)}% OFF
                    </span>
                  )}
                </div>
              </div>

              {/* Right: qty + delete */}
              <div className="flex flex-col items-end justify-between flex-shrink-0">
                {/* Delete */}
                <button
                  onClick={() => dispatch(removeItem(item.id))}
                  className="p-1.5 rounded-lg transition-colors"
                  style={{ color: C.gray400 }}
                  onMouseEnter={e => { e.currentTarget.style.color = C.red; e.currentTarget.style.backgroundColor = '#FEE2E2' }}
                  onMouseLeave={e => { e.currentTarget.style.color = C.gray400; e.currentTarget.style.backgroundColor = 'transparent' }}
                >
                  <Trash2 size={16} />
                </button>

                {/* Qty stepper */}
                <div
                  className="flex items-center rounded-lg overflow-hidden"
                  style={{ border: `1.5px solid ${C.gray200}` }}
                >
                  <button
                    onClick={() => dispatch(updateQty({ id: item.id, qty: item.qty - 1 }))}
                    disabled={item.qty <= 1}
                    className="w-8 h-8 flex items-center justify-center transition-colors disabled:opacity-30"
                    style={{ color: C.primary }}
                    onMouseEnter={e => e.currentTarget.style.backgroundColor = C.primaryLight}
                    onMouseLeave={e => e.currentTarget.style.backgroundColor = 'transparent'}
                  >
                    <Minus size={14} />
                  </button>
                  <span
                    className="w-8 h-8 flex items-center justify-center text-sm font-bold"
                    style={{ color: C.gray900, borderLeft: `1px solid ${C.gray200}`, borderRight: `1px solid ${C.gray200}` }}
                  >
                    {item.qty}
                  </span>
                  <button
                    onClick={() => dispatch(updateQty({ id: item.id, qty: item.qty + 1 }))}
                    className="w-8 h-8 flex items-center justify-center transition-colors"
                    style={{ color: C.primary }}
                    onMouseEnter={e => e.currentTarget.style.backgroundColor = C.primaryLight}
                    onMouseLeave={e => e.currentTarget.style.backgroundColor = 'transparent'}
                  >
                    <Plus size={14} />
                  </button>
                </div>

                {/* Item total */}
                <p className="text-sm font-bold" style={{ color: C.gray900 }}>
                  ₹{item.retailPrice * item.qty}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* ── Right: Order Summary ─────────────────────────── */}
        <div
          className="w-full lg:w-80 rounded-2xl overflow-hidden flex-shrink-0 sticky top-4"
          style={{ border: `1.5px solid ${C.gray200}`, boxShadow: '0 4px 16px rgba(26,61,32,0.10)' }}
        >
          {/* Summary header */}
          <div className="px-5 py-4" style={{ background: `linear-gradient(135deg, ${C.headerBg} 0%, #2D6A3F 100%)` }}>
            <p className="text-white font-bold text-base">Order Summary</p>
          </div>

          <div className="bg-white px-5 py-4 flex flex-col gap-3">
            {/* Line items */}
            <div className="flex justify-between text-sm" style={{ color: C.gray700 }}>
              <span>Retail Price ({items.reduce((s, i) => s + i.qty, 0)} items)</span>
              <span className="font-semibold">₹{subtotal}</span>
            </div>

            <div className="flex justify-between text-sm" style={{ color: C.green }}>
              <span>− {DISCOUNT_PCT}% Online Discount</span>
              <span className="font-semibold">− ₹{discount}</span>
            </div>

            <div className="flex justify-between text-sm" style={{ color: C.gray700 }}>
              <span>Delivery Charges</span>
              <span className="font-semibold" style={{ color: delivery === 0 ? C.green : C.gray900 }}>
                {delivery === 0 ? 'FREE' : `₹${delivery}`}
              </span>
            </div>

            {/* Free delivery progress nudge */}
            {amtNeeded > 0 && (
              <div className="flex flex-col gap-1.5">
                <div className="w-full h-1.5 rounded-full overflow-hidden" style={{ backgroundColor: C.gray200 }}>
                  <div
                    className="h-full rounded-full transition-all"
                    style={{ width: `${Math.min((subtotal / FREE_DELIVERY_AT) * 100, 100)}%`, backgroundColor: C.primary }}
                  />
                </div>
                <p className="text-xs" style={{ color: C.primaryDark }}>
                  Add ₹{amtNeeded} more for <span className="font-bold">FREE delivery</span>
                </p>
              </div>
            )}
            {delivery === 0 && (
              <p className="text-xs font-semibold" style={{ color: C.green }}>
                🎉 You've unlocked free delivery!
              </p>
            )}

            <div
              className="border-t pt-3 flex justify-between"
              style={{ borderColor: C.gray200 }}
            >
              <span className="font-bold text-base" style={{ color: C.gray900 }}>Amount Payable</span>
              <span className="font-extrabold text-lg" style={{ color: C.gray900 }}>₹{total}</span>
            </div>

            {/* 2% discount note */}
            <div
              className="flex items-start gap-2 rounded-lg px-3 py-2.5"
              style={{ backgroundColor: C.primaryLight, border: `1px solid ${C.sectionBg3Border}` }}
            >
              <Tag size={13} className="mt-0.5 flex-shrink-0" style={{ color: C.primary }} />
              <p className="text-xs leading-snug" style={{ color: C.primaryDark }}>
                2% discount applied for online payment. 
              </p>  
            </div>

            {/* KCC Banner */}
            <div
              className="rounded-lg px-3 py-2.5 text-center"
              style={{ backgroundColor: C.sectionBg3, border: `1px solid ${C.sectionBg3Border}` }}
            >
              <p className="text-xs font-bold" style={{ color: C.accentDark }}>
                💳 Pay with your Kisan Credit Card at 4% interest
              </p>
            </div>

            {/* Checkout CTA */}
            <button
              onClick={() => navigate('/checkout')}
              className="w-full py-3 rounded-xl text-sm font-bold text-white flex items-center justify-center gap-2 transition-all mt-1"
              style={{ backgroundColor: C.accent }}
              onMouseEnter={e => e.currentTarget.style.backgroundColor = C.accentDark}
              onMouseLeave={e => e.currentTarget.style.backgroundColor = C.accent}
            >
              Proceed to Checkout
              <ArrowRight size={16} />
            </button>

            <button
              onClick={() => navigate('/')}
              className="w-full py-2 text-sm font-semibold transition-all"
              style={{ color: C.primary }}
              onMouseEnter={e => e.currentTarget.style.color = C.primaryDark}
              onMouseLeave={e => e.currentTarget.style.color = C.primary}
            >
              Continue Shopping
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}