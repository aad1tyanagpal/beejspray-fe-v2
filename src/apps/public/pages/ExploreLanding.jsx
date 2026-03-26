import { useState, useMemo, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Heart, ChevronRight, ChevronDown, SlidersHorizontal, X, Star, ShoppingCart, LayoutGrid, List } from 'lucide-react'
import { C, T } from '../theme'
import FilterSidebar, {
  ALL_CATEGORIES, ALL_CROPS, ALL_BRANDS,
  PRICE_RANGES, MIN_RATINGS, DEFAULT_FILTERS,
} from '../components/FilterSidebar'

// ─── Constants ────────────────────────────────────────────────
const SORT_OPTIONS = [
  { label: 'Popularity',         value: 'popular'    },
  { label: 'Price: Low to High', value: 'price_asc'  },
  { label: 'Price: High to Low', value: 'price_desc' },
  { label: 'Newest First',       value: 'newest'     },
  { label: 'Avg. Rating',        value: 'rating'     },
]

const PRODUCT_IMG_H = 180

const IMGS = [
  'https://images.unsplash.com/photo-1500595046743-cd271d694d30?w=300&h=300&fit=crop',
  'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=300&h=300&fit=crop',
  'https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8?w=300&h=300&fit=crop',
  'https://images.unsplash.com/photo-1592878904946-b3cd8ae243d0?w=300&h=300&fit=crop',
  'https://images.unsplash.com/photo-1471193945509-9ad0617afabf?w=300&h=300&fit=crop',
  'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=300&h=300&fit=crop',
]

// Generate a big mock pool of all products
const ALL_PRODUCTS = Array.from({ length: 48 }, (_, i) => ({
  id:             `all-${i + 1}`,
  name:           `Product ${i + 1}`,
  brand:          ALL_BRANDS[i % ALL_BRANDS.length].label,
  brandSlug:      ALL_BRANDS[i % ALL_BRANDS.length].slug,
  categorySlug:   Object.keys(ALL_CATEGORIES)[i % Object.keys(ALL_CATEGORIES).length],
  cropSlug:       ALL_CROPS[i % ALL_CROPS.length].slug,
  price:          Math.round((199 + i * 137) / 10) * 10,
  mrp:            Math.round((299 + i * 160) / 10) * 10,
  discount:       i % 4 === 0 ? `${10 + i}%` : null,
  rating:         parseFloat((3.5 + (i % 5) * 0.3).toFixed(1)),
  reviews:        20 + i * 7,
  boughtLastMonth:i % 3 === 0 ? 50 + i * 8 : null,
  inStock:        i % 7 !== 0,
  sizes:          i % 2 === 0 ? ['10g', '50g', '100g'] : ['250ml', '500ml', '1L'],
  img:            IMGS[i % IMGS.length],
}))

// ─── Product Card ─────────────────────────────────────────────
function ProductCard({ product, wishlist, onToggleWishlist }) {
  const navigate    = useNavigate()
  const isWished    = wishlist.has(product.id)
  const save        = product.mrp ? product.mrp - product.price : null
  const discountPct = product.discount || (product.mrp ? `${Math.round(((product.mrp - product.price) / product.mrp) * 100)}%` : null)
  const [selSize, setSelSize]   = useState(product.sizes?.[0] ?? null)
  const [sizeOpen, setSizeOpen] = useState(false)

  return (
    <div className={`${T.cardHover} cursor-pointer flex flex-col relative product-card`}
      style={{ borderRadius: 14, padding: 12, height: '100%' }}
      onClick={() => navigate(`/product/${product.id}`)}>

      {discountPct && (
        <span className="absolute top-0 left-0 text-[11px] font-bold px-2.5 py-1 z-10"
          style={{ backgroundColor: C.discountBg, color: C.discountText, borderTopLeftRadius: 10, borderBottomRightRadius: 10 }}>
          {discountPct} OFF
        </span>
      )}
      <button onClick={e => { e.stopPropagation(); onToggleWishlist(product.id) }}
        className="absolute top-2.5 right-2.5 w-9 h-9 bg-white rounded-full flex items-center justify-center z-10 transition-transform hover:scale-110"
        style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
        <Heart size={18} fill={isWished ? '#EF4444' : 'none'} stroke={isWished ? '#EF4444' : '#D1D5DB'} strokeWidth={2} />
      </button>

      <div className="relative w-full rounded-lg overflow-hidden mt-2 mb-3" style={{ height: PRODUCT_IMG_H }}>
        <img src={product.img} alt={product.name} className="w-full h-full object-cover" />
        <div className="absolute bottom-2 left-2">
          <span className="inline-flex items-center gap-1 text-white text-[11px] font-bold px-2 py-0.5 rounded-full shadow-sm"
            style={{ backgroundColor: C.primary }}>
            {product.rating} <Star size={9} fill="white" stroke="none" />({product.reviews?.toLocaleString('en-IN')})
          </span>
        </div>
      </div>

      <div className="flex flex-col flex-1" style={{ minHeight: 150 }}>
        {product.brand && (
          <span className="self-start text-[9px] font-bold uppercase tracking-wide px-1.5 py-0.5 rounded mb-1"
            style={{ color: C.brandChipText, backgroundColor: C.brandChipBg, letterSpacing: 1 }}>
            {product.brand}
          </span>
        )}
        <p className="text-[14px] font-medium text-gray-900 leading-5 line-clamp-2 mb-0.5">{product.name}</p>
        {product.boughtLastMonth && (
          <p className="text-[10px] font-semibold text-amber-600 flex items-center gap-1 mb-1">
            🔥 Bought by {product.boughtLastMonth.toLocaleString('en-IN')} last month
          </p>
        )}
        <div className="mt-auto pt-2 flex flex-col gap-1">
          <div className="flex items-baseline gap-2 flex-wrap">
            <span className="text-[22px] font-extrabold text-gray-900">₹{product.price?.toLocaleString('en-IN')}</span>
            {product.mrp && <span className="text-[13px] text-gray-400 line-through">₹{product.mrp.toLocaleString('en-IN')}</span>}
          </div>
          {save && <p className="text-[11px] font-semibold" style={{ color: C.primary }}>Save ₹{save.toLocaleString('en-IN')}</p>}
        </div>

        {product.sizes?.length > 0 && (
          <div className="relative mt-2" onClick={e => e.stopPropagation()}>
            <button onClick={e => { e.stopPropagation(); setSizeOpen(p => !p) }}
              className="flex items-center justify-between w-full px-3 py-1.5 rounded-lg border text-[13px] font-semibold"
              style={{ backgroundColor: C.sizeSelectBg, borderColor: C.sizeArrowBg, color: C.gray800 }}>
              Size: {selSize} <ChevronDown size={14} style={{ color: C.gray500 }} />
            </button>
            {sizeOpen && (
              <div className="absolute bottom-full left-0 right-0 mb-1 bg-white rounded-lg border z-20 overflow-hidden shadow-lg"
                style={{ borderColor: C.gray200 }}>
                {product.sizes.map(s => (
                  <button key={s} onClick={e => { e.stopPropagation(); setSelSize(s); setSizeOpen(false) }}
                    className="w-full px-3 py-2 text-left text-[13px] transition-colors hover:bg-gray-50"
                    style={{ color: s === selSize ? C.primary : C.gray800, fontWeight: s === selSize ? 700 : 500 }}>
                    {s}
                  </button>
                ))}
              </div>
            )}
          </div>
        )}

        <button onClick={e => e.stopPropagation()}
          className="mt-2.5 w-full flex items-center justify-center gap-2 py-2 rounded-lg text-[13px] font-bold transition-all active:scale-95"
          style={{ backgroundColor: '#FFD814', color: '#111827', border: '1px solid #FFA41C' }}
          onMouseEnter={e => e.currentTarget.style.backgroundColor = '#F7CA00'}
          onMouseLeave={e => e.currentTarget.style.backgroundColor = '#FFD814'}>
          <ShoppingCart size={14} strokeWidth={2.5} /> Add to Cart
        </button>
      </div>
    </div>
  )
}

// ─── Product List Card ────────────────────────────────────────
function ProductListCard({ product, wishlist, onToggleWishlist }) {
  const navigate    = useNavigate()
  const isWished    = wishlist.has(product.id)
  const save        = product.mrp ? product.mrp - product.price : null
  const discountPct = product.discount || (product.mrp ? `${Math.round(((product.mrp - product.price) / product.mrp) * 100)}%` : null)
  const [selSize, setSelSize] = useState(product.sizes?.[0] ?? null)

  return (
    <div className="bg-white rounded-xl border flex gap-4 p-3 cursor-pointer transition-all duration-200 hover:shadow-md"
      style={{ borderColor: C.gray200 }}
      onClick={() => navigate(`/product/${product.id}`)}>
      <div className="relative flex-shrink-0 rounded-lg overflow-hidden" style={{ width: 120, height: 120 }}>
        <img src={product.img} alt={product.name} className="w-full h-full object-cover" />
        {discountPct && (
          <span className="absolute top-0 left-0 text-[10px] font-bold px-1.5 py-0.5"
            style={{ backgroundColor: C.discountBg, color: C.discountText, borderTopLeftRadius: 8, borderBottomRightRadius: 8 }}>
            {discountPct} OFF
          </span>
        )}
      </div>
      <div className="flex-1 min-w-0 flex flex-col gap-1">
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0">
            {product.brand && (
              <span className="text-[9px] font-bold uppercase tracking-wide px-1.5 py-0.5 rounded"
                style={{ color: C.brandChipText, backgroundColor: C.brandChipBg }}>
                {product.brand}
              </span>
            )}
            <p className="text-sm font-semibold text-gray-900 leading-snug mt-1 line-clamp-2">{product.name}</p>
          </div>
          <button onClick={e => { e.stopPropagation(); onToggleWishlist(product.id) }}
            className="flex-shrink-0 w-8 h-8 bg-gray-50 rounded-full flex items-center justify-center">
            <Heart size={15} fill={isWished ? '#EF4444' : 'none'} stroke={isWished ? '#EF4444' : '#D1D5DB'} strokeWidth={2} />
          </button>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="inline-flex items-center gap-1 text-white text-[11px] font-bold px-2 py-0.5 rounded-full"
            style={{ backgroundColor: C.primary }}>
            {product.rating} <Star size={8} fill="white" stroke="none" />
          </span>
          <span className="text-[11px] text-gray-400">({product.reviews?.toLocaleString('en-IN')})</span>
          {product.boughtLastMonth && (
            <span className="text-[10px] font-semibold text-amber-600">🔥 {product.boughtLastMonth} bought last month</span>
          )}
        </div>
        <div className="flex items-center justify-between mt-auto flex-wrap gap-2">
          <div className="flex items-baseline gap-2">
            <span className="text-lg font-extrabold text-gray-900">₹{product.price?.toLocaleString('en-IN')}</span>
            {product.mrp && <span className="text-xs text-gray-400 line-through">₹{product.mrp.toLocaleString('en-IN')}</span>}
            {save && <span className="text-[11px] font-semibold" style={{ color: C.primary }}>Save ₹{save}</span>}
          </div>
          <div className="flex items-center gap-2" onClick={e => e.stopPropagation()}>
            {product.sizes?.length > 0 && (
              <select value={selSize} onChange={e => setSelSize(e.target.value)}
                className="text-xs font-semibold px-2 py-1.5 rounded-lg border appearance-none cursor-pointer"
                style={{ borderColor: C.sizeArrowBg, backgroundColor: C.sizeSelectBg, color: C.gray800 }}>
                {product.sizes.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
            )}
            <button onClick={e => e.stopPropagation()}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all"
              style={{ backgroundColor: '#FFD814', color: '#111827', border: '1px solid #FFA41C' }}
              onMouseEnter={e => e.currentTarget.style.backgroundColor = '#F7CA00'}
              onMouseLeave={e => e.currentTarget.style.backgroundColor = '#FFD814'}>
              <ShoppingCart size={13} strokeWidth={2.5} /> Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

// ─── Filter Pills ─────────────────────────────────────────────
function FilterPills({ filters, setFilters }) {
  const pills = []
  if (filters.inStockOnly)        pills.push({ key: 'stock',  label: 'In Stock',                           onRemove: () => setFilters(p => ({ ...p, inStockOnly: false })) })
  if (filters.priceRange != null) pills.push({ key: 'price',  label: PRICE_RANGES[filters.priceRange].label, onRemove: () => setFilters(p => ({ ...p, priceRange: null })) })
  if (filters.rating != null)     pills.push({ key: 'rating', label: MIN_RATINGS[filters.rating],           onRemove: () => setFilters(p => ({ ...p, rating: null })) })
  filters.brands.forEach(b =>     pills.push({ key: b, label: b, onRemove: () => setFilters(p => ({ ...p, brands: p.brands.filter(x => x !== b) })) }))
  filters.crops.forEach(c =>      pills.push({ key: c, label: c, onRemove: () => setFilters(p => ({ ...p, crops: p.crops.filter(x => x !== c) })) }))
  filters.subcats.forEach(s =>    pills.push({ key: s, label: s, onRemove: () => setFilters(p => ({ ...p, subcats: p.subcats.filter(x => x !== s) })) }))

  if (!pills.length) return null
  return (
    <div className="flex flex-wrap gap-2 mb-3">
      {pills.map(pill => (
        <span key={pill.key}
          className="flex items-center gap-1.5 pl-3 pr-2 py-1 rounded-full text-xs font-semibold border"
          style={{ backgroundColor: `${C.primary}12`, borderColor: `${C.primary}40`, color: C.primary }}>
          {pill.label}
          <button onClick={pill.onRemove}
            className="w-4 h-4 rounded-full flex items-center justify-center"
            style={{ backgroundColor: `${C.primary}25` }}
            onMouseEnter={e => e.currentTarget.style.backgroundColor = `${C.primary}50`}
            onMouseLeave={e => e.currentTarget.style.backgroundColor = `${C.primary}25`}>
            <X size={10} strokeWidth={2.5} />
          </button>
        </span>
      ))}
      <button onClick={() => setFilters({ ...DEFAULT_FILTERS })}
        className="text-xs font-semibold px-3 py-1 rounded-full border transition-colors"
        style={{ borderColor: C.gray200, color: C.gray500 }}
        onMouseEnter={e => { e.currentTarget.style.borderColor = C.primary; e.currentTarget.style.color = C.primary }}
        onMouseLeave={e => { e.currentTarget.style.borderColor = C.gray200; e.currentTarget.style.color = C.gray500 }}>
        Clear All
      </button>
    </div>
  )
}

// ─── Main ─────────────────────────────────────────────────────
export default function ExploreLanding({ title = 'Browse All', products = ALL_PRODUCTS }) {
  const navigate = useNavigate()

  const [filters,    setFilters]    = useState({ ...DEFAULT_FILTERS })
  const [sort,       setSort]       = useState('popular')
  const [viewType,   setViewType]   = useState('card')
  const [wishlist,   setWishlist]   = useState(new Set())
  const [drawerOpen, setDrawerOpen] = useState(false)

  const toggleWishlist = id => setWishlist(p => { const n = new Set(p); n.has(id) ? n.delete(id) : n.add(id); return n })

  const filtered = useMemo(() => {
    let list = [...products]
    if (filters.inStockOnly)        list = list.filter(p => p.inStock)
    if (filters.brands.length)      list = list.filter(p => filters.brands.includes(p.brand))
    if (filters.crops.length)       list = list.filter((_, i) => i % 2 === 0)
    if (filters.subcats.length)     list = list.filter((_, i) => i % filters.subcats.length === 0)
    if (filters.priceRange != null) {
      const r = PRICE_RANGES[filters.priceRange]
      list = list.filter(p => p.price >= r.min && p.price <= r.max)
    }
    if (filters.rating != null) list = list.filter(p => p.rating >= [4, 3, 2][filters.rating])
    if (sort === 'price_asc')  list.sort((a, b) => a.price - b.price)
    if (sort === 'price_desc') list.sort((a, b) => b.price - a.price)
    if (sort === 'rating')     list.sort((a, b) => b.rating - a.rating)
    return list
  }, [filters, sort])

  const activeFilterCount =
    filters.brands.length + filters.crops.length + filters.subcats.length +
    (filters.priceRange != null ? 1 : 0) + (filters.rating != null ? 1 : 0) + (filters.inStockOnly ? 1 : 0)

  return (
    <div className="min-h-screen" style={{ backgroundColor: C.pageBg }}>

      {/* ── Breadcrumb ───────────────────────────────────── */}
      <nav className="flex items-center gap-1.5 text-xs text-gray-500 py-3 px-4 max-w-[1400px] mx-auto w-full">
        <button onClick={() => navigate('/')} className="hover:underline" style={{ color: C.primary }}>Home</button>
        <ChevronRight size={12} className="text-gray-400" />
        <span className="font-medium text-gray-700">{title}</span>
      </nav>

      {/* ── Body ────────────────────────────────────────── */}
      <div className="max-w-[1400px] mx-auto px-4 pb-8 flex gap-6 items-start">

        {/* ── Desktop Sidebar ─────────────────────────── */}
        <aside className="hidden lg:block flex-shrink-0 w-60 bg-white rounded-xl border overflow-y-auto"
          style={{ borderColor: C.gray200, position: 'sticky', top: 80, maxHeight: 'calc(100vh - 100px)', alignSelf: 'flex-start' }}>
          <FilterSidebar type={null} slug={null} filters={filters} setFilters={setFilters} />
        </aside>

        {/* ── Right Column ────────────────────────────── */}
        <div className="flex-1 min-w-0">

          {/* ── Toolbar ─────────────────────────────── */}
          <div className="flex items-center justify-between mb-3 gap-3 flex-wrap">
            <p className="text-sm text-gray-500">
              <span className="font-semibold text-gray-800">{title}</span>
              <span className="mx-1 text-gray-300">·</span>
              <span className="font-bold text-gray-800">{filtered.length}</span> products
            </p>
            <div className="flex items-center gap-2">
              <button onClick={() => setDrawerOpen(true)}
                className="lg:hidden flex items-center gap-1.5 px-3 py-2 rounded-lg border text-sm font-semibold"
                style={{ borderColor: C.gray200, color: C.gray700 }}>
                <SlidersHorizontal size={15} />
                Filters
                {activeFilterCount > 0 && (
                  <span className="w-5 h-5 rounded-full text-[11px] font-bold text-white flex items-center justify-center"
                    style={{ backgroundColor: C.primary }}>{activeFilterCount}</span>
                )}
              </button>

              {/* View toggle */}
              <div className="flex items-center rounded-lg border overflow-hidden" style={{ borderColor: C.gray200 }}>
                <button onClick={() => setViewType('card')} className="px-2.5 py-2 transition-colors"
                  style={{ backgroundColor: viewType === 'card' ? C.primary : '#fff', color: viewType === 'card' ? '#fff' : C.gray500 }}>
                  <LayoutGrid size={16} />
                </button>
                <button onClick={() => setViewType('list')} className="px-2.5 py-2 transition-colors"
                  style={{ backgroundColor: viewType === 'list' ? C.primary : '#fff', color: viewType === 'list' ? '#fff' : C.gray500 }}>
                  <List size={16} />
                </button>
              </div>

              {/* Sort */}
              <div className="relative">
                <select value={sort} onChange={e => setSort(e.target.value)}
                  className="pl-3 pr-8 py-2 rounded-lg border text-sm font-medium appearance-none cursor-pointer"
                  style={{ borderColor: C.gray200, color: C.gray700, backgroundColor: '#fff' }}>
                  {SORT_OPTIONS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
                </select>
                <ChevronDown size={14} className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400" />
              </div>
            </div>
          </div>

          {/* ── Active Filter Pills ──────────────────── */}
          <FilterPills filters={filters} setFilters={setFilters} />

          {/* ── Product Grid / List ──────────────────── */}
          {filtered.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-24 gap-3">
              <span className="text-4xl">🌾</span>
              <p className="text-gray-500 text-sm font-medium">No products match your filters.</p>
              <button className="text-sm font-semibold" style={{ color: C.primary }}
                onClick={() => setFilters({ ...DEFAULT_FILTERS })}>
                Clear Filters
              </button>
            </div>
          ) : viewType === 'card' ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
              {filtered.map(p => <ProductCard key={p.id} product={p} wishlist={wishlist} onToggleWishlist={toggleWishlist} />)}
            </div>
          ) : (
            <div className="flex flex-col gap-3">
              {filtered.map(p => <ProductListCard key={p.id} product={p} wishlist={wishlist} onToggleWishlist={toggleWishlist} />)}
            </div>
          )}
        </div>
      </div>

      {/* ── Mobile Filter Drawer ─────────────────────── */}
      {drawerOpen && (
        <>
          <div className="fixed inset-0 z-40" style={{ backgroundColor: 'rgba(0,0,0,0.4)' }}
            onClick={() => setDrawerOpen(false)} />
          <div className="fixed left-0 right-0 z-50 bg-white rounded-t-2xl flex flex-col"
            style={{ bottom: 56, maxHeight: 'calc(85vh - 56px)', boxShadow: '0 -4px 24px rgba(0,0,0,0.15)' }}>
            <div className="w-10 h-1 bg-gray-300 rounded-full mx-auto mt-3 mb-1 flex-shrink-0" />
            <div className="overflow-y-auto flex-1">
              <FilterSidebar type={null} slug={null} filters={filters} setFilters={setFilters} onClose={() => setDrawerOpen(false)} />
            </div>
            <div className="flex-shrink-0 px-4 py-4 border-t" style={{ borderColor: C.gray200 }}>
              <button className="w-full py-3 rounded-xl text-sm font-bold text-white"
                style={{ backgroundColor: C.primary }}
                onClick={() => setDrawerOpen(false)}>
                Show {filtered.length} Results
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  )
}