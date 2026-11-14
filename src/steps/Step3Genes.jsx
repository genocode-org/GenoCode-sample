// Step 3: genes and variants.
//
// A gene is a value in the code that may change, such as `gene height = 1 in 0.5..2`.
// New in this step:
// - `program.genes` lists every gene: its name, kind, value and range. Each one gets a control
//   from the package @genocode/controls (see GeneControl.jsx): sliders, colour pickers, ...
// - The new values go to build() as a Map from gene name to value. The code isn't changed.
// - `program.variants` lists the creature's variants: named sets of gene values.
// - formatValue() writes a gene value as text, the way it's written in the code.

import { useState } from "react";
import { check, formatDiagnostic, formatValue } from "@genocode/core";
import CreatureCanvas from "../CreatureCanvas.jsx";
import GeneControl from "../GeneControl.jsx";
import { creatures } from "../creatures.js";

export default function Step3Genes() {
  const [name, setName] = useState(creatures[0].name);
  const [code, setCode] = useState(creatures[0].code);
  const [program, setProgram] = useState(() => check(creatures[0].code));
  const [problems, setProblems] = useState([]);
  const [genes, setGenes] = useState(new Map()); // the values on show
  const [start, setStart] = useState(new Map()); // the values the controls start from

  function changeCode(text) {
    setCode(text);
    const checked = check(text);
    setProblems(checked.diagnostics.map((d) => formatDiagnostic(d, checked.lines, "code")));
    if (checked.ok) setProgram(checked);
  }

  function chooseCreature(newName) {
    setName(newName);
    chooseValues(new Map());
    changeCode(creatures.find((c) => c.name === newName).code);
  }

  // A variant's button was pressed: show its values, and set the controls to them.
  function chooseValues(values) {
    setGenes(values);
    setStart(values);
  }

  // A control was moved. A new Map is made, so React sees the change.
  function changeGene(gene, value) {
    setGenes((old) => new Map(old).set(gene.fullName, value));
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
      <CreatureCanvas key={name} program={program} genes={genes} />
      <div className="side">
        <div className="buttons">
          <button onClick={() => chooseValues(new Map())}>{name}</button>
          {program.variants.map((v) => (
            <button key={v.name} onClick={() => chooseValues(new Map(v.values))}>
              {v.name}
            </button>
          ))}
        </div>
        <div className="genes">
          {program.genes.map((g) => (
            <label key={g.fullName} title={g.description}>
              <span>{g.fullName}</span>
              <GeneControl
                gene={g}
                startValue={start.get(g.fullName) ?? g.value}
                onChange={changeGene}
              />
              {/* A number is shown as text too. A colour shows in its own control. */}
              <span>{g.kind === "number" && formatValue(genes.get(g.fullName) ?? g.value)}</span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );
}
