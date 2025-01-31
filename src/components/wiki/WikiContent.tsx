'use client';

import { parseWikiLinks } from '@/lib/utils/link-utils';
import { WikiLink } from './WikiLink';
import ReactMarkdown from 'react-markdown';
import { ComponentProps } from 'react';

interface WikiContentProps {
  content: string;
}

export function WikiContent({ content }: WikiContentProps) {
  const { text, links } = parseWikiLinks(content);

  // Fixed type for renderParagraph
  const renderParagraph = ({ children, ...props }: ComponentProps<'p'>) => {
    if (typeof children !== 'string') return <p {...props}>{children}</p>;

    const elements = children.split(/(\{\{WIKILINK:\d+\}\})/g).map((part, index) => {
      const match = part.match(/\{\{WIKILINK:(\d+)\}\}/);
      if (match) {
        const linkIndex = parseInt(match[1]);
        return <WikiLink key={index} link={links[linkIndex]} />;
      }
      return part;
    });

    return <p {...props}>{elements}</p>;
  };

  return (
    <ReactMarkdown
      components={{
        p: renderParagraph,
      }}
      className="wiki-content"
    >
      {text}
    </ReactMarkdown>
  );
} 