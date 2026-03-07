import { useNavigate } from 'react-router-dom'
import { MapPin, Phone, Mail } from 'lucide-react'
import { C, T } from '../theme'

// ─── Inline SVG Social Icons ─────────────────────────────────
const IconFacebook = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
  </svg>
)
const IconInstagram = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
  </svg>
)
const IconYoutube = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
    <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
  </svg>
)
const IconTwitterX = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
  </svg>
)
const IconWhatsApp = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
  </svg>
)

// ─── Data ────────────────────────────────────────────────────
const categoryLinks = [
  { label: 'Seeds',            path: '/category/seeds' },
  { label: 'Fertilizers',      path: '/category/fertilizers' },
  { label: 'Pesticides',       path: '/category/pesticides' },
  { label: 'Equipment',        path: '/category/equipment' },
  { label: 'Organic Products', path: '/category/organic' },
  { label: 'Herbicides',       path: '/category/herbicides' },
]

const supportLinks = [
  { label: 'About Us',      path: '/about' },
  { label: 'Contact Us',    path: '/contact' },
  { label: 'Return Policy', path: '/return-policy' },
  { label: 'Terms of Use',  path: '/terms' },
  { label: 'Privacy Policy',path: '/privacy' },
]

const socialLinks = [
  { icon: IconFacebook,  label: 'Facebook' },
  { icon: IconInstagram, label: 'Instagram' },
  { icon: IconYoutube,   label: 'YouTube' },
  { icon: IconTwitterX,  label: 'X (Twitter)' },
  { icon: IconWhatsApp,  label: 'WhatsApp' },
]

// ─── Component ───────────────────────────────────────────────
export default function PublicFooter() {
  const navigate = useNavigate()

  return (
    <footer className="w-full font-sans tracking-wide text-[15px]" style={{ backgroundColor: C.footerBg }}>

      {/* ── App Download Strip ── */}
      {/* <div className="border-b border-white/5" style={{ backgroundColor: `${C.primary}22` }}>
        <div className="max-w-[1400px] mx-auto px-4 py-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div>
            <p className="text-white font-bold text-sm">📱 Download the Beej Spray App</p>
            <p className="text-gray-400 text-xs mt-0.5">Order anytime, track live, get exclusive app-only deals</p>
          </div>
          <div className="flex gap-3">
            {[
              { store: 'Google Play', prefix: 'Get it on' },
              { store: 'App Store',   prefix: 'Download on' },
            ].map((s) => (
              <a key={s.store} href="#"
                className="flex items-center gap-2.5 border border-white/20 hover:border-white/40 text-white px-4 py-2.5 rounded-lg transition-colors"
                style={{ backgroundColor: 'rgba(255,255,255,0.08)' }}
              >
                <div className="text-left leading-tight">
                  <div className="text-[9px] text-gray-400 uppercase tracking-wide">{s.prefix}</div>
                  <div className="text-sm font-bold">{s.store}</div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </div> */}

      {/* ── Main Columns ── */}
      <div className="max-w-[1400px] mx-auto px-6 py-12">
       <div className="grid grid-cols-1 lg:grid-cols-[1.8fr_1fr_1fr_1.2fr] gap-10 lg:gap-12">

          {/* Brand */}
          <div>
            <div className="flex items-center gap-2.5 mb-4">
              <span className="text-2xl">🌾</span>
              <div>
                <div className="text-xl font-extrabold text-white leading-none">Beej Spray</div>
                <div className="text-[9px] text-gray-400 uppercase tracking-[2px] mt-0.5">Kisan Ki Dukan</div>
              </div>
            </div>
            <p className="text-sm text-gray-400 leading-relaxed mb-5 max-w-[260px]">
              India's most trusted agricultural marketplace — connecting farmers with quality seeds, fertilizers, and equipment at fair prices.
            </p>

            {/* Social */}
            <div className="flex gap-2 mb-6">
              {socialLinks.map((s) => {
                const Icon = s.icon
                return (
                  <a key={s.label} href="#" title={s.label}
                    className="w-8 h-8 rounded-lg border border-white/10 flex items-center justify-center transition-all duration-200 text-gray-400 hover:text-white hover:border-pub-primary"
                    style={{ backgroundColor: 'rgba(255,255,255,0.05)' }}
                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = C.primary}
                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.05)'}
                  >
                    <Icon />
                  </a>
                )
              })}
            </div>

            {/* Trust */}
            {/* <div className="flex flex-col gap-1.5">
              {['✅ 100% Genuine Products', '🔒 Secure Payments', '🚚 Pan-India Delivery'].map((b, i) => (
                <span key={i} className="text-xs text-gray-400">{b}</span>
              ))}
            </div> */}
          </div>

          {/* Category + Support — side by side on mobile */}
          <div className="grid grid-cols-2 gap-6 lg:contents">
          <div>
            <h4 className={`${T.label} mb-5`}>Shop By Category</h4>
            <ul className="flex flex-col gap-3">
              {categoryLinks.map((link) => (
                <li key={link.label}>
                  <button
                    onClick={() => navigate(link.path)}
                    className="text-sm text-gray-300 hover:text-white transition-all duration-150 hover:translate-x-1 text-left"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className={`${T.label} mb-5`}>Support</h4>
            <ul className="flex flex-col gap-3">
              {supportLinks.map((link) => (
                <li key={link.label}>
                  <button
                    onClick={() => navigate(link.path)}
                    className="text-sm text-gray-300 hover:text-white transition-all duration-150 hover:translate-x-1 text-left"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          </div>{/* end mobile row wrapper */}

          {/* Contact */}
          <div >
            <h4 className={`${T.label} mb-5`}>Contact Us</h4>
            <ul className="flex flex-col gap-4">
              <li className="flex items-start gap-3">
                <MapPin size={15} style={{ color: C.primary }} className="flex-shrink-0 mt-0.5" />
                <span className="text-sm text-gray-300 leading-relaxed">
                  Krishi Bhawan, Near Bus Stand,<br />Anupgarh, Rajasthan 335701
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={15} style={{ color: C.primary }} />
                <a href="tel:+919876543210" className="text-sm text-gray-300 hover:text-white transition-colors">
                  +91 98765 43210
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={15} style={{ color: C.primary }} />
                <a href="mailto:support@beejspray.com" className="text-sm text-gray-300 hover:text-white transition-colors">
                  support@beejspray.com
                </a>
              </li>
            </ul>
            <a href="#"
              className="inline-flex items-center gap-2 mt-6 text-white text-xs font-bold px-4 py-2.5 rounded-lg transition-colors"
              style={{ backgroundColor: '#25D366' }}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#20ba59'}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#25D366'}
            >
              <IconWhatsApp /> Chat on WhatsApp
            </a>
          </div>

        </div>
      </div>

      {/* ── Bottom Bar ── */}
      <div className="border-t border-white/10" style={{ backgroundColor: C.headerBottom }}>
          <div className="max-w-[1400px] mx-auto px-6 py-4 flex items-center justify-center">
          <p className="text-xs text-gray-500">
            © {new Date().getFullYear()} Beej Spray Marketplace. All rights reserved.
          </p>
        </div>
      </div>

    </footer>
  )
}