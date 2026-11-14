// Step 1's code as a component the other steps can use: <CreatureCanvas program={...} />.
//
// New here:
// - `genes` gives some genes other values than the ones written in the code.
// - Many creatures move by themselves as time goes by. For those (`program.live`), the
//   creature is built again for every frame, with the time in seconds.

import { useEffect, useRef } from "react";
import { build, buildBackground } from "@genocode/core";
import { CreatureView } from "@genocode/render";

export default function CreatureCanvas({ program, genes }) {
  const canvasRef = useRef(null);
  const viewRef = useRef(null);
  const framedRef = useRef(false); // whether the camera has framed a creature yet

  // Make the view once, when the canvas appears.
  useEffect(() => {
    viewRef.current = new CreatureView(canvasRef.current);
    return () => {
      viewRef.current.dispose();
      viewRef.current = null;
      framedRef.current = false;
    };
  }, []);

  // Draw the creature again whenever the program or the genes change.
  useEffect(() => {
    const view = viewRef.current;
    let frame = 0;

    function draw() {
      const options = { genes, inputs: { time: performance.now() / 1000 } };
      const built = build(program, options);
      if (built.ok) {
        // The first time, the camera frames the creature. After that it stays where you put it.
        view.setCreature(built.shapes, framedRef.current, built.focus);
        view.setBackground(buildBackground(program, options).fill);
        framedRef.current = true;
      }
      if (program.live) frame = requestAnimationFrame(draw);
    }

    draw();
    return () => cancelAnimationFrame(frame);
  }, [program, genes]);

  return <canvas ref={canvasRef} className="stage" />;
}
