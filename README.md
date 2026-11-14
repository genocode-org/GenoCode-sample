# GenoCode sample

A small React site that shows what the [GenoCode](https://github.com/genocode-org/GenoCode)
libraries can do in a web page:

- [`@genocode/core`](https://www.npmjs.com/package/@genocode/core) reads a creature's code, runs
  it, and mutates, breeds and morphs its genes.
- [`@genocode/render`](https://www.npmjs.com/package/@genocode/render) draws the creature in 3D on
  a canvas.
- [`@genocode/controls`](https://www.npmjs.com/package/@genocode/controls) makes a slider, colour
  picker, checkbox or menu for each gene.

## Run it

You need [Node.js](https://nodejs.org) 22 or newer.

```
npm install
npm run dev
```

Then open the address it prints (usually http://localhost:5173).

## The steps

The site has five steps. Each one is a sample by itself, in one file in `src/steps`, and each
adds one idea to the step before. The comment at the top of each file says what's new.

| Step     | File             | What it shows                                                      |
| -------- | ---------------- | ------------------------------------------------------------------ |
| 1. Show  | `Step1Show.jsx`  | A creature on a canvas in three calls: `check`, `build`, `setCreature` |
| 2. Code  | `Step2Code.jsx`  | Change the code and the creature changes; mistakes are listed      |
| 3. Genes | `Step3Genes.jsx` | A control for each gene (`@genocode/controls`), a button for each variant |
| 4. Breed | `Step4Breed.jsx` | A grid of mutants and children, with `mutate`, `breed` and `Thumbnails` |
| 5. Morph | `Step5Morph.jsx` | A smooth loop through the creature's variants, with `morph`        |

The other files:

- `src/CreatureCanvas.jsx`: step 1's code as a React component, which steps 2 to 5 use.
- `src/GeneControl.jsx`: a gene's control from `@genocode/controls` as a React component.
- `src/creatures`: three short creatures written for this sample (a snowman, a flower and a
  caterpillar), each about 30 lines of GenoCode. `src/creatures.js` lists them. Bigger creatures
  come with `@genocode/core`; `src/creatures.js` says how to try one.
- `src/App.jsx`: the page with the step buttons.
- `src/styles.css`: all the styling.

## Where to go next

- The language creatures are written in:
  [LANGUAGE.md](https://github.com/genocode-org/GenoCode/blob/main/docs/LANGUAGE.md).
- [`@genocode/controls`](https://www.npmjs.com/package/@genocode/controls), used in step 3, also
  has sliders that stand in for time and music (`InputControls`).

MIT licensed.
