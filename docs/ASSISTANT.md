# AI Assistant Context

## Project Purpose & Goals
- Create a wiki-style site for a fantasy world across different historical eras
- Maintain consistent navigation between equivalent locations across eras
- Support rich text content with WikiText formatting (transitioning from Markdown)
- Ensure seamless user experience when switching between eras

## Key Implementation Details
- Era navigation uses metadata.json for region mapping
- Content stored in .txt files under src/content
- Three distinct eras:
  - Golden Period (500-800)
  - Steel Era (1000-1500)
  - Coal Age (1800-1900)
- Dynamic routing handles all wiki pages
- API endpoints:
  - /api/equivalent handles region equivalency lookups
  - /api/random provides random page navigation
- RandomButton component handles client-side random navigation
- Each era folder contains its own metadata.json for region mappings

## Important Decisions & History
- Moved from static routes to dynamic [...path] routing
- Reorganized API structure into dedicated endpoint folders
- Simplified random page navigation with client-side component
- Using server components by default, client components only when needed
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