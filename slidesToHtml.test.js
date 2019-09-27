const slidesToHtml = require("./slidesToHtml.js").slidesToHtml;

const {
  simple1_remark,
  simple1_remark_parsed_h1,
  simple1_remark_parsed_sections,
  simple1_html,
  simple1_html_parsed_h1,
  simple1_html_parsed_sections
} = require("./examples.js");

it("converts a json slides representation to a standard HTML format", () => {
  const input = {
    type: "presentation",
    children: [
      {
        type: "slide",
        children: [
          {
            type: "heading",
            depth: 2,
            children: [
              {
                type: "text",
                value: "hello world"
              }
            ]
          }
        ]
      }
    ]
  };
  output = slidesToHtml(input, "default");
  expect(output).toEqual(
    '<div class="presentation"><section class="slide"><h2>hello world</h2></section></div>'
  );
});

it("converts simple1 example to html", () => {
  input = simple1_remark;
  output = slidesToHtml(input);
  expect(output).toEqual(simple1_html);
});

it("converts simple1 example to html with h1 activated", () => {
  input = simple1_remark_parsed_h1;
  output = slidesToHtml(input);
  expect(output).toEqual(simple1_html_parsed_h1);
});

it("converts simple1 example to html with sections activated", () => {
  input = simple1_remark_parsed_sections;
  output = slidesToHtml(input);
  expect(output).toEqual(simple1_html_parsed_sections);
});
