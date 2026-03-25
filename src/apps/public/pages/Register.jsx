import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { C } from '../theme'
import { Check } from 'lucide-react'

const STEP = { PHONE: 'phone', OTP: 'otp', PROFILE: 'profile' }

const LANGUAGES = [
  { code: 'English',  label: 'English',  script: 'English'  },
  { code: 'Hindi',    label: 'हिंदी',     script: 'Hindi'    },
  { code: 'Punjabi',  label: 'ਪੰਜਾਬੀ',   script: 'Punjabi'  },
  { code: 'Gujarati', label: 'ગુજરાતી',  script: 'Gujarati' },
]

const StepIndicator = ({ current }) => {
  const steps = ['Mobile', 'Verify', 'Profile']
  return (
    <div className="flex items-center gap-2 mb-5">
      {steps.map((label, i) => {
        const idx   = i + 1
        const done  = current > idx
        const active = current === idx
        return (
          <div key={label} className="flex items-center gap-2 flex-1 last:flex-none">
            <div className="flex items-center gap-1.5">
              <div
                className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0"
                style={{
                  backgroundColor: done ? C.primary : active ? C.accent : C.gray200,
                  color: done || active ? C.white : C.gray500,
                }}
              >
                {done ? <Check size={12} strokeWidth={3} /> : idx}
              </div>
              <span
                className="text-xs font-semibold"
                style={{ color: active ? C.gray900 : done ? C.primary : C.gray400 }}
              >
                {label}
              </span>
            </div>
            {i < steps.length - 1 && (
              <div
                className="flex-1 h-px mx-1"
                style={{ backgroundColor: done ? C.primary : C.gray200 }}
              />
            )}
          </div>
        )
      })}
    </div>
  )
}

export default function Register() {
  const navigate = useNavigate()

  const [step, setStep]       = useState(STEP.PHONE)
  const [phone, setPhone]     = useState('')
  const [otp, setOtp]         = useState('')
  const [name, setName]       = useState('')
  const [address1, setAddress1] = useState('')
  const [address2, setAddress2] = useState('')
  const [city, setCity]         = useState('')
  const [pincode, setPincode]   = useState('')
  const [state, setState]       = useState('')
  const [lang, setLang]         = useState('English')

  const stepNum = step === STEP.PHONE ? 1 : step === STEP.OTP ? 2 : 3

  const handleSendOtp   = () => { if (phone.length === 10) setStep(STEP.OTP) }
  const handleVerifyOtp = () => { if (otp.length === 6) setStep(STEP.PROFILE) }
  const handleRegister  = () => {
    console.log('Register:', { phone, name, address1, address2, city, pincode, state, lang })
    // dispatch registerUser({ phone, name, address1, address2, city, pincode, state, lang }) — wire later
    navigate('/')
  }

  const headerText = {
    [STEP.PHONE]:   { title: 'Create your account',     sub: 'Enter your mobile number to get started' },
    [STEP.OTP]:     { title: 'Verify your number',       sub: `OTP sent to +91 ${phone} via WhatsApp` },
    [STEP.PROFILE]: { title: 'Almost there!',            sub: 'Tell us a little about yourself' },
  }

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
            {headerText[step].title}
          </p>
          <p className="mt-1 text-sm" style={{ color: C.headerNavHover }}>
            {headerText[step].sub}
          </p>
        </div>

        {/* White form body */}
        <div className="bg-white px-7 py-6 flex flex-col gap-4">

          <StepIndicator current={stepNum} />

          {/* ── Step 1: Phone ── */}
          {step === STEP.PHONE && (
            <>
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-semibold" style={{ color: C.gray700 }}>
                  Mobile Number
                </label>
                <div
                  className="flex items-center rounded-lg overflow-hidden transition-all"
                  style={{ border: `1.5px solid ${C.gray200}` }}
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

              <button
                onClick={handleSendOtp}
                disabled={phone.length !== 10}
                className="w-full py-3 rounded-lg text-sm font-bold text-white transition-all disabled:opacity-40 disabled:cursor-not-allowed"
                style={{ backgroundColor: C.primary }}
                onMouseEnter={e => { if (phone.length === 10) e.currentTarget.style.backgroundColor = C.primaryDark }}
                onMouseLeave={e => { e.currentTarget.style.backgroundColor = C.primary }}
              >
                Send OTP
              </button>
            </>
          )}

          {/* ── Step 2: OTP ── */}
          {step === STEP.OTP && (
            <>
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
                    fontSize: '1.1rem',
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

              <button
                onClick={handleVerifyOtp}
                disabled={otp.length !== 6}
                className="w-full py-3 rounded-lg text-sm font-bold text-white transition-all disabled:opacity-40 disabled:cursor-not-allowed"
                style={{ backgroundColor: C.primary }}
                onMouseEnter={e => { if (otp.length === 6) e.currentTarget.style.backgroundColor = C.primaryDark }}
                onMouseLeave={e => { e.currentTarget.style.backgroundColor = C.primary }}
              >
                Verify OTP
              </button>

              <button
                onClick={() => { setStep(STEP.PHONE); setOtp('') }}
                className="w-full py-2 rounded-lg text-sm font-semibold transition-all"
                style={{ color: C.primary, border: `1.5px solid ${C.primaryLight}` }}
                onMouseEnter={e => { e.currentTarget.style.backgroundColor = C.primaryLight }}
                onMouseLeave={e => { e.currentTarget.style.backgroundColor = 'transparent' }}
              >
                ← Change number
              </button>
            </>
          )}

          {/* ── Step 3: Profile ── */}
          {step === STEP.PROFILE && (
            <>
              {/* Full Name */}
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-semibold" style={{ color: C.gray700 }}>
                  Full Name
                </label>
                <input
                  type="text"
                  placeholder="Enter your full name"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-lg text-sm outline-none transition-all"
                  style={{ border: `1.5px solid ${C.gray200}`, color: C.gray900 }}
                  onFocus={e => e.currentTarget.style.borderColor = C.primary}
                  onBlur={e => e.currentTarget.style.borderColor = C.gray200}
                />
              </div>

              {/* Address Line 1 */}
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-semibold" style={{ color: C.gray700 }}>
                  Address Line 1
                </label>
                <input
                  type="text"
                  placeholder="House / Plot no., Street, Village"
                  value={address1}
                  onChange={e => setAddress1(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-lg text-sm outline-none transition-all"
                  style={{ border: `1.5px solid ${C.gray200}`, color: C.gray900 }}
                  onFocus={e => e.currentTarget.style.borderColor = C.primary}
                  onBlur={e => e.currentTarget.style.borderColor = C.gray200}
                />
              </div>

              {/* Address Line 2 */}
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-semibold" style={{ color: C.gray700 }}>
                  Address Line 2{' '}
                  <span className="font-normal" style={{ color: C.gray400 }}>(Optional)</span>
                </label>
                <input
                  type="text"
                  placeholder="Tehsil, Landmark"
                  value={address2}
                  onChange={e => setAddress2(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-lg text-sm outline-none transition-all"
                  style={{ border: `1.5px solid ${C.gray200}`, color: C.gray900 }}
                  onFocus={e => e.currentTarget.style.borderColor = C.primary}
                  onBlur={e => e.currentTarget.style.borderColor = C.gray200}
                />
              </div>

              {/* City + Pincode side by side */}
              <div className="grid grid-cols-2 gap-3">
                <div className="flex flex-col gap-1.5">
                  <label className="text-sm font-semibold" style={{ color: C.gray700 }}>City / Town</label>
                  <input
                    type="text"
                    placeholder="e.g. Anupgarh"
                    value={city}
                    onChange={e => setCity(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-lg text-sm outline-none transition-all"
                    style={{ border: `1.5px solid ${C.gray200}`, color: C.gray900 }}
                    onFocus={e => e.currentTarget.style.borderColor = C.primary}
                    onBlur={e => e.currentTarget.style.borderColor = C.gray200}
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-sm font-semibold" style={{ color: C.gray700 }}>Pincode</label>
                  <input
                    type="tel"
                    inputMode="numeric"
                    maxLength={6}
                    placeholder="6-digit"
                    value={pincode}
                    onChange={e => setPincode(e.target.value.replace(/\D/g, ''))}
                    className="w-full px-3 py-2.5 rounded-lg text-sm outline-none transition-all"
                    style={{ border: `1.5px solid ${C.gray200}`, color: C.gray900 }}
                    onFocus={e => e.currentTarget.style.borderColor = C.primary}
                    onBlur={e => e.currentTarget.style.borderColor = C.gray200}
                  />
                </div>
              </div>

              {/* State dropdown */}
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-semibold" style={{ color: C.gray700 }}>State</label>
                <select
                  value={state}
                  onChange={e => setState(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-lg text-sm outline-none transition-all appearance-none"
                  style={{
                    border: `1.5px solid ${state ? C.primary : C.gray200}`,
                    color: state ? C.gray900 : C.gray400,
                    backgroundColor: C.white,
                  }}
                  onFocus={e => e.currentTarget.style.borderColor = C.primary}
                  onBlur={e => e.currentTarget.style.borderColor = state ? C.primary : C.gray200}
                >
                  <option value="" disabled>Select your state</option>
                    {[
                    'Andhra Pradesh','Arunachal Pradesh','Assam','Bihar','Chhattisgarh',
                    'Goa','Gujarat','Haryana','Himachal Pradesh','Jharkhand','Karnataka',
                    'Kerala','Madhya Pradesh','Maharashtra','Manipur','Meghalaya','Mizoram',
                    'Nagaland','Odisha','Punjab','Rajasthan','Sikkim','Tamil Nadu','Telangana',
                    'Tripura','Uttar Pradesh','Uttarakhand','West Bengal',
                    'Andaman & Nicobar Islands','Chandigarh','Dadra & Nagar Haveli and Daman & Diu',
                    'Delhi','Jammu & Kashmir','Ladakh','Lakshadweep','Puducherry'
                  ].map(s => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
                <p className="text-xs" style={{ color: C.gray500 }}>
                  Used to show products &amp; vendors available in your area
                </p>
              </div>

              {/* Language */}
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-semibold" style={{ color: C.gray700 }}>
                  Preferred Language
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {LANGUAGES.map(l => (
                    <button
                      key={l.code}
                      onClick={() => setLang(l.code)}
                      className="py-2 rounded-lg transition-all flex flex-col items-center gap-0.5"
                      style={{
                        border: `1.5px solid ${lang === l.code ? C.primary : C.gray200}`,
                        backgroundColor: lang === l.code ? C.primaryLight : C.white,
                        color: lang === l.code ? C.primaryDark : C.gray500,
                      }}
                    >
                      <span className="text-sm font-bold">{l.label}</span>
                      {l.code !== 'English' && (
                        <span className="text-[10px] font-medium" style={{ color: lang === l.code ? C.primary : C.gray400 }}>
                          {l.script}
                        </span>
                      )}
                    </button>
                  ))}
                </div>
              </div>

              <button
                onClick={handleRegister}
                disabled={!name.trim() || !address1.trim() || !city.trim() || pincode.length !== 6 || !state}
                className="w-full py-3 rounded-lg text-sm font-bold text-white transition-all disabled:opacity-40 disabled:cursor-not-allowed mt-1"
                style={{ backgroundColor: C.accent }}
                onMouseEnter={e => { if (name.trim() && pincode.length === 6) e.currentTarget.style.backgroundColor = C.accentDark }}
                onMouseLeave={e => { e.currentTarget.style.backgroundColor = C.accent }}
              >
                Create Account
              </button>
            </>
          )}
        </div>
      </div>

      {/* ── Already have account ─────────────────────────── */}
      <div className="w-full max-w-sm flex items-center gap-3 my-5">
        <div className="flex-1 border-t" style={{ borderColor: C.gray200 }} />
        <span className="text-xs font-medium" style={{ color: C.gray400 }}>Already have an account?</span>
        <div className="flex-1 border-t" style={{ borderColor: C.gray200 }} />
      </div>

      <button
        onClick={() => navigate('/login')}
        className="w-full max-w-sm py-3 rounded-xl text-sm font-bold transition-all"
        style={{ color: C.primaryDark, border: `1.5px solid ${C.primary}`, backgroundColor: C.white }}
        onMouseEnter={e => { e.currentTarget.style.backgroundColor = C.primaryLight }}
        onMouseLeave={e => { e.currentTarget.style.backgroundColor = C.white }}
      >
        Sign In Instead
      </button>
    </div>
  )
}