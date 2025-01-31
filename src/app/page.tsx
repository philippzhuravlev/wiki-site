import React from 'react';
import { WikiRenderer } from '@/components/wiki/WikiRenderer';
import { loadTextFile } from '@/lib/utils/file-utils';

const FrontPage = async () => {
    const content = loadTextFile('src/content/eraless/frontpage.txt');

    return (
        <div className="text-black">
            <WikiRenderer content={content} />
        </div>
    );
};

export default FrontPage;
