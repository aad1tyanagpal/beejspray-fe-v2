import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  LayoutDashboard, Users2, ShoppingCart, Package,
  CreditCard, Megaphone, RotateCcw, Rss,
  LogOut, Bell, ChevronDown, Plus, Edit2, Trash2,
  Tag, Image, ToggleLeft, ToggleRight, ShieldAlert, FileDown, BarChart3
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

const BANNERS = [
  { id: 1, title: 'Kharif Season Sale',     position: 'Homepage Hero', active: true },
  { id: 2, title: 'New Pesticide Arrivals', position: 'Homepage Strip', active: true },
  { id: 3, title: 'Fertilizer Offers',      position: 'Category Page', active: false },
]

const COUPONS = [
  { id: 'C1', code: 'KISAN20',   discount: '20% off',    minOrder: '₹500',  uses: 142, active: true },
  { id: 'C2', code: 'BEEJ50',    discount: '₹50 flat',   minOrder: '₹300',  uses: 89,  active: true },
  { id: 'C3', code: 'FIRST100',  discount: '₹100 off',   minOrder: '₹800',  uses: 34,  active: false },
]

const TABS = ['banners', 'coupons']

export default function Marketing() {
  const navigate = useNavigate()
  const [activeNav, setActiveNav] = useState('/marketing')
  const [tab, setTab]             = useState('banners')
  const [banners, setBanners]     = useState(BANNERS)
  const [coupons, setCoupons]     = useState(COUPONS)

  const handleNav = (path) => { setActiveNav(path); navigate(path) }
  const toggleBanner = (id) => setBanners(bs => bs.map(b => b.id === id ? { ...b, active: !b.active } : b))
  const toggleCoupon = (id) => setCoupons(cs => cs.map(c => c.id === id ? { ...c, active: !c.active } : c))

  return (
    <div className="flex h-screen font-sans overflow-hidden" style={{ backgroundColor: '#FFFBEB' }}>

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
                style={isActive ? { backgroundColor: 'rgba(167,139,250,0.20)', color: '#fff' } : { color: 'rgba(255,255,255,0.55)' }}>
                <Icon size={17} style={{ color: isActive ? '#fff' : 'rgba(255,255,255,0.55)' }} />
                {label}
              </button>
            )
          })}
        </nav>
        <div className="px-3 py-4 border-t border-white/10">
          <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium" style={{ color: 'rgba(255,255,255,0.55)' }}>
            <LogOut size={17} style={{ color: 'rgba(255,255,255,0.55)' }} /> Logout
          </button>
        </div>
      </aside>

      <div className="flex-1 flex flex-col h-full overflow-hidden">
        <header className="flex items-center justify-between px-4 md:px-6 h-[62px] border-b border-white/10 flex-shrink-0" style={{ backgroundColor: '#1E293B' }}>
          <div>
            <h2 className="text-sm font-semibold text-white">Marketing</h2>
            <p className="text-[11px] text-white/40">Banners & Coupons</p>
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
            <button className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold text-white transition"
              style={{ backgroundColor: '#1A3C1F' }}>
              <Plus size={15} /> Add {tab === 'banners' ? 'Banner' : 'Coupon'}
            </button>
          </div>

          {/* Banners */}
          {tab === 'banners' && (
            <div className="space-y-3">
              {banners.map(b => (
                <div key={b.id} className="bg-white rounded-2xl border border-gray-100 p-4 shadow-sm flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0" style={{ backgroundColor: '#EEF7EE' }}>
                    <Image size={20} style={{ color: '#1A3C1F' }} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-gray-800 text-sm">{b.title}</p>
                    <p className="text-xs text-gray-400 mt-0.5">{b.position}</p>
                  </div>
                  <div className="flex items-center gap-3 flex-shrink-0">
                    <button onClick={() => toggleBanner(b.id)}>
                      {b.active
                        ? <ToggleRight size={26} style={{ color: '#1A3C1F' }} />
                        : <ToggleLeft size={26} className="text-gray-300" />}
                    </button>
                    <button className="p-1.5 rounded-lg hover:bg-gray-100 transition"><Edit2 size={14} className="text-gray-400" /></button>
                    <button className="p-1.5 rounded-lg hover:bg-red-50 transition"><Trash2 size={14} className="text-red-400" /></button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Coupons */}
          {tab === 'coupons' && (
            <div className="space-y-3">
              {coupons.map(c => (
                <div key={c.id} className="bg-white rounded-2xl border border-gray-100 p-4 shadow-sm flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0" style={{ backgroundColor: '#EEF7EE' }}>
                    <Tag size={18} style={{ color: '#1A3C1F' }} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-0.5">
                      <p className="font-bold text-gray-900 text-sm font-mono">{c.code}</p>
                      <span className="px-2 py-0.5 rounded-full text-xs font-semibold" style={{ backgroundColor: '#EEF7EE', color: '#1A3C1F' }}>{c.discount}</span>
                    </div>
                    <p className="text-xs text-gray-400">Min order: {c.minOrder} • Used {c.uses} times</p>
                  </div>
                  <div className="flex items-center gap-3 flex-shrink-0">
                    <button onClick={() => toggleCoupon(c.id)}>
                      {c.active
                        ? <ToggleRight size={26} style={{ color: '#1A3C1F' }} />
                        : <ToggleLeft size={26} className="text-gray-300" />}
                    </button>
                    <button className="p-1.5 rounded-lg hover:bg-gray-100 transition"><Edit2 size={14} className="text-gray-400" /></button>
                    <button className="p-1.5 rounded-lg hover:bg-red-50 transition"><Trash2 size={14} className="text-red-400" /></button>
                  </div>
                </div>
              ))}
            </div>
          )}

        </main>
      </div>

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