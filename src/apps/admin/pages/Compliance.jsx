import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  LayoutDashboard, Users2, ShoppingCart, Package,
  CreditCard, Megaphone, RotateCcw, Rss,
  ShieldAlert, FileDown, BarChart3,
  LogOut, Bell, ChevronDown, Plus,
  X, CheckCircle2, Clock, AlertTriangle, Search
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

const STATES = ['Punjab', 'Haryana', 'Uttar Pradesh', 'Gujarat', 'Rajasthan', 'Uttarakhand', 'Maharashtra', 'Madhya Pradesh']

const PRODUCTS_LIST = [
  'Glyphosate 41% SL', 'Chlorpyrifos 20% EC', 'Monocrotophos 36% SL',
  'Endosulfan 35% EC', 'Methomyl 40% SP', 'Carbofuran 3% CG',
  'Dichlorvos 76% EC', 'Phorate 10% CG'
]

const BANS = [
  {
    id: 'GEO-001', product: 'Glyphosate 41% SL', ingredient: 'Glyphosate',
    states: ['Punjab', 'Haryana'], start: '2025-07-01', end: '2025-12-31',
    status: 'active', setBy: 'Admin', setOn: '25 Jun 2025'
  },
  {
    id: 'GEO-002', product: 'Chlorpyrifos 20% EC', ingredient: 'Chlorpyrifos',
    states: ['Kerala', 'Karnataka'], start: '2025-06-01', end: '2025-09-30',
    status: 'active', setBy: 'Admin', setOn: '01 Jun 2025'
  },
  {
    id: 'GEO-003', product: 'Monocrotophos 36% SL', ingredient: 'Monocrotophos',
    states: ['Uttar Pradesh', 'Gujarat', 'Rajasthan'], start: '2025-01-01', end: '2025-05-31',
    status: 'expired', setBy: 'Admin', setOn: '01 Jan 2025'
  },
]

const TABS = ['active rules', 'audit log']

// Step indicator
function Step({ num, label, active, done }) {
  return (
    <div className="flex items-center gap-2">
      <div className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 transition-all"
        style={done
          ? { backgroundColor: '#1A3C1F', color: '#fff' }
          : active
          ? { backgroundColor: '#EEF7EE', color: '#1A3C1F', border: '2px solid #1A3C1F' }
          : { backgroundColor: '#F3F4F6', color: '#9CA3AF' }}>
        {done ? <CheckCircle2 size={14} /> : num}
      </div>
      <span className="text-xs font-semibold hidden sm:block"
        style={{ color: active || done ? '#1A3C1F' : '#9CA3AF' }}>
        {label}
      </span>
    </div>
  )
}

function StepDivider({ done }) {
  return <div className="flex-1 h-px mx-1" style={{ backgroundColor: done ? '#1A3C1F' : '#E5E7EB' }} />
}

export default function Compliance() {
  const navigate = useNavigate()
  const [activeNav, setActiveNav] = useState('/compliance')
  const [tab, setTab]             = useState('active rules')
  const [showForm, setShowForm]   = useState(false)
  const [step, setStep]           = useState(1)
  const [bans, setBans]           = useState(BANS)

  // Form state
  const [selProduct,    setSelProduct]    = useState('')
  const [selIngredient, setSelIngredient] = useState('')
  const [selStates,     setSelStates]     = useState([])
  const [startDate,     setStartDate]     = useState('')
  const [endDate,       setEndDate]       = useState('')
  const [search,        setSearch]        = useState('')

  const handleNav = (path) => { setActiveNav(path); navigate(path) }

  const toggleState = (s) =>
    setSelStates(prev => prev.includes(s) ? prev.filter(x => x !== s) : [...prev, s])

  const handleActivate = () => {
    const newBan = {
      id: `GEO-00${bans.length + 1}`,
      product: selProduct, ingredient: selIngredient,
      states: selStates, start: startDate, end: endDate,
      status: 'active', setBy: 'Admin',
      setOn: new Date().toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })
    }
    setBans(prev => [newBan, ...prev])
    setShowForm(false)
    setStep(1)
    setSelProduct(''); setSelIngredient(''); setSelStates([]); setStartDate(''); setEndDate('')
  }

  const handleRevoke = (id) =>
    setBans(prev => prev.map(b => b.id === id ? { ...b, status: 'revoked' } : b))

  const filtered = bans.filter(b => {
    const matchTab = tab === 'active rules' ? b.status !== 'expired' : true
    const matchSearch = b.product.toLowerCase().includes(search.toLowerCase()) ||
      b.states.some(s => s.toLowerCase().includes(search.toLowerCase()))
    return matchTab && matchSearch
  })

  const canNext1 = selProduct && selIngredient
  const canNext2 = selStates.length > 0
  const canNext3 = startDate && endDate

  return (
    <div className="flex h-screen font-sans overflow-hidden" style={{ backgroundColor: '#FFFBEB' }}>

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
            <LogOut size={17} style={{ color: 'rgba(255,255,255,0.55)' }} />
            Logout
          </button>
        </div>
      </aside>

      {/* Main */}
      <div className="flex-1 flex flex-col h-full overflow-hidden">

        {/* Header */}
        <header className="flex items-center justify-between px-4 md:px-6 h-[62px] border-b border-white/10 flex-shrink-0"
          style={{ backgroundColor: '#1E293B' }}>
          <div>
            <h2 className="text-sm font-semibold text-white">Product Compliance</h2>
            <p className="text-[11px] text-white/40">Geofencing & State-level bans</p>
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

        {/* Body */}
        <main className="flex-1 overflow-y-auto px-4 md:px-6 py-6" style={{ backgroundColor: '#FFFBEB' }}>

          {/* New Ban Form */}
          {showForm && (
            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-5 mb-6">

              {/* Step indicator */}
              <div className="flex items-center mb-6">
                <Step num="1" label="Select Product"  active={step === 1} done={step > 1} />
                <StepDivider done={step > 1} />
                <Step num="2" label="Select States"   active={step === 2} done={step > 2} />
                <StepDivider done={step > 2} />
                <Step num="3" label="Set Date Range"  active={step === 3} done={step > 3} />
                <StepDivider done={step > 3} />
                <Step num="4" label="Activate"        active={step === 4} done={false} />
                <button onClick={() => { setShowForm(false); setStep(1) }}
                  className="ml-auto p-1.5 rounded-lg hover:bg-gray-100 transition">
                  <X size={16} className="text-gray-400" />
                </button>
              </div>

              {/* Step 1 — Product */}
              {step === 1 && (
                <div className="space-y-4">
                  <p className="text-sm font-semibold text-gray-800">Select product or filter by active ingredient</p>
                  <div>
                    <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5 block">Product Name</label>
                    <select value={selProduct} onChange={e => setSelProduct(e.target.value)}
                      className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm outline-none focus:border-green-700 bg-white">
                      <option value="">Select a product...</option>
                      {PRODUCTS_LIST.map(p => <option key={p} value={p}>{p}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5 block">Active Ingredient</label>
                    <input value={selIngredient} onChange={e => setSelIngredient(e.target.value)}
                      placeholder="e.g. Glyphosate, Chlorpyrifos"
                      className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm outline-none focus:border-green-700" />
                  </div>
                  <div className="flex justify-end">
                    <button onClick={() => canNext1 && setStep(2)} disabled={!canNext1}
                      className="px-5 py-2 rounded-xl text-sm font-semibold text-white transition"
                      style={{ backgroundColor: canNext1 ? '#1A3C1F' : '#D1D5DB' }}>
                      Next →
                    </button>
                  </div>
                </div>
              )}

              {/* Step 2 — States */}
              {step === 2 && (
                <div className="space-y-4">
                  <p className="text-sm font-semibold text-gray-800">Select affected state(s)</p>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {STATES.map(s => {
                      const sel = selStates.includes(s)
                      return (
                        <button key={s} onClick={() => toggleState(s)}
                          className="px-3 py-2.5 rounded-xl text-sm font-semibold text-left transition-all border"
                          style={sel
                            ? { backgroundColor: '#EEF7EE', color: '#1A3C1F', borderColor: '#1A3C1F' }
                            : { backgroundColor: '#fff', color: '#6B7280', borderColor: '#E5E7EB' }}>
                          {sel && <CheckCircle2 size={12} className="inline mr-1" />}
                          {s}
                        </button>
                      )
                    })}
                  </div>
                  {selStates.length > 0 && (
                    <p className="text-xs text-gray-500">
                      Selected: <span className="font-semibold text-gray-700">{selStates.join(', ')}</span>
                    </p>
                  )}
                  <div className="flex justify-between">
                    <button onClick={() => setStep(1)} className="px-5 py-2 rounded-xl text-sm font-semibold text-gray-500 hover:bg-gray-100 transition">← Back</button>
                    <button onClick={() => canNext2 && setStep(3)} disabled={!canNext2}
                      className="px-5 py-2 rounded-xl text-sm font-semibold text-white transition"
                      style={{ backgroundColor: canNext2 ? '#1A3C1F' : '#D1D5DB' }}>
                      Next →
                    </button>
                  </div>
                </div>
              )}

              {/* Step 3 — Dates */}
              {step === 3 && (
                <div className="space-y-4">
                  <p className="text-sm font-semibold text-gray-800">Set ban period</p>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5 block">Start Date</label>
                      <input type="date" value={startDate} onChange={e => setStartDate(e.target.value)}
                        className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm outline-none focus:border-green-700" />
                    </div>
                    <div>
                      <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5 block">End Date</label>
                      <input type="date" value={endDate} onChange={e => setEndDate(e.target.value)}
                        className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm outline-none focus:border-green-700" />
                    </div>
                  </div>
                  <div className="flex justify-between">
                    <button onClick={() => setStep(2)} className="px-5 py-2 rounded-xl text-sm font-semibold text-gray-500 hover:bg-gray-100 transition">← Back</button>
                    <button onClick={() => canNext3 && setStep(4)} disabled={!canNext3}
                      className="px-5 py-2 rounded-xl text-sm font-semibold text-white transition"
                      style={{ backgroundColor: canNext3 ? '#1A3C1F' : '#D1D5DB' }}>
                      Next →
                    </button>
                  </div>
                </div>
              )}

              {/* Step 4 — Confirm & Activate */}
              {step === 4 && (
                <div className="space-y-4">
                  <p className="text-sm font-semibold text-gray-800">Review & Activate</p>
                  <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 flex gap-3">
                    <AlertTriangle size={18} className="text-amber-500 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm font-semibold text-amber-800">Immediate effect on activation</p>
                      <p className="text-xs text-amber-700 mt-0.5">
                        Product will be instantly hidden from buyers in selected states. All in-cart items will be auto-removed.
                      </p>
                    </div>
                  </div>
                  <div className="bg-gray-50 rounded-xl p-4 space-y-2 text-sm">
                    <div className="flex justify-between"><span className="text-gray-500">Product</span><span className="font-semibold text-gray-800">{selProduct}</span></div>
                    <div className="flex justify-between"><span className="text-gray-500">Ingredient</span><span className="font-semibold text-gray-800">{selIngredient}</span></div>
                    <div className="flex justify-between"><span className="text-gray-500">States</span><span className="font-semibold text-gray-800 text-right max-w-[60%]">{selStates.join(', ')}</span></div>
                    <div className="flex justify-between"><span className="text-gray-500">Period</span><span className="font-semibold text-gray-800">{startDate} → {endDate}</span></div>
                  </div>
                  <div className="flex justify-between">
                    <button onClick={() => setStep(3)} className="px-5 py-2 rounded-xl text-sm font-semibold text-gray-500 hover:bg-gray-100 transition">← Back</button>
                    <button onClick={handleActivate}
                      className="flex items-center gap-2 px-5 py-2 rounded-xl text-sm font-semibold text-white transition"
                      style={{ backgroundColor: '#1A3C1F' }}>
                      <ShieldAlert size={15} /> Activate Ban
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Tabs + Actions */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5">
            <div className="flex gap-1 bg-white rounded-xl border border-gray-200 p-1 w-fit">
              {TABS.map(t => (
                <button key={t} onClick={() => setTab(t)}
                  className="px-4 py-1.5 rounded-lg text-sm font-semibold transition-all capitalize"
                  style={tab === t ? { backgroundColor: '#1A3C1F', color: '#fff' } : { color: '#6B7280' }}>
                  {t}
                </button>
              ))}
            </div>
            <div className="flex gap-2">
              <div className="relative">
                <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input value={search} onChange={e => setSearch(e.target.value)}
                  placeholder="Search product or state..."
                  className="pl-8 pr-4 py-2 text-sm border border-gray-200 rounded-xl bg-white outline-none focus:border-green-700 w-52" />
              </div>
              {!showForm && (
                <button onClick={() => { setShowForm(true); setStep(1) }}
                  className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold text-white transition"
                  style={{ backgroundColor: '#1A3C1F' }}>
                  <Plus size={15} /> New Ban Rule
                </button>
              )}
            </div>
          </div>

          {/* Rules Table */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-100">
                    {['Rule ID', 'Product', 'Ingredient', 'Affected States', 'Period', 'Status', 'Set By', ''].map(h => (
                      <th key={h} className="text-left px-4 py-3 text-xs font-semibold text-gray-400 uppercase tracking-wider whitespace-nowrap">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {filtered.map(b => (
                    <tr key={b.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-4 py-3 font-mono text-xs font-semibold text-gray-500">{b.id}</td>
                      <td className="px-4 py-3 font-semibold text-gray-800 max-w-[160px]">
                        <p className="truncate">{b.product}</p>
                      </td>
                      <td className="px-4 py-3 text-xs text-gray-500 font-medium">{b.ingredient}</td>
                      <td className="px-4 py-3">
                        <div className="flex flex-wrap gap-1">
                          {b.states.map(s => (
                            <span key={s} className="px-1.5 py-0.5 rounded-md text-[10px] font-semibold"
                              style={{ backgroundColor: '#EEF7EE', color: '#1A3C1F' }}>
                              {s}
                            </span>
                          ))}
                        </div>
                      </td>
                      <td className="px-4 py-3 text-xs text-gray-500 whitespace-nowrap">
                        {b.start} → {b.end}
                      </td>
                      <td className="px-4 py-3">
                        {b.status === 'active' && (
                          <span className="flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold w-fit"
                            style={{ backgroundColor: '#EEF7EE', color: '#1A3C1F' }}>
                            <CheckCircle2 size={11} /> Active
                          </span>
                        )}
                        {b.status === 'expired' && (
                          <span className="flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold w-fit"
                            style={{ backgroundColor: '#F3F4F6', color: '#6B7280' }}>
                            <Clock size={11} /> Expired
                          </span>
                        )}
                        {b.status === 'revoked' && (
                          <span className="flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold w-fit"
                            style={{ backgroundColor: '#FEE2E2', color: '#991B1B' }}>
                            <X size={11} /> Revoked
                          </span>
                        )}
                      </td>
                      <td className="px-4 py-3 text-xs text-gray-500">
                        <p className="font-medium">{b.setBy}</p>
                        <p className="text-gray-400">{b.setOn}</p>
                      </td>
                      <td className="px-4 py-3">
                        {b.status === 'active' && (
                          <button onClick={() => handleRevoke(b.id)}
                            className="flex items-center gap-1 text-xs font-semibold px-2.5 py-1.5 rounded-lg transition"
                            style={{ backgroundColor: '#FEE2E2', color: '#991B1B' }}>
                            <X size={12} /> Revoke
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                  {filtered.length === 0 && (
                    <tr>
                      <td colSpan={8} className="px-4 py-12 text-center text-sm text-gray-400">
                        No compliance rules found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
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