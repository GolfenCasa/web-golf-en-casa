import QRCode from 'qrcode';

const GREEN = '#08752f';
const DARK = '#041914';
const WHITE = '#ffffff';
const SIZE = 1600;
const FRAME = 24;
const QR_X = 112;
const QR_Y = 72;
const QR_SIZE = 1376;
const CTA_X = 66;
const CTA_Y = 1402;
const CTA_W = 1468;
const CTA_H = 128;
const LOGO_W = 470;
const LOGO_H = 445;

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
  roundedRect(ctx, x, y, outer, outer, module * 1.15);
  ctx.fillStyle = GREEN;
  ctx.fill();
  roundedRect(ctx, x + module, y + module, module * 5, module * 5, module * 0.72);
  ctx.fillStyle = WHITE;
  ctx.fill();
  roundedRect(ctx, x + module * 2, y + module * 2, module * 3, module * 3, module * 0.5);
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

function getGeometry(qr) {
  const count = qr.modules.size;
  const quiet = 1;
  const module = QR_SIZE / (count + quiet * 2);
  return {
    count,
    quiet,
    module,
    offsetX: QR_X + quiet * module,
    offsetY: QR_Y + quiet * module,
  };
}

function drawPhoneIcon(ctx) {
  const centerY = CTA_Y + CTA_H / 2;
  ctx.beginPath();
  ctx.arc(153, centerY, 49, 0, Math.PI * 2);
  ctx.fillStyle = WHITE;
  ctx.fill();
  ctx.strokeStyle = GREEN;
  ctx.lineWidth = 7;
  roundedRect(ctx, 135, centerY - 39, 36, 76, 7);
  ctx.stroke();
  ctx.beginPath();
  ctx.arc(153, centerY + 27, 4, 0, Math.PI * 2);
  ctx.fillStyle = GREEN;
  ctx.fill();
}

function drawLogoPanelCanvas(ctx, logo) {
  const cx = SIZE / 2;
  const cy = 760;
  const panelW = LOGO_W + 34;
  const panelH = LOGO_H + 34;
  roundedRect(ctx, cx - panelW / 2, cy - panelH / 2, panelW, panelH, 245);
  ctx.fillStyle = WHITE;
  ctx.fill();
  ctx.lineWidth = 9;
  ctx.strokeStyle = GREEN;
  ctx.stroke();
  drawContained(ctx, logo, cx - LOGO_W / 2, cy - LOGO_H / 2, LOGO_W, LOGO_H);
}

export async function createBrandedQrPng(url, { logoUrl = '/brand/logo-qr.png' } = {}) {
  const qr = QRCode.create(url, { errorCorrectionLevel: 'H' });
  const { count, module, offsetX, offsetY } = getGeometry(qr);
  const canvas = document.createElement('canvas');
  canvas.width = SIZE;
  canvas.height = SIZE;
  const ctx = canvas.getContext('2d');

  ctx.fillStyle = WHITE;
  ctx.fillRect(0, 0, SIZE, SIZE);
  roundedRect(ctx, FRAME, FRAME, SIZE - FRAME * 2, SIZE - FRAME * 2, 52);
  ctx.strokeStyle = GREEN;
  ctx.lineWidth = 18;
  ctx.stroke();

  for (let row = 0; row < count; row += 1) {
    for (let col = 0; col < count; col += 1) {
      if (!qr.modules.get(row, col) || isFinderCell(row, col, count)) continue;
      const x = offsetX + col * module;
      const y = offsetY + row * module;
      roundedRect(ctx, x + module * 0.12, y + module * 0.12, module * 0.76, module * 0.76, module * 0.2);
      ctx.fillStyle = DARK;
      ctx.fill();
    }
  }

  drawFinderCanvas(ctx, offsetX, offsetY, module);
  drawFinderCanvas(ctx, offsetX + (count - 7) * module, offsetY, module);
  drawFinderCanvas(ctx, offsetX, offsetY + (count - 7) * module, module);

  const logo = await loadImage(logoUrl);
  drawLogoPanelCanvas(ctx, logo);

  roundedRect(ctx, CTA_X, CTA_Y, CTA_W, CTA_H, 58);
  ctx.fillStyle = GREEN;
  ctx.fill();
  drawPhoneIcon(ctx);

  ctx.fillStyle = WHITE;
  ctx.textAlign = 'left';
  ctx.font = '700 66px Arial, sans-serif';
  ctx.fillText('ESCANEA Y DESCUBRE', 225, CTA_Y + 67);
  ctx.font = '600 28px Arial, sans-serif';
  ctx.fillText('CÓMO MONTAR TU SIMULADOR DE GOLF EN CASA', 225, CTA_Y + 108);

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
  return String(value).replace(/[&<>"']/g, (char) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&apos;' }[char]));
}

export async function createBrandedQrSvg(url, { logoUrl = '/brand/logo-qr.png' } = {}) {
  const qr = QRCode.create(url, { errorCorrectionLevel: 'H' });
  const { count, module, offsetX, offsetY } = getGeometry(qr);
  const parts = [];

  for (let row = 0; row < count; row += 1) {
    for (let col = 0; col < count; col += 1) {
      if (!qr.modules.get(row, col) || isFinderCell(row, col, count)) continue;
      const x = offsetX + col * module + module * 0.12;
      const y = offsetY + row * module + module * 0.12;
      parts.push(`<rect x="${x.toFixed(2)}" y="${y.toFixed(2)}" width="${(module * 0.76).toFixed(2)}" height="${(module * 0.76).toFixed(2)}" rx="${(module * 0.2).toFixed(2)}" fill="${DARK}"/>`);
    }
  }

  const finder = (x, y) => `<rect x="${x}" y="${y}" width="${module * 7}" height="${module * 7}" rx="${module * 1.15}" fill="${GREEN}"/><rect x="${x + module}" y="${y + module}" width="${module * 5}" height="${module * 5}" rx="${module * .72}" fill="#fff"/><rect x="${x + module * 2}" y="${y + module * 2}" width="${module * 3}" height="${module * 3}" rx="${module * .5}" fill="${DARK}"/>`;
  const logoData = await imageAsDataUrl(logoUrl);
  const cx = SIZE / 2;
  const cy = 760;
  const panelW = LOGO_W + 34;
  const panelH = LOGO_H + 34;
  const logoX = cx - LOGO_W / 2;
  const logoY = cy - LOGO_H / 2;
  const centerY = CTA_Y + CTA_H / 2;

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${SIZE}" height="${SIZE}" viewBox="0 0 ${SIZE} ${SIZE}">
  <rect width="${SIZE}" height="${SIZE}" fill="#fff"/>
  <rect x="${FRAME}" y="${FRAME}" width="${SIZE - FRAME * 2}" height="${SIZE - FRAME * 2}" rx="52" fill="none" stroke="${GREEN}" stroke-width="18"/>
  ${parts.join('')}
  ${finder(offsetX, offsetY)}
  ${finder(offsetX + (count - 7) * module, offsetY)}
  ${finder(offsetX, offsetY + (count - 7) * module)}
  <rect x="${cx - panelW / 2}" y="${cy - panelH / 2}" width="${panelW}" height="${panelH}" rx="245" fill="#fff" stroke="${GREEN}" stroke-width="9"/>
  <image href="${esc(logoData)}" x="${logoX}" y="${logoY}" width="${LOGO_W}" height="${LOGO_H}" preserveAspectRatio="xMidYMid meet"/>
  <rect x="${CTA_X}" y="${CTA_Y}" width="${CTA_W}" height="${CTA_H}" rx="58" fill="${GREEN}"/>
  <circle cx="153" cy="${centerY}" r="49" fill="#fff"/>
  <rect x="135" y="${centerY - 39}" width="36" height="76" rx="7" fill="none" stroke="${GREEN}" stroke-width="7"/>
  <circle cx="153" cy="${centerY + 27}" r="4" fill="${GREEN}"/>
  <text x="225" y="${CTA_Y + 67}" fill="#fff" font-family="Arial, sans-serif" font-size="66" font-weight="700">ESCANEA Y DESCUBRE</text>
  <text x="225" y="${CTA_Y + 108}" fill="#fff" font-family="Arial, sans-serif" font-size="28" font-weight="600">CÓMO MONTAR TU SIMULADOR DE GOLF EN CASA</text>
</svg>`;
}

// -----------------------------------------------------------------------------
// QR FÍSICO PARA MARCADOR / LLAVERO 3D
// -----------------------------------------------------------------------------


const TOKEN_DEFAULTS = {
  diameterMm: 40,
  qrAreaMm: 30,
  keychainHoleMm: 0,
  errorCorrectionLevel: 'Q',
  dark: '#041914',
};

function clampNumber(value, min, max, fallback) {
  const parsed = Number(value);
  if (!Number.isFinite(parsed)) return fallback;
  return Math.min(max, Math.max(min, parsed));
}

function normalizeTokenOptions(options = {}) {
  const diameterMm = clampNumber(options.diameterMm, 32, 50, TOKEN_DEFAULTS.diameterMm);
  const maxQr = Math.max(20, diameterMm - 7);
  const qrAreaMm = clampNumber(options.qrAreaMm, 20, maxQr, Math.min(TOKEN_DEFAULTS.qrAreaMm, maxQr));
  const keychainHoleMm = clampNumber(options.keychainHoleMm, 0, 6, TOKEN_DEFAULTS.keychainHoleMm);
  const errorCorrectionLevel = ['M', 'Q', 'H'].includes(options.errorCorrectionLevel)
    ? options.errorCorrectionLevel
    : TOKEN_DEFAULTS.errorCorrectionLevel;

  return {
    diameterMm,
    qrAreaMm,
    keychainHoleMm,
    errorCorrectionLevel,
    dark: options.dark || TOKEN_DEFAULTS.dark,
  };
}

export function getPhysicalQrMetrics(url, options = {}) {
  const normalized = normalizeTokenOptions(options);
  const qr = QRCode.create(url, { errorCorrectionLevel: normalized.errorCorrectionLevel });
  const count = qr.modules.size;
  const quietModules = 4;
  const totalModules = count + quietModules * 2;
  const moduleMm = normalized.qrAreaMm / totalModules;

  let rating = 'Excelente';
  let ratingKey = 'excellent';
  if (moduleMm < 0.55) {
    rating = 'Arriesgado: aumenta el área QR';
    ratingKey = 'risky';
  } else if (moduleMm < 0.65) {
    rating = 'Correcto: imprime una prueba';
    ratingKey = 'test';
  } else if (moduleMm < 0.75) {
    rating = 'Bueno';
    ratingKey = 'good';
  }

  return {
    ...normalized,
    count,
    quietModules,
    totalModules,
    moduleMm,
    rating,
    ratingKey,
  };
}

function qrCompoundPathSvg(qr, x0, y0, moduleMm, dark) {
  // Un único <path> SVG en lugar de cientos de <rect>.
  // Cada tramo horizontal continuo de módulos negros se convierte en
  // un subtrazado rectangular dentro del mismo elemento. Esto mantiene
  // exactamente la geometría del QR, pero Bambu Studio lo importa como
  // una sola pieza SVG en vez de crear una pieza por cada módulo.
  const subpaths = [];
  const count = qr.modules.size;

  for (let row = 0; row < count; row += 1) {
    let col = 0;
    while (col < count) {
      if (!qr.modules.get(row, col)) {
        col += 1;
        continue;
      }

      const startCol = col;
      while (col + 1 < count && qr.modules.get(row, col + 1)) col += 1;
      const endCol = col;

      const x = x0 + startCol * moduleMm;
      const y = y0 + row * moduleMm;
      const width = (endCol - startCol + 1) * moduleMm;
      const height = moduleMm;

      const x2 = x + width;
      const y2 = y + height;

      subpaths.push(
        `M${x.toFixed(4)} ${y.toFixed(4)}H${x2.toFixed(4)}V${y2.toFixed(4)}H${x.toFixed(4)}Z`
      );

      col += 1;
    }
  }

  return `<path fill="${esc(dark)}" fill-rule="nonzero" d="${subpaths.join('')}"/>`;
}

export function createPhysicalQrSvg(url, options = {}) {
  const metrics = getPhysicalQrMetrics(url, options);
  const qr = QRCode.create(url, { errorCorrectionLevel: metrics.errorCorrectionLevel });
  const quietMm = metrics.quietModules * metrics.moduleMm;
  const qrMatrixMm = metrics.count * metrics.moduleMm;
  const x0 = (metrics.diameterMm - qrMatrixMm) / 2;
  const y0 = (metrics.diameterMm - qrMatrixMm) / 2;

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${metrics.diameterMm}mm" height="${metrics.diameterMm}mm" viewBox="0 0 ${metrics.diameterMm} ${metrics.diameterMm}">
  <title>QR físico para marcador 3D</title>
  <desc>Geometría QR compuesta en un único path SVG. Módulo ${metrics.moduleMm.toFixed(3)} mm, corrección ${metrics.errorCorrectionLevel}, zona silenciosa ${quietMm.toFixed(3)} mm.</desc>
  ${qrCompoundPathSvg(qr, x0, y0, metrics.moduleMm, metrics.dark)}
</svg>`;
}

export function createTokenBaseSvg(options = {}) {
  const { diameterMm, keychainHoleMm } = normalizeTokenOptions(options);
  const r = diameterMm / 2;
  const holeR = keychainHoleMm / 2;
  const holeCx = r;
  const holeCy = keychainHoleMm > 0 ? 3.7 + holeR : 0;

  let geometry = `<circle cx="${r}" cy="${r}" r="${r}"/>`;
  if (keychainHoleMm > 0) {
    geometry = `<path fill-rule="evenodd" d="M ${r},0 A ${r},${r} 0 1 1 ${r},${diameterMm} A ${r},${r} 0 1 1 ${r},0 Z M ${holeCx},${holeCy - holeR} A ${holeR},${holeR} 0 1 0 ${holeCx},${holeCy + holeR} A ${holeR},${holeR} 0 1 0 ${holeCx},${holeCy - holeR} Z"/>`;
  }

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${diameterMm}mm" height="${diameterMm}mm" viewBox="0 0 ${diameterMm} ${diameterMm}">
  <title>Perfil base marcador 3D</title>
  <g fill="#111">${geometry}</g>
</svg>`;
}

function svgDataUrl(svg) {
  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
}

async function fetchSvgMarkup(url) {
  const response = await fetch(url);
  if (!response.ok) throw new Error(`No se pudo cargar el SVG del logo (${response.status})`);
  return response.text();
}

function extractInlineSvg(markup) {
  const viewBoxMatch = markup.match(/viewBox=["']([^"']+)["']/i);
  const bodyMatch = markup.match(/<svg[^>]*>([\s\S]*?)<\/svg>/i);
  if (!viewBoxMatch || !bodyMatch) throw new Error('SVG de logo no válido');

  const body = bodyMatch[1]
    .replace(/<metadata[\s\S]*?<\/metadata>/gi, '')
    .replace(/xlink:href=/gi, 'href=');

  return { viewBox: viewBoxMatch[1], body };
}

export async function createTokenLogoSvg(options = {}) {
  const normalized = normalizeTokenOptions(options);
  const logoUrl = options.logoUrl || '/brand/logo-token.svg';
  const markup = await fetchSvgMarkup(logoUrl);
  const { body } = extractInlineSvg(markup);
  return `<svg xmlns="http://www.w3.org/2000/svg"
    width="${normalized.diameterMm}mm"
    height="${normalized.diameterMm}mm"
    viewBox="0 0 1000 1000">
    <title>Logo Golf en Casa para marcador 3D</title>
    ${body}
  </svg>`;
}

export async function createPhysicalTokenPreview(url, options = {}) {
  const qrSvg = createPhysicalQrSvg(url, options);
  const logoSvg = await createTokenLogoSvg(options);
  return {
    qrSvg,
    logoSvg,
    qrDataUrl: svgDataUrl(qrSvg),
    logoDataUrl: svgDataUrl(logoSvg),
    metrics: getPhysicalQrMetrics(url, options),
  };
}

