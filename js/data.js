/* =========================================================
   data.js — EDIT ONLY THIS FILE TO PERSONALISE THE INVITATION
   All names, dates, venues, contacts and photos live here.
   ========================================================= */

window.WEDDING = {

  /* ---------- Basic ---------- */
  brand: "Vijay & Rashmika",
  pageTitle: "శుభ కళ్యాణం",
  tagline: "Sri Vasavi Kalyana Vaibhavam",
  groom: "Vijay",
  bride: "Rashmika",

  /* ---------- Wedding date ---------- */
  // ISO with IST offset (+05:30)
  datetime: "2027-02-07T10:15:00+05:30",
  dateLabel: "7 February 2027",
  dayLabel: "Sunday",
  muhurtham: "Muhurtham 10:15 AM",

  /* ---------- Invitation gate ---------- */
  gate: {
    title: "Swagatam",
    telugu: "స్వాగతం • శుభ కళ్యాణం",
    greeting:
      "With Lord Ganesh blessings, step into the sacred wedding of Vijay Deverakonda & Rashmika Mandanna.",
    button: "Enter Invitation",
    image: "images/hero-bg.jpg"
  },

  /* ---------- Blessings that fly to the top bar ---------- */
  blessings: ["|| శ్రీ రస్తు ||", "|| శుభమస్తు ||", "|| అవిఘ్నమస్తు ||"],

  /* ---------- Hero ---------- */
  hero: {
    image: "images/hero-bg.jpg",
    rotatingIcons: ["ॐ", "✧", "❀", "♫", "❋"]
  },

  /* ---------- Couple ---------- */
  people: [
    {
      side: "Groom",
      badge: "Groom",
      name: "Vijay Deverakonda",
      telugu: "విజయ్ దేవరకొండ",
      relation: "Son of",
      father: "Govardhan Rao",
      mother: "Smt. Madhavi",
      family: "Deverakonda Family • Hyderabad",
      photo: "images/groom.jpg",
      initials: "VD"
    },
    {
      side: "Bride",
      badge: "Bride",
      name: "Rashmika Mandanna",
      telugu: "రష్మిక మందన్న",
      relation: "Daughter of",
      father: "Madan Mandanna",
      mother: "Smt. Suman Mandanna",
      family: "Mandanna Family • Hyderabad",
      photo: "images/bride.jpg",
      initials: "RM"
    }
  ],

  /* ---------- Celebrations ---------- */
  celebrations: [
    {
      title: "Wedding Ceremony",
      date: "7 February 2027",
      day: "Sunday",
      time: "Muhurtham 10:15 AM",
      icon: "ॐ",
      highlight: true,
      description:
        "Sacred Telugu rites — Jeelakarra Bellam, Thaali, Saptapadi, Talambralu & blessings."
    },
    {
      title: "Reception",
      date: "7 February 2027",
      day: "Sunday",
      time: "06:30 PM onwards",
      icon: "✧",
      highlight: false,
      description:
        "Dinner, music & heartfelt wishes with family and friends. Come celebrate the newlyweds."
    }
  ],

  /* ---------- Day flow ---------- */
  timelines: [
    {
      title: "Wedding Day Flow",
      items: [
        { time: "8:15 AM", title: "Kasi Yatra", text: "Groom's playful yatra & welcome with melam." },
        { time: "9:15 AM", title: "Kanyadanam", text: "Madhuparkam & sacred handing of the bride." },
        { time: "10:15 AM", title: "Shubha Muhurtham", text: "Jeelakarra Bellam • Thaali • Saptapadi • Talambralu.", highlight: true },
        { time: "1:00 PM", title: "Vindu Bhojanam", text: "Traditional feast served on vistaraku." }
      ]
    },
    {
      title: "Reception Flow",
      items: [
        { time: "6:30 PM", title: "You arrive", text: "Walk in, say hello — we're so glad you're here." },
        { time: "7:00 PM", title: "Meet the couple", text: "Hugs, photos & good wishes.", highlight: true },
        { time: "8:00 PM", title: "Dinner & chat", text: "Good food, music & easy conversation." },
        { time: "9:30 PM", title: "Thank you", text: "Gratitude & farewell with love." }
      ]
    }
  ],

  /* ---------- Venues ---------- */
  venues: [
    {
      tag: "Wedding Venue",
      name: "Sri Vasavi Kanyaka Parameswari Kalyana Mandapam",
      address: "Vasavi Nagar, Kothapet, Hyderabad, Telangana 500035",
      image: "venue.jpg",
      icon: "",
      mapsUrl: "https://maps.google.com/?q=Vasavi+Kalyana+Mandapam+Kothapet+Hyderabad",
      mapEmbed: "https://www.google.com/maps?q=Vasavi+Kalyana+Mandapam+Kothapet+Hyderabad&output=embed",
      facts: [
        { icon: "bi-signpost-split", text: "Easily reachable from Dilsukhnagar & LB Nagar." },
        { icon: "bi-p-circle", text: "Ample parking inside the mandapam premises." },
        { icon: "bi-airplane", text: "Rajiv Gandhi International Airport approx. 45 minutes." }
      ]
    },
    {
      tag: "Reception Venue",
      name: "Grand Reception Hall — Same Mandapam",
      address: "Vasavi Nagar, Kothapet, Hyderabad • 6:30 PM onwards",
      image: "venue2.jpg",
      icon: "✧",
      mapsUrl: "https://maps.google.com/?q=Kothapet+Hyderabad",
      mapEmbed: "https://www.google.com/maps?q=Kothapet+Hyderabad&output=embed",
      facts: [
        { icon: "bi-signpost-split", text: "Beside the main road for easy access." },
        { icon: "bi-p-circle", text: "Parking available for reception guests." },
        { icon: "bi-car-front", text: "Autos and cabs available all night." }
      ]
    }
  ],

  /* ---------- Gallery ---------- */
  gallery: [
    { image: "images/gallery1.jpg", caption: "Muhurtham", icon: "ॐ" },
    { image: "images/gallery2.jpg", caption: "Talambralu", icon: "✧" },
    { image: "images/gallery3.jpg", caption: "Jeelakarra Bellam", icon: "❀" },
    { image: "images/gallery4.jpg", caption: "Thaali", icon: "❋" },
    { image: "images/gallery5.jpg", caption: "Reception", icon: "♫" }
  ],

  /* ---------- Family invitation ---------- */
  families: [
    {
      side: "Groom's Parents",
      names: "Govardhan Rao & Smt. Madhavi",
      family: "Deverakonda Family • Hyderabad",
      message: "We invite you to join us in celebrating this joyous occasion.",
      image: "family-groom.jpg",
      initials: "G"
    },
    {
      side: "Bride's Parents",
      names: "Madan Mandanna & Smt. Suman Mandanna",
      family: "Mandanna Family • Hyderabad",
      message: "We look forward to sharing this special day with you.",
      image: "family-bride.jpg",
      initials: "U"
    }
  ],

  gratitude: [
    "Your presence at the muhurtham and reception will fill these sacred moments with love.",
    "We seek your blessings as we begin life together."
  ],

  /* ---------- Contacts ---------- */
  contacts: [
    {
      label: "Groom Side",
      name: "Deverakonda Family",
      place: "Hyderabad",
      phone: "+91 98482 23112",
      tel: "+919848223112",
      whatsapp: "919848223112"
    },
    {
      label: "Bride Side",
      name: "Mandanna Family",
      place: "Hyderabad",
      phone: "+91 99635 94960",
      tel: "+919963594960",
      whatsapp: "919963594960"
    }
  ],

  waMessage: "Subhakankshalu! Vijay & Rashmika pelli gurinchi.",
  footerNote: "Crafted with love • 07.02.2027 • Hyderabad",
  hashtag: "#VijayWedsRashmika"
};