export const SUMMER_EVENTS_CONTENT = {
  hero: {
    badge: "BLOOM & BUILD",
    duration: "25 Days | 5 Weeks | July 6 – August 7, 2026",
    titleMain: "Girls' Edition —",
    titleSub: "Summer Enrichment Program",
    description: "A creative and empowering experience where guests explored flowers, creativity, and connection in a beautifully curated setting.",
    stats: [
      { label: "20+ Guests", icon: "users" },
      { label: "Floral Workshop + Dining", icon: "star" },
      { label: "Bloomfield, NJ", icon: "map-pin" }
    ],
    buttons: {
      primary: "Reserve Your Spot",
      secondary: "Learn More"
    },
    image: "/summer events/image-01.jpg"
  },
  about: {
    title: "About this",
    titleHighlight: "experience",
    description: "A creative and empowering experience where guests explored flowers, creativity, and connection in a beautifully curated setting.",
    whatsIncluded: {
      title: "What's included",
      items: [
        { title: "Fresh flowers & materials", desc: "Seasonal blooms, wrapping & ribbon" },
        { title: "Guided bouquet session", desc: "Step-by-step guidance from our floral team" },
        { title: "Dinner & drinks", desc: "Curated menu with signature drinks and mocktails" },
        { title: "Styled décor & photo moments", desc: "Elegant setups with Instagram-worthy corners" },
        { title: "Music & ambiance", desc: "Soft curated music and a warm, inviting atmosphere" }
      ]
    }
  },
  pricing: {
    price: "$150",
    unit: "Per Person",
    subtext: "Evening Enrichment",
    booking: {
      calendarLabel: "Select Date",
      timeLabel: "Select Time",
      guestLabel: "Number of Guests",
      times: ["5:00 PM", "6:00 PM", "7:00 PM"],
      summary: {
        priceLabel: "$150 x 1 Guest",
        priceValue: "$150",
        serviceFeeLabel: "Service fee",
        serviceFeeValue: "$0",
        totalLabel: "Total",
        totalValue: "$150"
      },
      buttonText: "Book this experience"
    }
  },
  flow: {
    title: "How the evening flows",
    img: "/summer events/image-02.jpg",
    polaroids: [
      "/summer events/image-02.jpg",
      "/summer events/image-03.jpg",
      "/summer events/image-04.jpg",
      "/summer events/image-05.jpg",
    ],
    closing:
      "Times are a guide, not a clock — the evening flows naturally and we'll never rush you out the door.",
    steps: [
      {
        id: 1,
        time: "5:30 PM",
        duration: "60 min",
        icon: "wine",
        title: "Arrival & Welcome",
        description:
          "Walk into a room set with fresh blooms. A welcome drink, light bites and a personal hello from the team.",
      },
      {
        id: 2,
        time: "6:30 PM",
        duration: "60 min",
        icon: "flower",
        title: "Floral Workshop",
        description:
          "Design your own bouquet under the guidance of our floral team — every stem is yours to shape.",
      },
      {
        id: 3,
        time: "7:30 PM",
        duration: "90 min",
        icon: "plate",
        title: "Dinner Experience",
        description:
          "Sit down to a chef-curated meal with seasonal sides, signature mocktails and good conversation.",
      },
      {
        id: 4,
        time: "9:00 PM",
        duration: "Until close",
        icon: "camera",
        title: "Celebrate & Capture",
        description:
          "Take home your bouquet, the photos from the styled corners and the kind of evening you'll talk about for weeks.",
      },
    ],
  },
  sessions: [
    { date: "Jul 06", day: "Monday", spots: 4, capacity: 20, isoDate: "2026-07-06" },
    { date: "Jul 13", day: "Monday", spots: 8, capacity: 20, isoDate: "2026-07-13" },
    { date: "Jul 20", day: "Monday", spots: 12, capacity: 20, isoDate: "2026-07-20" },
    { date: "Jul 27", day: "Monday", spots: 6, capacity: 20, isoDate: "2026-07-27" },
    { date: "Aug 03", day: "Monday", spots: 10, capacity: 20, isoDate: "2026-08-03" },
  ],
  faq: {
    title: "Everything You",
    titleHighlight: "Need to Know",
    description: "Everything you need to know about our Summer Enrichment Program. If you have any further questions, don't hesitate to reach out.",
    questions: [
      {
        q: "What's the refund policy?",
        a: "We offer a full refund if canceled 48 hours before the event start time."
      },
      { q: "What should I wear to the workshop?", a: "" },
      { q: "Can I take my floral arrangements home?", a: "" },
      { q: "Do you accommodate dietary restrictions?", a: "" },
      { q: "What is the age limit for this event?", a: "" },
      { q: "Is parking available?", a: "" }
    ]
  },
  gallery: {
    column1: [
      { src: "/summer events/image-01.jpg", alt: "Guest with bouquet", aspect: "aspect-[4/3]" },
      { src: "/summer events/image-02.jpg", alt: "Floral ambiance", aspect: "aspect-[16/9]" },
      { src: "/summer events/image-03.jpg", alt: "Dinner setup", aspect: "aspect-[4/3]" },
      { src: "/summer events/image-04.jpg", alt: "Event decor", aspect: "aspect-[16/9]" },
    ],
    column2: [
      { src: "/summer events/image-02.jpg", alt: "Inside the venue", aspect: "aspect-[16/9]" },
      { src: "/summer events/image-05.jpg", alt: "Guest dining", aspect: "aspect-[4/3]" },
      { src: "/summer events/image-03.jpg", alt: "Tablescape", aspect: "aspect-[4/3]" },
      { src: "/summer events/image-01.jpg", alt: "Bouquet workshop", aspect: "aspect-[4/3]" },
      { src: "/summer events/image-04.jpg", alt: "Photo moment", aspect: "aspect-[16/9]" },
      { src: "/summer events/image-05.jpg", alt: "Elegant tablescape", aspect: "aspect-[4/3]" },
    ],
    column3: [
      { src: "/summer events/image-03.jpg", alt: "Overhead view", aspect: "aspect-[4/3]" },
      { src: "/summer events/image-02.jpg", alt: "Friends laughing", aspect: "aspect-[16/9]" },
      { src: "/summer events/image-01.jpg", alt: "Take-home gift", aspect: "aspect-[4/3]" },
      { src: "/summer events/image-04.jpg", alt: "Event highlights", aspect: "aspect-[16/9]" },
    ]
  },
  footer: {
    contactEmail: "events@casadeflorabar.com",
    address: "75 WASHINGTON STREET BLOOMFIELD, NJ 07003",
    copyright: "© Casa De Flora Bar. All rights reserved. Catalog layout & photography: @thefloralbar"
  }
};