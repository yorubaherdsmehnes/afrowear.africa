"use client";

// Clash.tsx — pick two archetypes, see how they navigate the same social scenario
// Scenarios drawn from clashScenarios in data.ts, plus additional cultural contexts

import { useState, useMemo } from "react";
import { personas, clashScenarios, findPersona } from "./data";
import type { Persona } from "./data";
import Motif from "./Motif";

// Additional owambe/aso-ebi cultural scenarios not in the base clash data
const CULTURAL_SCENARIOS = [
  {
    id: "aso-ebi-coordination",
    title: "The Aso-Ebi Coordination",
    prompt:
      "The bride has chosen a coral-and-gold aso-ebi fabric. The aunties are organising. There is a group chat. There are opinions about whether to follow the uniform or 'express yourself within the colour.' What do you do?",
  },
  {
    id: "owambe-arrival",
    title: "The Owambe Arrival",
    prompt:
      "You arrive at an owambe forty minutes after the stated start time. The hall is already full, the music is already high, and the MC has already called a table you are not sitting at. Your entrance is entirely your own to manage.",
  },
  {
    id: "diaspora-return",
    title: "The Diaspora Return",
    prompt:
      "You are dressing for your first family event back home after three years abroad. The relatives will form opinions from the moment you step out of the car. You want to be seen as having done well — without looking like you have forgotten where you came from.",
  },
  {
    id: "naming-ceremony",
    title: "The Naming Ceremony",
    prompt:
      "It is a naming ceremony. The dress code says 'smart.' Every woman in your family's understanding of 'smart' is different. You have forty minutes and a wardrobe that tells the truth about who you are.",
  },
  {
    id: "wedding-guest",
    title: "The Wedding Guest Problem",
    prompt:
      "The couple asked guests not to wear white, cream, or anything that could be confused for the bridal party's colour palette. You have a new piece that is technically ivory-gold. It is the most beautiful thing you own. What happens?",
  },
];

// How each archetype responds to a given scenario key
// Drawn from their traits, domain descriptions, and voice
const ARCHETYPE_RESPONSES: Record<string, Record<string, string>> = {
  "the-architect": {
    "aso-ebi-coordination":
      "You follow the fabric precisely — not out of conformity but because the constraint is interesting. You are the one who finds the most considered silhouette in the colour, and arrives looking like you set the template rather than followed it.",
    "owambe-arrival":
      "You enter without announcement. You find your table, you sit, and within twenty minutes the right people have found their way to you. The entrance was quiet. The impression was not.",
    "diaspora-return":
      "You dress with structural precision in a heritage textile — something that reads immediately as considered to anyone paying attention. You do not explain the choice. The garment explains itself.",
    "naming-ceremony":
      "You interpret 'smart' as 'correct' — and your definition of correct is more exacting than anyone else's in the room. You arrive exactly right, and the aunties quietly decide you have good sense.",
    "wedding-guest":
      "You do not wear the ivory-gold piece. The brief is the brief. You find a different solution that is equally considered, and you file the ivory-gold away for an occasion without a constraint.",
  },
  "the-weaver": {
    "aso-ebi-coordination":
      "You are in the group chat early, you are enthusiastic, and you are the one who coordinates the fittings for three cousins who cannot sort themselves out. You follow the fabric — and you make sure everyone else does too, because this day belongs to the family, not to any individual's need to stand out.",
    "owambe-arrival":
      "You know someone at every table. You stop four times between the entrance and your seat, and by the time you sit down the room feels warmer than it did when you arrived. Your entrance was not an entrance — it was a homecoming.",
    "diaspora-return":
      "You call your mother before you pack and ask what the aunties are wearing. You arrive in something that says you remember — because you do, and you want them to know it.",
    "naming-ceremony":
      "You dress in something the grandmothers will recognise. Not a costume, not nostalgia — just the acknowledgment that this moment is bigger than your personal style, and your wardrobe knows how to say so.",
    "wedding-guest":
      "You do not wear it. Not even close to it. This day is not yours, and you would never risk making it about you. The ivory-gold stays home, and you arrive looking like someone who understands what today is for.",
  },
  "the-flame": {
    "aso-ebi-coordination":
      "You follow the fabric — you are not a vandal — but your silhouette, your gele height, and the way you carry the colour are entirely your own. You are wearing the same cloth as thirty other women and you are the one they photograph.",
    "owambe-arrival":
      "The room re-orients when you walk in. You do not hurry, you do not apologise for the time, and you find the most visible route to your seat. The MC notices. The MC mentions it. You were not late — you were arriving.",
    "diaspora-return":
      "You arrive in something that cannot be misread. You have done well and the garment confirms it, without saying a single word about abroad. You are not performing success — you are dressed in it.",
    "naming-ceremony":
      "'Smart' is your floor, not your ceiling. You dress as you always dress, and the relatives decide to adjust their definition of the dress code rather than tell you to tone it down.",
    "wedding-guest":
      "You do not wear the ivory-gold. You wear something that makes the ivory-gold look like the understated choice. The couple's brief is respected — your presence is not.",
  },
  "the-cartographer": {
    "aso-ebi-coordination":
      "You follow the fabric with genuine interest. You research the best tailor for the silhouette, you consider the event's light and setting, and you arrive with something that shows you took the brief seriously as a creative problem.",
    "owambe-arrival":
      "You take in the room before you cross it. You locate the people worth finding and move toward them efficiently. Your entrance is not theatrical — it is purposeful, and that has its own kind of presence.",
    "diaspora-return":
      "You dress thoughtfully in something that works in both worlds — not a concession to either, but a considered solution that signals you have been paying attention to both. You always arrive prepared.",
    "naming-ceremony":
      "You research. You find out what the family usually wears to these things. You dress exactly right, which is the most interesting choice available to you, and you arrive curious about everyone else's interpretation.",
    "wedding-guest":
      "You do not wear the ivory-gold piece. Not because you are risk-averse — you are not — but because you have read the brief and the risk is uninteresting. You find a different problem to solve.",
  },
  "the-griot": {
    "aso-ebi-coordination":
      "You arrive in the aso-ebi and you arrive correctly. You know this fabric, you know what it means on a day like this, and you dress with the full weight of the occasion in mind. The aunties nod when they see you.",
    "owambe-arrival":
      "You do not rush. You have been to enough of these to know that an owambe belongs to everyone who is present, and your arrival is part of the occasion. You take your time, and people make way.",
    "diaspora-return":
      "You dress in something that belongs to home completely. Not a compromise, not a blend — you come back as yourself, which is entirely of this place, and anyone who has forgotten that is quickly reminded.",
    "naming-ceremony":
      "You know exactly what to wear. There is a garment for this — not necessarily the newest one, but the right one. The grandmothers recognise the cloth and the room settles.",
    "wedding-guest":
      "The ivory-gold stays home. This is not a question you spend time on. The family's day is the family's day, and your role in it is to support, not to compete.",
  },
  "the-disruptor": {
    "aso-ebi-coordination":
      "You buy the fabric, and then you do something to it that makes every other person in the colour scheme look like they are in uniform and you look like you defined the brief. The bride is delighted or horrified. Both reactions are fine.",
    "owambe-arrival":
      "You arrive when you arrive, wearing what you are wearing, and anyone who wants to make a comment about either is invited to. You find your seat, you enjoy your food, and the energy you brought is in the room whether anyone acknowledges it or not.",
    "diaspora-return":
      "You dress exactly as you would anywhere. The relatives' opinions are data, not instructions. You love your family. You are also not their dress code.",
    "naming-ceremony":
      "'Smart' is their word, not yours. You dress as yourself, which happens to be smart by every standard that matters to you, and you leave before the conversation about it becomes a whole thing.",
    "wedding-guest":
      "You do not wear the ivory-gold. Not because of the rule — because it does not interest you to be mistaken for a bridal party member. You wear something entirely different and entirely yours, and the ivory-gold waits for a day when it is actually the right choice.",
  },
  "the-vessel": {
    "aso-ebi-coordination":
      "You follow the fabric gracefully. You find the version of the silhouette that moves best, and you arrive in something that looks considered without competing for attention. People feel comfortable near you at the event.",
    "owambe-arrival":
      "You find your seat without incident, and by the end of the evening three people have had genuine conversations with you that they remember the next day. Your entrance was unremarkable. Your presence was not.",
    "diaspora-return":
      "You dress in something that does not announce anything — it simply is. The relatives who are paying attention to fabric will see it; the ones who are not will simply feel that something is right about how you look.",
    "naming-ceremony":
      "You dress softly and correctly, and you spend the day listening to the people who most want to talk. By the end of it you know more about the family than anyone who was busy being noticed.",
    "wedding-guest":
      "The ivory-gold stays home. Not the rule — the instinct. You would not wear something that could pull focus from the couple. That is simply not how you dress for other people's days.",
  },
  "the-hearth": {
    "aso-ebi-coordination":
      "You are the one who organised the group order for the fabric, found the tailor who could do all six cousins, and made sure everyone had their fitting on time. You arrive looking like the warmest person at the event, because you are.",
    "owambe-arrival":
      "You find someone you know within thirty seconds of walking in, and within five minutes you are at the buffet making sure the people around you have plates. Your entrance is a welcome, not a performance.",
    "diaspora-return":
      "You arrive with something for everyone — a gift, a story, something you brought back. The dress is warm and correct and the aunties hug you first. The dress was never really the point.",
    "naming-ceremony":
      "You arrive early. You help set up. You dress beautifully and warmly, and by the end of the ceremony the baby has been held by you at some point and the grandmother has told you at least twice that you are a good girl.",
    "wedding-guest":
      "The ivory-gold piece stays home, and you spend exactly zero minutes on the decision. You dress in something that makes the couple feel celebrated, because that is always the only brief that matters.",
  },
  "the-current": {
    "aso-ebi-coordination":
      "You get the fabric and you get to your tailor immediately. Your silhouette is the one people screenshot two days before the event. At the event, you are the photograph people send to their own tailors with the caption 'like this.'",
    "owambe-arrival":
      "You arrive at the moment that turns out, in retrospect, to have been exactly right. Not fashionably late, not early — you have a sense for these things. You move through the room quickly and efficiently and you are exactly where the energy is.",
    "diaspora-return":
      "You arrive in something that bridges without apologising for either side. You have been watching what is happening here and what is happening there and your wardrobe has been doing the same. The relatives are impressed and slightly unsure why.",
    "naming-ceremony":
      "You arrive in something that will be copied at the next three naming ceremonies in your family's social circle. You cannot help it. It is simply how you dress.",
    "wedding-guest":
      "You leave the ivory-gold at home — not because of the rule, but because you already have something better. You always do.",
  },
  "the-mirror": {
    "aso-ebi-coordination":
      "You follow the fabric exactly as the bride intended, and you make it look effortless. The aunties think you followed the brief. The fashion people think you were interpreting it. Both are correct.",
    "owambe-arrival":
      "You read the room before you enter it. You have a sense of where the host is, where the energy is, and what version of yourself fits best. By the time you sit down, you are already the right person for this particular gathering.",
    "diaspora-return":
      "You dress for both audiences simultaneously, and you do it without looking calculated. The relatives see someone who came home. The people who know you see someone who never fully left. You are both of these things.",
    "naming-ceremony":
      "You call ahead and ask what people are wearing. You arrive in something that fits perfectly within the range of the room — elevated enough to have dressed with intention, familiar enough to belong completely.",
    "wedding-guest":
      "You do not wear the ivory-gold. Not the rule — the read. You understand that this particular couple will notice, and noticing is not the impression you want to leave.",
  },
  "the-sovereign": {
    "aso-ebi-coordination":
      "You wear the fabric. You also wear it in a way that signals you are part of the inner circle — not just any guest, but someone whose place in this family's story is established. The aunties do not organise you. You are part of why the aunties exist.",
    "owambe-arrival":
      "You arrive and the MC notes it. Not because you asked them to — because you are who you are, and a room full of people who know you cannot pretend otherwise. You take your seat as though it was always reserved.",
    "diaspora-return":
      "You return as yourself, completely. There is no adjustment, no softening, no performance of humility. You love your family. You also know your own weight, and you arrived with all of it.",
    "naming-ceremony":
      "You arrive dressed for the gravity of the occasion — not for your own vanity, but because you understand that a naming ceremony is a serious day and it deserves a serious wardrobe. The elders approve.",
    "wedding-guest":
      "The ivory-gold stays home. Not the rule — the judgment. A Sovereign does not risk being confused with anyone else's day. You arrive in something entirely your own, and entirely appropriate.",
  },
  "the-botanist": {
    "aso-ebi-coordination":
      "You buy the fabric and you take it to the tailor who does natural silhouettes. You arrive in something that moves well, breathes in the heat, and looks more intentional than anyone else's interpretation of the brief.",
    "owambe-arrival":
      "You arrive quietly and find the people worth finding. By the end of the evening you have spent forty minutes in genuine conversation with three people and you could not tell you the MC's name.",
    "diaspora-return":
      "You arrive in something made there — or something old, something with a history. The aunties touch the fabric and ask questions. That is the conversation you wanted.",
    "naming-ceremony":
      "You dress in natural cloth, in a colour that belongs to the earth. It reads as understated and intentional, and the relatives who notice fabric will notice yours.",
    "wedding-guest":
      "You leave the ivory-gold home. Your wardrobe has depth — you find something else without difficulty, something that feels right for the season and the occasion, and you arrive without having spent a moment on the question.",
  },
  "the-alchemist": {
    "aso-ebi-coordination":
      "You buy the fabric. You also immediately begin thinking about what you could do to it. You arrive in something that is technically within the brief and practically unlike anything else in the room. The bride is intrigued. The aunties are not sure.",
    "owambe-arrival":
      "You arrive having thought about the entrance. Not performed it — thought about it. There is a difference, and yours lands with the specificity of something considered rather than the spectacle of something performed.",
    "diaspora-return":
      "You dress in something that is a genuine experiment — a combination that tests a theory you have been developing. The relatives are uncertain what to make of it. That response is data.",
    "naming-ceremony":
      "You overthink 'smart' productively. You arrive with a solution that is correct by every available measure and slightly strange by one — and the strangeness is the most interesting thing in the room.",
    "wedding-guest":
      "The ivory-gold question becomes a design problem. You spend twenty minutes on it, arrive at a clear answer (no), and immediately pivot to solving what you will actually wear with the same rigour. The result is better.",
  },
  "the-oracle": {
    "aso-ebi-coordination":
      "You buy the fabric. What you do with it comes to you in the middle of the night. You arrive in something that was exactly right — you knew it would be before you put it on.",
    "owambe-arrival":
      "You knew which seat you would end up at before you arrived. You knew who you would talk to. The evening unfolds roughly as you understood it would, and you move through it without surprise.",
    "diaspora-return":
      "You dress by feel — not nostalgia, not calculation. Something interior knows what is needed, and you trust it. The relatives cannot articulate why you look right, but you do.",
    "naming-ceremony":
      "You dress before you think about what you are doing. The garment is already correct. You do not know how you know, but you do, and the evidence is the ceremony itself.",
    "wedding-guest":
      "The ivory-gold piece presents itself to you and something says no. You do not reach for it. You wear what you wear, which is what was always going to be right, and you do not revisit the question.",
  },
  "the-navigator": {
    "aso-ebi-coordination":
      "You confirm the brief, get the fabric, find the best tailor for the silhouette, and arrive on time. Your interpretation of the brief is correct and efficient. The aunties have no notes.",
    "owambe-arrival":
      "You arrive when you said you would arrive, having decided in advance where you will sit, who you will speak to, and when you will leave. The evening goes as planned. You enjoy it.",
    "diaspora-return":
      "You prepared for this trip six weeks ago. The wardrobe decision was made then. You arrive in something correct and considered, and you spend the energy you saved on being genuinely present.",
    "naming-ceremony":
      "'Smart' is a defined term. You satisfy it precisely, which turns out to be the most interesting answer in a room full of people who overcomplicated the brief.",
    "wedding-guest":
      "You do not wear the ivory-gold. The rule is the rule, and your wardrobe is deep enough that the decision takes forty seconds. You arrive in something equally good and move on.",
  },
  "the-thread": {
    "aso-ebi-coordination":
      "You spend three weeks on the tailoring. You arrive in something made with a level of finish that most people cannot see and cannot name — they only know that yours is different. The bride will notice. One other person will notice. That is enough.",
    "owambe-arrival":
      "You sit down quickly and spend the evening noticing the finishing on other people's garments. You find two pieces worth discussing. The conversations are the best part of the evening.",
    "diaspora-return":
      "You pack one piece that is made exactly right. The relatives who understand cloth will know what they are looking at. The others will simply feel that something is correct. Both reactions are fine.",
    "naming-ceremony":
      "You dress in something with invisible seams, a correctly weighted hem, and a closure that operates exactly as it should. No one will know — and no one needs to.",
    "wedding-guest":
      "The ivory-gold piece is not the question. The question is whether the finishing is right for the occasion. It is, or it is not. Everything else is secondary.",
  },
};

export default function Clash() {
  const [personaA, setPersonaA] = useState<Persona | null>(null);
  const [personaB, setPersonaB] = useState<Persona | null>(null);
  const [scenario, setScenario] = useState<string>("aso-ebi-coordination");
  const [selectingSlot, setSelectingSlot] = useState<"A" | "B" | null>(null);

  const allScenarios = useMemo(() => {
    const fromData = clashScenarios.map((s) => ({
      id: s.ids.join("-vs-"),
      title: s.title,
      prompt: s.tension,
      resolution: s.resolution,
    }));
    return [...CULTURAL_SCENARIOS, ...fromData];
  }, []);

  const currentScenario = allScenarios.find((s) => s.id === scenario);

  const getResponse = (persona: Persona | null, scenarioId: string) => {
    if (!persona) return null;
    return ARCHETYPE_RESPONSES[persona.id]?.[scenarioId] ?? null;
  };

  const handlePersonaSelect = (persona: Persona) => {
    if (selectingSlot === "A") {
      setPersonaA(persona);
    } else if (selectingSlot === "B") {
      setPersonaB(persona);
    }
    setSelectingSlot(null);
  };

  const responseA = getResponse(personaA, scenario);
  const responseB = getResponse(personaB, scenario);

  // Find clash scenario from data if both selected
  const dataClash = useMemo(() => {
    if (!personaA || !personaB) return null;
    return clashScenarios.find(
      (s) =>
        (s.ids[0] === personaA.id && s.ids[1] === personaB.id) ||
        (s.ids[0] === personaB.id && s.ids[1] === personaA.id),
    );
  }, [personaA, personaB]);

  return (
    <div className="w-full">
      {/* Persona picker overlay */}
      {selectingSlot && (
        <div className="fixed inset-0 z-50 bg-forest/95 overflow-y-auto">
          <div className="px-6 md:px-16 py-12">
            <div className="flex items-center justify-between mb-8">
              <p className="font-sans text-xs tracking-widest uppercase text-terracotta">
                Choose Archetype {selectingSlot}
              </p>
              <button
                type="button"
                onClick={() => setSelectingSlot(null)}
                className="font-sans text-xs tracking-widest uppercase text-sand/30 hover:text-sand/70 transition-colors duration-200"
              >
                Cancel
              </button>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-px bg-sand/5">
              {personas.map((p) => (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => handlePersonaSelect(p)}
                  disabled={
                    (selectingSlot === "A" && personaB?.id === p.id) ||
                    (selectingSlot === "B" && personaA?.id === p.id)
                  }
                  className={`
                    bg-forest text-left p-5 border-b border-sand/5
                    transition-colors duration-200
                    disabled:opacity-25 disabled:cursor-not-allowed
                    hover:enabled:bg-terracotta/5
                  `}
                >
                  <p className="font-sans text-xs tracking-widest uppercase text-terracotta mb-1">
                    {p.eyebrow}
                  </p>
                  <p className="font-serif text-base text-sand leading-tight">
                    {p.name}
                  </p>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Scenario selector */}
      <div className="mb-10">
        <p className="font-sans text-xs tracking-widest uppercase text-sand/30 mb-4">
          Choose a Scenario
        </p>
        <div className="flex gap-2 flex-wrap">
          {CULTURAL_SCENARIOS.map((s) => (
            <button
              key={s.id}
              type="button"
              onClick={() => setScenario(s.id)}
              className={`
                font-sans text-xs tracking-widest uppercase px-4 py-2
                border transition-all duration-200
                ${
                  scenario === s.id
                    ? "border-terracotta text-terracotta bg-terracotta/5"
                    : "border-sand/10 text-sand/35 hover:border-sand/25 hover:text-sand/55"
                }
              `}
            >
              {s.title}
            </button>
          ))}
        </div>
      </div>

      {/* Scenario prompt */}
      {currentScenario && (
        <div className="border border-sand/10 p-8 mb-10 relative overflow-hidden">
          <div className="absolute inset-0 pointer-events-none">
            <Motif opacity={0.03} className="w-full h-full" />
          </div>
          <p className="font-sans text-xs tracking-widest uppercase text-terracotta mb-4">
            {currentScenario.title}
          </p>
          <p className="font-serif text-lg text-sand/80 leading-relaxed max-w-2xl relative">
            {currentScenario.prompt}
          </p>
        </div>
      )}

      {/* Two-column comparison */}
      <div className="grid md:grid-cols-2 gap-px bg-sand/5">
        {/* Persona A */}
        <div className="bg-forest p-8">
          {personaA ? (
            <div>
              <div className="flex items-start justify-between mb-6">
                <div>
                  <p className="font-sans text-xs tracking-widest uppercase text-terracotta mb-1">
                    {personaA.eyebrow}
                  </p>
                  <h3 className="font-serif text-2xl text-sand">
                    {personaA.name}
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={() => setSelectingSlot("A")}
                  className="font-sans text-xs tracking-widest uppercase text-sand/25 hover:text-sand/55 transition-colors duration-200"
                >
                  Change
                </button>
              </div>
              <div className="w-8 h-px bg-sand/15 mb-6" />
              {responseA ? (
                <p className="font-sans text-sm text-sand/65 leading-relaxed">
                  {responseA}
                </p>
              ) : (
                <p className="font-sans text-sm text-sand/25 italic">
                  No specific response for this scenario — but their traits
                  suggest they would approach it with{" "}
                  {personaA.traits[0]?.label.toLowerCase()} as the guiding
                  instinct.
                </p>
              )}
            </div>
          ) : (
            <button
              type="button"
              onClick={() => setSelectingSlot("A")}
              className="w-full h-full min-h-48 flex flex-col items-center justify-center gap-3 border border-dashed border-sand/10 hover:border-sand/25 transition-colors duration-200 group"
            >
              <div className="w-6 h-px bg-sand/20 group-hover:bg-sand/40 transition-colors duration-200" />
              <div className="h-px w-6 bg-sand/20 group-hover:bg-sand/40 transition-colors duration-200 absolute rotate-90" />
              <p className="font-sans text-xs tracking-widest uppercase text-sand/25 group-hover:text-sand/50 transition-colors duration-200 mt-4">
                Choose First Archetype
              </p>
            </button>
          )}
        </div>

        {/* Persona B */}
        <div className="bg-forest p-8 border-l border-sand/10">
          {personaB ? (
            <div>
              <div className="flex items-start justify-between mb-6">
                <div>
                  <p className="font-sans text-xs tracking-widest uppercase text-terracotta mb-1">
                    {personaB.eyebrow}
                  </p>
                  <h3 className="font-serif text-2xl text-sand">
                    {personaB.name}
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={() => setSelectingSlot("B")}
                  className="font-sans text-xs tracking-widest uppercase text-sand/25 hover:text-sand/55 transition-colors duration-200"
                >
                  Change
                </button>
              </div>
              <div className="w-8 h-px bg-sand/15 mb-6" />
              {responseB ? (
                <p className="font-sans text-sm text-sand/65 leading-relaxed">
                  {responseB}
                </p>
              ) : (
                <p className="font-sans text-sm text-sand/25 italic">
                  No specific response for this scenario — but their traits
                  suggest they would approach it with{" "}
                  {personaB.traits[0]?.label.toLowerCase()} as the guiding
                  instinct.
                </p>
              )}
            </div>
          ) : (
            <button
              type="button"
              onClick={() => setSelectingSlot("B")}
              className="w-full h-full min-h-48 flex flex-col items-center justify-center gap-3 border border-dashed border-sand/10 hover:border-sand/25 transition-colors duration-200 group"
            >
              <div className="w-6 h-px bg-sand/20 group-hover:bg-sand/40 transition-colors duration-200" />
              <div className="h-px w-6 bg-sand/20 group-hover:bg-sand/40 transition-colors duration-200 absolute rotate-90" />
              <p className="font-sans text-xs tracking-widest uppercase text-sand/25 group-hover:text-sand/50 transition-colors duration-200 mt-4">
                Choose Second Archetype
              </p>
            </button>
          )}
        </div>
      </div>

      {/* Clash resolution — if both selected and a clash scenario exists */}
      {dataClash && personaA && personaB && (
        <div className="mt-px bg-forest border-t border-sand/10 p-8">
          <p className="font-sans text-xs tracking-widest uppercase text-terracotta mb-4">
            {dataClash.title} — The Resolution
          </p>
          <p className="font-sans text-sm text-sand/60 leading-relaxed max-w-2xl">
            {dataClash.resolution}
          </p>
        </div>
      )}

      {/* Bottom link */}
      <div className="mt-16 pt-8 border-t border-sand/10 text-center">
        <p className="font-sans text-xs text-sand/30 tracking-wide mb-3">
          Want to find your own archetype first?
        </p>
        <a
          href="/#discover"
          className="font-sans text-xs tracking-widest uppercase text-sand/40 hover:text-terracotta transition-colors duration-200 underline underline-offset-4"
        >
          Take the Quiz →
        </a>
      </div>
    </div>
  );
}
