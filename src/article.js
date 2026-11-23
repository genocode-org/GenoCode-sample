// Creatures inside an ordinary web page, with no React: article.html.
//
// Every <canvas data-creature="Name"> on the page gets that creature, and every
// <span class="variants" data-for="Name"> gets a button for each of its variants. It uses the
// same calls as step 1 (check, build, setCreature), plus a few things a page full of text needs:
// - The camera frames everything the creature does over its first few seconds, so a creature that
//   moves a lot, such as the caterpillar, never moves out of its picture.
// - The camera is locked, so scrolling the page over a creature scrolls the page instead of
//   zooming in on the creature.
// - A creature only moves while it's on the screen, so a long page doesn't keep working on
//   creatures nobody can see.
// - A creature stands still for people who have asked their system for less motion.

import { check, build, buildBackground } from "@genocode/core";
import { CreatureView } from "@genocode/render";
import { creatures } from "./creatures.js";

const lessMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

for (const canvas of document.querySelectorAll("canvas[data-creature]")) {
  const name = canvas.dataset.creature;
  const program = check(creatures.find((c) => c.name === name).code);

  const view = new CreatureView(canvas);
  view.lockCamera(true);
  // The view stops touches on the canvas from scrolling the page, so that a finger can turn the
  // creature. With the camera locked there's nothing to turn, so let them scroll again.
  canvas.style.touchAction = "auto";

  let genes = new Map(); // the variant on show: no values means the creature as written
  let onScreen = false;
  let nextFrame = 0; // the next frame asked for, while the creature moves
  let framed = false; // whether the camera has framed the creature yet

  // Builds the creature at many moments of its first eight seconds and frames all their shapes at
  // once. The camera then stays put while the creature moves inside that frame.
  function frameMoves() {
    const shapes = [];
    for (let time = 0; time < 8; time += 0.25) {
      const built = build(program, { genes, inputs: { time } });
      if (built.ok) shapes.push(...built.shapes);
    }
    view.setCreature(shapes, false);
    framed = true;
  }

  function draw() {
    if (!framed) frameMoves();
    const time = lessMotion ? 0 : performance.now() / 1000;
    const options = { genes, inputs: { time } };
    const built = build(program, options);
    if (built.ok) {
      view.setCreature(built.shapes, true);
      view.setBackground(buildBackground(program, options).fill);
    }
    cancelAnimationFrame(nextFrame);
    if (program.live && onScreen && !lessMotion) nextFrame = requestAnimationFrame(draw);
  }

  // Start moving when the canvas comes onto the screen, and stop when it leaves.
  new IntersectionObserver(([entry]) => {
    onScreen = entry.isIntersecting;
    if (onScreen) draw();
    else cancelAnimationFrame(nextFrame);
  }).observe(canvas);

  // A button for the creature as written, and one for each of its variants.
  const buttons = document.querySelector(`.variants[data-for="${name}"]`);
  if (buttons) {
    const choices = [{ name, values: new Map() }, ...program.variants];
    for (const variant of choices) {
      const button = document.createElement("button");
      button.textContent = variant.name;
      button.addEventListener("click", () => {
        genes = new Map(variant.values);
        framed = false; // a variant may be another size, so frame it again
        draw();
      });
      buttons.append(button);
    }
  }
}
