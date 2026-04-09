import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  LayoutDashboard, Users2, ShoppingCart, Package,
  CreditCard, Megaphone, RotateCcw, Rss,
  ShieldAlert, FileDown, BarChart3,
  LogOut, Bell, ChevronDown,
  Users, Store, TrendingUp, ArrowUpRight,
  MapPin, Star, Zap, Clock
} from 'lucide-react'
import {
  AreaChart, Area, BarChart, Bar,
  XAxis, YAxis, Tooltip, ResponsiveContainer, Cell
} from 'recharts'

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

// ── Mock Data ──────────────────────────────────────────────────
const dauData = [
  { day: 'Mon', buyers: 312, vendors: 89 },
  { day: 'Tue', buyers: 428, vendors: 102 },
  { day: 'Wed', buyers: 389, vendors: 95 },
  { day: 'Thu', buyers: 501, vendors: 118 },
  { day: 'Fri', buyers: 476, vendors: 111 },
  { day: 'Sat', buyers: 618, vendors: 134 },
  { day: 'Sun', buyers: 542, vendors: 121 },
]

const categoryData = [
  { name: 'Seeds',       revenue: 48200, orders: 312 },
  { name: 'Pesticides',  revenue: 71400, orders: 489 },
  { name: 'Fertilizers', revenue: 39100, orders: 201 },
  { name: 'Equipment',   revenue: 22800, orders: 98  },
]

const geoData = [
  { state: 'Rajasthan',   orders: 892, pct: 100 },
  { state: 'Punjab',      orders: 641, pct: 72  },
  { state: 'Haryana',     orders: 508, pct: 57  },
  { state: 'Uttar Pradesh', orders: 421, pct: 47 },
  { state: 'Gujarat',     orders: 314, pct: 35  },
  { state: 'Maharashtra', orders: 198, pct: 22  },
]

const vendorLeaderboard = [
  { rank: 1,  name: 'Kisan Kendra',       revenue: '₹1,24,800', orders: 289, rating: 4.8, fulfillment: '1.2h', acceptance: '98%' },
  { rank: 2,  name: 'Agro Plus Stores',   revenue: '₹98,400',  orders: 214, rating: 4.6, fulfillment: '1.8h', acceptance: '95%' },
  { rank: 3,  name: 'Green Farm Inputs',  revenue: '₹74,200',  orders: 162, rating: 4.5, fulfillment: '2.1h', acceptance: '91%' },
  { rank: 4,  name: 'FarmFirst Supplies', revenue: '₹61,100',  orders: 138, rating: 4.3, fulfillment: '2.4h', acceptance: '89%' },
  { rank: 5,  name: 'Soil & Seed Co.',    revenue: '₹48,900',  orders: 119, rating: 4.2, fulfillment: '2.9h', acceptance: '87%' },
]

const peakHoursData = [
  { hour: '6am',  orders: 12  },
  { hour: '8am',  orders: 48  },
  { hour: '10am', orders: 89  },
  { hour: '12pm', orders: 102 },
  { hour: '2pm',  orders: 76  },
  { hour: '4pm',  orders: 94  },
  { hour: '6pm',  orders: 118 },
  { hour: '8pm',  orders: 71  },
  { hour: '10pm', orders: 22  },
]

const CATEGORY_COLORS = ['#1A3C1F', '#16A34A', '#4ADE80', '#BBF7D0']

const RANGE_TABS = ['DAU', 'WAU', 'MAU']

function MetricCard({ icon: Icon, label, value, sub, iconBg, iconColor }) {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-4 shadow-sm flex flex-col gap-3">
      <div className="flex items-start justify-between">
        <div className="p-2 rounded-xl" style={{ backgroundColor: iconBg }}>
          <Icon size={18} style={{ color: iconColor }} />
        </div>
        <div className="flex items-center gap-1 text-xs font-semibold" style={{ color: iconColor }}>
          <ArrowUpRight size={12} /> {sub}
        </div>
      </div>
      <div>
        <p className="text-xs text-gray-500 mb-0.5">{label}</p>
        <p className="text-xl font-bold text-gray-900">{value}</p>
      </div>
    </div>
  )
}

export default function Analytics() {
  const navigate = useNavigate()
  const [activeNav, setActiveNav]   = useState('/analytics')
  const [activeRange, setActiveRange] = useState('DAU')
  const [sortBy, setSortBy]         = useState('revenue')

  const handleNav = (path) => { setActiveNav(path); navigate(path) }

  const sortedLeaderboard = [...vendorLeaderboard].sort((a, b) => {
    if (sortBy === 'revenue') return b.rank - a.rank
    if (sortBy === 'rating')  return b.rating - a.rating
    if (sortBy === 'acceptance') return parseInt(b.acceptance) - parseInt(a.acceptance)
    return 0
  })

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
            <h2 className="text-sm font-semibold text-white">Analytics</h2>
            <p className="text-[11px] text-white/40">Platform health & performance</p>
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

          {/* ── Section 1: Platform Health ── */}
          <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">Platform Health</p>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
            <MetricCard icon={Users}       label="Active Buyers"       value="3,891"  sub="+24 today"    iconBg="#EEF7EE" iconColor="#1A3C1F" />
            <MetricCard icon={Store}       label="Active Vendors"      value="142"    sub="+3 this week"  iconBg="#EFF6FF" iconColor="#1D4ED8" />
            <MetricCard icon={TrendingUp}  label="Conversion Rate"     value="3.8%"   sub="+0.4% MoM"    iconBg="#FEF3C7" iconColor="#92400E" />
            <MetricCard icon={ShoppingCart} label="Avg Order Value"    value="₹684"   sub="+₹42 MoM"     iconBg="#F3E8FF" iconColor="#7C3AED" />
          </div>

          {/* ── Section 2: DAU/WAU/MAU Chart ── */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 mb-5">
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="text-sm font-bold text-gray-900">Active Users</p>
                <p className="text-xs text-gray-400 mt-0.5">Buyers + Vendors</p>
              </div>
              <div className="flex gap-1 bg-gray-50 rounded-xl p-1">
                {RANGE_TABS.map(r => (
                  <button key={r} onClick={() => setActiveRange(r)}
                    className="px-3 py-1 rounded-lg text-xs font-semibold transition-all"
                    style={activeRange === r
                      ? { backgroundColor: '#1A3C1F', color: '#fff' }
                      : { color: '#6B7280' }}>
                    {r}
                  </button>
                ))}
              </div>
            </div>
            <div className="flex gap-4 mb-3">
              <div className="flex items-center gap-1.5 text-xs text-gray-500">
                <div className="w-2.5 h-2.5 rounded-sm" style={{ backgroundColor: '#1A3C1F' }} />
                Buyers
              </div>
              <div className="flex items-center gap-1.5 text-xs text-gray-500">
                <div className="w-2.5 h-2.5 rounded-sm" style={{ backgroundColor: '#BBF7D0' }} />
                Vendors
              </div>
            </div>
            <ResponsiveContainer width="100%" height={180}>
              <BarChart data={dauData} margin={{ top: 0, right: 0, left: -20, bottom: 0 }} barGap={2}>
                <XAxis dataKey="day" tick={{ fontSize: 11, fill: '#9CA3AF' }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 10, fill: '#9CA3AF' }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={{ fontSize: 12, borderRadius: 8, border: '1px solid #E5E7EB' }} />
                <Bar dataKey="buyers"  fill="#1A3C1F" radius={[4,4,0,0]} maxBarSize={22} />
                <Bar dataKey="vendors" fill="#BBF7D0" radius={[4,4,0,0]} maxBarSize={22} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* ── Section 3: Category Performance + Peak Hours ── */}
          <div className="grid md:grid-cols-2 gap-5 mb-5">

            {/* Category Performance */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
              <p className="text-sm font-bold text-gray-900 mb-4">Category Performance</p>
              <div className="space-y-3">
                {categoryData.map((c, i) => {
                  const maxRev = Math.max(...categoryData.map(x => x.revenue))
                  const pct = Math.round((c.revenue / maxRev) * 100)
                  return (
                    <div key={c.name}>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs font-semibold text-gray-700">{c.name}</span>
                        <div className="flex items-center gap-3 text-xs text-gray-500">
                          <span>{c.orders} orders</span>
                          <span className="font-bold text-gray-800">₹{(c.revenue/1000).toFixed(1)}k</span>
                        </div>
                      </div>
                      <div className="h-2 rounded-full bg-gray-100 overflow-hidden">
                        <div className="h-full rounded-full transition-all"
                          style={{ width: `${pct}%`, backgroundColor: CATEGORY_COLORS[i] }} />
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>

            {/* Peak Order Hours */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
              <div className="flex items-center gap-2 mb-4">
                <Clock size={16} style={{ color: '#1A3C1F' }} />
                <p className="text-sm font-bold text-gray-900">Peak Order Times</p>
              </div>
              <ResponsiveContainer width="100%" height={160}>
                <AreaChart data={peakHoursData} margin={{ top: 0, right: 0, left: -25, bottom: 0 }}>
                  <defs>
                    <linearGradient id="peakGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%"  stopColor="#1A3C1F" stopOpacity={0.15} />
                      <stop offset="95%" stopColor="#1A3C1F" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="hour" tick={{ fontSize: 10, fill: '#9CA3AF' }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fontSize: 10, fill: '#9CA3AF' }} axisLine={false} tickLine={false} />
                  <Tooltip contentStyle={{ fontSize: 12, borderRadius: 8, border: '1px solid #E5E7EB' }} />
                  <Area type="monotone" dataKey="orders" stroke="#1A3C1F" strokeWidth={2} fill="url(#peakGrad)" dot={false} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* ── Section 4: Geographic Distribution ── */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 mb-5">
            <div className="flex items-center gap-2 mb-4">
              <MapPin size={16} style={{ color: '#1A3C1F' }} />
              <p className="text-sm font-bold text-gray-900">Geographic Distribution</p>
              <span className="text-xs text-gray-400 ml-1">— Sales by state</span>
            </div>
            <div className="space-y-2.5">
              {geoData.map(g => (
                <div key={g.state} className="flex items-center gap-3">
                  <span className="text-xs font-semibold text-gray-700 w-32 flex-shrink-0">{g.state}</span>
                  <div className="flex-1 h-2.5 rounded-full bg-gray-100 overflow-hidden">
                    <div className="h-full rounded-full transition-all"
                      style={{ width: `${g.pct}%`, backgroundColor: '#1A3C1F' }} />
                  </div>
                  <span className="text-xs font-bold text-gray-800 w-16 text-right flex-shrink-0">{g.orders} orders</span>
                </div>
              ))}
            </div>
          </div>

          {/* ── Section 5: Vendor Leaderboard ── */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="flex items-center justify-between px-5 py-4 border-b border-gray-50">
              <div className="flex items-center gap-2">
                <Star size={16} style={{ color: '#1A3C1F' }} />
                <p className="text-sm font-bold text-gray-900">Vendor Leaderboard</p>
                <span className="text-xs text-gray-400">— Top 5</span>
              </div>
              <div className="flex gap-1">
                {[['revenue','Revenue'],['rating','Rating'],['acceptance','Acceptance']].map(([k,l]) => (
                  <button key={k} onClick={() => setSortBy(k)}
                    className="px-2.5 py-1 rounded-lg text-xs font-semibold transition-all"
                    style={sortBy === k
                      ? { backgroundColor: '#1A3C1F', color: '#fff' }
                      : { color: '#6B7280', backgroundColor: '#F9FAFB' }}>
                    {l}
                  </button>
                ))}
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-50">
                    {['#', 'Vendor', 'Revenue', 'Orders', 'Rating', 'Avg Fulfillment', 'Acceptance'].map(h => (
                      <th key={h} className="text-left px-4 py-3 text-xs font-semibold text-gray-400 uppercase tracking-wider whitespace-nowrap">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {sortedLeaderboard.map(v => (
                    <tr key={v.rank} className="hover:bg-gray-50 transition-colors">
                      <td className="px-4 py-3">
                        <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold
                          ${v.rank === 1 ? 'bg-amber-100 text-amber-700' :
                            v.rank === 2 ? 'bg-gray-100 text-gray-600' :
                            v.rank === 3 ? 'bg-orange-50 text-orange-600' : 'text-gray-400'}`}>
                          {v.rank}
                        </span>
                      </td>
                      <td className="px-4 py-3 font-semibold text-gray-800">{v.name}</td>
                      <td className="px-4 py-3 font-bold text-gray-900">{v.revenue}</td>
                      <td className="px-4 py-3 text-gray-600">{v.orders}</td>
                      <td className="px-4 py-3">
                        <span className="flex items-center gap-1 text-sm font-semibold text-amber-600">
                          ⭐ {v.rating}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <span className="flex items-center gap-1 text-xs font-semibold" style={{ color: '#1A3C1F' }}>
                          <Zap size={11} /> {v.fulfillment}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          <div className="w-16 h-1.5 rounded-full bg-gray-100 overflow-hidden">
                            <div className="h-full rounded-full" style={{ width: v.acceptance, backgroundColor: '#1A3C1F' }} />
                          </div>
                          <span className="text-xs font-semibold text-gray-700">{v.acceptance}</span>
                        </div>
                      </td>
                    </tr>
                  ))}
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