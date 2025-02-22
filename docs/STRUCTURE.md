# P├── app/
│   ├── api/
│   │   ├── equivalent/
│   │   │   └── route.ts
│   │   ├── random/
│   │   │   └── route.ts
│   │   └── search/
│   │       └── route.ts
│   ├── favicon.ico
│   ├── globals.css
│   ├── layout.tsx
│   ├── page.tsx
│   └── [...path]/
│       └── page.tsx
├── components/
│   ├── layout/
│   │   ├── EraSelector.tsx
│   │   ├── Header.tsx
│   │   └── Sidebar.tsx
│   ├── RandomButton.tsx
│   └── Search.tsx
├── content/
│   ├── about.txt
│   ├── coal/
│   │   ├── allemannland.txt
│   │   ├── angbria.txt
│   │   ├── frontpage.txt
│   │   └── metadata.json
│   ├── frontpage.txt
│   ├── golden/
│   │   ├── frontpage.txt
│   │   ├── metadata.json
│   │   ├── theutoland.txt
│   │   └── valloraich.txt
│   └── steel/
│       ├── albrion.txt
│       ├── carowiga.txt
│       ├── frontpage.txt
│       └── metadata.json
├── declarations.d.ts
├── lib/
│   └── utils/
│       ├── era-utils.ts
│       ├── file-utils.ts
│       ├── link-utils.ts
│       ├── render-utils.tsx
│       ├── route.ts
│       └── wiki-utils.ts
├── middleware.ts
└── types/
    ├── era.ts
    └── wiki.ts
```
src/
├── app/
│   ├── [...path]/
│   │   └── page.tsx
│   └── api/
│       └── route.ts
├── components/
│   └── layout/
│       ├── Header.tsx
│       └── EraSelector.tsx
├── lib/
│   └── utils/
│       ├── era-utils.ts
│       ├── file-utils.ts
│       └── render-utils.ts
└── content/
    ├── golden/
    ├── steel/
    └── coal/
``` 