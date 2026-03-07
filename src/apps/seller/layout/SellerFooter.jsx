const SellerFooter = () => {
  return (
    <div className="h-12 flex items-center justify-center border-t border-gray-200 bg-white">
      <p className="text-xs text-gray-400">
        © {new Date().getFullYear()} BeejSpray Seller Panel • All Rights Reserved
      </p>
    </div>
  )
}

export default SellerFooter