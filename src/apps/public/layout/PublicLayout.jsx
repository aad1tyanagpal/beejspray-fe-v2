import { Outlet } from 'react-router-dom'
import PublicHeader from './PublicHeader'
import PublicFooter from './PublicFooter'

export default function PublicLayout() {
  return (
    <div className="min-h-screen flex flex-col bg-pub-page-bg">
      <PublicHeader />
      <main className="flex-1 w-full pb-16 md:pb-0">
        <Outlet />
      </main>
      <PublicFooter />
    </div>
  )
}