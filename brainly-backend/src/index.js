import http from 'http';
import https from 'https';
import app from './app.js';
let PORT = process.env.PORT || 5000;

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

let server;
try {
  const keyPath = path.resolve(__dirname, '../server.key');
  const certPath = path.resolve(__dirname, '../server.crt');
  const serverOptions = {
    key: fs.readFileSync(keyPath),
    cert: fs.readFileSync(certPath)
  };
  server = https.createServer(serverOptions, app);
  console.log('HTTPS server started.');
} catch (err) {
  console.error('HTTPS error:', err.message);
  console.warn('HTTPS certs not found or invalid, falling back to HTTP.');
  server = http.createServer(app);
}




server.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT} 🚀...`);
})