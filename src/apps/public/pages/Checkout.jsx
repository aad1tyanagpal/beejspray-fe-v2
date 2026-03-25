import { useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { MapPin, Plus, ChevronRight, Smartphone, CreditCard, Wallet, Banknote, CheckCircle2, Clock, ShieldCheck } from 'lucide-react'
import { C } from '../theme'

const DISCOUNT_PCT = 2

// ── Mock saved addresses (register flow se aayenge backend pe) ──
const SAVED_ADDRESSES = [
  { id: 1, name: 'Neeraj Balana', mobile: '9876543210', line1: 'Ward No. 12, Near Govt School', line2: '', city: 'Anupgarh', state: 'Rajasthan', pincode: '335701', isDefault: true },
  { id: 2, name: 'Neeraj Balana', mobile: '9876543210', line1: 'Shop No. 5, Main Market Road', line2: '', city: 'Anupgarh', state: 'Rajasthan', pincode: '335701', isDefault: false },
]

const PAYMENT_METHODS = [
  { id: 'upi',    icon: Smartphone, label: 'UPI',                       sub: 'PhonePe, GPay, Paytm, BHIM',              badge: null                        },
  { id: 'card',   icon: CreditCard, label: 'Credit / Debit Card',       sub: 'Visa, Mastercard, RuPay',                 badge: null                        },
  { id: 'kcc',    icon: CreditCard, label: 'Kisan Credit Card (KCC)',   sub: 'RuPay KCC — Pay at just 4% interest',     badge: '4% Interest'               },
  { id: 'wallet', icon: Wallet,     label: 'PhonePe Wallet',            sub: 'Use your PhonePe balance',                badge: null                        },
  { id: 'cod',    icon: Banknote,   label: 'Cash on Delivery',          sub: 'Pay when your order arrives',             badge: null                        },
]

// ── Section header ──────────────────────────────────────────────
const SectionHead = ({ num, title }) => (
  <div className="flex items-center gap-3 mb-4">
    <div
      className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold text-white flex-shrink-0"
      style={{ backgroundColor: C.primary }}
    >
      {num}
    </div>
    <h2 className="text-base font-bold" style={{ color: C.gray900 }}>{title}</h2>
  </div>
)

// ── Divider ─────────────────────────────────────────────────────
const Divider = () => <div className="my-5 border-t" style={{ borderColor: C.gray200 }} />

export default function Checkout() {
  const navigate  = useNavigate()
  const items     = useSelector(s => s.cart.items)

  const [selectedAddr, setSelectedAddr] = useState(SAVED_ADDRESSES[0].id)
  const [addingNew, setAddingNew]        = useState(false)
  const [payMethod, setPayMethod]        = useState('upi')
  const [placed, setPlaced]              = useState(false)

  // ── New address form state ──
  const [form, setForm] = useState({ name: '', mobile: '', line1: '', line2: '', city: '', state: '', pincode: '' })
  const formValid = form.name && form.mobile.length === 10 && form.line1 && form.city && form.state && form.pincode.length === 6

  const subtotal  = items.reduce((s, i) => s + i.retailPrice * i.qty, 0)
  const discount  = Math.round(subtotal * DISCOUNT_PCT / 100)
  const delivery  = subtotal >= 1000 ? 0 : 99   // mock: free above ₹2000
  const total     = subtotal - discount + delivery

  const handlePlaceOrder = () => {
    setPlaced(true)
    // dispatch placeOrder(...) — wire later
  }

  // ── Order Placed screen ─────────────────────────────────────
  if (placed) return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center gap-4 px-4 text-center">
      <div
        className="w-20 h-20 rounded-full flex items-center justify-center"
        style={{ backgroundColor: C.primaryLight }}
      >
        <CheckCircle2 size={44} style={{ color: C.primary }} />
      </div>
      <h1 className="text-2xl font-bold" style={{ color: C.gray900 }}>Order Placed!</h1>
      <p className="text-sm max-w-xs" style={{ color: C.gray500 }}>
        Your order has been confirmed. You'll receive a WhatsApp notification once the vendor accepts it.
      </p>
      <div
        className="flex items-center gap-2 px-4 py-3 rounded-xl mt-2"
        style={{ backgroundColor: C.primaryLight, border: `1px solid ${C.sectionBg3Border}` }}
      >
        <Clock size={15} style={{ color: C.primary }} />
        <p className="text-sm font-semibold" style={{ color: C.primaryDark }}>
          Estimated delivery: 2–3 business days
        </p>
      </div>
      <button
        onClick={() => navigate('/')}
        className="mt-4 px-8 py-3 rounded-xl text-sm font-bold text-white"
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
      <h1 className="text-2xl font-bold mb-6" style={{ color: C.gray900 }}>Checkout</h1>

      <div className="flex flex-col lg:flex-row gap-6 items-start">

        {/* ── Left column ──────────────────────────────────── */}
        <div className="flex-1 w-full flex flex-col gap-0">

          {/* ── Section 1: Delivery Address ────────────────── */}
          <div
            className="bg-white rounded-2xl p-5"
            style={{ border: `1.5px solid ${C.gray200}`, boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}
          >
            <SectionHead num={1} title="Delivery Address" />

            {/* Saved addresses */}
            {!addingNew && (
              <div className="flex flex-col gap-3">
                {SAVED_ADDRESSES.map(a => (
                  <button
                    key={a.id}
                    onClick={() => setSelectedAddr(a.id)}
                    className="w-full text-left p-4 rounded-xl transition-all"
                    style={{
                      border: `1.5px solid ${selectedAddr === a.id ? C.primary : C.gray200}`,
                      backgroundColor: selectedAddr === a.id ? C.primaryLight : C.white,
                    }}
                  >
                    <div className="flex items-start gap-3">
                      {/* Radio */}
                      <div
                        className="w-4 h-4 rounded-full border-2 flex items-center justify-center flex-shrink-0 mt-0.5"
                        style={{ borderColor: selectedAddr === a.id ? C.primary : C.gray400 }}
                      >
                        {selectedAddr === a.id && (
                          <div className="w-2 h-2 rounded-full" style={{ backgroundColor: C.primary }} />
                        )}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <p className="text-sm font-bold" style={{ color: C.gray900 }}>{a.name}</p>
                          {a.isDefault && (
                            <span
                              className="text-[10px] font-bold px-2 py-0.5 rounded"
                              style={{ backgroundColor: C.primaryLight, color: C.primaryDark }}
                            >
                              Default
                            </span>
                          )}
                        </div>
                        <p className="text-sm mt-0.5" style={{ color: C.gray500 }}>
                          {a.line1}{a.line2 ? `, ${a.line2}` : ''}, {a.city}, {a.state} — {a.pincode}
                        </p>
                        <p className="text-xs mt-0.5" style={{ color: C.gray400 }}>Mobile: {a.mobile}</p>
                      </div>
                    </div>
                  </button>
                ))}

                {/* Add new address */}
                <button
                  onClick={() => setAddingNew(true)}
                  className="w-full flex items-center gap-2 p-3 rounded-xl border-dashed transition-all"
                  style={{ border: `1.5px dashed ${C.gray200}`, color: C.primary }}
                  onMouseEnter={e => e.currentTarget.style.borderColor = C.primary}
                  onMouseLeave={e => e.currentTarget.style.borderColor = C.gray200}
                >
                  <Plus size={16} />
                  <span className="text-sm font-semibold">Add a new address</span>
                </button>
              </div>
            )}

            {/* New address form */}
            {addingNew && (
              <div className="flex flex-col gap-3">
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { key: 'name',    label: 'Full Name',    placeholder: 'Full name',         type: 'text'  },
                    { key: 'mobile',  label: 'Mobile',       placeholder: '10-digit number',   type: 'tel', maxLength: 10 },
                  ].map(f => (
                    <div key={f.key} className="flex flex-col gap-1">
                      <label className="text-xs font-semibold" style={{ color: C.gray700 }}>{f.label}</label>
                      <input
                        type={f.type}
                        placeholder={f.placeholder}
                        maxLength={f.maxLength}
                        value={form[f.key]}
                        onChange={e => setForm(p => ({ ...p, [f.key]: f.key === 'mobile' ? e.target.value.replace(/\D/g,'') : e.target.value }))}
                        className="px-3 py-2 rounded-lg text-sm outline-none"
                        style={{ border: `1.5px solid ${C.gray200}`, color: C.gray900 }}
                        onFocus={e => e.currentTarget.style.borderColor = C.primary}
                        onBlur={e => e.currentTarget.style.borderColor = C.gray200}
                      />
                    </div>
                  ))}
                </div>

                {[
                  { key: 'line1', label: 'Address Line 1', placeholder: 'House / Plot no., Street, Village' },
                  { key: 'line2', label: 'Address Line 2 (Optional)', placeholder: 'Tehsil, Landmark' },
                ].map(f => (
                  <div key={f.key} className="flex flex-col gap-1">
                    <label className="text-xs font-semibold" style={{ color: C.gray700 }}>{f.label}</label>
                    <input
                      type="text"
                      placeholder={f.placeholder}
                      value={form[f.key]}
                      onChange={e => setForm(p => ({ ...p, [f.key]: e.target.value }))}
                      className="w-full px-3 py-2 rounded-lg text-sm outline-none"
                      style={{ border: `1.5px solid ${C.gray200}`, color: C.gray900 }}
                      onFocus={e => e.currentTarget.style.borderColor = C.primary}
                      onBlur={e => e.currentTarget.style.borderColor = C.gray200}
                    />
                  </div>
                ))}

                <div className="grid grid-cols-2 gap-3">
                  <div className="flex flex-col gap-1">
                    <label className="text-xs font-semibold" style={{ color: C.gray700 }}>City / Town</label>
                    <input
                      type="text" placeholder="e.g. Anupgarh"
                      value={form.city}
                      onChange={e => setForm(p => ({ ...p, city: e.target.value }))}
                      className="px-3 py-2 rounded-lg text-sm outline-none"
                      style={{ border: `1.5px solid ${C.gray200}`, color: C.gray900 }}
                      onFocus={e => e.currentTarget.style.borderColor = C.primary}
                      onBlur={e => e.currentTarget.style.borderColor = C.gray200}
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="text-xs font-semibold" style={{ color: C.gray700 }}>Pincode</label>
                    <input
                      type="tel" inputMode="numeric" maxLength={6} placeholder="6-digit"
                      value={form.pincode}
                      onChange={e => setForm(p => ({ ...p, pincode: e.target.value.replace(/\D/g,'') }))}
                      className="px-3 py-2 rounded-lg text-sm outline-none"
                      style={{ border: `1.5px solid ${C.gray200}`, color: C.gray900 }}
                      onFocus={e => e.currentTarget.style.borderColor = C.primary}
                      onBlur={e => e.currentTarget.style.borderColor = C.gray200}
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-1">
                  <label className="text-xs font-semibold" style={{ color: C.gray700 }}>State</label>
                  <select
                    value={form.state}
                    onChange={e => setForm(p => ({ ...p, state: e.target.value }))}
                    className="w-full px-3 py-2 rounded-lg text-sm outline-none appearance-none"
                    style={{ border: `1.5px solid ${C.gray200}`, color: form.state ? C.gray900 : C.gray400, backgroundColor: C.white }}
                    onFocus={e => e.currentTarget.style.borderColor = C.primary}
                    onBlur={e => e.currentTarget.style.borderColor = C.gray200}
                  >
                    <option value="" disabled>Select state</option>
                    {['Andhra Pradesh','Arunachal Pradesh','Assam','Bihar','Chhattisgarh','Goa','Gujarat','Haryana','Himachal Pradesh','Jharkhand','Karnataka','Kerala','Madhya Pradesh','Maharashtra','Manipur','Meghalaya','Mizoram','Nagaland','Odisha','Punjab','Rajasthan','Sikkim','Tamil Nadu','Telangana','Tripura','Uttar Pradesh','Uttarakhand','West Bengal','Andaman & Nicobar Islands','Chandigarh','Dadra & Nagar Haveli and Daman & Diu','Delhi','Jammu & Kashmir','Ladakh','Lakshadweep','Puducherry'].map(s => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                </div>

                <div className="flex gap-2 mt-1">
                  <button
                    onClick={() => { if (formValid) setAddingNew(false) }}
                    disabled={!formValid}
                    className="flex-1 py-2.5 rounded-lg text-sm font-bold text-white disabled:opacity-40"
                    style={{ backgroundColor: C.primary }}
                  >
                    Use This Address
                  </button>
                  <button
                    onClick={() => setAddingNew(false)}
                    className="px-4 py-2.5 rounded-lg text-sm font-semibold"
                    style={{ border: `1.5px solid ${C.gray200}`, color: C.gray500 }}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}
          </div>

          <Divider />

          {/* ── Section 2: Payment Method ───────────────────── */}
          <div
            className="bg-white rounded-2xl p-5"
            style={{ border: `1.5px solid ${C.gray200}`, boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}
          >
            <SectionHead num={2} title="Payment Method" />

            <div className="flex flex-col gap-3">
              {PAYMENT_METHODS.map(m => (
                <button
                  key={m.id}
                  onClick={() => setPayMethod(m.id)}
                  className="w-full flex items-center gap-4 p-4 rounded-xl transition-all"
                  style={{
                    border: `1.5px solid ${payMethod === m.id ? C.primary : C.gray200}`,
                    backgroundColor: payMethod === m.id ? C.primaryLight : C.white,
                  }}
                >
                  {/* Radio */}
                  <div
                    className="w-4 h-4 rounded-full border-2 flex items-center justify-center flex-shrink-0"
                    style={{ borderColor: payMethod === m.id ? C.primary : C.gray400 }}
                  >
                    {payMethod === m.id && (
                      <div className="w-2 h-2 rounded-full" style={{ backgroundColor: C.primary }} />
                    )}
                  </div>
                  <m.icon size={20} style={{ color: payMethod === m.id ? C.primary : C.gray400 }} />
                  <div className="flex-1 text-left">
                    <div className="flex items-center gap-2">
                      <p className="text-sm font-semibold" style={{ color: C.gray900 }}>{m.label}</p>
                      {m.badge && (
                        <span
                          className="text-[10px] font-bold px-2 py-0.5 rounded-full"
                          style={{ backgroundColor: C.accentLight, color: C.accentDark }}
                        >
                          {m.badge}
                        </span>
                      )}
                    </div>
                    <p className="text-xs" style={{ color: C.gray400 }}>{m.sub}</p>
                  </div>
                  {payMethod === m.id && <ChevronRight size={16} style={{ color: C.primary }} />}
                </button>
              ))}

              
            </div>
          </div>
        </div>

        {/* ── Right: Order Summary ──────────────────────────── */}
        <div
          className="w-full lg:w-80 rounded-2xl overflow-hidden flex-shrink-0 lg:sticky lg:top-4"
          style={{ border: `1.5px solid ${C.gray200}`, boxShadow: '0 4px 16px rgba(26,61,32,0.10)' }}
        >
          {/* Header */}
          <div className="px-5 py-4" style={{ background: `linear-gradient(135deg, ${C.headerBg} 0%, #2D6A3F 100%)` }}>
            <p className="text-white font-bold text-base">Order Summary</p>
            <p className="text-xs mt-0.5" style={{ color: C.headerNavHover }}>
              {items.reduce((s, i) => s + i.qty, 0)} items
            </p>
          </div>

          <div className="bg-white px-5 py-4 flex flex-col gap-3">

            {/* Items list (collapsed) */}
            <div className="flex flex-col gap-2 pb-3" style={{ borderBottom: `1px solid ${C.gray200}` }}>
              {items.map(i => (
                <div key={i.id} className="flex justify-between items-center gap-2">
                  <p className="text-xs line-clamp-1 flex-1" style={{ color: C.gray700 }}>
                    {i.name} × {i.qty}
                  </p>
                  <p className="text-xs font-semibold flex-shrink-0" style={{ color: C.gray900 }}>
                    ₹{i.retailPrice * i.qty}
                  </p>
                </div>
              ))}
            </div>

            {/* PRD exact format */}
            <div className="flex justify-between text-sm" style={{ color: C.gray700 }}>
              <span>Retail Price</span>
              <span className="font-semibold">₹{subtotal}</span>
            </div>

            <div className="flex justify-between text-sm" style={{ color: C.green }}>
              <span>− 2% Online Discount</span>
              <span className="font-semibold">− ₹{discount}</span>
            </div>

            <div className="flex justify-between text-sm" style={{ color: C.gray700 }}>
              <span>Delivery Charges</span>
              <span className="font-semibold" style={{ color: delivery === 0 ? C.green : C.gray900 }}>
                {delivery === 0 ? 'FREE' : `₹${delivery}`}
              </span>
            </div>

            {delivery === 0 && (
              <p className="text-xs" style={{ color: C.green }}>
                🎉 Free delivery on orders above ₹1,000!
              </p>
            )}

            {/* Total */}
            <div
              className="flex justify-between pt-3"
              style={{ borderTop: `1.5px solid ${C.gray200}` }}
            >
              <span className="font-bold text-base" style={{ color: C.gray900 }}>Final Amount Payable</span>
              <span className="font-extrabold text-lg" style={{ color: C.gray900 }}>₹{total}</span>
            </div>

            {/* Security note */}
            <div className="flex items-center gap-2">
              <ShieldCheck size={13} style={{ color: C.primary }} />
              <p className="text-xs" style={{ color: C.gray400 }}>
                Secured by PhonePe payment gateway
              </p>
            </div>

            {/* 15 min timeout */}
            <div className="flex items-center gap-2">
              <Clock size={13} style={{ color: C.gray400 }} />
              <p className="text-xs" style={{ color: C.gray400 }}>
                Cart reserved for 15 minutes after payment begins
              </p>
            </div>

            {/* CTA */}
            <button
              onClick={handlePlaceOrder}
              className="w-full py-3 rounded-xl text-sm font-bold text-white flex items-center justify-center gap-2 transition-all mt-1"
              style={{ backgroundColor: C.accent }}
              onMouseEnter={e => e.currentTarget.style.backgroundColor = C.accentDark}
              onMouseLeave={e => e.currentTarget.style.backgroundColor = C.accent}
            >
              Place Order
              <ChevronRight size={16} />
            </button>

            <button
              onClick={() => navigate('/cart')}
              className="w-full py-2 text-sm font-semibold"
              style={{ color: C.primary }}
            >
              ← Back to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}