interface RegionMetadata {
  id: string;
  equivalents: Record<string, string>;
  pageContentDir: string;
}

export const metadata: RegionMetadata[] = [
  {
    id: "valloraich",
    equivalents: {
      "steel": "albrion",
      "coal": "angbria"
    },
    pageContentDir: "pages"
  },
  // Add more regions...
]; 