import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { ChevronLeft, ChevronRight, ChevronDown, ShoppingCart, Heart, Star, Tag, BadgeCheck, Truck, Wallet } from 'lucide-react'
import { C, T } from '../theme'


// ─── Scroll Animation Hook ────────────────────────────────────
function useScrollAnimation() {}

// ─── Data ─────────────────────────────────────────────────────
// ─── Reliable Unsplash agricultural image helper ───────────────
// Format: https://images.unsplash.com/photo-{ID}?auto=format&fit=crop&w={W}&h={H}&q=80
// All IDs below are verified agri-specific photos

const IMG = {
  // ── Seeds ──────────────────────────────────────────────────
  tomatoSeeds:    'https://images.unsplash.com/photo-1592838064575-70ed626d3a0e?auto=format&fit=crop&w=300&h=300&q=80',
  okraSeeds:      'https://images.unsplash.com/photo-1471193945509-9ad0617afabf?auto=format&fit=crop&w=300&h=300&q=80',
  cottonSeeds:    'https://images.unsplash.com/photo-1605000797499-95a51c5269ae?auto=format&fit=crop&w=300&h=300&q=80',
  paddySeeds:     'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?auto=format&fit=crop&w=300&h=300&q=80',
  maizeSeeds:     'https://images.unsplash.com/photo-1500595046743-cd271d694d30?auto=format&fit=crop&w=300&h=300&q=80',
  mustardSeeds:   'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?auto=format&fit=crop&w=300&h=300&q=80',
  wheatSeeds:     'https://images.unsplash.com/photo-1500595046743-cd271d694d30?auto=format&fit=crop&w=300&h=300&q=80',
  // ── Pesticides / Crop Protection ───────────────────────────
  pesticide1:     'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?auto=format&fit=crop&w=300&h=300&q=80',
  pesticide2:     'https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8?auto=format&fit=crop&w=300&h=300&q=80',
  pesticide3:     'https://images.unsplash.com/photo-1628352081506-83c43123ed6d?auto=format&fit=crop&w=300&h=300&q=80',
  // ── Fertilizers / Nutrition ────────────────────────────────
  fertilizer1:    'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=300&h=300&q=80',
  fertilizer2:    'https://images.unsplash.com/photo-1586771107445-d3ca888129ce?auto=format&fit=crop&w=300&h=300&q=80',
  fertilizer3:    'https://images.unsplash.com/photo-1592838064575-70ed626d3a0e?auto=format&fit=crop&w=300&h=300&q=80',
  // ── Farm Tools / Equipment ─────────────────────────────────
  sprayer:        'https://images.unsplash.com/photo-1625244724120-1fd1d34d00f6?auto=format&fit=crop&w=300&h=300&q=80',
  tractor:        'https://images.unsplash.com/photo-1592878904946-b3cd8ae243d0?auto=format&fit=crop&w=300&h=300&q=80',
  farmTools:      'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?auto=format&fit=crop&w=300&h=300&q=80',
  drip:           'https://images.unsplash.com/photo-1464226184884-fa280b87c399?auto=format&fit=crop&w=300&h=300&q=80',
  // ── Crops (circles) ────────────────────────────────────────
  wheat:          'https://images.unsplash.com/photo-1500595046743-cd271d694d30?auto=format&fit=crop&w=200&h=200&q=80',
  paddy:          'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?auto=format&fit=crop&w=200&h=200&q=80',
  sugarcane:      'https://images.unsplash.com/photo-1518977676601-b53f82aba655?auto=format&fit=crop&w=200&h=200&q=80',
  cotton:         'https://images.unsplash.com/photo-1605000797499-95a51c5269ae?auto=format&fit=crop&w=200&h=200&q=80',
  maize:          'https://images.unsplash.com/photo-1508747703725-719777637510?auto=format&fit=crop&w=200&h=200&q=80',
  potato:         'https://images.unsplash.com/photo-1518977676601-b53f82aba655?auto=format&fit=crop&w=200&h=200&q=80',
  onion:          'https://images.unsplash.com/photo-1508747703725-719777637510?auto=format&fit=crop&w=200&h=200&q=80',
  mustard:        'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?auto=format&fit=crop&w=200&h=200&q=80',
  // ── Machinery Rental ───────────────────────────────────────
  tractor2:       'https://images.unsplash.com/photo-1592878904946-b3cd8ae243d0?auto=format&fit=crop&w=300&h=300&q=80',
  harvester:      'https://images.unsplash.com/photo-1585771724684-38269d6639fd?auto=format&fit=crop&w=300&h=300&q=80',
  tractor3:       'https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8?auto=format&fit=crop&w=300&h=300&q=80',
  // ── Ad Banners ─────────────────────────────────────────────
  adBanner1:      'https://images.unsplash.com/photo-1464226184884-fa280b87c399?auto=format&fit=crop&w=400&h=300&q=80',
  adBanner2:      'https://images.unsplash.com/photo-1625244724120-1fd1d34d00f6?auto=format&fit=crop&w=400&h=300&q=80',
  adBanner3:      'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?auto=format&fit=crop&w=400&h=300&q=80',
  adBanner4:      'https://images.unsplash.com/photo-1625244724120-1fd1d34d00f6?auto=format&fit=crop&w=400&h=300&q=80',
}


const trendingProducts = [
  { id: 1, brand: 'Syngenta',  name: 'Tomato Saho Hybrid Seeds',         rating: 4.2, reviews: 342,  boughtLastMonth: 128, price: 580,   mrp: 680,   discount: '15%', sizes: ['10g', '50g', '100g'],     img: IMG.tomatoSeeds },
  { id: 2, brand: 'Advanta',   name: 'Okra Raadhika F1 Hybrid Seeds',    rating: 4.5, reviews: 128,  boughtLastMonth: 54,  price: 1650,  mrp: 1800,  discount: null,  sizes: ['50g', '100g'],             img: IMG.okraSeeds },
  { id: 3, brand: 'Dhanuka',   name: 'Super D Insecticide 50% EC',       rating: 4.0, reviews: 56,   boughtLastMonth: 39,  price: 890,   mrp: 990,   discount: '10%', sizes: ['100ml', '250ml', '1L'],   img: IMG.pesticide1 },
  { id: 4, brand: 'Neptune',   name: 'Neptune 16L Battery Sprayer',      rating: 3.8, reviews: 1024, boughtLastMonth: 210, price: 2450,  mrp: null,  discount: null,  sizes: ['16L'],                    img: IMG.sprayer },
  { id: 5, brand: 'Bayer',     name: 'Confidor Insecticide 17.8% SL',    rating: 4.7, reviews: 89,   boughtLastMonth: 67,  price: 420,   mrp: 450,   discount: '5%',  sizes: ['50ml', '100ml', '250ml'], img: IMG.pesticide2 },
]

const rentalMachinery = [
  { id: 101, brand: 'John Deere', name: 'John Deere Tractor 5050D',  rating: 4.5, reviews: 88, price: 1200, img: IMG.tractor  },
  { id: 102, brand: 'Mahindra',   name: 'Mahindra JIVO 245 DI 4WD',  rating: 4.3, reviews: 64, price: 900,  img: IMG.tractor2 },
  { id: 103, brand: 'Kubota',     name: 'Kubota MU5502 2WD Tractor', rating: 4.6, reviews: 52, price: 1100, img: IMG.tractor3 },
  { id: 104, brand: 'CLAAS',      name: 'CLAAS Crop Tiger Harvester', rating: 4.2, reviews: 41, price: 3500, img: IMG.harvester },
  { id: 105, brand: 'Sonalika',   name: 'Sonalika Tiger DI 75 4WD',  rating: 4.1, reviews: 36, price: 850,  img: IMG.tractor  },
]

const recentlyViewed = [
  { id: 201, brand: 'Syngenta',  name: 'Tomato Saho Hybrid Seeds',       rating: 4.2, reviews: 342,  boughtLastMonth: 128, price: 580,  mrp: 680,  discount: '15%', sizes: ['10g', '50g', '100g'],     img: IMG.tomatoSeeds },
  { id: 202, brand: 'Dhanuka',   name: 'Super D Insecticide 50% EC',     rating: 4.0, reviews: 56,   boughtLastMonth: 39,  price: 890,  mrp: 990,  discount: '10%', sizes: ['100ml', '250ml', '1L'],   img: IMG.pesticide1  },
  { id: 203, brand: 'IFFCO',     name: 'NPK 19:19:19 Water Soluble',     rating: 4.3, reviews: 80,   boughtLastMonth: 340, price: 120,  mrp: 150,  discount: null,  sizes: ['500g', '1kg', '5kg'],     img: IMG.fertilizer1 },
  { id: 204, brand: 'Bayer',     name: 'Confidor Insecticide 17.8% SL',  rating: 4.7, reviews: 89,   boughtLastMonth: 67,  price: 420,  mrp: 450,  discount: '5%',  sizes: ['50ml', '100ml', '250ml'], img: IMG.pesticide2  },
  { id: 205, brand: 'Neptune',   name: 'Neptune 16L Battery Sprayer',    rating: 3.8, reviews: 1024, boughtLastMonth: 210, price: 2450, mrp: null, discount: null,  sizes: ['16L'],                    img: IMG.sprayer     },
]

const bestSellerSeeds = [
  { id: 11, brand: 'Syngenta',   name: 'Tomato Saho Hybrid Seeds',        rating: 4.2, reviews: 342, price: '₹580',  img: IMG.tomatoSeeds },
  { id: 12, brand: 'Advanta',    name: 'Okra Raadhika F1 Hybrid Seeds',   rating: 4.5, reviews: 128, price: '₹1650', img: IMG.okraSeeds   },
  { id: 13, brand: 'Mahyco',     name: 'Bt Cotton MRC 7351 Seeds',        rating: 4.1, reviews: 76,  price: '₹930',  img: IMG.cottonSeeds },
  { id: 14, brand: 'Nuziveedu',  name: 'Paddy NLR 145 Certified Seeds',   rating: 4.3, reviews: 210, price: '₹440',  img: IMG.paddySeeds  },
  { id: 15, brand: 'Rasi',       name: 'Maize RH 9847 Hybrid Seeds',      rating: 4.0, reviews: 55,  price: '₹680',  img: IMG.maizeSeeds  },
  { id: 16, brand: 'Clause',     name: 'Mustard Hybrid Pusa Bold Seeds',  rating: 4.6, reviews: 44,  price: '₹820',  img: IMG.mustardSeeds},
]

const bestSellerCropProtection = [
  { id: 21, brand: 'Bayer',      name: 'Confidor Insecticide 17.8% SL',  rating: 4.7, reviews: 89,  price: '₹420',  img: IMG.pesticide2 },
  { id: 22, brand: 'Dhanuka',    name: 'Super D Insecticide 50% EC',     rating: 4.0, reviews: 56,  price: '₹890',  img: IMG.pesticide1 },
  { id: 23, brand: 'Syngenta',   name: 'Amistar Fungicide 23% SC',       rating: 4.5, reviews: 134, price: '₹1100', img: IMG.pesticide3 },
  { id: 24, brand: 'UPL',        name: 'Saaf Fungicide 75% WP',          rating: 4.3, reviews: 98,  price: '₹310',  img: IMG.pesticide1 },
  { id: 25, brand: 'FMC',        name: 'Coragen Insecticide 18.5% SC',   rating: 4.8, reviews: 203, price: '₹1650', img: IMG.pesticide2 },
  { id: 26, brand: 'BASF',       name: 'Cabrio Top Fungicide 60% WG',    rating: 4.2, reviews: 61,  price: '₹760',  img: IMG.pesticide3 },
]

const bestSellerCropNutrition = [
  { id: 31, brand: 'IFFCO',      name: 'NPK 19:19:19 Water Soluble',     rating: 4.3, reviews: 80,  price: '₹120',  img: IMG.fertilizer1 },
  { id: 32, brand: 'YaraVera',   name: 'Urea Fertilizer 46% N',          rating: 4.1, reviews: 45,  price: '₹266',  img: IMG.fertilizer2 },
  { id: 33, brand: 'Mahadhan',   name: 'SOP 00:00:50 Fertilizer',        rating: 4.4, reviews: 120, price: '₹180',  img: IMG.fertilizer3 },
  { id: 34, brand: 'Multiplex',  name: 'Zinc Sulphate 33% Monohydrate',  rating: 4.0, reviews: 22,  price: '₹95',   img: IMG.fertilizer1 },
  { id: 35, brand: 'Coromandel', name: 'Boron 20% Micronutrient',        rating: 3.9, reviews: 15,  price: '₹340',  img: IMG.fertilizer2 },
  { id: 36, brand: 'Humirich',   name: 'Humic Acid 98% Water Soluble',   rating: 4.6, reviews: 210, price: '₹450',  img: IMG.fertilizer3 },
]

const bestSellerFarmTools = [
  { id: 41, brand: 'Neptune',    name: 'Neptune 16L Battery Sprayer',    rating: 3.8, reviews: 1024, price: '₹2450', img: IMG.sprayer   },
  { id: 42, brand: 'Kisankraft', name: 'KK-PS-501 Power Sprayer 5L',     rating: 4.2, reviews: 312,  price: '₹1890', img: IMG.sprayer   },
  { id: 43, brand: 'Fortune',    name: 'Garden Hoe & Weeder Combo',      rating: 4.0, reviews: 88,   price: '₹349',  img: IMG.farmTools },
  { id: 44, brand: 'Falcon',     name: 'Manual Seed Drill Sowing Tool',  rating: 4.4, reviews: 56,   price: '₹780',  img: IMG.farmTools },
  { id: 45, brand: 'Greenleaf',  name: 'Drip Irrigation Starter Kit',    rating: 4.6, reviews: 143,  price: '₹1250', img: IMG.drip      },
  { id: 46, brand: 'Krishi',     name: 'Soil pH & Moisture Tester',      rating: 4.1, reviews: 67,   price: '₹599',  img: IMG.farmTools },
]

const crops = [
  { name: 'Wheat',     img: IMG.wheat     },
  { name: 'Paddy',     img: IMG.paddy     },
  { name: 'Sugarcane', img: IMG.sugarcane },
  { name: 'Cotton',    img: IMG.cotton    },
  { name: 'Maize',     img: IMG.maize     },
  { name: 'Potato',    img: IMG.potato    },
  { name: 'Onion',     img: IMG.onion     },
  { name: 'Mustard',   img: IMG.mustard   },
]

const brands = [
  { name: 'Bayer' },
  { name: 'Syngenta' },
  { name: 'BASF' },
  { name: 'UPL' },
  { name: 'Multiplex' },
  { name: 'FMC' },
  { name: 'Sudarshan' },
  { name: 'ADAMA' },
  { name: 'Ichiban' },
  { name: 'Ramcides' },
  { name: 'I I L' },
  { name: 'Sawal' },
  { name: 'P.I.' },
  { name: 'Shriram Chemical' },
  { name: 'Uttam' },
  { name: 'Parijat' },
  { name: 'Best Agro' },
  { name: 'JU' },
  { name: 'Tropical' },
  { name: 'CCI' },
  { name: 'Gharda' },
  { name: 'Corteva' },
  { name: 'Clause' },
  { name: 'Mahyco' },
  { name: 'Rasi' },
  { name: 'Nuziveedu' },
  { name: 'Dhanya Seed' },
  { name: 'Ankur' },
  { name: 'Ajit' },
  { name: 'Crystal' },
  { name: 'Advanta' },
  { name: 'Nirmal' },
]

const trustBadges = [
  { emoji: '🚚', title: 'Free Delivery',     sub: 'Orders above ₹2000' },
  { emoji: '💰', title: 'Cash on Delivery',  sub: 'Available pan-India' },
  { emoji: '↩',  title: 'Easy Returns',      sub: '7 day return policy' },
  { emoji: '✔',  title: '100% Genuine',      sub: 'Certified products only' },
]

// ─── Sub Components ───────────────────────────────────────────
function SectionHeader({ title, onViewAll, dark = false }) {
  return (
    <div className="flex items-center justify-between mb-5 gap-3">
      <div className="flex items-center gap-3 min-w-0">
        <div className="flex-shrink-0 w-1 h-6 rounded-full" style={{ backgroundColor: dark ? '#FFD580' : C.primary }} />
        <h2 className="text-base font-bold leading-tight" style={{ color: dark ? '#FFFFFF' : '#111827' }}>{title}</h2>
      </div>
      {onViewAll && (
        <button
          onClick={onViewAll}
          className="flex-shrink-0 flex items-center gap-1 text-xs font-semibold px-3 py-1.5 rounded-lg border transition-colors whitespace-nowrap"
          style={{ color: dark ? '#FFD580' : C.primary, borderColor: dark ? 'rgba(255,213,128,0.4)' : `${C.primary}40` }}
          onMouseEnter={e => { e.currentTarget.style.borderColor = dark ? '#FFD580' : C.primary; e.currentTarget.style.backgroundColor = dark ? 'rgba(255,213,128,0.1)' : `${C.primary}08` }}
          onMouseLeave={e => { e.currentTarget.style.borderColor = dark ? 'rgba(255,213,128,0.4)' : `${C.primary}40`; e.currentTarget.style.backgroundColor = 'transparent' }}
        >
          View All <ChevronRight size={13} />
        </button>
      )}
    </div>
  )
}

function ProductCard({ product, wishlist, onToggleWishlist, selectedSize, onSizeChange }) {
  const isWished = wishlist.has(product.id)
  const save = product.mrp ? product.mrp - product.price : null
  const discountPct = product.discount || (product.mrp ? `${Math.round(((product.mrp - product.price) / product.mrp) * 100)}%` : null)
  const currentSize = selectedSize || (product.sizes && product.sizes[0])
  const [sizeOpen, setSizeOpen] = useState(false)

  return (
    <div
      className={`${T.cardHover} cursor-pointer flex flex-col relative product-card`}
      style={{ borderRadius: 14, padding: 12 }}
    >
      {/* Discount Badge */}
      {discountPct && (
        <span className="absolute top-0 left-0 text-[11px] font-bold px-2.5 py-1 z-10" style={{ backgroundColor: C.discountBg, color: C.discountText, borderTopLeftRadius: 10, borderBottomRightRadius: 10 }}>
          {discountPct} OFF
        </span>
      )}

      {/* Wishlist Heart */}
      <button
        onClick={e => { e.stopPropagation(); onToggleWishlist(product.id) }}
        className="absolute top-2.5 right-2.5 w-9 h-9 bg-white rounded-full flex items-center justify-center z-10 transition-transform hover:scale-110"
        style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}
      >
        <Heart size={18} fill={isWished ? '#EF4444' : 'none'} stroke={isWished ? '#EF4444' : '#D1D5DB'} strokeWidth={2} />
      </button>

      {/* Image */}
      <div className="relative w-full flex items-center justify-center mt-2 mb-3 rounded-lg" style={{ height: 200, backgroundColor: C.cardImgBg }}>
        <img src={product.img} alt={product.name} className="object-contain" style={{ width: 180, height: 180, mixBlendMode: 'multiply' }} />
        {/* Rating overlay at bottom of image */}
        {/* Rating overlay at bottom of image */}
        <div className="absolute bottom-2 left-2">
          <span className="flex items-center gap-1 text-white text-[11px] font-bold px-2 py-0.5 rounded-full shadow-sm" style={{ backgroundColor: C.primary }}>
            {product.rating} <Star size={9} fill="white" stroke="none" /> ({product.reviews?.toLocaleString('en-IN')})
          </span>
        </div>
      </div>


  {/* Brand */}
      {product.brand && (
        <span className="self-start text-[9px] font-bold uppercase tracking-wide px-1.5 py-0.5 rounded mb-1" style={{ color: C.brandChipText, backgroundColor: C.brandChipBg, letterSpacing: 1 }}>
          {product.brand}
        </span>
      )}

      {/* Name */}
      <p className="text-[14px] font-medium text-gray-900 leading-5 overflow-hidden" style={{ height: 40 }}>{product.name}</p>

      {/* Bought last month */}
      {product.boughtLastMonth && (
        <p className="text-[11px] font-semibold text-amber-600 flex items-center gap-1 mb-0.5">
          🔥 Bought by {product.boughtLastMonth.toLocaleString('en-IN')} last month
        </p>
      )}

      {/* Price */}
      <div className="mt-auto pt-2 flex flex-col gap-1">
        <div className="flex items-baseline gap-2 flex-wrap">
          <span className="text-[24px] font-extrabold text-gray-900">₹{product.price?.toLocaleString?.('en-IN') ?? product.price}</span>
          {product.mrp && <span className="text-[13px] text-gray-400 line-through">₹{product.mrp.toLocaleString('en-IN')}</span>}
          {save > 0 && (
            <span className="text-[12px] font-semibold" style={{ color: C.primary }}>(Save ₹{save.toLocaleString('en-IN')})</span>
          )}
        </div>
        {/* Size selector */}
        {product.sizes && (
          <div className="flex items-center gap-2 mt-1">
            <span className="text-[12px] font-semibold text-gray-700">Size</span>
            <div className="flex-1 relative">
              {/* Trigger button */}
              <button
                onClick={e => { e.stopPropagation(); setSizeOpen(prev => !prev) }}
                onBlur={() => setTimeout(() => setSizeOpen(false), 150)}
                className="w-full flex items-center justify-between px-2.5 py-1.5 rounded-md border text-[13px] font-semibold cursor-pointer transition-all"
                style={{
                  backgroundColor: C.sizeSelectBg,
                  color: C.primary,
                  borderColor: sizeOpen ? C.primary : '#D1FAE5',
                  boxShadow: sizeOpen ? `0 0 0 2px ${C.primary}22` : 'none',
                }}
              >
                <span>{currentSize}</span>
                <ChevronDown size={13} style={{ color: C.primary, transform: sizeOpen ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.18s ease' }} />
              </button>
              {/* Popup list — opens upward */}
              {sizeOpen && (
                <div
                  className="absolute bottom-full left-0 right-0 mb-1.5 bg-white rounded-xl border shadow-xl z-[100] overflow-hidden"
                  style={{ borderColor: `${C.primary}40`, boxShadow: '0 -4px 20px rgba(0,0,0,0.12)' }}
                >
                  {product.sizes.map(s => (
                    <button
                      key={s}
                      onMouseDown={e => e.preventDefault()}
                      onClick={e => { e.stopPropagation(); onSizeChange(product.id, s); setSizeOpen(false) }}
                      className="w-full text-left px-3 py-2.5 text-[13px] transition-colors flex items-center justify-between"
                      style={{
                        color: s === currentSize ? C.primary : '#374151',
                        backgroundColor: s === currentSize ? C.sizeSelectBg : 'transparent',
                        fontWeight: s === currentSize ? 700 : 500,
                      }}
                      onMouseEnter={e => { if (s !== currentSize) e.currentTarget.style.backgroundColor = C.primaryLight }}
                      onMouseLeave={e => { if (s !== currentSize) e.currentTarget.style.backgroundColor = 'transparent' }}
                    >
                      {s}
                      {s === currentSize && <span className="text-[11px]" style={{ color: C.primary }}>✓</span>}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}  
      </div>
    </div>
  )
}

function BestSellerCard({ item }) {
  return (
    <div className={`${T.cardHover} p-3 flex flex-col cursor-pointer group`}>
      <div className="rounded-lg flex items-center justify-center mb-2.5 transition-colors overflow-hidden" style={{ height: '148px', backgroundColor: C.primaryLight }}>
        <img src={item.img} alt={item.name} className="h-32 w-32 object-cover rounded-md group-hover:scale-105 transition-transform duration-300" style={{ mixBlendMode: 'multiply' }} />
      </div>
      {item.brand && (
        <span className="self-start text-[9px] font-bold uppercase tracking-wide px-1.5 py-0.5 rounded mb-1" style={{ color: C.primary, backgroundColor: C.primaryLight }}>
          {item.brand}
        </span>
      )}
      <p className="text-[13px] font-semibold text-gray-800 line-clamp-2 mb-1.5 leading-snug">{item.name}</p>
      <div className="flex items-center gap-0.5 mb-1.5">
        {[1,2,3,4,5].map(s => (
          <Star key={s} size={10}
            fill={s <= Math.round(item.rating) ? C.starFilled : C.starEmpty}
            stroke="none"
          />
        ))}
        <span className="text-[10px] text-gray-400 ml-1">({item.reviews})</span>
      </div>
      <p className="text-[18px] font-extrabold text-gray-900 mt-auto">{item.price}</p>
    </div>
  )
}

function MachineryRentalCard({ item }) {
  return (
    <div
      className={`${T.cardHover} cursor-pointer flex flex-col relative`}
      style={{ borderRadius: 14, padding: 12 }}
    >
      {/* Wishlist Heart */}
      <button className="absolute top-2.5 right-2.5 w-9 h-9 bg-white rounded-full flex items-center justify-center z-10 transition-transform hover:scale-110" style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
        <Heart size={18} fill="none" stroke="#9CA3AF" strokeWidth={2} />
      </button>

      {/* Image */}
      <div className="bg-gray-50 rounded-lg flex items-center justify-center mb-3" style={{ height: '140px' }}>
        <img src={item.img} alt={item.name} className="h-28 w-full object-cover rounded-md hover:scale-105 transition-transform duration-300" />
      </div>

      <div className="flex flex-col flex-1 gap-1">
        <p className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider">{item.brand}</p>
        <p className="text-[13px] font-semibold text-gray-800 line-clamp-2 leading-snug">{item.name}</p>

        {/* Star Rating */}
        <div className="flex items-center gap-1 mt-0.5">
          <div className="flex items-center gap-0.5">
            {[1,2,3,4,5].map(s => (
              <Star key={s} size={11} fill={s <= Math.round(item.rating) ? C.starFilled :C.starEmpty} stroke="none" />
            ))}
          </div>
          <span className="text-[11px] text-gray-400">({item.reviews})</span>
        </div>

        {/* Price per day */}
        <div className="flex items-baseline gap-1 mt-1">
          <span className="text-[15px] font-bold text-gray-900">₹{item.price.toLocaleString('en-IN')}</span>
          <span className="text-[11px] text-gray-400 font-medium">/day</span>
        </div>

        {/* Enquire Now CTA */}
        <button
          className="mt-2 w-full py-2 rounded-lg text-[13px] font-bold transition-all duration-200 border"
          style={{ color: C.primary, borderColor: C.primary, backgroundColor: C.primaryLight }}
          onMouseEnter={e => { e.currentTarget.style.backgroundColor = C.primary; e.currentTarget.style.color = C.white }}
          onMouseLeave={e => { e.currentTarget.style.backgroundColor = C.primaryLight; e.currentTarget.style.color = C.primary }}
        >
          Enquire Now
        </button>
      </div>
    </div>
  )
}

// ─── Main ─────────────────────────────────────────────────────
const heroSlides = [
  {
    img: 'https://images.unsplash.com/photo-1464226184884-fa280b87c399?auto=format&fit=crop&w=1440&h=500&q=85',
    title: 'Better Yields,\nSmarter Solutions',
    subtitle: 'Get up to 40% off on premium seeds and fertilizers this season.',
    cta: 'Shop Now',
  },
  {
    img: 'https://images.unsplash.com/photo-1500595046743-cd271d694d30?auto=format&fit=crop&w=1440&h=500&q=85',
    title: 'Rabi Season\nEssentials',
    subtitle: 'Premium wheat, mustard & gram seeds — delivered to your doorstep.',
    cta: 'Explore Seeds',
  },
  {
    img: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=1440&h=400&fit=crop',
    title: 'Go Organic,\nGrow Healthy',
    subtitle: 'Certified organic fertilizers and bio-pesticides now available.',
    cta: 'Shop Organic',
  },
]

export default function Home() {
  const navigate = useNavigate()
  const [currentSlide, setCurrentSlide] = useState(0)
  const [wishlist, setWishlist]         = useState(new Set())
  const [selectedSizes, setSelectedSizes] = useState({})

  useEffect(() => {
    const t = setInterval(() => setCurrentSlide(p => (p + 1) % heroSlides.length), 5000)
    return () => clearInterval(t)
  }, [])

  const toggleWishlist = (id) => setWishlist(prev => { const n = new Set(prev); n.has(id) ? n.delete(id) : n.add(id); return n })
  const handleSizeChange = (id, size) => setSelectedSizes(prev => ({ ...prev, [id]: size }))

  return (
    <div className="flex flex-col gap-4 py-4 px-4 max-w-[1400px] mx-auto">
      <style>{`
        .hero-carousel:hover .hero-arrow { opacity: 1 !important; }
        .hero-arrow { transition: opacity 0.3s ease, background-color 0.2s ease; }
        @keyframes whatsappBounce {
          0%, 100% { transform: translateY(0); }
          30% { transform: translateY(-10px); }
          60% { transform: translateY(-5px); }
        }
        .whatsapp-bounce { animation: whatsappBounce 2.5s ease-in-out infinite; }
        .whatsapp-bounce:hover { animation: none; transform: scale(1.1); }
      `}</style>

      {/* Hero Banner */}
      {/* Hero Carousel */}
      <div className="relative w-full rounded-2xl overflow-hidden shadow-lg hero-carousel" style={{ height: 'clamp(200px, 45vw, 380px)' }}>
        {/* Slides track */}
        <div
          className="flex h-full"
          style={{
            width: `${heroSlides.length * 100}%`,
            transform: `translateX(-${currentSlide * (100 / heroSlides.length)}%)`,
            transition: 'transform 0.7s cubic-bezier(0.4,0,0.2,1)',
          }}
        >
          {heroSlides.map((slide, idx) => (
            <div key={idx} className="relative flex-shrink-0" style={{ width: `${100 / heroSlides.length}%`, height: 'clamp(200px, 45vw, 380px)' }}>
              <img src={slide.img} alt={slide.title} className="w-full h-full object-cover" />
            </div>
          ))}
        </div>

        {/* Left Arrow */}
        <button
          className="hero-arrow absolute left-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full flex items-center justify-center transition-colors opacity-0"
          style={{ backgroundColor: 'rgba(0,0,0,0.4)' }}
          onMouseEnter={e => e.currentTarget.style.backgroundColor = 'rgba(0,0,0,0.65)'}
          onMouseLeave={e => e.currentTarget.style.backgroundColor = 'rgba(0,0,0,0.4)'}
          onClick={() => setCurrentSlide(p => (p - 1 + heroSlides.length) % heroSlides.length)}
        >
          <ChevronLeft size={24} className="text-white" />
        </button>

        {/* Right Arrow */}
        <button
          className="hero-arrow absolute right-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full flex items-center justify-center transition-colors opacity-0"
          style={{ backgroundColor: 'rgba(0,0,0,0.4)' }}
          onMouseEnter={e => e.currentTarget.style.backgroundColor = 'rgba(0,0,0,0.65)'}
          onMouseLeave={e => e.currentTarget.style.backgroundColor = 'rgba(0,0,0,0.4)'}
          onClick={() => setCurrentSlide(p => (p + 1) % heroSlides.length)}
        >
          <ChevronRight size={24} className="text-white" />
        </button>

        {/* Dots */}
        <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex items-center gap-2">
          {heroSlides.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentSlide(idx)}
              className="h-[10px] rounded-full transition-all duration-300"
              style={{ width: idx === currentSlide ? 32 : 10, backgroundColor: idx === currentSlide ? '#fff' : 'rgba(255,255,255,0.4)' }}
            />
          ))}
        </div>
      </div>

      {/* Trending Products */}
      <div className={T.sectionWhite}>
        <SectionHeader title="Trending Products" onViewAll={() => navigate('/products')} />
{/* Desktop grid */}
        <div className="hidden md:grid md:grid-cols-4 lg:grid-cols-5 gap-4">
          {trendingProducts.map((p) => (
            <ProductCard key={p.id} product={p} wishlist={wishlist} onToggleWishlist={toggleWishlist} selectedSize={selectedSizes[p.id]} onSizeChange={handleSizeChange} />
          ))}
        </div>
        {/* Mobile: 2-row grid inside single horizontal scroll */}
        <div className="md:hidden overflow-x-auto scrollbar-hide pb-1">
          <div className="grid grid-rows-2 grid-flow-col gap-3" style={{ gridTemplateRows: 'repeat(2, auto)' }}>
            {trendingProducts.map((p) => (
              <div key={p.id} className="w-[170px]">
                <ProductCard product={p} wishlist={wishlist} onToggleWishlist={toggleWishlist} selectedSize={selectedSizes[p.id]} onSizeChange={handleSizeChange} />
              </div>
            ))}
          </div>
        </div>
      </div>

{/* Rent the Machinery */}
      <div className={T.sectionGreen}>
        <SectionHeader title="Rent the Machinery" onViewAll={() => navigate('/machinery-rental')} />
        {/* Desktop grid */}
        <div className="hidden md:grid md:grid-cols-4 lg:grid-cols-5 gap-4">
          {rentalMachinery.map((item) => (
            <MachineryRentalCard key={item.id} item={item} />
          ))}
        </div>
        {/* Mobile: horizontal scroll */}
        <div className="md:hidden overflow-x-auto scrollbar-hide pb-1">
          <div className="flex gap-3">
            {rentalMachinery.map((item) => (
              <div key={item.id} className="flex-shrink-0 w-[170px]">
                <MachineryRentalCard item={item} />
              </div>
            ))}
          </div>
        </div>
      </div>

{/* Trust Strip — full width bleed */}
      <div className="-mx-4" style={{ backgroundColor: C.trustStripBg, borderTop: `1px solid ${C.trustStripBorder}`, borderBottom: `1px solid ${C.trustStripBorder}` }}>
        <div className="max-w-[1400px] mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4">
            {[
              { Icon: Tag,        title: '100% Branded Products', sub: 'Only verified brands'    },
              { Icon: BadgeCheck, title: '100% Original Products', sub: 'Genuine & certified'    },
              { Icon: Truck,      title: 'Free Delivery',          sub: 'On orders above ₹999'   },
              { Icon: Wallet,     title: 'Cash on Delivery',       sub: 'Available pan-India'    },
            ].map(({ Icon, title, sub }, i) => (
              <div key={i} className={`flex items-center gap-3 px-6 py-5 ${i < 3 ? 'border-r border-white/20' : ''}`}>
                <div className="flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center" style={{ backgroundColor: 'rgba(255,255,255,0.15)' }}>
                  <Icon size={20} color="#FFFFFF" strokeWidth={2} />
                </div>
                <div>
                  <p className="text-sm font-bold leading-tight" style={{ color: '#FFFFFF' }}>{title}</p>
                  <p className="text-xs mt-0.5" style={{ color: 'rgba(255,255,255,0.75)' }}>{sub}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Shop By Crop */}
      <div className="rounded-2xl p-5" style={{ background: '#EBF5F0', border: '1px solid #C8E6DA' }}>
        <SectionHeader title="Shop By Crop" onViewAll={() => navigate('/crops')} />
        <div className="flex gap-4 overflow-x-auto scrollbar-hide pb-1 md:grid md:grid-cols-9 md:gap-2">
          {crops.map((crop, i) => (
            <button key={i} onClick={() => navigate(`/crop/${crop.name.toLowerCase()}`)} className="flex flex-col items-center gap-2 group flex-shrink-0">
              <div
                className="w-16 h-16 overflow-hidden transition-all duration-200"
                style={{ borderRadius: '28%' }}
              >
                <img src={crop.img} alt="" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300" />
              </div>
             <span className="text-xs font-semibold text-gray-700 group-hover:text-pub-primary transition-colors text-center leading-tight">{crop.name}</span>
            </button>
          ))}
          <button onClick={() => navigate('/crops')} className="flex flex-col items-center gap-2 group flex-shrink-0">
            <div className="w-16 h-16 rounded-full bg-gray-100 border-2 border-dashed border-gray-300 group-hover:border-pub-primary flex items-center justify-center transition-all duration-200">
              <ChevronRight size={20} className="text-gray-400 group-hover:text-pub-primary transition-colors" />
            </div>
            <span className="text-xs font-semibold text-gray-500 group-hover:text-pub-primary transition-colors">View All</span>
          </button>
        </div>
      </div>
        
        {/* Ad Banners */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {[
          { img: IMG.adBanner1 },
          { img: IMG.adBanner2 },
          { img: IMG.adBanner3 },
          { img: IMG.adBanner4 },
        ].map((ad, i) => (
          <div key={i} className="relative rounded-xl overflow-hidden cursor-pointer group shadow-card hover:shadow-card-hover transition-all" style={{ height: '180px' }}>
            <img src={ad.img} alt="Ad" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
            <span className="absolute bottom-2 right-2 text-[10px] font-bold text-white px-1.5 py-0.5 rounded" style={{ backgroundColor: 'rgba(0,0,0,0.45)' }}>Ad</span>
          </div>
        ))}
      </div>

      {/* Shop by Brand */}
      <div className={T.sectionGreen}>
        <SectionHeader title="Shop by Brand" onViewAll={() => navigate('/brands')} />
        <style>{`
          @keyframes brandScroll {
            0%   { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
          .brand-track {
            animation: brandScroll 10s linear infinite;
            white-space: nowrap;
          }
          .brand-wrapper:hover .brand-track {
            animation-play-state: paused;
          }
        `}</style>
        <div className="brand-wrapper overflow-hidden">
          <div className="brand-track flex items-center gap-4">
            {[0, 1].map(copy => (
              <div key={copy} className="flex items-center gap-4 flex-shrink-0">
                {brands.map((brand, i) => (
                  <button
                    key={i}
                    onClick={() => navigate(`/brand/${brand.name.toLowerCase().replace(/\s+/g, '-')}`)}
                    className="flex-shrink-0 h-14 px-5 bg-gray-50 border border-gray-100 rounded-xl flex items-center justify-center transition-all duration-200 group"
                    onMouseEnter={e => { e.currentTarget.style.borderColor = C.primary; e.currentTarget.style.backgroundColor = '#fff' }}
                    onMouseLeave={e => { e.currentTarget.style.borderColor = '#F3F4F6'; e.currentTarget.style.backgroundColor = '#F9FAFB' }}
                  >
                    <span className="text-sm font-bold text-gray-400 group-hover:text-gray-800 transition-colors tracking-wide uppercase whitespace-nowrap">
                      {brand.name}
                    </span>
                  </button>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>

          {/* Recently Viewed */}
      <div className={T.sectionWhite}>
        <SectionHeader title="Recently Viewed" onViewAll={() => navigate('/recently-viewed')} />
        {/* Desktop grid */}
        <div className="hidden md:grid md:grid-cols-4 lg:grid-cols-5 gap-4">
          {recentlyViewed.map((p) => (
            <ProductCard key={p.id} product={p} wishlist={wishlist} onToggleWishlist={toggleWishlist} selectedSize={selectedSizes[p.id]} onSizeChange={handleSizeChange} />
          ))}
        </div>
        {/* Mobile: 2-row grid inside single horizontal scroll */}
        <div className="md:hidden overflow-x-auto scrollbar-hide pb-1">
          <div className="grid grid-rows-2 grid-flow-col gap-3" style={{ gridTemplateRows: 'repeat(2, auto)' }}>
            {recentlyViewed.map((p) => (
              <div key={p.id} className="w-[170px]">
                <ProductCard product={p} wishlist={wishlist} onToggleWishlist={toggleWishlist} selectedSize={selectedSizes[p.id]} onSizeChange={handleSizeChange} />
              </div>
            ))}
          </div>
        </div>
      </div>

{/* Best Sellers in Seeds */}
      <div className={T.sectionCream}>
        <SectionHeader title="Best Sellers in Seeds" onViewAll={() => navigate('/category/seeds')} />
        <div className="hidden md:grid md:grid-cols-4 lg:grid-cols-6 gap-4">
          {bestSellerSeeds.map((item) => (
            <BestSellerCard key={item.id} item={item} />
          ))}
        </div>
        <div className="flex gap-3 overflow-x-auto scrollbar-hide pb-1 md:hidden">
          {bestSellerSeeds.map((item) => (
            <div key={item.id} className="flex-shrink-0 w-[170px]"><BestSellerCard item={item} /></div>
          ))}
        </div>
      </div>

     {/* Best Sellers in Crop Protection */}
      <div className={T.sectionWhite}>
        <SectionHeader title="Best Sellers in Crop Protection" onViewAll={() => navigate('/category/crop-protection')} />
        <div className="hidden md:grid md:grid-cols-4 lg:grid-cols-6 gap-4">
          {bestSellerCropProtection.map((item) => (
            <BestSellerCard key={item.id} item={item} />
          ))}
        </div>
        <div className="flex gap-3 overflow-x-auto scrollbar-hide pb-1 md:hidden">
          {bestSellerCropProtection.map((item) => (
            <div key={item.id} className="flex-shrink-0 w-[170px]"><BestSellerCard item={item} /></div>
          ))}
        </div>
      </div>

      {/* Best Sellers in Crop Nutrition */}
      <div className={T.sectionGreen}>
        <SectionHeader title="Best Sellers in Crop Nutrition" onViewAll={() => navigate('/category/crop-nutrition')} />
        <div className="hidden md:grid md:grid-cols-4 lg:grid-cols-6 gap-4">
          {bestSellerCropNutrition.map((item) => (
            <BestSellerCard key={item.id} item={item} />
          ))}
        </div>
        <div className="flex gap-3 overflow-x-auto scrollbar-hide pb-1 md:hidden">
          {bestSellerCropNutrition.map((item) => (
            <div key={item.id} className="flex-shrink-0 w-[170px]"><BestSellerCard item={item} /></div>
          ))}
        </div>
      </div>

      {/* Best Sellers in Farm Tools */}
      <div className={T.sectionCream}>
        <SectionHeader title="Best Sellers in Farm Tools" onViewAll={() => navigate('/category/farm-tools')} />
        <div className="hidden md:grid md:grid-cols-4 lg:grid-cols-6 gap-4">
          {bestSellerFarmTools.map((item) => (
            <BestSellerCard key={item.id} item={item} />
          ))}
        </div>
        <div className="flex gap-3 overflow-x-auto scrollbar-hide pb-1 md:hidden">
          {bestSellerFarmTools.map((item) => (
            <div key={item.id} className="flex-shrink-0 w-[170px]"><BestSellerCard item={item} /></div>
          ))}
        </div>
      </div>



    {/* WhatsApp Floating Button */}
      <a
        href="https://wa.me/918755446300?text=Hello%2C%20I%20need%20help%20with%20my%20order%20on%20Beej%20Spray."
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-20 right-4 md:bottom-6 md:right-6 z-[990] w-14 h-14 rounded-full flex items-center justify-center shadow-lg hover:scale-110 active:scale-95 whatsapp-bounce"
        style={{ backgroundColor: '#25D366' }}
      >
        <svg width="28" height="28" viewBox="0 0 24 24" fill="white">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
        </svg>
      </a>

    </div>
  )
}