import React from 'react';
import ReactMarkdown from 'react-markdown';
import { parseWikiLinks, WikiLink } from './link-utils';
import Link from 'next/link';
import type { Components } from 'react-markdown'

// Custom components for ReactMarkdown
const components: Components = {
  // Handle headers
  h1: ({node, ...props}) => <h1 className="text-3xl font-bold mt-6 mb-4 text-primary" {...props} />,
  h2: ({node, ...props}) => <h2 className="text-2xl font-bold mt-5 mb-3 text-primary" {...props} />,
  h3: ({node, ...props}) => <h3 className="text-xl font-bold mt-4 mb-2 text-primary" {...props} />,

  // Handle paragraphs with potential <tab> elements
  p: ({node, children, ...props}) => {
    if (typeof children === 'string' && children.startsWith('<tab>')) {
      return <p style={{ paddingLeft: '40px' }} {...props}>
        {children.replace('<tab>', '\u00A0'.repeat(8))}
      </p>;
    }
    return <p className="my-4" {...props}>{children}</p>;
  },

  // Handle emphasis (_text_)
  em: ({node, ...props}) => <em className="italic" {...props} />,
};

// Pre-process the content to handle wiki-links
function preprocessContent(content: string): { processedContent: string, links: WikiLink[] } {
  // Handle headers (### to #)
  let processedContent = content.replace(/^###\s+/gm, '# ');
  processedContent = processedContent.replace(/^====\s+/gm, '## ');

  // Handle tabs
  processedContent = processedContent.replace(/<tab>/g, '\u00A0'.repeat(8));

  // Parse wiki links
  const { text, links } = parseWikiLinks(processedContent);
  
  // Replace wiki link placeholders with markdown links
  processedContent = text.replace(/\{\{WIKILINK:(\d+)\}\}/g, (_, index) => {
    const link = links[parseInt(index)];
    return `[${link.text}](/${link.slug})`;
  });

  return { processedContent, links };
}

export async function renderWikiContent(content: string | Promise<string>) {
  const resolvedContent = await content;
  const { processedContent, links } = preprocessContent(resolvedContent);
  
  return (
    <div className="prose prose-brown max-w-none">
      <ReactMarkdown components={components}>
        {processedContent}
      </ReactMarkdown>
    </div>
  );
} 