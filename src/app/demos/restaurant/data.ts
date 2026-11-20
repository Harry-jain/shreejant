export const restaurantData = {
  header: {
    brandName: "The Bombay Bistro",
    navLinks: [
      { label: "Menu", href: "#menu" },
      { label: "WhatsApp Bot", href: "#ai-chat" },
      { label: "Reservations", href: "#reservation" },
      { label: "Location & Hours", href: "#footer" },
    ],
    ctaLabel: "Reserve a Table",
    ctaHref: "#reservation",
  },
  hero: {
    eyebrow: "AUTHENTIC COASTAL & BOMBAY KITCHEN · ESTD 2016",
    marathiTagline: "पारंपरिक चव आणि अस्सल बॉम्बे फ्लेवर्स",
    headline: "Bombay flavours, slow-cooked since 2016.",
    subhead:
      "Coastal and Mumbai street classics, served in a warm, unhurried room in Nashik with authentic hand-pounded masalas.",
    primaryCta: {
      label: "Reserve a table",
      href: "#reservation",
    },
    secondaryCta: {
      label: "View menu",
      href: "#menu",
    },
  },
  trustStrip: [
    { value: "Fresh", label: "Coastal Catch Sourced Daily" },
    { value: "0%", label: "Artificial Flavours or Preservatives" },
    { value: "Pure", label: "Slow-Cooked Hand-Pounded Masalas" },
    { value: "Dedicated", label: "Separate Jain Kitchen Prep" },
  ],
  menu: {
    badge: "DAILY SPECIALTIES",
    title: "Handcrafted Heritage Menu",
    subhead:
      "Marathi and Hindi names shown in brackets where they differ. Fresh coastal seafood arrives daily from Ratnagiri.",
    tabs: [
      {
        id: "starters",
        label: "Starters & Chaat",
        items: [
          { name: "Bhel Puri (भेळपुरी)", desc: "Puffed rice, tangy tamarind chutney, raw mango, and fresh sev.", price: "₹180", veg: true },
          { name: "Sev Puri Mumbai Style (शेवपुरी)", desc: "Crisp puris loaded with diced potato, garlic chili chutney, and fine sev.", price: "₹210", veg: true },
          { name: "Malvani Prawn Fry (मालवणी कोळंबी फ्राय)", desc: "Tiger prawns tossed in coarse red chili, ginger-garlic, and crisp semolina crust.", price: "₹420", veg: false },
          { name: "Koliwada Fish Tikka (कोळीवाडा फिश)", desc: "Crispy fried Surmai cubes spiced with carom seeds and degi mirch.", price: "₹440", veg: false },
          { name: "Dahi Ke Kebab (दही कबाब)", desc: "Hung curd, roasted gram flour, and green cardamom patties with mint chutney.", price: "₹290", veg: true },
          { name: "Chicken Sukka Bites (सुक्का चिकन)", desc: "Tender chicken morsels roasted with fresh scraped coconut and byadgi chilies.", price: "₹380", veg: false },
        ],
      },
      {
        id: "mains",
        label: "Mains & Curries",
        items: [
          { name: "Paneer Kolhapuri (पनीर कोल्हापुरी)", desc: "Fresh cottage cheese simmered in fiery red Kolhapuri lavangi masala.", price: "₹340", veg: true },
          { name: "Mutton Sukka (मटण सुक्का)", desc: "Slow-braised goat meat cooked dry with toasted whole spices and onion.", price: "₹460", veg: false },
          { name: "Bombil Fry Thali (बोंबील फ्राय थाळी)", desc: "Crisp Bombay duck, sol kadhi, amboli, and authentic coastal fish rassa.", price: "₹480", veg: false },
          { name: "Dal Makhani Slow-Simmered (दाल मखनी)", desc: "Black lentils slow-cooked overnight on charcoal with butter and cream.", price: "₹290", veg: true },
          { name: "Prawns Curry (मालवणी प्रॉन्स करी)", desc: "Fresh prawns simmered in coconut milk, tirphal, and dried kokum extract.", price: "₹520", veg: false },
          { name: "Veg Maratha Handi (व्हेज मराठा)", desc: "Mix vegetable koftas in a rich, spiced brown sesame and poppy gravy.", price: "₹330", veg: true },
        ],
      },
      {
        id: "desserts",
        label: "Desserts & Meetha",
        items: [
          { name: "Shrikhand Cheesecake (श्रीखंड चीजकेक)", desc: "Kesar pista hung curd blended over a digestive biscuit crust.", price: "₹260", veg: true },
          { name: "Matka Kulfi with Pistachio (मटका कुल्फी)", desc: "Dense slow-boiled milk kulfi infused with green cardamom and saffron.", price: "₹190", veg: true },
          { name: "Warm Gulab Jamun with Rabdi (गुलाबजाम)", desc: "Mawa dumplings drenched in cardamom syrup served with laccha rabdi.", price: "₹220", veg: true },
          { name: "Mango Malai Phirni (आंबा फिरणी)", desc: "Ground Basmati rice pudding infused with Ratnagiri Alphonso pulp.", price: "₹240", veg: true },
        ],
      },
    ],
  },
  signatureFeature: {
    badge: "WHATSAPP TABLE CONCIERGE",
    heading: "Ask about dietary preferences, wait times, or Jain options",
    description:
      "Our AI maitre d' knows the ingredient list for every recipe. Ask about allergens, Jain preparations, or secure an instant table confirmation.",
    bullets: [
      "Catalog-aware AI chatbot recognizes Jain, vegan, and nut-allergy requests instantly.",
      "Automated reservation sync with zero double-booking or waiting outside.",
    ],
    messages: [
      {
        sender: "user" as const,
        text: "Namaste! We are coming with elderly parents. Is there any Jain food options available tonight?",
        time: "06:14 PM",
      },
      {
        sender: "bot" as const,
        text: "Namaste! Yes, we have dedicated Jain preparations prepared without onion, garlic, or root vegetables: Jain Paneer Makhmali (₹340), Dal Tadka (₹260), and Jain Sev Tomato (₹280). Shall I reserve a quiet booth for 4 guests at 8:00 PM?",
        time: "06:14 PM",
        actionButton: {
          label: "Reserve Quiet Booth at 8:00 PM",
          href: "#reservation",
        },
      },
      {
        sender: "user" as const,
        text: "Yes please, 4 guests at 8:00 PM under Priya.",
        time: "06:15 PM",
      },
      {
        sender: "bot" as const,
        text: "Table confirmed! Your booking ID is #BB-8492. We look forward to hosting you and your parents tonight.",
        time: "06:15 PM",
      },
    ],
  },
  reservationForm: {
    badge: "INSTANT TABLE RESERVATION",
    heading: "Book Your Table in Under a Minute",
    subhead: "Reserve for lunch or dinner. We hold tables for 15 minutes past reservation time.",
    submitLabel: "Confirm Reservation",
    fields: [
      { id: "name", label: "Full Name", type: "text" as const, required: true, placeholder: "e.g. Priya Mukherjee" },
      { id: "phone", label: "WhatsApp Phone Number", type: "tel" as const, required: true, placeholder: "+91 98765 00000" },
      { id: "date", label: "Reservation Date", type: "date" as const, required: true },
      {
        id: "time",
        label: "Seating Time Slot",
        type: "select" as const,
        required: true,
        options: [
          { label: "12:30 PM (Lunch)", value: "12:30" },
          { label: "01:30 PM (Lunch)", value: "13:30" },
          { label: "02:30 PM (Lunch)", value: "14:30" },
          { label: "07:30 PM (Dinner)", value: "19:30" },
          { label: "08:30 PM (Dinner - Peak)", value: "20:30" },
          { label: "09:30 PM (Dinner)", value: "21:30" },
          { label: "10:30 PM (Late Dinner)", value: "22:30" },
        ],
      },
      {
        id: "guests",
        label: "Number of Guests",
        type: "select" as const,
        required: true,
        options: [
          { label: "2 Guests (Table for Two)", value: "2" },
          { label: "4 Guests (Family Booth)", value: "4" },
          { label: "6 Guests (Group Table)", value: "6" },
          { label: "8+ Guests (Private Dining)", value: "8+" },
        ],
      },
      {
        id: "occasion",
        label: "Special Occasion (Optional)",
        type: "select" as const,
        options: [
          { label: "Birthday Celebration", value: "birthday" },
          { label: "Wedding Anniversary", value: "anniversary" },
          { label: "Business Dinner", value: "business" },
          { label: "Casual Gathering", value: "casual" },
        ],
      },
      {
        id: "specialRequests",
        label: "Special Dietary Requests",
        type: "textarea" as const,
        placeholder: "e.g. Jain preparation, quiet booth, high chair needed...",
      },
    ],
  },
  footer: {
    address: "42 Heritage Boulevard, Off College Road, Nashik, Maharashtra 422005",
    hours: "Lunch: 12:00 PM – 3:30 PM | Dinner: 7:00 PM – 11:30 PM (Tuesday – Sunday)",
    phone: "+91 98765 00000",
    email: "hello@bombaybistro.shreejan.ai",
  },
};
