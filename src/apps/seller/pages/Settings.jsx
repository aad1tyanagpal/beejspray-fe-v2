import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  LayoutDashboard, ShoppingCart, Package, CreditCard,
  BarChart2, Settings, LogOut, Bell, ChevronDown,
  Lock, BellRing, Store, Shield, ChevronRight, Check
} from 'lucide-react'

const navItems = [
  { label: 'Dashboard', icon: LayoutDashboard, path: '/dashboard' },
  { label: 'Orders',    icon: ShoppingCart,    path: '/orders' },
  { label: 'Inventory', icon: Package,         path: '/inventory' },
  { label: 'Payments',  icon: CreditCard,      path: '/payments' },
  { label: 'Reports',   icon: BarChart2,       path: '/reports' },
  { label: 'Settings',  icon: Settings,        path: '/settings' },
]

function Toggle({ on, onToggle }) {
  return (
    <button onClick={onToggle}
      className="w-11 h-6 rounded-full transition-all flex items-center px-0.5 flex-shrink-0"
      style={{ backgroundColor: on ? '#1A3C1F' : '#D1D5DB' }}>
      <div className="w-5 h-5 rounded-full bg-white shadow transition-all"
        style={{ transform: on ? 'translateX(20px)' : 'translateX(0)' }} />
    </button>
  )
}

function Section({ title, icon: Icon, children }) {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden mb-4">
      <div className="flex items-center gap-2.5 px-5 py-4 border-b border-gray-50">
        <div className="w-7 h-7 rounded-lg flex items-center justify-center"
          style={{ backgroundColor: '#EEF7EE' }}>
          <Icon size={14} style={{ color: '#1A3C1F' }} />
        </div>
        <p className="text-sm font-bold text-gray-900">{title}</p>
      </div>
      <div className="divide-y divide-gray-50">{children}</div>
    </div>
  )
}

function Row({ label, sub, right }) {
  return (
    <div className="flex items-center justify-between px-5 py-3.5 gap-4">
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-gray-800">{label}</p>
        {sub && <p className="text-xs text-gray-400 mt-0.5">{sub}</p>}
      </div>
      <div className="flex-shrink-0">{right}</div>
    </div>
  )
}

export default function SettingsPage() {
  const navigate = useNavigate()
  const [activeNav, setActiveNav] = useState('/settings')

  const [notifs, setNotifs] = useState({
    newOrder: true, orderUpdates: true, settlement: true,
    lowStock: true, promotions: false,
  })
  const [shop, setShop] = useState({
    name: 'Ramesh Agri Store', phone: '9876543210',
    city: 'Anupgarh', state: 'Rajasthan',
  })
  const [saved, setSaved] = useState(false)

  const handleNav  = (path) => { setActiveNav(path); navigate(path) }
  const toggleN    = (k) => setNotifs(p => ({ ...p, [k]: !p[k] }))
  const handleSave = () => { setSaved(true); setTimeout(() => setSaved(false), 2000) }

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
            <h1 className="text-base font-bold text-white">Settings</h1>
            <p className="text-xs" style={{ color: 'rgba(255,255,255,0.45)' }}>Account & preferences</p>
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

          {/* Shop Info */}
          <Section title="Shop Information" icon={Store}>
            {[
              { label: 'Business Name', key: 'name' },
              { label: 'Phone Number',  key: 'phone' },
              { label: 'City',          key: 'city' },
              { label: 'State',         key: 'state' },
            ].map(({ label, key }) => (
              <Row key={key} label={label}
                right={
                  <input value={shop[key]} onChange={e => setShop(p => ({ ...p, [key]: e.target.value }))}
                    className="text-sm text-right border-b border-gray-200 outline-none focus:border-green-700 bg-transparent py-0.5 w-40 text-gray-700" />
                }
              />
            ))}
            <div className="px-5 py-3">
              <button onClick={handleSave}
                className="flex items-center gap-2 px-5 py-2 rounded-xl text-sm font-semibold text-white transition"
                style={{ backgroundColor: '#1A3C1F' }}>
                {saved ? <><Check size={14} /> Saved!</> : 'Save Changes'}
              </button>
            </div>
          </Section>

          {/* Notifications */}
          <Section title="Notifications" icon={BellRing}>
            {[
              { key: 'newOrder',      label: 'New Orders',         sub: 'Alert when a new order arrives' },
              { key: 'orderUpdates',  label: 'Order Status Updates',sub: 'Shipped, delivered, cancelled' },
              { key: 'settlement',    label: 'Payment Settlements', sub: 'When money is credited' },
              { key: 'lowStock',      label: 'Low Stock Alerts',    sub: 'When stock drops below 5 units' },
              { key: 'promotions',    label: 'Promotions & Offers', sub: 'BeejSpray campaigns & news' },
            ].map(({ key, label, sub }) => (
              <Row key={key} label={label} sub={sub}
                right={<Toggle on={notifs[key]} onToggle={() => toggleN(key)} />}
              />
            ))}
          </Section>

          {/* Security */}
          <Section title="Security" icon={Lock}>
            <Row label="Change Password" sub="Update your login password"
              right={
                <button onClick={() => navigate('/login')} className="flex items-center gap-1 text-xs font-semibold" style={{ color: '#1A3C1F' }}>
                  Update <ChevronRight size={13} />
                </button>
              }
            />
            <Row label="Active Sessions" sub="Manage devices logged in"
              right={<span className="text-xs font-semibold text-gray-400">1 device</span>}
            />
          </Section>

          {/* Account */}
          <Section title="Account" icon={Shield}>
            <Row label="KYC Status" sub="Your verification status"
              right={
                <span className="px-2.5 py-1 rounded-full text-xs font-semibold"
                  style={{ backgroundColor: '#EEF7EE', color: '#1A3C1F' }}>✓ Verified</span>
              }
            />
            <Row label="Logout"
              right={
                <button onClick={() => navigate('/login')}
                  className="flex items-center gap-1.5 text-xs font-semibold text-red-500">
                  <LogOut size={13} /> Sign out
                </button>
              }
            />
          </Section>

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