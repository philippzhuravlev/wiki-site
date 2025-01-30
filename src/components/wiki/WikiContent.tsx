'use client';

import { parseWikiLinks } from '@/lib/utils/wiki-utils';
import { WikiLink } from './WikiLink';
import ReactMarkdown from 'react-markdown';

interface WikiContentProps {
  content: string;
}

export function WikiContent({ content }: WikiContentProps) {
  const { text, links } = parseWikiLinks(content);

  // Custom renderer for markdown that handles our wiki link markers
  const renderParagraph = ({ children }: { children: React.ReactNode }) => {
    if (typeof children !== 'string') return <p>{children}</p>;

    const elements = children.split(/(\{\{WIKILINK:\d+\}\})/g).map((part, index) => {
      const match = part.match(/\{\{WIKILINK:(\d+)\}\}/);
      if (match) {
        const linkIndex = parseInt(match[1]);
        return <WikiLink key={index} link={links[linkIndex]} />;
      }
      return part;
    });

    return <p>{elements}</p>;
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