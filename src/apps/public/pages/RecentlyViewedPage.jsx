import ExploreLanding from './ExploreLanding'

// ─── Mock recently viewed products ───────────────────────────
// Replace with Redux selector (state.recentlyViewed) when ready
const IMGS = [
  'https://images.unsplash.com/photo-1592838064575-70ed626d3a0e?w=300&h=300&fit=crop',
  'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=300&h=300&fit=crop',
  'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=300&h=300&fit=crop',
  'https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8?w=300&h=300&fit=crop',
  'https://images.unsplash.com/photo-1625244724120-1fd1d34d00f6?w=300&h=300&fit=crop',
]

const RECENTLY_VIEWED_PRODUCTS = [
  { id: 'rv1', brand: 'Syngenta',  name: 'Tomato Saho Hybrid Seeds',       price: 580,  mrp: 680,  discount: '15%', rating: 4.2, reviews: 342,  boughtLastMonth: 128, inStock: true,  sizes: ['10g', '50g', '100g'],     img: IMGS[0] },
  { id: 'rv2', brand: 'Dhanuka',   name: 'Super D Insecticide 50% EC',     price: 890,  mrp: 990,  discount: '10%', rating: 4.0, reviews: 56,   boughtLastMonth: 39,  inStock: true,  sizes: ['100ml', '250ml', '1L'],   img: IMGS[1] },
  { id: 'rv3', brand: 'IFFCO',     name: 'NPK 19:19:19 Water Soluble',     price: 120,  mrp: 150,  discount: null,  rating: 4.3, reviews: 80,   boughtLastMonth: 340, inStock: true,  sizes: ['500g', '1kg', '5kg'],     img: IMGS[2] },
  { id: 'rv4', brand: 'Bayer',     name: 'Confidor Insecticide 17.8% SL',  price: 420,  mrp: 450,  discount: '5%',  rating: 4.7, reviews: 89,   boughtLastMonth: 67,  inStock: true,  sizes: ['50ml', '100ml', '250ml'], img: IMGS[3] },
  { id: 'rv5', brand: 'Neptune',   name: 'Neptune 16L Battery Sprayer',    price: 2450, mrp: null, discount: null,  rating: 3.8, reviews: 1024, boughtLastMonth: 210, inStock: true,  sizes: ['16L'],                    img: IMGS[4] },
]

export default function RecentlyViewedPage() {
  return <ExploreLanding title="Recently Viewed" products={RECENTLY_VIEWED_PRODUCTS} />
}