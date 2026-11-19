export const gymData = {
  header: {
    brandName: "Ironforge Fitness",
    navLinks: [
      { label: "Facilities", href: "#facilities" },
      { label: "Pricing", href: "#pricing" },
      { label: "AI Assistant", href: "#ai-chat" },
      { label: "Reviews", href: "#reviews" },
      { label: "Trial", href: "#booking" },
    ],
    ctaLabel: "Start Free Trial",
    ctaHref: "#booking",
  },
  hero: {
    eyebrow: "NASHIK'S PREMIER STRENGTH & PERFORMANCE FACILITY",
    headline: "Train with a plan and achieve real strength.",
    subhead:
      "High-performance strength equipment, certified personal trainers, and structured daily classes in Nashik.",
    primaryCta: {
      label: "Start free trial",
      href: "#booking",
    },
    secondaryCta: {
      label: "View membership plans",
      href: "#pricing",
    },
  },
  trustStrip: [
    { value: "1,200+", label: "Active Members" },
    { value: "4.9 ★", label: "Average Rating" },
    { value: "8 Years", label: "In Business" },
    { value: "40+", label: "Local Athlete Brands" },
  ],
  coreOffering: {
    badge: "PRECISION ZONES",
    title: "Engineered for Serious Lifters",
    subhead: "No broken pulleys or crowded benches. Six dedicated training bays built for progress.",
    items: [
      {
        name: "Strength Floor",
        desc: "Olympic platforms, calibrated steel plates, and dumbbells up to 60 kg.",
        price: "₹1,499 / mo",
      },
      {
        name: "Powerlifting Zone",
        desc: "Competition benches, combo racks, deadlift jacks, and chalk stations.",
        price: "₹1,800 / mo",
      },
      {
        name: "Functional Training Bay",
        desc: "40m sled turf, competition kettlebells, gymnastic rings, and monkey rigs.",
        price: "₹1,500 / mo",
      },
      {
        name: "Group HIIT Studio",
        desc: "High-intensity metabolic conditioning with real-time biometric telemetry.",
        price: "₹600 per class",
      },
      {
        name: "Spin Studio",
        desc: "Rhythm indoor cycling with cadence telemetry and immersive audio.",
        price: "₹600 per class",
      },
      {
        name: "Recovery Lab",
        desc: "Infrared dry sauna, cold contrast plunge tub, and pneumatic compression.",
        price: "₹1,200 per session",
      },
    ],
  },
  signatureFeature: {
    badge: "24/7 WHATSAPP CONCIERGE",
    heading: "Manage your membership without talking to front desk",
    description:
      "Our autonomous WhatsApp concierge lets you freeze passes, book trial slots, and check live gym occupancy in seconds.",
    bullets: [
      "Instant pass freezing and workout session booking via WhatsApp Cloud API.",
      "Real-time gym occupancy tracker to avoid peak crowd hours.",
    ],
    messages: [
      {
        sender: "user" as const,
        text: "Hi! Can I freeze my membership for a month? Traveling for work.",
        time: "07:15 AM",
      },
      {
        sender: "bot" as const,
        text: "Namaste Rohit! Active memberships can be frozen for up to 30 days per year with zero fee. I have prepared your freeze request.",
        time: "07:15 AM",
        actionButton: {
          label: "Confirm 30-Day Freeze",
          href: "#booking",
        },
      },
      {
        sender: "user" as const,
        text: "Confirmed! Thank you.",
        time: "07:16 AM",
      },
    ],
  },
  pricingTiers: [
    {
      id: "basic",
      name: "Basic Strength",
      price: "₹1,499",
      period: "/ month",
      popular: false,
      features: [
        "Full access to Strength & Free Weight Floor",
        "Locker & shower facilities included",
        "Ironforge Mobile app access & workout tracker",
        "Free monthly biometric body composition scan",
      ],
      cta: "Choose Basic",
    },
    {
      id: "standard",
      name: "Standard Athlete",
      price: "₹2,499",
      period: "/ month",
      popular: true,
      features: [
        "All Basic Strength features included",
        "Unlimited Group HIIT & Functional Bay access",
        "Custom 4-week progressive overload lift plan",
        "WhatsApp personal trainer check-in every 14 days",
      ],
      cta: "Join as Athlete",
    },
    {
      id: "premium",
      name: "Premium High Performance",
      price: "₹4,999",
      period: "/ month",
      popular: false,
      features: [
        "All Standard Athlete features included",
        "Unlimited Cold Plunge & Infrared Sauna Lab",
        "4 One-on-One personal training sessions monthly",
        "Macro nutrition consultation & meal breakdown",
      ],
      cta: "Go High Performance",
    },
  ],
  testimonials: [
    {
      name: "Rohit S.",
      city: "Nashik",
      rating: 5,
      quote:
        "The trainers actually track my lifts and adjust my program every two weeks. Four months in, I'm up 15 kg on my squat.",
    },
    {
      name: "Aniket M.",
      city: "Pune",
      rating: 5,
      quote:
        "Cleanest powerlifting setup in Maharashtra. Calibrated Eleiko plates and competition racks make a world of difference.",
    },
    {
      name: "Pooja K.",
      city: "Mumbai",
      rating: 5,
      quote:
        "The WhatsApp bot booked my trial session in 30 seconds. The functional HIIT studio is high energy and beginner-friendly.",
    },
  ],
  bookingForm: {
    badge: "NO-COMMITMENT TRIAL",
    heading: "Book Your Free 1-Day Trial Pass",
    subhead: "Experience the gym floor, test our equipment, and consult with a trainer for 45 minutes.",
    submitLabel: "Claim Free Trial Pass",
    fields: [
      { id: "name", label: "Full Name", type: "text" as const, required: true, placeholder: "e.g. Rohit Sharma" },
      { id: "phone", label: "WhatsApp Phone Number", type: "tel" as const, required: true, placeholder: "+91 98765 00000" },
      {
        id: "plan",
        label: "Preferred Membership Plan",
        type: "select" as const,
        required: true,
        options: [
          { label: "Basic Strength — ₹1,499/mo", value: "basic" },
          { label: "Standard Athlete — ₹2,499/mo (Most Popular)", value: "standard" },
          { label: "Premium High Performance — ₹4,999/mo", value: "premium" },
        ],
      },
      {
        id: "trialTime",
        label: "Preferred Trial Time",
        type: "select" as const,
        required: true,
        options: [
          { label: "Morning: 6:00 AM – 8:00 AM", value: "morning_early" },
          { label: "Morning: 8:00 AM – 11:00 AM", value: "morning_late" },
          { label: "Evening: 5:00 PM – 7:30 PM", value: "evening_early" },
          { label: "Night: 7:30 PM – 10:00 PM", value: "evening_late" },
        ],
      },
      {
        id: "goal",
        label: "Primary Fitness Goal",
        type: "select" as const,
        required: true,
        options: [
          { label: "Hypertrophy & Strength Training", value: "strength" },
          { label: "Fat Loss & Metabolic Conditioning", value: "fat_loss" },
          { label: "Athletic Performance & Mobility", value: "athletic" },
        ],
      },
    ],
  },
  footer: {
    address: "Plot 14, Gangapur Road, Near College Corner, Nashik, Maharashtra 422005",
    hours: "Monday – Saturday: 5:30 AM – 10:30 PM | Sunday: 7:00 AM – 2:00 PM",
    phone: "+91 98765 00000",
    email: "hello@ironforgefitness.shreejan.ai",
  },
};

