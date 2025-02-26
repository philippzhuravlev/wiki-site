import React from 'react';
import ReactMarkdown from 'react-markdown';
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

// Update preprocessContent to work with the new parseWikiLinks return type
function preprocessContent(content: string): { processedContent: string } {
  // Handle headers (### to #)
  let processedContent = content.replace(/^###\s+/gm, '# ');
  processedContent = processedContent.replace(/^====\s+/gm, '## ');

  // Handle tabs
  processedContent = processedContent.replace(/<tab>/g, '\u00A0'.repeat(8));

  // Handle wiki links - process piped links first
  processedContent = processedContent.replace(/\[\[(.*?)\|(.*?)\]\]/g, (_, path, display) => {
    return `[${display}](/${path})`;
  });

  // Then handle simple links - but only those that don't already have a pipe
  processedContent = processedContent.replace(/\[\[([^\|]*?)\]\]/g, (_, path) => {
    return `[${path}](/${path})`;
  });

  return { processedContent };
}

export async function renderWikiContent(content: string | Promise<string>) {
  const resolvedContent = await content;
  const { processedContent } = preprocessContent(resolvedContent);
  
  return (
    <div className="prose prose-brown max-w-none">
      <ReactMarkdown components={components}>
        {processedContent}
      </ReactMarkdown>
    </div>
  );
} 