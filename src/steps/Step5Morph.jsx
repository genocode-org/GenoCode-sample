// Step 5: morph from one variant to the next.
//
// The code box and the sliders are left out here to keep the file short.
// New in this step:
// - morph(a, b, t) gives the gene values between creatures a and b: t = 0 is a, t = 1 is b,
//   and 0.5 is halfway. Going round the creature and its variants makes an endless loop.

import { useEffect, useState } from "react";
import { check, morph } from "@genocode/core";
import CreatureCanvas from "../CreatureCanvas.jsx";
import { creatures } from "../creatures.js";

const SECONDS_EACH = 3; // how long it takes from one variant to the next

export default function Step5Morph() {
  const [name, setName] = useState(creatures[0].name);
  const [program, setProgram] = useState(() => check(creatures[0].code));
  const [playing, setPlaying] = useState(true);
  const [position, setPosition] = useState(0); // 0 = the creature, 1 = first variant, 1.5 = ...

  // The loop's members: the creature as written, then each of its variants.
  const members = [
    { name, values: new Map() },
    ...program.variants.map((v) => ({ name: v.name, values: v.values })),
  ];

  // While playing, move the position on a little for every frame the browser draws.
  useEffect(() => {
    if (!playing) return;
    let frame = 0;
    let last = null; // when the frame before this one was drawn
    function step(now) {
      if (last !== null) {
        const seconds = (now - last) / 1000;
        setPosition((p) => (p + seconds / SECONDS_EACH) % members.length);
      }
      last = now;
      frame = requestAnimationFrame(step);
    }
    frame = requestAnimationFrame(step);
    return () => cancelAnimationFrame(frame);
  }, [playing, members.length]);

  function chooseCreature(newName) {
    setName(newName);
    setProgram(check(creatures.find((c) => c.name === newName).code));
    setPosition(0);
  }

  const from = members[Math.floor(position) % members.length];
  const to = members[(Math.floor(position) + 1) % members.length];
  const t = position - Math.floor(position);
  const genes = morph(
    { genes: program.genes, values: from.values },
    { genes: program.genes, values: to.values },
    t,
  ).values;

  return (
    <div className="columns">
      <div className="side">
        <select value={name} onChange={(e) => chooseCreature(e.target.value)}>
          {creatures.map((c) => (
            <option key={c.name}>{c.name}</option>
          ))}
        </select>
        <button onClick={() => setPlaying(!playing)}>{playing ? "Pause" : "Play"}</button>
        <p>
          {from.name} → {to.name} ({Math.round(t * 100)}%)
        </p>
        <div className="buttons">
          {members.map((m, i) => (
            <button key={m.name} onClick={() => setPosition(i)}>
              {m.name}
            </button>
          ))}
        </div>
      </div>
      <CreatureCanvas key={name} program={program} genes={genes} />
    </div>
  );
}
