// The creatures the samples offer: three short ones, written for this sample. Each is a text
// file of GenoCode in src/creatures. Adding "?raw" makes Vite import a file as a string of text.
//
// @genocode/core comes with much bigger creatures too. To try one, import it the same way:
//   import twirla from "@genocode/core/creatures/Twirla.genie?raw";

import snowman from "./creatures/Snowman.genie?raw";
import flower from "./creatures/Flower.genie?raw";
import caterpillar from "./creatures/Caterpillar.genie?raw";

export const creatures = [
  { name: "Snowman", code: snowman },
  { name: "Flower", code: flower },
  { name: "Caterpillar", code: caterpillar },
];
