import { useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Eye, EyeOff, ArrowLeft, ChevronRight, UploadCloud,
  Check, Phone, Lock, Clock, MapPin, Banknote, FileText,
  Building2, CheckCircle2, ShieldCheck, LogOut, Headphones,
  MessageCircle, X
} from 'lucide-react'
import { colors } from '../theme'

// ─── All steps in one flat list ───────────────────────────────────────────────
// stepIndex 0–2 = Auth phase, 3–8 = KYC phase

const ALL_STEPS = [
  { label: 'Phone Verification', icon: Phone },
  { label: 'Set Password',       icon: Lock },
  { label: 'Business Details',   icon: Building2 },
  { label: 'Documents',          icon: FileText },
  { label: 'Bank Details',       icon: Banknote },
  { label: 'Shop Location',      icon: MapPin },
  { label: 'Operational Hours',  icon: Clock },
  { label: 'Review & Submit',    icon: CheckCircle2 },
]

// Map phase+step → flat index
const flatIndex = (phase, authStep, kycStep) => {
  if (phase === 'auth') return authStep          // 0, 1, 2  (but we show OTP under Phone, so 0=phone,1=otp→also 0, 2=pw→1)
  return 2 + kycStep                             // 2..7
}

// Auth sub-steps
const A = { PHONE: 0, OTP: 1, PASSWORD: 2 }
// KYC steps
const K = { BUSINESS: 0, DOCUMENTS: 1, BANK: 2, LOCATION: 3, HOURS: 4, REVIEW: 5 }

const DAYS   = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
const STATES = [
  'Andhra Pradesh','Arunachal Pradesh','Assam','Bihar','Chhattisgarh','Goa',
  'Gujarat','Haryana','Himachal Pradesh','Jharkhand','Karnataka','Kerala',
  'Madhya Pradesh','Maharashtra','Manipur','Meghalaya','Mizoram','Nagaland',
  'Odisha','Punjab','Rajasthan','Sikkim','Tamil Nadu','Telangana','Tripura',
  'Uttar Pradesh','Uttarakhand','West Bengal',
  'Delhi','Jammu & Kashmir','Ladakh','Chandigarh','Puducherry',
]

// ─── Shared atoms ─────────────────────────────────────────────────────────────

function OTPInput({ value, onChange }) {
  const refs = useRef([])
  const digits = Array.from({ length: 6 }, (_, i) => value[i] || '')
  const set = (i, char) => {
    const d = [...digits]; d[i] = char; onChange(d.join(''))
    if (char && i < 5) refs.current[i + 1]?.focus()
  }
  const onKeyDown = (i, e) => {
    if (e.key === 'Backspace') {
      if (digits[i]) { const d = [...digits]; d[i] = ''; onChange(d.join('')) }
      else if (i > 0) refs.current[i - 1]?.focus()
    }
  }
  const onPaste = (e) => {
    e.preventDefault()
    const p = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 6)
    onChange(p); refs.current[Math.min(p.length, 5)]?.focus()
  }
  return (
    <div className="flex gap-2" onPaste={onPaste}>
      {digits.map((d, i) => (
        <input key={i} ref={el => refs.current[i] = el}
          type="text" inputMode="numeric" maxLength={1} value={d}
          onChange={e => set(i, e.target.value.replace(/\D/g, '').slice(-1))}
          onKeyDown={e => onKeyDown(i, e)}
          className="flex-1 h-12 text-center text-xl font-bold rounded-xl border-2 outline-none transition"
          style={{ borderColor: d ? colors.primary : colors.border, backgroundColor: d ? colors.primaryLight : '#fff', color: colors.primary }}
        />
      ))}
    </div>
  )
}

function Field({ label, value, onChange, placeholder, type = 'text', required, icon: Icon, maxLength, as, children }) {
  const base = "w-full rounded-xl border text-sm outline-none transition py-3 px-3.5"
  const s = { borderColor: colors.border, color: colors.textPrimary }
  const onFocus = e => e.currentTarget.style.borderColor = colors.primary
  const onBlur  = e => e.currentTarget.style.borderColor = colors.border
  return (
    <div>
      <label className="block text-xs font-semibold mb-1.5" style={{ color: colors.textPrimary }}>
        {label}{required && <span style={{ color: '#EF4444' }}> *</span>}
      </label>
      <div className="relative">
        {Icon && <Icon size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" style={{ color: colors.textMuted }} />}
        {as === 'select' ? (
          <select value={value} onChange={e => onChange(e.target.value)} onFocus={onFocus} onBlur={onBlur}
            className={base} style={{ ...s, paddingLeft: Icon ? '36px' : '14px' }}>{children}</select>
        ) : as === 'textarea' ? (
          <textarea value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder}
            rows={3} onFocus={onFocus} onBlur={onBlur}
            className={base} style={{ ...s, paddingLeft: Icon ? '36px' : '14px', resize: 'none' }} />
        ) : (
          <input type={type} value={value} onChange={e => onChange(e.target.value)}
            placeholder={placeholder} maxLength={maxLength} onFocus={onFocus} onBlur={onBlur}
            className={base} style={{ ...s, paddingLeft: Icon ? '36px' : '14px' }} />
        )}
      </div>
    </div>
  )
}

function PwField({ label, value, onChange, placeholder, required }) {
  const [show, setShow] = useState(false)
  return (
    <div>
      <label className="block text-xs font-semibold mb-1.5" style={{ color: colors.textPrimary }}>
        {label}{required && <span style={{ color: '#EF4444' }}> *</span>}
      </label>
      <div className="relative">
        <Lock size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" style={{ color: colors.textMuted }} />
        <input type={show ? 'text' : 'password'} value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder}
          className="w-full rounded-xl border text-sm outline-none transition py-3"
          style={{ paddingLeft: '36px', paddingRight: '44px', borderColor: colors.border, color: colors.textPrimary }}
          onFocus={e => e.currentTarget.style.borderColor = colors.primary}
          onBlur={e => e.currentTarget.style.borderColor = colors.border}
        />
        <button type="button" onClick={() => setShow(s => !s)} className="absolute right-3.5 top-1/2 -translate-y-1/2">
          {show ? <EyeOff size={15} style={{ color: colors.textMuted }} /> : <Eye size={15} style={{ color: colors.textMuted }} />}
        </button>
      </div>
    </div>
  )
}

function FileUpload({ label, file, onChange, required }) {
  const ref = useRef(null)
  return (
    <div>
      <label className="block text-xs font-semibold mb-1.5" style={{ color: colors.textPrimary }}>
        {label}{required && <span style={{ color: '#EF4444' }}> *</span>}
      </label>
      <button type="button" onClick={() => ref.current.click()}
        className="w-full flex items-center gap-3 px-4 py-3 rounded-xl border-2 border-dashed text-left transition"
        style={{ borderColor: file ? colors.primary : colors.border, backgroundColor: file ? colors.primaryLight : '#FAFAFA' }}>
        <UploadCloud size={16} style={{ color: file ? colors.primary : colors.textMuted }} />
        <span className="text-sm truncate flex-1" style={{ color: file ? colors.primary : colors.textMuted }}>
          {file ? file.name : `Upload ${label}`}
        </span>
        {file && <Check size={14} style={{ color: colors.primary }} />}
      </button>
      <input ref={ref} type="file" className="hidden" accept="image/*,.pdf"
        onChange={e => onChange(e.target.files?.[0] || null)} />
    </div>
  )
}

function Btn({ label, disabled, onClick }) {
  return (
    <button onClick={onClick} disabled={disabled}
      className="w-full py-3.5 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition"
      style={{ backgroundColor: disabled ? '#D1D5DB' : colors.primary, color: '#fff', cursor: disabled ? 'not-allowed' : 'pointer' }}>
      {label}{!disabled && <ChevronRight size={15} />}
    </button>
  )
}

function SectionTitle({ title, sub }) {
  return (
    <div className="mb-6">
      <h2 className="text-xl font-extrabold" style={{ color: colors.textPrimary }}>{title}</h2>
      {sub && <p className="text-sm mt-1" style={{ color: colors.textSecondary }}>{sub}</p>}
    </div>
  )
}

function ReviewSection({ title, rows }) {
  return (
    <div className="rounded-2xl border p-5 mb-4" style={{ borderColor: colors.border }}>
      <p className="text-xs font-bold uppercase tracking-wider mb-3" style={{ color: colors.primary }}>{title}</p>
      <div className="space-y-2">
        {rows.map(([k, v]) => v ? (
          <div key={k} className="flex justify-between gap-4 text-sm">
            <span style={{ color: colors.textSecondary }}>{k}</span>
            <span className="font-medium text-right" style={{ color: colors.textPrimary }}>{v}</span>
          </div>
        ) : null)}
      </div>
    </div>
  )
}

// ─── Left branding panel (same as Login) ─────────────────────────────────────

const PERKS = [
  { icon: Building2,   text: 'Free digital storefront — no setup cost' },
  { icon: MapPin,      text: 'Auto order routing based on your location' },
  { icon: Banknote,    text: 'Guaranteed payments, zero credit risk' },
  { icon: ShieldCheck, text: 'KYC verified — trusted by farmers' },
]

function LeftBranding() {
  return (
    <div className="hidden md:flex flex-col justify-between h-full px-8 py-10 flex-shrink-0"
      style={{ backgroundColor: colors.primary, width: '300px' }}>
      <div>
        {/* Logo */}
        <div className="flex items-center gap-2.5 mb-10">
          <span className="text-2xl">🌾</span>
          <div>
            <p className="font-extrabold text-base tracking-tight text-white leading-none">Beej Spray</p>
            <p className="text-[9px] tracking-widest mt-0.5" style={{ color: 'rgba(255,255,255,0.4)' }}>SELLER HUB</p>
          </div>
        </div>
        <h2 className="text-2xl font-extrabold text-white leading-snug mb-3">
          Start selling to<br />farmers nearby 🌱
        </h2>
        <p className="text-sm mb-8" style={{ color: 'rgba(255,255,255,0.6)' }}>
          Join hundreds of agri-dealers on BeejSpray. Free to register. Get orders from day one.
        </p>
        <div className="space-y-3.5">
          {PERKS.map(({ icon: Icon, text }) => (
            <div key={text} className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0"
                style={{ backgroundColor: 'rgba(255,255,255,0.12)' }}>
                <Icon size={15} style={{ color: 'rgba(255,255,255,0.85)' }} />
              </div>
              <p className="text-sm" style={{ color: 'rgba(255,255,255,0.72)' }}>{text}</p>
            </div>
          ))}
        </div>
      </div>
      <p className="text-xs" style={{ color: 'rgba(255,255,255,0.25)' }}>
        © {new Date().getFullYear()} BeejSpray. All rights reserved.
      </p>
    </div>
  )
}

// ─── Middle steps panel ───────────────────────────────────────────────────────

function StepsPanel({ currentIdx, phone }) {
  return (
    <div className="hidden md:flex flex-col h-full flex-shrink-0 border-r"
      style={{ width: '220px', backgroundColor: '#F9FBF9', borderColor: colors.border }}>

      {/* Header */}
      <div className="px-5 pt-7 pb-5 border-b" style={{ borderColor: colors.border }}>
        <p className="text-xs font-bold uppercase tracking-widest" style={{ color: colors.textSecondary }}>
          Onboarding steps
        </p>
      </div>

      {/* Steps list */}
      <div className="flex-1 px-5 py-5 overflow-y-auto">
        {ALL_STEPS.map((step, i) => {
          const done   = i < currentIdx
          const active = i === currentIdx
          return (
            <div key={step.label} className="flex gap-3">
              <div className="flex flex-col items-center">
                <div className="w-6 h-6 rounded-full flex items-center justify-center border-2 flex-shrink-0 transition-all"
                  style={{
                    backgroundColor: done ? colors.primary : active ? '#fff' : '#fff',
                    borderColor: done ? colors.primary : active ? colors.primary : colors.border,
                  }}>
                  {done
                    ? <Check size={11} style={{ color: '#fff' }} />
                    : active
                      ? <div className="w-2 h-2 rounded-full" style={{ backgroundColor: colors.primary }} />
                      : null}
                </div>
                {i < ALL_STEPS.length - 1 && (
                  <div className="w-px my-1"
                    style={{ height: 26, backgroundColor: done ? colors.primary : colors.border }} />
                )}
              </div>
              <div className="pb-5 pt-0.5">
                <p className="text-sm font-medium transition-all"
                  style={{ color: active ? colors.primary : done ? colors.textSecondary : '#C4C4C4' }}>
                  {step.label}
                </p>
              </div>
            </div>
          )
        })}
      </div>

      {/* Phone at bottom */}
      {phone && (
        <div className="px-5 py-4 border-t" style={{ borderColor: colors.border }}>
          <p className="text-[10px] mb-0.5" style={{ color: colors.textMuted }}>Login details</p>
          <p className="text-sm font-semibold" style={{ color: colors.textPrimary }}>+91 {phone}</p>
        </div>
      )}
    </div>
  )
}

// Mobile top progress bar
function MobileBar({ currentIdx }) {
  const step = ALL_STEPS[currentIdx]
  const StepIcon = step?.icon
  return (
    <div className="md:hidden flex flex-col"
      style={{ backgroundColor: colors.primary }}>

      {/* Header */}
      <div className="flex items-center justify-between px-4 pt-4 pb-2">
        <div className="flex items-center gap-2">
          <span className="text-lg">🌾</span>
          <div>
            <p className="font-extrabold text-sm text-white leading-none">Beej Spray</p>
            <p className="text-[9px] tracking-widest" style={{ color: 'rgba(255,255,255,0.5)' }}>SELLER HUB</p>
          </div>
        </div>
      </div>

      {/* Progress segments */}
      <div className="flex items-center gap-1 px-4 pt-1 pb-2">
        {ALL_STEPS.map((_, i) => (
          <div key={i} className="flex-1 h-1 rounded-full transition-all"
            style={{ backgroundColor: i <= currentIdx ? '#fff' : 'rgba(255,255,255,0.25)' }} />
        ))}
      </div>

      {/* Step label row */}
      <div className="flex items-center justify-between px-4 pb-3">
        <div className="flex items-center gap-2">
          {StepIcon && (
            <StepIcon size={14} style={{ color: 'rgba(255,255,255,0.85)' }} />
          )}
          <span className="text-sm font-semibold text-white">
            {step?.label}
          </span>
        </div>
        <span className="text-xs" style={{ color: 'rgba(255,255,255,0.55)' }}>
          Step {currentIdx + 1} of {ALL_STEPS.length}
        </span>
      </div>
    </div>
  )
}

// ─── Main ─────────────────────────────────────────────────────────────────────

function AssistanceButton() {
  const [open, setOpen] = useState(false)
  return (
    <>
      {/* Popup */}
      {open && (
        <div className="fixed bottom-24 right-5 z-50 w-72 rounded-2xl shadow-2xl border overflow-hidden"
          style={{ backgroundColor: '#fff', borderColor: colors.border }}>
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3"
            style={{ backgroundColor: colors.primary }}>
            <div className="flex items-center gap-2">
              <Headphones size={16} color="#fff" />
              <span className="text-sm font-bold text-white">Need Help?</span>
            </div>
            <button onClick={() => setOpen(false)}>
              <X size={15} color="rgba(255,255,255,0.8)" />
            </button>
          </div>
          {/* Options */}
          <div className="p-3 space-y-2">
            {[
              { icon: MessageCircle, label: 'Chat with us', sub: 'Instant replies on WhatsApp' },
              { icon: Phone,         label: 'Call Support', sub: 'Mon–Sat, 9 AM – 6 PM' },
            ].map(({ icon: Icon, label, sub }) => (
              <button key={label}
                className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-left transition hover:opacity-80"
                style={{ backgroundColor: colors.primaryLight }}>
                <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: colors.primary }}>
                  <Icon size={14} color="#fff" />
                </div>
                <div>
                  <p className="text-sm font-semibold" style={{ color: colors.textPrimary }}>{label}</p>
                  <p className="text-xs" style={{ color: colors.textSecondary }}>{sub}</p>
                </div>
              </button>
            ))}
          </div>
          <p className="text-center text-xs pb-3" style={{ color: colors.textMuted }}>
            We typically reply within a few minutes
          </p>
        </div>
      )}

      {/* FAB */}
      <button onClick={() => setOpen(o => !o)}
        className="fixed bottom-5 right-5 z-50 w-14 h-14 rounded-full shadow-xl flex items-center justify-center transition-transform active:scale-95"
        style={{ backgroundColor: colors.primary }}>
        {open
          ? <X size={20} color="#fff" />
          : <Headphones size={20} color="#fff" />}
      </button>
    </>
  )
}

export default function Register() {
  const navigate = useNavigate()

  const [phase, setPhase]       = useState('auth')   // 'auth' | 'kyc' | 'pending'
  const [authStep, setAuthStep] = useState(A.PHONE)
  const [kycStep, setKycStep]   = useState(K.BUSINESS)

  // Auth state
  const [phone, setPhone]   = useState('')
  const [otp, setOtp]       = useState('')
  const [pw, setPw]         = useState('')
  const [confPw, setConfPw] = useState('')

  // KYC state
  const [kyc, setKyc] = useState({
    businessName: '', ownerName: '', email: '', shopAddress: '',
    aadhaarFile: null, panFile: null, gstNumber: '', gstCertFile: null,
    tradeLicenseFile: null, licenseType: 'Seed',
    accountHolder: '', accountNumber: '', ifsc: '', chequeFile: null,
    pickupAddress: '', city: '', pincode: '', state: 'Rajasthan',
    workingDays: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
    openTime: '09:00', closeTime: '18:00',
  })
  const upd = (k, v) => setKyc(d => ({ ...d, [k]: v }))

  // Compute the flat step index for the sidebar
  // Auth: phone/otp = 0, password = 1
  // KYC: business=2, docs=3, bank=4, location=5, hours=6, review=7
  const sidebarIdx = phase === 'auth'
    ? (authStep === A.PASSWORD ? 1 : 0)
    : 2 + kycStep

  // ── Auth handlers ────────────────────────────────────────────
  const handleSendOTP  = () => { if (phone.length === 10) setAuthStep(A.OTP) }
  const handleVerifyOTP = () => { if (otp.length === 6) setAuthStep(A.PASSWORD) }
  const handleSetPw    = () => { if (pw.length >= 8 && pw === confPw) setPhase('kyc') }

  // ── KYC handlers ────────────────────────────────────────────
  const nextKyc = () => kycStep < K.REVIEW ? setKycStep(s => s + 1) : setPhase('pending')
  const prevKyc = () => kycStep > K.BUSINESS && setKycStep(s => s - 1)

  // ── Right panel content ──────────────────────────────────────
  const renderRight = () => {

    // ── AUTH ────────────────────────────────────────────────────
    if (phase === 'auth') {
      if (authStep === A.PHONE) return (
        <div className="space-y-5">
          <div>
            <h1 className="text-2xl font-extrabold" style={{ color: colors.textPrimary }}>Create your account</h1>
            <p className="text-sm mt-1" style={{ color: colors.textSecondary }}>Enter your mobile number to get started</p>
          </div>
          <Field label="Phone Number" value={phone} onChange={setPhone}
            placeholder="10-digit mobile number" type="tel" icon={Phone} maxLength={10} required />
          <Btn label="Send OTP" disabled={phone.length !== 10} onClick={handleSendOTP} />
          <p className="text-center text-xs" style={{ color: colors.textSecondary }}>
            Already registered?{' '}
            <button onClick={() => navigate('/login')} className="font-semibold" style={{ color: colors.primary }}>Log in</button>
          </p>
        </div>
      )

      if (authStep === A.OTP) return (
        <div className="space-y-5">
          <button onClick={() => { setAuthStep(A.PHONE); setOtp('') }}
            className="flex items-center gap-1.5 text-xs font-medium" style={{ color: colors.textSecondary }}>
            <ArrowLeft size={13} /> Back
          </button>
          <div>
            <h1 className="text-2xl font-extrabold" style={{ color: colors.textPrimary }}>Verify your number</h1>
            <p className="text-sm mt-1" style={{ color: colors.textSecondary }}>OTP sent to +91 {phone} via WhatsApp</p>
          </div>
          <OTPInput value={otp} onChange={setOtp} />
          <Btn label="Verify OTP" disabled={otp.length !== 6} onClick={handleVerifyOTP} />
          <button onClick={() => setOtp('')} className="text-xs font-medium w-full text-center" style={{ color: colors.textSecondary }}>
            Didn't receive OTP? <span style={{ color: colors.primary }}>Resend</span>
          </button>
        </div>
      )

      if (authStep === A.PASSWORD) return (
        <div className="space-y-5">
          <div>
            <h1 className="text-2xl font-extrabold" style={{ color: colors.textPrimary }}>Set your password</h1>
            <p className="text-sm mt-1" style={{ color: colors.textSecondary }}>You'll use this to log in each time</p>
          </div>
          <PwField label="Password" value={pw} onChange={setPw} placeholder="Min. 8 characters" required />
          <PwField label="Confirm Password" value={confPw} onChange={setConfPw} placeholder="Repeat password" required />
          {pw && confPw && pw !== confPw && (
            <p className="text-xs" style={{ color: '#EF4444' }}>Passwords do not match</p>
          )}
          <Btn label="Continue to KYC" disabled={pw.length < 8 || pw !== confPw} onClick={handleSetPw} />
        </div>
      )
    }

    // ── KYC ────────────────────────────────────────────────────
    if (phase === 'kyc') {
      const form = (() => {
        if (kycStep === K.BUSINESS) return (
          <div className="space-y-5">
            <SectionTitle title="Business Details" sub="Tell us about your shop" />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Field label="Business / Shop Name" value={kyc.businessName} onChange={v => upd('businessName', v)} placeholder="e.g. Ramesh Agri Store" required />
              <Field label="Owner Full Name" value={kyc.ownerName} onChange={v => upd('ownerName', v)} placeholder="As per Aadhaar" required />
            </div>
            <Field label="Email Address" value={kyc.email} onChange={v => upd('email', v)} placeholder="your@email.com" type="email" />
            <Field label="Shop Address" value={kyc.shopAddress} onChange={v => upd('shopAddress', v)} placeholder="Full address of your shop" as="textarea" required />
          </div>
        )
        if (kycStep === K.DOCUMENTS) return (
          <div className="space-y-5">
            <SectionTitle title="KYC Documents" sub="Upload clear photos or scanned copies" />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <FileUpload label="Aadhaar Card" file={kyc.aadhaarFile} onChange={v => upd('aadhaarFile', v)} required />
              <FileUpload label="PAN Card" file={kyc.panFile} onChange={v => upd('panFile', v)} required />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Field label="GST Number" value={kyc.gstNumber} onChange={v => upd('gstNumber', v)} placeholder="22AAAAA0000A1Z5" maxLength={15} required />
              <FileUpload label="GST Certificate" file={kyc.gstCertFile} onChange={v => upd('gstCertFile', v)} required />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Field label="Trade License Type" value={kyc.licenseType} onChange={v => upd('licenseType', v)} as="select" required>
                <option value="Seed">Seed License</option>
                <option value="Fertilizer">Fertilizer License</option>
                <option value="Pesticide">Pesticide License</option>
                <option value="Multiple">Multiple Licenses</option>
              </Field>
              <FileUpload label="Trade License" file={kyc.tradeLicenseFile} onChange={v => upd('tradeLicenseFile', v)} required />
            </div>
          </div>
        )
        if (kycStep === K.BANK) return (
          <div className="space-y-5">
            <SectionTitle title="Bank Details" sub="For receiving order settlements" />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Field label="Account Holder Name" value={kyc.accountHolder} onChange={v => upd('accountHolder', v)} placeholder="As per bank records" required />
              <Field label="Account Number" value={kyc.accountNumber} onChange={v => upd('accountNumber', v)} placeholder="Bank account number" type="tel" required />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Field label="IFSC Code" value={kyc.ifsc} onChange={v => upd('ifsc', v.toUpperCase())} placeholder="e.g. SBIN0001234" maxLength={11} required />
              <FileUpload label="Cancelled Cheque" file={kyc.chequeFile} onChange={v => upd('chequeFile', v)} required />
            </div>
            <div className="p-4 rounded-xl text-sm" style={{ backgroundColor: '#EFF6FF', color: '#1D4ED8' }}>
              ℹ️ Settlements are processed within 7 working days after the commission hold period.
            </div>
          </div>
        )
        if (kycStep === K.LOCATION) return (
          <div className="space-y-5">
            <SectionTitle title="Shop Location" sub="Where should orders be picked up from?" />
            <Field label="Pickup Address" value={kyc.pickupAddress} onChange={v => upd('pickupAddress', v)} placeholder="Full pickup address" as="textarea" required />
            <div className="grid grid-cols-2 gap-4">
              <Field label="City / Tehsil" value={kyc.city} onChange={v => upd('city', v)} placeholder="e.g. Anupgarh" required />
              <Field label="Pincode" value={kyc.pincode} onChange={v => upd('pincode', v)} placeholder="6-digit pincode" type="tel" maxLength={6} required />
            </div>
            <Field label="State" value={kyc.state} onChange={v => upd('state', v)} as="select" required>
              {STATES.map(s => <option key={s} value={s}>{s}</option>)}
            </Field>
          </div>
        )
        if (kycStep === K.HOURS) return (
          <div className="space-y-6">
            <SectionTitle title="Operational Hours" sub="When is your shop open to accept orders?" />
            <div>
              <p className="text-xs font-semibold mb-3" style={{ color: colors.textPrimary }}>
                Working Days <span style={{ color: '#EF4444' }}>*</span>
              </p>
              <div className="flex flex-wrap gap-2">
                {DAYS.map(d => {
                  const active = kyc.workingDays.includes(d)
                  return (
                    <button key={d} type="button"
                      onClick={() => upd('workingDays', active ? kyc.workingDays.filter(x => x !== d) : [...kyc.workingDays, d])}
                      className="px-3.5 py-2 rounded-xl text-sm font-semibold transition"
                      style={{ backgroundColor: active ? colors.primary : '#F3F4F6', color: active ? '#fff' : colors.textSecondary }}>
                      {d}
                    </button>
                  )
                })}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <Field label="Opening Time" value={kyc.openTime} onChange={v => upd('openTime', v)} type="time" icon={Clock} required />
              <Field label="Closing Time" value={kyc.closeTime} onChange={v => upd('closeTime', v)} type="time" icon={Clock} required />
            </div>
          </div>
        )
        if (kycStep === K.REVIEW) return (
          <div>
            <SectionTitle title="Review & Submit" sub="Verify your information before submitting" />
            <ReviewSection title="Business Details" rows={[
              ['Business Name', kyc.businessName], ['Owner Name', kyc.ownerName],
              ['Email', kyc.email || '—'], ['Shop Address', kyc.shopAddress],
            ]} />
            <ReviewSection title="Documents" rows={[
              ['Aadhaar', kyc.aadhaarFile?.name], ['PAN', kyc.panFile?.name],
              ['GST Number', kyc.gstNumber], ['Trade License', `${kyc.licenseType} — ${kyc.tradeLicenseFile?.name || '—'}`],
            ]} />
            <ReviewSection title="Bank Details" rows={[
              ['Account Holder', kyc.accountHolder], ['Account No.', kyc.accountNumber], ['IFSC', kyc.ifsc],
            ]} />
            <ReviewSection title="Location" rows={[
              ['Address', kyc.pickupAddress], ['City', kyc.city], ['Pincode', kyc.pincode], ['State', kyc.state],
            ]} />
            <ReviewSection title="Operational Hours" rows={[
              ['Working Days', kyc.workingDays.join(', ')], ['Hours', `${kyc.openTime} – ${kyc.closeTime}`],
            ]} />
            <div className="mt-4 p-4 rounded-xl text-sm" style={{ backgroundColor: colors.primaryLight, color: colors.primary }}>
              ✅ KYC will be reviewed by our team within 24 hours of submission.
            </div>
          </div>
        )
      })()

      return (
        <>
          {form}
          <div className="flex gap-3 mt-8">
            {kycStep > K.BUSINESS && (
              <button onClick={prevKyc}
                className="flex items-center gap-2 px-5 py-3 rounded-xl font-semibold text-sm border transition"
                style={{ borderColor: colors.border, color: colors.textSecondary, backgroundColor: '#fff' }}>
                <ArrowLeft size={14} /> Back
              </button>
            )}
            <Btn label={kycStep === K.REVIEW ? 'Submit for Review' : 'Save & Continue'} onClick={nextKyc} />
          </div>
        </>
      )
    }
  }

  // ── PENDING ──────────────────────────────────────────────────
  if (phase === 'pending') {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-6 py-16 text-center"
        style={{ backgroundColor: colors.pageBg }}>
        <div className="w-20 h-20 rounded-full flex items-center justify-center text-4xl mb-6"
          style={{ backgroundColor: colors.primaryLight }}>⏳</div>
        <h1 className="text-2xl font-extrabold mb-2" style={{ color: colors.textPrimary }}>Application Under Review</h1>
        <p className="text-sm max-w-sm mb-2" style={{ color: colors.textSecondary }}>
          Your KYC has been submitted. Our team will review your documents and activate your account within <strong>24 hours</strong>.
        </p>
        <p className="text-sm mb-8" style={{ color: colors.textSecondary }}>
          You'll be notified on <strong>+91 {phone}</strong> via WhatsApp once approved.
        </p>
        <button onClick={() => navigate('/')}
          className="text-sm font-semibold px-6 py-3 rounded-xl"
          style={{ backgroundColor: colors.primary, color: '#fff' }}>
          Back to Home
        </button>
      </div>
    )
  }

  // ── MAIN LAYOUT ──────────────────────────────────────────────
  return (
    <div className="flex h-screen overflow-hidden" style={{ backgroundColor: colors.pageBg }}>
      {/* Col 1 — Branding */}
      <LeftBranding />

      {/* Col 2 — Steps */}
      <StepsPanel currentIdx={sidebarIdx} phone={authStep >= A.OTP ? phone : ''} />

      {/* Col 3 — Form */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <MobileBar currentIdx={sidebarIdx} />
        <div className="flex-1 overflow-y-auto">
          <div className="max-w-xl mx-auto px-6 md:px-12 py-12">
            {/* Mobile logo */}
            <div className="flex items-center gap-2 mb-8 md:hidden">
              <span className="text-2xl">🌾</span>
              <span className="font-extrabold text-lg" style={{ color: colors.primary }}>Beej Spray</span>
            </div>
            {renderRight()}
          </div>
        </div>
      </div>
      <AssistanceButton />
    </div>
  )
}