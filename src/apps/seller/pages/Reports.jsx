import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  LayoutDashboard, ShoppingCart, Package, CreditCard,
  BarChart2, Settings, LogOut, Bell, ChevronDown,
  Download, TrendingUp, ShoppingBag, Star, Clock
} from 'lucide-react'
import {
  AreaChart, Area, XAxis, YAxis, Tooltip,
  ResponsiveContainer, BarChart, Bar
} from 'recharts'

const navItems = [
  { label: 'Dashboard', icon: LayoutDashboard, path: '/dashboard' },
  { label: 'Orders',    icon: ShoppingCart,    path: '/orders' },
  { label: 'Inventory', icon: Package,         path: '/inventory' },
  { label: 'Payments',  icon: CreditCard,      path: '/payments' },
  { label: 'Reports',   icon: BarChart2,       path: '/reports' },
  { label: 'Settings',  icon: Settings,        path: '/settings' },
]

const salesData = [
  { month: 'Jan', sales: 18400 },
  { month: 'Feb', sales: 22100 },
  { month: 'Mar', sales: 19800 },
  { month: 'Apr', sales: 31200 },
  { month: 'May', sales: 28900 },
  { month: 'Jun', sales: 34500 },
]

const ordersData = [
  { month: 'Jan', orders: 42 },
  { month: 'Feb', orders: 58 },
  { month: 'Mar', orders: 51 },
  { month: 'Apr', orders: 79 },
  { month: 'May', orders: 71 },
  { month: 'Jun', orders: 88 },
]

const TOP_PRODUCTS = [
  { name: 'Syngenta Ampligo 150ml', sales: '₹18,400', orders: 44, pct: 85 },
  { name: 'DAP Fertilizer 50kg',    sales: '₹14,000', orders: 10, pct: 65 },
  { name: 'Urea 50kg Bag',          sales: '₹11,200', orders: 16, pct: 52 },
  { name: 'Mahyco Tomato Seeds',    sales: '₹8,750',  orders: 35, pct: 40 },
]

const REPORTS = [
  { label: 'GST Report — June 2025',       sub: 'B2C Sales Summary',     icon: Download },
  { label: 'Sales Data — June 2025',       sub: 'Excel · All categories', icon: Download },
  { label: 'Commission Statement — June',  sub: 'Itemized deductions',    icon: Download },
]

export default function Reports() {
  const navigate = useNavigate()
  const [activeNav, setActiveNav] = useState('/reports')
  const [range, setRange]         = useState('6m')

  const handleNav = (path) => { setActiveNav(path); navigate(path) }

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
            <h1 className="text-base font-bold text-white">Reports</h1>
            <p className="text-xs" style={{ color: 'rgba(255,255,255,0.45)' }}>Analytics & exports</p>
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

          {/* Summary stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
            {[
              { icon: TrendingUp,  label: 'Revenue (Jun)',   value: '₹34,500', sub: '+19% vs May' },
              { icon: ShoppingBag, label: 'Orders (Jun)',    value: '88',       sub: '+24% vs May' },
              { icon: Star,        label: 'Avg. Rating',     value: '4.7',      sub: 'Based on 62 reviews' },
              { icon: Clock,       label: 'Avg. Fulfil Time',value: '2.4h',     sub: 'This month' },
            ].map(({ icon: Icon, label, value, sub }) => (
              <div key={label} className="bg-white rounded-2xl border border-gray-100 p-4 shadow-sm">
                <div className="w-8 h-8 rounded-xl flex items-center justify-center mb-3"
                  style={{ backgroundColor: '#EEF7EE' }}>
                  <Icon size={15} style={{ color: '#1A3C1F' }} />
                </div>
                <p className="text-xs text-gray-500 mb-0.5">{label}</p>
                <p className="text-xl font-bold text-gray-900">{value}</p>
                <p className="text-xs mt-1" style={{ color: '#1A3C1F' }}>{sub}</p>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-6">
            {/* Sales chart */}
            <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <p className="text-sm font-bold text-gray-900">Monthly Revenue</p>
                <div className="flex gap-1">
                  {['3m','6m'].map(r => (
                    <button key={r} onClick={() => setRange(r)}
                      className="px-3 py-1 rounded-lg text-xs font-semibold transition"
                      style={range === r ? { backgroundColor: '#1A3C1F', color: '#fff' } : { backgroundColor: '#F3F4F6', color: '#6B7280' }}>
                      {r}
                    </button>
                  ))}
                </div>
              </div>
              <ResponsiveContainer width="100%" height={180}>
                <AreaChart data={range === '3m' ? salesData.slice(-3) : salesData}>
                  <defs>
                    <linearGradient id="sg" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%"  stopColor="#1A3C1F" stopOpacity={0.15} />
                      <stop offset="95%" stopColor="#1A3C1F" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="month" tick={{ fontSize: 11, fill: '#9CA3AF' }} axisLine={false} tickLine={false} />
                  <YAxis hide />
                  <Tooltip formatter={v => [`₹${v.toLocaleString()}`, 'Revenue']}
                    contentStyle={{ borderRadius: 10, border: 'none', fontSize: 12 }} />
                  <Area type="monotone" dataKey="sales" stroke="#1A3C1F" strokeWidth={2} fill="url(#sg)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>

            {/* Orders chart */}
            <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm">
              <p className="text-sm font-bold text-gray-900 mb-4">Monthly Orders</p>
              <ResponsiveContainer width="100%" height={180}>
                <BarChart data={ordersData} barSize={20}>
                  <XAxis dataKey="month" tick={{ fontSize: 11, fill: '#9CA3AF' }} axisLine={false} tickLine={false} />
                  <YAxis hide />
                  <Tooltip formatter={v => [v, 'Orders']}
                    contentStyle={{ borderRadius: 10, border: 'none', fontSize: 12 }} />
                  <Bar dataKey="orders" fill="#1A3C1F" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* Top products */}
            <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm">
              <p className="text-sm font-bold text-gray-900 mb-4">Top Products by Revenue</p>
              <div className="space-y-4">
                {TOP_PRODUCTS.map((p, i) => (
                  <div key={p.name}>
                    <div className="flex items-center justify-between mb-1.5">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-gray-400">#{i + 1}</span>
                        <span className="text-sm font-medium text-gray-800 truncate max-w-[160px]">{p.name}</span>
                      </div>
                      <span className="text-sm font-bold text-gray-900">{p.sales}</span>
                    </div>
                    <div className="w-full h-1.5 rounded-full bg-gray-100">
                      <div className="h-1.5 rounded-full transition-all" style={{ width: `${p.pct}%`, backgroundColor: '#1A3C1F' }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Downloads */}
            <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm">
              <p className="text-sm font-bold text-gray-900 mb-4">Download Reports</p>
              <div className="space-y-3">
                {REPORTS.map(r => (
                  <button key={r.label}
                    className="w-full flex items-center gap-3 px-4 py-3 rounded-xl border border-gray-100 hover:border-green-200 hover:bg-green-50 transition text-left">
                    <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                      style={{ backgroundColor: '#EEF7EE' }}>
                      <Download size={14} style={{ color: '#1A3C1F' }} />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-gray-800">{r.label}</p>
                      <p className="text-xs text-gray-400">{r.sub}</p>
                    </div>
                  </button>
                ))}
              </div>
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
    </div>
  )
}