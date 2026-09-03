import { ServicePillar, ProjectRecord, MethodologyStep } from "@/types";

export const SERVICE_PILLARS: ServicePillar[] = [
  {
    id: "ui-ux",
    index: "01",
    discipline: "FRONTEND ENGINEERING",
    title: "Bespoke Visual & Motion Engines",
    summary: "High-converting, interactive web systems built for sub-second load times and award-winning aesthetic standards.",
    expandedDetails: "Engineered with modern React and Framer Motion to provide buttery-smooth 60-120 FPS interactions, custom layout transitions, and responsive mobile architecture.",
    tags: ["Next.js App Router", "Tailwind CSS", "Framer Motion", "Lenis Inertia", "60-120 FPS Locked"],
    tiers: [
      {
        id: "sprint-core",
        name: "Sprint Core",
        badge: "Free Launch Support",
        description: "Essential single-page conversion architecture, responsive UI, base database integration, WhatsApp/Call quick trigger.",
        priceINR: "₹15,000 – ₹35,000",
        priceUSD: "$250 – $450",
        features: ["1-3 Responsive Views", "Sub-second Load Optimization", "WhatsApp Lead Quick Trigger", "Free Deployment Setup"]
      },
      {
        id: "production-engine",
        name: "Production Engine",
        badge: "Most Popular",
        description: "Multi-page bespoke web platform, custom admin dashboard, client management portal, 60–120 FPS micro-interactions.",
        priceINR: "₹45,000 – ₹1,20,000",
        priceUSD: "$600 – $1,500",
        features: ["Full Custom Motion Engine", "Private Client/Admin Portal", "Supabase Relational Database", "Custom CMS Integration"]
      },
      {
        id: "autonomous-platform",
        name: "Autonomous Platform",
        badge: "Enterprise Grade",
        description: "Turnkey full-stack SaaS ecosystem, custom Agentic AI workflows, automated background tasks, enterprise role-based security.",
        priceINR: "₹1,20,000 – ₹2,80,000+",
        priceUSD: "$1,800 – $3,500+",
        features: ["Agentic AI Automated Intake", "Multi-role Access Control", "Automated Billing & Reporting", "Edge-Native Scalability"]
      }
    ]
  },
  {
    id: "saas-platforms",
    index: "02",
    discipline: "FULL-STACK ENGINEERING",
    title: "Scalable Platforms & Cloud Portals",
    summary: "Custom multi-tenant web apps, custom database architectures, and intuitive admin dashboards tailored to your exact business logic.",
    expandedDetails: "Complete relational database modeling on Supabase/PostgreSQL, edge API routes, secure multi-tier user authentication, and high-performance admin controls.",
    tags: ["Supabase / PostgreSQL", "Edge Functions", "REST & GraphQL", "Role-Based Access"],
    tiers: [
      {
        id: "sprint-core",
        name: "Sprint Core",
        badge: "Starter MVP",
        description: "MVP platform setup, core CRUD tables, basic authentication, and client data onboarding.",
        priceINR: "₹25,000 – ₹45,000",
        priceUSD: "$350 – $600",
        features: ["Core CRUD Database", "Secure Auth Portal", "Single Admin Screen", "API Endpoints"]
      },
      {
        id: "production-engine",
        name: "Production Engine",
        badge: "Scale Ready",
        description: "Multi-tenant architecture, role-based permissions, automated payment gateways, and real-time data sync.",
        priceINR: "₹65,000 – ₹1,40,000",
        priceUSD: "$850 – $1,800",
        features: ["Multi-Tenant Support", "Payment Gateway Webhooks", "Analytics Graphs & Exports", "Granular Permissions"]
      },
      {
        id: "autonomous-platform",
        name: "Autonomous Platform",
        badge: "Cloud Enterprise",
        description: "Full enterprise SaaS suite, continuous background workers, automated cron jobs, and high-concurrency cloud scaling.",
        priceINR: "₹1,50,000 – ₹3,20,000+",
        priceUSD: "$2,000 – $4,000+",
        features: ["Custom Cloud Architecture", "Continuous Background Workers", "Automated DB Backups", "SLA & Performance Guarantee"]
      }
    ]
  },
  {
    id: "agentic-ai",
    index: "03",
    discipline: "AUTONOMOUS WORKFLOWS",
    title: "Autonomous Business Logic Engines",
    summary: "Custom AI pipelines that automate customer onboarding, dynamic scheduling, invoice dispatches, and multi-channel synchronization.",
    expandedDetails: "Custom agentic workflows that ingest unstructured inquiries, auto-generate invoices, trigger calendar bookings, and sync real-time CRM updates.",
    tags: ["Autonomous AI Workflows", "Human-in-the-Loop", "API Orchestration", "Webhook Pipelines"],
    tiers: [
      {
        id: "sprint-core",
        name: "Sprint Core",
        badge: "Quick Automate",
        description: "Single-pipeline automation: form intake to WhatsApp/Telegram dispatch + basic auto-responder.",
        priceINR: "₹18,000 – ₹40,000",
        priceUSD: "$250 – $500",
        features: ["Instant Mobile Push Trigger", "Google Sheets/Airtable Sync", "Single Webhook Handler", "Zero-Maintenance Run"]
      },
      {
        id: "production-engine",
        name: "Production Engine",
        badge: "Agentic Flow",
        description: "Multi-step agentic workflow: AI lead scoring, document extraction, invoice creation, and automated email drafting.",
        priceINR: "₹50,000 – ₹1,20,000",
        priceUSD: "$700 – $1,500",
        features: ["AI Lead Qualification", "Dynamic PDF/Invoice Generation", "Multi-Channel Sync", "Human Approval Checkpoints"]
      },
      {
        id: "autonomous-platform",
        name: "Autonomous Platform",
        badge: "Full Autonomous",
        description: "Full autonomous business engine: Voice/Call AI assistant, autonomous CRM manager, and continuous multi-system sync.",
        priceINR: "₹1,30,000 – ₹2,90,000+",
        priceUSD: "$1,800 – $3,800+",
        features: ["Voice/Call AI Integration", "Autonomous CRM Management", "Custom LLM Knowledge Base", "24/7 Agent Monitoring"]
      }
    ]
  },
  {
    id: "brand-launchpad",
    index: "04",
    discipline: "TURNKEY TRANSFORMATION",
    title: "Complete Digital Brand Deployment",
    summary: "The end-to-end launch package for new ventures: complete brand design system, logo asset suite, full-stack website, and customer acquisition funnels.",
    expandedDetails: "From zero to launch: complete typography and color system, scalable vector logomarks, social collateral suite, and production deployment.",
    tags: ["360° Visual Identity", "Design Systems", "Production Codebase", "Turnkey Asset Kit"],
    tiers: [
      {
        id: "sprint-core",
        name: "Sprint Core",
        badge: "Brand Starter",
        description: "Core identity system: primary logo, typography spec, color tokens, and single-page launch website.",
        priceINR: "₹20,000 – ₹45,000",
        priceUSD: "$300 – $600",
        features: ["Vector Logo Kit", "Color & Typography Guide", "Single-Page Web Engine", "Essential Social Covers"]
      },
      {
        id: "production-engine",
        name: "Production Engine",
        badge: "Full Launch",
        description: "Full brand ecosystem: design system, comprehensive collateral, multi-page bespoke website, and conversion funnel.",
        priceINR: "₹60,000 – ₹1,35,000",
        priceUSD: "$800 – $1,800",
        features: ["Comprehensive Design System", "Multi-Page Production Website", "Brand Asset Library", "Pitch Deck Template"]
      },
      {
        id: "autonomous-platform",
        name: "Autonomous Platform",
        badge: "Turnkey Venture",
        description: "Turnkey enterprise launchpad: 360° brand identity, custom web application, automated lead capture, and investor-ready assets.",
        priceINR: "₹1,40,000 – ₹3,00,000+",
        priceUSD: "$1,900 – $4,000+",
        features: ["360° Visual Identity System", "Full-Stack Custom Web Platform", "Automated Onboarding Engine", "Complete Commercial Rights"]
      }
    ]
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
    badge: "[ 02 / SYNTHESIS ($AI + HI$) ]",
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
