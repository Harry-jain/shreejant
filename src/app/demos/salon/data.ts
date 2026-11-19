export const salonData = {
  header: {
    brandName: "Aura Studio",
    navLinks: [
      { label: "Treatments", href: "#treatments" },
      { label: "Bridal Suite", href: "#bridal" },
      { label: "WhatsApp Concierge", href: "#bridal-ai" },
      { label: "Book Appointment", href: "#booking" },
    ],
    ctaLabel: "Reserve Slot",
    ctaHref: "#booking",
  },
  hero: {
    eyebrow: "AURA STUDIO · LUXURY HAIR, SKIN & BRIDAL SANCTUARY",
    marathiTagline: "सौंदर्य, आपल्या पद्धतीने",
    headline: "Unapologetic luxury for hair, skin & bridal couture.",
    subhead:
      "A calm, private sanctuary where bespoke bridal styling, restorative hair therapies, and dermatological facials are performed unhurriedly.",
    primaryCta: {
      label: "Book appointment",
      href: "#booking",
    },
    secondaryCta: {
      label: "View bridal lookbook",
      href: "#treatments",
    },
  },
  trustStrip: [
    { value: "450+", label: "Brides Styled" },
    { value: "4.9 ★", label: "Google & WedMeGood" },
    { value: "100%", label: "Cruelty-Free Actives" },
    { value: "1-on-1", label: "Private Suite Privacy" },
  ],
  treatments: [
    {
      id: "bridal",
      title: "Bridal Couture Hair & Makeup",
      duration: "4 hours",
      price: "₹18,000 onwards",
      badge: "Signature",
      desc: "Complete bridal transformation featuring high-definition airbrush makeup, artisanal floral hair sculpting, and jewelry draping.",
    },
    {
      id: "keratin",
      title: "Keratin & Botanical Smoothing",
      duration: "2.5 hours",
      price: "₹6,500",
      badge: "Most Popular",
      desc: "Formaldehyde-free organic smoothing treatment infused with argan and moringa oils for frizz-free, glass-like shine.",
    },
    {
      id: "facial",
      title: "Radiance Illuminating Facial",
      duration: "75 minutes",
      price: "₹3,200",
      badge: "Glow Ritual",
      desc: "Multi-step dermatological brightening facial with gentle ultrasonic exfoliation, peptide infusion, and cryogenic globes.",
    },
    {
      id: "haircut",
      title: "Precision Texture Cut & Blowout",
      duration: "60 minutes",
      price: "₹1,400",
      badge: "Styling",
      desc: "Face-framing dry-cut tailored to your bone structure, followed by an indulgent scalp massage and polished bouncy blowout.",
    },
    {
      id: "hairspa",
      title: "Organic Hair Spa Wash",
      duration: "45 minutes",
      price: "₹900",
      badge: "Express Care",
      desc: "Clarifying scalp scrub, deeply nourishing keratin mask, steam infusion, and a 15-minute tension-relief shoulder massage.",
    },
    {
      id: "skinprep",
      title: "Bridal Skin Prep Package",
      duration: "3 sessions (over 6 weeks)",
      price: "₹12,000",
      badge: "Bridal Series",
      desc: "Comprehensive pre-wedding skin rehabilitation including micro-exfoliation, lymphatic drainage, and intense collagen hydration.",
    },
  ],
  signatureFeature: {
    badge: "BRIDAL TRIAL CONCIERGE",
    heading: "Consult Our Bridal Stylist on WhatsApp",
    description:
      "Schedule bespoke bridal trials, send your lehenga moodboard, and discuss custom timelines with our lead master artist.",
    bullets: [
      "Send bridal attire references directly to our lead stylist for personalized color palettes.",
      "Reserve weekend trial sessions with an instant refundable date-lock deposit.",
    ],
    messages: [
      {
        sender: "user" as const,
        text: "Namaste! I am getting married on Dec 14 in Pune. Can you do a trial for my wedding look next weekend?",
        time: "03:22 PM",
      },
      {
        sender: "bot" as const,
        text: "Namaste and congratulations! We would love to design your bridal look. Lead Artist Meera has 2 trial slots open next Saturday (Nov 28): 11:00 AM or 3:30 PM. Each trial includes both hair sculpting and makeup swatch.",
        time: "03:23 PM",
        actionButton: {
          label: "Lock Saturday 11:00 AM Trial (₹2,000 Deposit)",
          href: "#booking",
        },
      },
      {
        sender: "user" as const,
        text: "Saturday 11:00 AM works perfectly! Will pay the deposit online now.",
        time: "03:24 PM",
      },
      {
        sender: "bot" as const,
        text: "Wonderful! We've held the private suite for you. Please bring your jewelry or dupatta photos for styling.",
        time: "03:24 PM",
      },
    ],
  },
  testimonials: [
    {
      name: "Neha K.",
      city: "Pune",
      rating: 5,
      quote:
        "My bridal trial was calm, unhurried, and the final look photographed beautifully. Two weeks later I did the full day with the same team.",
    },
    {
      name: "Shruti P.",
      city: "Nashik",
      rating: 5,
      quote:
        "The Keratin smoothing made my unruly monsoon curls so manageable and soft. Worth every rupee.",
    },
    {
      name: "Tanvi S.",
      city: "Mumbai",
      rating: 5,
      quote:
        "The Radiance Illuminating Facial gave my skin a noticeable luminous glow that lasted through three family wedding functions.",
    },
  ],
  bookingForm: {
    badge: "PRIVATE SANCTUARY RESERVATION",
    heading: "Reserve Your Private Suite",
    subhead: "Choose your treatment or bridal service. Our team will reconfirm within 2 hours.",
    submitLabel: "Request Appointment",
    fields: [
      { id: "clientName", label: "Full Name", type: "text" as const, required: true, placeholder: "e.g. Neha Kulkarni" },
      { id: "phone", label: "WhatsApp Phone Number", type: "tel" as const, required: true, placeholder: "+91 98765 00000" },
      {
        id: "treatment",
        label: "Selected Service",
        type: "select" as const,
        required: true,
        options: [
          { label: "Bridal Couture Hair & Makeup (₹18,000+)", value: "bridal" },
          { label: "Keratin Botanical Smoothing (₹6,500)", value: "keratin" },
          { label: "Radiance Illuminating Facial (₹3,200)", value: "facial" },
          { label: "Precision Texture Cut & Blowout (₹1,400)", value: "haircut" },
          { label: "Organic Hair Spa Wash (₹900)", value: "hairspa" },
          { label: "Bridal Skin Prep 3-Session Package (₹12,000)", value: "skinprep" },
        ],
      },
      { id: "date", label: "Preferred Date", type: "date" as const, required: true },
      {
        id: "timeSlot",
        label: "Preferred Time",
        type: "select" as const,
        required: true,
        options: [
          { label: "10:30 AM (Morning Quiet Session)", value: "10:30" },
          { label: "01:30 PM (Midday Session)", value: "13:30" },
          { label: "04:00 PM (Afternoon Glow Session)", value: "16:00" },
          { label: "06:30 PM (Evening Relaxation)", value: "18:30" },
        ],
      },
      {
        id: "bridalBooking",
        label: "Is this for a Wedding or Bridal Event?",
        type: "select" as const,
        options: [
          { label: "No — Regular personal salon appointment", value: "no" },
          { label: "Yes — I am the Bride", value: "bride" },
          { label: "Yes — Bridal Party / Family Member", value: "party" },
        ],
      },
      {
        id: "notes",
        label: "Special Requests / Hair or Skin Notes",
        type: "textarea" as const,
        placeholder: "Tell us about your hair type, scalp sensitivity, or wedding dates...",
      },
    ],
  },
  footer: {
    address: "Bungalow 7, Koregaon Park North, Pune, Maharashtra 411001",
    hours: "10:00 AM – 8:00 PM (Tuesday – Sunday | By Prior Appointment)",
    phone: "+91 98765 00000",
    email: "concierge@aurastudio.shreejan.ai",
  },
};

