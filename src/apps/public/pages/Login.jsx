import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { C } from '../theme'

const STEP = { PHONE: 'phone', OTP: 'otp' }

export default function Login() {
  const navigate  = useNavigate()
  const [step, setStep]   = useState(STEP.PHONE)
  const [phone, setPhone] = useState('')
  const [otp, setOtp]     = useState('')

  const handleContinue = () => { if (phone.length === 10) setStep(STEP.OTP) }
  const handleVerify   = () => { navigate('/') }
  const handleBack     = () => { setStep(STEP.PHONE); setOtp('') }

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center px-4 py-10"
      style={{ backgroundColor: C.pageBg }}
    >
      {/* ── Logo ─────────────────────────────────────────── */}
      <div className="mb-6 flex flex-col items-center gap-0.5">
        <span className="text-4xl">🌾</span>
        <span className="text-2xl font-extrabold tracking-tight" style={{ color: C.headerBg }}>
          BeejSpray
        </span>
        <span className="text-[11px] font-semibold uppercase tracking-[2px]" style={{ color: C.accent }}>
          Kisan Ki Dukan
        </span>
      </div>

    {/* ── Card ─────────────────────────────────────────── */}
      <div
        className="w-full max-w-sm rounded-2xl overflow-hidden"
        style={{ border: `1.5px solid ${C.gray200}`, boxShadow: '0 8px 32px rgba(26,61,32,0.18)' }}
      >
        {/* Green header strip */}
        <div
          className="px-7 py-5"
          style={{ background: `linear-gradient(135deg, ${C.headerBg} 0%, #2D6A3F 100%)` }}
        >
          <p className="text-white text-xl font-bold leading-tight">
            {step === STEP.PHONE ? 'Sign in to your account' : 'Verify your number'}
          </p>
          <p className="mt-1 text-sm" style={{ color: C.headerNavHover }}>
            {step === STEP.PHONE
              ? 'We\'ll send a WhatsApp OTP to your number'
              : `OTP sent to +91 ${phone} via WhatsApp`
            }
          </p>
        </div>

        {/* White form body */}
        <div className="bg-white px-7 py-6 flex flex-col gap-5">

          {step === STEP.PHONE && (
            <>
              {/* Mobile input */}
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-semibold" style={{ color: C.gray700 }}>
                  Mobile Number
                </label>
                <div
                  className="flex items-center rounded-lg overflow-hidden transition-all"
                  style={{ border: `1.5px solid ${C.gray200}`, outline: 'none' }}
                  onFocusCapture={e => e.currentTarget.style.borderColor = C.primary}
                  onBlurCapture={e => e.currentTarget.style.borderColor = C.gray200}
                >
                  <span
                    className="px-3 py-2.5 text-sm font-semibold select-none border-r"
                    style={{ color: C.gray700, backgroundColor: C.primaryLight, borderColor: C.gray200 }}
                  >
                    +91
                  </span>
                  <input
                    type="tel"
                    inputMode="numeric"
                    maxLength={10}
                    placeholder="Enter 10-digit mobile number"
                    value={phone}
                    onChange={e => setPhone(e.target.value.replace(/\D/g, ''))}
                    className="flex-1 px-3 py-2.5 text-sm outline-none bg-white"
                    style={{ color: C.gray900 }}
                  />
                </div>
              </div>

              {/* Continue button */}
              <button
                onClick={handleContinue}
                disabled={phone.length !== 10}
                className="w-full py-3 rounded-lg text-sm font-bold text-white transition-all disabled:opacity-40 disabled:cursor-not-allowed"
                style={{ backgroundColor: phone.length === 10 ? C.primary : C.primary }}
                onMouseEnter={e => { if (phone.length === 10) e.currentTarget.style.backgroundColor = C.primaryDark }}
                onMouseLeave={e => { e.currentTarget.style.backgroundColor = C.primary }}
              >
                Continue
              </button>

              {/* Trust strip */}
              <div
                className="flex items-center gap-2 rounded-lg px-3 py-2.5"
                style={{ backgroundColor: C.primaryLight, border: `1px solid ${C.sectionBg3Border}` }}
              >
                <span className="text-lg">🔒</span>
                <p className="text-xs leading-snug" style={{ color: C.primaryDark }}>
                  Your number is safe with us. We never share your data with third parties.
                </p>
              </div>

              {/* Terms */}
              <p className="text-xs text-center leading-relaxed" style={{ color: C.gray500 }}>
                By continuing, you agree to our{' '}
                <span className="font-semibold cursor-pointer hover:underline" style={{ color: C.primary }}>Terms of Use</span>
                {' '}and{' '}
                <span className="font-semibold cursor-pointer hover:underline" style={{ color: C.primary }}>Privacy Policy</span>
              </p>
            </>
          )}

          {step === STEP.OTP && (
            <>
              {/* OTP input */}
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-semibold" style={{ color: C.gray700 }}>
                  One-Time Password (OTP)
                </label>
                <input
                  type="tel"
                  inputMode="numeric"
                  maxLength={6}
                  placeholder="Enter 6-digit OTP"
                  value={otp}
                  onChange={e => setOtp(e.target.value.replace(/\D/g, ''))}
                  className="w-full px-4 py-2.5 rounded-lg text-sm outline-none transition-all text-center tracking-[0.4em] font-bold"
                  style={{
                    border: `1.5px solid ${C.gray200}`,
                    color: C.gray900,
                    fontSize: '1.1rem'
                  }}
                  onFocus={e => e.currentTarget.style.borderColor = C.primary}
                  onBlur={e => e.currentTarget.style.borderColor = C.gray200}
                />
                <p className="text-xs" style={{ color: C.gray500 }}>
                  Didn't receive it?{' '}
                  <button
                    onClick={() => console.log('Resend OTP')}
                    className="font-semibold hover:underline"
                    style={{ color: C.accent }}
                  >
                    Resend OTP
                  </button>
                </p>
              </div>

              {/* Verify button */}
              <button
                onClick={handleVerify}
                disabled={otp.length !== 6}
                className="w-full py-3 rounded-lg text-sm font-bold text-white transition-all disabled:opacity-40 disabled:cursor-not-allowed"
                style={{ backgroundColor: C.primary }}
                onMouseEnter={e => { if (otp.length === 6) e.currentTarget.style.backgroundColor = C.primaryDark }}
                onMouseLeave={e => { e.currentTarget.style.backgroundColor = C.primary }}
              >
                Verify &amp; Sign In
              </button>

              {/* Back */}
              <button
                onClick={handleBack}
                className="w-full py-2 rounded-lg text-sm font-semibold transition-all"
                style={{
                  color: C.primary,
                  border: `1.5px solid ${C.primaryLight}`,
                  backgroundColor: 'transparent'
                }}
                onMouseEnter={e => { e.currentTarget.style.backgroundColor = C.primaryLight }}
                onMouseLeave={e => { e.currentTarget.style.backgroundColor = 'transparent' }}
              >
                ← Change number
              </button>
            </>
          )}
        </div>
      </div>

      {/* ── Divider ──────────────────────────────────────── */}
      <div className="w-full max-w-sm flex items-center gap-3 my-5">
        <div className="flex-1 border-t" style={{ borderColor: C.gray200 }} />
        <span className="text-xs font-medium" style={{ color: C.gray400 }}>New to BeejSpray?</span>
        <div className="flex-1 border-t" style={{ borderColor: C.gray200 }} />
      </div>

      {/* ── Create Account ───────────────────────────────── */}
      <button
        onClick={() => navigate('/register')}
        className="w-full max-w-sm py-3 rounded-xl text-sm font-bold transition-all"
        style={{
          color: C.white,
          backgroundColor: C.accent,
        }}
        onMouseEnter={e => { e.currentTarget.style.backgroundColor = C.accentDark }}
        onMouseLeave={e => { e.currentTarget.style.backgroundColor = C.accent }}
      >
        Create a New Account
      </button>


    </div>
  )
}