const assert = require("assert");

const unified = require("unified");
const remark2rehype = require("remark-rehype");
const html = require("rehype-stringify");

const slidesToHtml = slides => {
  assert.equal(slides.type, "presentation");

  const htmlSlides = slides.children.map(slide => {
    if (slide.type !== "slide") {
      throw new Error("can only process slides");
    }

    const htmlSlideContents = unified()
      .use(remark2rehype)
      .runSync(slide);
    htmlSlideContents.tagName = "section";
    htmlSlideContents.properties = { class: "slide" };

    return htmlSlideContents;
  });

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

module.exports.slidesToHtml = slidesToHtml;
