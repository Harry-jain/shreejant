export const classesData = {
  header: {
    brandName: "Zenith Academy",
    navLinks: [
      { label: "Classes & Fees", href: "#classes" },
      { label: "Weekly Timetable", href: "#timetable" },
      { label: "Instructors", href: "#instructors" },
      { label: "WhatsApp Trial", href: "#trial-bot" },
    ],
    ctaLabel: "Book Trial Class",
    ctaHref: "#trial-booking",
  },
  hero: {
    eyebrow: "DANCE · FINE ARTS · MUSIC · FITNESS · NASHIK ACADEMY",
    headline: "Learn something new every week.",
    subhead:
      "Dance, art, music, and fitness classes for kids and adults in Nashik. Small batches of 10 to 12 students with dedicated mentorship.",
    primaryCta: {
      label: "Book a trial class",
      href: "#trial-booking",
    },
    secondaryCta: {
      label: "See timetable",
      href: "#timetable",
    },
  },
  trustStrip: [
    { value: "12 Students", label: "Max Batch Size" },
    { value: "15+ Yrs", label: "Academy Legacy" },
    { value: "100%", label: "Certified Mentors" },
    { value: "4.9 ★", label: "Parent & Student Reviews" },
  ],
  classTypes: [
    {
      id: "dance",
      name: "Contemporary & Hip-Hop Dance",
      ageGroup: "Kids & Adults (Separate Batches)",
      fee: "₹1,200",
      period: "month",
      badge: "High Energy",
      desc: "Rhythm foundation, footwork isolation, and choreography routines performed at our annual showcase.",
    },
    {
      id: "art",
      name: "Creative Painting & Clay for Kids",
      ageGroup: "Ages 5 – 14",
      fee: "₹900",
      period: "month",
      badge: "Weekend Batch",
      desc: "Watercolors, acrylic techniques, sketching proportions, and pottery modeling with real studio feedback.",
    },
    {
      id: "guitar",
      name: "Acoustic & Electric Guitar Basics",
      ageGroup: "Ages 8+",
      fee: "₹1,500",
      period: "month",
      badge: "Trinity Syllabus",
      desc: "Fretboard navigation, chord transitions, fingerpicking patterns, and Trinity College London graded prep.",
    },
    {
      id: "zumba",
      name: "Zumba & Calorie Burn Fitness",
      ageGroup: "Adults",
      fee: "₹800",
      period: "month",
      badge: "Morning & Eve",
      desc: "High-octane Latin rhythm cardio dance designed to build cardiovascular endurance and torch 500+ calories.",
    },
    {
      id: "yoga",
      name: "Hatha Yoga & Pranayama Breathwork",
      ageGroup: "All Ages",
      fee: "₹1,000",
      period: "month",
      badge: "Mindfulness",
      desc: "Classical yogasanas, spinal mobility, therapeutic stress relief, and guided restorative sound meditation.",
    },
    {
      id: "speaking",
      name: "Public Speaking & Youth Debate",
      ageGroup: "Ages 10 – 18",
      fee: "₹2,000",
      period: "month",
      badge: "Confidence",
      desc: "Impromptu speech, Parliamentary debate format, vocal modulation, and stage presence workshops.",
    },
  ],
  timetable: {
    days: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    slots: [
      {
        time: "06:30 AM",
        classes: {
          Mon: { name: "Hatha Yoga", mentor: "Yoga Master", seats: "3 seats" },
          Tue: { name: "Zumba Morning", mentor: "Rohan D.", seats: "2 seats" },
          Wed: { name: "Hatha Yoga", mentor: "Yoga Master", seats: "4 seats" },
          Thu: { name: "Zumba Morning", mentor: "Rohan D.", seats: "1 seat" },
          Fri: { name: "Hatha Yoga", mentor: "Yoga Master", seats: "3 seats" },
          Sat: { name: "Weekend Bootcamp", mentor: "Rohan D.", seats: "5 seats" },
          Sun: { name: "Sunrise Pranayama", mentor: "Yoga Master", seats: "2 seats" },
        },
      },
      {
        time: "09:00 AM",
        classes: {
          Mon: { name: "Acoustic Guitar", mentor: "Aditya K.", seats: "2 seats" },
          Tue: { name: "Kids Sketching", mentor: "Snehal P.", seats: "4 seats" },
          Wed: { name: "Acoustic Guitar", mentor: "Aditya K.", seats: "2 seats" },
          Thu: { name: "Kids Sketching", mentor: "Snehal P.", seats: "3 seats" },
          Fri: { name: "Acoustic Guitar", mentor: "Aditya K.", seats: "1 seat" },
          Sat: { name: "Painting Masterclass", mentor: "Snehal P.", seats: "FULL" },
          Sun: { name: "Kids Clay Art", mentor: "Snehal P.", seats: "2 seats" },
        },
      },
      {
        time: "05:30 PM",
        classes: {
          Mon: { name: "Contemporary Dance", mentor: "Meera J.", seats: "2 seats" },
          Tue: { name: "Public Speaking", mentor: "Senior Faculty", seats: "4 seats" },
          Wed: { name: "Contemporary Dance", mentor: "Meera J.", seats: "3 seats" },
          Thu: { name: "Public Speaking", mentor: "Senior Faculty", seats: "2 seats" },
          Fri: { name: "Contemporary Dance", mentor: "Meera J.", seats: "1 seat" },
          Sat: { name: "Hip-Hop Crew Prep", mentor: "Meera J.", seats: "FULL" },
          Sun: { name: "Youth Debate Jam", mentor: "Senior Faculty", seats: "3 seats" },
        },
      },
      {
        time: "07:00 PM",
        classes: {
          Mon: { name: "Zumba Evening", mentor: "Rohan D.", seats: "2 seats" },
          Tue: { name: "Guitar Intermediate", mentor: "Aditya K.", seats: "3 seats" },
          Wed: { name: "Zumba Evening", mentor: "Rohan D.", seats: "1 seat" },
          Thu: { name: "Guitar Intermediate", mentor: "Aditya K.", seats: "2 seats" },
          Fri: { name: "Zumba Evening", mentor: "Rohan D.", seats: "3 seats" },
          Sat: { name: "Acoustic Jam Session", mentor: "Aditya K.", seats: "4 seats" },
          Sun: { name: "Restorative Sound Bath", mentor: "Guest Mentor", seats: "2 seats" },
        },
      },
    ],
  },
  instructors: [
    {
      name: "Meera Joshi",
      discipline: "Contemporary Dance & Choreography",
      experience: "9 Years Experience",
      bio: "Trained at Terence Lewis Dance Academy. Choreographed state-level university youth festivals with over 40 winning trophies.",
    },
    {
      name: "Aditya Kale",
      discipline: "Acoustic & Classical Guitar",
      experience: "12 Years Experience",
      bio: "Grade 8 Trinity College London Certified. Performing touring musician with over 600 students trained across Pune and Nashik.",
    },
    {
      name: "Snehal Patwardhan",
      discipline: "Fine Arts & Clay Modeling",
      experience: "11 Years Experience",
      bio: "Sir J.J. School of Art Alumna. Passionate about unlocking visual confidence and free expression in young children.",
    },
    {
      name: "Rohan Deshmukh",
      discipline: "Zumba Fitness & Cardio Conditioning",
      experience: "7 Years Experience",
      bio: "Licensed Zumba® B1 & B2 instructor. Specializes in fun high-calorie burn choreography for working professionals.",
    },
  ],
  signatureFeature: {
    badge: "PARENT & STUDENT CONCIERGE",
    heading: "Batch Recommendations & Free Trials on WhatsApp",
    description:
      "Parents can share their child's age, interests, and schedule preferences to receive instant batch suggestions and secure a free trial pass.",
    bullets: [
      "Instant age-appropriate batch matching in under 30 seconds.",
      "Zero-obligation free 45-minute trial class voucher sent directly to WhatsApp.",
    ],
    messages: [
      {
        sender: "user" as const,
        text: "Namaste! My 7-year-old daughter loves drawing and colors. Is there any weekend batch for her age group?",
        time: "10:20 AM",
      },
      {
        sender: "bot" as const,
        text: "Namaste! Yes, we have two weekend batches for ages 6–8 taught by Snehal Ma'am:\n1. Saturdays at 10:30 AM (Watercolors & Sketching)\n2. Sundays at 11:00 AM (Clay Modeling & Acrylics)\nBoth batches have 2 seats open. Would you like a Free Trial Pass for this Sunday?",
        time: "10:20 AM",
        actionButton: {
          label: "Claim Sunday 11:00 AM Free Trial Pass",
          href: "#trial-booking",
        },
      },
      {
        sender: "user" as const,
        text: "Yes, Sunday 11 AM trial please. Name: Ananya, parent: Anjali Tambe.",
        time: "10:22 AM",
      },
      {
        sender: "bot" as const,
        text: "Pass Confirmed! We've reserved Ananya's seat for this Sunday at 11:00 AM. All art materials are provided free by the studio. Location: Zenith Academy, Thatte Nagar, Nashik.",
        time: "10:22 AM",
      },
    ],
  },
  testimonials: [
    {
      name: "Anjali T.",
      city: "Nashik",
      rating: 5,
      quote:
        "My daughter asks to go to painting class on Sundays now. The teacher gives real feedback every week.",
    },
    {
      name: "Siddharth K.",
      city: "Nashik",
      rating: 5,
      quote:
        "Started acoustic guitar with Aditya Sir from scratch at age 28. Within 3 months I can play barre chords cleanly and rhythm is tight.",
    },
    {
      name: "Pooja M.",
      city: "Nashik",
      rating: 5,
      quote:
        "Zumba morning batch is the best part of my weekday. The playlist is vibrant, energy is infectious, and lost 4 kgs in 2 months.",
    },
  ],
  trialForm: {
    badge: "COMPLIMENTARY TRIAL CLASS",
    heading: "Book Your 1-Day Trial Pass",
    subhead: "Experience the studio, meet your mentor, and take part in a live batch before enrolling.",
    submitLabel: "Get Free Trial Pass",
    fields: [
      { id: "participantName", label: "Student Full Name", type: "text" as const, required: true, placeholder: "e.g. Ananya Tambe" },
      { id: "age", label: "Student Age", type: "text" as const, required: true, placeholder: "e.g. 7" },
      {
        id: "classInterest",
        label: "Selected Academy Subject",
        type: "select" as const,
        required: true,
        options: [
          { label: "Contemporary & Hip-Hop Dance (₹1,200/mo)", value: "dance" },
          { label: "Painting & Clay for Kids (₹900/mo)", value: "art" },
          { label: "Acoustic Guitar Basics (₹1,500/mo)", value: "guitar" },
          { label: "Zumba Fitness (₹800/mo)", value: "zumba" },
          { label: "Hatha Yoga & Breathwork (₹1,000/mo)", value: "yoga" },
          { label: "Public Speaking & Debate (₹2,000/mo)", value: "speaking" },
        ],
      },
      {
        id: "preferredBatch",
        label: "Preferred Timing Batch",
        type: "select" as const,
        required: true,
        options: [
          { label: "Morning Batch (6:30 AM or 9:00 AM)", value: "morning" },
          { label: "Evening Batch (5:30 PM or 7:00 PM)", value: "evening" },
          { label: "Weekend Only Special Batch", value: "weekend" },
        ],
      },
      { id: "parentPhone", label: "WhatsApp Phone Number (Parent / Student)", type: "tel" as const, required: true, placeholder: "+91 98765 00000" },
      { id: "trialDate", label: "Preferred Trial Date", type: "date" as const, required: true },
    ],
  },
  footer: {
    address: "Zenith Studio Campus, 3rd Floor, Lotus Plaza, Thatte Nagar, Nashik 422005",
    hours: "Open 7 Days: 6:00 AM – 8:30 PM",
    phone: "+91 98765 00000",
    email: "admissions@zenithacademy.shreejan.ai",
  },
};

