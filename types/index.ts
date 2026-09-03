export type Currency = "INR" | "USD";

export interface PlanTier {
  id: string;
  name: string;
  badge?: string;
  description: string;
  priceINR: string;
  priceUSD: string;
  features: string[];
}

export interface ServicePillar {
  id: string;
  index: string;
  discipline: string;
  title: string;
  summary: string;
  description?: string;
  expandedDetails: string;
  tags: string[];
  tiers: PlanTier[];
}

export interface ProjectRecord {
  id: string;
  title: string;
  discipline: string;
  year: string;
  metrics: string;
  tagline?: string;
  clientOverview?: string;
  stack?: string[];
  externalUrl?: string;
  galleryImages: string[];
}

export interface MethodologyStep {
  id: string;
  badge: string;
  title: string;
  description: string;
  subPoints: string[];
}

export interface InquiryFormData {
  selectedScopes?: string[];
  selectedPillar?: string;
  selectedTier?: string;
  currency?: Currency;
  budgetTier?: string;
  budget?: string;
  timeline?: string;
  rushSurcharge?: number;
  name: string;
  email: string;
  company?: string;
  projectType?: string;
  message: string;
}

export type ContactSubmission = InquiryFormData;
