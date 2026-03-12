// ─────────────────────────────────────────────────────────────
//  BeejSpray PUBLIC APP — Single Source of Truth for Theme
//  Change here → entire public app updates
// ─────────────────────────────────────────────────────────────

export const C = {
  primary:          '#2D7A3E',
  primaryDark:      '#1F5C2D',
  primaryLight:     '#EEF7EE',
  accent:           '#E65C00',   // deep saffron
  accentDark:       '#C24B00',
  accentLight:      '#FFF0E0',
  pageBg:           '#FFFFFF',   // neutral gray — colored sections iske against pop karein
  sectionBg1:       '#FFFFFF',
  sectionBg2:       '#EEF6FF',   // warm saffron — clearly visible
  sectionBg3:       '#FFF8EC',   // fresh green — clearly visible
  sectionBg2Border: '#FFD580',   // saffron/golden section border
  sectionBg3Border: '#C6E8CC',   // soft green section border
  headerBg:         '#1A3D20',   // dark green header — slightly lighter
  headerBgDark:     '#112815',
  headerMid:        '#1A3D20',
  headerBottom:     '#0D1A0F',
  headerNavText:    '#FFFFFF',
  headerNavHover:   '#FFD580',   // golden hover
  footerBg:         '#111A06',
  footerBottom:     '#0D0700',
  cardImgBg:        '#FFF9F0',
  brandChipBg:      '#FFF3DC',
  brandChipText:    '#2D7A3E',
  sizeSelectBg:     '#EEF6FF',
  sizeArrowBg:      '#BDD9F7',
  discountBg:       '#E65C00',
  discountText:     '#FFFFFF',
  ratingBg:         '#2D7A3E',
  starFilled:       '#E65C00',   // saffron stars
  starEmpty:        '#E5E7EB',
  trustStripBg:     '#2D7A3E',   // bold green strip — like Bighaat's promo band
  trustStripBorder: '#1F5C2D',
  white:            '#FFFFFF',
  gray50:           '#FFF9F0',
  gray100:          '#F5EDE0',
  gray200:          '#E8D8C4',
  gray400:          '#B5956F',
  gray500:          '#8A6A45',
  gray700:          '#4A3520',
  gray800:          '#2E1F0F',
  gray900:          '#1A0E00',
  red:              '#EF4444',
  green:            '#25D366',
}

// Tailwind class bundles — use in className=""
export const T = {
  // ── Buttons ────────────────────────────────────────────────
  btnPrimary:    'bg-pub-primary hover:bg-pub-primary-dark text-white font-semibold transition-colors',
  btnOutline:    'border border-pub-primary text-pub-primary hover:bg-pub-primary hover:text-white font-semibold transition-colors',
  btnGhost:      'hover:bg-white/10 text-white transition-colors',
  btnAccent:     'bg-pub-accent hover:bg-pub-accent-dark text-white font-semibold transition-colors',

  // ── Cards ──────────────────────────────────────────────────
  card:          'bg-white rounded-xl border border-gray-200 shadow-card',
  cardHover:     'bg-white rounded-xl border border-gray-200 shadow-card hover:shadow-card-hover transition-all duration-200',

  // ── Section wrappers ───────────────────────────────────────
  sectionWhite:  'bg-white rounded-2xl border border-gray-100 shadow-card p-5',
  sectionGreen:  'bg-[#EEF6FF] rounded-2xl border border-[#BDD9F7] shadow-card p-5',
  sectionCream:  'bg-[#FFF8EC] rounded-2xl border border-[#FFD98E] shadow-card p-5',

  // ── Text ───────────────────────────────────────────────────
  sectionTitle:  'text-xl font-bold text-gray-900',
  label:         'text-[10px] font-bold text-gray-400 uppercase tracking-widest',

  // ── Header (now dark green bg) ─────────────────────────────
  headerBg:      'bg-pub-header border-b border-white/10',
  navItem:       'flex flex-col items-center px-2 py-1 rounded-lg hover:bg-white/10 transition-colors group cursor-pointer',
  navIcon:       'text-white group-hover:text-pub-header-nav-hover transition-colors',
  navLabel:      'text-[12px] font-medium text-white group-hover:text-pub-header-nav-hover transition-colors mt-0.5 leading-none',
}