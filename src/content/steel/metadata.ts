interface RegionMetadata {
    id: string;
    equivalents: Record<string, string>;
    pageContentDir: string;
  }
  
  export const metadata: RegionMetadata[] = [
    {
      id: "albrion",
      equivalents: {
        "golden-period": "valloraich",
        "coal": "dunemere"
      },
      pageContentDir: "pages"
    },
    {
      id: "theutoland",
      equivalents: {
        "golden-period": "angbria",
        "coal": "grimstone"
      },
      pageContentDir: "pages"
    },
    // Add more regions...
  ];