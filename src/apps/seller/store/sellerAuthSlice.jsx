import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import api from '@/shared/services/axiosInstance'

// ─── Thunks ───────────────────────────────────────────────────────────────────

export const sendOTP = createAsyncThunk('sellerAuth/sendOTP',
  async (phone, { rejectWithValue }) => {
    try {
      await api.post('/auth/otp/send', { phone: Number(phone) })
      return phone
    } catch (e) { return rejectWithValue(e.response?.data?.error || 'Failed to send OTP') }
  }
)

export const verifyRegistrationOTP = createAsyncThunk('sellerAuth/verifyRegistrationOTP',
  async ({ phone, otp }, { rejectWithValue }) => {
    try {
      const res = await api.post('/auth/otp/verify', {
        phone: Number(phone), otp, role: 'SELLER', purpose: 'PHONE_VERIFICATION'
      })
      return res.data // { tempToken }
    } catch (e) { return rejectWithValue(e.response?.data?.error || 'Invalid OTP') }
  }
)

export const setPassword = createAsyncThunk('sellerAuth/setPassword',
  async ({ phone, password }, { getState, rejectWithValue }) => {
    try {
      const { tempToken } = getState().sellerAuth
      const res = await api.post(
        '/auth/seller/set-password',
        { phone: Number(phone), password, role: 'SELLER' },
        { headers: { Authorization: `Bearer ${tempToken}` } }
      )
      return res.data // { token }
    } catch (e) { return rejectWithValue(e.response?.data?.error || 'Failed to set password') }
  }
)

export const loginWithPassword = createAsyncThunk('sellerAuth/loginWithPassword',
  async ({ phone, password }, { rejectWithValue }) => {
    try {
      await api.post('/auth/seller-admin/login', { phone: Number(phone), password, role: 'SELLER' })
      return phone
    } catch (e) { return rejectWithValue(e.response?.data?.error || 'Invalid credentials') }
  }
)

export const verifyLoginOTP = createAsyncThunk('sellerAuth/verifyLoginOTP',
  async ({ phone, otp }, { rejectWithValue }) => {
    try {
      const res = await api.post('/auth/otp/verify', {
        phone: Number(phone), otp, role: 'SELLER', purpose: 'SELLER/ADMIN LOGIN'
      })
      return res.data // { token }
    } catch (e) { return rejectWithValue(e.response?.data?.error || 'Invalid OTP') }
  }
)

export const sendForgotOTP = createAsyncThunk('sellerAuth/sendForgotOTP',
  async (phone, { rejectWithValue }) => {
    try {
      await api.post('/auth/forgot-password/send-otp', { phone: Number(phone) })
      return phone
    } catch (e) { return rejectWithValue(e.response?.data?.error || 'Failed to send OTP') }
  }
)

export const verifyForgotOTP = createAsyncThunk('sellerAuth/verifyForgotOTP',
  async ({ phone, otp }, { rejectWithValue }) => {
    try {
      const res = await api.post('/auth/otp/verify', {
        phone: Number(phone), otp, role: 'SELLER', purpose: 'FORGOT_PASSWORD'
      })
      return res.data // { tempToken }
    } catch (e) { return rejectWithValue(e.response?.data?.error || 'Invalid OTP') }
  }
)

export const resetPassword = createAsyncThunk('sellerAuth/resetPassword',
  async ({ phone, password }, { getState, rejectWithValue }) => {
    try {
      const { tempToken } = getState().sellerAuth
      await api.post(
        '/auth/forgot-password/reset-password',
        { phone: Number(phone), password, role: 'SELLER' },
        { headers: { Authorization: `Bearer ${tempToken}` } }
      )
    } catch (e) { return rejectWithValue(e.response?.data?.error || 'Failed to reset password') }
  }
)

// ─── Helpers ──────────────────────────────────────────────────────────────────

const KEY = 'seller_token'
const pending  = (s) => { s.loading = true;  s.error = null }
const rejected = (s, a) => { s.loading = false; s.error = a.payload }

// ─── Slice ────────────────────────────────────────────────────────────────────

const sellerAuthSlice = createSlice({
  name: 'sellerAuth',
  initialState: {
    token:           localStorage.getItem(KEY) || null,
    tempToken:       null,
    isAuthenticated: !!localStorage.getItem(KEY),
    loading:         false,
    error:           null,
  },
  reducers: {
    clearError: (s) => { s.error = null },
    logout: (s) => {
      s.token = null; s.tempToken = null; s.isAuthenticated = false
      localStorage.removeItem(KEY)
    },
  },
  extraReducers: (b) => {
    b
      // sendOTP
      .addCase(sendOTP.pending, pending)
      .addCase(sendOTP.fulfilled, (s) => { s.loading = false })
      .addCase(sendOTP.rejected, rejected)

      // verifyRegistrationOTP → store tempToken
      .addCase(verifyRegistrationOTP.pending, pending)
      .addCase(verifyRegistrationOTP.fulfilled, (s, a) => {
        s.loading = false; s.tempToken = a.payload.tempToken
      })
      .addCase(verifyRegistrationOTP.rejected, rejected)

      // setPassword → full token, account created
      .addCase(setPassword.pending, pending)
      .addCase(setPassword.fulfilled, (s, a) => {
        s.loading = false; s.token = a.payload.token
        s.isAuthenticated = true
        localStorage.setItem(KEY, a.payload.token)
      })
      .addCase(setPassword.rejected, rejected)

      // loginWithPassword → OTP sent, wait for verifyLoginOTP
      .addCase(loginWithPassword.pending, pending)
      .addCase(loginWithPassword.fulfilled, (s) => { s.loading = false })
      .addCase(loginWithPassword.rejected, rejected)

      // verifyLoginOTP → full token
      .addCase(verifyLoginOTP.pending, pending)
      .addCase(verifyLoginOTP.fulfilled, (s, a) => {
        s.loading = false; s.token = a.payload.token
        s.isAuthenticated = true
        localStorage.setItem(KEY, a.payload.token)
      })
      .addCase(verifyLoginOTP.rejected, rejected)

      // sendForgotOTP
      .addCase(sendForgotOTP.pending, pending)
      .addCase(sendForgotOTP.fulfilled, (s) => { s.loading = false })
      .addCase(sendForgotOTP.rejected, rejected)

      // verifyForgotOTP → tempToken for reset
      .addCase(verifyForgotOTP.pending, pending)
      .addCase(verifyForgotOTP.fulfilled, (s, a) => {
        s.loading = false; s.tempToken = a.payload.tempToken
      })
      .addCase(verifyForgotOTP.rejected, rejected)

      // resetPassword
      .addCase(resetPassword.pending, pending)
      .addCase(resetPassword.fulfilled, (s) => { s.loading = false; s.tempToken = null })
      .addCase(resetPassword.rejected, rejected)
  },
})

export const { clearError, logout } = sellerAuthSlice.actions
export default sellerAuthSlice.reducer