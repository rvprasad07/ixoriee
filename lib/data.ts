import { ServicePillar, ProjectRecord, MethodologyStep } from "@/types";

export const SERVICE_PILLARS: ServicePillar[] = [
  {
    id: "ui-ux",
    index: "01",
    discipline: "FRONTEND ENGINEERING",
    title: "Bespoke Visual & Motion Engines",
    summary: "High-converting, interactive web systems built for sub-second load times and award-winning aesthetic standards.",
    expandedDetails: "Engineered with modern React and Framer Motion to provide buttery-smooth 60-120 FPS interactions, custom layout transitions, and responsive mobile architecture.",
    tags: ["Next.js App Router", "Tailwind CSS", "Framer Motion", "Lenis Inertia", "60-120 FPS Locked"]
  },
  {
    id: "saas-platforms",
    index: "02",
    discipline: "FULL-STACK ENGINEERING",
    title: "Scalable Platforms & Cloud Portals",
    summary: "Custom multi-tenant web apps, custom database architectures, and intuitive admin dashboards tailored to your exact business logic.",
    expandedDetails: "Complete relational database modeling on Supabase/PostgreSQL, edge API routes, secure multi-tier user authentication, and high-performance admin controls.",
    tags: ["Supabase / PostgreSQL", "Edge Functions", "REST & GraphQL", "Role-Based Access"]
  },
  {
    id: "agentic-ai",
    index: "03",
    discipline: "AUTONOMOUS WORKFLOWS",
    title: "Autonomous Business Logic Engines",
    summary: "Custom AI pipelines that automate customer onboarding, dynamic scheduling, invoice dispatches, and multi-channel synchronization.",
    expandedDetails: "Custom agentic workflows that ingest unstructured inquiries, auto-generate invoices, trigger calendar bookings, and sync real-time CRM updates.",
    tags: ["Autonomous AI Workflows", "Human-in-the-Loop", "API Orchestration", "Webhook Pipelines"]
  },
  {
    id: "brand-launchpad",
    index: "04",
    discipline: "TURNKEY TRANSFORMATION",
    title: "Complete Digital Brand Deployment",
    summary: "The end-to-end launch package for new ventures: complete brand design system, logo asset suite, full-stack website, and customer acquisition funnels.",
    expandedDetails: "From zero to launch: complete typography and color system, scalable vector logomarks, social collateral suite, and production deployment.",
    tags: ["360° Visual Identity", "Design Systems", "Production Codebase", "Turnkey Asset Kit"]
  }
];

export const SELECTED_WORKS: ProjectRecord[] = [
  {
    id: "core-studio",
    title: "01. CoreStudio OS",
    discipline: "Full-Stack SaaS & Studio Automation",
    year: "2026",
    metrics: "Reduced manual operations by 94%",
    tagline: "Dance & Athletic Studio Orchestration Cloud",
    clientOverview: "Replaced 4 disconnected paper registers and spreadsheets with a unified edge-native SaaS platform handling recurring subscriptions, automatic attendance logging, and instructor payouts.",
    stack: ["Next.js 14", "PostgreSQL", "Tailwind CSS", "Stripe Connect", "Edge Functions"],
    galleryImages: ["/projects/core-studio-1.webp", "/projects/core-studio-2.webp"]
  },
  {
    id: "lumina-spaces",
    title: "02. Lumina Spaces",
    discipline: "Interactive Web System & 3D Spatial Canvas",
    year: "2026",
    metrics: "Sub-100ms interaction latency",
    tagline: "Architectural Interior Visualization & Booking",
    clientOverview: "Designed an interactive luxury interior digital experience with real-time 3D spatial walkthroughs, bespoke material physics, and seamless quote requests.",
    stack: ["Three.js", "React Three Fiber", "GSAP ScrollTrigger", "Lenis", "Framer Motion"],
    galleryImages: ["/projects/lumina-1.webp", "/projects/lumina-2.webp"]
  },
  {
    id: "apex-launchpad",
    title: "03. Apex Launchpad",
    discipline: "0-to-1 Brand Identity & Platform Build",
    year: "2026",
    metrics: "Complete brand kit & custom site",
    tagline: "Fintech Venture Identity & Customer Acquisition Engine",
    clientOverview: "Crafted complete high-contrast visual identity from scratch, delivered 40+ vector marketing components, and engineered a high-velocity conversion funnel.",
    stack: ["Brand Identity", "Next.js App Router", "Design System", "Vercel Edge"],
    galleryImages: ["/projects/apex-1.webp", "/projects/apex-2.webp"]
  },
  {
    id: "omniflow-ai",
    title: "04. OmniFlow AI",
    discipline: "Autonomous Client Onboarding Pipeline",
    year: "2026",
    metrics: "24/7 automated intake engine",
    tagline: "AI Orchestrated Lead Qualification & Dispatch",
    clientOverview: "Engineered autonomous multi-agent intake workflows that parse client RFP briefs, score lead fit, generate tailored scope estimations, and schedule discovery calls without human delay.",
    stack: ["Gemini 1.5 Pro", "Multi-Agent Logic", "Node.js", "PostgreSQL", "Slack API"],
    galleryImages: ["/projects/omniflow-1.webp", "/projects/omniflow-2.webp"]
  }
];

export const METHODOLOGY_STEPS: MethodologyStep[] = [
  {
    id: "investigation",
    badge: "[ 01 / INVESTIGATION ]",
    title: "Deep Root-Cause Discovery",
    description: "We analyze manual bottlenecks, workflow friction, and customer drop-off points with rigorous research before writing a single line of code.",
    subPoints: [
      "Operational friction mapping & time-waste audit",
      "Legacy data structure & API surface analysis",
      "Definitive engineering scope & milestone roadmap"
    ]
  },
  {
    id: "synthesis",
    badge: "[ 02 / SYNTHESIS (AI + HI) ]",
    title: "Artificial + Human Intelligence",
    description: "We leverage modern AI for deep research and data modeling, then apply bespoke human taste, design craft, and custom engineering.",
    subPoints: [
      "AI-accelerated schema generation & component prototyping",
      "Human-in-the-loop Swiss layout & typography polishing",
      "Rigorous kinetic motion & physics tuning"
    ]
  },
  {
    id: "deployment",
    badge: "[ 03 / DEPLOYMENT ]",
    title: "Engineered Infrastructure",
    description: "We ship modular, high-security production code with client-ready admin controls and automated background pipelines.",
    subPoints: [
      "Edge deployment with sub-second TTFB & 99.99% uptime",
      "Autonomous background cron jobs & webhook sync",
      "Full source handover, docs & zero-downtime SLA"
    ]
  }
];
