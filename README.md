# Fantasy World Wiki Project

## Purpose
A personal fantasy world wiki showcasing different historical eras (Golden Period, Steel Era, Coal Age) with Wikipedia-like content and navigation.

## Core Features
- Era-based navigation with equivalent locations across ages
- WikiText markup rendering for content
- URL format: `site-url/[era]/[place]#[section]`
- Cross-era navigation that maintains section position
- Header with era navigation (Golden/Steel/Coal)

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
│   ├── golden-period/
│   │   ├── metadata.ts   # Region mappings for this era
│   │   ├── frontpage.txt # Era overview
│   │   └── pages/        # WikiText content files
│   │       ├── valloraich.txt
│   │       ├── theutoland.txt
│   │       └── ...
│   ├── steel-era/
│   │   └── ...
│   ├── coal-age/
│   │   └── ...
│   └── images/          # Shared image repository
├── components/
│   └── wiki/
│       ├── WikiRenderer.tsx    # WikiText to HTML converter
│       ├── EraNav.tsx          # Era switching header
│       └── SectionNav.tsx      # Section navigation/tracking
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
