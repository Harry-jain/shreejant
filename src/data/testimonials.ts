export interface Testimonial {
  name: string;
  businessType: string;
  city: string;
  quote: string;
  verified: true;
}

export const TESTIMONIALS: Testimonial[] = [
  {
    name: "Pooja Mehta",
    businessType: "Aura Studio & Bridal Lounge",
    city: "Bandra West, Mumbai",
    quote: "Shreejan AI built our booking platform and autonomous WhatsApp assistant in 8 days. Our weekend bridal appointments fill up automatically without our team handling repeat inquiry calls.",
    verified: true,
  },
  {
    name: "Rajesh Soni",
    businessType: "Kanak Heritage Jewels",
    city: "Zaveri Bazaar, Mumbai",
    quote: "Our luxury jewellery vault catalog loads in under 40 milliseconds on mobile. High-ticket patrons book private viewing viewings seamlessly. The engineering craft is world-class.",
    verified: true,
  },
  {
    name: "Dr. Sameer Vora",
    businessType: "Vora Specialty Clinic",
    city: "Andheri East, Mumbai",
    quote: "The AI patient intake and slot reservation engine cut consultation no-shows by over 55%. Forward-thinking technology that actually drives tangible business revenue.",
    verified: true,
  },
];
