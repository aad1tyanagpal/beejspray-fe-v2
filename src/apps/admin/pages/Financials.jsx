import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  LayoutDashboard, Users2, ShoppingCart, Package,
  CreditCard, Megaphone, RotateCcw, Rss,
  ShieldAlert, FileDown, BarChart3,
  LogOut, Bell, ChevronDown,
  CheckCircle2, Edit2, X, AlertTriangle, Plus
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

// ── Commission Data ────────────────────────────────────────────
const INIT_CATEGORY_COMM = [
  { id: 'seeds',  category: 'Seeds',       rate: '8',  type: '%' },
  { id: 'pest',   category: 'Pesticides',  rate: '10', type: '%' },
  { id: 'fert',   category: 'Fertilizers', rate: '7',  type: '%' },
  { id: 'equip',  category: 'Equipment',   rate: '12', type: '%' },
]

const INIT_SKU_COMM = [
  { id: 'sku1', sku: 'SYN-AMP-150', product: 'Syngenta Ampligo 150ml', category: 'Pesticides', rate: '14', type: '%',  note: 'Premium product override' },
  { id: 'sku2', sku: 'MAH-TOM-10G', product: 'Mahyco Tomato Seeds',    category: 'Seeds',       rate: '6',  type: '%',  note: 'Seasonal discount' },
]

const INIT_VENDOR_COMM = [
  { id: 'vc1', vendor: 'Kisan Kendra',      rate: '30', type: '₹', note: 'High-volume flat rate' },
  { id: 'vc2', vendor: 'Agro Plus Stores',  rate: '8',  type: '%', note: 'Standard override' },
]

// ── Payout Data ────────────────────────────────────────────────
const INIT_PAYOUTS = [
  { id: 'PAY-401', vendor: 'Kisan Kendra',       amount: '₹12,400', rawAmount: 12400, period: 'Jun 2025', requested: '28 Jun', bank: 'HDFC ···4821', status: 'pending' },
  { id: 'PAY-400', vendor: 'Agro Plus Stores',   amount: '₹8,750',  rawAmount: 8750,  period: 'Jun 2025', requested: '27 Jun', bank: 'SBI ···9234',  status: 'pending' },
  { id: 'PAY-399', vendor: 'Green Farm Inputs',  amount: '₹5,200',  rawAmount: 5200,  period: 'May 2025', requested: '01 Jun', bank: 'ICICI ···3301',status: 'settled' },
  { id: 'PAY-398', vendor: 'FarmFirst Supplies', amount: '₹3,100',  rawAmount: 3100,  period: 'May 2025', requested: '31 May', bank: 'Axis ···7762', status: 'settled' },
]

const COMM_TABS = ['category', 'sku override', 'vendor override']

// ── Reject Modal ───────────────────────────────────────────────
function RejectModal({ payout, onConfirm, onClose }) {
  const [reason, setReason] = useState('')
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ backgroundColor: 'rgba(0,0,0,0.45)' }} onClick={onClose}>
      <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden"
        onClick={e => e.stopPropagation()}>
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl flex items-center justify-center bg-red-50">
              <AlertTriangle size={16} className="text-red-500" />
            </div>
            <div>
              <p className="text-sm font-bold text-gray-900">Reject Payout</p>
              <p className="text-xs text-gray-400">{payout.id} · {payout.vendor}</p>
            </div>
          </div>
          <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-gray-100 transition">
            <X size={16} className="text-gray-400" />
          </button>
        </div>
        <div className="px-5 py-4 space-y-4">
          <div className="bg-gray-50 rounded-xl px-4 py-3 flex items-center justify-between text-sm">
            <span className="text-gray-500">Amount</span>
            <span className="font-bold text-gray-900">{payout.amount}</span>
          </div>
          <div>
            <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5 block">
              Rejection Reason <span className="text-red-500">*</span>
            </label>
            <textarea value={reason} onChange={e => setReason(e.target.value)} rows={4}
              placeholder="Provide a clear reason. This will be sent to the vendor..."
              className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm outline-none focus:border-red-400 resize-none" />
            <p className="text-[10px] text-gray-400 mt-1">Vendor will be notified with this reason via SMS/app notification.</p>
          </div>
        </div>
        <div className="flex gap-2 px-5 pb-5">
          <button onClick={onClose}
            className="flex-1 px-4 py-2.5 rounded-xl text-sm font-semibold text-gray-600 hover:bg-gray-100 transition">
            Cancel
          </button>
          <button onClick={() => onConfirm(reason)} disabled={!reason.trim()}
            className="flex-1 px-4 py-2.5 rounded-xl text-sm font-semibold text-white transition"
            style={{ backgroundColor: !reason.trim() ? '#D1D5DB' : '#EF4444' }}>
            Confirm Rejection
          </button>
        </div>
      </div>
    </div>
  )
}

export default function Financials() {
  const navigate = useNavigate()
  const [activeNav, setActiveNav]       = useState('/financials')
  const [commTab, setCommTab]           = useState('category')
  const [categoryComm, setCategoryComm] = useState(INIT_CATEGORY_COMM)
  const [skuComm, setSkuComm]           = useState(INIT_SKU_COMM)
  const [vendorComm, setVendorComm]     = useState(INIT_VENDOR_COMM)
  const [payouts, setPayouts]           = useState(INIT_PAYOUTS)
  const [editId, setEditId]             = useState(null)
  const [editVal, setEditVal]           = useState('')
  const [editType, setEditType]         = useState('%')
  const [rejectModal, setRejectModal]   = useState(null)

  const handleNav = (path) => { setActiveNav(path); navigate(path) }

  // ── Category commission save ──
  const saveCategory = (id) => {
    setCategoryComm(cs => cs.map(c => c.id === id ? { ...c, rate: editVal, type: editType } : c))
    setEditId(null)
  }

  // ── Payout actions ──
  const settleP  = (id) => setPayouts(ps => ps.map(p => p.id === id ? { ...p, status: 'settled' }  : p))
  const rejectP  = (id, reason) => {
    setPayouts(ps => ps.map(p => p.id === id ? { ...p, status: 'rejected', rejectReason: reason } : p))
    setRejectModal(null)
  }

  const pendingPayouts  = payouts.filter(p => p.status === 'pending')
  const settledPayouts  = payouts.filter(p => p.status === 'settled')
  const rejectedPayouts = payouts.filter(p => p.status === 'rejected')
  const pendingTotal    = pendingPayouts.reduce((s, p) => s + p.rawAmount, 0)

  return (
    <div className="flex h-screen font-sans overflow-hidden" style={{ backgroundColor: '#FFFBEB' }}>

      {/* Reject Modal */}
      {rejectModal && (
        <RejectModal
          payout={rejectModal}
          onConfirm={(reason) => rejectP(rejectModal.id, reason)}
          onClose={() => setRejectModal(null)}
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
            <h2 className="text-sm font-semibold text-white">Financials</h2>
            <p className="text-[11px] text-white/40">Commission hierarchy & Payouts</p>
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

          {/* ── Summary Stats ── */}
          <div className="grid grid-cols-3 gap-3 mb-6">
            {[
              { label: 'Pending Payouts', value: `₹${pendingTotal.toLocaleString('en-IN')}`, sub: `${pendingPayouts.length} requests`, color: '#92400E', bg: '#FEF3C7' },
              { label: 'Settled (May)',   value: '₹62,300', sub: '4 vendors',    color: '#1A3C1F', bg: '#EEF7EE' },
              { label: 'Commission Earned', value: '₹8,420', sub: 'Jun 2025',    color: '#7C3AED', bg: '#F3E8FF' },
            ].map(s => (
              <div key={s.label} className="bg-white rounded-2xl border border-gray-100 shadow-sm px-4 py-3.5">
                <p className="text-xs text-gray-500 mb-1">{s.label}</p>
                <p className="text-xl font-bold text-gray-900">{s.value}</p>
                <p className="text-xs font-semibold mt-0.5" style={{ color: s.color }}>{s.sub}</p>
              </div>
            ))}
          </div>

          <div className="grid md:grid-cols-2 gap-6">

            {/* ── Commission Config (3-level) ── */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-bold text-gray-900">Commission Configuration</h3>
                <div className="text-[10px] font-semibold text-gray-400 bg-gray-100 px-2 py-1 rounded-lg">
                  Calculated on List Price
                </div>
              </div>

              {/* Level Explanation */}
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-3 mb-3">
                <div className="grid grid-cols-3 gap-2 text-center text-[10px]">
                  {[
                    { level: '1', label: 'Category',        sub: 'Base rate',     active: commTab === 'category' },
                    { level: '2', label: 'SKU Override',     sub: 'Per product',   active: commTab === 'sku override' },
                    { level: '3', label: 'Vendor Override',  sub: 'Per vendor',    active: commTab === 'vendor override' },
                  ].map((l, i) => (
                    <button key={l.level} onClick={() => setCommTab(['category','sku override','vendor override'][i])}
                      className="rounded-xl py-2 px-1 transition-all"
                      style={l.active ? { backgroundColor: '#EEF7EE' } : { backgroundColor: '#F9FAFB' }}>
                      <div className="w-5 h-5 rounded-full mx-auto mb-1 flex items-center justify-center text-[10px] font-bold"
                        style={{ backgroundColor: l.active ? '#1A3C1F' : '#E5E7EB', color: l.active ? '#fff' : '#9CA3AF' }}>
                        {l.level}
                      </div>
                      <p className="font-semibold" style={{ color: l.active ? '#1A3C1F' : '#6B7280' }}>{l.label}</p>
                      <p className="text-gray-400">{l.sub}</p>
                    </button>
                  ))}
                </div>
              </div>

              {/* Category Level */}
              {commTab === 'category' && (
                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm divide-y divide-gray-50">
                  {categoryComm.map(c => (
                    <div key={c.id} className="flex items-center justify-between px-4 py-3.5">
                      <div>
                        <p className="text-sm font-semibold text-gray-800">{c.category}</p>
                        <p className="text-xs text-gray-400">Platform commission</p>
                      </div>
                      {editId === c.id ? (
                        <div className="flex items-center gap-2">
                          <input value={editVal} onChange={e => setEditVal(e.target.value)}
                            className="w-14 px-2 py-1 text-sm border border-gray-300 rounded-lg text-center outline-none focus:border-green-700" />
                          <div className="flex gap-1">
                            {['%','₹'].map(t => (
                              <button key={t} onClick={() => setEditType(t)}
                                className="px-2 py-1 rounded-lg text-xs font-bold transition"
                                style={editType === t ? { backgroundColor: '#1A3C1F', color: '#fff' } : { backgroundColor: '#F3F4F6', color: '#6B7280' }}>
                                {t}
                              </button>
                            ))}
                          </div>
                          <button onClick={() => saveCategory(c.id)}
                            className="px-2.5 py-1 rounded-lg text-xs font-semibold text-white" style={{ backgroundColor: '#1A3C1F' }}>
                            Save
                          </button>
                        </div>
                      ) : (
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-bold text-gray-900">{c.rate}{c.type}</span>
                          <button onClick={() => { setEditId(c.id); setEditVal(c.rate); setEditType(c.type) }}
                            className="p-1.5 rounded-lg hover:bg-gray-100 transition">
                            <Edit2 size={13} className="text-gray-400" />
                          </button>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}

              {/* SKU Override Level */}
              {commTab === 'sku override' && (
                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                  <div className="flex items-center justify-between px-4 py-3 border-b border-gray-50">
                    <p className="text-xs font-semibold text-gray-500">Overrides category default for specific SKUs</p>
                    <button className="flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-lg text-white"
                      style={{ backgroundColor: '#1A3C1F' }}>
                      <Plus size={11} /> Add
                    </button>
                  </div>
                  <div className="divide-y divide-gray-50">
                    {skuComm.map(s => (
                      <div key={s.id} className="px-4 py-3.5">
                        <div className="flex items-start justify-between">
                          <div className="flex-1 min-w-0 mr-3">
                            <p className="text-sm font-semibold text-gray-800 truncate">{s.product}</p>
                            <p className="text-xs font-mono text-gray-400 mt-0.5">{s.sku} · {s.category}</p>
                            <p className="text-xs text-gray-400 mt-0.5 italic">{s.note}</p>
                          </div>
                          <div className="flex items-center gap-2 flex-shrink-0">
                            <span className="text-sm font-bold text-gray-900">{s.rate}{s.type}</span>
                            <button className="p-1.5 rounded-lg hover:bg-gray-100 transition">
                              <Edit2 size={13} className="text-gray-400" />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Vendor Override Level */}
              {commTab === 'vendor override' && (
                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                  <div className="flex items-center justify-between px-4 py-3 border-b border-gray-50">
                    <p className="text-xs font-semibold text-gray-500">Overrides everything for specific vendors</p>
                    <button className="flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-lg text-white"
                      style={{ backgroundColor: '#1A3C1F' }}>
                      <Plus size={11} /> Add
                    </button>
                  </div>
                  <div className="divide-y divide-gray-50">
                    {vendorComm.map(v => (
                      <div key={v.id} className="px-4 py-3.5 flex items-start justify-between">
                        <div className="flex-1 min-w-0 mr-3">
                          <p className="text-sm font-semibold text-gray-800">{v.vendor}</p>
                          <p className="text-xs text-gray-400 mt-0.5 italic">{v.note}</p>
                        </div>
                        <div className="flex items-center gap-2 flex-shrink-0">
                          <span className="text-sm font-bold text-gray-900">{v.type}{v.type === '₹' ? v.rate : ''}{v.type === '%' ? v.rate + '%' : ''}</span>
                          <button className="p-1.5 rounded-lg hover:bg-gray-100 transition">
                            <Edit2 size={13} className="text-gray-400" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* ── Payout Requests ── */}
            <div>
              <h3 className="text-sm font-bold text-gray-900 mb-3">Payout Requests</h3>

              {/* Pending */}
              {pendingPayouts.length > 0 && (
                <div className="mb-4">
                  <p className="text-xs font-semibold text-amber-700 uppercase tracking-wider mb-2 flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-amber-400 inline-block" />
                    Pending ({pendingPayouts.length})
                  </p>
                  <div className="bg-white rounded-2xl border border-amber-100 shadow-sm divide-y divide-gray-50">
                    {pendingPayouts.map(p => (
                      <div key={p.id} className="px-4 py-3.5">
                        <div className="flex items-start justify-between gap-2">
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-semibold text-gray-800 truncate">{p.vendor}</p>
                            <p className="text-xs text-gray-400 mt-0.5">{p.id} · {p.period}</p>
                            <p className="text-xs text-gray-400">Bank: {p.bank} · Req: {p.requested}</p>
                          </div>
                          <div className="text-right flex-shrink-0">
                            <p className="text-sm font-bold text-gray-900">{p.amount}</p>
                            <div className="flex gap-1.5 mt-2">
                              <button onClick={() => settleP(p.id)}
                                className="flex items-center gap-1 text-xs font-semibold px-2 py-1.5 rounded-lg text-white"
                                style={{ backgroundColor: '#1A3C1F' }}>
                                <CheckCircle2 size={11} /> Settle
                              </button>
                              <button onClick={() => setRejectModal(p)}
                                className="flex items-center gap-1 text-xs font-semibold px-2 py-1.5 rounded-lg"
                                style={{ backgroundColor: '#FEE2E2', color: '#991B1B' }}>
                                <X size={11} /> Reject
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Settled */}
              {settledPayouts.length > 0 && (
                <div className="mb-4">
                  <p className="text-xs font-semibold text-green-700 uppercase tracking-wider mb-2 flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-green-400 inline-block" />
                    Settled ({settledPayouts.length})
                  </p>
                  <div className="bg-white rounded-2xl border border-gray-100 shadow-sm divide-y divide-gray-50">
                    {settledPayouts.map(p => (
                      <div key={p.id} className="px-4 py-3.5 flex items-center justify-between">
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-semibold text-gray-800 truncate">{p.vendor}</p>
                          <p className="text-xs text-gray-400">{p.id} · {p.period}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-bold text-gray-900">{p.amount}</p>
                          <span className="inline-flex items-center gap-1 mt-1 px-2 py-0.5 rounded-full text-[10px] font-semibold"
                            style={{ backgroundColor: '#EEF7EE', color: '#1A3C1F' }}>
                            <CheckCircle2 size={10} /> Settled
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Rejected */}
              {rejectedPayouts.length > 0 && (
                <div>
                  <p className="text-xs font-semibold text-red-700 uppercase tracking-wider mb-2 flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-red-400 inline-block" />
                    Rejected ({rejectedPayouts.length})
                  </p>
                  <div className="bg-white rounded-2xl border border-gray-100 shadow-sm divide-y divide-gray-50">
                    {rejectedPayouts.map(p => (
                      <div key={p.id} className="px-4 py-3.5 flex items-center justify-between">
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-semibold text-gray-800 truncate">{p.vendor}</p>
                          <p className="text-xs text-gray-400">{p.id} · {p.period}</p>
                          {p.rejectReason && <p className="text-xs text-red-500 mt-0.5 italic truncate">"{p.rejectReason}"</p>}
                        </div>
                        <p className="text-sm font-bold text-gray-400 ml-3 flex-shrink-0">{p.amount}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
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