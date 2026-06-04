const http = require('http');
const fs = require('fs');
const path = require('path');
const os = require('os');

const PORT = process.env.PORT || 3000;
const DATA_FILE = path.join(__dirname, 'data.json');
const PUBLIC_DIR = __dirname;

// Initialize
let dataCache = { products: [], records: [], version: 0 };
if (fs.existsSync(DATA_FILE)) {
  try {
    dataCache = JSON.parse(fs.readFileSync(DATA_FILE, 'utf8'));
    if (!dataCache.version) dataCache.version = 0;
  } catch (e) {
    console.log('数据文件损坏，重置');
  }
} else {
  fs.writeFileSync(DATA_FILE, JSON.stringify(dataCache, null, 2));
}

function saveToDisk(newData) {
  if (typeof newData.version === 'undefined') newData.version = 0;
  newData.version++;
  if (!newData.products) newData.products = [];
  if (!newData.records) newData.records = [];
  dataCache = newData;
  fs.writeFileSync(DATA_FILE, JSON.stringify({ products: newData.products, records: newData.records, version: newData.version }, null, 2));
}

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.css': 'text/css',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon'
};

const server = http.createServer((req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.writeHead(200);
    res.end();
    return;
  }

  // ===== API =====
  if (req.url === '/api/data' && req.method === 'GET') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(dataCache));
    return;
  }

  if (req.url === '/api/data' && req.method === 'POST') {
    let body = '';
    req.on('data', chunk => body += chunk);
    req.on('end', () => {
      try {
        const newData = JSON.parse(body);
        saveToDisk(newData);
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ ok: true, version: dataCache.version }));
      } catch (e) {
        res.writeHead(400);
        res.end(JSON.stringify({ error: e.message }));
      }
    });
    return;
  }

  if (req.url === '/api/info' && req.method === 'GET') {
    const networks = os.networkInterfaces();
    const ips = [];
    for (const name of Object.keys(networks)) {
      for (const iface of networks[name]) {
        if (iface.family === 'IPv4' && !iface.internal) ips.push(iface.address);
      }
    }
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ server: require('os').hostname(), ips, version: dataCache.version }));
    return;
  }

  // ===== Static files =====
  let filePath = req.url === '/' ? path.join(PUBLIC_DIR, 'index.html') : path.join(PUBLIC_DIR, req.url);
  const ext = path.extname(filePath);

  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' });
      res.end('<h2>404 - 文件未找到</h2>');
      return;
    }
    res.writeHead(200, { 'Content-Type': MIME[ext] || 'application/octet-stream' });
    res.end(data);
  });
});

server.listen(PORT, '0.0.0.0', () => {
  const networks = os.networkInterfaces();
  const ips = [];
  for (const name of Object.keys(networks)) {
    for (const iface of networks[name]) {
      if (iface.family === 'IPv4' && !iface.internal) ips.push(iface.address);
    }
  }

  console.log('');
  console.log('  =========================================');
  console.log('    📦 管材库存管理 - 多设备同步');
  console.log('  =========================================');
  console.log('');
  console.log('    本机:    http://localhost:' + PORT);
  ips.forEach(ip => {
    console.log('    手机:    http://' + ip + ':' + PORT);
  });
  console.log('');
  console.log('  所有设备打开相同地址，数据自动同步');
  console.log('  =========================================');
  console.log('');
});
