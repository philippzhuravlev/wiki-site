import React from 'react';
import ReactMarkdown from 'react-markdown'; // Temporary, will replace with WikiText

interface WikiRendererProps {
  content: string | Promise<string>;
}

export async function WikiRenderer({ content }: WikiRendererProps) {
  const resolvedContent = await content;
  
  return (
    <div className="prose prose-brown max-w-none">
      <ReactMarkdown>{resolvedContent}</ReactMarkdown>
    </div>
  );
} 