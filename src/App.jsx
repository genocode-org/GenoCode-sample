// The page: a title, a button for each step, and the chosen step below.
// The samples themselves are in src/steps; each file there can be read on its own.

import { useState } from "react";
import Step1Show from "./steps/Step1Show.jsx";
import Step2Code from "./steps/Step2Code.jsx";
import Step3Genes from "./steps/Step3Genes.jsx";
import Step4Breed from "./steps/Step4Breed.jsx";
import Step5Morph from "./steps/Step5Morph.jsx";

const steps = [
  {
    title: "1. Show",
    file: "Step1Show.jsx",
    about: "A creature on a canvas, in three calls. Drag to turn it, scroll to zoom.",
    Component: Step1Show,
  },
  {
    title: "2. Code",
    file: "Step2Code.jsx",
    about: "Change the code and the creature changes as you type. Mistakes are listed.",
    Component: Step2Code,
  },
  {
    title: "3. Genes",
    file: "Step3Genes.jsx",
    about: "A control for each gene, and a button for each of the creature's variants.",
    Component: Step3Genes,
  },
  {
    title: "4. Breed",
    file: "Step4Breed.jsx",
    about: "Click one creature to mutate it, or two to breed them, then press the button.",
    Component: Step4Breed,
  },
  {
    title: "5. Morph",
    file: "Step5Morph.jsx",
    about: "The creature changes smoothly into each of its variants, round and round.",
    Component: Step5Morph,
  },
];

export default function App() {
  const [chosen, setChosen] = useState(0);
  const step = steps[chosen];

  return (
    <>
      <header>
        <h1>GenoCode sample</h1>
        <nav>
          {steps.map((s, i) => (
            <button key={s.title} className={i === chosen ? "chosen" : ""} onClick={() => setChosen(i)}>
              {s.title}
            </button>
          ))}
        </nav>
      </header>
      <p className="about">
        {step.about} <code>src/steps/{step.file}</code>
      </p>
      <step.Component />
    </>
  );
}
