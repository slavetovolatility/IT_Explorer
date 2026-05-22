import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { MobileBottomNav } from '@/components/layout/MobileBottomNav'
import { MobileDrawer } from '@/components/layout/MobileDrawer'
import { TweaksPanel } from '@/components/dev/TweaksPanel'

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header/>
      {children}
      <Footer/>
      <MobileBottomNav/>
      <MobileDrawer/>
      {process.env.NODE_ENV !== 'production' && <TweaksPanel/>}
    </>
  )
}
