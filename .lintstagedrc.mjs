// add lint-staged support to next.js
// adds the --file flag

import { normalize } from "path";

export default {
  "**/*.{ts?(x),js?(x)}": (filenames) =>
    `next lint --fix --file ${filenames
      .map((file) => normalize(file))
      .map((file) => file.split(normalize(process.cwd()))[1])
      .join(" --file ")}`,
};
