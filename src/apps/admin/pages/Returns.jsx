import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  LayoutDashboard, Users2, ShoppingCart, Package,
  CreditCard, Megaphone, RotateCcw, Rss,
  LogOut, Bell, ChevronDown, Eye, CheckCircle2, XCircle, ShieldAlert, FileDown, BarChart3,
   Plus, Edit2, Trash2, Search, Tag, Image, ToggleLeft, ToggleRight
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

const RETURNS = [
  { id: 'RET-201', order: '#ORD-9100', buyer: 'Ramesh Kumar',  vendor: 'Agro Plus Stores',  product: 'Syngenta Ampligo 150ml', reason: 'Wrong product received', amount: '₹840', status: 'pending_review', raised: '29 Jun 2025' },
  { id: 'RET-200', order: '#ORD-9088', buyer: 'Suresh Patel',  vendor: 'Kisan Kendra',      product: 'Bayer Confidor 100ml',   reason: 'Product damaged',        amount: '₹320', status: 'vendor_responded', raised: '27 Jun 2025' },
  { id: 'RET-199', order: '#ORD-9071', buyer: 'Anil Singh',    vendor: 'Green Farm Inputs', product: 'Mahyco Tomato Seeds',    reason: 'Not as described',       amount: '₹250', status: 'resolved_refund', raised: '25 Jun 2025' },
  { id: 'RET-198', order: '#ORD-9055', buyer: 'Priya Devi',    vendor: 'Agro Plus Stores',  product: 'Urea 50kg Bag',         reason: 'Quantity mismatch',      amount: '₹700', status: 'resolved_reject', raised: '22 Jun 2025' },
]

const STATUS_META = {
  pending_review:    { bg: '#FEF3C7', color: '#92400E', label: 'Pending Review' },
  vendor_responded:  { bg: '#EFF6FF', color: '#1D4ED8', label: 'Vendor Responded' },
  resolved_refund:   { bg: '#EEF7EE', color: '#1A3C1F', label: 'Refunded' },
  resolved_reject:   { bg: '#FEE2E2', color: '#991B1B', label: 'Rejected' },
}

export default function Returns() {
  const navigate = useNavigate()
  const [activeNav, setActiveNav] = useState('/returns')
  const handleNav = (path) => { setActiveNav(path); navigate(path) }

  return (
    <div className="flex h-screen font-sans overflow-hidden" style={{ backgroundColor: '#FFFBEB' }}>

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
                style={isActive ? { backgroundColor: 'rgba(167,139,250,0.20)', color: '#fff' } : { color: 'rgba(255,255,255,0.55)' }}>
                <Icon size={17} style={{ color: isActive ? '#fff' : 'rgba(255,255,255,0.55)' }} />
                {label}
              </button>
            )
          })}
        </nav>
        <div className="px-3 py-4 border-t border-white/10">
          <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium" style={{ color: 'rgba(255,255,255,0.55)' }}>
            <LogOut size={17} style={{ color: 'rgba(255,255,255,0.55)' }} /> Logout
          </button>
        </div>
      </aside>

      <div className="flex-1 flex flex-col h-full overflow-hidden">
        <header className="flex items-center justify-between px-4 md:px-6 h-[62px] border-b border-white/10 flex-shrink-0" style={{ backgroundColor: '#1E293B' }}>
          <div>
            <h2 className="text-sm font-semibold text-white">Returns & Disputes</h2>
            <p className="text-[11px] text-white/40">Review and resolve</p>
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
          <div className="space-y-3">
            {RETURNS.map(r => {
              const meta = STATUS_META[r.status]
              const canAct = r.status === 'pending_review' || r.status === 'vendor_responded'
              return (
                <div key={r.id} className="bg-white rounded-2xl border border-gray-100 p-4 shadow-sm">
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap mb-1">
                        <span className="text-xs font-bold text-gray-500">{r.id}</span>
                        <span className="text-xs text-gray-400">•</span>
                        <span className="text-xs text-gray-500">{r.order}</span>
                        <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold"
                          style={{ backgroundColor: meta.bg, color: meta.color }}>
                          {meta.label}
                        </span>
                      </div>
                      <p className="text-sm font-semibold text-gray-800">{r.product}</p>
                      <p className="text-xs text-gray-500 mt-0.5">
                        Buyer: <span className="font-medium">{r.buyer}</span> &nbsp;•&nbsp;
                        Vendor: <span className="font-medium">{r.vendor}</span>
                      </p>
                      <p className="text-xs text-gray-400 mt-1 italic">"{r.reason}"</p>
                    </div>
                    <div className="flex flex-col items-end gap-2 flex-shrink-0">
                      <span className="text-sm font-bold text-gray-900">{r.amount}</span>
                      <span className="text-xs text-gray-400">{r.raised}</span>
                      {canAct && (
                        <div className="flex gap-2">
                          <button className="flex items-center gap-1 text-xs font-semibold px-2.5 py-1.5 rounded-xl text-white"
                            style={{ backgroundColor: '#1A3C1F' }}>
                            <CheckCircle2 size={12} /> Approve Refund
                          </button>
                          <button className="flex items-center gap-1 text-xs font-semibold px-2.5 py-1.5 rounded-xl"
                            style={{ backgroundColor: '#FEE2E2', color: '#991B1B' }}>
                            <XCircle size={12} /> Reject
                          </button>
                        </div>
                      )}
                      {!canAct && (
                        <button className="flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-lg text-gray-500 hover:bg-gray-100 transition">
                          <Eye size={12} /> View Details
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </main>
      </div>

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