import Discover from "../persona/Discover";
import { trackClick } from "@/lib/analytics";

// Shown in-place after successful form submission
export default function Confirmation() {
  return (
    <div className="text-center flex flex-col gap-6">
      <h2 className="font-serif text-4xl text-sand">The Ledger is Signed.</h2>
      <p className="font-sans text-sm text-sand/60 leading-relaxed">
        We will reach out on WhatsApp within 48 hours to begin interpreting your
        vision.
      </p>
      <a
        href="https://instagram.com/afrowear.africa"
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => trackClick('Instagram', 'Confirmation Screen')}
        className="font-sans text-xs uppercase tracking-widest text-terracotta hover:text-sand transition-colors"
      >
        Follow our work on Instagram →
      </a>
      <div className="mt-16 pt-12 border-t border-sand/10">
        <p className="font-sans text-xs tracking-widest uppercase text-terracotta mb-2">
          While You Wait
        </p>
        <p className="font-sans text-sm text-sand/40 leading-relaxed mb-12 max-w-md">
          The atelier is at work. In the meantime — five questions that will
          tell you something true about how you dress.
        </p>
        <Discover postCommission />
      </div>
    </div>
  );
}
