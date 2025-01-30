interface RegionMetadata {
    id: string;
    equivalents: Record<string, string>;
    pageContentDir: string;
  }
  
  export const metadata: RegionMetadata[] = [
    {
      id: "dunemere",
      equivalents: {
        "golden-period": "valloraich",
        "steel": "albrion"
      },
      pageContentDir: "pages"
    },
    {
      id: "grimstone",
      equivalents: {
        "golden-period": "angbria",
        "steel": "theutoland"
      },
      pageContentDir: "pages"
    },
    // Add more regions...
  ];