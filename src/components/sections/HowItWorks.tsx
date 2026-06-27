import AfricanDivider from '@/components/ui/AfricanDivider'

const STEPS = [
  {
    n: '01',
    title: 'Provenance',
    body: 'Fabric sourced from the source. Every thread originates within West Africa — Aso Oke from Iseyin, Ankara prints from Kaduna mills. The material is the message.',
  },
  {
    n: '02',
    title: 'The Commission',
    body: 'One piece, one person. No two commissions share a pattern. Each garment is crafted to your occasion, your silhouette, your story.',
  },
  {
    n: '03',
    title: 'The Occasion',
    body: 'Owambe. AMVCA. Naming day. Nigerian occasions demand clothing that speaks before you do. We dress the moment as much as the woman.',
  },
]

export default function HowItWorks() {
  return (
    <section className="px-6 md:px-16 py-24">
      <AfricanDivider className="mb-12" />
      <p className="font-sans text-md uppercase tracking-widest text-terracotta mb-10">The Commission</p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
        {STEPS.map(step => (
          <div key={step.n} className="flex flex-col gap-4">
            <span className="font-sans text-xs text-sand/30 tracking-widest">{step.n}</span>
            <h3 className="font-serif text-xl text-sand">{step.title}</h3>
            <p className="font-sans text-md text-sand/60 leading-relaxed">{step.body}</p>
          </div>
        ))}
      </div>
      <p className="font-sans text-sm text-sand/30 mt-16 max-w-2xl leading-relaxed">
        We work with Ankara, Aso Oke, silk-lace, adire, and hand-loomed fabrics sourced from Nigeria and across
        West Africa, crafted in Abuja. Share your vision — receive your piece in 2–6 weeks.
      </p>
    </section>
  )
}
