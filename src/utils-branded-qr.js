import QRCode from 'qrcode';

const GREEN = '#086b2d';
const DARK = '#071a16';
const WHITE = '#ffffff';
const SIZE = 1600;
const QR_X = 180;
const QR_Y = 90;
const QR_SIZE = 1240;
const CTA_Y = 1380;
const CTA_H = 130;
const LOGO_SIZE = 360;

function roundedRect(ctx, x, y, w, h, r) {
  const radius = Math.min(r, w / 2, h / 2);
  ctx.beginPath();
  ctx.moveTo(x + radius, y);
  ctx.arcTo(x + w, y, x + w, y + h, radius);
  ctx.arcTo(x + w, y + h, x, y + h, radius);
  ctx.arcTo(x, y + h, x, y, radius);
  ctx.arcTo(x, y, x + w, y, radius);
  ctx.closePath();
}

function isFinderCell(row, col, count) {
  return (row < 7 && col < 7) || (row < 7 && col >= count - 7) || (row >= count - 7 && col < 7);
}

function drawFinderCanvas(ctx, x, y, module) {
  const outer = module * 7;
  roundedRect(ctx, x, y, outer, outer, module * 1.2);
  ctx.fillStyle = GREEN;
  ctx.fill();
  roundedRect(ctx, x + module, y + module, module * 5, module * 5, module * 0.75);
  ctx.fillStyle = WHITE;
  ctx.fill();
  roundedRect(ctx, x + module * 2, y + module * 2, module * 3, module * 3, module * 0.55);
  ctx.fillStyle = DARK;
  ctx.fill();
}

function loadImage(src) {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.onload = () => resolve(image);
    image.onerror = reject;
    image.src = src;
  });
}

function drawContained(ctx, image, x, y, w, h) {
  const scale = Math.min(w / image.width, h / image.height);
  const dw = image.width * scale;
  const dh = image.height * scale;
  ctx.drawImage(image, x + (w - dw) / 2, y + (h - dh) / 2, dw, dh);
}

export async function createBrandedQrPng(url, { logoUrl = '/brand/logo-qr.png' } = {}) {
  const qr = QRCode.create(url, { errorCorrectionLevel: 'H' });
  const count = qr.modules.size;
  const quiet = 3;
  const module = QR_SIZE / (count + quiet * 2);
  const offsetX = QR_X + quiet * module;
  const offsetY = QR_Y + quiet * module;
  const canvas = document.createElement('canvas');
  canvas.width = SIZE;
  canvas.height = SIZE;
  const ctx = canvas.getContext('2d');

  ctx.fillStyle = WHITE;
  ctx.fillRect(0, 0, SIZE, SIZE);
  roundedRect(ctx, 30, 30, SIZE - 60, SIZE - 60, 48);
  ctx.strokeStyle = GREEN;
  ctx.lineWidth = 22;
  ctx.stroke();

  for (let row = 0; row < count; row += 1) {
    for (let col = 0; col < count; col += 1) {
      if (!qr.modules.get(row, col) || isFinderCell(row, col, count)) continue;
      const x = offsetX + col * module;
      const y = offsetY + row * module;
      roundedRect(ctx, x + module * 0.14, y + module * 0.14, module * 0.72, module * 0.72, module * 0.18);
      ctx.fillStyle = DARK;
      ctx.fill();
    }
  }

  drawFinderCanvas(ctx, offsetX, offsetY, module);
  drawFinderCanvas(ctx, offsetX + (count - 7) * module, offsetY, module);
  drawFinderCanvas(ctx, offsetX, offsetY + (count - 7) * module, module);

  const cx = SIZE / 2;
  const cy = 735;
  ctx.beginPath();
  ctx.arc(cx, cy, LOGO_SIZE / 2 + 22, 0, Math.PI * 2);
  ctx.fillStyle = WHITE;
  ctx.fill();
  ctx.lineWidth = 10;
  ctx.strokeStyle = GREEN;
  ctx.stroke();
  const logo = await loadImage(logoUrl);
  ctx.save();
  ctx.beginPath();
  ctx.arc(cx, cy, LOGO_SIZE / 2 - 8, 0, Math.PI * 2);
  ctx.clip();
  drawContained(ctx, logo, cx - LOGO_SIZE / 2, cy - LOGO_SIZE / 2, LOGO_SIZE, LOGO_SIZE);
  ctx.restore();

  roundedRect(ctx, 75, CTA_Y, SIZE - 150, CTA_H, 54);
  ctx.fillStyle = GREEN;
  ctx.fill();
  ctx.beginPath();
  ctx.arc(165, CTA_Y + CTA_H / 2, 50, 0, Math.PI * 2);
  ctx.fillStyle = WHITE;
  ctx.fill();
  ctx.strokeStyle = GREEN;
  ctx.lineWidth = 8;
  roundedRect(ctx, 145, CTA_Y + 34, 40, 76, 7);
  ctx.stroke();
  ctx.beginPath();
  ctx.arc(165, CTA_Y + 99, 4, 0, Math.PI * 2);
  ctx.fillStyle = GREEN;
  ctx.fill();

  ctx.fillStyle = WHITE;
  ctx.textAlign = 'left';
  ctx.font = '700 66px Arial, sans-serif';
  ctx.fillText('ESCANEA Y DESCUBRE', 245, CTA_Y + 68);
  ctx.font = '600 28px Arial, sans-serif';
  ctx.fillText('CÓMO MONTAR TU SIMULADOR DE GOLF EN CASA', 245, CTA_Y + 112);

  return canvas.toDataURL('image/png');
}

async function imageAsDataUrl(url) {
  const response = await fetch(url);
  const blob = await response.blob();
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
}

function esc(value) {
  return String(value).replace(/[&<>\"']/g, (char) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&apos;' }[char]));
}

export async function createBrandedQrSvg(url, { logoUrl = '/brand/logo-qr.png' } = {}) {
  const qr = QRCode.create(url, { errorCorrectionLevel: 'H' });
  const count = qr.modules.size;
  const quiet = 3;
  const module = QR_SIZE / (count + quiet * 2);
  const offsetX = QR_X + quiet * module;
  const offsetY = QR_Y + quiet * module;
  const parts = [];

  for (let row = 0; row < count; row += 1) {
    for (let col = 0; col < count; col += 1) {
      if (!qr.modules.get(row, col) || isFinderCell(row, col, count)) continue;
      const x = offsetX + col * module + module * 0.14;
      const y = offsetY + row * module + module * 0.14;
      parts.push(`<rect x="${x.toFixed(2)}" y="${y.toFixed(2)}" width="${(module * 0.72).toFixed(2)}" height="${(module * 0.72).toFixed(2)}" rx="${(module * 0.18).toFixed(2)}" fill="${DARK}"/>`);
    }
  }

  const finder = (x, y) => `<rect x="${x}" y="${y}" width="${module * 7}" height="${module * 7}" rx="${module * 1.2}" fill="${GREEN}"/><rect x="${x + module}" y="${y + module}" width="${module * 5}" height="${module * 5}" rx="${module * .75}" fill="#fff"/><rect x="${x + module * 2}" y="${y + module * 2}" width="${module * 3}" height="${module * 3}" rx="${module * .55}" fill="${DARK}"/>`;
  const logoData = await imageAsDataUrl(logoUrl);
  const cx = SIZE / 2;
  const cy = 735;
  const logoX = cx - LOGO_SIZE / 2;
  const logoY = cy - LOGO_SIZE / 2;

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${SIZE}" height="${SIZE}" viewBox="0 0 ${SIZE} ${SIZE}">
  <rect width="1600" height="1600" fill="#fff"/>
  <rect x="30" y="30" width="1540" height="1540" rx="48" fill="none" stroke="${GREEN}" stroke-width="22"/>
  ${parts.join('')}
  ${finder(offsetX, offsetY)}
  ${finder(offsetX + (count - 7) * module, offsetY)}
  ${finder(offsetX, offsetY + (count - 7) * module)}
  <circle cx="${cx}" cy="${cy}" r="${LOGO_SIZE / 2 + 22}" fill="#fff" stroke="${GREEN}" stroke-width="10"/>
  <clipPath id="logoClip"><circle cx="${cx}" cy="${cy}" r="${LOGO_SIZE / 2 - 8}"/></clipPath>
  <image href="${esc(logoData)}" x="${logoX}" y="${logoY}" width="${LOGO_SIZE}" height="${LOGO_SIZE}" preserveAspectRatio="xMidYMid meet" clip-path="url(#logoClip)"/>
  <rect x="75" y="${CTA_Y}" width="1450" height="${CTA_H}" rx="54" fill="${GREEN}"/>
  <circle cx="165" cy="${CTA_Y + CTA_H / 2}" r="50" fill="#fff"/>
  <rect x="145" y="${CTA_Y + 34}" width="40" height="76" rx="7" fill="none" stroke="${GREEN}" stroke-width="8"/>
  <circle cx="165" cy="${CTA_Y + 99}" r="4" fill="${GREEN}"/>
  <text x="245" y="${CTA_Y + 68}" fill="#fff" font-family="Arial, sans-serif" font-size="66" font-weight="700">ESCANEA Y DESCUBRE</text>
  <text x="245" y="${CTA_Y + 112}" fill="#fff" font-family="Arial, sans-serif" font-size="28" font-weight="600">CÓMO MONTAR TU SIMULADOR DE GOLF EN CASA</text>
</svg>`;
}
