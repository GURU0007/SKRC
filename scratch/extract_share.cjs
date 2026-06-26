const fs = require('fs');
const html = fs.readFileSync("C:\\Users\\gurus\\.gemini\\antigravity-cli\\brain\\e41ed9a6-bc29-47cb-ac40-8d64de73995a\\.system_generated\\steps\\3229\\content.md", 'utf8');

console.log("Searching for large variables or script content...");
// Let's find script blocks
const scriptRegex = /<script[^>]*>([\s\S]*?)<\/script>/gi;
let match;
let count = 0;
while ((match = scriptRegex.exec(html)) !== null) {
  const content = match[1].trim();
  if (content.length > 500) {
    console.log(`Script block ${count} has length ${content.length}`);
    // Check if it has any variable name
    const vars = content.match(/(?:window\.)?([a-zA-Z0-9_$]+)\s*=\s*/g);
    if (vars) {
      console.log("Variables defined:", vars.join(', '));
    }
    // Write first 500 chars
    console.log("Snippet:", content.substring(0, 300).replace(/\s+/g, ' '));
    fs.writeFileSync(`scratch/large_script_${count}.js`, content);
    console.log("Wrote script block to scratch/large_script_" + count + ".js");
    console.log("-".repeat(50));
    count++;
  }
}
