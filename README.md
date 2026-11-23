<p align="center"><img src="https://raw.githubusercontent.com/genocode-org/GenoCode/main/branding/logo-lockup.svg" alt="GenoCode" width="480"></p>

# GenoCode sample

A small React site that shows what the [GenoCode](https://github.com/genocode-org/GenoCode)
libraries can do in a web page:

- [`@genocode/core`](https://www.npmjs.com/package/@genocode/core) reads a creature's code, runs
  it, and mutates, breeds and morphs its genes.
- [`@genocode/render`](https://www.npmjs.com/package/@genocode/render) draws the creature in 3D on
  a canvas.
- [`@genocode/controls`](https://www.npmjs.com/package/@genocode/controls) makes a slider, colour
  picker, checkbox or menu for each gene.

![Step 3 of the sample: a snowman's code, the snowman in 3D, and a control for each of its genes](docs/step3-genes.png)

## Run it

You need [Node.js](https://nodejs.org) 22 or newer.

```
git clone https://github.com/genocode-org/GenoCode-sample.git
cd GenoCode-sample
npm install
npm run dev
```

Then open the address it prints (usually http://localhost:5173).

## The steps

The site has five steps. Each one is a sample by itself, in one file in `src/steps`, and each
adds one idea to the step before. The comment at the top of each file says what's new.

1. **Show** (`Step1Show.jsx`): a creature on a canvas in three calls: `check`, `build` and
   `setCreature`.
2. **Code** (`Step2Code.jsx`): change the code and the creature changes; mistakes are listed.
3. **Genes** (`Step3Genes.jsx`): a control for each gene (`@genocode/controls`) and a button for
   each variant.
4. **Breed** (`Step4Breed.jsx`): a grid of mutants and children, with `mutate`, `breed` and
   `Thumbnails`.
5. **Morph** (`Step5Morph.jsx`): a smooth loop through the creature's variants, with `morph`.

The other files:

- `src/CreatureCanvas.jsx`: step 1's code as a React component, which steps 2 to 5 use.
- `src/GeneControl.jsx`: a gene's control from `@genocode/controls` as a React component.
- `src/creatures`: three short creatures written for this sample (a snowman, a flower and a
  caterpillar), each about 30 lines of GenoCode. `src/creatures.js` lists them. Bigger creatures
  come with `@genocode/core`; `src/creatures.js` says how to try one.
- `src/App.jsx`: the page with the step buttons.
- `src/styles.css`: all the styling.

## Use it in your own site

The libraries are on npm, and none of them need React:

```
npm install @genocode/core @genocode/render @genocode/controls
```

Start from step 1: it's the smallest page that shows a creature. Each later step adds one idea,
so take only the ideas you need.

## Where to go next

- [Getting started](https://genocode.piorek.co.za/docs/), to write your first creature.
- The [GenoCode app](https://genocode.piorek.co.za/app/), to code, breed and dance creatures in
  the browser.
- The language creatures are written in:
  [LANGUAGE.md](https://github.com/genocode-org/GenoCode/blob/main/docs/LANGUAGE.md).
- [`@genocode/controls`](https://www.npmjs.com/package/@genocode/controls), used in step 3, also
  has sliders that stand in for time and music (`InputControls`).

MIT licensed.
