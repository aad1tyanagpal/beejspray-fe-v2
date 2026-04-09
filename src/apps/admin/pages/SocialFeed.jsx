import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  LayoutDashboard, Users2, ShoppingCart, Package,
  CreditCard, Megaphone, RotateCcw, Rss,
  LogOut, Bell, ChevronDown, Heart, Flag,
  Eye, EyeOff, Trash2, Check, ShieldAlert, FileDown, BarChart3,
   Plus, Edit2, Search, Tag, Image, ToggleLeft, ToggleRight
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

const POSTS = [
  { id: 'P1', author: 'Ramesh Kumar',  time: '2h ago',  text: 'Tried new Syngenta Ampligo this season — really effective on bollworms. Highly recommend for cotton farmers!', likes: 24, flagged: false, hidden: false },
  { id: 'P2', author: 'Suresh Patel',  time: '5h ago',  text: 'Does anyone have experience with drip irrigation for wheat? Looking for product recommendations.',              likes: 12, flagged: false, hidden: false },
  { id: 'P3', author: 'Anon User',     time: '8h ago',  text: 'This seller sent me wrong goods twice! Avoid #KisanKendra at all costs!!!',                                   likes: 3,  flagged: true,  hidden: false },
  { id: 'P4', author: 'Priya Devi',    time: '1d ago',  text: 'Beautiful harvest this year thanks to good seeds from BeejSpray 🌾 Keep it up!',                              likes: 61, flagged: false, hidden: false },
]

const FILTERS = ['all', 'flagged', 'hidden']

export default function SocialFeed() {
  const navigate = useNavigate()
  const [activeNav, setActiveNav] = useState('/social')
  const [filter, setFilter]       = useState('all')
  const [posts, setPosts]         = useState(POSTS)

  const handleNav = (path) => { setActiveNav(path); navigate(path) }
  const toggleHide = (id) => setPosts(ps => ps.map(p => p.id === id ? { ...p, hidden: !p.hidden } : p))
  const deletePost = (id) => setPosts(ps => ps.filter(p => p.id !== id))
  const dismissFlag = (id) => setPosts(ps => ps.map(p => p.id === id ? { ...p, flagged: false } : p))

  const filtered = posts.filter(p => {
    if (filter === 'flagged') return p.flagged
    if (filter === 'hidden')  return p.hidden
    return true
  })

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
            <h2 className="text-sm font-semibold text-white">Social Feed</h2>
            <p className="text-[11px] text-white/40">Moderation panel</p>
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

          {/* Filter tabs */}
          <div className="flex gap-1 bg-white rounded-xl border border-gray-200 p-1 w-fit mb-5">
            {FILTERS.map(f => (
              <button key={f} onClick={() => setFilter(f)}
                className="px-4 py-1.5 rounded-lg text-sm font-semibold transition-all capitalize"
                style={filter === f ? { backgroundColor: '#1A3C1F', color: '#fff' } : { color: '#6B7280' }}>
                {f}
                {f === 'flagged' && (
                  <span className="ml-1.5 px-1.5 py-0.5 rounded-full text-[10px] font-bold"
                    style={{ backgroundColor: f === filter ? 'rgba(255,255,255,0.2)' : '#FEE2E2', color: f === filter ? '#fff' : '#991B1B' }}>
                    {posts.filter(p => p.flagged).length}
                  </span>
                )}
              </button>
            ))}
          </div>

          <div className="space-y-3">
            {filtered.map(p => (
              <div key={p.id} className={`bg-white rounded-2xl border p-4 shadow-sm transition-opacity ${p.hidden ? 'opacity-60' : ''} ${p.flagged ? 'border-red-200' : 'border-gray-100'}`}>
                {p.flagged && (
                  <div className="flex items-center gap-1.5 text-xs font-semibold text-red-600 mb-2 px-2.5 py-1.5 rounded-lg w-fit"
                    style={{ backgroundColor: '#FEE2E2' }}>
                    <Flag size={12} /> Flagged by users
                  </div>
                )}
                {p.hidden && (
                  <div className="flex items-center gap-1.5 text-xs font-semibold text-gray-500 mb-2 px-2.5 py-1.5 rounded-lg w-fit bg-gray-100">
                    <EyeOff size={12} /> Hidden from feed
                  </div>
                )}
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-full bg-green-50 flex items-center justify-center text-xs font-bold flex-shrink-0" style={{ color: '#1A3C1F' }}>
                    {p.author.split(' ').map(w => w[0]).join('').slice(0,2)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <p className="text-sm font-semibold text-gray-800">{p.author}</p>
                      <span className="text-xs text-gray-400">{p.time}</span>
                    </div>
                    <p className="text-sm text-gray-700 leading-relaxed">{p.text}</p>
                    <div className="flex items-center gap-1 mt-2 text-xs text-gray-400">
                      <Heart size={12} /> {p.likes} likes
                    </div>
                  </div>
                </div>
                <div className="flex gap-2 mt-3 pt-3 border-t border-gray-50 flex-wrap">
                  <button onClick={() => toggleHide(p.id)}
                    className="flex items-center gap-1 text-xs font-semibold px-2.5 py-1.5 rounded-lg transition"
                    style={{ backgroundColor: '#EFF6FF', color: '#1D4ED8' }}>
                    {p.hidden ? <><Eye size={12} /> Show</> : <><EyeOff size={12} /> Hide</>}
                  </button>
                  <button onClick={() => deletePost(p.id)}
                    className="flex items-center gap-1 text-xs font-semibold px-2.5 py-1.5 rounded-lg transition"
                    style={{ backgroundColor: '#FEE2E2', color: '#991B1B' }}>
                    <Trash2 size={12} /> Delete
                  </button>
                  {p.flagged && (
                    <button onClick={() => dismissFlag(p.id)}
                      className="flex items-center gap-1 text-xs font-semibold px-2.5 py-1.5 rounded-lg transition"
                      style={{ backgroundColor: '#EEF7EE', color: '#1A3C1F' }}>
                      <Check size={12} /> Dismiss Flag
                    </button>
                  )}
                </div>
              </div>
            ))}
            {filtered.length === 0 && (
              <div className="text-center py-16 text-gray-400">
                <Rss size={32} className="mx-auto mb-2 opacity-30" />
                <p className="text-sm font-medium">No posts in this filter</p>
              </div>
            )}
          </div>
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