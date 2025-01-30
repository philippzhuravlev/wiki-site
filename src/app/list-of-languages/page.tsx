// src/app/list-of-languages/page.tsx
import React from 'react';
import { WikiRenderer } from '../../components/wiki/WikiRenderer';
import { loadTextFile } from '../../lib/utils/wiki-utils';

const ListOfLanguages = async () => {
    const content = loadTextFile('src/content/ageless-pages/list-of-languages.txt');

    return (
        <div className="text-black">
            <WikiRenderer content={content} />
        </div>
    );
};

export default ListOfLanguages;