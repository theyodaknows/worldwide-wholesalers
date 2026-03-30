// scripts/generate-og.js
// Generates public/og-image.png (1200x630)
// Run: node scripts/generate-og.js
// Uses ONLY Node.js built-ins: fs, path, zlib
'use strict';

const fs = require('fs');
const path = require('path');
const zlib = require('zlib');

const WIDTH = 1200;
const HEIGHT = 630;

const BG    = [0x0d, 0x0d, 0x0d];
const GREEN = [0x3d, 0xb3, 0x4a];

const crcTable = (() => {
  const t = new Uint32Array(256);
  for (let n = 0; n < 256; n++) {
    let c = n;
    for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
    t[n] = c;
  }
  return t;
})();

function crc32(buf) {
  let crc = 0xffffffff;
  for (let i = 0; i < buf.length; i++) crc = crcTable[(crc ^ buf[i]) & 0xff] ^ (crc >>> 8);
  return (crc ^ 0xffffffff) >>> 0;
}

function chunk(type, data) {
  const typeBytes = Buffer.from(type, 'ascii');
  const len = Buffer.alloc(4); len.writeUInt32BE(data.length);
  const crcInput = Buffer.concat([typeBytes, data]);
  const crcBuf = Buffer.alloc(4); crcBuf.writeUInt32BE(crc32(crcInput));
  return Buffer.concat([len, typeBytes, data, crcBuf]);
}

const rowSize = 1 + WIDTH * 3;
const raw = Buffer.alloc(HEIGHT * rowSize, 0);

function setPixel(x, y, color) {
  if (x < 0 || x >= WIDTH || y < 0 || y >= HEIGHT) return;
  const offset = y * rowSize + 1 + x * 3;
  raw[offset]     = color[0];
  raw[offset + 1] = color[1];
  raw[offset + 2] = color[2];
}

function fillRect(x1, y1, x2, y2, color) {
  for (let y = y1; y < y2; y++)
    for (let x = x1; x < x2; x++)
      setPixel(x, y, color);
}

fillRect(0, 0, WIDTH, HEIGHT, BG);
fillRect(0, 560, WIDTH, HEIGHT, GREEN);
fillRect(0, 0, 10, HEIGHT, GREEN);
fillRect(480, 200, 720, 300, GREEN);
fillRect(480, 340, 720, 348, GREEN);
fillRect(480, 360, 600, 368, GREEN);

const compressed = zlib.deflateSync(raw, { level: 9 });

const signature = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]);
const ihdrData = Buffer.alloc(13);
ihdrData.writeUInt32BE(WIDTH, 0);
ihdrData.writeUInt32BE(HEIGHT, 4);
ihdrData[8] = 8;
ihdrData[9] = 2;
ihdrData[10] = 0;
ihdrData[11] = 0;
ihdrData[12] = 0;

const png = Buffer.concat([
  signature,
  chunk('IHDR', ihdrData),
  chunk('IDAT', compressed),
  chunk('IEND', Buffer.alloc(0)),
]);

const outPath = path.join(__dirname, '..', 'public', 'og-image.png');
fs.writeFileSync(outPath, png);
console.log(`Written: ${outPath} (${png.length} bytes)`);
