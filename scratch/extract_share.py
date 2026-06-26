import re
import json

path = r"C:\Users\gurus\.gemini\antigravity-cli\brain\e41ed9a6-bc29-47cb-ac40-8d64de73995a\.system_generated\steps\3229\content.md"

with open(path, "r", encoding="utf-8") as f:
    html = f.read()

# Let's search for JSON data in script tags
# Usually, WIZ data or Bard initialization data is in JS variables.
# Let's search for strings matching common patterns or just search for anything containing "nav" or "mobile"

# Let's search for any strings that mention srikrishnarealestate or show nav styles
print("Searching for keywords...")
for m in re.finditer(r"sri|nav|mobile|icon|desktop", html, re.I):
    start = max(0, m.start() - 200)
    end = min(len(html), m.end() + 200)
    print(f"Match at {m.start()}: {html[start:end]}\n" + "-"*50)
