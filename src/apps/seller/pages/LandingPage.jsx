import { useNavigate } from 'react-router-dom'
import {
  Store, Package, TrendingUp, ShieldCheck, Banknote,
  Truck, BarChart2, UploadCloud, Bell, ChevronRight,
  Star, Users, MapPin, Sprout
} from 'lucide-react'
import { colors, gradients, ui, semantic } from '../theme'

// ─── Data ────────────────────────────────────────────────────────────────────

const STATS = [
  { label: 'Active Sellers',   value: '500+' },
  { label: 'Orders Delivered', value: '10,000+' },
  { label: 'States Covered',   value: '8+' },
  { label: 'Products Listed',  value: '2,000+' },
]

const STEPS = [
  {
    num: '01',
    title: 'Register & Complete KYC',
    desc: 'Sign up with your phone number, upload Aadhaar, PAN, GST, and your agri-license. Takes less than 10 minutes.',
  },
  {
    num: '02',
    title: 'List Your Products',
    desc: 'Pick from our master product database — seeds, pesticides, fertilizers, farm tools & more. Set your price and stock in one click.',
  },
  {
    num: '03',
    title: 'Receive Orders & Get Paid',
    desc: 'Get notified instantly when farmers place orders near you. Accept, pack, ship — and settlements hit your account automatically.',
  },
]

const BENEFITS = [
  {
    icon: Store,
    title: 'Free Digital Storefront',
    desc: 'Get a fully managed online shop — no website building cost, no tech headaches.',
    bg: colors.primaryLight, iconColor: colors.primary,
  },
  {
    icon: MapPin,
    title: 'Location-Based Order Routing',
    desc: 'Our algorithm automatically routes nearby farmer orders to you first based on radius and your rating.',
    bg: semantic.infoBg, iconColor: semantic.info,
  },
  {
    icon: Banknote,
    title: 'Guaranteed Payments',
    desc: 'Zero credit risk. Payments collected from buyers upfront and settled to your account on schedule.',
    bg: semantic.warningBg, iconColor: semantic.warning,
  },
  {
    icon: UploadCloud,
    title: 'Bulk Inventory Upload',
    desc: 'Manage 100s of SKUs — download our Excel template, fill prices & stock, upload instantly.',
    bg: '#F3E8FF', iconColor: '#9333EA',
  },
  {
    icon: Bell,
    title: 'Real-Time Order Alerts',
    desc: 'Never miss an order. Push notifications with sound even when the app is in background.',
    bg: '#FFF7ED', iconColor: '#F97316',
  },
  {
    icon: BarChart2,
    title: 'Analytics & GST Reports',
    desc: 'Track revenue, top products, peak hours, and download GST/sales reports in Excel or PDF.',
    bg: semantic.errorBg, iconColor: semantic.error,
  },
]

const FEATURES = [
  { icon: Package,    text: 'Manage Seeds, Pesticides, Fertilizers, Farm Tools & more' },
  { icon: Truck,      text: 'Automated shipping label & invoice generation' },
  { icon: ShieldCheck,text: 'KYC verified sellers only — trusted by farmers' },
  { icon: TrendingUp, text: 'Rating system that rewards high-performing sellers' },
  { icon: Users,      text: 'Access to a growing community of farmers' },
  { icon: Sprout,     text: 'Support for 7 agri-product categories' },
]

// ─── Sub-components ───────────────────────────────────────────────────────────

const Navbar = ({ onLogin, onRegister }) => (
  <nav style={{ backgroundColor: colors.sidebar, borderBottom: `1px solid ${colors.borderOnDark}` }}
    className="sticky top-0 z-50">
    <div className="max-w-6xl mx-auto px-5 h-16 flex items-center justify-between">
      <div className="flex items-center gap-2.5">
        <span className="text-2xl">🌾</span>
        <div>
          <p className="text-sm font-extrabold tracking-tight leading-none" style={{ color: colors.textOnDark }}>
            Beej Spray
          </p>
          <p className="text-[10px] tracking-widest leading-none mt-0.5" style={{ color: colors.textOnDarkMuted }}>
            SELLER PORTAL
          </p>
        </div>
      </div>
      <div className="flex items-center gap-3">
        <button onClick={onLogin}
          className="text-sm font-medium transition px-3 py-1.5 rounded-lg"
          style={{ color: colors.textOnDarkMuted }}
          onMouseEnter={e => e.currentTarget.style.color = colors.textOnDark}
          onMouseLeave={e => e.currentTarget.style.color = colors.textOnDarkMuted}
        >
          Log In
        </button>
        <button onClick={onRegister}
          className="text-sm font-semibold px-4 py-2 rounded-lg transition"
          style={{ backgroundColor: colors.primary, color: '#fff' }}
          onMouseEnter={e => e.currentTarget.style.backgroundColor = '#2D6A35'}
          onMouseLeave={e => e.currentTarget.style.backgroundColor = colors.primary}
        >
          Start Selling
        </button>
      </div>
    </div>
  </nav>
)

const Hero = ({ onRegister }) => (
  <section style={{ background: gradients.hero }}>
    <div className="max-w-6xl mx-auto px-5 py-20 flex flex-col items-center text-center gap-6">
      <span className="text-xs font-semibold px-4 py-1.5 rounded-full tracking-widest uppercase"
        style={{ backgroundColor: 'rgba(255,255,255,0.15)', color: '#fff' }}>
        India's Agri Marketplace for Sellers
      </span>
      <h1 className="text-4xl md:text-5xl font-extrabold leading-tight max-w-3xl" style={{ color: '#fff' }}>
        Grow Your Agri Business <br className="hidden md:block" />
        <span style={{ color: '#FDE68A' }}>Online — For Free</span>
      </h1>
      <p className="text-lg max-w-xl" style={{ color: 'rgba(255,255,255,0.80)' }}>
        Join hundreds of agri-dealers already selling Seeds, Pesticides, Fertilizers & more to farmers nearby. No upfront cost. Just sign up and start.
      </p>
      <div className="flex flex-col sm:flex-row gap-3 mt-2">
        <button onClick={onRegister}
          className="flex items-center gap-2 font-bold px-7 py-3.5 rounded-xl text-base transition"
          style={{ backgroundColor: '#FDE68A', color: colors.primary, boxShadow: ui.shadow.hero }}
          onMouseEnter={e => e.currentTarget.style.backgroundColor = '#FCD34D'}
          onMouseLeave={e => e.currentTarget.style.backgroundColor = '#FDE68A'}
        >
          Start Selling Free <ChevronRight size={18} />
        </button>
        <button onClick={onRegister}
          className="flex items-center gap-2 font-medium px-7 py-3.5 rounded-xl text-base transition"
          style={{ backgroundColor: 'rgba(255,255,255,0.10)', color: '#fff', border: '1px solid rgba(255,255,255,0.25)' }}
          onMouseEnter={e => e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.18)'}
          onMouseLeave={e => e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.10)'}
        >
          Watch How It Works
        </button>
      </div>
      <p className="text-xs mt-1" style={{ color: 'rgba(255,255,255,0.55)' }}>
        ✓ Free to join &nbsp;·&nbsp; ✓ No monthly fees &nbsp;·&nbsp; ✓ KYC in 10 minutes
      </p>
    </div>
  </section>
)

const StatsBar = () => (
  <section style={{ backgroundColor: colors.card, borderBottom: `1px solid ${colors.border}` }}>
    <div className="max-w-6xl mx-auto px-5 py-8 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
      {STATS.map(s => (
        <div key={s.label}>
          <p className="text-3xl font-extrabold" style={{ color: colors.primary }}>{s.value}</p>
          <p className="text-sm mt-1" style={{ color: colors.textSecondary }}>{s.label}</p>
        </div>
      ))}
    </div>
  </section>
)

const HowItWorks = () => (
  <section style={{ backgroundColor: colors.pageBg }} className="py-20">
    <div className="max-w-6xl mx-auto px-5">
      <div className="text-center mb-12">
        <p className="text-sm font-semibold uppercase tracking-widest mb-2" style={{ color: colors.primary }}>
          Simple Onboarding
        </p>
        <h2 className="text-3xl font-bold" style={{ color: colors.textPrimary }}>
          Start Selling in 3 Easy Steps
        </h2>
      </div>
      <div className="grid md:grid-cols-3 gap-8">
        {STEPS.map((s, i) => (
          <div key={s.num} className="relative rounded-2xl p-7"
            style={{ backgroundColor: colors.card, border: `1px solid ${colors.border}`, boxShadow: ui.shadow.card }}>
            <span className="text-5xl font-black absolute top-4 right-5 select-none"
              style={{ color: colors.primaryLight }}>
              {s.num}
            </span>
            <div className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm mb-4"
              style={{ backgroundColor: colors.primary, color: '#fff' }}>
              {i + 1}
            </div>
            <h3 className="text-lg font-bold mb-2" style={{ color: colors.textPrimary }}>{s.title}</h3>
            <p className="text-sm leading-relaxed" style={{ color: colors.textSecondary }}>{s.desc}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
)

const Benefits = () => (
  <section style={{ backgroundColor: colors.card }} className="py-20">
    <div className="max-w-6xl mx-auto px-5">
      <div className="text-center mb-12">
        <p className="text-sm font-semibold uppercase tracking-widest mb-2" style={{ color: colors.primary }}>
          Why BeejSpray
        </p>
        <h2 className="text-3xl font-bold" style={{ color: colors.textPrimary }}>
          Everything You Need to Sell Online
        </h2>
        <p className="mt-3 max-w-xl mx-auto text-sm" style={{ color: colors.textSecondary }}>
          Purpose-built for agri-dealers — not a generic marketplace. Every feature solves a real problem you face today.
        </p>
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {BENEFITS.map(b => {
          const Icon = b.icon
          return (
            <div key={b.title} className="p-6 rounded-2xl transition"
              style={{ border: `1px solid ${colors.border}`, boxShadow: ui.shadow.card }}
              onMouseEnter={e => e.currentTarget.style.boxShadow = ui.shadow.popover}
              onMouseLeave={e => e.currentTarget.style.boxShadow = ui.shadow.card}
            >
              <div className="w-11 h-11 rounded-xl flex items-center justify-center mb-4"
                style={{ backgroundColor: b.bg }}>
                <Icon size={20} style={{ color: b.iconColor }} />
              </div>
              <h3 className="font-bold mb-1.5" style={{ color: colors.textPrimary }}>{b.title}</h3>
              <p className="text-sm leading-relaxed" style={{ color: colors.textSecondary }}>{b.desc}</p>
            </div>
          )
        })}
      </div>
    </div>
  </section>
)

const FeatureList = () => (
  <section style={{ backgroundColor: colors.sidebar }} className="py-16">
    <div className="max-w-6xl mx-auto px-5">
      <div className="text-center mb-10">
        <h2 className="text-2xl font-bold" style={{ color: colors.textOnDark }}>
          Packed With Features Built for Agri-Dealers
        </h2>
      </div>
      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
        {FEATURES.map(f => {
          const Icon = f.icon
          return (
            <div key={f.text} className="flex items-start gap-3 rounded-xl px-5 py-4"
              style={{ backgroundColor: colors.borderOnDark }}>
              <Icon size={18} style={{ color: '#FDE68A', marginTop: 2, flexShrink: 0 }} />
              <p className="text-sm" style={{ color: colors.textOnDarkSubtle }}>{f.text}</p>
            </div>
          )
        })}
      </div>
    </div>
  </section>
)

const Testimonial = () => (
  <section style={{ backgroundColor: colors.pageBg }} className="py-16">
    <div className="max-w-2xl mx-auto px-5 text-center">
      <div className="flex justify-center gap-1 mb-4">
        {[...Array(5)].map((_, i) => (
          <Star key={i} size={18} style={{ color: semantic.warning, fill: semantic.warning }} />
        ))}
      </div>
      <blockquote className="text-xl font-medium leading-relaxed italic" style={{ color: colors.textPrimary }}>
        "Pehle WhatsApp pe order leta tha, bahut confusion hoti thi. Ab BeejSpray se orders automatically aate hain aur payment bhi time pe milti hai."
      </blockquote>
      <div className="mt-5">
        <p className="font-bold" style={{ color: colors.textPrimary }}>Ramesh Patel</p>
        <p className="text-sm" style={{ color: colors.textSecondary }}>Agri-Dealer, Anupgarh, Rajasthan</p>
      </div>
    </div>
  </section>
)

const BottomCTA = ({ onRegister }) => (
  <section style={{ background: gradients.hero }} className="py-20">
    <div className="max-w-xl mx-auto px-5 text-center flex flex-col items-center gap-5">
      <span className="text-4xl">🌾</span>
      <h2 className="text-3xl font-extrabold" style={{ color: '#fff' }}>
        Ready to Take Your Shop Online?
      </h2>
      <p className="text-sm" style={{ color: 'rgba(255,255,255,0.75)' }}>
        Join BeejSpray today. Free registration. Start receiving orders from farmers in your area within 24 hours of KYC approval.
      </p>
      <button onClick={onRegister}
        className="flex items-center gap-2 font-bold px-8 py-4 rounded-xl text-base transition mt-2"
        style={{ backgroundColor: '#FDE68A', color: colors.primary, boxShadow: ui.shadow.hero }}
        onMouseEnter={e => e.currentTarget.style.backgroundColor = '#FCD34D'}
        onMouseLeave={e => e.currentTarget.style.backgroundColor = '#FDE68A'}
      >
        Register as a Seller <ChevronRight size={18} />
      </button>
      <p className="text-xs" style={{ color: 'rgba(255,255,255,0.55)' }}>
        Already registered?{' '}
        <button onClick={onRegister} className="underline" style={{ color: 'rgba(255,255,255,0.75)' }}>
          Log in here
        </button>
      </p>
    </div>
  </section>
)

const Footer = () => (
  <footer style={{ backgroundColor: colors.sidebar, borderTop: `1px solid ${colors.borderOnDark}` }}
    className="py-8">
    <div className="max-w-6xl mx-auto px-5 flex flex-col md:flex-row items-center justify-between gap-3 text-sm">
      <div className="flex items-center gap-2">
        <span>🌾</span>
        <span className="font-semibold" style={{ color: colors.textOnDark }}>BeejSpray Seller Portal</span>
      </div>
      <p style={{ color: colors.textOnDarkMuted }}>© {new Date().getFullYear()} BeejSpray. All rights reserved.</p>
      <div className="flex gap-5">
        {['Terms', 'Privacy', 'Support'].map(l => (
          <a key={l} href="#"
            className="transition"
            style={{ color: colors.textOnDarkMuted }}
            onMouseEnter={e => e.currentTarget.style.color = colors.textOnDark}
            onMouseLeave={e => e.currentTarget.style.color = colors.textOnDarkMuted}
          >{l}</a>
        ))}
      </div>
    </div>
  </footer>
)

// ─── Main Page ────────────────────────────────────────────────────────────────

const LandingPage = () => {
  const navigate = useNavigate()
  const goToLogin    = () => navigate('/login')
  const goToRegister = () => navigate('/register')

  return (
    <div className="min-h-screen font-sans">
      <Navbar    onLogin={goToLogin}    onRegister={goToRegister} />
      <Hero      onRegister={goToRegister} />
      <StatsBar />
      <HowItWorks />
      <Benefits />
      <FeatureList />
      <Testimonial />
      <BottomCTA onRegister={goToRegister} />
      <Footer />
    </div>
  )
}

export default LandingPage