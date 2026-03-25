import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { ChevronRight, ShoppingBag, RotateCcw, Star, MapPin, Settings, LogOut, User } from 'lucide-react'
import { C } from '../theme'

const MENU = [
  {
    section: 'Your Activity',
    items: [
      { icon: ShoppingBag, label: 'My Orders',        path: '/orders'    },
      { icon: RotateCcw,   label: 'My Returns',       path: '/returns'   },
      { icon: Star,        label: 'My Reviews',       path: '/reviews'   },
    ]
  },
  {
    section: 'Your Account',
    items: [
      { icon: MapPin,    label: 'My Addresses',     path: '/addresses' },
      { icon: Settings,  label: 'Profile Settings', path: '/profile'   },
    ]
  },
]

export default function Account() {
  const navigate     = useNavigate()
  const { isAuthenticated, user } = useSelector(s => s.auth)

  return (
    <div className="max-w-lg mx-auto px-4 py-6">

      {/* ── Profile header ────────────────────────────── */}
      <div
        className="rounded-2xl p-5 mb-4 flex items-center gap-4"
        style={{ background: `linear-gradient(135deg, ${C.headerBg} 0%, #2D6A3F 100%)` }}
      >
        <div
          className="w-14 h-14 rounded-full flex items-center justify-center flex-shrink-0"
          style={{ backgroundColor: 'rgba(255,255,255,0.15)' }}
        >
          <User size={28} color={C.white} />
        </div>
        {isAuthenticated && user ? (
          <div>
            <p className="text-white font-bold text-lg leading-tight">{user.name || 'BeejSpray User'}</p>
            <p className="text-sm mt-0.5" style={{ color: C.headerNavHover }}>+91 {user.phone || '—'}</p>
          </div>
        ) : (
          <div className="flex-1">
            <p className="text-white font-bold text-base mb-2">Welcome to BeejSpray</p>
            <div className="flex gap-2">
              <button
                onClick={() => navigate('/login')}
                className="px-4 py-1.5 rounded-lg text-xs font-bold text-white"
                style={{ backgroundColor: C.accent }}
              >
                Sign In
              </button>
              <button
                onClick={() => navigate('/register')}
                className="px-4 py-1.5 rounded-lg text-xs font-bold"
                style={{ backgroundColor: 'rgba(255,255,255,0.15)', color: C.white }}
              >
                Register
              </button>
            </div>
          </div>
        )}
      </div>

      {/* ── Menu sections ─────────────────────────────── */}
      {MENU.map(({ section, items }) => (
        <div key={section} className="mb-3">
          <p className="text-xs font-bold uppercase tracking-widest px-1 mb-2" style={{ color: C.gray400 }}>
            {section}
          </p>
          <div
            className="rounded-2xl overflow-hidden"
            style={{ border: `1.5px solid ${C.gray200}`, backgroundColor: C.white }}
          >
            {items.map(({ icon: Icon, label, path }, idx) => (
              <button
                key={path}
                onClick={() => navigate(path)}
                className="w-full flex items-center gap-4 px-4 py-3.5 transition-colors"
                style={{
                  borderTop: idx !== 0 ? `1px solid ${C.gray200}` : 'none',
                }}
                onMouseEnter={e => e.currentTarget.style.backgroundColor = C.primaryLight}
                onMouseLeave={e => e.currentTarget.style.backgroundColor = 'transparent'}
              >
                <div
                  className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: C.primaryLight }}
                >
                  <Icon size={16} style={{ color: C.primary }} />
                </div>
                <span className="flex-1 text-sm font-semibold text-left" style={{ color: C.gray900 }}>
                  {label}
                </span>
                <ChevronRight size={16} style={{ color: C.gray400 }} />
              </button>
            ))}
          </div>
        </div>
      ))}

      {/* ── Sign Out ──────────────────────────────────── */}
      {isAuthenticated && (
        <button
          onClick={() => navigate('/login')}
          className="w-full flex items-center gap-4 px-4 py-3.5 rounded-2xl mt-1 transition-colors"
          style={{ border: `1.5px solid #FEE2E2`, backgroundColor: C.white }}
          onMouseEnter={e => e.currentTarget.style.backgroundColor = '#FEF2F2'}
          onMouseLeave={e => e.currentTarget.style.backgroundColor = C.white}
        >
          <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0" style={{ backgroundColor: '#FEE2E2' }}>
            <LogOut size={16} style={{ color: C.red }} />
          </div>
          <span className="flex-1 text-sm font-semibold text-left" style={{ color: C.red }}>Sign Out</span>
          <ChevronRight size={16} style={{ color: C.red }} />
        </button>
      )}
    </div>
  )
}