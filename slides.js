const astAddSeparators = require("./astAddSeparators.js");

/**
 * turns array of markdown elements including slide separators
 * (e.g. "---") into an array of json slide elements
 */
const mdElementsToSlides = (
  mdElements,
  { slideSeparators = ["hr"], sectionSeparators = [] } = {}
) => {
  mdElements = astAddSeparators(mdElements, {
    slideSeparators,
    sectionSeparators
  });
  if (mdElements.length > 0 && mdElements[0].type !== "slide_separator") {
    mdElements = [{ type: "slide_separator" }, ...mdElements];
  }
  const slides = [];
  for (let element of mdElements) {
    if (element.type === "slide_separator") {
      slides.push({
        type: "slide",
        children: []
      });
    } else {
      slides[slides.length - 1].children.push(element);
    }
  }
  return slides;
};

/**
 * turns an array of markdown elements including section separators
 * (and slide separators) into an array of section elements (still
 * including slide separators)
 */
const mdElementsToSections = (mdElements, { sectionSeparators = [] } = {}) => {
  mdElements = astAddSeparators(mdElements, { sectionSeparators });
  if (mdElements.length > 0 && mdElements[0].type !== "section_separator") {
    mdElements = [{ type: "section_separator" }, ...mdElements];
  }
  const sections = [];
  for (let element of mdElements) {
    if (element.type === "section_separator") {
      sections.push({
        type: "presentation_section",
        children: []
      });
    } else {
      sections[sections.length - 1].children.push(element);
    }
  }
  return sections;
};

/**
 * turns an array of markdown elements including section separators
 * and slide separators into an array of section elements
 * that include slide elements
 */
const mdElementsToSectionedSlides = (
  mdElements,
  { slideSeparators = ["hr"], sectionSeparators = [] } = {}
) => {
  return mdElementsToSections(mdElements, { sectionSeparators }).map(
    section => ({
      ...section,
      children: mdElementsToSlides(section.children, { slideSeparators })
    })
  );
};

module.exports.mdElementsToSlides = mdElementsToSlides;
module.exports.mdElementsToSectionedSlides = mdElementsToSectionedSlides;
