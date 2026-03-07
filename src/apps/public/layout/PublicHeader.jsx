import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { Search, Mic, MapPin, ChevronDown, Globe, Heart, User, ShoppingCart, Store, Sprout  } from 'lucide-react'
import { C, T } from '../theme'

// ─── Inline SVG Icons (lucide doesn't have social/store icons we need) ───
const IconGlobe = () => (
  <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/>
    <path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z"/>
  </svg>
)
const IconStore = () => (
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
  { text: '🏪 Sell on Beej Spray', href: 'http://localhost:5174' },
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
  const langRef        = useRef(null)
  const recognitionRef = useRef(null)

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

      {/* ── Marquee Banner ── */}
      <div className="marquee-wrapper w-full h-8 overflow-hidden flex items-center" style={{ backgroundColor: C.primary }}>
        <div className="marquee-track flex items-center gap-16 px-4">
          {[0, 1].map(copy => (
            <div key={copy} className="flex items-center gap-16 flex-shrink-0">
              {marqueeItems.map((item, i) => (
                <span key={i} className="flex items-center gap-16">
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
        style={{ backgroundColor: C.headerBg }}
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
            onClick={() => window.location.href = 'http://localhost:5174'}
            className="md:hidden flex items-center gap-1.5 text-white text-[11px] font-bold px-2.5 py-1.5 rounded-md transition-colors flex-shrink-0"
            style={{ backgroundColor: '#FFFFFF', color: C.primary }}
          >
            <Store size={13} />
            <span>Seller</span>
          </button>

          {/* Delivery Location */}
          <button
            onClick={() => setShowAddressModal(true)}
            className="hidden lg:flex items-center gap-1 px-1.5 py-1.5 rounded-lg hover:bg-gray-50 transition-colors flex-shrink-0"
          >
            <MapPin size={16} style={{ color: C.primary }} className="flex-shrink-0" />
            <div className="text-left">
              <div className="text-[11px] leading-none mb-0.5" style={{ color: C.headerNavHover }}>
                Delivering to {addr.name.split(' ')[0]}
              </div>
              <div className="flex items-center gap-1">
                <span className="text-[13px] font-bold leading-none" style={{ color: C.headerNavText }}>
                  {addr.city} {addr.pin}
                </span>
                <ChevronDown size={10} style={{ color: C.headerNavHover }} />
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
            <input
              type="text"
              className="flex-1 px-3.5 text-sm outline-none placeholder:text-gray-400"
              style={{ color: C.gray900 }}
              placeholder="Search for seeds, pesticides, brands and more..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && navigate(`/search?q=${searchQuery}`)}
            />
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

            {/* Kisaan Vani */}
            <button onClick={() => navigate('/kisaan-vani')} className={T.navItem}>
              <Sprout size={22} style={{ color: C.headerNavHover }} />
              <span className="text-[12px] font-medium mt-0.5" style={{ color: C.headerNavHover }}>Kisaan Vani</span>
            </button>

            {/* Wishlist */}
            <button onClick={() => navigate('/wishlist')} className={T.navItem}>
              <Heart size={22} style={{ color: C.headerNavText }} />
              <span className="text-[12px] font-medium mt-0.5" style={{ color: C.headerNavText }}>Wishlist</span>
            </button>

            {/* Account */}
            <button onClick={() => navigate('/login')} className={T.navItem}>
              <User size={22} style={{ color: C.headerNavText }} />
              <span className="text-[12px] font-medium mt-0.5" style={{ color: C.headerNavText }}>Account</span>
            </button>

            {/* Cart */}
            <button onClick={() => navigate('/cart')} className={`${T.navItem} relative`}>
              <ShoppingCart size={22} style={{ color: C.headerNavText }} />
              <span className="text-[12px] font-medium mt-0.5" style={{ color: C.headerNavText }}>Cart</span>
            </button>

            {/* Divider */}
            <div className="w-px h-8 mx-2" style={{ backgroundColor: C.gray200 }} />

            {/* Become a Seller */}
            <button
              onClick={() => window.location.href = 'http://localhost:5174'}
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

      {/* ── Category Nav ── */}
      <div className="w-full border-b border-gray-200 py-3 overflow-x-hidden" style={{ backgroundColor: C.sectionBg2 }}>
        <div className="max-w-[1440px] mx-auto px-4 flex gap-3 overflow-x-auto scrollbar-hide pb-1 md:overflow-visible md:justify-evenly md:gap-2 w-full">
          {categories.map((cat, idx) => (
            <button key={idx} className="flex flex-col items-center gap-2 group flex-shrink-0" onClick={() => navigate(`/category/${cat.label.toLowerCase()}`)}>
              <div
                className="w-[72px] h-[72px] md:w-[84px] md:h-[84px] overflow-hidden border-[3px] border-gray-200 transition-all duration-200"
                onMouseEnter={e => { e.currentTarget.style.borderColor = C.primary; e.currentTarget.style.boxShadow = `0 0 0 3px ${C.primary}22` }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = '#E5E7EB'; e.currentTarget.style.boxShadow = 'none' }}
                style={{ borderRadius: '50%' }}
              >
                <img src={cat.img} alt={cat.label} className="w-full h-full object-cover" />
              </div>
              <span className="text-[13px] font-semibold text-gray-700 group-hover:text-pub-primary transition-colors text-center leading-tight whitespace-nowrap">{cat.label}</span>
            </button>
          ))}
        </div>
      </div>

{/* ── Mobile Bottom Navbar ── */}
      <div className="fixed bottom-0 inset-x-0 w-full max-w-[100vw] overflow-hidden z-[998] border-t border-gray-200 md:hidden flex" style={{ backgroundColor: C.sectionBg1 }}>
        <button onClick={() => navigate('/kisaan-vani')} className="flex-1 flex flex-col items-center justify-center py-2 gap-0.5">
          <Sprout size={22} style={{ color: C.primary }} />
          <span className="text-[10px] font-semibold" style={{ color: C.primary }}>Kisaan Vani</span>
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
        <button onClick={() => navigate('/login')} className="flex-1 flex flex-col items-center justify-center py-2 gap-0.5">
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
              <span className="text-[18px] font-bold" style={{ color: C.gray900 }}>Choose your location</span>
              <button onClick={() => setShowAddressModal(false)} className="text-gray-400 hover:text-gray-700 text-2xl leading-none">&times;</button>
            </div>

            <div className="px-6 pt-3 pb-2">
              <p className="text-[13px] leading-relaxed" style={{ color: C.gray400 }}>
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
                    <span className="text-[14px] font-bold" style={{ color: C.gray900 }}>{a.name}</span>
                    {a.isDefault && (
                      <span className="text-[9px] font-bold text-white px-1.5 py-0.5 rounded" style={{ backgroundColor: C.primary }}>DEFAULT</span>
                    )}
                  </div>
                  <p className="text-[13px] leading-snug" style={{ color: C.gray400 }}>
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