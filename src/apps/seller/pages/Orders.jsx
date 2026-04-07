import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  LayoutDashboard, ShoppingCart, Package, CreditCard,
  BarChart2, Settings, LogOut, Search, Bell, ChevronDown,
  Filter, Eye, Check, X, Truck, Clock, CheckCircle2,
  XCircle, ChevronRight
} from 'lucide-react'

// ── Nav (same as Dashboard) ────────────────────────────────────
const navItems = [
  { label: 'Dashboard', icon: LayoutDashboard, path: '/dashboard' },
  { label: 'Orders',    icon: ShoppingCart,    path: '/orders' },
  { label: 'Inventory', icon: Package,         path: '/inventory' },
  { label: 'Payments',  icon: CreditCard,      path: '/payments' },
  { label: 'Reports',   icon: BarChart2,       path: '/reports' },
  { label: 'Settings',  icon: Settings,        path: '/settings' },
]

// ── Mock Data ──────────────────────────────────────────────────
const ORDERS = [
  { id: '#ORD-8295', buyer: 'Ramesh Kumar',  phone: '9876543210', product: 'Syngenta Ampligo 150ml',    qty: 2,  amount: 840,   status: 'pending',    time: '10 min ago',  address: 'Village Anupgarh, Rajasthan' },
  { id: '#ORD-8294', buyer: 'Suresh Patel',  phone: '9812345678', product: 'Bayer Confidor 100ml',      qty: 1,  amount: 320,   status: 'pending',    time: '25 min ago',  address: 'Kolayat, Bikaner' },
  { id: '#ORD-8293', buyer: 'Anil Singh',    phone: '9988776655', product: 'Mahyco Tomato Seeds 10g',   qty: 5,  amount: 1250,  status: 'accepted',   time: '1h ago',      address: 'Nohar, Hanumangarh' },
  { id: '#ORD-8292', buyer: 'Dinesh Yadav',  phone: '9765432100', product: 'Urea 50kg Bag',             qty: 3,  amount: 2100,  status: 'shipped',    time: '3h ago',      address: 'Suratgarh, Sri Ganganagar' },
  { id: '#ORD-8291', buyer: 'Mahesh Rao',    phone: '9654321098', product: 'DAP Fertilizer 50kg',       qty: 2,  amount: 2800,  status: 'delivered',  time: '1d ago',      address: 'Raisinghnagar, Rajasthan' },
  { id: '#ORD-8290', buyer: 'Vijay Kumar',   phone: '9543210987', product: 'Pesticide Spray Pump 16L',  qty: 1,  amount: 1850,  status: 'delivered',  time: '2d ago',      address: 'Gharsana, Rajasthan' },
  { id: '#ORD-8289', buyer: 'Karan Meena',   phone: '9432109876', product: 'Hybrid Wheat Seeds 5kg',    qty: 10, amount: 3500,  status: 'cancelled',  time: '2d ago',      address: 'Hanumangarh Town' },
]

const STATUS_META = {
  pending:   { label: 'Pending',   color: '#F59E0B', bg: '#FEF3C7', icon: Clock },
  accepted:  { label: 'Accepted',  color: '#3B82F6', bg: '#EFF6FF', icon: Check },
  shipped:   { label: 'Shipped',   color: '#8B5CF6', bg: '#F5F3FF', icon: Truck },
  delivered: { label: 'Delivered', color: '#1A3C1F', bg: '#EEF7EE', icon: CheckCircle2 },
  cancelled: { label: 'Cancelled', color: '#EF4444', bg: '#FEE2E2', icon: XCircle },
}

const TABS = ['all', 'pending', 'accepted', 'shipped', 'delivered', 'cancelled']

// ── Order Detail Modal ─────────────────────────────────────────
function OrderModal({ order, onClose, onAccept, onReject }) {
  if (!order) return null
  const meta = STATUS_META[order.status]
  const StatusIcon = meta.icon
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ backgroundColor: 'rgba(0,0,0,0.45)' }} onClick={onClose}>
      <div className="w-full max-w-md rounded-2xl bg-white shadow-2xl overflow-hidden"
        onClick={e => e.stopPropagation()}>
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
          <div>
            <p className="font-bold text-gray-900">{order.id}</p>
            <p className="text-xs text-gray-400 mt-0.5">{order.time}</p>
          </div>
          <div className="flex items-center gap-2">
            <span className="flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold"
              style={{ backgroundColor: meta.bg, color: meta.color }}>
              <StatusIcon size={11} /> {meta.label}
            </span>
            <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-gray-100">
              <X size={16} className="text-gray-400" />
            </button>
          </div>
        </div>
        {/* Body */}
        <div className="px-5 py-4 space-y-4">
          {[
            ['Buyer',    order.buyer],
            ['Phone',    order.phone],
            ['Product',  order.product],
            ['Quantity', `${order.qty} units`],
            ['Amount',   `₹${order.amount.toLocaleString()}`],
            ['Address',  order.address],
          ].map(([k, v]) => (
            <div key={k} className="flex justify-between gap-4">
              <span className="text-sm text-gray-500">{k}</span>
              <span className="text-sm font-medium text-gray-900 text-right">{v}</span>
            </div>
          ))}
        </div>
        {/* Actions */}
        {order.status === 'pending' && (
          <div className="flex gap-3 px-5 pb-5">
            <button onClick={() => onReject(order.id)}
              className="flex-1 py-2.5 rounded-xl border text-sm font-semibold text-red-500 border-red-200 hover:bg-red-50 transition">
              Reject
            </button>
            <button onClick={() => onAccept(order.id)}
              className="flex-1 py-2.5 rounded-xl text-sm font-semibold text-white transition"
              style={{ backgroundColor: '#1A3C1F' }}>
              Accept Order
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

// ── Main ──────────────────────────────────────────────────────
export default function Orders() {
  const navigate   = useNavigate()
  const [activeNav, setActiveNav] = useState('/orders')
  const [tab, setTab]             = useState('all')
  const [search, setSearch]       = useState('')
  const [orders, setOrders]       = useState(ORDERS)
  const [selected, setSelected]   = useState(null)

  const handleNav = (path) => { setActiveNav(path); navigate(path) }

  const filtered = orders.filter(o => {
    const matchTab = tab === 'all' || o.status === tab
    const matchSearch = o.id.toLowerCase().includes(search.toLowerCase()) ||
      o.buyer.toLowerCase().includes(search.toLowerCase()) ||
      o.product.toLowerCase().includes(search.toLowerCase())
    return matchTab && matchSearch
  })

  const handleAccept = (id) => {
    setOrders(prev => prev.map(o => o.id === id ? { ...o, status: 'accepted' } : o))
    setSelected(null)
  }
  const handleReject = (id) => {
    setOrders(prev => prev.map(o => o.id === id ? { ...o, status: 'cancelled' } : o))
    setSelected(null)
  }

  const counts = TABS.reduce((acc, t) => {
    acc[t] = t === 'all' ? orders.length : orders.filter(o => o.status === t).length
    return acc
  }, {})

  return (
    <div className="flex h-screen font-sans overflow-hidden" style={{ backgroundColor: '#FFFBEB' }}>

      {/* ── Sidebar ── */}
      <aside className="hidden md:flex w-[220px] flex-shrink-0 flex-col h-full" style={{ backgroundColor: '#1E293B' }}>
        <div className="px-6 py-5 border-b border-white/10">
          <span className="text-xl font-extrabold tracking-tight text-white">Beej Spray</span>
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
        <div className="px-3 pb-5">
          <button onClick={() => navigate('/login')}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition"
            style={{ color: 'rgba(255,255,255,0.45)' }}>
            <LogOut size={17} /> Logout
          </button>
        </div>
      </aside>

      {/* ── Main ── */}
      <div className="flex-1 flex flex-col overflow-hidden">

        {/* Topbar */}
        <header className="flex items-center justify-between px-5 md:px-7 py-4 border-b border-white/10 flex-shrink-0"
          style={{ backgroundColor: '#1E293B' }}>
          <div>
            <h1 className="text-base font-bold text-white">Orders</h1>
            <p className="text-xs" style={{ color: 'rgba(255,255,255,0.45)' }}>
              {counts.pending} pending action
            </p>
          </div>
          <div className="flex items-center gap-2">
            <button className="relative p-2 rounded-xl hover:bg-white/10 transition">
              <Bell size={18} style={{ color: 'rgba(255,255,255,0.70)' }} />
              {counts.pending > 0 && (
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-400 rounded-full" />
              )}
            </button>
            <button className="flex items-center gap-2 px-2 py-1.5 rounded-xl hover:bg-white/10 transition">
              <div className="w-8 h-8 rounded-full bg-green-600 flex items-center justify-center text-white text-xs font-bold">KA</div>
              <ChevronDown size={14} style={{ color: 'rgba(255,255,255,0.55)' }} />
            </button>
          </div>
        </header>

        {/* Body */}
        <main className="flex-1 overflow-y-auto px-4 md:px-7 py-5 pb-24 md:pb-6"
          style={{ backgroundColor: '#FFFBEB' }}>

          {/* Search + Filter */}
          <div className="flex gap-3 mb-5">
            <div className="flex-1 flex items-center gap-2 bg-white rounded-xl border border-gray-200 px-3 py-2.5 shadow-sm">
              <Search size={15} className="text-gray-400 flex-shrink-0" />
              <input value={search} onChange={e => setSearch(e.target.value)}
                placeholder="Search by order ID, buyer, product…"
                className="text-sm outline-none w-full text-gray-700 placeholder:text-gray-400 bg-transparent" />
            </div>
            <button className="flex items-center gap-2 px-4 py-2.5 bg-white rounded-xl border border-gray-200 text-sm font-medium text-gray-600 shadow-sm hover:bg-gray-50 transition">
              <Filter size={14} /> Filter
            </button>
          </div>

          {/* Tabs */}
          <div className="flex gap-2 mb-5 overflow-x-auto pb-1 scrollbar-none">
            {TABS.map(t => (
              <button key={t} onClick={() => setTab(t)}
                className="flex-shrink-0 px-4 py-1.5 rounded-full text-xs font-semibold transition-all capitalize"
                style={tab === t
                  ? { backgroundColor: '#1A3C1F', color: '#fff' }
                  : { backgroundColor: '#fff', color: '#6B7280', border: '1px solid #E5E7EB' }}>
                {t === 'all' ? 'All' : STATUS_META[t].label} {counts[t] > 0 && `(${counts[t]})`}
              </button>
            ))}
          </div>

          {/* Orders List */}
          {filtered.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <ShoppingCart size={40} className="text-gray-300 mb-3" />
              <p className="text-gray-500 font-medium">No orders found</p>
              <p className="text-xs text-gray-400 mt-1">Try a different filter or search term</p>
            </div>
          ) : (
            <div className="space-y-3">
              {filtered.map(order => {
                const meta = STATUS_META[order.status]
                const StatusIcon = meta.icon
                return (
                  <div key={order.id}
                    className="bg-white rounded-2xl border border-gray-100 p-4 shadow-sm hover:shadow-md transition cursor-pointer"
                    onClick={() => setSelected(order)}>
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-sm font-bold text-gray-900">{order.id}</span>
                          <span className="flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-semibold"
                            style={{ backgroundColor: meta.bg, color: meta.color }}>
                            <StatusIcon size={10} /> {meta.label}
                          </span>
                        </div>
                        <p className="text-sm text-gray-700 font-medium truncate">{order.product}</p>
                        <p className="text-xs text-gray-400 mt-0.5">{order.buyer} · {order.qty} units · {order.time}</p>
                      </div>
                      <div className="flex flex-col items-end gap-2 flex-shrink-0">
                        <span className="text-base font-bold text-gray-900">₹{order.amount.toLocaleString()}</span>
                        <ChevronRight size={15} className="text-gray-300" />
                      </div>
                    </div>

                    {/* Quick action for pending */}
                    {order.status === 'pending' && (
                      <div className="flex gap-2 mt-3 pt-3 border-t border-gray-100"
                        onClick={e => e.stopPropagation()}>
                        <button onClick={() => handleReject(order.id)}
                          className="flex-1 py-2 rounded-xl text-xs font-semibold text-red-500 border border-red-200 hover:bg-red-50 transition">
                          Reject
                        </button>
                        <button onClick={() => handleAccept(order.id)}
                          className="flex-1 py-2 rounded-xl text-xs font-semibold text-white transition"
                          style={{ backgroundColor: '#1A3C1F' }}>
                          Accept
                        </button>
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          )}
        </main>
      </div>

      {/* ── Mobile Bottom Nav ── */}
      <nav className="fixed bottom-0 inset-x-0 z-30 md:hidden border-t border-white/10 flex"
        style={{ backgroundColor: '#1E293B' }}>
        {navItems.slice(0, 5).map(({ label, icon: Icon, path }) => {
          const isActive = activeNav === path
          return (
            <button key={path} onClick={() => handleNav(path)}
              style={{ width: '20%' }}
              className={`flex flex-col items-center justify-center py-2 gap-0.5 transition-all ${isActive ? 'text-white' : 'text-white/50'}`}>
              <div className={`p-1.5 rounded-xl transition-all ${isActive ? 'bg-white/20' : ''}`}>
                <Icon size={20} />
              </div>
              <span className="text-[10px] font-medium leading-none">{label}</span>
            </button>
          )
        })}
      </nav>

      {/* ── Order Detail Modal ── */}
      <OrderModal
        order={selected}
        onClose={() => setSelected(null)}
        onAccept={handleAccept}
        onReject={handleReject}
      />
    </div>
  )
}