/**
 * add separators between slides of a slides-md-ast:
 *
 * { type: "slide_separator" }
 * { type: "section_separator" }
 *
 * input: array of presentation contents
 */
const astAddSeparators = (
  astNodes,
  { slideSeparators = ["hr"], sectionSeparators = [] } = {}
) => {
  return astNodes.reduce((children, child) => {
    if (slideSeparators.includes("hr") && child.type === "thematicBreak") {
      return [...children, { type: "slide_separator" }];
    } else if (
      slideSeparators.includes("h2") &&
      child.type === "heading" &&
      child.depth === 2
    ) {
      return [...children, { type: "slide_separator" }, child];
    } else if (
      sectionSeparators.includes("h1") &&
      child.type === "heading" &&
      child.depth === 1
    ) {
      return [...children, { type: "section_separator" }, child];
    } else if (
      slideSeparators.includes("h1") &&
      child.type === "heading" &&
      child.depth === 1
    ) {
      return [...children, { type: "slide_separator" }, child];
    } else {
      return [...children, child];
    }
  }, []);
};

module.exports = astAddSeparators;
