// A control for one gene, from the package @genocode/controls: a slider for a number, a colour
// picker for a colour, a checkbox for true/false, a menu for a choice, three sliders for a vector.
//
// geneControl() makes a plain DOM element, not a React one, so this component puts it on the
// page itself: it keeps an empty <span> and places the control inside it.

import { useEffect, useRef } from "react";
import { geneControl } from "@genocode/controls";

export default function GeneControl({ gene, startValue, onChange }) {
  const holderRef = useRef(null);

  // Make the control when the gene or its starting value changes. It isn't made again while
  // you drag a slider: the control looks after its own value from then on.
  useEffect(() => {
    const control = geneControl(gene, startValue, {
      input: onChange, // called while a slider is dragged
      change: onChange, // called when it's let go
    });
    holderRef.current.replaceChildren(control ?? ""); // a few genes have no control
  }, [gene, startValue]);

  return <span ref={holderRef} className="gene-control" />;
}
