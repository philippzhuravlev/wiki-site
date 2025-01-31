import { readFileSync, writeFileSync, readdirSync, statSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

function generateStructure(dir, prefix = '') {
  let output = '';
  const items = readdirSync(dir);
  
  items.forEach((item, index) => {
    const isLast = index === items.length - 1;
    const fullPath = join(dir, item);
    const stats = statSync(fullPath);
    
    if (stats.isDirectory()) {
      output += `${prefix}${isLast ? '└── ' : '├── '}${item}/\n`;
      output += generateStructure(fullPath, prefix + (isLast ? '    ' : '│   '));
    } else {
      output += `${prefix}${isLast ? '└── ' : '├── '}${item}\n`;
    }
  });
  
  return output;
}

function updateStructureDoc() {
  console.log('Updating project structure documentation...');
  const structure = generateStructure(join(process.cwd(), 'src'));
  const structureDoc = join(process.cwd(), 'docs', 'STRUCTURE.md');
  
  let content = readFileSync(structureDoc, 'utf8');
  const startMarker = '```\n';
  const endMarker = '```';
  
  const start = content.indexOf(startMarker) + startMarker.length;
  const end = content.indexOf(endMarker, start);
  
  content = content.substring(0, start) + structure + content.substring(end);
  
  writeFileSync(structureDoc, content);
  console.log('Structure documentation updated successfully!');
}

updateStructureDoc(); 