import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  LayoutDashboard, ShoppingCart, Package, CreditCard,
  BarChart2, Settings, LogOut, Bell, ChevronDown,
  ArrowDownLeft, ArrowUpRight, Clock, CheckCircle2, X, Wallet
} from 'lucide-react'

const navItems = [
  { label: 'Dashboard', icon: LayoutDashboard, path: '/dashboard' },
  { label: 'Orders',    icon: ShoppingCart,    path: '/orders' },
  { label: 'Inventory', icon: Package,         path: '/inventory' },
  { label: 'Payments',  icon: CreditCard,      path: '/payments' },
  { label: 'Reports',   icon: BarChart2,       path: '/reports' },
  { label: 'Settings',  icon: Settings,        path: '/settings' },
]

const TRANSACTIONS = [
  { id: 'TXN-1041', type: 'credit',  label: 'Order #ORD-8291 Settlement', amount: 798,  date: '12 Jun 2025', status: 'completed' },
  { id: 'TXN-1040', type: 'credit',  label: 'Order #ORD-8289 Settlement', amount: 1187, date: '11 Jun 2025', status: 'completed' },
  { id: 'TXN-1039', type: 'debit',   label: 'Platform Commission (6%)',   amount: 126,  date: '11 Jun 2025', status: 'completed' },
  { id: 'TXN-1038', type: 'credit',  label: 'Order #ORD-8285 Settlement', amount: 2660, date: '09 Jun 2025', status: 'completed' },
  { id: 'TXN-1037', type: 'debit',   label: 'Settlement Payout',          amount: 4200, date: '07 Jun 2025', status: 'completed' },
  { id: 'TXN-1036', type: 'hold',    label: 'Order #ORD-8294 (Holding)',  amount: 304,  date: '06 Jun 2025', status: 'pending'   },
  { id: 'TXN-1035', type: 'credit',  label: 'Order #ORD-8280 Settlement', amount: 1710, date: '04 Jun 2025', status: 'completed' },
]

const TYPE_META = {
  credit:  { color: '#1A3C1F', bg: '#EEF7EE', icon: ArrowDownLeft,  sign: '+' },
  debit:   { color: '#EF4444', bg: '#FEE2E2', icon: ArrowUpRight,   sign: '-' },
  hold:    { color: '#F59E0B', bg: '#FEF3C7', icon: Clock,          sign: '~' },
}

function RequestModal({ balance, onClose }) {
  const [amount, setAmount] = useState('')
  const max = Math.floor(balance / 100) * 100
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ backgroundColor: 'rgba(0,0,0,0.45)' }} onClick={onClose}>
      <div className="w-full max-w-sm rounded-2xl bg-white shadow-2xl overflow-hidden"
        onClick={e => e.stopPropagation()}>
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
          <p className="font-bold text-gray-900">Request Settlement</p>
          <button onClick={onClose}><X size={16} className="text-gray-400" /></button>
        </div>
        <div className="px-5 py-4 space-y-4">
          <div className="p-3 rounded-xl text-sm" style={{ backgroundColor: '#EEF7EE', color: '#1A3C1F' }}>
            Available balance: <strong>₹{balance.toLocaleString()}</strong>
          </div>
          <div>
            <label className="text-xs font-semibold text-gray-500 mb-1.5 block">Amount to withdraw (min ₹1,000)</label>
            <input type="number" value={amount} onChange={e => setAmount(e.target.value)}
              placeholder="Enter amount"
              className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm outline-none focus:border-green-700" />
            <p className="text-xs text-gray-400 mt-1">Max withdrawable: ₹{max.toLocaleString()}</p>
          </div>
          <div className="p-3 rounded-xl text-xs" style={{ backgroundColor: '#EFF6FF', color: '#3B82F6' }}>
            ℹ️ Settlements are processed within 3–5 business days via NEFT/RTGS.
          </div>
        </div>
        <div className="flex gap-3 px-5 pb-5">
          <button onClick={onClose}
            className="flex-1 py-2.5 rounded-xl border border-gray-200 text-sm font-semibold text-gray-600 hover:bg-gray-50 transition">
            Cancel
          </button>
          <button onClick={onClose}
            className="flex-1 py-2.5 rounded-xl text-sm font-semibold text-white transition"
            style={{ backgroundColor: amount >= 1000 ? '#1A3C1F' : '#D1D5DB', cursor: amount >= 1000 ? 'pointer' : 'not-allowed' }}>
            Request Payout
          </button>
        </div>
      </div>
    </div>
  )
}

export default function Payments() {
  const navigate = useNavigate()
  const [activeNav, setActiveNav]   = useState('/payments')
  const [showModal, setShowModal]   = useState(false)
  const [tab, setTab]               = useState('all')

  const handleNav = (path) => { setActiveNav(path); navigate(path) }

  const balance  = 4645
  const held     = 304
  const lifetime = 28400

  const filtered = tab === 'all' ? TRANSACTIONS : TRANSACTIONS.filter(t => t.type === tab)

  return (
    <div className="flex h-screen font-sans overflow-hidden" style={{ backgroundColor: '#FFFBEB' }}>

      {/* Sidebar */}
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
                style={isActive ? { backgroundColor: 'rgba(167,139,250,0.20)', color: '#fff' } : { color: 'rgba(255,255,255,0.55)' }}>
                <Icon size={17} style={{ color: isActive ? '#fff' : 'rgba(255,255,255,0.55)' }} />
                {label}
              </button>
            )
          })}
        </nav>
        <div className="px-3 pb-5">
          <button onClick={() => navigate('/login')}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium"
            style={{ color: 'rgba(255,255,255,0.45)' }}>
            <LogOut size={17} /> Logout
          </button>
        </div>
      </aside>

      {/* Main */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="flex items-center justify-between px-5 md:px-7 py-4 border-b border-white/10 flex-shrink-0"
          style={{ backgroundColor: '#1E293B' }}>
          <div>
            <h1 className="text-base font-bold text-white">Payments</h1>
            <p className="text-xs" style={{ color: 'rgba(255,255,255,0.45)' }}>Wallet & settlements</p>
          </div>
          <div className="flex items-center gap-2">
            <button className="relative p-2 rounded-xl hover:bg-white/10 transition">
              <Bell size={18} style={{ color: 'rgba(255,255,255,0.70)' }} />
            </button>
            <button className="flex items-center gap-2 px-2 py-1.5 rounded-xl hover:bg-white/10 transition">
              <div className="w-8 h-8 rounded-full bg-green-600 flex items-center justify-center text-white text-xs font-bold">KA</div>
              <ChevronDown size={14} style={{ color: 'rgba(255,255,255,0.55)' }} />
            </button>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto px-4 md:px-7 py-5 pb-24 md:pb-6"
          style={{ backgroundColor: '#FFFBEB' }}>

          {/* Wallet Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
            {/* Main balance */}
            <div className="sm:col-span-2 rounded-2xl p-5 text-white relative overflow-hidden"
              style={{ background: 'linear-gradient(135deg, #1A3C1F 0%, #2D6A35 100%)' }}>
              <div className="flex items-center gap-2 mb-3">
                <Wallet size={16} style={{ color: 'rgba(255,255,255,0.7)' }} />
                <span className="text-xs font-semibold" style={{ color: 'rgba(255,255,255,0.7)' }}>Available Balance</span>
              </div>
              <p className="text-3xl font-extrabold mb-1">₹{balance.toLocaleString()}</p>
              <p className="text-xs mb-4" style={{ color: 'rgba(255,255,255,0.55)' }}>
                ₹{held.toLocaleString()} on hold (7-day window)
              </p>
              <button onClick={() => setShowModal(true)}
                className="px-5 py-2 rounded-xl text-sm font-semibold transition"
                style={{ backgroundColor: 'rgba(255,255,255,0.15)', color: '#fff' }}>
                Request Settlement
              </button>
            </div>

            {/* Lifetime */}
            <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm flex flex-col justify-between">
              <div className="flex items-center gap-2 mb-2">
                <CheckCircle2 size={15} style={{ color: '#1A3C1F' }} />
                <span className="text-xs font-semibold text-gray-500">Lifetime Earnings</span>
              </div>
              <p className="text-2xl font-extrabold text-gray-900">₹{lifetime.toLocaleString()}</p>
              <p className="text-xs text-gray-400 mt-1">Since joining</p>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex gap-2 mb-4 overflow-x-auto pb-1">
            {[['all','All'],['credit','Credits'],['debit','Debits'],['hold','On Hold']].map(([v, l]) => (
              <button key={v} onClick={() => setTab(v)}
                className="flex-shrink-0 px-4 py-1.5 rounded-full text-xs font-semibold transition-all"
                style={tab === v
                  ? { backgroundColor: '#1A3C1F', color: '#fff' }
                  : { backgroundColor: '#fff', color: '#6B7280', border: '1px solid #E5E7EB' }}>
                {l}
              </button>
            ))}
          </div>

          {/* Transaction list */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="px-5 py-3 border-b border-gray-50">
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Transaction History</p>
            </div>
            <div className="divide-y divide-gray-50">
              {filtered.map(t => {
                const meta = TYPE_META[t.type]
                const Icon = meta.icon
                return (
                  <div key={t.id} className="flex items-center gap-4 px-5 py-3.5 hover:bg-gray-50 transition">
                    <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
                      style={{ backgroundColor: meta.bg }}>
                      <Icon size={15} style={{ color: meta.color }} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 truncate">{t.label}</p>
                      <p className="text-xs text-gray-400 mt-0.5">{t.id} · {t.date}</p>
                    </div>
                    <p className="text-sm font-bold flex-shrink-0"
                      style={{ color: meta.color }}>
                      {meta.sign}₹{t.amount.toLocaleString()}
                    </p>
                  </div>
                )
              })}
            </div>
          </div>

        </main>
      </div>

      {/* Mobile Bottom Nav */}
      <nav className="fixed bottom-0 inset-x-0 z-30 md:hidden border-t border-white/10 flex"
        style={{ backgroundColor: '#1E293B' }}>
        {navItems.slice(0, 5).map(({ label, icon: Icon, path }) => {
          const isActive = activeNav === path
          return (
            <button key={path} onClick={() => handleNav(path)} style={{ width: '20%' }}
              className={`flex flex-col items-center justify-center py-2 gap-0.5 ${isActive ? 'text-white' : 'text-white/50'}`}>
              <div className={`p-1.5 rounded-xl ${isActive ? 'bg-white/20' : ''}`}>
                <Icon size={20} />
              </div>
              <span className="text-[10px] font-medium leading-none">{label}</span>
            </button>
          )
        })}
      </nav>

      {showModal && <RequestModal balance={balance} onClose={() => setShowModal(false)} />}
    </div>
  )
}