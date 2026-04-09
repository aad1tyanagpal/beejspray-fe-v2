import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  LayoutDashboard, Users2, ShoppingCart, Package,
  CreditCard, Megaphone, RotateCcw, Rss,
  ShieldAlert, FileDown, BarChart3,
  LogOut, Bell, ChevronDown, Search,
  CheckCircle2, XCircle, Clock, Ban, Eye,
  AlertTriangle, Plus, Minus, X, Send,
  ShoppingBag, RotateCcw as ReturnIcon, Star
} from 'lucide-react'

const navItems = [
  { label: 'Dashboard',   icon: LayoutDashboard, path: '/' },
  { label: 'Users',       icon: Users2,          path: '/users' },
  { label: 'Orders',      icon: ShoppingCart,    path: '/orders' },
  { label: 'Products',    icon: Package,         path: '/products' },
  { label: 'Financials',  icon: CreditCard,      path: '/financials' },
  { label: 'Marketing',   icon: Megaphone,       path: '/marketing' },
  { label: 'Returns',     icon: RotateCcw,       path: '/returns' },
  { label: 'Compliance',  icon: ShieldAlert,     path: '/compliance' },
  { label: 'Reports',     icon: FileDown,        path: '/reports' },
  { label: 'Analytics',   icon: BarChart3,       path: '/analytics' },
  { label: 'Social Feed', icon: Rss,             path: '/social' },
]

const VENDORS = [
  { id: 'V001', name: 'Agro Plus Stores',   phone: '9876543210', location: 'Bikaner, RJ',  kyc: 'pending',  orders: 142, rating: 4.5, acceptance: '94%', cancellation: '3%', strikes: 0 },
  { id: 'V002', name: 'Kisan Kendra',       phone: '9812345678', location: 'Jaipur, RJ',   kyc: 'approved', orders: 289, rating: 4.8, acceptance: '98%', cancellation: '1%', strikes: 0 },
  { id: 'V003', name: 'Green Farm Inputs',  phone: '9988776655', location: 'Jodhpur, RJ',  kyc: 'approved', orders: 98,  rating: 4.2, acceptance: '88%', cancellation: '7%', strikes: 1 },
  { id: 'V004', name: 'Soil & Seed Co.',    phone: '9765432100', location: 'Nagpur, MH',   kyc: 'rejected', orders: 0,   rating: 0,   acceptance: '—',   cancellation: '—',  strikes: 0 },
  { id: 'V005', name: 'FarmFirst Supplies', phone: '9654321098', location: 'Ludhiana, PB', kyc: 'pending',  orders: 0,   rating: 0,   acceptance: '—',   cancellation: '—',  strikes: 2 },
]

const BUYERS = [
  { id: 'B001', name: 'Ramesh Kumar', phone: '9871234560', location: 'Anupgarh, RJ', joined: '12 Jan 2025', orders: 12, spend: '₹8,420',  status: 'active',
    history: {
      orders:  [{ id: '#ORD-9100', product: 'Syngenta Ampligo 150ml', amount: '₹840',  date: '29 Jun', status: 'delivered' }, { id: '#ORD-8890', product: 'Urea 50kg Bag', amount: '₹700', date: '15 Jun', status: 'delivered' }],
      returns: [{ id: 'RET-201', product: 'Syngenta Ampligo 150ml', amount: '₹840', reason: 'Wrong product', status: 'resolved' }],
      reviews: [{ product: 'Urea 50kg Bag', rating: 5, text: 'Very good quality!', date: '17 Jun' }],
    }
  },
  { id: 'B002', name: 'Suresh Patel', phone: '9812340987', location: 'Kolayat, RJ',  joined: '03 Feb 2025', orders: 4,  spend: '₹2,100',  status: 'active',
    history: { orders: [{ id: '#ORD-9200', product: 'Bayer Confidor 100ml', amount: '₹320', date: '30 Jun', status: 'pending' }], returns: [], reviews: [] }
  },
  { id: 'B003', name: 'Anil Singh',   phone: '9988001122', location: 'Nohar, RJ',    joined: '20 Dec 2024', orders: 19, spend: '₹14,200', status: 'active',
    history: { orders: [{ id: '#ORD-9199', product: 'Mahyco Tomato Seeds', amount: '₹1,250', date: '29 Jun', status: 'processing' }], returns: [], reviews: [{ product: 'DAP Fertilizer', rating: 4, text: 'Good value for money.', date: '20 Jun' }] }
  },
  { id: 'B004', name: 'Priya Devi',   phone: '9765009988', location: 'Sikar, RJ',    joined: '08 Mar 2025', orders: 2,  spend: '₹980',    status: 'blocked',
    history: { orders: [], returns: [], reviews: [] }
  },
]

const kycBadge = {
  pending:  { bg: '#FEF3C7', color: '#92400E', icon: Clock,        label: 'Pending'  },
  approved: { bg: '#EEF7EE', color: '#1A3C1F', icon: CheckCircle2, label: 'Approved' },
  rejected: { bg: '#FEE2E2', color: '#991B1B', icon: XCircle,      label: 'Rejected' },
}

const STRIKE_REASONS = [
  'Rating fell below 2 stars',
  'High cancellation rate',
  'Repeated customer complaints',
  'Frivolous counter-disputes',
  'Policy violation',
  'Other',
]

// ── Strike Modal ──────────────────────────────────────────────
function StrikeModal({ vendor, action, onConfirm, onClose }) {
  const [reason, setReason] = useState(STRIKE_REASONS[0])
  const [note,   setNote]   = useState('')
  const isAdd = action === 'add'
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ backgroundColor: 'rgba(0,0,0,0.45)' }} onClick={onClose}>
      <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden"
        onClick={e => e.stopPropagation()}>
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl flex items-center justify-center"
              style={{ backgroundColor: isAdd ? '#FEF3C7' : '#EEF7EE' }}>
              <AlertTriangle size={16} style={{ color: isAdd ? '#92400E' : '#1A3C1F' }} />
            </div>
            <div>
              <p className="text-sm font-bold text-gray-900">{isAdd ? 'Add Strike' : 'Remove Strike'}</p>
              <p className="text-xs text-gray-400">{vendor.name}</p>
            </div>
          </div>
          <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-gray-100 transition">
            <X size={16} className="text-gray-400" />
          </button>
        </div>
        <div className="px-5 py-4 space-y-4">
          <div className="flex items-center gap-2 text-xs text-gray-500 bg-gray-50 rounded-xl px-3 py-2">
            <AlertTriangle size={13} className="text-amber-500 flex-shrink-0" />
            Current strikes: <span className="font-bold text-gray-800 ml-1">{vendor.strikes} / 3</span>
            {isAdd && vendor.strikes === 2 && (
              <span className="ml-2 text-red-600 font-semibold">⚠ Next strike = auto-suspend</span>
            )}
          </div>
          {isAdd && (
            <div>
              <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5 block">Reason</label>
              <select value={reason} onChange={e => setReason(e.target.value)}
                className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm outline-none focus:border-green-700 bg-white">
                {STRIKE_REASONS.map(r => <option key={r}>{r}</option>)}
              </select>
            </div>
          )}
          <div>
            <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5 block">
              Justification Note
            </label>
            <textarea value={note} onChange={e => setNote(e.target.value)} rows={3}
              placeholder="Add internal notes for this action..."
              className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm outline-none focus:border-green-700 resize-none" />
          </div>
        </div>
        <div className="flex gap-2 px-5 pb-5">
          <button onClick={onClose}
            className="flex-1 px-4 py-2.5 rounded-xl text-sm font-semibold text-gray-600 hover:bg-gray-100 transition">
            Cancel
          </button>
          <button onClick={() => onConfirm(reason, note)} disabled={!note.trim()}
            className="flex-1 px-4 py-2.5 rounded-xl text-sm font-semibold text-white transition"
            style={{ backgroundColor: !note.trim() ? '#D1D5DB' : isAdd ? '#92400E' : '#1A3C1F' }}>
            {isAdd ? 'Add Strike' : 'Remove Strike'}
          </button>
        </div>
      </div>
    </div>
  )
}

// ── Buyer History Drawer ──────────────────────────────────────
function BuyerHistoryDrawer({ buyer, onClose }) {
  const [tab, setTab] = useState('orders')
  const statusColors = {
    delivered:  { bg: '#EEF7EE', color: '#1A3C1F' },
    pending:    { bg: '#FEF3C7', color: '#92400E' },
    processing: { bg: '#EFF6FF', color: '#1D4ED8' },
    resolved:   { bg: '#EEF7EE', color: '#1A3C1F' },
  }
  return (
    <div className="fixed inset-0 z-50 flex justify-end"
      style={{ backgroundColor: 'rgba(0,0,0,0.45)' }} onClick={onClose}>
      <div className="w-full max-w-md bg-white h-full flex flex-col shadow-2xl"
        onClick={e => e.stopPropagation()}>
        {/* Drawer Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100 flex-shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-sm font-bold text-blue-700">
              {buyer.name.split(' ').map(w => w[0]).join('').slice(0,2)}
            </div>
            <div>
              <p className="text-sm font-bold text-gray-900">{buyer.name}</p>
              <p className="text-xs text-gray-400">{buyer.phone} · {buyer.location}</p>
            </div>
          </div>
          <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-gray-100 transition">
            <X size={16} className="text-gray-400" />
          </button>
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-3 gap-0 border-b border-gray-100 flex-shrink-0">
          {[
            { label: 'Total Orders', value: buyer.orders },
            { label: 'Total Spend',  value: buyer.spend  },
            { label: 'Joined',       value: buyer.joined },
          ].map(s => (
            <div key={s.label} className="px-4 py-3 text-center border-r border-gray-100 last:border-r-0">
              <p className="text-sm font-bold text-gray-900">{s.value}</p>
              <p className="text-[10px] text-gray-400 uppercase tracking-wider mt-0.5">{s.label}</p>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div className="flex border-b border-gray-100 flex-shrink-0">
          {[['orders', ShoppingBag], ['returns', ReturnIcon], ['reviews', Star]].map(([t, Icon]) => (
            <button key={t} onClick={() => setTab(t)}
              className="flex-1 flex items-center justify-center gap-1.5 py-3 text-xs font-semibold capitalize transition-all border-b-2"
              style={tab === t
                ? { color: '#1A3C1F', borderColor: '#1A3C1F' }
                : { color: '#9CA3AF', borderColor: 'transparent' }}>
              <Icon size={13} /> {t}
              <span className="ml-0.5 px-1.5 py-0.5 rounded-full text-[10px] font-bold"
                style={tab === t ? { backgroundColor: '#EEF7EE', color: '#1A3C1F' } : { backgroundColor: '#F3F4F6', color: '#9CA3AF' }}>
                {buyer.history[t].length}
              </span>
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="flex-1 overflow-y-auto px-4 py-4">

          {/* Orders */}
          {tab === 'orders' && (
            <div className="space-y-2.5">
              {buyer.history.orders.length === 0 && (
                <p className="text-sm text-gray-400 text-center py-8">No orders yet</p>
              )}
              {buyer.history.orders.map(o => (
                <div key={o.id} className="bg-gray-50 rounded-xl p-3 flex items-center justify-between">
                  <div>
                    <p className="text-xs font-bold text-gray-800">{o.id}</p>
                    <p className="text-xs text-gray-500 mt-0.5 truncate max-w-[200px]">{o.product}</p>
                    <p className="text-[10px] text-gray-400 mt-0.5">{o.date}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs font-bold text-gray-800">{o.amount}</p>
                    <span className="inline-block mt-1 px-2 py-0.5 rounded-full text-[10px] font-semibold"
                      style={statusColors[o.status]}>
                      {o.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Returns */}
          {tab === 'returns' && (
            <div className="space-y-2.5">
              {buyer.history.returns.length === 0 && (
                <p className="text-sm text-gray-400 text-center py-8">No returns</p>
              )}
              {buyer.history.returns.map(r => (
                <div key={r.id} className="bg-gray-50 rounded-xl p-3">
                  <div className="flex items-center justify-between mb-1">
                    <p className="text-xs font-bold text-gray-800">{r.id}</p>
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold"
                      style={statusColors[r.status]}>
                      {r.status}
                    </span>
                  </div>
                  <p className="text-xs text-gray-600 truncate">{r.product}</p>
                  <p className="text-[10px] text-gray-400 mt-0.5">Reason: {r.reason} · {r.amount}</p>
                </div>
              ))}
            </div>
          )}

          {/* Reviews */}
          {tab === 'reviews' && (
            <div className="space-y-2.5">
              {buyer.history.reviews.length === 0 && (
                <p className="text-sm text-gray-400 text-center py-8">No reviews</p>
              )}
              {buyer.history.reviews.map((r, i) => (
                <div key={i} className="bg-gray-50 rounded-xl p-3">
                  <div className="flex items-center justify-between mb-1">
                    <p className="text-xs font-semibold text-gray-800 truncate max-w-[200px]">{r.product}</p>
                    <span className="text-xs font-bold text-amber-500">{'⭐'.repeat(r.rating)}</span>
                  </div>
                  <p className="text-xs text-gray-600 italic">"{r.text}"</p>
                  <p className="text-[10px] text-gray-400 mt-1">{r.date}</p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Notify button */}
        <div className="px-5 py-4 border-t border-gray-100 flex-shrink-0">
          <button className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-semibold text-white transition"
            style={{ backgroundColor: '#1A3C1F' }}>
            <Send size={14} /> Send Notification
          </button>
        </div>
      </div>
    </div>
  )
}

export default function Users() {
  const navigate = useNavigate()
  const [activeNav, setActiveNav]   = useState('/users')
  const [tab, setTab]               = useState('vendors')
  const [search, setSearch]         = useState('')
  const [vendors, setVendors]       = useState(VENDORS)
  const [buyers, setBuyers]         = useState(BUYERS)
  const [strikeModal, setStrikeModal] = useState(null)  // { vendor, action }
  const [historyBuyer, setHistoryBuyer] = useState(null)
  const [sortVendorBy, setSortVendorBy] = useState('orders')

  const handleNav = (path) => { setActiveNav(path); navigate(path) }

  const handleStrikeConfirm = (reason, note) => {
    const { vendor, action } = strikeModal
    setVendors(vs => vs.map(v => {
      if (v.id !== vendor.id) return v
      const newStrikes = action === 'add'
        ? Math.min(v.strikes + 1, 3)
        : Math.max(v.strikes - 1, 0)
      return {
        ...v,
        strikes: newStrikes,
        kyc: action === 'add' && newStrikes >= 3 ? 'rejected' : v.kyc,
      }
    }))
    setStrikeModal(null)
  }

  const sortedVendors = [...vendors]
    .filter(v =>
      v.name.toLowerCase().includes(search.toLowerCase()) || v.phone.includes(search)
    )
    .sort((a, b) => {
      if (sortVendorBy === 'orders')  return b.orders - a.orders
      if (sortVendorBy === 'rating')  return b.rating - a.rating
      return 0
    })

  const filteredBuyers = buyers.filter(b =>
    b.name.toLowerCase().includes(search.toLowerCase()) || b.phone.includes(search)
  )

  return (
    <div className="flex h-screen font-sans overflow-hidden" style={{ backgroundColor: '#FFFBEB' }}>

      {/* Modals */}
      {strikeModal && (
        <StrikeModal
          vendor={strikeModal.vendor}
          action={strikeModal.action}
          onConfirm={handleStrikeConfirm}
          onClose={() => setStrikeModal(null)}
        />
      )}
      {historyBuyer && (
        <BuyerHistoryDrawer
          buyer={historyBuyer}
          onClose={() => setHistoryBuyer(null)}
        />
      )}

      {/* Sidebar */}
      <aside className="hidden md:flex w-[220px] flex-shrink-0 flex-col h-full" style={{ backgroundColor: '#1E293B' }}>
        <div className="px-6 py-5 border-b border-white/10">
          <span className="text-xl font-extrabold tracking-tight text-white">Beej Spray</span>
          <p className="text-[10px] text-white/40 font-medium mt-0.5 uppercase tracking-widest">Superadmin</p>
        </div>
        <nav className="flex-1 px-3 py-4 space-y-0.5 overflow-y-auto">
          {navItems.map(({ label, icon: Icon, path }) => {
            const isActive = activeNav === path
            return (
              <button key={path} onClick={() => handleNav(path)}
                className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all"
                style={isActive
                  ? { backgroundColor: 'rgba(167,139,250,0.20)', color: '#fff' }
                  : { color: 'rgba(255,255,255,0.55)' }}>
                <Icon size={17} style={{ color: isActive ? '#fff' : 'rgba(255,255,255,0.55)' }} />
                {label}
              </button>
            )
          })}
        </nav>
        <div className="px-3 py-4 border-t border-white/10">
          <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium"
            style={{ color: 'rgba(255,255,255,0.55)' }}>
            <LogOut size={17} style={{ color: 'rgba(255,255,255,0.55)' }} /> Logout
          </button>
        </div>
      </aside>

      {/* Main */}
      <div className="flex-1 flex flex-col h-full overflow-hidden">
        <header className="flex items-center justify-between px-4 md:px-6 h-[62px] border-b border-white/10 flex-shrink-0"
          style={{ backgroundColor: '#1E293B' }}>
          <div>
            <h2 className="text-sm font-semibold text-white">User Management</h2>
            <p className="text-[11px] text-white/40">Vendors & Buyers</p>
          </div>
          <div className="flex items-center gap-2">
            <button className="relative p-2 rounded-xl hover:bg-white/8 transition">
              <Bell size={18} style={{ color: 'rgba(255,255,255,0.70)' }} />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-400 rounded-full border-2 border-[#1E293B]" />
            </button>
            <button className="flex items-center gap-2 px-2 py-1.5 rounded-xl transition hover:bg-white/8">
              <div className="w-8 h-8 rounded-full bg-green-600 flex items-center justify-center text-white text-xs font-bold">SA</div>
              <ChevronDown size={14} style={{ color: 'rgba(255,255,255,0.55)' }} />
            </button>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto px-4 md:px-6 py-6" style={{ backgroundColor: '#FFFBEB' }}>

          {/* Tabs + Search */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5">
            <div className="flex gap-1 bg-white rounded-xl border border-gray-200 p-1 w-fit">
              {['vendors', 'buyers'].map(t => (
                <button key={t} onClick={() => setTab(t)}
                  className="px-4 py-1.5 rounded-lg text-sm font-semibold transition-all capitalize"
                  style={tab === t ? { backgroundColor: '#1A3C1F', color: '#fff' } : { color: '#6B7280' }}>
                  {t}
                </button>
              ))}
            </div>
            <div className="flex gap-2">
              {tab === 'vendors' && (
                <div className="flex gap-1">
                  {[['orders','Orders'],['rating','Rating']].map(([k,l]) => (
                    <button key={k} onClick={() => setSortVendorBy(k)}
                      className="px-2.5 py-1.5 rounded-lg text-xs font-semibold transition-all"
                      style={sortVendorBy === k
                        ? { backgroundColor: '#1A3C1F', color: '#fff' }
                        : { backgroundColor: '#fff', color: '#6B7280', border: '1px solid #E5E7EB' }}>
                      Sort: {l}
                    </button>
                  ))}
                </div>
              )}
              <div className="relative">
                <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input value={search} onChange={e => setSearch(e.target.value)}
                  placeholder="Search by name or phone..."
                  className="pl-8 pr-4 py-2 text-sm border border-gray-200 rounded-xl bg-white outline-none focus:border-green-700 w-52" />
              </div>
            </div>
          </div>

          {/* ── Vendors Table ── */}
          {tab === 'vendors' && (
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-gray-100">
                      {['Vendor', 'Location', 'KYC', 'Orders', 'Rating', 'Acceptance', 'Cancel %', 'Strikes', ''].map(h => (
                        <th key={h} className="text-left px-4 py-3 text-xs font-semibold text-gray-400 uppercase tracking-wider whitespace-nowrap">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {sortedVendors.map(v => {
                      const badge = kycBadge[v.kyc]
                      const BadgeIcon = badge.icon
                      const isSuspended = v.strikes >= 3
                      return (
                        <tr key={v.id} className={`transition-colors ${isSuspended ? 'bg-red-50/40' : 'hover:bg-gray-50'}`}>
                          <td className="px-4 py-3">
                            <div className="flex items-center gap-2.5">
                              <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold"
                                style={{ backgroundColor: isSuspended ? '#FEE2E2' : '#EEF7EE', color: isSuspended ? '#991B1B' : '#1A3C1F' }}>
                                {v.name.split(' ').map(w => w[0]).join('').slice(0,2)}
                              </div>
                              <div>
                                <p className="font-semibold text-gray-800 text-sm">{v.name}</p>
                                <p className="text-xs text-gray-400">{v.phone}</p>
                              </div>
                            </div>
                          </td>
                          <td className="px-4 py-3 text-sm text-gray-600">{v.location}</td>
                          <td className="px-4 py-3">
                            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold"
                              style={{ backgroundColor: badge.bg, color: badge.color }}>
                              <BadgeIcon size={11} /> {badge.label}
                            </span>
                          </td>
                          <td className="px-4 py-3 font-semibold text-gray-800">{v.orders}</td>
                          <td className="px-4 py-3 text-sm text-gray-600">{v.rating > 0 ? `⭐ ${v.rating}` : '—'}</td>
                          <td className="px-4 py-3 text-sm font-semibold" style={{ color: '#1A3C1F' }}>{v.acceptance}</td>
                          <td className="px-4 py-3 text-sm font-semibold"
                            style={{ color: parseFloat(v.cancellation) > 5 ? '#EF4444' : '#6B7280' }}>
                            {v.cancellation}
                          </td>
                          <td className="px-4 py-3">
                            <div className="flex items-center gap-1">
                              {/* Strike dots */}
                              {[0,1,2].map(i => (
                                <div key={i} className="w-2.5 h-2.5 rounded-full border transition-all"
                                  style={{
                                    backgroundColor: i < v.strikes ? '#EF4444' : 'transparent',
                                    borderColor: i < v.strikes ? '#EF4444' : '#D1D5DB',
                                  }} />
                              ))}
                              <span className="ml-1 text-xs font-bold" style={{ color: v.strikes >= 3 ? '#EF4444' : '#6B7280' }}>
                                {v.strikes}/3
                              </span>
                            </div>
                          </td>
                          <td className="px-4 py-3">
                            <div className="flex items-center gap-1.5 flex-wrap justify-end">
                              {v.kyc === 'pending' && (
                                <>
                                  <button className="flex items-center gap-1 text-xs font-semibold px-2 py-1 rounded-lg transition"
                                    style={{ backgroundColor: '#EEF7EE', color: '#1A3C1F' }}>
                                    <CheckCircle2 size={11} /> Approve
                                  </button>
                                  <button className="flex items-center gap-1 text-xs font-semibold px-2 py-1 rounded-lg transition"
                                    style={{ backgroundColor: '#FEE2E2', color: '#991B1B' }}>
                                    <XCircle size={11} /> Reject
                                  </button>
                                </>
                              )}
                              {v.kyc === 'approved' && !isSuspended && (
                                <button onClick={() => setStrikeModal({ vendor: v, action: 'add' })}
                                  className="flex items-center gap-1 text-xs font-semibold px-2 py-1 rounded-lg transition"
                                  style={{ backgroundColor: '#FEF3C7', color: '#92400E' }}>
                                  <Plus size={11} /> Strike
                                </button>
                              )}
                              {v.strikes > 0 && (
                                <button onClick={() => setStrikeModal({ vendor: v, action: 'remove' })}
                                  className="flex items-center gap-1 text-xs font-semibold px-2 py-1 rounded-lg transition"
                                  style={{ backgroundColor: '#EEF7EE', color: '#1A3C1F' }}>
                                  <Minus size={11} /> Strike
                                </button>
                              )}
                              {isSuspended && (
                                <span className="text-xs font-bold px-2 py-1 rounded-lg"
                                  style={{ backgroundColor: '#FEE2E2', color: '#991B1B' }}>
                                  Suspended
                                </span>
                              )}
                              <button className="flex items-center gap-1 text-xs font-semibold px-2 py-1 rounded-lg text-gray-500 hover:bg-gray-100 transition">
                                <Eye size={11} /> View
                              </button>
                            </div>
                          </td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* ── Buyers Table ── */}
          {tab === 'buyers' && (
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-gray-100">
                      {['Buyer', 'Location', 'Joined', 'Orders', 'Total Spend', 'Status', ''].map(h => (
                        <th key={h} className="text-left px-4 py-3 text-xs font-semibold text-gray-400 uppercase tracking-wider whitespace-nowrap">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {filteredBuyers.map(b => (
                      <tr key={b.id} className="hover:bg-gray-50 transition-colors">
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-2.5">
                            <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center text-xs font-bold text-blue-700">
                              {b.name.split(' ').map(w => w[0]).join('').slice(0,2)}
                            </div>
                            <div>
                              <p className="font-semibold text-gray-800 text-sm">{b.name}</p>
                              <p className="text-xs text-gray-400">{b.phone}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-600">{b.location}</td>
                        <td className="px-4 py-3 text-xs text-gray-500">{b.joined}</td>
                        <td className="px-4 py-3 font-semibold text-gray-800">{b.orders}</td>
                        <td className="px-4 py-3 font-semibold text-gray-800">{b.spend}</td>
                        <td className="px-4 py-3">
                          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold"
                            style={b.status === 'active'
                              ? { backgroundColor: '#EEF7EE', color: '#1A3C1F' }
                              : { backgroundColor: '#FEE2E2', color: '#991B1B' }}>
                            {b.status === 'active' ? <CheckCircle2 size={11} /> : <Ban size={11} />}
                            {b.status}
                          </span>
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-1.5 justify-end">
                            <button onClick={() => setHistoryBuyer(b)}
                              className="flex items-center gap-1 text-xs font-semibold px-2 py-1 rounded-lg text-gray-500 hover:bg-gray-100 transition">
                              <Eye size={11} /> History
                            </button>
                            <button
                              className="flex items-center gap-1 text-xs font-semibold px-2 py-1 rounded-lg transition"
                              style={b.status === 'active'
                                ? { backgroundColor: '#FEF3C7', color: '#92400E' }
                                : { backgroundColor: '#EEF7EE', color: '#1A3C1F' }}
                              onClick={() => setBuyers(bs => bs.map(x =>
                                x.id === b.id ? { ...x, status: x.status === 'active' ? 'blocked' : 'active' } : x
                              ))}>
                              {b.status === 'active' ? <><Ban size={11} /> Block</> : <><CheckCircle2 size={11} /> Unblock</>}
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </main>
      </div>

      {/* Mobile Bottom Nav */}
      <nav className="fixed bottom-0 inset-x-0 z-30 md:hidden border-t border-white/10 flex" style={{ backgroundColor: '#1E293B' }}>
        {navItems.slice(0, 5).map(({ label, icon: Icon, path }) => {
          const isActive = activeNav === path
          return (
            <button key={path} onClick={() => handleNav(path)} style={{ width: '20%' }}
              className={`flex flex-col items-center justify-center py-2 gap-0.5 ${isActive ? 'text-white' : 'text-white/50'}`}>
              <div className={`p-1.5 rounded-xl ${isActive ? 'bg-white/20' : ''}`}><Icon size={20} /></div>
              <span className="text-[10px] font-medium leading-none">{label}</span>
            </button>
          )
        })}
      </nav>
    </div>
  )
}