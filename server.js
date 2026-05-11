import http from "node:http";
import { readFileSync } from "node:fs";

const port = Number(process.env.PORT || 3000);
const marker = readFileSync(new URL("./version.txt", import.meta.url), "utf8").trim();

const server = http.createServer((request, response) => {
  if (request.url === "/health") {
    response.writeHead(200, { "content-type": "application/json; charset=utf-8" });
    response.end(JSON.stringify({ ok: true, marker }));
    return;
  }

  response.writeHead(200, { "content-type": "text/plain; charset=utf-8" });
  response.end(`dokploy-auto-deploy-smoke\nmarker=${marker}\n`);
});

server.listen(port, "0.0.0.0", () => {
  console.log(`listening on ${port} marker=${marker}`);
});
