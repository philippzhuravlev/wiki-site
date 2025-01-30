'use client';

import Link from 'next/link';
import { useParams } from 'next/navigation';
import { type Era } from '@/types/era';
import { type WikiLink } from '@/lib/utils/wiki-utils';

interface WikiLinkProps {
  link: WikiLink;
}

export function WikiLink({ link }: WikiLinkProps) {
  const params = useParams();
  const currentEra = params.era as Era | undefined;
  
  const href = currentEra 
    ? `/${currentEra}/${link.slug}`
    : `/${link.slug}`;

  return (
    <Link
      href={href}
      className={`transition-colors ${
        link.exists 
          ? 'text-primary hover:text-primary/80' 
          : 'text-red-700 hover:text-red-600 border-b border-dashed border-current'
      }`}
    >
      {link.text}
    </Link>
  );
} 