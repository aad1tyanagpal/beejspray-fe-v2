import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { ChevronRight, Heart, Star, ShieldCheck, Truck, RefreshCw, Phone } from 'lucide-react'

// ─── DESIGN TOKENS (matches Home.jsx) ────────────────────────
const C = {
  primary:     '#2D7A3E',
  primaryLight:'rgba(45,122,62,0.08)',
  accent:      '#FACC15',
  accentDark:  '#EAB308',
  gray50:      '#F9FAFB',
  gray100:     '#F3F4F6',
  gray200:     '#E5E7EB',
  gray400:     '#9CA3AF',
  gray500:     '#6B7280',
  gray700:     '#374151',
  gray900:     '#111827',
  red:         '#EF4444',
}

// ─── MOCK PRODUCT DATA ────────────────────────────────────────
const mockProduct = {
  id: 1,
  brand: 'SYNGENTA',
  name: 'Tomato Saho (To 3251) Hybrid Seeds',
  rating: 4.2,
  reviews: 342,
  price: 580,
  mrp: 680,
  discount: '15%',
  stock: true,
  images: [
    'https://storage.googleapis.com/storage.magicpath.ai/user/369808341603606528/figma-assets/28a08789-6d5f-488e-a912-f91ebf2d0418.png',
    'https://storage.googleapis.com/storage.magicpath.ai/user/369808341603606528/figma-assets/a844e82f-a955-4d34-bd2d-c2caa901e59a.png',
    'https://storage.googleapis.com/storage.magicpath.ai/user/369808341603606528/figma-assets/df564a08-8902-40ba-ae2f-a041ad418ac1.png',
    'https://storage.googleapis.com/storage.magicpath.ai/user/369808341603606528/figma-assets/90b8fe1e-b43d-4c9f-b3ae-e0837ea6bdde.png',
  ],
  sizes: ['10g', '50g', '100g', '500g', '1kg'],
  category: 'Seeds',
  description: [
    'Syngenta Tomato Saho (To 3251) is a premium quality hybrid tomato seed variety designed for professional farmers and commercial cultivation. This high-yielding variety produces firm, uniform fruits with excellent shelf life and disease resistance.',
    'The plants show excellent vigor and are suitable for both greenhouse and open field cultivation. Fruits are medium to large sized with attractive deep red color and superior taste quality.',
  ],
  features: [
    'High yielding hybrid variety with excellent fruit quality',
    'Disease resistant to common tomato diseases',
    'Uniform fruit size and shape throughout harvest',
    'Long shelf life and good transportability',
    'Suitable for commercial cultivation',
    'Maturity: 65-70 days from transplanting',
  ],
  specs: [
    ['Brand',         'Syngenta'],
    ['Variety',       'Tomato Saho (To 3251)'],
    ['Seed Type',     'Hybrid F1'],
    ['Crop',          'Tomato'],
    ['Maturity',      '65-70 days'],
    ['Plant Type',    'Determinate'],
    ['Fruit Weight',  '70-90 grams'],
    ['Fruit Color',   'Deep Red'],
    ['Sowing Season', 'Kharif & Rabi'],
    ['Spacing',       '60 x 45 cm'],
  ],
  reviews: [
    { id: 1, name: 'Ramesh Kumar',  rating: 5, date: 'Jan 15, 2024', verified: true,  comment: 'Excellent quality seeds! Got amazing yield from these tomato seeds. Highly recommended for commercial farming.' },
    { id: 2, name: 'Suresh Patel',  rating: 4, date: 'Dec 28, 2023', verified: true,  comment: 'Good product. Seeds germinated well within expected time. Plant growth is healthy and disease resistant.' },
    { id: 3, name: 'Vijay Singh',   rating: 5, date: 'Dec 10, 2023', verified: true,  comment: 'Best hybrid variety I have used. All plants are uniform in size and fruit quality is exceptional.' },
    { id: 4, name: 'Mohan Sharma',  rating: 4, date: 'Nov 22, 2023', verified: false, comment: 'Very satisfied with the product quality. Fast delivery and good packaging.' },
  ],
  bankOffers: [
    '10% Instant Discount on HDFC Bank Credit Card',
    '5% Cashback on SBI Credit Cards',
    'No Cost EMI available on orders above ₹3000',
  ],
}

// ─── STAR ROW ─────────────────────────────────────────────────
function Stars({ rating, size = 14 }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map(i => (
        <Star
          key={i}
          size={size}
          fill={i <= Math.round(rating) ? '#FACC15' : 'none'}
          stroke={i <= Math.round(rating) ? '#FACC15' : C.gray400}
          strokeWidth={1.5}
        />
      ))}
    </div>
  )
}

// ─── MAIN COMPONENT ───────────────────────────────────────────
export default function ProductDetail() {
  const { id } = useParams()
  const navigate = useNavigate()

  // In real life: fetch product by `id` from API / Redux
  // For now we always show the same mock product
  const product = mockProduct

  const [selectedImage, setSelectedImage] = useState(0)
  const [selectedSize,  setSelectedSize]  = useState(product.sizes[2])
  const [quantity,      setQuantity]      = useState(1)
  const [wishlisted,    setWishlisted]    = useState(false)

  const avgRating = (product.reviews.reduce((s, r) => s + r.rating, 0) / product.reviews.length).toFixed(1)
  const savings   = product.mrp - product.price

  return (
    <div className="min-h-screen" style={{ backgroundColor: C.gray100 }}>

      {/* ── Breadcrumb ─────────────────────────────────────── */}
      <div className="max-w-[1400px] mx-auto px-4 pt-4 pb-0">
        <nav className="flex items-center gap-1.5 text-sm" style={{ color: C.gray500 }}>
          <button onClick={() => navigate('/')} className="hover:underline">Home</button>
          <ChevronRight size={14} />
          <button onClick={() => navigate('/category/seeds')} className="hover:underline">{product.category}</button>
          <ChevronRight size={14} />
          <span className="font-medium" style={{ color: C.gray900 }}>{product.name}</span>
        </nav>
      </div>

      {/* ── Main Layout ────────────────────────────────────── */}
      <main className="max-w-[1400px] mx-auto px-4 py-5 flex gap-6 items-start">

        {/* ── LEFT COLUMN ──────────────────────────────────── */}
        <div className="flex-1 flex flex-col gap-5 min-w-0">

          {/* Image Gallery */}
          <div className="bg-white rounded-xl border p-5" style={{ borderColor: C.gray200 }}>
            <div className="flex gap-4">

              {/* Thumbnails */}
              <div className="flex flex-col gap-2">
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImage(idx)}
                    className="w-[68px] h-[68px] rounded-lg border-2 p-1.5 flex items-center justify-center transition-all"
                    style={{
                      borderColor: selectedImage === idx ? C.primary : C.gray200,
                      backgroundColor: selectedImage === idx ? C.primaryLight : 'white',
                    }}
                  >
                    <img src={img} alt={`View ${idx + 1}`} className="w-full h-full object-contain mix-blend-multiply" />
                  </button>
                ))}
              </div>

              {/* Main Image */}
              <div
                className="flex-1 rounded-xl border flex items-center justify-center p-6 relative"
                style={{ height: 440, borderColor: C.gray200 }}
              >
                <img
                  src={product.images[selectedImage]}
                  alt={product.name}
                  className="max-w-full max-h-full object-contain mix-blend-multiply"
                />
                {/* Wishlist */}
                <button
                  onClick={() => setWishlisted(w => !w)}
                  className="absolute top-4 right-4 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-md hover:scale-110 transition-transform"
                >
                  <Heart
                    size={20}
                    fill={wishlisted ? C.red : 'none'}
                    stroke={wishlisted ? C.red : C.gray400}
                    strokeWidth={2}
                  />
                </button>
              </div>
            </div>
          </div>

          {/* Trust Badges */}
          <div className="grid grid-cols-3 gap-3">
            {[
              { Icon: ShieldCheck, label: '100% Original',    sub: 'Verified products'      },
              { Icon: Truck,       label: 'Fast Delivery',    sub: 'Ships within 24 hours'  },
              { Icon: RefreshCw,   label: 'Easy Returns',     sub: '7-day return policy'    },
            ].map(({ Icon, label, sub }) => (
              <div key={label} className="bg-white rounded-xl border p-3 flex items-center gap-3" style={{ borderColor: C.gray200 }}>
                <div className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0" style={{ backgroundColor: C.primaryLight }}>
                  <Icon size={18} style={{ color: C.primary }} />
                </div>
                <div>
                  <p className="text-xs font-semibold" style={{ color: C.gray900 }}>{label}</p>
                  <p className="text-[11px]" style={{ color: C.gray500 }}>{sub}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Product Description */}
          <div className="bg-white rounded-xl border p-5" style={{ borderColor: C.gray200 }}>
            <h2 className="text-lg font-bold mb-4" style={{ color: C.gray900 }}>Product Description</h2>
            <div className="space-y-3 text-sm leading-relaxed" style={{ color: C.gray700 }}>
              {product.description.map((para, i) => <p key={i}>{para}</p>)}
              <h3 className="text-sm font-semibold pt-2" style={{ color: C.gray900 }}>Key Features</h3>
              <ul className="space-y-2 pl-4">
                {product.features.map((f, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ backgroundColor: C.primary }} />
                    {f}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Technical Specifications */}
          <div className="bg-white rounded-xl border p-5" style={{ borderColor: C.gray200 }}>
            <h2 className="text-lg font-bold mb-4" style={{ color: C.gray900 }}>Technical Specifications</h2>
            <table className="w-full text-sm">
              <tbody>
                {product.specs.map(([key, val], i) => (
                  <tr key={i} className="border-b last:border-0" style={{ borderColor: C.gray200 }}>
                    <td className="py-3 font-semibold w-44" style={{ color: C.gray700 }}>{key}</td>
                    <td className="py-3" style={{ color: C.gray700 }}>{val}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Customer Reviews */}
          <div className="bg-white rounded-xl border p-5" style={{ borderColor: C.gray200 }}>
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-lg font-bold" style={{ color: C.gray900 }}>Customer Reviews</h2>
              <button
                className="px-4 py-2 rounded-lg text-sm font-semibold border transition-colors"
                style={{ color: C.primary, borderColor: C.primary }}
                onMouseEnter={e => e.currentTarget.style.backgroundColor = C.primaryLight}
                onMouseLeave={e => e.currentTarget.style.backgroundColor = 'transparent'}
              >
                Write a Review
              </button>
            </div>

            {/* Rating Summary */}
            <div className="flex gap-8 p-4 rounded-xl mb-6" style={{ backgroundColor: C.gray100 }}>
              {/* Big Number */}
              <div className="text-center flex-shrink-0">
                <div className="text-5xl font-extrabold" style={{ color: C.gray900 }}>{avgRating}</div>
                <Stars rating={parseFloat(avgRating)} size={16} />
                <div className="text-xs mt-1" style={{ color: C.gray500 }}>{product.reviews.length} Reviews</div>
              </div>
              {/* Bars */}
              <div className="flex-1 space-y-1.5">
                {[5, 4, 3, 2, 1].map(star => {
                  const count = product.reviews.filter(r => r.rating === star).length
                  const pct   = (count / product.reviews.length) * 100
                  return (
                    <div key={star} className="flex items-center gap-2 text-xs" style={{ color: C.gray500 }}>
                      <span className="w-10 flex-shrink-0">{star} Star</span>
                      <div className="flex-1 h-2 rounded-full overflow-hidden" style={{ backgroundColor: C.gray200 }}>
                        <div className="h-full rounded-full transition-all" style={{ width: `${pct}%`, backgroundColor: C.accent }} />
                      </div>
                      <span className="w-5 text-right">{count}</span>
                    </div>
                  )
                })}
              </div>
            </div>

            {/* Review List */}
            <div className="space-y-4">
              {product.reviews.map(r => (
                <div key={r.id} className="pb-4 border-b last:border-0" style={{ borderColor: C.gray200 }}>
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <div className="flex items-center gap-2 text-sm font-semibold" style={{ color: C.gray900 }}>
                        {r.name}
                        {r.verified && (
                          <span className="text-[10px] font-semibold px-2 py-0.5 rounded"
                            style={{ backgroundColor: C.primaryLight, color: C.primary }}>
                            ✓ Verified
                          </span>
                        )}
                      </div>
                      <Stars rating={r.rating} size={12} />
                    </div>
                    <span className="text-xs flex-shrink-0" style={{ color: C.gray400 }}>{r.date}</span>
                  </div>
                  <p className="text-sm leading-relaxed" style={{ color: C.gray700 }}>{r.comment}</p>
                </div>
              ))}
            </div>
          </div>

        </div>{/* end LEFT COLUMN */}

        {/* ── RIGHT SIDEBAR (sticky) ────────────────────────── */}
        <div className="w-[360px] flex-shrink-0 flex flex-col gap-4 sticky top-6">

          {/* Product Info + Purchase Card */}
          <div className="bg-white rounded-xl border p-5" style={{ borderColor: C.gray200 }}>

            {/* Brand */}
            <span className="text-[10px] font-bold uppercase tracking-widest" style={{ color: C.gray500 }}>
              {product.brand}
            </span>

            {/* Name */}
            <h1 className="text-xl font-bold leading-snug mt-1 mb-3" style={{ color: C.gray900 }}>
              {product.name}
            </h1>

            {/* Rating Row */}
            <div className="flex items-center gap-2 mb-4">
              <div className="flex items-center gap-1.5 px-2 py-1 rounded-lg" style={{ backgroundColor: C.primary }}>
                <span className="text-white text-sm font-bold">{product.rating}</span>
                <Star size={11} fill="white" stroke="none" />
              </div>
              <span className="text-sm" style={{ color: C.gray500 }}>{product.reviews.length} Reviews</span>
            </div>

            {/* Pricing */}
            <div className="p-3.5 rounded-xl mb-4" style={{ backgroundColor: C.gray100 }}>
              <div className="flex items-baseline gap-2 flex-wrap">
                <span className="text-3xl font-extrabold" style={{ color: C.gray900 }}>
                  ₹{product.price.toLocaleString('en-IN')}
                </span>
                <span className="text-lg line-through" style={{ color: C.gray400 }}>
                  ₹{product.mrp.toLocaleString('en-IN')}
                </span>
                <span className="text-sm font-bold" style={{ color: C.primary }}>
                  ({product.discount} OFF)
                </span>
              </div>
              <p className="text-xs mt-1" style={{ color: C.gray500 }}>Inclusive of all taxes</p>
              <p className="text-xs font-semibold mt-0.5" style={{ color: C.primary }}>
                You save ₹{savings.toLocaleString('en-IN')}
              </p>
            </div>

            {/* Pack Size */}
            <div className="mb-4">
              <label className="text-sm font-semibold block mb-2" style={{ color: C.gray900 }}>
                Select Pack Size
              </label>
              <div className="flex flex-wrap gap-2">
                {product.sizes.map(size => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className="px-4 py-2 rounded-lg text-sm font-medium border-2 transition-all"
                    style={{
                      borderColor:     selectedSize === size ? C.primary : C.gray200,
                      backgroundColor: selectedSize === size ? C.primaryLight : 'white',
                      color:           selectedSize === size ? C.primary : C.gray700,
                      fontWeight:      selectedSize === size ? 600 : 500,
                    }}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity */}
            <div className="mb-5">
              <label className="text-sm font-semibold block mb-2" style={{ color: C.gray900 }}>Quantity</label>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setQuantity(q => Math.max(1, q - 1))}
                  className="w-9 h-9 rounded-lg border flex items-center justify-center text-lg font-bold transition-colors"
                  style={{ borderColor: C.gray200, color: C.gray700 }}
                  onMouseEnter={e => e.currentTarget.style.borderColor = C.primary}
                  onMouseLeave={e => e.currentTarget.style.borderColor = C.gray200}
                >
                  −
                </button>
                <span className="text-base font-bold w-10 text-center" style={{ color: C.gray900 }}>{quantity}</span>
                <button
                  onClick={() => setQuantity(q => q + 1)}
                  className="w-9 h-9 rounded-lg border flex items-center justify-center text-lg font-bold transition-colors"
                  style={{ borderColor: C.gray200, color: C.gray700 }}
                  onMouseEnter={e => e.currentTarget.style.borderColor = C.primary}
                  onMouseLeave={e => e.currentTarget.style.borderColor = C.gray200}
                >
                  +
                </button>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col gap-3">
              <button
                className="w-full py-3.5 rounded-xl text-base font-bold transition-colors"
                style={{ backgroundColor: C.accent, color: C.gray900 }}
                onMouseEnter={e => e.currentTarget.style.backgroundColor = C.accentDark}
                onMouseLeave={e => e.currentTarget.style.backgroundColor = C.accent}
              >
                Add to Cart
              </button>
              <button
                className="w-full py-3.5 rounded-xl text-base font-bold text-white transition-colors"
                style={{ backgroundColor: C.primary }}
                onMouseEnter={e => e.currentTarget.style.backgroundColor = '#1a5c2e'}
                onMouseLeave={e => e.currentTarget.style.backgroundColor = C.primary}
              >
                Buy Now
              </button>
            </div>

            {/* Stock Status */}
            <div className="mt-4 flex items-center gap-2 px-3 py-2.5 rounded-lg" style={{ backgroundColor: C.primaryLight }}>
              <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: C.primary }} />
              <span className="text-sm font-medium" style={{ color: C.primary }}>
                In Stock · Ships within 24 hours
              </span>
            </div>
          </div>

          {/* Bank Offers */}
          <div className="bg-white rounded-xl border p-4" style={{ borderColor: C.gray200 }}>
            <h3 className="text-sm font-bold mb-3" style={{ color: C.gray900 }}>Bank Offers</h3>
            <ul className="space-y-2">
              {product.bankOffers.map((offer, i) => (
                <li key={i} className="flex items-start gap-2 text-xs leading-relaxed" style={{ color: C.gray700 }}>
                  <span className="font-bold mt-0.5 flex-shrink-0" style={{ color: C.primary }}>•</span>
                  {offer}
                </li>
              ))}
            </ul>
          </div>

          {/* Expert Advice */}
          <div className="rounded-xl p-4 text-white text-center" style={{ backgroundColor: C.primary }}>
            <Phone size={22} className="mx-auto mb-2 opacity-90" />
            <h3 className="text-sm font-bold mb-1">Need Expert Advice?</h3>
            <p className="text-xs opacity-80 mb-3">Connect with our agricultural experts for personalised recommendations</p>
            <button
              className="w-full py-2.5 rounded-lg text-sm font-bold transition-colors"
              style={{ backgroundColor: 'white', color: C.primary }}
              onMouseEnter={e => e.currentTarget.style.backgroundColor = C.gray100}
              onMouseLeave={e => e.currentTarget.style.backgroundColor = 'white'}
            >
              Call Now: 1800-123-4567
            </button>
          </div>

        </div>{/* end RIGHT SIDEBAR */}
      </main>
    </div>
  )
}