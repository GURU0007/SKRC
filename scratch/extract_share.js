const fs = require('fs');

const path = "C:\\Users\\gurus\\.gemini\\antigravity-cli\\brain\\e41ed9a6-bc29-47cb-ac40-8d64de73995a\\.system_generated\\steps\\3229\\content.md";

if (!fs.existsSync(path)) {
  console.log("File does not exist: " + path);
  process.exit(1);
}

const html = fs.readFileSync(path, 'utf8');

console.log("Searching HTML content...");
// Let's search for "nav" or "mobile" or "icon" or "desktop"
const regex = /sri|nav|mobile|icon|desktop/gi;
let match;
const printed = new Set();

while ((match = regex.exec(html)) !== null) {
  const start = Math.max(0, match.index - 300);
  const end = Math.min(html.length, match.index + 300);
  const chunk = html.substring(start, end);
  
  // Clean up whitespace to make it readable
  const cleanChunk = chunk.replace(/\s+/g, ' ').substring(0, 400);
  
  if (!printed.has(cleanChunk)) {
    console.log(`Match at index ${match.index}:`);
    console.log(cleanChunk);
    console.log("-".repeat(50));
    printed.add(cleanChunk);
  }
  
  if (printed.size > 20) {
    console.log("Too many matches, stopping.");
    break;
  }
}
