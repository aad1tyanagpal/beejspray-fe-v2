import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { X, ChevronDown, ChevronUp, ChevronRight } from 'lucide-react'
import { C } from '../theme'

// ─── Shared Master Data (single source of truth) ─────────────
// Import these in any page that needs category/crop/brand lists

export const ALL_CATEGORIES = {
  seeds: {
    label: 'Seeds',
    img: 'https://images.unsplash.com/photo-1500595046743-cd271d694d30?w=120&h=120&fit=crop',
    subcategories: [
      { label: 'Vegetable Seeds',  img: 'https://images.unsplash.com/photo-1471193945509-9ad0617afabf?w=120&h=120&fit=crop' },
      { label: 'Field Crop Seeds', img: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=120&h=120&fit=crop' },
      { label: 'Flower Seeds',     img: 'https://images.unsplash.com/photo-1490750967868-88df5691cc7b?w=120&h=120&fit=crop' },
      { label: 'Hybrid Seeds',     img: 'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=120&h=120&fit=crop' },
    ],
  },
  fertilizers: {
    label: 'Fertilizers',
    img: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=120&h=120&fit=crop',
    subcategories: [
      { label: 'Urea',          img: 'https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=120&h=120&fit=crop' },
      { label: 'DAP',           img: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=120&h=120&fit=crop' },
      { label: 'NPK',           img: 'https://images.unsplash.com/photo-1628352081506-83c43123ed6d?w=120&h=120&fit=crop' },
      { label: 'Organic',       img: 'https://images.unsplash.com/photo-1518977676601-b53f82aba655?w=120&h=120&fit=crop' },
      { label: 'Water Soluble', img: 'https://images.unsplash.com/photo-1508747703725-719777637510?w=120&h=120&fit=crop' },
    ],
  },
  'crop-protection': {
    label: 'Crop Protection',
    img: 'https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8?w=120&h=120&fit=crop',
    subcategories: [
      { label: 'Insecticides',   img: 'https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=120&h=120&fit=crop' },
      { label: 'Fungicides',     img: 'https://images.unsplash.com/photo-1471193945509-9ad0617afabf?w=120&h=120&fit=crop' },
      { label: 'Herbicides',     img: 'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=120&h=120&fit=crop' },
      { label: 'Bio Pesticides', img: 'https://images.unsplash.com/photo-1628352081506-83c43123ed6d?w=120&h=120&fit=crop' },
    ],
  },
  equipment: {
    label: 'Equipment',
    img: 'https://images.unsplash.com/photo-1592878904946-b3cd8ae243d0?w=120&h=120&fit=crop',
    subcategories: [
      { label: 'Sprayers',    img: 'https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8?w=120&h=120&fit=crop' },
      { label: 'Tools',       img: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=120&h=120&fit=crop' },
      { label: 'Irrigation',  img: 'https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=120&h=120&fit=crop' },
      { label: 'Safety Gear', img: 'https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=120&h=120&fit=crop' },
    ],
  },
  'crop-nutrition': {
    label: 'Crop Nutrition',
    img: 'https://images.unsplash.com/photo-1471193945509-9ad0617afabf?w=120&h=120&fit=crop',
    subcategories: [
      { label: 'Micronutrients',    img: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=120&h=120&fit=crop' },
      { label: 'Growth Regulators', img: 'https://images.unsplash.com/photo-1500595046743-cd271d694d30?w=120&h=120&fit=crop' },
      { label: 'Soil Conditioners', img: 'https://images.unsplash.com/photo-1518977676601-b53f82aba655?w=120&h=120&fit=crop' },
    ],
  },
  pesticides: {
    label: 'Pesticides',
    img: 'https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8?w=120&h=120&fit=crop',
    subcategories: [
      { label: 'Insecticides', img: 'https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=120&h=120&fit=crop' },
      { label: 'Fungicides',   img: 'https://images.unsplash.com/photo-1471193945509-9ad0617afabf?w=120&h=120&fit=crop' },
      { label: 'Herbicides',   img: 'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=120&h=120&fit=crop' },
    ],
  },
  'farm-tools': {
    label: 'Farm Tools',
    img: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=120&h=120&fit=crop',
    subcategories: [
      { label: 'Sprayers',    img: 'https://images.unsplash.com/photo-1625244724120-1fd1d34d00f6?w=120&h=120&fit=crop' },
      { label: 'Hand Tools',  img: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=120&h=120&fit=crop' },
      { label: 'Irrigation',  img: 'https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=120&h=120&fit=crop' },
      { label: 'Safety Gear', img: 'https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=120&h=120&fit=crop' },
    ],
  },
  'cattle-feed': {
    label: 'Cattle Feed',
    img: 'https://images.unsplash.com/photo-1516467508483-a7212febe31a?w=120&h=120&fit=crop',
    subcategories: [
      { label: 'Concentrate Feed', img: 'https://images.unsplash.com/photo-1516467508483-a7212febe31a?w=120&h=120&fit=crop' },
      { label: 'Mineral Mix',      img: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=120&h=120&fit=crop' },
    ],
  },
}

export const ALL_CROPS = [
  { slug: 'wheat',     label: 'Wheat',     img: 'https://images.unsplash.com/photo-1500595046743-cd271d694d30?w=120&h=120&fit=crop' },
  { slug: 'paddy',     label: 'Paddy',     img: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=120&h=120&fit=crop' },
  { slug: 'tomato',    label: 'Tomato',    img: 'https://images.unsplash.com/photo-1592838064575-70ed626d3a0e?w=120&h=120&fit=crop' },
  { slug: 'cotton',    label: 'Cotton',    img: 'https://images.unsplash.com/photo-1605000797499-95a51c5269ae?w=120&h=120&fit=crop' },
  { slug: 'maize',     label: 'Maize',     img: 'https://images.unsplash.com/photo-1508747703725-719777637510?w=120&h=120&fit=crop' },
  { slug: 'sugarcane', label: 'Sugarcane', img: 'https://images.unsplash.com/photo-1518977676601-b53f82aba655?w=120&h=120&fit=crop' },
  { slug: 'mustard',   label: 'Mustard',   img: 'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=120&h=120&fit=crop' },
  { slug: 'onion',     label: 'Onion',     img: 'https://images.unsplash.com/photo-1508747703725-719777637510?w=120&h=120&fit=crop' },
  { slug: 'potato',    label: 'Potato',    img: 'https://images.unsplash.com/photo-1518977676601-b53f82aba655?w=120&h=120&fit=crop' },
]

export const ALL_BRANDS = [
  { slug: 'bayer',      label: 'Bayer',      img: 'https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8?w=120&h=120&fit=crop' },
  { slug: 'syngenta',   label: 'Syngenta',   img: 'https://images.unsplash.com/photo-1500595046743-cd271d694d30?w=120&h=120&fit=crop' },
  { slug: 'mahyco',     label: 'Mahyco',     img: 'https://images.unsplash.com/photo-1471193945509-9ad0617afabf?w=120&h=120&fit=crop' },
  { slug: 'upl',        label: 'UPL',        img: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=120&h=120&fit=crop' },
  { slug: 'corteva',    label: 'Corteva',    img: 'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=120&h=120&fit=crop' },
  { slug: 'iffco',      label: 'IFFCO',      img: 'https://images.unsplash.com/photo-1628352081506-83c43123ed6d?w=120&h=120&fit=crop' },
  { slug: 'coromandel', label: 'Coromandel', img: 'https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=120&h=120&fit=crop' },
  { slug: 'dhanuka',    label: 'Dhanuka',    img: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=120&h=120&fit=crop' },
]

export const PRICE_RANGES = [
  { label: 'Under ₹500',       min: 0,    max: 500      },
  { label: '₹500 – ₹1,000',   min: 500,  max: 1000     },
  { label: '₹1,000 – ₹2,500', min: 1000, max: 2500     },
  { label: '₹2,500 – ₹5,000', min: 2500, max: 5000     },
  { label: 'Above ₹5,000',    min: 5000, max: Infinity  },
]

export const MIN_RATINGS = ['4★ & above', '3★ & above', '2★ & above']

// ─── Default empty filters shape — import & use in any page ──
export const DEFAULT_FILTERS = {
  brands: [], crops: [], subcats: [],
  priceRange: null, rating: null, inStockOnly: false,
}

// ─────────────────────────────────────────────────────────────
// FilterSidebar Component
//
// Props:
//   type      — 'category' | 'crop' | 'brand' | null (null = show all sections)
//   slug      — current active slug (used to highlight + expand category tree)
//   filters   — filter state object (shape: DEFAULT_FILTERS)
//   setFilters — state setter
//   onClose   — optional, renders X button (used in mobile drawer)
// ─────────────────────────────────────────────────────────────
export default function FilterSidebar({ type = null, slug = null, filters, setFilters, onClose }) {
  const navigate = useNavigate()

  const [expandedCats, setExpandedCats] = useState(() => ({
    ...(type === 'category' && slug ? { [slug]: true } : {}),
  }))
  const [openSections, setOpenSections] = useState({
    stock: true, category: true, crop: true, brand: true, price: true, rating: true,
  })

  const toggleSection  = k => setOpenSections(p => ({ ...p, [k]: !p[k] }))
  const toggleExpand   = slug => setExpandedCats(p => ({ ...p, [slug]: !p[slug] }))
  const toggleArr      = (key, val) =>
    setFilters(p => ({ ...p, [key]: p[key].includes(val) ? p[key].filter(x => x !== val) : [...p[key], val] }))
  const clearAll       = () => setFilters({ ...DEFAULT_FILTERS })

  // ── Reusable collapsible section wrapper ──────────────────
  const Section = ({ id, title, children }) => (
    <div className="border-b pb-4 mb-4" style={{ borderColor: C.gray200 }}>
      <button className="w-full flex items-center justify-between mb-3" onClick={() => toggleSection(id)}>
        <span className="text-sm font-bold text-gray-700">{title}</span>
        {openSections[id]
          ? <ChevronUp size={14} className="text-gray-400" />
          : <ChevronDown size={14} className="text-gray-400" />}
      </button>
      {openSections[id] && children}
    </div>
  )

  return (
    <div className="p-4">

      {/* ── Header ───────────────────────────────────────── */}
      <div className="flex items-center justify-between mb-5">
        <span className="text-base font-bold text-gray-900">Filters</span>
        <div className="flex items-center gap-3">
          <button className="text-xs font-semibold" style={{ color: C.primary }} onClick={clearAll}>
            Clear All
          </button>
          {onClose && (
            <button onClick={onClose} className="p-1 rounded-lg hover:bg-gray-100">
              <X size={18} className="text-gray-500" />
            </button>
          )}
        </div>
      </div>

      {/* ── 1. Availability ──────────────────────────────── */}
      <Section id="stock" title="Availability">
        <label className="flex items-center gap-2 cursor-pointer">
          <input type="checkbox" checked={filters.inStockOnly}
            onChange={e => setFilters(p => ({ ...p, inStockOnly: e.target.checked }))}
            className="w-4 h-4 accent-green-600 rounded" />
          <span className="text-sm text-gray-700">In Stock Only</span>
        </label>
      </Section>

      {/* ── 2. Category — nested Amazon-style tree ────────── */}
      <Section id="category" title="Category">
        <div className="flex flex-col">
          {Object.entries(ALL_CATEGORIES).map(([catSlug, cat]) => {
            const isActive   = type === 'category' && catSlug === slug
            const isExpanded = !!expandedCats[catSlug]

            return (
              <div key={catSlug}>
                {/* Parent row */}
                <div className="flex items-center justify-between py-1.5 px-1 rounded-lg"
                  style={{ backgroundColor: isActive ? `${C.primary}08` : 'transparent' }}>
                  <button
                    className="flex-1 text-left text-sm font-semibold transition-colors"
                    style={{ color: isActive ? C.primary : C.gray700 }}
                    onClick={() => {
                      if (!isActive) navigate(`/explore/category/${catSlug}`)
                      else toggleExpand(catSlug)
                    }}>
                    {cat.label}
                  </button>
                  <button onClick={() => toggleExpand(catSlug)} className="p-0.5 rounded hover:bg-gray-100">
                    <ChevronRight size={14}
                      className="transition-transform duration-200"
                      style={{ color: C.gray400, transform: isExpanded ? 'rotate(90deg)' : 'rotate(0deg)' }} />
                  </button>
                </div>

                {/* Subcategories */}
                {isExpanded && (
                  <div className="ml-3 mb-1 flex flex-col border-l-2 pl-3"
                    style={{ borderColor: `${C.primary}30` }}>
                    {/* All row */}
                    <button
                      onClick={() => {
                        if (!isActive) navigate(`/explore/category/${catSlug}`)
                        else setFilters(p => ({ ...p, subcats: [] }))
                      }}
                      className="text-left py-1.5 text-[13px] transition-colors"
                      style={{
                        color: isActive && filters.subcats.length === 0 ? C.primary : C.gray600,
                        fontWeight: isActive && filters.subcats.length === 0 ? 700 : 400,
                      }}>
                      All {cat.label}
                    </button>

                    {cat.subcategories.map(sub => {
                      const checked = isActive && filters.subcats.includes(sub.label)
                      return (
                        <button key={sub.label}
                          onClick={() => {
                            if (!isActive) navigate(`/explore/category/${catSlug}`)
                            else toggleArr('subcats', sub.label)
                          }}
                          className="flex items-center gap-2 py-1.5 text-[13px] text-left transition-colors"
                          style={{ color: checked ? C.primary : C.gray600, fontWeight: checked ? 600 : 400 }}>
                          <span className="w-3.5 h-3.5 flex-shrink-0 rounded border flex items-center justify-center"
                            style={{ borderColor: checked ? C.primary : C.gray300, backgroundColor: checked ? C.primary : 'white' }}>
                            {checked && <span className="text-white text-[9px] font-bold">✓</span>}
                          </span>
                          {sub.label}
                        </button>
                      )
                    })}
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </Section>

      {/* ── 3. Crop — hidden only in crop mode ───────────── */}
      {type !== 'crop' && (
        <Section id="crop" title="Crop">
          <div className="flex flex-col gap-2 max-h-48 overflow-y-auto pr-1">
            {ALL_CROPS.map(crop => (
              <label key={crop.slug} className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" checked={filters.crops.includes(crop.label)}
                  onChange={() => toggleArr('crops', crop.label)}
                  className="w-4 h-4 accent-green-600 rounded" />
                <span className="text-sm text-gray-700">{crop.label}</span>
              </label>
            ))}
          </div>
        </Section>
      )}

      {/* ── 4. Brand — hidden only in brand mode ─────────── */}
      {type !== 'brand' && (
        <Section id="brand" title="Brand">
          <div className="flex flex-col gap-2 max-h-48 overflow-y-auto pr-1">
            {ALL_BRANDS.map(b => (
              <label key={b.slug} className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" checked={filters.brands.includes(b.label)}
                  onChange={() => toggleArr('brands', b.label)}
                  className="w-4 h-4 accent-green-600 rounded" />
                <span className="text-sm text-gray-700">{b.label}</span>
              </label>
            ))}
          </div>
        </Section>
      )}

      {/* ── 5. Price Range ───────────────────────────────── */}
      <Section id="price" title="Price Range">
        <div className="flex flex-col gap-2">
          {PRICE_RANGES.map((r, i) => (
            <label key={i} className="flex items-center gap-2 cursor-pointer">
              <input type="radio" name="price_filter" checked={filters.priceRange === i}
                onChange={() => setFilters(p => ({ ...p, priceRange: p.priceRange === i ? null : i }))}
                className="w-4 h-4 accent-green-600" />
              <span className="text-sm text-gray-700">{r.label}</span>
            </label>
          ))}
        </div>
      </Section>

      {/* ── 6. Minimum Rating ────────────────────────────── */}
      <Section id="rating" title="Minimum Rating">
        <div className="flex flex-col gap-2">
          {MIN_RATINGS.map((r, i) => (
            <label key={i} className="flex items-center gap-2 cursor-pointer">
              <input type="radio" name="rating_filter" checked={filters.rating === i}
                onChange={() => setFilters(p => ({ ...p, rating: p.rating === i ? null : i }))}
                className="w-4 h-4 accent-green-600" />
              <span className="text-sm text-gray-700">{r}</span>
            </label>
          ))}
        </div>
      </Section>

    </div>
  )
}