const unified = require("unified");
const remarkParse = require("remark-parse");

const {
  mdElementsToSlides,
  mdElementsToSectionedSlides
} = require("./slides.js");

const examples = require("./examples.js");

const parser = unified().use(remarkParse, { commonmark: true });

const stripPosition = ast => {
  const { position, ...processedAst } = ast;
  if ("children" in processedAst) {
    processedAst.children = processedAst.children.map(stripPosition);
  }
  return processedAst;
};

it("parses simple1 example correctly", () => {
  const input = examples.simple1_md;
  const expected = examples.simple1_remark;

  let parsed = parser.parse(input);
  const processed = mdElementsToSlides(parsed.children);
  const processedNode = { children: processed, type: "presentation" };

  expect(stripPosition(processedNode)).toEqual(expected);
});

it("parses simple1 example correctly with h1 activated", () => {
  const input = examples.simple1_md;
  const expected = examples.simple1_remark_parsed_h1;

  const parsed = parser.parse(input);
  const processed = mdElementsToSlides(parsed.children, {
    slideSeparators: ["hr", "h1"]
  });
  const processedNode = { type: "presentation", children: processed };
  expect(stripPosition(processedNode)).toEqual(expected);
});

it("parses simple1 example correctly with presentation sections", () => {
  const input = examples.simple1_md;
  const expected = examples.simple1_remark_parsed_sections;

  const parsed = parser.parse(input);
  const processed = mdElementsToSectionedSlides(parsed.children, {
    slideSeparators: ["hr"],
    sectionSeparators: ["h1"]
  });
  const processedNode = { type: "presentation", children: processed };
  expect(stripPosition(processedNode)).toEqual(expected);
});

it("parses bare content without a heading as a paragraph", () => {
  const input = examples.no_heading;
  const expected = examples.no_heading_remark;

  const parsed = parser.parse(input);
  const processed = mdElementsToSectionedSlides(parsed.children);
  const processedNode = { type: "presentation", children: processed };
  expect(stripPosition(processedNode)).toEqual(expected);
});

it("parses h1 elements and creates presentation_section elements", () => {
  const input = "# React.js\n";

  const parsed = parser.parse(input);
  const processed = mdElementsToSectionedSlides(parsed.children, {
    slideSeparators: [],
    sectionSeparators: ["h1"]
  });
  const processedNode = { type: "presentation", children: processed };

  expect(processedNode.children[0].type).toEqual("presentation_section");
  expect(processedNode.children[0].children[0].type).toEqual("slide");
  expect(processedNode.children[0].children[0].children[0].depth).toEqual(1);
});

it("parses h2 elements and creates slide elements", () => {
  const input = "# section 1\n\n## slide 1\n\n## slide2";

  const parsed = parser.parse(input);
  const processed = mdElementsToSectionedSlides(parsed.children, {
    sectionSeparators: ["h1"],
    slideSeparators: ["h2"]
  });
  const processedNode = { type: "presentation", children: processed };

  expect(processedNode.children[0].type).toEqual("presentation_section");
  expect(processedNode.children[0].children[0].type).toEqual("slide");
});

it("parses a single h1 element", () => {
  const input = "# React.js\n";

  const parsed = parser.parse(input);

  const processed = mdElementsToSectionedSlides(parsed.children, {
    sectionSeparators: ["h1"],
    slideSeparators: ["h2"]
  });
  const processedNode = { type: "presentation", children: processed };

  expect(processedNode.type).toEqual("presentation");
  expect(processedNode.children[0].type).toEqual("presentation_section");
  expect(processedNode.children[0].children[0].children[0].type).toEqual(
    "heading"
  );
  expect(processedNode.children[0].children[0].children[0].depth).toEqual(1);
  expect(
    processedNode.children[0].children[0].children[0].children[0].type
  ).toEqual("text");
  expect(
    processedNode.children[0].children[0].children[0].children[0].value
  ).toEqual("React.js");
});

it("parses an h1 and an h2 element", () => {
  const input = "# React.js\n\n## Overview";

  const parsed = parser.parse(input);

  const processed = mdElementsToSectionedSlides(parsed.children, {
    sectionSeparators: ["h1"],
    slideSeparators: ["h2"]
  });
  const processedNode = { type: "presentation", children: processed };

  const slide0 = processedNode.children[0].children[0];
  expect(slide0.type).toEqual("slide");
  expect(slide0.children[0].type).toEqual("heading");
  const slide1 = processedNode.children[0].children[1];
  expect(slide1.children[0].type).toEqual("heading");
});

it("parses a paragraph", () => {
  const input = "# Reactjs\n\nfirst paragraph.";

  const parsed = parser.parse(input);

  const processed = mdElementsToSectionedSlides(parsed.children, {
    sectionSeparators: ["h1"],
    slideSeparators: ["h2"]
  });
  const processedNode = { type: "presentation", children: processed };

  const element = processedNode.children[0].children[0].children[1];
  expect(element.type).toEqual("paragraph");
});
