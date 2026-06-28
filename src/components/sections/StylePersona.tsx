import AfricanDivider from '@/components/ui/AfricanDivider'
import Discover from '@/components/persona/Discover'

export default function StylePersona() {
  return (
    <section id="discover" className="px-6 md:px-16 py-24 bg-linen">
      <AfricanDivider className="mb-12" />

      {/* Eyebrow */}
      <p className="font-sans text-md uppercase tracking-widest text-terracotta mb-4">
        The Persona
      </p>

      {/* Headline + subline */}
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16">
        <h2 className="font-serif text-4xl md:text-5xl text-forest leading-tight max-w-lg">
          Sixteen archetypes.<br />One is yours.
        </h2>
        <p className="font-sans text-sm text-forest/60 leading-relaxed max-w-sm md:text-right">
          Five questions. A precise result. And if you want to go deeper —
          every archetype has a full style profile, a textile recommendation,
          and a commission brief waiting for you.
        </p>
      </div>

      {/* Discover component */}
      <Discover />
    </section>
  )
}