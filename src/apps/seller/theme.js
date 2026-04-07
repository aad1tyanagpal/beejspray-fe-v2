/**
 * BeejSpray Seller — Design Tokens
 * Single source of truth for all colors, derived from Dashboard.jsx
 * Usage: import { colors, gradients, ui } from '@/apps/seller/theme'
 */

export const colors = {
  // ── Core Brand ───────────────────────────────────────────────
  primary:        '#1A3C1F',   // Deep forest green — buttons, chart, badges, icons
  primaryLight:   '#EEF7EE',   // Light green — icon bg, badge bg, hover tints

  // ── Surfaces ─────────────────────────────────────────────────
  sidebar:        '#1E293B',   // Dark slate — sidebar background
  pageBg:         '#FFFBEB',   // Warm cream — main page / body background
  card:           '#FFFFFF',   // White — card backgrounds

  // ── Text on dark (sidebar) ────────────────────────────────────
  textOnDark:         '#FFFFFF',
  textOnDarkMuted:    'rgba(255,255,255,0.55)',
  textOnDarkSubtle:   'rgba(255,255,255,0.85)',

  // ── Text on light ─────────────────────────────────────────────
  textPrimary:    '#111827',   // gray-900
  textSecondary:  '#6B7280',   // gray-500
  textMuted:      '#9CA3AF',   // gray-400

  // ── Borders ───────────────────────────────────────────────────
  border:         '#E5E7EB',   // gray-200
  borderOnDark:   'rgba(255,255,255,0.10)',

  // ── State / Status ────────────────────────────────────────────
  activeNavBg:    'rgba(167,139,250,0.20)',  // purple tint — active sidebar item
  danger:         '#F87171',   // red-400 — notification dot

  // ── Avatar fallback ───────────────────────────────────────────
  avatarBg:       '#16A34A',   // green-600
}

export const gradients = {
  // Hero / CTA sections — derived from primary
  hero:     `linear-gradient(135deg, ${colors.primary} 0%, #2D6A35 100%)`,
  heroSoft: `linear-gradient(135deg, #2D6A35 0%, #3A7D44 100%)`,

  // Chart fill gradient — matches Dashboard AreaChart
  chartFill: `linear-gradient(to bottom, rgba(26,60,31,0.15) 5%, rgba(26,60,31,0) 95%)`,
}

export const ui = {
  // Border radius tokens
  radius: {
    sm:   '8px',
    md:   '12px',
    lg:   '16px',
    xl:   '20px',
    full: '9999px',
  },

  // Shadow tokens
  shadow: {
    card:   '0 1px 3px rgba(0,0,0,0.06), 0 1px 2px rgba(0,0,0,0.04)',
    popover:'0 4px 12px rgba(0,0,0,0.08)',
    hero:   '0 8px 32px rgba(26,60,31,0.25)',
  },

  // Sidebar width
  sidebarWidth: '220px',

  // Header height
  headerHeight: '62px',
}

// ── Semantic aliases (for quick intent-based usage) ──────────────
export const semantic = {
  success:  colors.primary,
  successBg: colors.primaryLight,
  warning:  '#F59E0B',   // amber-400
  warningBg:'#FEF3C7',   // amber-50
  error:    '#EF4444',   // red-500
  errorBg:  '#FEE2E2',   // red-50
  info:     '#3B82F6',   // blue-500
  infoBg:   '#EFF6FF',   // blue-50
}