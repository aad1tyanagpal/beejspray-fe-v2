import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Heart, ShoppingCart, Trash2, X, Star, ChevronDown } from 'lucide-react'
import { C, T } from '../theme'
import { removeFromWishlist, clearWishlist } from '../../../features/wishlist/wishlistSlice'
import { addItem } from '../../../features/cart/cartSlice'

// ─── Sort options ─────────────────────────────────────────────
const SORT_OPTIONS = [
  { label: 'Recently Added',     value: 'recent'     },
  { label: 'Price: Low to High', value: 'price_asc'  },
  { label: 'Price: High to Low', value: 'price_desc' },
  { label: 'Avg. Rating',        value: 'rating'     },
]

// ─── Individual Wishlist Card ─────────────────────────────────
function WishlistCard({ product, onRemove, onMoveToCart }) {
  const navigate    = useNavigate()
  const [selSize, setSelSize]   = useState(product.sizes?.[0] ?? null)
  const [sizeOpen, setSizeOpen] = useState(false)
  const discountPct = product.discount ||
    (product.mrp ? `${Math.round(((product.mrp - product.price) / product.mrp) * 100)}%` : null)
  const save = product.mrp ? product.mrp - product.price : null

  return (
    <div
      className={`${T.cardHover} flex flex-col relative cursor-pointer`}
      style={{ borderRadius: 14, padding: 12, height: '100%' }}
      onClick={() => navigate(`/product/${product.id}`)}
    >
      {/* Discount badge */}
      {discountPct && (
        <span
          className="absolute top-0 left-0 text-[11px] font-bold px-2.5 py-1 z-10"
          style={{
            backgroundColor: C.discountBg,
            color: C.discountText,
            borderTopLeftRadius: 10,
            borderBottomRightRadius: 10,
          }}
        >
          {discountPct} OFF
        </span>
      )}

      {/* Remove button */}
      <button
        onClick={e => { e.stopPropagation(); onRemove(product.id) }}
        className="absolute top-2.5 right-2.5 w-9 h-9 bg-white rounded-full flex items-center justify-center z-10 transition-transform hover:scale-110"
        style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.10)' }}
        title="Remove from wishlist"
      >
        <Heart size={18} fill={C.red} stroke={C.red} />
      </button>

      {/* Product Image */}
      <div
        className="rounded-xl overflow-hidden flex items-center justify-center mb-3 relative"
        style={{ height: 160, backgroundColor: C.cardImgBg }}
      >
        <img
          src={product.img}
          alt={product.name}
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
        />
        {!product.inStock && (
          <div
            className="absolute inset-0 flex items-center justify-center rounded-xl"
            style={{ backgroundColor: 'rgba(255,255,255,0.75)' }}
          >
            <span className="text-[13px] font-bold px-3 py-1 rounded-full" style={{ backgroundColor: C.gray100, color: C.gray700 }}>
              Out of Stock
            </span>
          </div>
        )}
      </div>

      {/* Details */}
      <div className="flex flex-col flex-1 gap-1">

        {/* Brand chip */}
        {product.brand && (
          <span
            className="self-start text-[9px] font-bold uppercase tracking-wide px-1.5 py-0.5 rounded"
            style={{ color: C.brandChipText, backgroundColor: C.brandChipBg }}
          >
            {product.brand}
          </span>
        )}

        {/* Name */}
        <p className="text-[13px] font-semibold leading-snug line-clamp-2" style={{ color: C.gray900 }}>
          {product.name}
        </p>

        {/* Rating */}
        {product.rating && (
          <div className="flex items-center gap-1">
            <span
              className="flex items-center gap-0.5 text-[10px] font-bold px-1.5 py-0.5 rounded"
              style={{ backgroundColor: C.ratingBg, color: '#fff' }}
            >
              <Star size={9} fill="#fff" stroke="none" /> {product.rating}
            </span>
            {product.reviews && (
              <span className="text-[10px]" style={{ color: C.gray400 }}>({product.reviews})</span>
            )}
          </div>
        )}

        {/* Price row */}
        <div className="flex items-baseline gap-2 mt-0.5">
          <span className="text-[17px] font-extrabold" style={{ color: C.gray900 }}>
            ₹{product.price}
          </span>
          {product.mrp && product.mrp !== product.price && (
            <span className="text-[12px] line-through" style={{ color: C.gray400 }}>₹{product.mrp}</span>
          )}
          {save && save > 0 && (
            <span className="text-[11px] font-semibold" style={{ color: C.primary }}>Save ₹{save}</span>
          )}
        </div>

        {/* Size selector */}
        {product.sizes && product.sizes.length > 0 && (
          <div className="relative mt-1" onClick={e => e.stopPropagation()}>
            <button
              onClick={() => setSizeOpen(o => !o)}
              className="flex items-center gap-1.5 text-[12px] font-semibold px-2.5 py-1.5 rounded-lg border"
              style={{
                borderColor: C.gray200,
                color: C.gray700,
                backgroundColor: C.sizeSelectBg,
              }}
            >
              {selSize} <ChevronDown size={12} />
            </button>
            {sizeOpen && (
              <div
                className="absolute left-0 top-full mt-1 z-20 rounded-xl overflow-hidden"
                style={{ border: `1px solid ${C.gray200}`, backgroundColor: C.white, boxShadow: '0 8px 24px rgba(0,0,0,0.12)', minWidth: 110 }}
              >
                {product.sizes.map(s => (
                  <button
                    key={s}
                    onClick={() => { setSelSize(s); setSizeOpen(false) }}
                    className="w-full text-left px-3 py-2 text-[12px] hover:bg-gray-50 transition-colors"
                    style={{ color: s === selSize ? C.primary : C.gray800, fontWeight: s === selSize ? 700 : 500 }}
                  >
                    {s}
                  </button>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Move to Cart CTA */}
        <button
          disabled={!product.inStock}
          onClick={e => {
            e.stopPropagation()
            onMoveToCart({ ...product, size: selSize })
          }}
          className="mt-2.5 w-full flex items-center justify-center gap-2 py-2 rounded-lg text-[13px] font-bold transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
          style={{
            backgroundColor: product.inStock ? '#FFD814' : C.gray100,
            color:           product.inStock ? '#111827' : C.gray400,
            border:          product.inStock ? '1px solid #FFA41C' : `1px solid ${C.gray200}`,
          }}
          onMouseEnter={e => { if (product.inStock) e.currentTarget.style.backgroundColor = '#F7CA00' }}
          onMouseLeave={e => { if (product.inStock) e.currentTarget.style.backgroundColor = '#FFD814' }}
        >
          <ShoppingCart size={14} strokeWidth={2.5} />
          {product.inStock ? 'Move to Cart' : 'Out of Stock'}
        </button>
      </div>
    </div>
  )
}

// ─── Main Wishlist Page ───────────────────────────────────────
export default function Wishlist() {
  const navigate  = useNavigate()
  const dispatch  = useDispatch()
  const items     = useSelector(s => s.wishlist.items)

  const [sort, setSort]         = useState('recent')
  const [sortOpen, setSortOpen] = useState(false)
  const [cleared, setCleared]   = useState(false) // for undo toast (future)

  const sortedItems = [...items].sort((a, b) => {
    if (sort === 'price_asc')  return a.price - b.price
    if (sort === 'price_desc') return b.price - a.price
    if (sort === 'rating')     return (b.rating ?? 0) - (a.rating ?? 0)
    return 0 // 'recent' — Redux order = add order
  })

  const handleRemove = (id) => dispatch(removeFromWishlist(id))

  const handleMoveToCart = (product) => {
    dispatch(addItem({
      id:          product.id,
      name:        product.name,
      brand:       product.brand,
      size:        product.size,
      img:         product.img,
      retailPrice: product.price,
      mrp:         product.mrp,
    }))
    dispatch(removeFromWishlist(product.id))
  }

  const handleMoveAllToCart = () => {
    items.forEach(p => {
      dispatch(addItem({
        id:          p.id,
        name:        p.name,
        brand:       p.brand,
        size:        p.sizes?.[0] ?? null,
        img:         p.img,
        retailPrice: p.price,
        mrp:         p.mrp,
      }))
    })
    dispatch(clearWishlist())
    navigate('/cart')
  }

  // ── Empty State ───────────────────────────────────────────
  if (items.length === 0) return (
    <div
      className="min-h-[72vh] flex flex-col items-center justify-center gap-4 px-4"
      style={{ backgroundColor: C.pageBg }}
    >
      <div
        className="w-20 h-20 rounded-full flex items-center justify-center"
        style={{ backgroundColor: C.primaryLight }}
      >
        <Heart size={36} strokeWidth={1.4} style={{ color: C.primary }} />
      </div>
      <p className="text-lg font-bold" style={{ color: C.gray900 }}>Your wishlist is empty</p>
      <p className="text-sm text-center max-w-xs" style={{ color: C.gray400 }}>
        Save products you like by tapping the{' '}
        <Heart size={12} style={{ display: 'inline', verticalAlign: 'middle', color: C.red }} fill={C.red} />{' '}
        heart on any product card.
      </p>
      <button
        onClick={() => navigate('/')}
        className="mt-2 px-6 py-2.5 rounded-lg text-sm font-bold text-white"
        style={{ backgroundColor: C.primary }}
        onMouseEnter={e => e.currentTarget.style.backgroundColor = C.primaryDark}
        onMouseLeave={e => e.currentTarget.style.backgroundColor = C.primary}
      >
        Explore Products
      </button>
    </div>
  )

  // ── Filled State ──────────────────────────────────────────
  return (
    <div className="max-w-[1200px] mx-auto px-4 py-6" style={{ backgroundColor: C.pageBg }}>

      {/* ── Page Header ──────────────────────────────────── */}
      <div className="flex items-center justify-between mb-5 flex-wrap gap-3">
        <div>
          <h1 className="text-2xl font-bold" style={{ color: C.gray900 }}>
            My Wishlist
          </h1>
          <p className="text-sm mt-0.5" style={{ color: C.gray400 }}>
            {items.length} {items.length === 1 ? 'item' : 'items'} saved
          </p>
        </div>

        <div className="flex items-center gap-2">

          {/* Sort dropdown */}
          <div className="relative">
            <button
              onClick={() => setSortOpen(o => !o)}
              className="flex items-center gap-2 text-[13px] font-semibold px-3 py-2 rounded-lg border transition-colors"
              style={{ borderColor: C.gray200, color: C.gray700, backgroundColor: C.white }}
            >
              {SORT_OPTIONS.find(s => s.value === sort)?.label}
              <ChevronDown size={14} />
            </button>
            {sortOpen && (
              <div
                className="absolute right-0 top-full mt-1 z-20 rounded-xl overflow-hidden"
                style={{ border: `1px solid ${C.gray200}`, backgroundColor: C.white, boxShadow: '0 8px 24px rgba(0,0,0,0.12)', minWidth: 180 }}
              >
                {SORT_OPTIONS.map(opt => (
                  <button
                    key={opt.value}
                    onClick={() => { setSort(opt.value); setSortOpen(false) }}
                    className="w-full text-left px-4 py-2.5 text-[13px] hover:bg-gray-50 transition-colors"
                    style={{ color: opt.value === sort ? C.primary : C.gray800, fontWeight: opt.value === sort ? 700 : 400 }}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Move All to Cart */}
          <button
            onClick={handleMoveAllToCart}
            className="flex items-center gap-2 text-[13px] font-bold px-4 py-2 rounded-lg transition-colors"
            style={{ backgroundColor: C.primary, color: C.white }}
            onMouseEnter={e => e.currentTarget.style.backgroundColor = C.primaryDark}
            onMouseLeave={e => e.currentTarget.style.backgroundColor = C.primary}
          >
            <ShoppingCart size={15} strokeWidth={2.5} />
            Add All to Cart
          </button>

          {/* Clear all */}
          <button
            onClick={() => dispatch(clearWishlist())}
            className="flex items-center gap-1.5 text-[13px] font-semibold px-3 py-2 rounded-lg border transition-colors"
            style={{ borderColor: C.gray200, color: C.gray500 }}
            onMouseEnter={e => {
              e.currentTarget.style.borderColor = C.red
              e.currentTarget.style.color       = C.red
            }}
            onMouseLeave={e => {
              e.currentTarget.style.borderColor = C.gray200
              e.currentTarget.style.color       = C.gray500
            }}
            title="Clear all"
          >
            <Trash2 size={14} />
            Clear All
          </button>
        </div>
      </div>

      {/* ── Product Grid ─────────────────────────────────── */}
      <div className="grid gap-4 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
        {sortedItems.map(product => (
          <WishlistCard
            key={product.id}
            product={product}
            onRemove={handleRemove}
            onMoveToCart={handleMoveToCart}
          />
        ))}
      </div>
    </div>
  )
}