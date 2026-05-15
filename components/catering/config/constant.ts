// content/catering.ts

export const CATERING_CONTENT = {
  hero: {
    eyebrow: "Catering & Events",
    title: "Food as",
    titleAccent: "Beautiful",
    titleSuffix: "as the Flowers",
    description:
      "From intimate brunches to full wedding receptions — our catering brings the same care and elegance as every bloom we arrange.",
    image: "/venue/grand stage-02.jpg",
    badge: "Serving NJ + NYC",
    primary: { label: "Request a Quote", href: "/#inquiry" },
    secondary: { label: "View Menu", href: "/menu" },
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

  brunch: {
    id: "01",
    eyebrow: "Package 01 — Brunch",
    heading: {
      title: "Morning",
      accent: "Elegance",
    },
    description:
      "A curated brunch experience with seasonal selections — perfect for intimate gatherings and celebratory mornings.",

    package: {
      title: "Casa Brunch Catering",
      minGuests: "min 15 guests",

      sections: [
        {
          label: "CHOOSE 2 — SIGNATURE BRUNCH OPTIONS",
          subtitle: "Signature brunch options",
          items: [
            "Chicken & Waffles",
            "Shrimp & Grits",
            "French Toast",
            "Rasta Pasta",
          ],
        },
        {
          label: "CHOOSE 1 — BREAKFAST PROTEIN",
          subtitle: "Breakfast Meat",
          items: [
            "Turkey Sausage",
            "Beef Sausage",
            "Turkey Bacon",
            "Beef Bacon",
          ],
        },
        {
          label: "INCLUDED WITH ALL PACKAGES",
          subtitle: "Always Included",
          items: ["Scrambled Eggs", "Breakfast Potatoes", "Biscuits"],
        },
      ],

      footerNote:
        "Pair the Brunch package with our Cocktail Hour tier for a full morning experience. Great for baby showers, bridal brunches, and birthday celebrations.",
    },

    stats: [
      {
        num: "200",
        unit: "+",
        label: "EVENTS CATERED",
        detail:
          "From bridal brunches to wedding receptions, across NJ and beyond.",
      },
      {
        num: "3",
        unit: "",
        label: "SIGNATURE PACKAGES",
        detail:
          "Brunch, cocktail hour, and full dinner — each fully customizable.",
      },
      {
        num: "15",
        unit: "",
        label: "MINIMUM GUESTS",
        detail:
          "Brunch and cocktail packages begin at fifteen guests.",
      },
      {
        num: "48",
        unit: "hr",
        label: "BOOKING RESPONSE",
        detail:
          "Most inquiries confirmed within forty-eight hours.",
      },
    ],
  },
  cocktails: {
    id: "02",

    header: {
      eyebrow: "Package 02 — Cocktail Hour",

      heading: {
        title: "Bites Worth",
        accent: "Savoring",
      },

      description:
        "Handcrafted finger food, tiered to any guest count — served with elegance on beautiful platters.",
    },

    package: {
      title: "Casa Cocktail Hour & Finger Food",
      badge: "Most Popular",

      minGuests:
        "Minimum 20 guests · Choose your tier below",

      priceRange: "$28–$42",
      priceLabel: "per person",

      tiers: [
        {
          label: "CHOOSE ANY 4 ITEMS —",
          price: "$28/PERSON",
          subtitle: "Classic",
          items: [
            "Deviled Eggs Honey",
            "Barbecue Meatballs Mini",
            "Cup Pasta Salad Mini",
            "Cup Rasta Pasta Lemon",
            "Pepper Chicken Bites",
            "Mac & Cheese Balls",
            "Caesar Salad Cups",
          ],
        },

        {
          label: "CHOOSE ANY 6 ITEMS —",
          price: "$36/PERSON",
          subtitle: "Signature",
          items: [
            "All Classic options, plus:",
            "Shrimp & Grits Cups",
            "Burger Bites w/ toppings",
            "Hawaiian Shrimp Skewers",
            "Teriyaki Chicken Skewer",
          ],
        },

        {
          label: "CHOOSE ANY 8 ITEMS —",
          price: "$42/PERSON",
          subtitle: "Premium",
          items: [
            "All Signature options, plus:",
            "Smoked Salmon Cucumber Bites",
            "Custom seasonal option",
            "Dessert bites (from Kakes by Kesh)",
          ],
        },
      ],

      serviceInfo:
        "Each item: ~4–5 pieces per person · Service time: 1.5–2 hours · Beautiful platters with labels included",

      metaDetails: [
        {
          label: "MINIMUM",
          value: "20 guests to book",
        },

        {
          label: "BEST FOR",
          value: "Cocktail hours, showers, mixers",
        },

        {
          label: "COMBINE",
          value: "Pair with dinner for full events",
        },

        {
          label: "DELIVERY",
          value: "Available +$75–$150 by distance",
        },
      ],

      footerNote:
        "Pair the Brunch package with our Cocktail Hour tier for a full morning experience. Great for baby showers, bridal brunches, and birthday celebrations.",
    },
  },
    dinner: {
    id: "03",
    header: {
      eyebrow: "Package 03 — Dinner",
      heading: {
        title: "An Evening",
        accent: "Worth Remembering",
      },
      description:
        "Full-service dinner buffet for celebrations that demand something truly special.",
    },

    package: {
      title: "Casa Dinner Catering",
      minGuests: "Minimum 20 guests · Full buffet style",


      sections: [
        {
          label: "CHOOSE 2 — MAIN ENTREES",
          subtitle: "Proteins",
          items: [
            "Curry Chicken Turkey",
            "Wings (braised) Barbecue",
            "Chicken Fried Fish",
            "Whiting Rasta Pasta",
            "Meatballs (beef or turkey)",
          ],
        },
        {
          label: "CHOOSE 3 — SIDES",
          subtitle: "Side Dishes",
          items: [
            "Mac and Cheese",
            "Mashed Potatoes",
            "Cabbage",
            "Yellow Rice",
            "Collard Greens",
            "Candied Yams",
          ],
        },
        {
          label: "INCLUDED WITH ALL DINNER PACKAGES",
          subtitle: "Always Included",
          items: [
            "Caesar Salad or Spring Salad",
            "Dinner rolls / bread",
            "Serving ware & chafing dishes",
            "Plates, napkins & utensils",
          ],
        },
      ],

      addonText:
        "Optional add-ons: Dessert station · Linen & décor upgrades available",

      metaDetails: [
        { label: "MINIMUM", value: "20 guests to book" },
        { label: "STYLE", value: "Buffet setup included" },
        { label: "PRICE", value: "$48/person + delivery" },
        { label: "DEPOSIT", value: "50% at booking" },
      ],
    },
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
          {
            name: "Chicken & Waffle Bites",
            note: "Maple bourbon glaze",
          },
          {
            name: "Charcuterie Display",
            note: "Local cheese, cured meats",
          },
          { name: "Signature Sip & Clip Cocktail" },
        ],
      },
      {
        id: "plated",
        label: "Plated Dinner",
        accent: "Three-course, chef's selection",
        items: [
          {
            name: "First — Heirloom Tomato Salad",
            note: "Burrata, basil oil",
          },
          {
            name: "Main — Lemon Pepper Chicken",
            note: "Or Rasta Pasta with Salmon",
          },
          {
            name: "Sides",
            note: "Macaroni & cheese · collard greens · cornbread",
          },
          {
            name: "Dessert — Banana Cream Craffle",
            note: "Whipped vanilla cream",
          },
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