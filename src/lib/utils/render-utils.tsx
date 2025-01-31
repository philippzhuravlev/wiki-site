import React from 'react';
import ReactMarkdown from 'react-markdown';

export async function renderWikiContent(content: string | Promise<string>) {
  const resolvedContent = await content;
  
  return (
    <div className="prose prose-brown max-w-none">
      <ReactMarkdown>{resolvedContent}</ReactMarkdown>
    </div>
  );
} 