import ExploreLanding from './ExploreLanding'

// ─── Mock trending products ───────────────────────────────────
// Replace with Redux selector / API call when backend is ready
import { ALL_BRANDS } from '../components/FilterSidebar'

const IMGS = [
  'https://images.unsplash.com/photo-1592838064575-70ed626d3a0e?w=300&h=300&fit=crop',
  'https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8?w=300&h=300&fit=crop',
  'https://images.unsplash.com/photo-1625244724120-1fd1d34d00f6?w=300&h=300&fit=crop',
  'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=300&h=300&fit=crop',
  'https://images.unsplash.com/photo-1500595046743-cd271d694d30?w=300&h=300&fit=crop',
  'https://images.unsplash.com/photo-1471193945509-9ad0617afabf?w=300&h=300&fit=crop',
]

const TRENDING_PRODUCTS = [
  { id: 't1', brand: 'Syngenta',   name: 'Tomato Saho Hybrid Seeds',        price: 580,  mrp: 680,  discount: '15%', rating: 4.2, reviews: 342,  boughtLastMonth: 128, inStock: true,  sizes: ['10g', '50g', '100g'],     img: IMGS[0] },
  { id: 't2', brand: 'Dhanuka',    name: 'Super D Insecticide 50% EC',      price: 890,  mrp: 990,  discount: '10%', rating: 4.0, reviews: 56,   boughtLastMonth: 39,  inStock: true,  sizes: ['100ml', '250ml', '1L'],   img: IMGS[1] },
  { id: 't3', brand: 'Neptune',    name: 'Neptune 16L Battery Sprayer',     price: 2450, mrp: null, discount: null,  rating: 3.8, reviews: 1024, boughtLastMonth: 210, inStock: true,  sizes: ['16L'],                    img: IMGS[2] },
  { id: 't4', brand: 'IFFCO',      name: 'NPK 19:19:19 Water Soluble',      price: 120,  mrp: 150,  discount: null,  rating: 4.3, reviews: 80,   boughtLastMonth: 340, inStock: true,  sizes: ['500g', '1kg', '5kg'],     img: IMGS[3] },
  { id: 't5', brand: 'Bayer',      name: 'Confidor Insecticide 17.8% SL',   price: 420,  mrp: 450,  discount: '5%',  rating: 4.7, reviews: 89,   boughtLastMonth: 67,  inStock: true,  sizes: ['50ml', '100ml', '250ml'], img: IMGS[4] },
  { id: 't6', brand: 'Advanta',    name: 'Okra Raadhika F1 Hybrid Seeds',   price: 1650, mrp: 1800, discount: null,  rating: 4.5, reviews: 128,  boughtLastMonth: 54,  inStock: true,  sizes: ['50g', '100g'],            img: IMGS[5] },
  { id: 't7', brand: 'Mahyco',     name: 'Bt Cotton MRC 7351 Seeds',        price: 930,  mrp: 1050, discount: '11%', rating: 4.1, reviews: 76,   boughtLastMonth: 92,  inStock: false, sizes: ['475g'],                   img: IMGS[0] },
  { id: 't8', brand: 'UPL',        name: 'Saaf Fungicide 75% WP',           price: 310,  mrp: 360,  discount: '14%', rating: 4.3, reviews: 98,   boughtLastMonth: 45,  inStock: true,  sizes: ['100g', '250g', '500g'],   img: IMGS[1] },
  { id: 't9', brand: 'Coromandel', name: 'Boron 20% Micronutrient',         price: 340,  mrp: 380,  discount: null,  rating: 3.9, reviews: 15,   boughtLastMonth: null,inStock: true,  sizes: ['250g', '500g'],           img: IMGS[3] },
  { id:'t10', brand: 'FMC',        name: 'Coragen Insecticide 18.5% SC',    price: 1650, mrp: 1800, discount: '8%',  rating: 4.8, reviews: 203,  boughtLastMonth: 88,  inStock: true,  sizes: ['60ml', '150ml'],          img: IMGS[4] },
]

export default function TrendingPage() {
  return <ExploreLanding title="Trending Now" products={TRENDING_PRODUCTS} />
}