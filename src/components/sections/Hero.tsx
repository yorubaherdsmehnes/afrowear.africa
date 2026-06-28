import Image from "next/image";
import ScrollIndicator from "@/components/ui/ScrollIndicator";

export default function Hero() {
  return (
    <section className="relative h-screen w-full overflow-hidden bg-forest">
      <Image
        id="hero-image"
        data-hero="dress-shot"
        src="/images/dresses/hero.png"
        // TODO(alt-text): replace with a real description of this photo — garment, fabric, setting.
        // Find this element by id="hero-image" or data-hero="dress-shot".
        alt="Bespoke two-piece gown featuring a hand-beaded white lace bodice with dramatic bell sleeves, seamlessly paired with a custom-tailored, floor-length purple velvet skirt adorned with silver floral motifs — Afrowear.Africa"
        fill
        priority
        quality={95}
        sizes="100vw"
        // Mobile: portrait crop, centered. Desktop: landscape crop, framed on the torso.
        className="object-cover object-center md:object-[center_30%]"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-forest/80 via-forest/20 to-transparent " />
      <div className="absolute bottom-24 left-6 md:left-16 max-w-xl md:mb-8 mb-20">
        <p className="font-sans text-xs uppercase tracking-widest text-terracotta mb-4">
          Inaugural Collection · Lagos &amp; Abuja
        </p>
        <h1 className="font-serif text-5xl md:text-7xl text-sand leading-tight">
          Dressed in
          <br />
          <em className="text-terracotta not-italic">Provenance.</em>
        </h1>
        <p className="font-sans text-sm uppercase tracking-widest text-sand/60 mt-4">
          Bespoke African Occasion Wear — By Commission Only
        </p>
      </div>
      <ScrollIndicator />
    </section>
  );
}