export const CATERING_CONTENT = {
  hero: {
    eyebrow: "Casa de Flora · Catering",
    title: "Catering that arrives",
    titleAccent: "with flowers.",
    description:
      "On-site or off-site, intimate or full-scale — Casa de Flora caters celebrations with the same warm, floral-led hospitality our cafe is known for in Bloomfield, NJ.",
    image: "/menu/Chicken & waffles.jpg",
    badge: "Serving NJ + NYC",
    primary: { label: "Request a Quote", href: "#inquiry" },
    secondary: { label: "Browse Menus", href: "#menus" },
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
  services: {
    eyebrow: "Service Tiers",
    title: "Pick your level of service",
    description:
      "Four ways to bring Casa de Flora to your event. Everything is customizable — these are starting points, not boxes.",
    items: [
      {
        id: "drop-off",
        icon: "package",
        title: "Drop-Off",
        startsAt: "From $18 / person",
        description:
          "We arrive, set up the spread, and leave you to host. Perfect for office lunches, baby showers and intimate gatherings.",
        includes: [
          "Disposable elegant servingware",
          "Setup + breakdown",
          "Detailed labeling & dietary cards",
        ],
      },
      {
        id: "buffet",
        icon: "utensils",
        title: "Buffet",
        startsAt: "From $35 / person",
        description:
          "Family-style buffet with a uniformed attendant who keeps trays full and stations beautiful for the entire event.",
        includes: [
          "Chafing dishes & linens",
          "On-site attendant (3 hr)",
          "Coffee + non-alcoholic bar",
        ],
      },
      {
        id: "plated",
        icon: "chef-hat",
        title: "Plated Dinner",
        startsAt: "From $75 / person",
        description:
          "Full-service plated dinners with a dedicated kitchen team and waitstaff. The choice for weddings and milestone birthdays.",
        includes: [
          "3-course chef-curated menu",
          "Waitstaff (1 per 12 guests)",
          "Tabletop styling consult",
        ],
      },
      {
        id: "bar",
        icon: "wine",
        title: "Mobile Bar",
        startsAt: "From $22 / person",
        description:
          "Signature cocktails, mocktails, espresso bar — set up wherever you are. Add to any service tier.",
        includes: [
          "Bartender + barista",
          "Glassware & garnish program",
          "Custom signature drink menu",
        ],
      },
    ],
  },
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
  process: {
    eyebrow: "How it works",
    title: "From inquiry to event day",
    steps: [
      {
        id: 1,
        time: "Day 0",
        title: "Tell us about your event",
        description:
          "Share the date, headcount and the vibe you're going for. The more we know, the better the proposal.",
      },
      {
        id: 2,
        time: "Within 48h",
        title: "Tailored quote + menu",
        description:
          "We send a written proposal with menu options, service tier and a transparent line-item quote.",
      },
      {
        id: 3,
        time: "2 weeks before",
        title: "Final headcount + tasting",
        description:
          "Lock in headcount, dietary notes, and (for plated events) come in for a tasting on us.",
      },
      {
        id: 4,
        time: "Event day",
        title: "We arrive ready",
        description:
          "Setup, service and breakdown — handled. You stay with your guests; we make it look effortless.",
      },
    ],
  },
  trust: {
    items: [
      { value: "150+", label: "Events catered" },
      { value: "5★", label: "Average review" },
      { value: "20–500", label: "Guests per event" },
      { value: "Bloomfield, NJ", label: "+ NYC metro area" },
    ],
  },
  inquiry: {
    eyebrow: "Start a conversation",
    title: "Tell us about your event",
    description:
      "Share the basics and the team will reach out within 48 hours with a tailored proposal.",
    eventTypes: [
      "Wedding",
      "Birthday",
      "Bridal / Baby Shower",
      "Corporate",
      "Brunch",
      "Other",
    ],
    serviceTypes: ["Drop-Off", "Buffet", "Plated Dinner", "Mobile Bar", "Not sure yet"],
    headcountBuckets: ["Under 25", "25–50", "50–100", "100–250", "250+"],
    submitLabel: "Send Inquiry",
    successHeading: "Inquiry received.",
    successBody:
      "Thanks for reaching out. The events team will follow up within 48 hours with a tailored proposal.",
  },
  closing: {
    eyebrow: "Ready when you are",
    title: "Let's make it",
    titleAccent: "unforgettable.",
    description:
      "Book a 20-minute call with the events team to walk through your day from start to finish.",
    primary: { label: "Request a Quote", href: "#inquiry" },
    secondary: { label: "Email Events", href: "mailto:events@casadeflorabar.com" },
  },
} as const;
