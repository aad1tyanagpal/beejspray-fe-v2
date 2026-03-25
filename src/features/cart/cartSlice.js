import { createSlice } from '@reduxjs/toolkit'

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [
      // Mock data — backend wire-up ke time hatana
      { id: 1, name: 'Bayer Confidor 200 SL Insecticide', brand: 'Bayer', size: '250ml', img: 'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=120&h=120&fit=crop', retailPrice: 480, mrp: 560, qty: 2 },
      { id: 2, name: 'Syngenta Ridomil Gold Fungicide',   brand: 'Syngenta', size: '100g', img: 'https://images.unsplash.com/photo-1471193945509-9ad0617afabf?w=120&h=120&fit=crop', retailPrice: 320, mrp: 320, qty: 1 },
      { id: 3, name: 'IFFCO NPK 19:19:19 Water Soluble',  brand: 'IFFCO',    size: '1kg',  img: 'https://images.unsplash.com/photo-1628352081506-83c43123ed6d?w=120&h=120&fit=crop', retailPrice: 120, mrp: 150, qty: 3 },
    ],
  },
  reducers: {
    addItem(state, action) {
      const existing = state.items.find(i => i.id === action.payload.id)
      if (existing) existing.qty += 1
      else state.items.push({ ...action.payload, qty: 1 })
    },
    removeItem(state, action) {
      state.items = state.items.filter(i => i.id !== action.payload)
    },
    updateQty(state, action) {
      const { id, qty } = action.payload
      const item = state.items.find(i => i.id === id)
      if (item) item.qty = Math.max(1, qty)
    },
    clearCart(state) {
      state.items = []
    },
  },
})

export const { addItem, removeItem, updateQty, clearCart } = cartSlice.actions
export default cartSlice.reducer