import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  LayoutDashboard, ShoppingCart, Package, CreditCard,
  BarChart2, Settings, LogOut, Bell, ChevronDown,
  Search, Plus, Edit2, Trash2, AlertTriangle, X, Check
} from 'lucide-react'

const navItems = [
  { label: 'Dashboard', icon: LayoutDashboard, path: '/dashboard' },
  { label: 'Orders',    icon: ShoppingCart,    path: '/orders' },
  { label: 'Inventory', icon: Package,         path: '/inventory' },
  { label: 'Payments',  icon: CreditCard,      path: '/payments' },
  { label: 'Reports',   icon: BarChart2,       path: '/reports' },
  { label: 'Settings',  icon: Settings,        path: '/settings' },
]

const PRODUCTS = [
  { id: 1, name: 'Syngenta Ampligo 150ml',      category: 'Pesticide',   price: 420,  stock: 48,  sku: 'SYN-AMP-150',  lowStock: false },
  { id: 2, name: 'Bayer Confidor 100ml',         category: 'Pesticide',   price: 320,  stock: 6,   sku: 'BAY-CON-100',  lowStock: true  },
  { id: 3, name: 'Mahyco Tomato Seeds 10g',      category: 'Seeds',       price: 250,  stock: 120, sku: 'MAH-TOM-10G',  lowStock: false },
  { id: 4, name: 'Urea 50kg Bag',                category: 'Fertilizer',  price: 700,  stock: 30,  sku: 'URE-50KG',     lowStock: false },
  { id: 5, name: 'DAP Fertilizer 50kg',          category: 'Fertilizer',  price: 1400, stock: 4,   sku: 'DAP-50KG',     lowStock: true  },
  { id: 6, name: 'Pesticide Spray Pump 16L',     category: 'Equipment',   price: 1850, stock: 12,  sku: 'PSP-16L',      lowStock: false },
  { id: 7, name: 'Hybrid Wheat Seeds 5kg',       category: 'Seeds',       price: 350,  stock: 0,   sku: 'HWS-5KG',      lowStock: true  },
  { id: 8, name: 'Neem Oil Spray 500ml',         category: 'Pesticide',   price: 180,  stock: 75,  sku: 'NOS-500ML',    lowStock: false },
]

const CATS = ['All', 'Seeds', 'Pesticide', 'Fertilizer', 'Equipment']

function EditModal({ product, onClose, onSave }) {
  const [price, setPrice] = useState(product.price)
  const [stock, setStock] = useState(product.stock)
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ backgroundColor: 'rgba(0,0,0,0.45)' }} onClick={onClose}>
      <div className="w-full max-w-sm rounded-2xl bg-white shadow-2xl overflow-hidden"
        onClick={e => e.stopPropagation()}>
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
          <p className="font-bold text-gray-900">Edit Product</p>
          <button onClick={onClose}><X size={16} className="text-gray-400" /></button>
        </div>
        <div className="px-5 py-4 space-y-4">
          <p className="text-sm font-medium text-gray-700">{product.name}</p>
          <div>
            <label className="text-xs font-semibold text-gray-500 mb-1.5 block">Price (₹)</label>
            <input type="number" value={price} onChange={e => setPrice(+e.target.value)}
              className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm outline-none focus:border-green-700" />
          </div>
          <div>
            <label className="text-xs font-semibold text-gray-500 mb-1.5 block">Stock (units)</label>
            <input type="number" value={stock} onChange={e => setStock(+e.target.value)}
              className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm outline-none focus:border-green-700" />
          </div>
        </div>
        <div className="flex gap-3 px-5 pb-5">
          <button onClick={onClose}
            className="flex-1 py-2.5 rounded-xl border border-gray-200 text-sm font-semibold text-gray-600 hover:bg-gray-50 transition">
            Cancel
          </button>
          <button onClick={() => onSave(product.id, price, stock)}
            className="flex-1 py-2.5 rounded-xl text-sm font-semibold text-white transition"
            style={{ backgroundColor: '#1A3C1F' }}>
            Save Changes
          </button>
        </div>
      </div>
    </div>
  )
}

export default function Inventory() {
  const navigate = useNavigate()
  const [activeNav, setActiveNav] = useState('/inventory')
  const [cat, setCat]             = useState('All')
  const [search, setSearch]       = useState('')
  const [products, setProducts]   = useState(PRODUCTS)
  const [editing, setEditing]     = useState(null)

  const handleNav = (path) => { setActiveNav(path); navigate(path) }

  const filtered = products.filter(p =>
    (cat === 'All' || p.category === cat) &&
    p.name.toLowerCase().includes(search.toLowerCase())
  )

  const handleSave = (id, price, stock) => {
    setProducts(prev => prev.map(p => p.id === id ? { ...p, price, stock } : p))
    setEditing(null)
  }

  const stockColor = (s) => s === 0 ? '#EF4444' : s <= 6 ? '#F59E0B' : '#1A3C1F'
  const stockBg    = (s) => s === 0 ? '#FEE2E2' : s <= 6 ? '#FEF3C7' : '#EEF7EE'

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
            <h1 className="text-base font-bold text-white">Inventory</h1>
            <p className="text-xs" style={{ color: 'rgba(255,255,255,0.45)' }}>
              {products.filter(p => p.stock <= 6).length} items low on stock
            </p>
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

          {/* Search + Add */}
          <div className="flex gap-3 mb-5">
            <div className="flex-1 flex items-center gap-2 bg-white rounded-xl border border-gray-200 px-3 py-2.5 shadow-sm">
              <Search size={15} className="text-gray-400 flex-shrink-0" />
              <input value={search} onChange={e => setSearch(e.target.value)}
                placeholder="Search products…"
                className="text-sm outline-none w-full bg-transparent text-gray-700 placeholder:text-gray-400" />
            </div>
            <button className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold text-white shadow-sm transition"
              style={{ backgroundColor: '#1A3C1F' }}>
              <Plus size={15} /> Add Product
            </button>
          </div>

          {/* Category tabs */}
          <div className="flex gap-2 mb-5 overflow-x-auto pb-1">
            {CATS.map(c => (
              <button key={c} onClick={() => setCat(c)}
                className="flex-shrink-0 px-4 py-1.5 rounded-full text-xs font-semibold transition-all"
                style={cat === c
                  ? { backgroundColor: '#1A3C1F', color: '#fff' }
                  : { backgroundColor: '#fff', color: '#6B7280', border: '1px solid #E5E7EB' }}>
                {c}
              </button>
            ))}
          </div>

          {/* Table — desktop */}
          <div className="hidden md:block bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr style={{ backgroundColor: '#F9FAFB' }}>
                  {['Product', 'SKU', 'Category', 'Price', 'Stock', 'Actions'].map(h => (
                    <th key={h} className="text-left px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {filtered.map(p => (
                  <tr key={p.id} className="hover:bg-gray-50 transition">
                    <td className="px-5 py-3.5 font-medium text-gray-900">{p.name}</td>
                    <td className="px-5 py-3.5 text-gray-400 text-xs font-mono">{p.sku}</td>
                    <td className="px-5 py-3.5">
                      <span className="px-2.5 py-1 rounded-full text-xs font-semibold"
                        style={{ backgroundColor: '#EEF7EE', color: '#1A3C1F' }}>{p.category}</span>
                    </td>
                    <td className="px-5 py-3.5 font-semibold text-gray-900">₹{p.price}</td>
                    <td className="px-5 py-3.5">
                      <span className="flex items-center gap-1.5 w-fit px-2.5 py-1 rounded-full text-xs font-semibold"
                        style={{ backgroundColor: stockBg(p.stock), color: stockColor(p.stock) }}>
                        {p.stock === 0 && <AlertTriangle size={10} />}
                        {p.stock === 0 ? 'Out of stock' : `${p.stock} units`}
                      </span>
                    </td>
                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-2">
                        <button onClick={() => setEditing(p)}
                          className="p-1.5 rounded-lg hover:bg-blue-50 transition">
                          <Edit2 size={14} className="text-blue-500" />
                        </button>
                        <button className="p-1.5 rounded-lg hover:bg-red-50 transition">
                          <Trash2 size={14} className="text-red-400" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Cards — mobile */}
          <div className="md:hidden space-y-3">
            {filtered.map(p => (
              <div key={p.id} className="bg-white rounded-2xl border border-gray-100 p-4 shadow-sm">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-gray-900 truncate">{p.name}</p>
                    <p className="text-xs text-gray-400 mt-0.5 font-mono">{p.sku} · {p.category}</p>
                  </div>
                  <div className="flex gap-1.5 flex-shrink-0">
                    <button onClick={() => setEditing(p)} className="p-1.5 rounded-lg bg-blue-50">
                      <Edit2 size={13} className="text-blue-500" />
                    </button>
                    <button className="p-1.5 rounded-lg bg-red-50">
                      <Trash2 size={13} className="text-red-400" />
                    </button>
                  </div>
                </div>
                <div className="flex items-center justify-between mt-3">
                  <span className="text-base font-bold text-gray-900">₹{p.price}</span>
                  <span className="flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold"
                    style={{ backgroundColor: stockBg(p.stock), color: stockColor(p.stock) }}>
                    {p.stock === 0 && <AlertTriangle size={10} />}
                    {p.stock === 0 ? 'Out of stock' : `${p.stock} units`}
                  </span>
                </div>
              </div>
            ))}
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
              className={`flex flex-col items-center justify-center py-2 gap-0.5 transition-all ${isActive ? 'text-white' : 'text-white/50'}`}>
              <div className={`p-1.5 rounded-xl ${isActive ? 'bg-white/20' : ''}`}>
                <Icon size={20} />
              </div>
              <span className="text-[10px] font-medium leading-none">{label}</span>
            </button>
          )
        })}
      </nav>

      {editing && <EditModal product={editing} onClose={() => setEditing(null)} onSave={handleSave} />}
    </div>
  )
}