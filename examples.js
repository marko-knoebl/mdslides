const simple1_md = `
# slide 1

---

# slide 2
`;

const simple1_remark = {
  type: "presentation",
  children: [
    {
      type: "slide",
      children: [
        {
          type: "heading",
          depth: 1,
          children: [
            {
              type: "text",
              value: "slide 1"
            }
          ]
        }
      ]
    },
    {
      type: "slide",
      children: [
        {
          type: "heading",
          depth: 1,
          children: [
            {
              type: "text",
              value: "slide 2"
            }
          ]
        }
      ]
    }
  ]
};

const simple1_remark_parsed_h1 = {
  type: "presentation",
  children: [
    {
      type: "slide",
      children: [
        {
          type: "heading",
          depth: 1,
          children: [
            {
              type: "text",
              value: "slide 1"
            }
          ]
        }
      ]
    },
    {
      type: "slide",
      children: []
    },
    {
      type: "slide",
      children: [
        {
          type: "heading",
          depth: 1,
          children: [
            {
              type: "text",
              value: "slide 2"
            }
          ]
        }
      ]
    }
  ]
};

const simple1_remark_parsed_sections = {
  type: "presentation",
  children: [
    {
      type: "presentation_section",
      children: [
        {
          type: "slide",
          children: [
            {
              type: "heading",
              depth: 1,
              children: [
                {
                  type: "text",
                  value: "slide 1"
                }
              ]
            }
          ]
        },
        {
          type: "slide",
          children: []
        }
      ]
    },
    {
      type: "presentation_section",
      children: [
        {
          type: "slide",
          children: [
            {
              type: "heading",
              depth: 1,
              children: [
                {
                  type: "text",
                  value: "slide 2"
                }
              ]
            }
          ]
        }
      ]
    }
  ]
};

const simple1_html =
  '<div class="presentation">' +
  '<section class="slide"><h1>slide 1</h1></section>' +
  '<section class="slide"><h1>slide 2</h1></section>' +
  "</div>";

const simple1_html_parsed_h1 =
  '<div class="presentation">' +
  '<section class="slide"><h1>slide 1</h1></section>' +
  '<section class="slide"></section>' +
  '<section class="slide"><h1>slide 2</h1></section>' +
  "</div>";

const simple1_html_parsed_sections =
  '<div class="presentation">' +
  '<section class="presentation_section">' +
  '<section class="slide"><h1>slide 1</h1></section>' +
  '<section class="slide"></section>' +
  "</section>" +
  '<section class="presentation_section">' +
  '<section class="slide"><h1>slide 2</h1></section>' +
  "</section>" +
  "</div>";

const no_heading = "no heading";

const no_heading_remark = {
  type: "presentation",
  children: [
    {
      type: "presentation_section",
      children: [
        {
          type: "slide",
          children: [
            {
              type: "paragraph",
              children: [{ type: "text", value: "no heading" }]
            }
          ]
        }
      ]
    }
  ]
};

module.exports = {
  simple1_md,
  simple1_remark,
  simple1_remark_parsed_h1,
  simple1_remark_parsed_sections,
  simple1_html,
  simple1_html_parsed_h1,
  simple1_html_parsed_sections,
  no_heading,
  no_heading_remark
};
