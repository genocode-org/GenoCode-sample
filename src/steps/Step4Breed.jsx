// Step 4: breed creatures.
//
// The code box and the sliders are left out here to keep the file short.
// New in this step:
// - mutate() gives a copy of a creature's gene values with a few of them changed by chance.
// - breed() gives the gene values of a child of two creatures.
// - Thumbnails draws many small creatures quickly. One Thumbnails is shared by all the tiles,
//   because browsers only allow a few 3D canvases on a page.
//
// Click one tile and press the button to get its mutants; click two to get their children.

import { useEffect, useRef, useState } from "react";
import { check, build, buildBackground, mutate, breed } from "@genocode/core";
import { Thumbnails } from "@genocode/render";
import CreatureCanvas from "../CreatureCanvas.jsx";
import { creatures } from "../creatures.js";

const thumbnails = new Thumbnails();

function mutants(program, genes) {
  const options = { strength: 0.5, random: Math.random };
  return Array.from({ length: 6 }, () => mutate(program.genes, genes, options));
}

function Tile({ program, genes, picked, onClick }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const built = build(program, { genes });
    const background = buildBackground(program, { genes }).fill;
    thumbnails.draw(canvasRef.current, built.shapes, background, built.focus);
  }, [program, genes]);

  return (
    <canvas
      ref={canvasRef}
      width={150}
      height={150}
      className={picked ? "tile picked" : "tile"}
      onClick={onClick}
    />
  );
}

export default function Step4Breed() {
  const [name, setName] = useState(creatures[0].name);
  const [program, setProgram] = useState(() => check(creatures[0].code));
  const [children, setChildren] = useState(() => mutants(program, new Map()));
  const [picked, setPicked] = useState([]); // the places in `children` of the picked tiles

  function chooseCreature(newName) {
    const checked = check(creatures.find((c) => c.name === newName).code);
    setName(newName);
    setProgram(checked);
    setChildren(mutants(checked, new Map()));
    setPicked([]);
  }

  function pick(i) {
    if (picked.includes(i)) setPicked(picked.filter((p) => p !== i));
    else setPicked([...picked, i].slice(-2)); // keep the last two
  }

  function makeChildren() {
    const [a, b] = picked.map((i) => children[i]);
    if (b === undefined) {
      setChildren(mutants(program, a));
    } else {
      const mother = { genes: program.genes, values: a };
      const father = { genes: program.genes, values: b };
      const options = { random: Math.random };
      setChildren(Array.from({ length: 6 }, () => breed(mother, father, options)));
    }
    setPicked([]);
  }

  const shown = picked.length > 0 ? children[picked[picked.length - 1]] : undefined;

  return (
    <div className="columns">
      <div className="side">
        <select value={name} onChange={(e) => chooseCreature(e.target.value)}>
          {creatures.map((c) => (
            <option key={c.name}>{c.name}</option>
          ))}
        </select>
        <div className="tiles">
          {children.map((genes, i) => (
            <Tile
              key={i}
              program={program}
              genes={genes}
              picked={picked.includes(i)}
              onClick={() => pick(i)}
            />
          ))}
        </div>
        <button onClick={makeChildren} disabled={picked.length === 0}>
          {picked.length === 2 ? "Breed these two" : "Mutate this one"}
        </button>
      </div>
      <CreatureCanvas key={name} program={program} genes={shown} />
    </div>
  );
}
