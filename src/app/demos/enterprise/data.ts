export const enterpriseData = {
  header: {
    brandName: "Nexus Enterprise AI",
    navLinks: [
      { label: "Capabilities", href: "#capabilities" },
      { label: "Workflow Engine", href: "#workflow" },
      { label: "Client Cases", href: "#clients" },
      { label: "Architecture", href: "#architecture" },
    ],
    ctaLabel: "Request Consultation",
    ctaHref: "#consultation",
  },
  hero: {
    eyebrow: "ENTERPRISE AUTOMATION & BESPOKE AI PLATFORMS · MUMBAI & PUNE",
    headline: "Operations software that runs while your team sleeps.",
    subhead:
      "Custom platforms, CRM and WhatsApp automation, and AI assistants built and integrated for mid-size businesses. 100% proprietary code ownership.",
    primaryCta: {
      label: "Request a consultation",
      href: "#consultation",
    },
    secondaryCta: {
      label: "See our approach",
      href: "#workflow",
    },
  },
  trustStrip: [
    { value: "40,000+", label: "Hours Automated / Mo" },
    { value: "99.98%", label: "API SLA Uptime" },
    { value: "5 Weeks", label: "Avg Delivery to Production" },
    { value: "100%", label: "Client Code IP Ownership" },
  ],
  clientLogos: [
    { name: "Northwind Logistics", sector: "Supply Chain" },
    { name: "Kestrel Labs", sector: "Diagnostics" },
    { name: "Bluepeak Retail", sector: "Omnichannel" },
    { name: "Astra ChemTech", sector: "Chemicals" },
    { name: "Vanguard Warehousing", sector: "3PL Fleet" },
    { name: "Zenith Mobility", sector: "Fleet IoT" },
  ],
  capabilities: [
    {
      id: "platforms",
      title: "Custom Web Platforms",
      desc: "Full-stack portals, internal admin hubs, and customer accounts engineered with the latest version of Next.js, PostgreSQL, and strict RBAC.",
      price: "from ₹1,50,000 per project",
      badge: "Core Platform",
    },
    {
      id: "automation",
      title: "Workflow Automation",
      desc: "Event-driven pipelines connecting your order forms, spreadsheets, payment gateways, and warehouse dispatch queues.",
      price: "from ₹85,000 per pipeline",
      badge: "Zero Manual Work",
    },
    {
      id: "whatsapp",
      title: "WhatsApp Business API",
      desc: "Official Meta Cloud API integration with verified green tick support, interactive catalogs, OTP auth, and Webhooks.",
      price: "from ₹65,000 setup",
      badge: "Meta Cloud API",
    },
    {
      id: "ai-assistants",
      title: "Autonomous AI Assistants",
      desc: "Fine-tuned RAG agents grounded exclusively on your proprietary inventory, price books, and internal operating manuals.",
      price: "from ₹1,20,000 per agent",
      badge: "Enterprise RAG",
    },
    {
      id: "integrations",
      title: "Data & ERP Integrations",
      desc: "High-throughput connectors bridging SAP, Tally Prime, Zoho Books, Salesforce, and custom legacy SQL databases.",
      price: "from ₹95,000 per connector",
      badge: "Bidirectional",
    },
    {
      id: "support",
      title: "SLA Support & Maintenance",
      desc: "Continuous CI/CD deployment, 24/7 uptime monitoring, security patching, and sub-1 hour emergency incident response.",
      price: "from ₹25,000 per month",
      badge: "99.9% Uptime",
    },
  ],
  workflowSteps: [
    { step: "01", label: "Lead Captured", desc: "Omnichannel capture via Web, WhatsApp, or Ads Webhook" },
    { step: "02", label: "Qualified by AI", desc: "Intent, budget, and timeline scored in < 800ms" },
    { step: "03", label: "Booked in CRM", desc: "Automated routing to right AE and Google/Outlook calendar" },
    { step: "04", label: "Invoice Generated", desc: "GST-compliant Razorpay or Zoho invoice sent instantly" },
    { step: "05", label: "Follow-Up Sent", desc: "Scheduled WhatsApp & email touchpoints with zero human lag" },
  ],
  signatureFeature: {
    badge: "AUTOMATION ARCHITECTURE",
    heading: "Event-Driven Autonomous Pipeline Pattern",
    description:
      "Incoming web visitors, WhatsApp inquiries, and ERP events are processed asynchronously through serverless queues without manual bottlenecks.",
    bullets: [
      "Sub-second event dispatch powered by webhook listeners and queue workers.",
      "Full audit trail logging every automated transaction directly into your private database.",
    ],
    messages: [
      {
        sender: "user" as const,
        text: "Inquiry from Northwind Logistics: We need 24/7 dispatch tracking via WhatsApp Cloud API synced with Tally Prime.",
        time: "11:00 AM",
      },
      {
        sender: "bot" as const,
        text: "System Event: Lead qualified as Tier-1 Enterprise (Fleet size > 50). Dispatched Webhook to CRM. Calendar availability synced: 3 slots proposed to Operations VP.",
        time: "11:00 AM",
        actionButton: {
          label: "Schedule Architecture Review (30 Mins)",
          href: "#consultation",
        },
      },
      {
        sender: "user" as const,
        text: "Confirmed Thursday 3:00 PM IST with Operations Head.",
        time: "11:02 AM",
      },
      {
        sender: "bot" as const,
        text: "Calendar invite and NDA dispatched. Pre-consultation tech questionnaire sent via email.",
        time: "11:02 AM",
      },
    ],
  },
  testimonials: [
    {
      name: "Vikram Shah",
      city: "Pune",
      rating: 5,
      quote:
        "They replaced three manual steps in our dispatch flow in five weeks, and the team still reviews the dashboards with us monthly.",
    },
    {
      name: "Anand M.",
      city: "Mumbai",
      rating: 5,
      quote:
        "The WhatsApp Cloud API bot handles over 1,200 daily vendor invoices without a hiccup. Our finance team reclaimed 20 hours every week.",
    },
    {
      name: "Devika S.",
      city: "Nashik",
      rating: 5,
      quote:
        "Zero agency fluff. Built our internal dealer portal with the latest version of Next.js and PostgreSQL on time and under budget. 100% code ownership.",
    },
  ],
  consultationForm: {
    badge: "EXECUTIVE CONSULTATION",
    heading: "Request an Architectural Discovery Session",
    subhead: "Review your operational bottlenecks and get an engineering scope with fixed milestones.",
    submitLabel: "Schedule Discovery Call",
    fields: [
      { id: "companyName", label: "Company / Enterprise Name", type: "text" as const, required: true, placeholder: "e.g. Northwind Logistics Pvt Ltd" },
      { id: "yourName", label: "Your Full Name & Designation", type: "text" as const, required: true, placeholder: "e.g. Vikram Shah (Head of Ops)" },
      { id: "workEmail", label: "Corporate Work Email", type: "email" as const, required: true, placeholder: "vikram@northwind.in" },
      { id: "phone", label: "Direct Phone / WhatsApp", type: "tel" as const, required: true, placeholder: "+91 98765 00000" },
      {
        id: "companySize",
        label: "Company Employee Count",
        type: "select" as const,
        required: true,
        options: [
          { label: "10 – 50 Employees", value: "10-50" },
          { label: "50 – 250 Employees (Mid-Market)", value: "50-250" },
          { label: "250 – 1000 Employees", value: "250-1000" },
          { label: "1000+ Enterprise", value: "1000+" },
        ],
      },
      {
        id: "currentStack",
        label: "Primary Systems in Use",
        type: "select" as const,
        required: true,
        options: [
          { label: "Tally Prime / Custom ERP + Spreadsheets", value: "tally" },
          { label: "Zoho One / Salesforce CRM", value: "zoho-salesforce" },
          { label: "SAP / Oracle NetSuite", value: "sap" },
          { label: "Spreadsheets & Manual WhatsApp", value: "manual" },
        ],
      },
      {
        id: "primaryGoal",
        label: "Primary Automation Objective",
        type: "textarea" as const,
        placeholder: "Describe the workflow or manual bottleneck you want to eliminate...",
      },
    ],
  },
  footer: {
    address: "Level 14, Platina Business Tower, Bandra Kurla Complex (BKC), Mumbai, MH 400051",
    hours: "Engineering Labs: 24/7 Operations Monitoring",
    phone: "+91 98765 00000",
    email: "enterprise@nexusai.shreejan.ai",
  },
};

