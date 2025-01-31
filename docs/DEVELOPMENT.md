# Development Guide

## Next.js Concepts
- **App Router**: Uses file-system based routing in `src/app`
- **Server Components**: Default in App Router, render on server
- **Client Components**: Marked with 'use client', handle interactivity

## Key Components
- **EraSelector**: 
  - Handles era navigation and equivalent region mapping
  - Uses API to fetch equivalent regions
  - Updates URL based on region equivalencies
- **[...path]/page.tsx**: 
  - Dynamic route handler for all wiki pages
  - Handles both era-specific and general pages
  - Loads and renders content from .txt files
- **api/route.ts**: 
  - Endpoint for region equivalency lookups
  - Uses metadata.json to map regions between eras
  - Returns equivalent region or null

## Content Management
- Content stored in `src/content/{era}/`
- Each era has metadata.json defining region relationships
- Content files use WikiText format (transitioning from Markdown)
- Images stored in shared images directory

## API Documentation
### GET /api
Query Parameters:
- currentRegion: string (region ID)
- currentEra: string (era name)
- targetEra: string (desired era)

Response:
```typescript
{
  equivalent: string | null  // equivalent region ID or null if none exists
}
```

## Development Workflow
1. Create content files in appropriate era folders
2. Update metadata.json for cross-era relationships
3. Test navigation between equivalent regions
4. Ensure proper error handling for missing content

## Structure Management
The project structure is automatically updated using:
```bash
npm run watch-structure
```
This will monitor changes and update STRUCTURE.md automatically. 