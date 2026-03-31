import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { Mic,ShoppingCart, Heart, User, Globe, ChevronDown, Search, Sprout, Package, RotateCcw, Star, MapPin, Settings } from 'lucide-react'
import { C, T } from '../theme'

// ─── Inline SVG Icons (lucide doesn't have social/store icons we need) ───
const IconGlobe = () => (
  <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/>
    <path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z"/>
  </svg>
)
const Store = () => (
  <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/>
  </svg>
)
const IconHeart = () => (
  <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/>
  </svg>
)
const IconUser = () => (
  <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/>
  </svg>
)
const IconCart = () => (
  <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/>
    <path d="M1 1h4l2.68 13.39a2 2 0 001.99 1.61h9.72a2 2 0 001.99-1.61L23 6H6"/>
  </svg>
)

// ─── Data ────────────────────────────────────────────────────
const categories = [
  { label: 'Seeds',       img: 'https://images.unsplash.com/photo-1500595046743-cd271d694d30?w=120&h=120&fit=crop&crop=center' },
  { label: 'Pesticides',  img: 'https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8?w=120&h=120&fit=crop&crop=center' },
  { label: 'Fertilizers', img: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=120&h=120&fit=crop&crop=center' },
  { label: 'Equipment',   img: 'https://images.unsplash.com/photo-1592878904946-b3cd8ae243d0?w=120&h=120&fit=crop&crop=center' },
  { label: 'Fungicides',  img: 'https://images.unsplash.com/photo-1471193945509-9ad0617afabf?w=120&h=120&fit=crop&crop=center' },
  { label: 'Herbicides',  img: 'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=120&h=120&fit=crop&crop=center' },
  { label: 'Organic',     img: 'https://images.unsplash.com/photo-1628352081506-83c43123ed6d?w=120&h=120&fit=crop&crop=center' },
  { label: 'Cattle Feed', img: 'https://images.unsplash.com/photo-1516467508483-a7212febe31a?w=120&h=120&fit=crop&crop=center' },
  { label: 'Safety',      img: 'https://images.unsplash.com/photo-1628352081506-83c43123ed6d?w=120&h=120&fit=crop&crop=center' },

]

const marqueeItems = [
  { text: '🚚 Free Shipping Above ₹2000', href: '/shipping-policy' },
  { text: '💰 Cash on Delivery Available', href: '/help/payments' },
  { text: '🌾 Rabi Season Sale — Up to 40% Off', href: '/deals' },
  { text: '🏪 Sell on Beej Spray', href: 'https://aad1tyanagpal.github.io/beejspray-fe-v2/seller/' },
  { text: '📱 Download the App', href: '/download' },
  { text: '⭐ Trusted by 10,000+ Farmers', href: '/about' },
]

const languages = ['English', 'Hindi', 'Punjabi', 'Marathi', 'Gujarati']

const savedAddresses = [
  { id: 0, name: 'Neeraj Balana', address: 'Ward No. 12, Near Govt School', city: 'Anupgarh', state: 'RAJASTHAN', pin: '335701', isDefault: true },
  { id: 1, name: 'Neeraj Balana', address: 'Shop No. 5, Main Market Road',  city: 'Anupgarh', state: 'RAJASTHAN', pin: '335701', isDefault: false },
  { id: 2, name: 'Warehouse',     address: 'Industrial Area, Plot 23',      city: 'Sri Ganganagar', state: 'RAJASTHAN', pin: '335001', isDefault: false },
]

export default function PublicHeader() {
  const navigate = useNavigate()
  const [searchQuery, setSearchQuery]       = useState('')
  const [isSticky, setIsSticky]             = useState(false)
  const [langOpen, setLangOpen]             = useState(false)
  const [selectedLang, setSelectedLang]     = useState('English')
  const [isListening, setIsListening]       = useState(false)
  const [showVoicePopup, setShowVoicePopup] = useState(false)
  const [voiceText, setVoiceText]           = useState('')
const [showAddressModal, setShowAddressModal] = useState(false)
const [selectedAddress, setSelectedAddress]   = useState(0)
const [pincode, setPincode]               = useState('')
const [isFocused, setIsFocused]           = useState(false)
const [phIndex, setPhIndex]               = useState(0)
const [phExit, setPhExit]                 = useState(false)

const searchKeywords = ['Seeds', 'Pesticides', 'Fertilizers', 'Herbicides', 'Organic', 'Equipment']
  const langRef          = useRef(null)
  const recognitionRef   = useRef(null)
  const marqueeRef       = useRef(null)
  const marqueeFirstRef  = useRef(null)
  const marqueeAnimRef   = useRef(null)

  useEffect(() => {
  const t = setInterval(() => {
    setPhExit(true)
    setTimeout(() => {
      setPhIndex(i => (i + 1) % searchKeywords.length)
      setPhExit(false)
    }, 350)
  }, 2800)
  return () => clearInterval(t)
}, [])

  useEffect(() => {
    const track = marqueeRef.current
    const firstCopy = marqueeFirstRef.current
    if (!track || !firstCopy) return

    const speed = 0.6 // pixels per frame
    let copyWidth = 0

const updateWidth = () => {
  copyWidth = firstCopy.offsetWidth
}

updateWidth()
window.addEventListener("resize", updateWidth)
    let currentX = 0
    let paused = false

    const step = () => {
      if (!paused) {
        currentX += speed

        if (currentX >= copyWidth) {
          currentX = 0
        }

        track.style.transform = `translateX(-${currentX}px)`
      }

      marqueeAnimRef.current = requestAnimationFrame(step)
    }

    marqueeAnimRef.current = requestAnimationFrame(step)

    const pause  = () => { paused = true }
    const resume = () => { paused = false }

    track.parentElement.addEventListener('mouseenter', pause)
    track.parentElement.addEventListener('mouseleave', resume)

    return () => {
      cancelAnimationFrame(marqueeAnimRef.current)
      track.parentElement?.removeEventListener('mouseenter', pause)
      track.parentElement?.removeEventListener('mouseleave', resume)
      window.removeEventListener("resize", updateWidth)
    }
  }, [])

  useEffect(() => {
    const handler = (e) => {
      if (langRef.current && !langRef.current.contains(e.target)) setLangOpen(false)
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  useEffect(() => {
    const onScroll = () => setIsSticky(window.scrollY > 120)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const handleVoiceSearch = () => {
    const SR = window.SpeechRecognition || window.webkitSpeechRecognition
    if (!SR) { alert('Voice search not supported. Please use Chrome.'); return }
    if (isListening) { recognitionRef.current?.stop(); setIsListening(false); return }
    const r = new SR()
    recognitionRef.current = r
    r.lang = selectedLang === 'Hindi' ? 'hi-IN' : selectedLang === 'Punjabi' ? 'pa-IN' : selectedLang === 'Marathi' ? 'mr-IN' : selectedLang === 'Gujarati' ? 'gu-IN' : 'en-IN'
    r.interimResults = true
    r.continuous = false
    r.onstart  = () => { setIsListening(true); setShowVoicePopup(true); setVoiceText('') }
    r.onresult = (e) => { const t = Array.from(e.results).map(r => r[0].transcript).join(''); setVoiceText(t); setSearchQuery(t) }
    r.onend    = () => { setIsListening(false); setShowVoicePopup(false) }
    r.onerror  = () => { setIsListening(false); setShowVoicePopup(false) }
    r.start()
  }

  const addr = savedAddresses[selectedAddress]

return (
    <div className="w-full font-sans">
      <style>{`
        @keyframes ph-exit {
          0%   { transform: translateY(0);     opacity: 1; }
          100% { transform: translateY(-130%); opacity: 0; }
        }
        @keyframes ph-enter {
          0%   { transform: translateY(130%);  opacity: 0; }
          100% { transform: translateY(0);     opacity: 1; }
        }
      `}</style>

      {/* ── Marquee Banner ── */}
      <div className="w-full h-8 overflow-hidden flex items-center" style={{ backgroundColor: C.primary }}>
  <div ref={marqueeRef} className="flex items-center will-change-transform" style={{ whiteSpace: 'nowrap' }}>
    {[0, 1,2].map(copy => (
      <div key={copy} ref={copy === 0 ? marqueeFirstRef : null} className="flex items-center flex-shrink-0" style={{ gap: '1rem', paddingRight: '1rem' }}>
        {marqueeItems.map((item, i) => (
          <span key={i} className="flex items-center" style={{ gap: '1rem' }}>
            <a href={item.href} className="text-white/90 text-xs font-medium whitespace-nowrap tracking-wide hover:underline underline-offset-2">
              {item.text}
            </a>
            <span className="text-white/25 text-xs">✦</span>
          </span>
        ))}
      </div>
    ))}
  </div>
</div>

      {/* ── Main Header ── */}
      <div
        className={`w-full border-b border-white/10 transition-all duration-300 ${isSticky ? 'fixed top-0 left-0 right-0 z-[999] shadow-md' : 'relative'}`}
        style={{ backgroundColor: C.headerMid  }}
      >
        <div className="max-w-[1440px] mx-auto px-4 py-2.5 flex flex-col md:flex-row md:items-center md:justify-between gap-3" style={{ backgroundColor: C.headerBg }}>
          {/* ── Mobile Row 1: Logo + Language + Become Seller ── */}
          <div className="flex items-center gap-2 w-full md:w-auto md:flex-shrink-0">

          {/* Logo */}
          <button onClick={() => navigate('/')} className="flex items-center gap-2 flex-shrink-0 group">
            <span className="text-2xl">🌾</span>
            <div>
              <div className="text-[22px] font-extrabold leading-none tracking-tight group-hover:opacity-80 transition-opacity" style={{ color: C.headerNavText }}>
                Beej Spray
              </div>
              {!isSticky && (
                <div className="text-[9px] uppercase tracking-[1.5px] mt-0.5" style={{ color: C.headerNavHover }}>
                  Kisan Ki Dukan
                </div>
              )}
            </div>
          </button>

          {/* Language — mobile only */}
          <div ref={langRef} className="relative md:hidden ml-auto">
            <button onClick={() => setLangOpen(!langOpen)} className="flex flex-col items-center px-2 py-1">
              <Globe size={20} style={{ color: C.headerNavText }} />
              <div className="flex items-center gap-0.5">
                <span className="text-[11px] font-medium" style={{ color: C.headerNavText }}>{selectedLang}</span>
                <ChevronDown size={9} style={{ color: C.headerNavHover }} />
              </div>
            </button>
            {langOpen && (
              <div className="absolute top-[44px] right-0 bg-white rounded-lg border border-gray-200 shadow-xl py-1.5 min-w-[130px] z-[2000]">
                {languages.map(lang => (
                  <button
                    key={lang}
                    onClick={() => { setSelectedLang(lang); setLangOpen(false) }}
                    className="w-full text-left px-4 py-2.5 text-[13px] font-medium transition-colors hover:bg-gray-50"
                    style={{
                      color: lang === selectedLang ? C.primary : C.gray700,
                      fontWeight: lang === selectedLang ? 700 : 500,
                      backgroundColor: lang === selectedLang ? C.primaryLight : 'transparent',
                    }}
                  >
                    {lang}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Become Seller — mobile only */}
          <button
            onClick={() => window.location.href = 'https://aad1tyanagpal.github.io/beejspray-fe-v2/seller/'}
            className="md:hidden flex items-center gap-1.5 text-white text-[11px] font-bold px-2.5 py-1.5 rounded-md transition-colors flex-shrink-0"
            style={{ backgroundColor: '#FFFFFF', color: C.primary }}
          >
            <Store size={13} />
            <span>Seller</span>
          </button>

          {/* Delivery Location */}
          <button
  onClick={() => setShowAddressModal(true)}
  className="hidden lg:flex items-center gap-1 px-1.5 py-1.5 rounded-lg hover:bg-white/10 transition-colors flex-shrink-0 group"
  onMouseEnter={e => {
    e.currentTarget.style.backgroundColor = C.white
    e.currentTarget.querySelectorAll('[data-hover-text]').forEach(el => el.style.color = C.primary)
  }}
  onMouseLeave={e => {
    e.currentTarget.style.backgroundColor = 'transparent'
    e.currentTarget.querySelector('[data-hover-text="top"]').style.color = C.headerNavHover
    e.currentTarget.querySelector('[data-hover-text="bottom"]').style.color = C.headerNavText
    e.currentTarget.querySelector('[data-hover-text="chevron"]').style.color = C.headerNavHover
  }}
>
  <MapPin size={16} style={{ color: C.primary }} className="flex-shrink-0" />
  <div className="text-left">
    <div data-hover-text="top" className="text-[11px] leading-none mb-0.5" style={{ color: C.headerNavHover }}>
      Delivering to {addr.name.split(' ')[0]}
    </div>
    <div className="flex items-center gap-1">
      <span data-hover-text="bottom" className="text-[13px] font-bold leading-none" style={{ color: C.headerNavText }}>
        {addr.city} {addr.pin}
      </span>
      <ChevronDown data-hover-text="chevron" size={10} style={{ color: C.headerNavHover }} />
    </div>
  </div>
</button>

 </div>{/* ── end mobile row 1 ── */}

          {/* ── Mobile Row 2 + Desktop: Search Bar ── */}
          <div
            className="w-full md:flex-1 md:max-w-[650px] lg:max-w-[720px] flex h-[42px] bg-white border border-gray-200 rounded-lg overflow-hidden transition-all"
            onFocus={e => e.currentTarget.style.borderColor = C.primary}
            onBlur={e => e.currentTarget.style.borderColor = C.gray200}
          >
            <div className="flex-1 relative flex items-center overflow-hidden">

              {/* ── Animated Placeholder Overlay ── */}
              {!searchQuery && !isFocused && (
                <div className="absolute inset-0 flex items-center px-3.5 pointer-events-none select-none gap-[5px] overflow-hidden">
                  <span className="text-sm text-gray-400 whitespace-nowrap flex-shrink-0">
                    Search for
                  </span>
                  <div className="relative flex items-center overflow-hidden h-full flex-1">
                    <span
                      key={phIndex}
                      className="absolute left-0 text-sm text-gray-400 whitespace-nowrap"
                      style={{
                        animation: phExit
                          ? 'ph-exit 0.35s ease forwards'
                          : 'ph-enter 0.35s ease forwards'
                      }}
                    >
                      "{searchKeywords[phIndex]}"
                    </span>
                  </div>
                </div>
              )}

              {/* ── Real Input ── */}
              <input
                type="text"
                className="flex-1 w-full h-full px-3.5 text-sm outline-none bg-transparent"
                style={{ color: C.gray900, caretColor: C.primary }}
                placeholder=""
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                onKeyDown={e => e.key === 'Enter' && navigate(`/search?q=${searchQuery}`)}
              />
            </div>
            {/* Mic */}
            <button
              onClick={handleVoiceSearch}
              className="px-2.5 border-l border-gray-200 hover:bg-gray-50 transition-colors flex items-center justify-center"
              style={{ color: isListening ? C.red : C.gray400 }}
            >
              <Mic size={18} />
            </button>
            {/* Search btn */}
            <button
              onClick={() => navigate(`/search?q=${searchQuery}`)}
              className="px-4 flex items-center justify-center transition-colors"
              style={{ backgroundColor: C.primary }}
              onMouseEnter={e => e.currentTarget.style.backgroundColor = C.primaryDark}
              onMouseLeave={e => e.currentTarget.style.backgroundColor = C.primary}
            >
              <Search size={18} className="text-white" />
            </button>
          </div>

          {/* Action Icons */}
          <div className="hidden md:flex items-center gap-0.5 flex-shrink-0">
            {/* Language */}
            <div ref={langRef} className="relative">
              <button onClick={() => setLangOpen(!langOpen)} className={T.navItem}>
                <Globe size={22} style={{ color: C.headerNavText }} />
                <div className="flex items-center gap-0.5 mt-0.5">
                  <span className="text-[12px] font-medium" style={{ color: C.headerNavText }}>{selectedLang}</span>
                  <ChevronDown size={10} style={{ color: C.headerNavHover }} />
                </div>
              </button>
              {langOpen && (
                <div className="absolute top-[52px] right-0 bg-white rounded-lg border border-gray-200 shadow-xl py-1.5 min-w-[140px] z-[2000]">
                  {languages.map(lang => (
                    <button
                      key={lang}
                      onClick={() => { setSelectedLang(lang); setLangOpen(false) }}
                      className="w-full text-left px-4 py-2.5 text-[13px] font-medium transition-colors hover:bg-gray-50"
                      style={{
                        color: lang === selectedLang ? C.primary : C.gray700,
                        fontWeight: lang === selectedLang ? 700 : 500,
                        backgroundColor: lang === selectedLang ? C.primaryLight : 'transparent',
                      }}
                    >
                      {lang}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Social Media */}
            <button onClick={() => navigate('/social-media')} className={T.navItem}>
              <Sprout size={22} style={{ color: C.headerNavHover }} />
              <span className="text-[12px] font-medium mt-0.5" style={{ color: C.headerNavHover }}>Social Media</span>
            </button>

            {/* Wishlist */}
            <button onClick={() => navigate('/wishlist')} className={T.navItem}>
              <Heart size={22} style={{ color: C.headerNavText }} />
              <span className="text-[12px] font-medium mt-0.5" style={{ color: C.headerNavText }}>Wishlist</span>
            </button>

            {/* Account — hover dropdown */}
            <div
              className="relative group"
              onMouseEnter={() => {}}
              onMouseLeave={() => {}}
            >
              <button className={T.navItem}>
                <User size={22} style={{ color: C.headerNavText }} />
                <span className="text-[12px] font-medium mt-0.5" style={{ color: C.headerNavText }}>Account</span>
              </button>

              {/* Dropdown */}
              <div
                className="absolute right-0 top-full pt-2 w-56 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-150 z-[2000]"
              >
                <div
                  className="rounded-xl overflow-hidden"
                  style={{ backgroundColor: C.white, border: `1px solid ${C.gray200}`, boxShadow: '0 8px 32px rgba(0,0,0,0.15)' }}
                >
                  {/* Sign In CTA */}
                  <div className="px-4 py-3" style={{ borderBottom: `1px solid ${C.gray200}` }}>
                    <button
                      onClick={() => navigate('/login')}
                      className="w-full py-2 rounded-lg text-xs font-bold text-white"
                      style={{ backgroundColor: C.primary }}
                    >
                      Sign In / Register
                    </button>
                  </div>

                  {/* Menu items */}
                  {[
                    { label: 'My Orders',   path: '/orders',  Icon: Package   },
                    { label: 'My Returns',  path: '/returns', Icon: RotateCcw },
                    { label: 'My Reviews',  path: '/reviews', Icon: Star      },
                  ].map(({ label, path, Icon }) => (
                    <button
                      key={path}
                      onClick={() => navigate(path)}
                      className="w-full text-left px-4 py-2.5 text-sm transition-colors flex items-center gap-3"
                      style={{ color: C.gray700 }}
                      onMouseEnter={e => e.currentTarget.style.backgroundColor = C.primaryLight}
                      onMouseLeave={e => e.currentTarget.style.backgroundColor = 'transparent'}
                    >
                      <Icon size={15} style={{ color: C.primary }} />
                      {label}
                    </button>
                  ))}

                  <div style={{ borderTop: `1px solid ${C.gray200}` }}>
                    {[
                      { label: 'My Addresses',     path: '/addresses', Icon: MapPin   },
                      { label: 'Profile Settings', path: '/profile',   Icon: Settings },
                    ].map(({ label, path, Icon }) => (
                      <button
                        key={path}
                        onClick={() => navigate(path)}
                        className="w-full text-left px-4 py-2.5 text-sm transition-colors flex items-center gap-3"
                        style={{ color: C.gray700 }}
                        onMouseEnter={e => e.currentTarget.style.backgroundColor = C.primaryLight}
                        onMouseLeave={e => e.currentTarget.style.backgroundColor = 'transparent'}
                      >
                        <Icon size={15} style={{ color: C.primary }} />
                        {label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Cart */}
            <button onClick={() => navigate('/cart')} className={`${T.navItem} relative`}>
              <ShoppingCart size={22} style={{ color: C.headerNavText }} />
              <span className="text-[12px] font-medium mt-0.5" style={{ color: C.headerNavText }}>Cart</span>
            </button>

            {/* Divider */}
            <div className="w-px h-8 mx-2" style={{ backgroundColor: C.gray200 }} />

            {/* Become a Seller */}
            <button
              onClick={() => window.location.href = 'https://aad1tyanagpal.github.io/beejspray-fe-v2/seller/'}
              className="flex items-center gap-1.5 text-white text-[12px] font-bold px-3 py-2 rounded-md transition-colors ml-auto md:ml-0 whitespace-nowrap"
              style={{ backgroundColor: '#FFFFFF', color: C.primary }}
              onMouseEnter={e => e.currentTarget.style.backgroundColor = '#F0FFF4'}
              onMouseLeave={e => e.currentTarget.style.backgroundColor = '#FFFFFF'}
            >
              <Store size={15} />
              <span className="hidden xl:inline">Become a Seller</span>
            </button>
          </div>
        </div>
      </div>

      {/* ── Sticky spacer ── */}
      {isSticky && <div style={{ height: 62 }} />}

      {/* ── Delivery Strip (Mobile only) ── */}
      <div
        className="md:hidden w-full px-4 py-2 flex items-center gap-2 border-b border-white/10 cursor-pointer"
        style={{ backgroundColor: C.headerBg }}
        onClick={() => setShowAddressModal(true)}
      >
        <MapPin size={14} style={{ color: C.headerNavHover }} className="flex-shrink-0" />
        <span className="text-[13px] text-white font-medium truncate">
          Delivering to {addr.name.split(' ')[0]} {addr.city} {addr.pin}
        </span>
        <ChevronDown size={13} style={{ color: C.headerNavHover }} className="flex-shrink-0 ml-auto" />
      </div>



{/* ── Mobile Bottom Navbar ── */}
      <div className="fixed bottom-0 inset-x-0 w-full max-w-[100vw] overflow-hidden z-[998] border-t border-gray-200 md:hidden flex" style={{ backgroundColor: C.sectionBg1 }}>
        <button onClick={() => navigate('/')} className="flex-1 flex flex-col items-center justify-center py-2 gap-0.5">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: C.gray700 }}>
            <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/>
          </svg>
          <span className="text-[10px] font-semibold" style={{ color: C.gray700 }}>Home</span>
        </button>
        <button onClick={() => navigate('/social-media')} className="flex-1 flex flex-col items-center justify-center py-2 gap-0.5">
          <Sprout size={22} style={{ color: C.primary }} />
          <span className="text-[10px] font-semibold" style={{ color: C.primary }}>Social Media</span>
        </button>
        <button onClick={() => navigate('/wishlist')} className="flex-1 flex flex-col items-center justify-center py-2 gap-0.5">
          <Heart size={22} style={{ color: C.gray700 }} />
          <span className="text-[10px] font-semibold" style={{ color: C.gray700 }}>Wishlist</span>
        </button>
        <button onClick={() => navigate('/cart')} className="flex-1 flex flex-col items-center justify-center py-2 gap-0.5 relative">
          <div className="relative">
            <ShoppingCart size={22} style={{ color: C.gray700 }} />
            <span className="absolute -top-1 -right-1 text-white text-[9px] font-bold w-[15px] h-[15px] rounded-full flex items-center justify-center" style={{ backgroundColor: C.red }}>2</span>
          </div>
          <span className="text-[10px] font-semibold" style={{ color: C.gray700 }}>Cart</span>
        </button>
        <button onClick={() => navigate('/account')} className="flex-1 flex flex-col items-center justify-center py-2 gap-0.5">
          <User size={22} style={{ color: C.gray700 }} />
          <span className="text-[10px] font-semibold" style={{ color: C.gray700 }}>Account</span>
        </button>
      </div>

      {/* ── Address Modal ── */}
      {showAddressModal && (
        <div
          className="fixed inset-0 z-[3000] flex items-center justify-center"
          style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}
          onClick={() => setShowAddressModal(false)}
        >
          <div
            className="bg-white rounded-xl overflow-hidden w-[420px] max-h-[80vh]"
            style={{ boxShadow: '0px 8px 32px rgba(0,0,0,0.2)' }}
            onClick={e => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
              <span className="text-[18px] font-bold text-gray-900 leading-tight" style={{ color: '#111827' }}>Choose your location</span>
              <button onClick={() => setShowAddressModal(false)} className="text-gray-400 hover:text-gray-700 text-2xl leading-none">&times;</button>
            </div>

            <div className="px-6 pt-3 pb-2">
              <p className="text-[13px] leading-relaxed text-gray-500">
                Select a delivery location to see product availability and delivery options
              </p>
            </div>

            {/* Address List */}
            <div className="px-6 flex flex-col gap-2.5 overflow-y-auto" style={{ maxHeight: 280 }}>
              {savedAddresses.map(a => (
                <button
                  key={a.id}
                  onClick={() => { setSelectedAddress(a.id); setShowAddressModal(false) }}
                  className="w-full text-left p-3.5 rounded-lg border-2 transition-colors"
                  style={{
                    borderColor: selectedAddress === a.id ? C.primary : C.gray200,
                    backgroundColor: selectedAddress === a.id ? C.primaryLight : C.white,
                  }}
                >
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[14px] font-bold text-gray-900">{a.name}</span>
                    {a.isDefault && (
                      <span className="text-[9px] font-bold text-white px-1.5 py-0.5 rounded" style={{ backgroundColor: C.primary }}>DEFAULT</span>
                    )}
                  </div>
                  <p className="text-[13px] leading-snug text-gray-500">
                    {a.address}, {a.city}, {a.state} {a.pin}
                  </p>
                </button>
              ))}
            </div>

            {/* Links */}
            <div className="px-6 pt-3 flex items-center gap-3">
              <button className="text-[13px] font-600 hover:underline underline-offset-2" style={{ color: C.primary, fontWeight: 600 }}>See all</button>
              <span className="text-gray-200">|</span>
              <button className="text-[13px] font-600 hover:underline underline-offset-2" style={{ color: C.primary, fontWeight: 600 }}>Add an address</button>
            </div>

            {/* Pincode */}
            <div className="px-6 pt-4 pb-5 flex flex-col gap-2.5">
              <p className="text-[12px] text-center" style={{ color: C.gray400 }}>or enter an Indian pincode</p>
              <div className="flex gap-2.5">
                <input
                  type="text"
                  maxLength={6}
                  className="flex-1 h-10 px-3 border border-gray-200 rounded-md text-[14px] outline-none focus:border-pub-primary"
                  placeholder="Enter pincode"
                  value={pincode}
                  onChange={e => setPincode(e.target.value)}
                />
                <button
                  onClick={() => { if (pincode.length === 6) setShowAddressModal(false) }}
                  className="px-5 h-10 border border-gray-200 rounded-md text-[13px] font-semibold hover:bg-gray-50 transition-colors"
                  style={{ color: C.gray900 }}
                >
                  Apply
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── Voice Popup ── */}
      {showVoicePopup && (
        <>
          <style>{`@keyframes pulse { 0%{box-shadow:0 0 0 0 rgba(45,122,62,0.4)} 70%{box-shadow:0 0 0 20px rgba(45,122,62,0)} 100%{box-shadow:0 0 0 0 rgba(45,122,62,0)} }`}</style>
          <div className="fixed inset-0 z-[4000] flex items-center justify-center" style={{ backgroundColor: 'rgba(0,0,0,0.55)' }}>
            <div className="bg-white rounded-2xl p-6 flex flex-col items-center gap-4 w-[360px]" style={{ boxShadow: '0px 12px 40px rgba(0,0,0,0.3)' }}>
              <div
                className="w-[72px] h-[72px] rounded-full flex items-center justify-center"
                style={{ backgroundColor: C.primaryLight, animation: isListening ? 'pulse 1.5s infinite' : 'none' }}
              >
                <Mic size={32} style={{ color: C.primary }} />
              </div>
              <span className="text-[16px] font-bold" style={{ color: C.gray900 }}>
                {isListening ? 'Listening…' : 'Tap to speak'}
              </span>
              <span className="text-[14px] text-center min-h-[40px]" style={{ color: C.gray400 }}>
                {voiceText || 'Speak now'}
              </span>
              <button
                onClick={() => { recognitionRef.current?.stop(); setShowVoicePopup(false); setIsListening(false) }}
                className="px-5 py-2 border border-gray-200 rounded-md text-[13px] font-semibold hover:bg-gray-50 transition-colors"
                style={{ color: C.gray900 }}
              >
                Cancel
              </button>
            </div>
          </div>
        </>
      )}

    </div>
  )
}