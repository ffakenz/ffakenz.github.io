import { createServer } from "node:http";
import { readFile, stat } from "node:fs/promises";
import { join, extname, normalize } from "node:path";

const root = new URL("../out/", import.meta.url).pathname;
const port = 4173;
const types = { ".html": "text/html", ".js": "text/javascript", ".css": "text/css", ".svg": "image/svg+xml", ".png": "image/png", ".pdf": "application/pdf", ".json": "application/json", ".woff2": "font/woff2", ".ico": "image/x-icon", ".txt": "text/plain" };

createServer(async (req, res) => {
  try {
    const p = normalize(decodeURIComponent((req.url || "/").split("?")[0]));
    let file = join(root, p);
    let s = await stat(file).catch(() => null);
    if (s && s.isDirectory()) { file = join(file, "index.html"); s = await stat(file).catch(() => null); }
    if (!s) { const alt = file.endsWith(".html") ? file : file + ".html"; s = await stat(alt).catch(() => null); if (s) file = alt; }
    if (!s) { res.writeHead(404); res.end("Not found"); return; }
    const body = await readFile(file);
    res.writeHead(200, { "content-type": types[extname(file)] || "application/octet-stream" });
    res.end(body);
  } catch { res.writeHead(500); res.end("Error"); }
}).listen(port, () => console.log(`serving out/ on http://localhost:${port}`));
