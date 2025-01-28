'use client';

import { useParams, usePathname, useRouter } from 'next/navigation';
import { EraData, Eras, type Era } from '@/types/era';
import clsx from 'clsx';

export function EraSelector() {
  const router = useRouter();
  const pathname = usePathname();
  const params = useParams();
  const currentEra = params.era as Era | undefined;

  const handleEraChange = (era: Era) => {
    // If we're on the home page, just go to the era's index
    if (pathname === '/') {
      router.push(`/${era}`);
      return;
    }

    // If we're on a wiki page, maintain the slug when changing eras
    if (params.slug) {
      router.push(`/${era}/${params.slug}`);
      return;
    }

    router.push(`/${era}`);
  };

  return (
    <div className="flex gap-2 px-4">
      {Object.values(EraData).map((era) => (
        <button
          key={era.id}
          onClick={() => handleEraChange(era.id)}
          className={clsx(
            'px-4 py-2 rounded-md transition-colors',
            currentEra === era.id
              ? 'bg-primary text-surface hover:bg-primary/90'
              : 'hover:bg-surface-dark/5 text-text hover:text-primary'
          )}
        >
          <span className="font-medium">{era.name}</span>
          <span className="text-xs ml-2 opacity-70">{era.yearRange}</span>
        </button>
      ))}
    </div>
  );
} 