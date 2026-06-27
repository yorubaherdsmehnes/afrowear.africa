// ─────────────────────────────────────────────
// Afrowear Style Persona Engine — data.ts
// ─────────────────────────────────────────────

export type Trait = {
  label: string;
  value: number; // 0–100
};

export type Domain = "social" | "work" | "creative" | "intimate";

export type DomainProfile = {
  domain: Domain;
  label: string;
  description: string;
  fabric: string;      // textile metaphor
  commission: string;  // suggested commission
};

export type Persona = {
  id: string;
  name: string;
  subtitle: string;
  eyebrow: string;    // uppercase tracked label
  description: string;
  voice: string;      // one-line editorial quote
  traits: Trait[];
  palette: string[];  // 2-3 hex colours that define this type
  domains: DomainProfile[];
  clashes: string[];  // ids of types that create productive tension
  affinities: string[]; // ids of types that harmonise
};

export type ClashScenario = {
  ids: [string, string];
  title: string;
  tension: string;
  resolution: string;
};

// ─── 16 Persona Types ────────────────────────

export const personas: Persona[] = [
  {
    id: "the-architect",
    name: "The Architect",
    subtitle: "Structure as Expression",
    eyebrow: "Form & Foundation",
    description:
      "You move through the world with considered deliberateness. Every piece in your wardrobe earns its place — chosen not for trend but for the precise tension it creates between structure and softness. Your style is a built thing, composed the way a building is composed: proportion, weight, negative space.",
    voice: "\"Restraint is not absence. It is discipline made visible.\"",
    traits: [
      { label: "Structure", value: 92 },
      { label: "Minimalism", value: 85 },
      { label: "Precision", value: 88 },
      { label: "Spontaneity", value: 18 },
      { label: "Ornamentation", value: 22 },
    ],
    palette: ["#2C2C2C", "#E5D3B3", "#8A9E94"],
    domains: [
      {
        domain: "social",
        label: "The Social Architect",
        description: "You anchor any room without announcing yourself. People notice the geometry of how you dress before they can name why.",
        fabric: "Aso Oke — structured weave, commands presence",
        commission: "A structured aso-oke two-piece with clean seam lines and a deliberate silhouette break at the hip.",
      },
      {
        domain: "work",
        label: "The Methodical",
        description: "Your work wardrobe is a uniform in the best sense: consistent, credible, quietly authoritative.",
        fabric: "Raw silk — discipline with warmth beneath",
        commission: "A tailored raw-silk agbada, deconstructed to boardroom proportion.",
      },
      {
        domain: "creative",
        label: "The Blueprint",
        description: "Creativity for you is a systems problem. The output may surprise; the process never does.",
        fabric: "Kente — geometric rigour, infinite variation",
        commission: "A Kente-panel wide-leg suit where the strip placement follows a deliberate mathematical rhythm.",
      },
      {
        domain: "intimate",
        label: "The Considered",
        description: "Even in repose you curate. Loungewear is still an intention.",
        fabric: "Adire — quiet, personal, resistant to easy reading",
        commission: "An adire lounge set, indigo-dyed in a geometric resist pattern designed to your specification.",
      },
    ],
    clashes: ["the-weaver", "the-flame"],
    affinities: ["the-cartographer", "the-vessel"],
  },
  {
    id: "the-weaver",
    name: "The Weaver",
    subtitle: "Connection as Craft",
    eyebrow: "Pattern & Community",
    description:
      "You dress as an act of belonging. Heritage, memory, and the people you love are threaded through every choice. Your wardrobe is not a collection — it is a conversation across generations, carried on your body.",
    voice: "\"What I wear tells you where I come from and where I am going.\"",
    traits: [
      { label: "Heritage", value: 94 },
      { label: "Community", value: 89 },
      { label: "Warmth", value: 91 },
      { label: "Individuality", value: 38 },
      { label: "Minimalism", value: 20 },
    ],
    palette: ["#CA6143", "#1A2421", "#D4A574"],
    domains: [
      {
        domain: "social",
        label: "The Gathering",
        description: "You are the reason people feel at home at any event. Your presence, like your dress, welcomes.",
        fabric: "Ankara — bold, communal, endlessly referential",
        commission: "A floor-length ankara boubou with family-print fabric, shaped for movement and ceremony.",
      },
      {
        domain: "work",
        label: "The Connector",
        description: "You bring people together across difference. Your wardrobe signals that you belong everywhere.",
        fabric: "Kente — a language worn, understood across boundaries",
        commission: "A Kente-trimmed blazer over a matching trouser — heritage signalling in a contemporary cut.",
      },
      {
        domain: "creative",
        label: "The Storyteller",
        description: "Every piece has a provenance. You wear the story of how it came to you.",
        fabric: "Strip-woven cloth — each band a sentence in a longer narrative",
        commission: "A pieced garment combining three heritage textiles from different regions, stitched into one coherent voice.",
      },
      {
        domain: "intimate",
        label: "The Keeper",
        description: "At home you wear what holds memory: a grandmother's print, a colour from your childhood town.",
        fabric: "Hand-batik — slow, deliberate, irreproducible",
        commission: "A hand-batik house dress in a motif developed from your family's visual vocabulary.",
      },
    ],
    clashes: ["the-architect", "the-disruptor"],
    affinities: ["the-griot", "the-hearth"],
  },
  {
    id: "the-flame",
    name: "The Flame",
    subtitle: "Presence as Power",
    eyebrow: "Drama & Command",
    description:
      "You do not walk into rooms — you change them. Your wardrobe is theatre: deliberate, charged, and built for the moment of arrival. You understand that clothing can be an act of courage, and you do not flinch.",
    voice: "\"To be seen is to choose to be seen. I always choose.\"",
    traits: [
      { label: "Drama", value: 96 },
      { label: "Confidence", value: 93 },
      { label: "Visibility", value: 95 },
      { label: "Subtlety", value: 12 },
      { label: "Restraint", value: 15 },
    ],
    palette: ["#CA6143", "#8B1A1A", "#F0E6D3"],
    domains: [
      {
        domain: "social",
        label: "The Entrance",
        description: "You have arrived before you have spoken. Every gathering begins when you walk in.",
        fabric: "Aso-ebi in bold colour — collective drama, singular execution",
        commission: "A sculptural aso-ebi gown with an extended neckline and theatrical sleeve treatment.",
      },
      {
        domain: "work",
        label: "The Signature",
        description: "In professional contexts you use colour and silhouette as authority. Your style is your credential.",
        fabric: "Damask — weight, sheen, self-evident quality",
        commission: "A floor-length damask coat-dress in terracotta, lined in contrast silk.",
      },
      {
        domain: "creative",
        label: "The Provocation",
        description: "Your creative output asks to be reckoned with. So does your wardrobe.",
        fabric: "Tie-dye shibori — unpredictable surface, powerful presence",
        commission: "A shibori-dyed statement piece where the dyeing process is part of the final design brief.",
      },
      {
        domain: "intimate",
        label: "The Unwound",
        description: "Even at rest you carry intention. Your home clothes are simply a quieter performance.",
        fabric: "Silk ankara — familiar pattern, unexpected luxury",
        commission: "A silk-lined ankara robe with a statement closure, for evenings that deserve ceremony.",
      },
    ],
    clashes: ["the-architect", "the-cartographer"],
    affinities: ["the-griot", "the-current"],
  },
  {
    id: "the-cartographer",
    name: "The Cartographer",
    subtitle: "Curiosity as Compass",
    eyebrow: "Exploration & Precision",
    description:
      "You dress to move through the world with intelligence and readiness. Your wardrobe maps possibility: versatile, well-considered, and adapted for wherever your curiosity takes you next. You collect garments the way a traveller collects coordinates — each one marking somewhere you have been or intend to go.",
    voice: "\"Every cloth has a longitude. I follow them all.\"",
    traits: [
      { label: "Versatility", value: 88 },
      { label: "Curiosity", value: 91 },
      { label: "Practicality", value: 82 },
      { label: "Drama", value: 25 },
      { label: "Ornamentation", value: 30 },
    ],
    palette: ["#5C6B5A", "#E5D3B3", "#9B8B6E"],
    domains: [
      {
        domain: "social",
        label: "The Correspondent",
        description: "You adapt to any context without losing your distinctiveness. People are always curious about where you have been.",
        fabric: "Mud cloth — travelled, storied, never ordinary",
        commission: "A mud-cloth blazer with Cartographer-cut pockets — functional beauty for the perpetually in-transit.",
      },
      {
        domain: "work",
        label: "The Researcher",
        description: "Your work wardrobe is tool-like: sharp where sharpness matters, relaxed where relaxation serves.",
        fabric: "Kuba cloth — precise geometry, made for sustained attention",
        commission: "A kuba-print wrap skirt with tailored companion blouse — a complete working system.",
      },
      {
        domain: "creative",
        label: "The Scout",
        description: "Your creative practice follows where your interest leads. Your wardrobe does the same.",
        fabric: "Ndebele beadwork-inspired print — each panel a different destination",
        commission: "A patchwork coat assembled from prints sourced across three regions, mapped by colour temperature.",
      },
      {
        domain: "intimate",
        label: "The Settled",
        description: "Home for you is a base camp: comfortable, organised, never chaotic.",
        fabric: "Sanyan — quiet, natural, unshowy",
        commission: "A sanyan linen lounge suit with a deliberately generous silhouette.",
      },
    ],
    clashes: ["the-flame", "the-weaver"],
    affinities: ["the-architect", "the-vessel"],
  },
  {
    id: "the-griot",
    name: "The Griot",
    subtitle: "Memory as Medium",
    eyebrow: "Narrative & Heritage",
    description:
      "You are the living archive of your culture. What you wear carries meaning beyond aesthetics: it is testimony, celebration, and continuity. You dress with the knowledge that every cloth was worn before you, and will be worn after.",
    voice: "\"My wardrobe is a library. Every garment is a volume I have read.\"",
    traits: [
      { label: "Heritage", value: 97 },
      { label: "Narrative", value: 93 },
      { label: "Ceremonial", value: 89 },
      { label: "Minimalism", value: 14 },
      { label: "Spontaneity", value: 28 },
    ],
    palette: ["#7A4A2C", "#1A2421", "#E5D3B3"],
    domains: [
      {
        domain: "social",
        label: "The Elder",
        description: "At every gathering you are the one who remembers. Your clothes carry the occasion's full weight.",
        fabric: "Royal Kente — every band a proverb, every colour a meaning",
        commission: "A full royal Kente ensemble commissioned with a specific familial or communal narrative woven in.",
      },
      {
        domain: "work",
        label: "The Authority",
        description: "You bring institutional memory to every professional context. Your style signals that you have earned your seat.",
        fabric: "Aso-oke agbada — unambiguous authority, earned over time",
        commission: "A formal agbada in hand-woven aso-oke, cut to accommodate long meetings and longer memories.",
      },
      {
        domain: "creative",
        label: "The Chronicler",
        description: "Your creative work is an act of preservation. So is your wardrobe.",
        fabric: "Tie-resist adire — knowledge encoded in pattern",
        commission: "An adire piece where the resist pattern encodes a specific story — developed in consultation with the atelier.",
      },
      {
        domain: "intimate",
        label: "The Rememberer",
        description: "At home you wear what has been worn before. The most personal garments carry the most history.",
        fabric: "Family-print ankara — recognition, belonging, continuity",
        commission: "A heirloom-quality house garment in a print developed to outlast the commission.",
      },
    ],
    clashes: ["the-disruptor", "the-current"],
    affinities: ["the-weaver", "the-hearth"],
  },
  {
    id: "the-disruptor",
    name: "The Disruptor",
    subtitle: "Convention as Constraint",
    eyebrow: "Subversion & Momentum",
    description:
      "Rules interest you only as starting points for breaking them. Your wardrobe is a declaration that the expected is always negotiable. You wear what you want, when you want, and the dissonance is entirely intentional.",
    voice: "\"I wear what I am not supposed to. That is the whole point.\"",
    traits: [
      { label: "Subversion", value: 94 },
      { label: "Risk", value: 91 },
      { label: "Individuality", value: 96 },
      { label: "Convention", value: 8 },
      { label: "Restraint", value: 10 },
    ],
    palette: ["#2C2C2C", "#CA6143", "#4A3728"],
    domains: [
      {
        domain: "social",
        label: "The Refusal",
        description: "You dress against the occasion. Not carelessly — deliberately. The gap between what was expected and what you wore is the statement.",
        fabric: "Deconstructed kente — familiar vocabulary, fractured syntax",
        commission: "A kente garment cut against its own grain: strips re-assembled at unexpected angles.",
      },
      {
        domain: "work",
        label: "The Breach",
        description: "You respect the institution enough to challenge it from within. Your wardrobe announces that you will not disappear.",
        fabric: "Industrial aso-oke — heritage technique, non-heritage application",
        commission: "An aso-oke workwear piece — the textile in the silhouette it was never meant to inhabit.",
      },
      {
        domain: "creative",
        label: "The Rupture",
        description: "Your creative output tears the seam. So does your wardrobe.",
        fabric: "Mixed-media textile — no single tradition, no apologies",
        commission: "A garment assembled from opposing textile traditions, deliberately unresolved at the seams.",
      },
      {
        domain: "intimate",
        label: "The Permission",
        description: "At home, you finally stop performing disruption. The clothes are the same. The intention is rest.",
        fabric: "Raw, undyed cotton — stripped of signal, pure function",
        commission: "A raw-cotton lounge set with no adornment: the luxury of not needing to say anything.",
      },
    ],
    clashes: ["the-weaver", "the-griot"],
    affinities: ["the-flame", "the-current"],
  },
  {
    id: "the-vessel",
    name: "The Vessel",
    subtitle: "Softness as Strength",
    eyebrow: "Depth & Receptivity",
    description:
      "You hold the room without filling it. Your wardrobe is quiet and carefully chosen — fabrics that move, colours that recede and bloom, silhouettes that do not demand. Beneath the stillness is an absolute clarity of self.",
    voice: "\"I do not need to announce. I simply am.\"",
    traits: [
      { label: "Softness", value: 88 },
      { label: "Depth", value: 90 },
      { label: "Restraint", value: 86 },
      { label: "Drama", value: 16 },
      { label: "Visibility", value: 30 },
    ],
    palette: ["#8A9E94", "#E5D3B3", "#C8B89A"],
    domains: [
      {
        domain: "social",
        label: "The Presence",
        description: "People always find their way to you. Something in how you dress says: here is a safe harbour.",
        fabric: "Sheer guinea brocade — transparency, not vulnerability",
        commission: "A layered guinea brocade ensemble where depth is created through overlay rather than weight.",
      },
      {
        domain: "work",
        label: "The Confidant",
        description: "In professional settings your stillness reads as composure. You are the colleague people trust with difficult things.",
        fabric: "Sanyan silk — understated, unmistakably considered",
        commission: "A sanyan silk wrap-dress in a tone that reads as neutral until the light shifts.",
      },
      {
        domain: "creative",
        label: "The Listener",
        description: "Your creative process begins with receiving. Your wardrobe echoes this: it takes in the room rather than filling it.",
        fabric: "Indigo adire — slow reveal, deepening with time",
        commission: "An adire garment that begins pale and is designed to darken and deepen with wear over years.",
      },
      {
        domain: "intimate",
        label: "The Still",
        description: "Your most personal wardrobe is also your most deliberate. Comfort and intention are not opposites for you.",
        fabric: "Washed linen — presence without pretension",
        commission: "A washed-linen at-home set in a colour mix that feels like neither working nor resting — simply being.",
      },
    ],
    clashes: ["the-flame", "the-disruptor"],
    affinities: ["the-architect", "the-cartographer"],
  },
  {
    id: "the-hearth",
    name: "The Hearth",
    subtitle: "Care as Aesthetic",
    eyebrow: "Warmth & Abundance",
    description:
      "You dress to make people feel welcomed and cared for — by the occasion, by the space, by you. Your wardrobe is generous: full silhouettes, warm colours, fabrics that invite touch. You understand that hospitality is its own form of elegance.",
    voice: "\"When I dress, I am setting the table for everyone who will be there.\"",
    traits: [
      { label: "Warmth", value: 95 },
      { label: "Generosity", value: 92 },
      { label: "Abundance", value: 88 },
      { label: "Precision", value: 30 },
      { label: "Minimalism", value: 18 },
    ],
    palette: ["#CA6143", "#D4A574", "#F0E6D3"],
    domains: [
      {
        domain: "social",
        label: "The Host",
        description: "Every event becomes a gathering when you are there. Your clothes are part of the welcome.",
        fabric: "Velvet ankara — abundance, celebration, invitation",
        commission: "A full ankara caftan in velvet-printed fabric — the garment that makes any space a feast.",
      },
      {
        domain: "work",
        label: "The Nurturer",
        description: "You manage, mentor, and hold the team. Your wardrobe communicates approachability at every level.",
        fabric: "Soft damask — authority worn lightly",
        commission: "A damask co-ord that reads as relaxed authority — the clothes of someone people feel comfortable asking for help.",
      },
      {
        domain: "creative",
        label: "The Garden",
        description: "Your creativity is generative and sustaining. You make things that feed other things.",
        fabric: "Embroidered organza — labour made visible, beauty freely given",
        commission: "An organza overlay garment with hand-embroidery that takes three weeks and is worth every stitch.",
      },
      {
        domain: "intimate",
        label: "The Refuge",
        description: "Home for you is the truest expression of how you dress: warm, full, and safe.",
        fabric: "Heavyweight ankara knit — comfort that does not apologise",
        commission: "A heavyweight ankara-print knit set in your home's colours — the clothes you wear when you are completely yourself.",
      },
    ],
    clashes: ["the-architect", "the-cartographer"],
    affinities: ["the-weaver", "the-griot"],
  },
  {
    id: "the-current",
    name: "The Current",
    subtitle: "Movement as Meaning",
    eyebrow: "Momentum & Instinct",
    description:
      "You dress fast and you dress right. Instinct drives your wardrobe more than deliberation — but your instincts are calibrated by years of looking closely at the world. You are always slightly ahead. You do not trend-follow; you are where the trend will be.",
    voice: "\"I decide in the morning and I am never wrong by evening.\"",
    traits: [
      { label: "Instinct", value: 92 },
      { label: "Currency", value: 94 },
      { label: "Speed", value: 88 },
      { label: "Deliberation", value: 22 },
      { label: "Heritage", value: 35 },
    ],
    palette: ["#2C2C2C", "#CA6143", "#F0E6D3"],
    domains: [
      {
        domain: "social",
        label: "The Moment",
        description: "You are always wearing what will be photographed most. Not because you planned it — because you knew.",
        fabric: "Contemporary ankara — heritage in real-time",
        commission: "An ankara piece in a colourway that does not yet exist in the market — developed six months before it will.",
      },
      {
        domain: "work",
        label: "The Edge",
        description: "In professional contexts your wardrobe signals that you have already seen what is coming.",
        fabric: "Technical damask — traditional structure, forward application",
        commission: "A damask blazer in an unexpected silhouette — the collaborator between past mastery and future direction.",
      },
      {
        domain: "creative",
        label: "The Signal",
        description: "Your creative work moves faster than criticism. Your wardrobe does the same.",
        fabric: "Printed silk — immediate, surface-forward, always moving",
        commission: "A silk piece designed around a print that is itself a response to something happening right now.",
      },
      {
        domain: "intimate",
        label: "The Pause",
        description: "Even in stillness you are poised for the next thing. Your home clothes are ready, not resting.",
        fabric: "Jersey ankara — relaxed but never slack",
        commission: "A jersey-weight ankara lounge set — comfortable enough to rest in, sharp enough to leave immediately.",
      },
    ],
    clashes: ["the-griot", "the-vessel"],
    affinities: ["the-flame", "the-disruptor"],
  },
  {
    id: "the-mirror",
    name: "The Mirror",
    subtitle: "Reflection as Craft",
    eyebrow: "Adaptation & Perception",
    description:
      "You read every room before you dress for it — and you dress perfectly for every room. What some call chameleon behaviour you understand as a sophisticated social intelligence. You are not performing: you are responding. And your responses are always beautiful.",
    voice: "\"I do not hide what I am. I show the version that is most useful.\"",
    traits: [
      { label: "Adaptability", value: 94 },
      { label: "Perception", value: 91 },
      { label: "Social Intelligence", value: 89 },
      { label: "Consistency", value: 28 },
      { label: "Visibility", value: 40 },
    ],
    palette: ["#6B7B6E", "#E5D3B3", "#9BA89D"],
    domains: [
      {
        domain: "social",
        label: "The Interpreter",
        description: "You dress to fit the occasion so well that you become part of its definition.",
        fabric: "Sheen-shifting dupioni — reads differently in every light",
        commission: "A dupioni silk piece whose colour changes with the angle — always appropriate, never the same twice.",
      },
      {
        domain: "work",
        label: "The Diplomatic",
        description: "You can move between any professional context without friction. Your wardrobe is your social pass.",
        fabric: "Neutral-ground Kente — diplomatic, universally legible",
        commission: "A Kente-trim suit in a palette that reads simultaneously as formal and creative.",
      },
      {
        domain: "creative",
        label: "The Collaborator",
        description: "Your creative strength is synthesis. You take inputs from everywhere and make something that is entirely your own.",
        fabric: "Mixed-tradition piecing — every influence acknowledged, nothing subordinate",
        commission: "A garment developed in active dialogue with the artisan — no fixed brief, only a conversation.",
      },
      {
        domain: "intimate",
        label: "The Unguarded",
        description: "At home you are simply you: the version underneath all the versions.",
        fabric: "Plain-woven cotton — the base cloth, before the dye",
        commission: "A plain-cotton home set in the colour you always wanted to wear and never have.",
      },
    ],
    clashes: ["the-disruptor", "the-flame"],
    affinities: ["the-cartographer", "the-vessel"],
  },
  {
    id: "the-sovereign",
    name: "The Sovereign",
    subtitle: "Authority as Inheritance",
    eyebrow: "Command & Legacy",
    description:
      "You dress with the knowledge that you come from greatness and are adding to it. Your wardrobe carries the full weight of lineage — not as burden but as foundation. Every choice is made from a position of absolute clarity about who you are and where you come from.",
    voice: "\"I wear my history forward.\"",
    traits: [
      { label: "Authority", value: 96 },
      { label: "Legacy", value: 94 },
      { label: "Ceremony", value: 91 },
      { label: "Informality", value: 12 },
      { label: "Minimalism", value: 20 },
    ],
    palette: ["#7A4A2C", "#1A2421", "#D4A574"],
    domains: [
      {
        domain: "social",
        label: "The Occasion",
        description: "When you attend, the event is elevated. Your presence and your wardrobe say the same thing: this matters.",
        fabric: "Gold-thread Kente — royalty that is worn not claimed",
        commission: "A gold-thread Kente ceremonial ensemble designed for the event you have not yet been invited to but will be.",
      },
      {
        domain: "work",
        label: "The Chair",
        description: "You lead without needing to assert leadership. The room re-organises itself around you.",
        fabric: "Heavy-weight aso-oke — substance, weight, earned gravity",
        commission: "A full agbada in the heaviest available aso-oke weave — for the days when the room needs to know.",
      },
      {
        domain: "creative",
        label: "The Canon",
        description: "Your creative output becomes reference. Your wardrobe operates at the same register.",
        fabric: "Museum-quality adire — technique at its absolute summit",
        commission: "An adire commission developed with a master dyer — a piece that belongs in both a wardrobe and an archive.",
      },
      {
        domain: "intimate",
        label: "The Uncrowned",
        description: "In private you rest — but you rest like someone who never fully sets down the weight of what they carry.",
        fabric: "Embossed silk — luxury that does not require an audience",
        commission: "An embossed silk sleep set in the colour of your private self.",
      },
    ],
    clashes: ["the-disruptor", "the-current"],
    affinities: ["the-griot", "the-architect"],
  },
  {
    id: "the-botanist",
    name: "The Botanist",
    subtitle: "Growth as Intention",
    eyebrow: "Nature & Emergence",
    description:
      "Your wardrobe grows and changes as you do. You are drawn to organic process — to the cloth that takes on character with wearing, the colour that shifts with washing, the silhouette that belongs to the earth it was made from. You dress as a living thing.",
    voice: "\"I want clothes that remember being alive.\"",
    traits: [
      { label: "Organicism", value: 90 },
      { label: "Patience", value: 87 },
      { label: "Texture", value: 92 },
      { label: "Urgency", value: 18 },
      { label: "Formality", value: 25 },
    ],
    palette: ["#5C6B5A", "#8A7B5C", "#C4B99A"],
    domains: [
      {
        domain: "social",
        label: "The Cultivated",
        description: "Your presence at any gathering is like a well-tended garden: carefully composed but never stiff.",
        fabric: "Hand-dyed cotton in botanical pigments — grown, not manufactured",
        commission: "A garment dyed exclusively with plant extracts sourced from the continent — the colour is alive.",
      },
      {
        domain: "work",
        label: "The Grounded",
        description: "You bring long-view thinking to everything. Your wardrobe says: I am not in a hurry, and I am right.",
        fabric: "Natural silk — strength from slowness",
        commission: "A natural-silk workwear piece that will look better in three years than it does on the first wearing.",
      },
      {
        domain: "creative",
        label: "The Field",
        description: "Your creative process is one of careful tending. You know what you planted; you wait to see what grows.",
        fabric: "Raw, undyed linen — the work begins before the cloth does",
        commission: "A raw-linen garment delivered unfinished, to be dyed and finished by the wearer over the first season of wearing.",
      },
      {
        domain: "intimate",
        label: "The Root",
        description: "At home you are most fully yourself: unhurried, tactile, connected to the materials around you.",
        fabric: "Bark-cloth — pre-colonial, irreducibly itself",
        commission: "A bark-cloth home piece — the oldest textile technology on the continent, worn without explanation.",
      },
    ],
    clashes: ["the-current", "the-flame"],
    affinities: ["the-vessel", "the-cartographer"],
  },
  {
    id: "the-alchemist",
    name: "The Alchemist",
    subtitle: "Transformation as Practice",
    eyebrow: "Process & Metamorphosis",
    description:
      "You treat your wardrobe as a laboratory. Every garment is an experiment; every combination a hypothesis. You have never worn anything without knowing exactly why, and you have never stopped learning from what you find. Your style is rigorous joy.",
    voice: "\"I am always mid-process. The wardrobe is the notebook.\"",
    traits: [
      { label: "Experimentation", value: 93 },
      { label: "Rigour", value: 89 },
      { label: "Joy", value: 86 },
      { label: "Convention", value: 14 },
      { label: "Repetition", value: 20 },
    ],
    palette: ["#CA6143", "#2C2C2C", "#8A9E94"],
    domains: [
      {
        domain: "social",
        label: "The Experiment",
        description: "Every gathering is a field test. You watch for what lands, what surprises, what needs adjustment.",
        fabric: "Overdyed vintage ankara — transformation of the already-transformed",
        commission: "An ankara commission built from vintage prints, overdyed and re-constructed into an entirely new vocabulary.",
      },
      {
        domain: "work",
        label: "The Laboratory",
        description: "In professional contexts your wardrobe communicates that you are thinking — always thinking.",
        fabric: "Mixed-weight damask — the same vocabulary at different densities",
        commission: "A damask suit where each piece is cut from a different weight of the same base cloth — coherent, never uniform.",
      },
      {
        domain: "creative",
        label: "The Process",
        description: "The output and the method are equally interesting to you. The wardrobe is both.",
        fabric: "Resist-dye shibori — control and surrender in equal measure",
        commission: "A shibori piece developed through an iterative brief with the dyer — each iteration documented.",
      },
      {
        domain: "intimate",
        label: "The Workshop",
        description: "At home you are still working. The clothes are comfortable because the work requires it.",
        fabric: "Utility cotton-adire — the print as protective layer, not decoration",
        commission: "A cotton-adire work-at-home set sturdy enough for actual making and considered enough for receiving visitors.",
      },
    ],
    clashes: ["the-griot", "the-hearth"],
    affinities: ["the-disruptor", "the-current"],
  },
  {
    id: "the-oracle",
    name: "The Oracle",
    subtitle: "Intuition as Knowledge",
    eyebrow: "Vision & Interiority",
    description:
      "You dress from the inside out. Before you think about occasion or observation, you consult something interior — a feeling, a knowing, an alignment. Your wardrobe is not chosen; it is arrived at. And it is always exactly right.",
    voice: "\"I did not decide what to wear. I remembered.\"",
    traits: [
      { label: "Intuition", value: 95 },
      { label: "Interiority", value: 93 },
      { label: "Distinctiveness", value: 90 },
      { label: "Rationality", value: 22 },
      { label: "Convention", value: 18 },
    ],
    palette: ["#4A3060", "#1A2421", "#E5D3B3"],
    domains: [
      {
        domain: "social",
        label: "The Seer",
        description: "You arrive wearing exactly what the occasion needed, which is rarely what it expected.",
        fabric: "Indigo-and-resist adire — knowledge held in the cloth itself",
        commission: "An adire garment developed through a process of dialogue about what you know, not what you want.",
      },
      {
        domain: "work",
        label: "The Visionary",
        description: "In professional contexts your wardrobe communicates that you are operating on a frequency others cannot quite access.",
        fabric: "Sheer aso-oke — visible structure, readable only to those who know",
        commission: "A sheer aso-oke layer-piece where the pattern is only fully visible in certain lights.",
      },
      {
        domain: "creative",
        label: "The Channel",
        description: "Your creative work comes from somewhere you cannot fully explain. Your wardrobe is the same.",
        fabric: "Hand-painted silk — the mark of the hand, unrepeatable",
        commission: "A hand-painted silk garment where the design is developed in a single session without revision.",
      },
      {
        domain: "intimate",
        label: "The Inner Chamber",
        description: "At home you are in communion with whatever you draw on. The clothes support the practice.",
        fabric: "Undyed handwoven cotton — before language, before colour",
        commission: "An undyed handwoven piece — the garment at the moment before it became a garment.",
      },
    ],
    clashes: ["the-mirror", "the-cartographer"],
    affinities: ["the-griot", "the-vessel"],
  },
  {
    id: "the-navigator",
    name: "The Navigator",
    subtitle: "Purpose as Direction",
    eyebrow: "Clarity & Momentum",
    description:
      "You know where you are going. Your wardrobe is calibrated for the journey — not decorative, not performative, but precisely appropriate to the destination you have set for yourself. You dress with an efficiency that reads, to those paying attention, as pure confidence.",
    voice: "\"Every garment I own knows what it is for.\"",
    traits: [
      { label: "Clarity", value: 92 },
      { label: "Purpose", value: 94 },
      { label: "Efficiency", value: 89 },
      { label: "Excess", value: 10 },
      { label: "Ambiguity", value: 15 },
    ],
    palette: ["#2C3A2E", "#E5D3B3", "#8A9E94"],
    domains: [
      {
        domain: "social",
        label: "The Directed",
        description: "At social events you are present without being aimless. Your wardrobe signals that you arrived with intention.",
        fabric: "Clean-line kente — purpose stated, heritage worn",
        commission: "A kente-trim coat in a single bold colour — the garment that says exactly one thing and means it entirely.",
      },
      {
        domain: "work",
        label: "The Executive",
        description: "In professional contexts your wardrobe leaves nothing ambiguous about your competence or your seriousness.",
        fabric: "Heavy silk suiting — authority, no embellishment required",
        commission: "A silk suit in deep forest, with Kente-sourced lining that is only ever seen when you choose to show it.",
      },
      {
        domain: "creative",
        label: "The Brief",
        description: "Your creative process is goal-oriented. The wardrobe reflects this: every piece has a clear function.",
        fabric: "Structured cotton — the scaffolding, not the decoration",
        commission: "A structured cotton workwear suit with a single adire panel — function, then beauty.",
      },
      {
        domain: "intimate",
        label: "The Prepared",
        description: "Even at rest you are oriented. Your home clothes are relaxed but never without purpose.",
        fabric: "Heavyweight jersey — comfort as readiness",
        commission: "A heavyweight jersey lounge set in your most confident colour — rest that knows where it is going.",
      },
    ],
    clashes: ["the-oracle", "the-botanist"],
    affinities: ["the-architect", "the-sovereign"],
  },
  {
    id: "the-thread",
    name: "The Thread",
    subtitle: "Detail as Devotion",
    eyebrow: "Craft & Particularity",
    description:
      "You notice what no one else notices. The quality of a seam. The weight of a button. The particular drape of a fabric under a specific light. Your wardrobe is small and flawless — chosen for the things most people will never see, but which you always will.",
    voice: "\"The finish on the inside is the truth of the garment.\"",
    traits: [
      { label: "Attention", value: 97 },
      { label: "Craft", value: 95 },
      { label: "Particularity", value: 93 },
      { label: "Volume", value: 12 },
      { label: "Spontaneity", value: 15 },
    ],
    palette: ["#4A3728", "#E5D3B3", "#9B8B6E"],
    domains: [
      {
        domain: "social",
        label: "The Connoisseur",
        description: "You always find the one person at any gathering who notices what you are wearing. That is the conversation you came for.",
        fabric: "Museum-grade Kente — every thread placed with full knowledge",
        commission: "A Kente commission developed in direct collaboration with a named master weaver — not a pattern, a dialogue.",
      },
      {
        domain: "work",
        label: "The Finisher",
        description: "In professional contexts you produce work to a standard most cannot see. Your wardrobe operates identically.",
        fabric: "Hand-stitched damask — the labour is the luxury",
        commission: "A hand-finished damask coat where every internal seam is treated as a visible one.",
      },
      {
        domain: "creative",
        label: "The Technician",
        description: "You know how it is made, and that knowledge lives in your hands as much as your eye.",
        fabric: "Strip-woven aso-oke — the technique as the content",
        commission: "A commission developed with full transparency into the making process — you attend the weaving.",
      },
      {
        domain: "intimate",
        label: "The Private Collection",
        description: "Your home clothes are better made than most people's occasion wear. No one knows, and that is entirely the point.",
        fabric: "Washed silk — quality that requires no audience",
        commission: "A washed-silk home set finished to the same standard as a ceremony garment — the luxury of integrity.",
      },
    ],
    clashes: ["the-current", "the-disruptor"],
    affinities: ["the-architect", "the-griot"],
  },
];

// ─── Clash Scenarios ──────────────────────────

export const clashScenarios: ClashScenario[] = [
  {
    ids: ["the-architect", "the-weaver"],
    title: "Structure Meets Story",
    tension:
      "The Architect reaches for geometry and restraint; the Weaver for narrative and communal warmth. Together they risk either a cold diagram or a formless embrace.",
    resolution:
      "Commission a garment that is structurally rigorous in its cut but made entirely of family-heritage fabric. The architecture holds the story. The story gives the structure somewhere to live.",
  },
  {
    ids: ["the-architect", "the-flame"],
    title: "The Still and the Lit",
    tension:
      "One composes, the other ignites. The Architect finds the Flame's visibility exhausting; the Flame finds the Architect's restraint airless.",
    resolution:
      "A single garment that is minimal in construction but catastrophic in colour — the meeting point where both get exactly one thing.",
  },
  {
    ids: ["the-weaver", "the-disruptor"],
    title: "The Archive and the Rupture",
    tension:
      "The Weaver preserves with devotion; the Disruptor dismantles with equal conviction. Both love the cloth. They disagree completely about what to do with it.",
    resolution:
      "A deconstructed heritage piece where the original textile is still legible in the new form. Disruption in service of recontextualisation rather than erasure.",
  },
  {
    ids: ["the-griot", "the-disruptor"],
    title: "Memory and Its Refusal",
    tension:
      "The Griot understands that everything comes from somewhere; the Disruptor suspects that provenance can become a cage.",
    resolution:
      "A commission that documents its own process of being made — the Griot's need for continuity, the Disruptor's insistence on transparency about the making.",
  },
  {
    ids: ["the-flame", "the-cartographer"],
    title: "The Fixed Star and the Moving Map",
    tension:
      "The Flame arrives and the room re-orients around them. The Cartographer observes and moves on. The Flame wants to be the destination; the Cartographer wants to be in transit.",
    resolution:
      "A garment designed for a specific journey rather than a specific arrival — drama in movement, not in position.",
  },
  {
    ids: ["the-griot", "the-current"],
    title: "Time's Two Directions",
    tension:
      "The Griot looks backward with reverence and forward with responsibility. The Current barely registers the past — it is already in the next moment.",
    resolution:
      "A piece that uses a traditional textile in a context that could only exist now — heritage that earns its contemporaneity rather than borrowing it.",
  },
  {
    ids: ["the-disruptor", "the-sovereign"],
    title: "The Throne and Its Demolition",
    tension:
      "Both have absolute conviction. The Sovereign's conviction is inherited; the Disruptor's is self-generated. They disagree about whether authority can be legitimate.",
    resolution:
      "A ceremonial piece re-cut for a context it was never intended for — the authority remains, the ceremony is relocated.",
  },
  {
    ids: ["the-oracle", "the-mirror"],
    title: "The Inner and the Outer",
    tension:
      "The Oracle dresses from interior knowledge; the Mirror dresses from acute social perception. Both are always right, by entirely different methods.",
    resolution:
      "A garment that reads differently in each context the wearer enters — the Oracle's internal logic producing the Mirror's social adaptability.",
  },
];

// ─── Helper: find persona by id ──────────────

export const findPersona = (id: string): Persona | undefined =>
  personas.find((p) => p.id === id);

// ─── Slider keys used in Discover ────────────
// boldness, heritage, structure, experimentation, warmth
// Each value 0–100. Personas are mapped to this space explicitly.

export type SliderKey = "boldness" | "heritage" | "structure" | "experimentation" | "warmth";

// Explicit signature vector per persona — avoids fragile string matching.
// Values represent how strongly each persona sits on each slider axis.
const personaVectors: Record<string, Record<SliderKey, number>> = {
  "the-architect":    { boldness: 30, heritage: 20, structure: 92, experimentation: 20, warmth: 25 },
  "the-weaver":       { boldness: 45, heritage: 94, structure: 35, experimentation: 25, warmth: 91 },
  "the-flame":        { boldness: 96, heritage: 40, structure: 25, experimentation: 35, warmth: 55 },
  "the-cartographer": { boldness: 50, heritage: 30, structure: 55, experimentation: 88, warmth: 45 },
  "the-griot":        { boldness: 40, heritage: 97, structure: 50, experimentation: 20, warmth: 70 },
  "the-disruptor":    { boldness: 94, heritage: 15, structure: 10, experimentation: 91, warmth: 30 },
  "the-vessel":       { boldness: 20, heritage: 35, structure: 60, experimentation: 25, warmth: 75 },
  "the-hearth":       { boldness: 50, heritage: 60, structure: 30, experimentation: 20, warmth: 95 },
  "the-current":      { boldness: 80, heritage: 35, structure: 30, experimentation: 88, warmth: 50 },
  "the-mirror":       { boldness: 40, heritage: 30, structure: 40, experimentation: 60, warmth: 65 },
  "the-sovereign":    { boldness: 70, heritage: 94, structure: 75, experimentation: 15, warmth: 45 },
  "the-botanist":     { boldness: 25, heritage: 55, structure: 45, experimentation: 50, warmth: 80 },
  "the-alchemist":    { boldness: 65, heritage: 20, structure: 35, experimentation: 93, warmth: 55 },
  "the-oracle":       { boldness: 55, heritage: 50, structure: 30, experimentation: 70, warmth: 60 },
  "the-navigator":    { boldness: 60, heritage: 40, structure: 89, experimentation: 25, warmth: 35 },
  "the-thread":       { boldness: 20, heritage: 70, structure: 80, experimentation: 30, warmth: 50 },
};


// ─── Helper: nearest persona by slider values ─

export const findNearestPersona = (
  traitValues: Partial<Record<SliderKey, number>>
): Persona => {
  const keys: SliderKey[] = ["boldness", "heritage", "structure", "experimentation", "warmth"];
  const userVec = keys.map((k) => traitValues[k] ?? 50);

  let best: Persona = personas[0];
  let bestScore = -Infinity;

  for (const p of personas) {
    const sig = personaVectors[p.id];
    if (!sig) continue;

    const pVec = keys.map((k) => sig[k]);

    // Cosine similarity
    const dot = userVec.reduce((s, v, i) => s + v * pVec[i], 0);
    const magU = Math.sqrt(userVec.reduce((s, v) => s + v * v, 0));
    const magP = Math.sqrt(pVec.reduce((s, v) => s + v * v, 0));
    const score = dot / (magU * magP + 0.001);

    if (score > bestScore) {
      bestScore = score;
      best = p;
    }
  }

  return best;
};