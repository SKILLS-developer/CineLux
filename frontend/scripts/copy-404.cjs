const fs = require("node:fs");
const path = require("node:path");

const distDir = path.resolve(__dirname, "..", "dist");
const indexPath = path.join(distDir, "index.html");
const notFoundPath = path.join(distDir, "404.html");

if (!fs.existsSync(indexPath)) {
  console.error("Missing dist/index.html. Run npm run build before deploy.");
  process.exit(1);
}

fs.copyFileSync(indexPath, notFoundPath);
console.log("Created dist/404.html for GitHub Pages SPA fallback.");
