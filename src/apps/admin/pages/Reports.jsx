import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  LayoutDashboard, Users2, ShoppingCart, Package,
  CreditCard, Megaphone, RotateCcw, Rss,
  ShieldAlert, FileDown, BarChart3,
  LogOut, Bell, ChevronDown,
  Download, FileText, FileSpreadsheet,
  TrendingUp, Receipt, Landmark, Filter
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

const MONTHS  = ['January','February','March','April','May','June','July','August','September','October','November','December']
const YEARS   = ['2025', '2024']
const CATEGORIES_LIST = ['All Categories', 'Seeds', 'Pesticides', 'Fertilizers', 'Equipment']

const REPORT_TYPES = [
  {
    id: 'gst',
    icon: Receipt,
    title: 'GST Reports',
    desc: 'B2C sales summary with GSTIN-wise breakdowns. Required for monthly GST filing.',
    color: '#EEF7EE',
    iconColor: '#1A3C1F',
    formats: ['Excel', 'PDF'],
    records: [
      { label: 'GST Report — June 2025',       sub: 'B2C Summary · 284 invoices',       size: '42 KB' },
      { label: 'GST Report — May 2025',        sub: 'B2C Summary · 261 invoices',       size: '38 KB' },
      { label: 'GST Report — April 2025',      sub: 'B2C Summary · 198 invoices',       size: '31 KB' },
    ],
  },
  {
    id: 'sales',
    icon: TrendingUp,
    title: 'Sales Data',
    desc: 'Itemized order-level sales data with filters by date range, category, and vendor.',
    color: '#EFF6FF',
    iconColor: '#1D4ED8',
    formats: ['Excel', 'PDF'],
    records: [
      { label: 'Sales Data — Jun 2025',        sub: 'All categories · 284 orders',      size: '118 KB' },
      { label: 'Sales Data — May 2025',        sub: 'All categories · 261 orders',      size: '104 KB' },
      { label: 'Sales Data — Q1 2025',         sub: 'Jan–Mar · 621 orders',             size: '248 KB' },
    ],
  },
  {
    id: 'commission',
    icon: Landmark,
    title: 'Commission Statements',
    desc: 'Itemized commission deductions per vendor per period. Used for settlement reconciliation.',
    color: '#F3E8FF',
    iconColor: '#7C3AED',
    formats: ['Excel', 'PDF'],
    records: [
      { label: 'Commission Statement — Jun 2025', sub: '142 vendors · ₹38,420 total',   size: '64 KB' },
      { label: 'Commission Statement — May 2025', sub: '138 vendors · ₹34,100 total',   size: '61 KB' },
      { label: 'Commission Statement — Apr 2025', sub: '131 vendors · ₹29,880 total',   size: '57 KB' },
    ],
  },
]

function ReportCard({ report, filters }) {
  const Icon = report.icon
  const [fmt, setFmt] = useState('Excel')

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
      {/* Card Header */}
      <div className="flex items-start gap-4 p-5 border-b border-gray-50">
        <div className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0"
          style={{ backgroundColor: report.color }}>
          <Icon size={20} style={{ color: report.iconColor }} />
        </div>
        <div className="flex-1">
          <p className="text-sm font-bold text-gray-900">{report.title}</p>
          <p className="text-xs text-gray-400 mt-0.5 leading-relaxed">{report.desc}</p>
        </div>
      </div>

      {/* Custom Download with filters */}
      <div className="px-5 py-4 border-b border-gray-50 bg-gray-50/50">
        <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">Custom Download</p>
        <div className="flex flex-wrap gap-2 items-end">
          <div>
            <label className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider mb-1 block">Month</label>
            <select className="border border-gray-200 rounded-lg px-2.5 py-1.5 text-xs bg-white outline-none focus:border-green-700">
              {MONTHS.map(m => <option key={m}>{m}</option>)}
            </select>
          </div>
          <div>
            <label className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider mb-1 block">Year</label>
            <select className="border border-gray-200 rounded-lg px-2.5 py-1.5 text-xs bg-white outline-none focus:border-green-700">
              {YEARS.map(y => <option key={y}>{y}</option>)}
            </select>
          </div>
          {report.id === 'sales' && (
            <div>
              <label className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider mb-1 block">Category</label>
              <select className="border border-gray-200 rounded-lg px-2.5 py-1.5 text-xs bg-white outline-none focus:border-green-700">
                {CATEGORIES_LIST.map(c => <option key={c}>{c}</option>)}
              </select>
            </div>
          )}
          <div>
            <label className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider mb-1 block">Format</label>
            <div className="flex gap-1">
              {report.formats.map(f => (
                <button key={f} onClick={() => setFmt(f)}
                  className="px-2.5 py-1.5 rounded-lg text-xs font-semibold transition-all"
                  style={fmt === f
                    ? { backgroundColor: '#1A3C1F', color: '#fff' }
                    : { backgroundColor: '#fff', color: '#6B7280', border: '1px solid #E5E7EB' }}>
                  {f === 'Excel' ? '📊' : '📄'} {f}
                </button>
              ))}
            </div>
          </div>
          <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-white transition ml-auto"
            style={{ backgroundColor: report.iconColor }}>
            <Download size={13} /> Generate & Download
          </button>
        </div>
      </div>

      {/* Recent Downloads */}
      <div className="divide-y divide-gray-50">
        {report.records.map((r, i) => (
          <div key={i} className="flex items-center justify-between px-5 py-3">
            <div className="flex items-center gap-3">
              <FileSpreadsheet size={16} className="text-gray-300 flex-shrink-0" />
              <div>
                <p className="text-xs font-semibold text-gray-700">{r.label}</p>
                <p className="text-[11px] text-gray-400">{r.sub} · {r.size}</p>
              </div>
            </div>
            <button className="flex items-center gap-1 text-xs font-semibold px-2.5 py-1.5 rounded-lg transition hover:bg-gray-100"
              style={{ color: '#1A3C1F' }}>
              <Download size={12} /> Download
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}

export default function Reports() {
  const navigate = useNavigate()
  const [activeNav, setActiveNav] = useState('/reports')
  const handleNav = (path) => { setActiveNav(path); navigate(path) }

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
            <h2 className="text-sm font-semibold text-white">Advanced Reports</h2>
            <p className="text-[11px] text-white/40">GST, Sales & Commission downloads</p>
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
          <div className="space-y-5">
            {REPORT_TYPES.map(r => <ReportCard key={r.id} report={r} />)}
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