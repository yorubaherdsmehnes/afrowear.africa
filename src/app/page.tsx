import Navbar               from '@/components/layout/Navbar'
import MobileCommissionBar  from '@/components/layout/MobileCommissionBar'
import Footer               from '@/components/layout/Footer'
import Hero                 from '@/components/sections/Hero'
import Grid                 from '@/components/sections/Grid'
import HowItWorks           from '@/components/sections/HowItWorks'
import Proof                from '@/components/sections/Proof'
import VelvetRope           from '@/components/sections/VelvetRope'
import StylePersona from '@/components/sections/StylePersona'

export default function Home() {
  return (
    <main className="bg-forest text-sand min-h-screen">
      <Navbar />
      <Hero />
      <Grid />
      <HowItWorks />
      <Proof />
      <VelvetRope />
      <StylePersona />
      <Footer />
      <MobileCommissionBar />
    </main>
  )
}
