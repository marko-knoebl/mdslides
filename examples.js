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

module.exports = {
  simple1_md,
  simple1_remark,
  simple1_remark_parsed_h1,
  simple1_remark_parsed_sections
};
