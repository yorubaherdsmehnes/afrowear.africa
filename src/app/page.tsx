import Navbar               from '@/components/layout/Navbar'
import MobileCommissionBar  from '@/components/layout/MobileCommissionBar'
import Footer               from '@/components/layout/Footer'
import Hero                 from '@/components/sections/Hero'
import Grid                 from '@/components/sections/Grid'
import HowItWorks           from '@/components/sections/HowItWorks'
import Proof                from '@/components/sections/Proof'
import VelvetRope           from '@/components/sections/VelvetRope'
import StylePersona from '@/components/sections/StylePersona'
import SectionTracker from '@/components/analytics/SectionTracker'

export default function Home() {
  return (
    <main className="bg-forest text-sand min-h-screen">
      <Navbar />
      <SectionTracker name="Hero"><Hero /></SectionTracker>
      <SectionTracker name="Grid"><Grid /></SectionTracker>
      <SectionTracker name="How It Works"><HowItWorks /></SectionTracker>
      <SectionTracker name="Proof"><Proof /></SectionTracker>
      <SectionTracker name="Velvet Rope (Commission Gate)"><VelvetRope /></SectionTracker>
      <SectionTracker name="Style Persona"><StylePersona /></SectionTracker>
      <Footer />
      <MobileCommissionBar />
    </main>
  )
}
