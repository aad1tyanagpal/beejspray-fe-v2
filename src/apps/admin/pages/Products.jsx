import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  LayoutDashboard, Users2, ShoppingCart, Package,
  CreditCard, Megaphone, RotateCcw, Rss,
  LogOut, Bell, ChevronDown, Search, Plus, Edit2, Trash2, ShieldAlert,FileDown, BarChart3
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

const CATEGORIES = [
  { id: 'C1', name: 'Seeds',       sub: 'Vegetable Seeds, Fruit Seeds', commission: '8%',  products: 142 },
  { id: 'C2', name: 'Pesticides',  sub: 'Insecticides, Fungicides',     commission: '10%', products: 89 },
  { id: 'C3', name: 'Fertilizers', sub: 'Urea, DAP, Potash',            commission: '7%',  products: 56 },
  { id: 'C4', name: 'Equipment',   sub: 'Sprayers, Tools',              commission: '12%', products: 34 },
]

const BRANDS = [
  { id: 'B1', name: 'Syngenta',  products: 38 },
  { id: 'B2', name: 'Bayer',     products: 51 },
  { id: 'B3', name: 'Mahyco',    products: 29 },
  { id: 'B4', name: 'UPL',       products: 44 },
  { id: 'B5', name: 'Coromandel',products: 22 },
]

const MASTER_PRODUCTS = [
  { id: 'P001', name: 'Syngenta Ampligo 150ml',   brand: 'Syngenta',  category: 'Pesticides',  sku: 'SYN-AMP-150' },
  { id: 'P002', name: 'Bayer Confidor 100ml',      brand: 'Bayer',     category: 'Pesticides',  sku: 'BAY-CON-100' },
  { id: 'P003', name: 'Mahyco Tomato Seeds 10g',   brand: 'Mahyco',    category: 'Seeds',       sku: 'MAH-TOM-10G' },
  { id: 'P004', name: 'Urea 50kg Bag',             brand: '—',         category: 'Fertilizers', sku: 'URE-50KG' },
  { id: 'P005', name: 'DAP Fertilizer 50kg',       brand: 'Coromandel',category: 'Fertilizers', sku: 'DAP-50KG' },
]

const TABS = ['categories', 'brands', 'master products']

export default function Products() {
  const navigate = useNavigate()
  const [activeNav, setActiveNav] = useState('/products')
  const [tab, setTab]             = useState('categories')
  const [search, setSearch]       = useState('')

  const handleNav = (path) => { setActiveNav(path); navigate(path) }

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
            <h2 className="text-sm font-semibold text-white">Master Data</h2>
            <p className="text-[11px] text-white/40">Categories, Brands & Products</p>
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
            <button className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold text-white transition"
              style={{ backgroundColor: '#1A3C1F' }}>
              <Plus size={15} /> Add {tab === 'master products' ? 'Product' : tab.slice(0,-1).replace(/\b\w/g,c=>c.toUpperCase())}
            </button>
          </div>

          {/* Categories */}
          {tab === 'categories' && (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {CATEGORIES.map(c => (
                <div key={c.id} className="bg-white rounded-2xl border border-gray-100 p-4 shadow-sm">
                  <div className="flex items-start justify-between mb-3">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: '#EEF7EE' }}>
                      <Package size={18} style={{ color: '#1A3C1F' }} />
                    </div>
                    <div className="flex gap-1.5">
                      <button className="p-1.5 rounded-lg hover:bg-gray-100 transition"><Edit2 size={14} className="text-gray-400" /></button>
                      <button className="p-1.5 rounded-lg hover:bg-red-50 transition"><Trash2 size={14} className="text-red-400" /></button>
                    </div>
                  </div>
                  <p className="font-semibold text-gray-900 text-sm">{c.name}</p>
                  <p className="text-xs text-gray-400 mt-0.5 mb-3">{c.sub}</p>
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-semibold text-gray-600">{c.products} products</span>
                    <span className="px-2 py-0.5 rounded-full font-semibold" style={{ backgroundColor: '#EEF7EE', color: '#1A3C1F' }}>
                      {c.commission} commission
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Brands */}
          {tab === 'brands' && (
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {BRANDS.map(b => (
                <div key={b.id} className="bg-white rounded-2xl border border-gray-100 p-4 shadow-sm flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 text-sm font-bold text-white"
                    style={{ backgroundColor: '#1A3C1F' }}>
                    {b.name[0]}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-gray-900 text-sm truncate">{b.name}</p>
                    <p className="text-xs text-gray-400">{b.products} products</p>
                  </div>
                  <div className="flex gap-1">
                    <button className="p-1.5 rounded-lg hover:bg-gray-100 transition"><Edit2 size={13} className="text-gray-400" /></button>
                    <button className="p-1.5 rounded-lg hover:bg-red-50 transition"><Trash2 size={13} className="text-red-400" /></button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Master Products */}
          {tab === 'master products' && (
            <>
              <div className="relative mb-4 max-w-xs">
                <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input value={search} onChange={e => setSearch(e.target.value)}
                  placeholder="Search products..."
                  className="pl-8 pr-4 py-2 text-sm border border-gray-200 rounded-xl bg-white outline-none focus:border-green-700 w-full" />
              </div>
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-gray-100">
                      {['Product', 'Brand', 'Category', 'SKU', ''].map(h => (
                        <th key={h} className="text-left px-4 py-3 text-xs font-semibold text-gray-400 uppercase tracking-wider">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {MASTER_PRODUCTS.filter(p => p.name.toLowerCase().includes(search.toLowerCase())).map(p => (
                      <tr key={p.id} className="hover:bg-gray-50 transition-colors">
                        <td className="px-4 py-3 font-medium text-gray-800">{p.name}</td>
                        <td className="px-4 py-3 text-gray-500">{p.brand}</td>
                        <td className="px-4 py-3">
                          <span className="px-2.5 py-1 rounded-full text-xs font-semibold" style={{ backgroundColor: '#EEF7EE', color: '#1A3C1F' }}>{p.category}</span>
                        </td>
                        <td className="px-4 py-3 text-xs text-gray-400 font-mono">{p.sku}</td>
                        <td className="px-4 py-3">
                          <div className="flex gap-1.5 justify-end">
                            <button className="p-1.5 rounded-lg hover:bg-gray-100 transition"><Edit2 size={13} className="text-gray-400" /></button>
                            <button className="p-1.5 rounded-lg hover:bg-red-50 transition"><Trash2 size={13} className="text-red-400" /></button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </>
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