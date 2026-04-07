import { useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { Eye, EyeOff, ArrowLeft, ChevronRight, Package, TrendingUp, ShieldCheck, Lock, Phone } from 'lucide-react'
import { colors, ui } from '../theme'

// ─── OTP Input ────────────────────────────────────────────────────────────────

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
          style={{
            borderColor: d ? colors.primary : colors.border,
            backgroundColor: d ? colors.primaryLight : '#fff',
            color: colors.primary,
          }}
        />
      ))}
    </div>
  )
}

// ─── Field ────────────────────────────────────────────────────────────────────

function Field({ label, value, onChange, placeholder, type = 'text', icon: Icon, rightEl, maxLength }) {
  return (
    <div>
      <label className="block text-xs font-semibold mb-1.5" style={{ color: colors.textPrimary }}>{label}</label>
      <div className="relative">
        {Icon && <Icon size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" style={{ color: colors.textMuted }} />}
        <input type={type} value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder}
          maxLength={maxLength}
          className="w-full rounded-xl border text-sm outline-none transition py-3"
          style={{
            paddingLeft: Icon ? '36px' : '14px',
            paddingRight: rightEl ? '44px' : '14px',
            borderColor: colors.border,
            color: colors.textPrimary,
          }}
          onFocus={e => e.currentTarget.style.borderColor = colors.primary}
          onBlur={e => e.currentTarget.style.borderColor = colors.border}
        />
        {rightEl && <div className="absolute right-3.5 top-1/2 -translate-y-1/2">{rightEl}</div>}
      </div>
    </div>
  )
}

function PwField({ label, value, onChange, placeholder }) {
  const [show, setShow] = useState(false)
  return (
    <Field label={label} value={value} onChange={onChange} placeholder={placeholder}
      type={show ? 'text' : 'password'} icon={Lock}
      rightEl={
        <button type="button" onClick={() => setShow(s => !s)}>
          {show
            ? <EyeOff size={15} style={{ color: colors.textMuted }} />
            : <Eye size={15} style={{ color: colors.textMuted }} />}
        </button>
      }
    />
  )
}

function Btn({ label, disabled, onClick }) {
  return (
    <button onClick={onClick} disabled={disabled}
      className="w-full py-3.5 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition"
      style={{
        backgroundColor: disabled ? '#D1D5DB' : colors.primary,
        color: '#fff',
        cursor: disabled ? 'not-allowed' : 'pointer',
      }}>
      {label} {!disabled && <ChevronRight size={15} />}
    </button>
  )
}

// ─── Left branding panel ──────────────────────────────────────────────────────

const PERKS = [
  { icon: Package,     text: 'Manage 100s of SKUs with bulk upload' },
  { icon: TrendingUp,  text: 'Real-time order alerts & analytics' },
  { icon: ShieldCheck, text: 'Guaranteed payments, zero credit risk' },
]

function LeftPanel() {
  return (
    <div className="hidden md:flex flex-col justify-between h-full px-10 py-12 flex-shrink-0"
      style={{ backgroundColor: colors.primary, width: '400px' }}>
      <div>
        <div className="flex items-center gap-2.5 mb-12">
          <span className="text-3xl">🌾</span>
          <div>
            <p className="font-extrabold text-lg tracking-tight text-white leading-none">Beej Spray</p>
            <p className="text-[10px] tracking-widest mt-0.5" style={{ color: 'rgba(255,255,255,0.45)' }}>SELLER PORTAL</p>
          </div>
        </div>
        <h2 className="text-3xl font-extrabold leading-snug mb-3 text-white">
          Welcome back,<br />Seller 👋
        </h2>
        <p className="text-sm mb-10" style={{ color: 'rgba(255,255,255,0.6)' }}>
          Manage your store, track orders, and grow your agri-business — all in one place.
        </p>
        <div className="space-y-4">
          {PERKS.map(({ icon: Icon, text }) => (
            <div key={text} className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
                style={{ backgroundColor: 'rgba(255,255,255,0.12)' }}>
                <Icon size={16} style={{ color: 'rgba(255,255,255,0.85)' }} />
              </div>
              <p className="text-sm" style={{ color: 'rgba(255,255,255,0.7)' }}>{text}</p>
            </div>
          ))}
        </div>
      </div>
      <p className="text-xs" style={{ color: 'rgba(255,255,255,0.3)' }}>
        © {new Date().getFullYear()} BeejSpray. All rights reserved.
      </p>
    </div>
  )
}

// ─── Main ─────────────────────────────────────────────────────────────────────

const S = { CREDS: 'creds', OTP: 'otp', FP_PHONE: 'fp_phone', FP_OTP: 'fp_otp', FP_PW: 'fp_pw', FP_DONE: 'fp_done' }

export default function Login() {
  const navigate = useNavigate()

  const [step, setStep]         = useState(S.CREDS)
  const [phone, setPhone]       = useState('')
  const [password, setPassword] = useState('')
  const [otp, setOtp]           = useState('')
  const [fpPhone, setFpPhone]   = useState('')
  const [fpOtp, setFpOtp]       = useState('')
  const [newPw, setNewPw]       = useState('')
  const [confPw, setConfPw]     = useState('')

  // ── Handlers — pure UI, no API ───────────────────────────────
  const handleLogin    = () => { if (phone.length === 10 && password) setStep(S.OTP) }
  const handleLoginOTP = () => { if (otp.length === 6) navigate('/dashboard') }
  const handleFpSend   = () => { if (fpPhone.length === 10) setStep(S.FP_OTP) }
  const handleFpVerify = () => { if (fpOtp.length === 6) setStep(S.FP_PW) }
  const handleReset    = () => { if (newPw && newPw === confPw) setStep(S.FP_DONE) }

  const renderForm = () => {
    /* ── Credentials ── */
    if (step === S.CREDS) return (
      <div className="space-y-5">
        <div>
          <h1 className="text-2xl font-extrabold" style={{ color: colors.textPrimary }}>Login to your account</h1>
          <p className="text-sm mt-1" style={{ color: colors.textSecondary }}>Enter your phone number and password</p>
        </div>
        <Field label="Phone Number" value={phone} onChange={setPhone}
          placeholder="10-digit mobile number" type="tel" icon={Phone} maxLength={10} />
        <PwField label="Password" value={password} onChange={setPassword} placeholder="Your password" />
        <Btn label="Send OTP" disabled={phone.length !== 10 || !password} onClick={handleLogin} />
        <button onClick={() => setStep(S.FP_PHONE)}
          className="text-xs font-semibold w-full text-center"
          style={{ color: colors.primary }}>
          Forgot password?
        </button>
      </div>
    )

    /* ── Login OTP ── */
    if (step === S.OTP) return (
      <div className="space-y-5">
        <button onClick={() => { setStep(S.CREDS); setOtp('') }}
          className="flex items-center gap-1.5 text-xs font-medium"
          style={{ color: colors.textSecondary }}>
          <ArrowLeft size={13} /> Back
        </button>
        <div>
          <h1 className="text-2xl font-extrabold" style={{ color: colors.textPrimary }}>Verify it's you</h1>
          <p className="text-sm mt-1" style={{ color: colors.textSecondary }}>OTP sent to +91 {phone} via WhatsApp</p>
        </div>
        <OTPInput value={otp} onChange={setOtp} />
        <Btn label="Verify & Login" disabled={otp.length !== 6} onClick={handleLoginOTP} />
        <button onClick={() => setOtp('')}
          className="text-xs font-medium w-full text-center" style={{ color: colors.textSecondary }}>
          Didn't receive OTP? <span style={{ color: colors.primary }}>Resend</span>
        </button>
      </div>
    )

    /* ── Forgot: Phone ── */
    if (step === S.FP_PHONE) return (
      <div className="space-y-5">
        <button onClick={() => setStep(S.CREDS)}
          className="flex items-center gap-1.5 text-xs font-medium" style={{ color: colors.textSecondary }}>
          <ArrowLeft size={13} /> Back to Login
        </button>
        <div>
          <h1 className="text-2xl font-extrabold" style={{ color: colors.textPrimary }}>Reset your password</h1>
          <p className="text-sm mt-1" style={{ color: colors.textSecondary }}>Enter your registered phone number</p>
        </div>
        <Field label="Phone Number" value={fpPhone} onChange={setFpPhone}
          placeholder="10-digit mobile number" type="tel" icon={Phone} maxLength={10} />
        <Btn label="Send OTP" disabled={fpPhone.length !== 10} onClick={handleFpSend} />
      </div>
    )

    /* ── Forgot: OTP ── */
    if (step === S.FP_OTP) return (
      <div className="space-y-5">
        <button onClick={() => { setStep(S.FP_PHONE); setFpOtp('') }}
          className="flex items-center gap-1.5 text-xs font-medium" style={{ color: colors.textSecondary }}>
          <ArrowLeft size={13} /> Back
        </button>
        <div>
          <h1 className="text-2xl font-extrabold" style={{ color: colors.textPrimary }}>Enter OTP</h1>
          <p className="text-sm mt-1" style={{ color: colors.textSecondary }}>Sent to +91 {fpPhone} via WhatsApp</p>
        </div>
        <OTPInput value={fpOtp} onChange={setFpOtp} />
        <Btn label="Verify OTP" disabled={fpOtp.length !== 6} onClick={handleFpVerify} />
      </div>
    )

    /* ── Forgot: New Password ── */
    if (step === S.FP_PW) return (
      <div className="space-y-5">
        <div>
          <h1 className="text-2xl font-extrabold" style={{ color: colors.textPrimary }}>Set new password</h1>
          <p className="text-sm mt-1" style={{ color: colors.textSecondary }}>Choose a strong password</p>
        </div>
        <PwField label="New Password" value={newPw} onChange={setNewPw} placeholder="Min. 8 characters" />
        <PwField label="Confirm Password" value={confPw} onChange={setConfPw} placeholder="Repeat password" />
        {newPw && confPw && newPw !== confPw && (
          <p className="text-xs" style={{ color: '#EF4444' }}>Passwords do not match</p>
        )}
        <Btn label="Reset Password" disabled={!newPw || newPw !== confPw} onClick={handleReset} />
      </div>
    )

    /* ── Forgot: Done ── */
    if (step === S.FP_DONE) return (
      <div className="text-center space-y-5">
        <div className="w-16 h-16 rounded-full mx-auto flex items-center justify-center text-3xl"
          style={{ backgroundColor: colors.primaryLight }}>✅</div>
        <div>
          <h1 className="text-2xl font-extrabold" style={{ color: colors.textPrimary }}>Password Reset!</h1>
          <p className="text-sm mt-1" style={{ color: colors.textSecondary }}>You can now log in with your new password</p>
        </div>
        <Btn label="Go to Login" onClick={() => { setStep(S.CREDS); setFpPhone(''); setFpOtp(''); setNewPw(''); setConfPw('') }} />
      </div>
    )
  }

  return (
    <div className="flex h-screen overflow-hidden" style={{ backgroundColor: colors.pageBg }}>
      <LeftPanel />
      <div className="flex-1 flex flex-col items-center justify-center px-6 py-10 overflow-y-auto">
        {/* Mobile logo */}
        <div className="flex items-center gap-2 mb-8 md:hidden">
          <span className="text-2xl">🌾</span>
          <span className="font-extrabold text-lg" style={{ color: colors.primary }}>Beej Spray</span>
        </div>

        <div className="w-full max-w-sm">
          {renderForm()}
          {step === S.CREDS && (
            <p className="text-center text-xs mt-6" style={{ color: colors.textSecondary }}>
              New seller?{' '}
              <button onClick={() => navigate('/register')} className="font-semibold" style={{ color: colors.primary }}>
                Create an account
              </button>
            </p>
          )}
        </div>
      </div>
    </div>
  )
}
