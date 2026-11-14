// Step 1: show a creature.
//
// A creature is a text file of GenoCode. Three calls put it on the screen:
//   check(text)        reads the text and looks for mistakes        (@genocode/core)
//   build(program)     runs it, which gives a list of 3D shapes      (@genocode/core)
//   view.setCreature() draws those shapes on a <canvas>              (@genocode/render)

import { useEffect, useRef } from "react";
import { check, build, buildBackground } from "@genocode/core";
import { CreatureView } from "@genocode/render";
import { creatures } from "../creatures.js";

export default function Step1Show() {
  const canvasRef = useRef(null);

  useEffect(() => {
    // The view draws on the canvas, and lets you turn and zoom with the mouse.
    const view = new CreatureView(canvasRef.current);

    const program = check(creatures[0].code);
    const built = build(program);
    view.setCreature(built.shapes, false, built.focus);

    // A creature may come with its own background.
    view.setBackground(buildBackground(program).fill);

    // When React takes the canvas away, the view must let go of it.
    return () => view.dispose();
  }, []);

  return <canvas ref={canvasRef} className="stage" />;
}
