import fs from 'fs';
fs.writeFileSync('src/index.css', '@import "tailwindcss";\n', 'utf8');
