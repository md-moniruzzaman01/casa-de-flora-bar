export const CATERING_CONTENT = {
  hero: {
    eyebrow: "Catering & Events",
    title: "Food as",
    titleAccent: "Beautiful",
    titleSuffix: "as the Flowers", // Added to accommodate the "as the Flowers" line
    description:
      "From intimate brunches to full wedding receptions — our catering brings the same care and elegance as every bloom we arrange.",
    image: "/venue/grand stage-02.jpg",
    badge: "Serving NJ + NYC",
    primary: { label: "Request a Quote", href: "#inquiry" },
    secondary: { label: "View Menu", href: "#menus" },
    quickQuote: {
      heading: "Quick Quote",
      subheading: "Most quotes back within 24h",
      ctaLabel: "Start Inquiry",
    },
    stats: [
      { value: "150+", label: "Events catered" },
      { value: "20–500", label: "Guests served" },
      { value: "48h", label: "Quote turnaround" },
    ],
  },

  brunch: [
    {
      num: "200",
      unit: "+",
      label: "EVENTS CATERED",
      detail: "From bridal brunches to wedding receptions, across NJ and beyond.",
    },
    {
      num: "3",
      unit: "",
      label: "SIGNATURE PACKAGES",
      detail: "Brunch, cocktail hour, and full dinner — each fully customizable.",
    },
    {
      num: "15",
      unit: "",
      label: "MINIMUM GUESTS",
      detail: "Brunch and cocktail packages begin at fifteen guests.",
    },
    {
      num: "48",
      unit: "hr",
      label: "BOOKING RESPONSE",
      detail: "Most inquiries confirmed within forty-eight hours.",
    },
  ],
  menus: {
    eyebrow: "Curated Menus",
    title: "Sample menus, ready to remix",
    description:
      "Use these as starting points — the chef will tailor every menu to your guest count, season, and dietary needs.",
    tabs: [
      {
        id: "brunch",
        label: "Brunch",
        accent: "Made for daytime celebrations",
        items: [
          { name: "Chicken & Waffles", note: "Casa de Flora signature" },
          { name: "Shrimp & Grits", note: "Cajun cream, herbs" },
          { name: "Breakfast Potatoes", note: "Crisp, salted, herbed" },
          { name: "Eggs Any Style", note: "Made-to-order station available" },
          { name: "Turkey Bacon & Sausage", note: "Premium proteins" },
          { name: "Croissants & Pastries", note: "Daily-baked" },
          { name: "Pink Waffles", note: "Strawberry, pistachio cream" },
          { name: "Mocktail Bar", note: "Three signature builds" },
        ],
      },
      {
        id: "cocktail",
        label: "Cocktail Hour",
        accent: "Passed bites + drink stations",
        items: [
          { name: "Truffle Deviled Eggs" },
          { name: "Brie + Honeycomb Crostini" },
          { name: "Mini Lobster Rolls" },
          { name: "Chicken & Waffle Bites", note: "Maple bourbon glaze" },
          { name: "Charcuterie Display", note: "Local cheese, cured meats" },
          { name: "Signature Sip & Clip Cocktail" },
        ],
      },
      {
        id: "plated",
        label: "Plated Dinner",
        accent: "Three-course, chef's selection",
        items: [
          { name: "First — Heirloom Tomato Salad", note: "Burrata, basil oil" },
          {
            name: "Main — Lemon Pepper Chicken",
            note: "Or Rasta Pasta with Salmon",
          },
          { name: "Sides", note: "Macaroni & cheese · collard greens · cornbread" },
          { name: "Dessert — Banana Cream Craffle", note: "Whipped vanilla cream" },
        ],
      },
      {
        id: "family",
        label: "Family Style",
        accent: "Generous platters, shared at the table",
        items: [
          { name: "Whole Roasted Chicken", note: "Citrus, herbs" },
          { name: "Rasta Pasta", note: "Salmon or chicken" },
          { name: "Collard Greens" },
          { name: "Macaroni & Cheese" },
          { name: "Cornbread + Honey Butter" },
          { name: "Seasonal Crudités" },
        ],
      },
    ],
  },

} as const;