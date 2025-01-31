# Development Guide

## Next.js Concepts
- **App Router**: Uses file-system based routing in `src/app`
- **Server Components**: Default in App Router, render on server
- **Client Components**: Marked with 'use client', handle interactivity

## Key Components
- **RandomButton**: 
  - Client component for random page navigation
  - Uses /api/random endpoint
  - Handles loading states and errors
- **EraSelector**: 
  - Handles era navigation and equivalent region mapping
  - Uses /api/equivalent endpoint
  - Updates URL based on region equivalencies
- **[...path]/page.tsx**: 
  - Dynamic route handler for all wiki pages
  - Handles both era-specific and general pages
  - Loads and renders content from .txt files

## Content Management
- Content stored in `src/content/{era}/`
- Each era has metadata.json defining region relationships
- Content files use WikiText format (transitioning from Markdown)
- Images stored in shared images directory

## API Documentation
### GET /api/equivalent
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

### GET /api/random
Response:
```typescript
{
  redirect: string  // URL path to redirect to (e.g., "/golden/theutoland")
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