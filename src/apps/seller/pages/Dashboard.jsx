import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import {
  LayoutDashboard,
  ShoppingCart,
  Package,
  CreditCard,
  BarChart2,
  Settings,
  LogOut,
  Search,
  Bell,
  ChevronDown,
  ArrowUpRight
} from 'lucide-react';

// ── Mock chart data ────────────────────────────────────────────
const chartData30 = [
  { date: '01 May', sales: 4200 },
  { date: '05 May', sales: 5800 },
  { date: '10 May', sales: 5200 },
  { date: '15 May', sales: 8900 },
  { date: '20 May', sales: 7600 },
  { date: '25 May', sales: 7100 },
  { date: '30 May', sales: 7400 },
];

const chartData7 = [
  { date: 'Mon', sales: 3100 },
  { date: 'Tue', sales: 4800 },
  { date: 'Wed', sales: 4200 },
  { date: 'Thu', sales: 6100 },
  { date: 'Fri', sales: 5500 },
  { date: 'Sat', sales: 7200 },
  { date: 'Sun', sales: 6800 },
];

const recentActivities = [
  { id: '#ORD-8291', status: 'delivered',  buyer: 'Ramesh Kumar', time: '2h ago' },
  { id: '#ORD-8290', status: 'processing', buyer: 'Suresh Patel',  time: '4h ago' },
  { id: '#ORD-8289', status: 'shipped',    buyer: 'Anil Singh',    time: '5h ago' },
  { id: '#ORD-8288', status: 'delivered',  buyer: 'Mahesh Rao',    time: '1d ago' },
];

// ── Nav items ─────────────────────────────────────────────────
const navItems = [
  { label: 'Dashboard', icon: LayoutDashboard, path: '/' },
  { label: 'Orders',    icon: ShoppingCart,    path: '/orders' },
  { label: 'Inventory', icon: Package,         path: '/inventory' },
  { label: 'Payments',  icon: CreditCard,      path: '/payments' },
  { label: 'Reports',   icon: BarChart2,       path: '/reports' },
  { label: 'Settings',  icon: Settings,        path: '/settings' },
];

// ── Stat Card ─────────────────────────────────────────────────
function StatCard({ icon: Icon, label, value, sub }) {
  return (
    <div className="bg-white rounded-2xl border border-white/10 p-4 md:p-5 flex flex-col gap-3 shadow-sm">
      <div className="flex items-start justify-between">
        <div className="p-2 rounded-xl" style={{ backgroundColor: '#EEF7EE' }}>
          <Icon size={18} style={{ color: '#1A3C1F' }} />
        </div>
        <span className="text-xs font-semibold px-2 py-0.5 rounded-full" style={{ color: '#1A3C1F', backgroundColor: '#EEF7EE' }}>
          Today
        </span>
      </div>
      <div>
        <p className="text-sm text-gray-500 mb-1">{label}</p>
        <p className="text-xl md:text-2xl font-bold text-gray-900 leading-tight">{value}</p>
      </div>
      <div className="flex items-center gap-1 text-xs font-medium" style={{ color: '#1A3C1F' }}>
        <ArrowUpRight size={12} />
        {sub}
      </div>
    </div>
  );
}

// ── Main Dashboard ─────────────────────────────────────────────
export default function Dashboard() {
  const navigate = useNavigate();
  const [activeNav, setActiveNav]   = useState('/');
  const [chartRange, setChartRange] = useState('30');

  const chartData = chartRange === '7' ? chartData7 : chartData30;

  const handleNav = (path) => {
    setActiveNav(path);
    navigate(path);
  };

  return (
    <div className="flex h-screen font-sans overflow-hidden" style={{ backgroundColor: '#FFFBEB' }}>

      {/* ══════════════════════════════════════════
          DESKTOP SIDEBAR (hidden on mobile)
      ══════════════════════════════════════════ */}
      <aside className="hidden md:flex w-[220px] flex-shrink-0 flex-col h-full" style={{ backgroundColor: '#1E293B' }}>
        {/* Logo */}
        <div className="px-6 py-5 border-b border-white/10">
          <span className="text-xl font-extrabold tracking-tight text-white">Beej Spray</span>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-3 py-4 space-y-0.5 overflow-y-auto">
          {navItems.map(({ label, icon: Icon, path }) => {
            const isActive = activeNav === path;
            return (
              <button
                key={path}
                onClick={() => handleNav(path)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all
                  ${isActive
                    ? 'text-white'
                    : 'hover:bg-white/8'
                  }`}
style={isActive ? { backgroundColor: 'rgba(167,139,250,0.20)', color: '#fff' } : { color: 'rgba(255,255,255,0.55)' }}
              >
                <Icon size={17} style={{ color: isActive ? '#A78BFA' : 'rgba(255,255,255,0.40)' }} />
                {label}
              </button>
            );
          })}
        </nav>

        {/* Logout */}
        <div className="px-3 py-4 border-t border-white/10">
          <button
            onClick={() => navigate('/login')}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all hover:bg-white/8"
style={{ color: 'rgba(255,255,255,0.45)' }}
          >
            <LogOut size={17} style={{ color: 'rgba(255,255,255,0.40)' }} />
            Logout
          </button>
        </div>
      </aside>


      {/* ══════════════════════════════════════════
          MAIN CONTENT
      ══════════════════════════════════════════ */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">

        {/* ── Top Header ── */}
       <header className="h-[62px] flex items-center px-6 gap-4 flex-shrink-0" style={{ backgroundColor: '#1E293B' }}>

          {/* Logo — always visible */}
          <span className="text-base font-extrabold text-white tracking-tight">
            Beej Spray
          </span>

          {/* Search — desktop only */}
          <div className="hidden md:flex items-center gap-2 rounded-xl px-3 py-2 flex-1 max-w-[480px]" style={{ backgroundColor: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.12)' }}>
            <Search size={14} className="flex-shrink-0" style={{ color: 'rgba(255,255,255,0.45)' }} />
            <input
              placeholder="Search everything..."
              className="bg-transparent text-sm outline-none w-full"
              style={{ color: 'rgba(255,255,255,0.85)' }}
            />
          </div>

          <div className="flex items-center gap-2 ml-auto">
            {/* Search icon — mobile only */}
            <button className="md:hidden p-2 rounded-xl transition" onMouseEnter={e => e.currentTarget.style.backgroundColor='rgba(255,255,255,0.08)'} onMouseLeave={e => e.currentTarget.style.backgroundColor='transparent'}>
              <Search size={18} style={{ color: 'rgba(255,255,255,0.75)' }} />
            </button>

            {/* Bell */}
            <button className="relative p-2 rounded-xl hover:bg-purple-700 transition">
              <Bell size={18} style={{ color: 'rgba(255,255,255,0.70)' }} />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-400 rounded-full border-2 border-purple-800" />
            </button>

            {/* Avatar */}
            <button className="flex items-center gap-2 px-2 py-1.5 rounded-xl transition" style={{ hover: '' }} onMouseEnter={e => e.currentTarget.style.backgroundColor='rgba(255,255,255,0.08)'} onMouseLeave={e => e.currentTarget.style.backgroundColor='transparent'}>
              <div className="w-8 h-8 rounded-full bg-green-600 flex items-center justify-center text-white text-xs font-bold">
                KA
              </div>
              <ChevronDown size={14} style={{ color: 'rgba(255,255,255,0.55)' }} />
            </button>
          </div>
        </header>

        {/* ── Page Body ── */}
        <main className="flex-1 overflow-y-auto px-6 py-6" style={{ backgroundColor: '#FFFBEB' }}>

          {/* Welcome */}
          <div className="mb-5 md:mb-6">
            <h1 className="text-xl md:text-2xl font-bold text-gray-900">Welcome back, Kissan Agro!</h1>
            <p className="text-sm text-gray-500 mt-1">Here's what's happening with your store today.</p>
          </div>

          {/* Stats Grid — 2 cols mobile, 4 cols desktop */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 mb-5 md:mb-6">
            <StatCard icon={CreditCard}      label="Earnings"       value="₹1,24,500"         sub="+12.5% from last month" />
            <StatCard icon={ShoppingCart}    label="Orders Today"   value="42"                 sub="8 pending fulfillment" />
            <StatCard icon={Package}         label="Top Product"    value="Hybrid Tomato Seeds" sub="124 units sold" />
            <StatCard icon={LayoutDashboard} label="Active Listings" value="156"               sub="4 out of stock" />
          </div>

          {/* Chart + Activities — stacked on mobile, side-by-side on desktop */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

            {/* Sales Trend Chart */}
            <div className="md:col-span-2 bg-white rounded-2xl border border-white/10 shadow-sm p-4 md:p-5">
              <div className="flex items-center justify-between mb-4 md:mb-5">
                <h2 className="font-semibold text-gray-900 text-sm md:text-base">Sales Trend</h2>
                <div className="flex items-center gap-1 bg-gray-100 rounded-xl p-1">
                  <button
                    onClick={() => setChartRange('7')}
                    className={`text-xs font-semibold px-2.5 md:px-3 py-1.5 rounded-lg transition-all
                      ${chartRange === '7' ? 'text-white shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
style={chartRange === '7' ? { backgroundColor: '#1A3C1F' } : {}}
                  >
                    7 Days
                  </button>
                  <button
                    onClick={() => setChartRange('30')}
                    className={`text-xs font-semibold px-2.5 md:px-3 py-1.5 rounded-lg transition-all
                      ${chartRange === '30' ? 'text-white shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
style={chartRange === '30' ? { backgroundColor: '#1A3C1F' } : {}}
                  >
                    30 Days
                  </button>
                </div>
              </div>

              <ResponsiveContainer width="100%" height={220}>
                <AreaChart data={chartData} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="salesGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#1A3C1F" stopOpacity={0.15} />
              <stop offset="95%" stopColor="#1A3C1F" stopOpacity={0} />   
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="date" tick={{ fontSize: 11, fill: '#9ca3af' }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fontSize: 11, fill: '#9ca3af' }} axisLine={false} tickLine={false} tickFormatter={(v) => v.toLocaleString()} />
                  <Tooltip
                    contentStyle={{ background: '#fff', border: '1px solid #e5e7eb', borderRadius: 12, fontSize: 12, boxShadow: '0 4px 12px rgba(0,0,0,0.08)' }}
                    formatter={(val) => [`₹${val.toLocaleString()}`, 'Sales']}
                  />
                  <Area type="monotone" dataKey="sales" stroke="#1A3C1F" strokeWidth={2.5} fill="url(#salesGradient)" dot={false} activeDot={{ r: 5, fill: '#1A3C1F', strokeWidth: 0 }} />
                </AreaChart>
              </ResponsiveContainer>
            </div>

            {/* Recent Activities */}
            <div className="bg-white rounded-2xl border border-white/10 shadow-sm p-4 md:p-5">
              <h2 className="font-semibold text-gray-900 mb-4 text-sm md:text-base">Recent Activities</h2>
              <div className="space-y-4">
                {recentActivities.map((act) => (
                  <div key={act.id} className="flex items-start gap-3">
                    <span className="mt-1.5 w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: '#1A3C1F' }} />
                    <div>
                      <p className="text-sm font-medium text-gray-800">Order {act.id} {act.status}</p>
                      <p className="text-xs text-gray-400 mt-0.5">Buyer: {act.buyer} • {act.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </main>
      </div>

      {/* ══════════════════════════════════════════
          MOBILE BOTTOM NAVBAR (hidden on desktop)
      ══════════════════════════════════════════ */}
      <nav className="fixed bottom-0 inset-x-0 z-30 md:hidden border-t border-white/10 flex" style={{ backgroundColor: '#1E293B' }}>
        {navItems.slice(0, 5).map(({ label, icon: Icon, path }) => {
          const isActive = activeNav === path;
          return (
            <button
              key={path}
              onClick={() => handleNav(path)}
              style={{ width: '20%' }}
              className={`flex flex-col items-center justify-center py-2 gap-0.5 transition-all
                ${isActive ? 'text-white' : 'text-white/50'}`}
            >
              <div className={`p-1.5 rounded-xl transition-all ${isActive ? 'bg-white/20' : ''}`}>
                <Icon size={20} />
              </div>
              <span className="text-[10px] font-medium leading-none">{label}</span>
            </button>
          );
        })}
      </nav>

    </div>
  );
}