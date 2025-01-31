# Fantasy World Wiki Project

## Purpose
A personal fantasy world wiki showcasing different historical eras (Golden Period, Steel Era, Coal Age) with Wikipedia-like content and navigation.

## Core Features
- Era-based navigation with equivalent locations across ages
- Automatic region mapping between eras using metadata.json
- URL hash preservation when switching eras
- Cross-era navigation that maintains section position
- Header with era navigation (Golden/Steel/Coal)

## Planned Features
### Nested Content Structure
- Support for nested folders in content (e.g., regions/settlements/stonetown)
- Automatic frontpage.txt loading for directory index pages
- URL structure matching content structure:
  - /coal/regions → content/coal/regions/frontpage.txt
  - /coal/regions/settlements → content/coal/regions/settlements/frontpage.txt
  - /coal/regions/settlements/stonetown → content/coal/regions/settlements/stonetown.txt

### Required Changes for Nested Structure
- Replace [era]/[page] with [era]/[...page] route to handle nested paths
- Update file resolution logic to handle nested paths
- Modify metadata structure to support nested equivalents
- Add breadcrumb navigation for nested pages
- Update era navigation to handle nested equivalent pages

## Technical Stack
- Next.js with TypeScript
- TailwindCSS
- WikiText parser for content rendering
- (Future) Vercel hosting
- (Future) Supabase database

## Project Structure
```
src/
├── app/
│   ├── [era]/
│   │   ├── page.tsx      # Dynamic era page handler
│   │   └── layout.tsx    # Era-specific layout
├── content/
│   ├── eraless/
│   │   ├── frontpage.txt
│   │   └── ...
│   ├── golden/
│   │   ├── metadata.json
│   │   ├── frontpage.txt      # Era overview
│   │   ├── regions/           # Category folder
│   │   │   ├── frontpage.txt  # Regions overview
│   │   │   ├── valloraich/    # Region folder
│   │   │   │   ├── frontpage.txt
│   │   │   │   └── settlements/
│   │   │   │       ├── frontpage.txt
│   │   │   │       └── oldtown.txt
│   │   ├── events/            # Another category
│   │   │   ├── frontpage.txt
│   │   │   └── great-war.txt
│   ├── steel/
│   │   └── ...
│   ├── coal/
│   │   └── ...
│   └── images/          # Shared image repository
├── lib/
│   └── utils/                    # All utility functions
│       ├── file-utils.ts         # File operations
│       ├── link-utils.ts         # Link parsing
│       ├── era-utils.ts          # Era-specific utilities
│       └── render-utils.ts       # Content rendering
├── components/
│   └── layout/                   # Layout components
│       ├── Header.tsx           # Main header
│       └── EraSelector.tsx      # Era switching component
└── types/
    ├── era.ts           # Era type definitions
    └── metadata.ts      # Content metadata types
```

## Content Structure

### metadata.ts (per era)
```typescript
interface RegionMetadata {
  id: string;                              // e.g., "valloraich"
  equivalents: Record<string, string>;     // e.g., { "steel": "albrion", "coal": "angbria" }
  pageContentDir: string;                  // e.g., "pages"
}

const metadata: RegionMetadata[] = [
  {
    id: "valloraich",
    equivalents: {
      "steel": "albrion",
      "coal": "angbria"
    },
    pageContentDir: "pages"
  },
  // ...
];
```

### WikiText Content Files (.txt)
Standard WikiText markup format, similar to Wikipedia:
```
= Page Title =
== Section ==
Content with '''bold''' and ''italic'' text...

[[Image:example.jpg|thumb|Caption]]

=== Subsection ===
More content...
```

## Future Considerations
- User authentication and authorization
- Edit history tracking
- Content review system
- Search functionality with era filters
- Interactive timeline and map visualizations
- Sidebar navigation
- **Unified Page Parser**: In the future, we might implement a single page parser for "age-less" pages like the list of languages and the front page. This parser will load `.txt` files similarly to how "aged" pages are handled.

## Development Priorities
1. Basic era navigation and content rendering
2. WikiText parser implementation (currently using Markdown as interim solution)
3. Cross-era navigation with section maintenance
4. Content management system
5. Search functionality

## Note to Assistant
- Always consult this README for context before making changes
- Update this document when new decisions are made
- Enforce the project structure strictly
- Maintain consistent styling (brown/light historical theme)
- Keep track of the transition from Markdown to WikiText
