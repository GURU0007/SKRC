const fs = require('fs');
const html = fs.readFileSync("C:\\Users\\gurus\\.gemini\\antigravity-cli\\brain\\e41ed9a6-bc29-47cb-ac40-8d64de73995a\\.system_generated\\steps\\3229\\content.md", 'utf8');

console.log("File length:", html.length);
// Let's search for keywords that would appear in a shared conversation:
// The user says: "so use this format for mobile and web remian unchanged i mean don't move nav bar down just add icons for it in desktop but cahnge it to mobile frindly for mobile"
// This format could be: bottom navbar, tab icons, mobile friendly menu, etc.
// Let's search if the HTML file contains ANY of: "UOhpoZtieq3e", "srikrishnarealestate", "navbar", "Home", "Marketplace"

const searchWords = ["UOhpoZtieq3e", "srikrishnarealestate", "navbar", "marketplace", "estimator"];
for (const word of searchWords) {
  const count = (html.match(new RegExp(word, "gi")) || []).length;
  console.log(`Word '${word}' found ${count} times`);
}
