// fix-imports.js
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Get current directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Files with Button import issues
const filesToFix = [
  'src/components/layout/Header.tsx',
  'src/components/ui/EmailCaptureCard.tsx',
  'src/components/ui/ResultsCard.tsx',
  'src/components/ui/ToolCard.tsx'
];

// Process each file
filesToFix.forEach(filePath => {
  console.log(`Processing ${filePath}...`);
  
  try {
    const fullPath = path.resolve(process.cwd(), filePath);
    const content = fs.readFileSync(fullPath, 'utf8');
    
    // Check if file exists
    if (!content) {
      console.error(`File not found: ${filePath}`);
      return;
    }
    
    // Replace any incorrect Button import with the correct one
    const newContent = content.replace(
      /import\s+(?:{\s*Button\s*}|\s*Button\s*)\s+from\s+["'](?!@\/components\/ui\/button).*["']/g,
      'import { Button } from "@/components/ui/button"'
    );
    
    // Write the file only if changes were made
    if (content !== newContent) {
      fs.writeFileSync(fullPath, newContent, 'utf8');
      console.log(`✅ Fixed Button import in ${filePath}`);
    } else {
      console.log(`✓ No changes needed in ${filePath}`);
    }
  } catch (error) {
    console.error(`Error processing ${filePath}:`, error);
  }
});

console.log('Import fix script completed.');
