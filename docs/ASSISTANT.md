# AI Assistant Context

## Project Purpose & Goals
- Create a wiki-style site for a fantasy world across different historical eras
- Maintain consistent navigation between equivalent locations across eras
- Support rich text content with WikiText formatting (transitioning from Markdown)
- Ensure seamless user experience when switching between eras

## Key Implementation Details
- Era navigation uses metadata.json for region mapping
- Content stored in .txt files under src/content
- Dynamic routing handles all wiki pages
- API endpoint (/api/route.ts) handles region equivalency lookups
  - Takes currentRegion, currentEra, targetEra as query params
  - Returns equivalent region ID based on metadata.json mapping

## Important Decisions & History
- Moved from static routes to dynamic [...path] routing
- Simplified API structure by removing equivalent-region subfolder
- Using server components by default, client components only when needed
- Metadata.json in each era folder defines region equivalencies
- Planning transition from Markdown to WikiText parser

## Development Guidelines
- Maintain consistent file structure (check STRUCTURE.md)
- Follow Next.js App Router conventions
- Keep utility functions in lib/utils
- Use server components by default
- Always check metadata.json when handling era navigation
- Ensure error handling for missing content/regions

## Content Management
- Each era has its own folder in src/content
- Metadata.json format:
  ```typescript
  interface RegionMetadata {
    id: string;
    equivalents: Record<string, string>;
    pageContentDir: string;
  }
  ```
- Content files use WikiText format (transitioning from Markdown)

## Future Plans
- Implement WikiText parser
- Add nested content structure
- Improve error handling
- Add search functionality
- Add interactive visualizations

## Instructions for Assistant
- Always check STRUCTURE.md for current project structure
- Refer to DEVELOPMENT.md for technical details
- Keep this file updated with new decisions
- Maintain consistent error handling patterns
- Document any new features or changes here 