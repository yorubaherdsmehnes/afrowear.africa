// Renders a decorative SVG divider using an Adire or Aso Oke pattern
export default function AfricanDivider({ className }: { className?: string }) {
  return (
    <div className={className}>
      {/* TODO: replace with actual adire-pattern.svg or inline SVG */}
      <div className="w-full h-px bg-sand/10" />
    </div>
  )
}
