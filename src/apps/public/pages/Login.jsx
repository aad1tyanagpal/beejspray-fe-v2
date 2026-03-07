import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AppButton, AppInput, AppCard, AppText } from '@/shared/components/common'

function Login() {
  const navigate = useNavigate()
  const [phone, setPhone] = useState('')

  const handleLogin = () => {
    console.log("Login with:", phone)
    // dispatch loginUser here later
  }

  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4 py-10">
      <AppCard className="w-full max-w-sm flex flex-col gap-4">
        <div className="text-center">
          <span className="text-3xl">🌾</span>
          <AppText variant="h2" className="mt-2">Kisan Login</AppText>
          <p className="text-sm text-gray-500 mt-1">Apna mobile number daalein</p>
        </div>

        <AppInput
          placeholder="Mobile Number"
          type="tel"
          value={phone}
          onChange={e => setPhone(e.target.value)}
        />
        <AppInput
          placeholder="Password"
          type="password"
        />

        <AppButton onClick={handleLogin}>
          Login
        </AppButton>

        <p className="text-center text-xs text-gray-400">
          Account nahi hai?{' '}
          <button onClick={() => navigate('/register')} className="text-pub-primary font-semibold hover:underline">
            Register karein
          </button>
        </p>
      </AppCard>
    </div>
  )
}

export default Login