import { createSlice } from '@reduxjs/toolkit'

const wishlistSlice = createSlice({
  name: 'wishlist',
  initialState: {
    items: [], // [{ id, name, brand, img, price, mrp, discount, rating, reviews, sizes, inStock }]
  },
  reducers: {
    addToWishlist(state, action) {
      const exists = state.items.find(i => i.id === action.payload.id)
      if (!exists) state.items.push(action.payload)
    },
    removeFromWishlist(state, action) {
      state.items = state.items.filter(i => i.id !== action.payload)
    },
    toggleWishlist(state, action) {
      const idx = state.items.findIndex(i => i.id === action.payload.id)
      if (idx !== -1) state.items.splice(idx, 1)
      else state.items.push(action.payload)
    },
    clearWishlist(state) {
      state.items = []
    },
  },
})

export const { addToWishlist, removeFromWishlist, toggleWishlist, clearWishlist } = wishlistSlice.actions
export default wishlistSlice.reducer