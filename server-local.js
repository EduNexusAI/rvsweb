const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 3001;

const server = http.createServer((req, res) => {
  let filePath = req.url === '/' ? '/index.html' : req.url;
  filePath = path.join(__dirname, filePath);

  // Security: prevent directory traversal
  const realPath = fs.realpathSync(__dirname);
  const requestPath = fs.realpathSync(path.dirname(filePath) + path.sep + path.basename(filePath));
  if (!requestPath.startsWith(realPath)) {
    res.writeHead(403, { 'Content-Type': 'text/plain' });
    res.end('Forbidden');
    return;
  }

  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.writeHead(404, { 'Content-Type': 'text/html' });
      res.end('<h1>404 - Page Not Found</h1>');
      return;
    }

    // Set content type
    let contentType = 'text/html';
    const ext = path.extname(filePath);
    switch (ext) {
      case '.css': contentType = 'text/css'; break;
      case '.js': contentType = 'application/javascript'; break;
      case '.json': contentType = 'application/json'; break;
      case '.jpg':
      case '.jpeg': contentType = 'image/jpeg'; break;
      case '.png': contentType = 'image/png'; break;
      case '.gif': contentType = 'image/gif'; break;
      case '.svg': contentType = 'image/svg+xml'; break;
      case '.woff': contentType = 'font/woff'; break;
      case '.woff2': contentType = 'font/woff2'; break;
    }

    res.writeHead(200, { 'Content-Type': contentType });
    res.end(data);
  });
});

server.listen(PORT, () => {
  console.log(`
╔════════════════════════════════════════════╗
║  ReViSense.AI Website is running on:        ║
║  🚀 http://localhost:${PORT}                   ║
╚════════════════════════════════════════════╝
  `);
});
