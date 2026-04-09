import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  LayoutDashboard, Users2, ShoppingCart, Package,
  CreditCard, Megaphone, RotateCcw, Rss,
  ShieldAlert, FileDown, BarChart3,
  LogOut, Bell, ChevronDown, ArrowUpRight,
  TrendingUp, Store, UserCheck, ArrowRight,
  Clock, CheckCircle2, AlertTriangle
} from 'lucide-react'
import {
  AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, BarChart, Bar
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

const revenueData = [
  { date: '01 Jun', revenue: 84000 },
  { date: '05 Jun', revenue: 112000 },
  { date: '10 Jun', revenue: 98000 },
  { date: '15 Jun', revenue: 145000 },
  { date: '20 Jun', revenue: 132000 },
  { date: '25 Jun', revenue: 158000 },
  { date: '30 Jun', revenue: 171000 },
]

const dauData = [
  { day: 'Mon', buyers: 312, vendors: 89 },
  { day: 'Tue', buyers: 428, vendors: 102 },
  { day: 'Wed', buyers: 389, vendors: 95 },
  { day: 'Thu', buyers: 501, vendors: 118 },
  { day: 'Fri', buyers: 476, vendors: 111 },
  { day: 'Sat', buyers: 618, vendors: 134 },
  { day: 'Sun', buyers: 542, vendors: 121 },
]

const recentOrders = [
  { id: '#ORD-9201', buyer: 'Ramesh Kumar',  amount: '₹840',  status: 'delivered' },
  { id: '#ORD-9200', buyer: 'Suresh Patel',  amount: '₹320',  status: 'pending'   },
  { id: '#ORD-9199', buyer: 'Anil Singh',    amount: '₹1,250',status: 'processing' },
  { id: '#ORD-9198', buyer: 'Dinesh Yadav',  amount: '₹700',  status: 'shipped'   },
]

const pendingActions = [
  { icon: UserCheck,     color: '#92400E', bg: '#FEF3C7', text: '8 vendors pending KYC review',         path: '/users'      },
  { icon: CreditCard,    color: '#7C3AED', bg: '#F3E8FF', text: '2 payout requests awaiting approval',  path: '/financials' },
  { icon: RotateCcw,     color: '#1D4ED8', bg: '#EFF6FF', text: '3 return disputes need review',        path: '/returns'    },
  { icon: AlertTriangle, color: '#991B1B', bg: '#FEE2E2', text: '1 social post flagged for moderation', path: '/social'     },
]

const statusColors = {
  delivered:  { bg: '#EEF7EE', color: '#1A3C1F' },
  pending:    { bg: '#FEF3C7', color: '#92400E' },
  processing: { bg: '#EFF6FF', color: '#1D4ED8' },
  shipped:    { bg: '#F3E8FF', color: '#6B21A8' },
}

function StatCard({ icon: Icon, label, value, sub, iconBg, iconColor, onClick }) {
  return (
    <div onClick={onClick}
      className={`bg-white rounded-2xl border border-gray-100 p-4 shadow-sm flex flex-col gap-3 ${onClick ? 'cursor-pointer hover:shadow-md transition-shadow' : ''}`}>
      <div className="flex items-start justify-between">
        <div className="p-2 rounded-xl" style={{ backgroundColor: iconBg }}>
          <Icon size={18} style={{ color: iconColor }} />
        </div>
        <div className="flex items-center gap-1 text-xs font-semibold" style={{ color: iconColor }}>
          <ArrowUpRight size={12} /> {sub}
        </div>
      </div>
      <div>
        <p className="text-sm text-gray-500 mb-0.5">{label}</p>
        <p className="text-xl md:text-2xl font-bold text-gray-900 leading-tight">{value}</p>
      </div>
    </div>
  )
}

export default function Dashboard() {
  const navigate = useNavigate()
  const [activeNav, setActiveNav] = useState('/')

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
            <LogOut size={17} style={{ color: 'rgba(255,255,255,0.55)' }} /> Logout
          </button>
        </div>
      </aside>

      {/* Main */}
      <div className="flex-1 flex flex-col h-full overflow-hidden">
        <header className="flex items-center justify-between px-4 md:px-6 h-[62px] border-b border-white/10 flex-shrink-0"
          style={{ backgroundColor: '#1E293B' }}>
          <div>
            <h2 className="text-sm font-semibold text-white">Dashboard</h2>
            <p className="text-[11px] text-white/40">Platform overview</p>
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

          {/* Welcome */}
          <div className="mb-5">
            <h1 className="text-xl font-bold text-gray-900">Good morning, Admin 👋</h1>
            <p className="text-sm text-gray-500 mt-0.5">Here's your platform snapshot for today.</p>
          </div>

          {/* ── Pending Actions ── */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
            {pendingActions.map(a => {
              const Icon = a.icon
              return (
                <button key={a.text} onClick={() => handleNav(a.path)}
                  className="bg-white rounded-2xl border border-gray-100 shadow-sm p-3.5 text-left flex items-start gap-3 hover:shadow-md transition-shadow">
                  <div className="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0" style={{ backgroundColor: a.bg }}>
                    <Icon size={15} style={{ color: a.color }} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-semibold text-gray-700 leading-snug">{a.text}</p>
                    <p className="text-[10px] font-semibold mt-1 flex items-center gap-0.5" style={{ color: a.color }}>
                      Review <ArrowRight size={10} />
                    </p>
                  </div>
                </button>
              )
            })}
          </div>

          {/* ── Stat Cards ── */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4 mb-5">
            <StatCard icon={ShoppingCart} label="Total Orders Today"    value="1,284"  sub="+38 vs yesterday" iconBg="#EEF7EE" iconColor="#1A3C1F" onClick={() => handleNav('/orders')} />
            <StatCard icon={TrendingUp}   label="Platform Revenue"      value="₹1.71L" sub="+12% this week"   iconBg="#EFF6FF" iconColor="#1D4ED8" onClick={() => handleNav('/analytics')} />
            <StatCard icon={Store}        label="Active Vendors"        value="142"    sub="8 pending KYC"    iconBg="#F3E8FF" iconColor="#7C3AED" onClick={() => handleNav('/users')} />
            <StatCard icon={UserCheck}    label="Registered Buyers"     value="3,891"  sub="+24 today"        iconBg="#FEF3C7" iconColor="#92400E" onClick={() => handleNav('/users')} />
          </div>

          {/* ── Charts Row ── */}
          <div className="grid md:grid-cols-3 gap-4 mb-5">

            {/* Revenue Chart */}
            <div className="md:col-span-2 bg-white rounded-2xl border border-gray-100 p-4 shadow-sm">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <p className="text-sm font-bold text-gray-900">Platform Revenue</p>
                  <p className="text-xs text-gray-400">Last 30 days</p>
                </div>
                <button onClick={() => handleNav('/analytics')}
                  className="text-xs font-semibold flex items-center gap-1" style={{ color: '#1A3C1F' }}>
                  Full Analytics <ArrowRight size={12} />
                </button>
              </div>
              <ResponsiveContainer width="100%" height={160}>
                <AreaChart data={revenueData} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="adminGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%"  stopColor="#1A3C1F" stopOpacity={0.15} />
                      <stop offset="95%" stopColor="#1A3C1F" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="date" tick={{ fontSize: 10, fill: '#9CA3AF' }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fontSize: 10, fill: '#9CA3AF' }} axisLine={false} tickLine={false} tickFormatter={v => `₹${(v/1000).toFixed(0)}k`} />
                  <Tooltip formatter={v => [`₹${v.toLocaleString()}`, 'Revenue']} contentStyle={{ fontSize: 12, borderRadius: 8, border: '1px solid #E5E7EB' }} />
                  <Area type="monotone" dataKey="revenue" stroke="#1A3C1F" strokeWidth={2} fill="url(#adminGrad)" dot={false} />
                </AreaChart>
              </ResponsiveContainer>
            </div>

            {/* DAU Snapshot */}
            <div className="bg-white rounded-2xl border border-gray-100 p-4 shadow-sm">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <p className="text-sm font-bold text-gray-900">Active Users</p>
                  <p className="text-xs text-gray-400">This week (DAU)</p>
                </div>
              </div>
              <div className="flex gap-3 mb-3">
                <div className="flex items-center gap-1.5 text-[10px] text-gray-500">
                  <div className="w-2 h-2 rounded-sm" style={{ backgroundColor: '#1A3C1F' }} /> Buyers
                </div>
                <div className="flex items-center gap-1.5 text-[10px] text-gray-500">
                  <div className="w-2 h-2 rounded-sm" style={{ backgroundColor: '#BBF7D0' }} /> Vendors
                </div>
              </div>
              <ResponsiveContainer width="100%" height={120}>
                <BarChart data={dauData} margin={{ top: 0, right: 0, left: -25, bottom: 0 }} barGap={1}>
                  <XAxis dataKey="day" tick={{ fontSize: 9, fill: '#9CA3AF' }} axisLine={false} tickLine={false} />
                  <Tooltip contentStyle={{ fontSize: 11, borderRadius: 8, border: '1px solid #E5E7EB' }} />
                  <Bar dataKey="buyers"  fill="#1A3C1F" radius={[3,3,0,0]} maxBarSize={14} />
                  <Bar dataKey="vendors" fill="#BBF7D0" radius={[3,3,0,0]} maxBarSize={14} />
                </BarChart>
              </ResponsiveContainer>
              <button onClick={() => handleNav('/analytics')}
                className="w-full mt-3 text-xs font-semibold py-2 rounded-xl text-center transition hover:bg-gray-50"
                style={{ color: '#1A3C1F', border: '1px solid #E5E7EB' }}>
                View Full Analytics →
              </button>
            </div>
          </div>

          {/* ── Recent Orders ── */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="flex items-center justify-between px-5 py-3.5 border-b border-gray-50">
              <p className="text-sm font-bold text-gray-900">Recent Orders</p>
              <button onClick={() => handleNav('/orders')}
                className="text-xs font-semibold flex items-center gap-1" style={{ color: '#1A3C1F' }}>
                View All <ArrowRight size={12} />
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <tbody className="divide-y divide-gray-50">
                  {recentOrders.map(o => (
                    <tr key={o.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-5 py-3 font-semibold text-gray-800">{o.id}</td>
                      <td className="px-5 py-3 text-gray-600">{o.buyer}</td>
                      <td className="px-5 py-3 font-semibold text-gray-800">{o.amount}</td>
                      <td className="px-5 py-3">
                        <span className="px-2.5 py-1 rounded-full text-xs font-semibold capitalize"
                          style={statusColors[o.status]}>
                          {o.status}
                        </span>
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