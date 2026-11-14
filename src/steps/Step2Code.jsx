// Step 2: change the code and watch the creature change.
//
// New in this step:
// - A menu of creatures and a text box with the chosen creature's code.
// - check() runs on every change. Its `diagnostics` list the mistakes it found, and
//   formatDiagnostic() turns one into a line of text with the line number. The first five
//   are shown.
// - Only code without mistakes (`ok`) is shown, so the last good creature stays on screen.
// - The drawing moved into <CreatureCanvas>, which also makes the creature move with time.

import { useState } from "react";
import { check, formatDiagnostic } from "@genocode/core";
import CreatureCanvas from "../CreatureCanvas.jsx";
import { creatures } from "../creatures.js";

export default function Step2Code() {
  const [name, setName] = useState(creatures[0].name);
  const [code, setCode] = useState(creatures[0].code);
  const [program, setProgram] = useState(() => check(creatures[0].code));
  const [problems, setProblems] = useState([]);

  function changeCode(text) {
    setCode(text);
    const checked = check(text);
    setProblems(checked.diagnostics.map((d) => formatDiagnostic(d, checked.lines, "code")));
    if (checked.ok) setProgram(checked);
  }

  function chooseCreature(newName) {
    setName(newName);
    changeCode(creatures.find((c) => c.name === newName).code);
  }

  return (
    <div className="columns">
      <div className="side">
        <select value={name} onChange={(e) => chooseCreature(e.target.value)}>
          {creatures.map((c) => (
            <option key={c.name}>{c.name}</option>
          ))}
        </select>
        <textarea value={code} onChange={(e) => changeCode(e.target.value)} spellCheck={false} />
        {problems.slice(0, 5).map((p) => (
          <p key={p} className="problem">
            {p}
          </p>
        ))}
      </div>
      {/* A new `key` gives a new canvas, so the camera frames each creature afresh. */}
      <CreatureCanvas key={name} program={program} />
    </div>
  );
}
