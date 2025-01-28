import { Era } from './era';

export interface WikiPage {
  id: string;
  slug: string;
  title: string;
  content: string;
  era: Era;
  linkedPages?: {
    [K in Era]?: string; // IDs of equivalent pages in other eras
  };
  lastModified: Date;
  createdAt: Date;
  sections?: WikiSection[];
}

export interface WikiSection {
  id: string;
  title: string;
  content: string;
  anchor: string;
} 