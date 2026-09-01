export interface ServicePillar {
  id: string;
  index: string;
  discipline: string;
  title: string;
  summary: string;
  description?: string;
  expandedDetails: string;
  tags: string[];
}

export interface ProjectRecord {
  id: string;
  title: string;
  discipline: string;
  year: string;
  metrics: string;
  externalUrl?: string;
  tagline?: string;
  clientOverview?: string;
  stack?: string[];
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
  budgetTier?: string;
  budget?: string;
  timeline?: string;
  name: string;
  email: string;
  company?: string;
  projectType?: string;
  message: string;
}

export type ContactSubmission = InquiryFormData;
