const fs = require("fs");
const path = require("path");

const excludeDirs = [
  "node_modules",
  ".git",
  "dist",
  "build",
  ".next",
  "coverage",
  ".cache",
];
const excludeFiles = [".env", "package-lock.json", "yarn.lock", ".DS_Store"];

function formatSize(bytes) {
  if (bytes === 0) return "0 B";
  const sizes = ["B", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(1024));
  return `${(bytes / Math.pow(1024, i)).toFixed(2)} ${sizes[i]}`;
}

function shouldExclude(name, isDir) {
  if (isDir) return excludeDirs.includes(name);
  return excludeFiles.includes(name) || name.endsWith(".log");
}

function printTree(dir, prefix = "", isLast = true) {
  let items;
  try {
    items = fs.readdirSync(dir);
  } catch (err) {
    return;
  }

  const filtered = items
    .filter((item) => {
      const itemPath = path.join(dir, item);
      const isDir = fs.statSync(itemPath).isDirectory();
      return !shouldExclude(item, isDir);
    })
    .sort((a, b) => {
      const aIsDir = fs.statSync(path.join(dir, a)).isDirectory();
      const bIsDir = fs.statSync(path.join(dir, b)).isDirectory();
      if (aIsDir && !bIsDir) return -1;
      if (!aIsDir && bIsDir) return 1;
      return a.localeCompare(b);
    });

  filtered.forEach((item, index) => {
    const itemPath = path.join(dir, item);
    const isLastItem = index === filtered.length - 1;
    const stats = fs.statSync(itemPath);
    const isDir = stats.isDirectory();

    const connector = isLastItem ? "└── " : "├── ";
    const newPrefix = prefix + (isLastItem ? "    " : "│   ");

    if (isDir) {
      console.log(`${prefix}${connector}📁 ${item}/`);
      printTree(itemPath, newPrefix, isLastItem);
    } else {
      const size = formatSize(stats.size);
      console.log(`${prefix}${connector}📄 ${item} (${size})`);
    }
  });
}

console.log("\x1b[36m%s\x1b[0m", "📁 Project Structure");
console.log("\x1b[33m%s\x1b[0m", "═══════════════════════════════════════");
console.log("");
printTree(process.cwd());
