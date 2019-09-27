const slidesToHtml = require("./slidesToHtml.js").slidesToHtml;

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
