import { useNavigate } from 'react-router-dom'
import { Search, Package, ShoppingCart, LogOut, User } from 'lucide-react'

const SellerHeader = () => {
  const navigate = useNavigate()

  return (
    <header className="h-[62px] px-5 flex items-center justify-between border-b border-gray-200 bg-white sticky top-0 z-50 shadow-sm">
      {/* Logo */}
      <span
        className="text-lg font-bold text-green-700 cursor-pointer select-none"
        onClick={() => navigate('/')}
      >
        🌾 BJ Spray Seller
      </span>

      {/* Search */}
      <div className="hidden md:flex items-center gap-2 bg-gray-100 rounded-lg px-3 py-2 w-[38%]">
        <Search size={15} className="text-gray-400" />
        <input
          placeholder="Search products, orders..."
          className="bg-transparent text-sm outline-none w-full text-gray-700 placeholder:text-gray-400"
        />
      </div>

      {/* Right Actions */}
      <div className="flex items-center gap-3">
        <button
          onClick={() => navigate('/inventory')}
          className="hidden md:flex items-center gap-1.5 text-sm font-medium text-gray-600 hover:text-green-700 transition"
        >
          <Package size={16} /> Inventory
        </button>
        <button
          onClick={() => navigate('/orders')}
          className="hidden md:flex items-center gap-1.5 text-sm font-medium text-gray-600 hover:text-green-700 transition"
        >
          <ShoppingCart size={16} /> Orders
        </button>

        {/* Avatar */}
        <button
          onClick={() => navigate('/profile')}
          className="flex items-center gap-2 hover:bg-gray-100 rounded-lg px-2 py-1 transition"
        >
          <div className="w-7 h-7 rounded-full bg-green-100 flex items-center justify-center">
            <User size={14} className="text-green-700" />
          </div>
          <span className="text-xs text-gray-500 hidden md:block">Seller</span>
        </button>

        <button
          onClick={() => navigate('/login')}
          className="flex items-center gap-1 text-xs text-red-500 hover:text-red-600 font-medium transition"
        >
          <LogOut size={14} /> Logout
        </button>
      </div>
    </header>
  )
}

export default SellerHeader