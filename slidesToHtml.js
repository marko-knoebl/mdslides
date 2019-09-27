const assert = require("assert");

const unified = require("unified");
const remark2rehype = require("remark-rehype");
const html = require("rehype-stringify");

const slidesToHtml = slides => {
  assert.equal(slides.type, "presentation");

  if (slides.length === 0) {
    return "";
  }

  let htmlContent;
  if (slides.children[0].type === "slide") {
    htmlContent = slides.children.map(slideToHtml);
  } else if (slides.children[0].type === "presentation_section") {
    htmlContent = slides.children.map(sectionToHtml);
  }
  const htmlSlides = htmlContent;
  const htmlPresentation = {
    type: "element",
    tagName: "div",
    properties: { class: "presentation" },
    children: htmlSlides
  };

  const htmlPresentationString = unified()
    .use(html)
    .stringify(htmlPresentation);

  return htmlPresentationString;
};

const sectionToHtml = section => {
  const htmlSlides = section.children.map(slideToHtml);
  return {
    type: "element",
    tagName: "section",
    properties: { class: "presentation_section" },
    children: htmlSlides
  };
};

const slideToHtml = slide => {
  const htmlSlideContents = unified()
    .use(remark2rehype)
    .runSync(slide);
  htmlSlideContents.tagName = "section";
  htmlSlideContents.properties = { class: "slide" };
  return htmlSlideContents;
};

module.exports.slidesToHtml = slidesToHtml;
