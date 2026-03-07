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
  TrendingUp,
  ArrowUpRight,
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
  { id: '#ORD-8291', status: 'delivered',   buyer: 'Ramesh Kumar', time: '2h ago' },
  { id: '#ORD-8290', status: 'processing',  buyer: 'Suresh Patel',  time: '4h ago' },
  { id: '#ORD-8289', status: 'shipped',     buyer: 'Anil Singh',    time: '5h ago' },
  { id: '#ORD-8288', status: 'delivered',   buyer: 'Mahesh Rao',    time: '1d ago' },
];

// ── Sidebar nav items ──────────────────────────────────────────
const navItems = [
  { label: 'Dashboard',  icon: LayoutDashboard, path: '/' },
  { label: 'Orders',     icon: ShoppingCart,    path: '/orders' },
  { label: 'Inventory',  icon: Package,         path: '/inventory' },
  { label: 'Payments',   icon: CreditCard,      path: '/payments' },
  { label: 'Reports',    icon: BarChart2,       path: '/reports' },
  { label: 'Settings',   icon: Settings,        path: '/settings' },
];

// ── Stat Card ─────────────────────────────────────────────────
function StatCard({ icon: Icon, label, value, sub }) {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-5 flex flex-col gap-3 shadow-sm">
      <div className="flex items-start justify-between">
        <div className="p-2 rounded-xl bg-green-50">
          <Icon size={18} className="text-green-600" />
        </div>
        <span className="text-xs font-semibold text-green-600 bg-green-50 px-2 py-0.5 rounded-full">
          Today
        </span>
      </div>
      <div>
        <p className="text-sm text-gray-500 mb-1">{label}</p>
        <p className="text-2xl font-bold text-gray-900 leading-tight">{value}</p>
      </div>
      <div className="flex items-center gap-1 text-xs text-green-600 font-medium">
        <ArrowUpRight size={12} />
        {sub}
      </div>
    </div>
  );
}

// ── Main Dashboard Component ───────────────────────────────────
export default function Dashboard() {
  const navigate = useNavigate();
  const [activeNav, setActiveNav] = useState('/');
  const [chartRange, setChartRange] = useState('30');

  const chartData = chartRange === '7' ? chartData7 : chartData30;

  return (
    <div className="flex h-screen bg-gray-50 font-sans overflow-hidden">

      {/* ── LEFT SIDEBAR ─────────────────────────────────────── */}
      <aside className="w-[220px] flex-shrink-0 bg-white border-r border-gray-100 flex flex-col h-full">
        {/* Logo */}
        <div className="px-6 py-5 border-b border-gray-100">
          <span className="text-xl font-extrabold text-green-600 tracking-tight">Beej Spray</span>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-3 py-4 space-y-0.5 overflow-y-auto">
          {navItems.map(({ label, icon: Icon, path }) => {
            const isActive = activeNav === path;
            return (
              <button
                key={path}
                onClick={() => { setActiveNav(path); navigate(path); }}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all
                  ${isActive
                    ? 'bg-green-50 text-green-700'
                    : 'text-gray-500 hover:bg-gray-50 hover:text-gray-800'
                  }`}
              >
                <Icon size={17} className={isActive ? 'text-green-600' : 'text-gray-400'} />
                {label}
              </button>
            );
          })}
        </nav>

        {/* Logout */}
        <div className="px-3 py-4 border-t border-gray-100">
          <button
            onClick={() => navigate('/login')}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-gray-500 hover:bg-red-50 hover:text-red-600 transition-all"
          >
            <LogOut size={17} className="text-gray-400" />
            Logout
          </button>
        </div>
      </aside>

      {/* ── MAIN CONTENT ─────────────────────────────────────── */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">

        {/* Top Header */}
        <header className="h-[62px] bg-white border-b border-gray-100 flex items-center px-6 gap-4 flex-shrink-0">
          {/* Search */}
          <div className="flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 flex-1 max-w-[480px]">
            <Search size={14} className="text-gray-400 flex-shrink-0" />
            <input
              placeholder="Search everything..."
              className="bg-transparent text-sm text-gray-700 outline-none w-full placeholder:text-gray-400"
            />
          </div>

          <div className="flex items-center gap-3 ml-auto">
            {/* Bell */}
            <button className="relative p-2 rounded-xl hover:bg-gray-50 transition">
              <Bell size={18} className="text-gray-500" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white" />
            </button>

            {/* Avatar */}
            <button className="flex items-center gap-2 hover:bg-gray-50 px-2 py-1.5 rounded-xl transition">
              <div className="w-8 h-8 rounded-full bg-green-600 flex items-center justify-center text-white text-xs font-bold">
                KA
              </div>
              <ChevronDown size={14} className="text-gray-400" />
            </button>
          </div>
        </header>

        {/* Page Body — scrollable */}
        <main className="flex-1 overflow-y-auto px-6 py-6">

          {/* Welcome */}
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-gray-900">Welcome back, Kissan Agro!</h1>
            <p className="text-sm text-gray-500 mt-1">Here's what's happening with your store today.</p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-4 gap-4 mb-6">
            <StatCard
              icon={CreditCard}
              label="Earnings"
              value="₹1,24,500"
              sub="+12.5% from last month"
            />
            <StatCard
              icon={ShoppingCart}
              label="Orders Today"
              value="42"
              sub="8 pending fulfillment"
            />
            <StatCard
              icon={Package}
              label="Top Product"
              value="Hybrid Tomato Seeds"
              sub="124 units sold"
            />
            <StatCard
              icon={LayoutDashboard}
              label="Active Listings"
              value="156"
              sub="4 out of stock"
            />
          </div>

          {/* Bottom Row: Chart + Activities */}
          <div className="grid grid-cols-3 gap-4">

            {/* Sales Trend Chart — col span 2 */}
            <div className="col-span-2 bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
              <div className="flex items-center justify-between mb-5">
                <h2 className="font-semibold text-gray-900">Sales Trend</h2>
                <div className="flex items-center gap-1 bg-gray-100 rounded-xl p-1">
                  <button
                    onClick={() => setChartRange('7')}
                    className={`text-xs font-semibold px-3 py-1.5 rounded-lg transition-all
                      ${chartRange === '7'
                        ? 'bg-green-600 text-white shadow-sm'
                        : 'text-gray-500 hover:text-gray-700'
                      }`}
                  >
                    7 Days
                  </button>
                  <button
                    onClick={() => setChartRange('30')}
                    className={`text-xs font-semibold px-3 py-1.5 rounded-lg transition-all
                      ${chartRange === '30'
                        ? 'bg-green-600 text-white shadow-sm'
                        : 'text-gray-500 hover:text-gray-700'
                      }`}
                  >
                    30 Days
                  </button>
                </div>
              </div>

              <ResponsiveContainer width="100%" height={260}>
                <AreaChart data={chartData} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="salesGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#16a34a" stopOpacity={0.15} />
                      <stop offset="95%" stopColor="#16a34a" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <XAxis
                    dataKey="date"
                    tick={{ fontSize: 11, fill: '#9ca3af' }}
                    axisLine={false}
                    tickLine={false}
                  />
                  <YAxis
                    tick={{ fontSize: 11, fill: '#9ca3af' }}
                    axisLine={false}
                    tickLine={false}
                    tickFormatter={(v) => v.toLocaleString()}
                  />
                  <Tooltip
                    contentStyle={{
                      background: '#fff',
                      border: '1px solid #e5e7eb',
                      borderRadius: 12,
                      fontSize: 12,
                      boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
                    }}
                    formatter={(val) => [`₹${val.toLocaleString()}`, 'Sales']}
                  />
                  <Area
                    type="monotone"
                    dataKey="sales"
                    stroke="#16a34a"
                    strokeWidth={2.5}
                    fill="url(#salesGradient)"
                    dot={false}
                    activeDot={{ r: 5, fill: '#16a34a', strokeWidth: 0 }}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>

            {/* Recent Activities */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
              <h2 className="font-semibold text-gray-900 mb-4">Recent Activities</h2>
              <div className="space-y-4">
                {recentActivities.map((act) => (
                  <div key={act.id} className="flex items-start gap-3">
                    <span className="mt-1.5 w-2 h-2 rounded-full bg-green-500 flex-shrink-0" />
                    <div>
                      <p className="text-sm font-medium text-gray-800">
                        Order {act.id} {act.status}
                      </p>
                      <p className="text-xs text-gray-400 mt-0.5">
                        Buyer: {act.buyer} • {act.time}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </main>
      </div>
    </div>
  );
}