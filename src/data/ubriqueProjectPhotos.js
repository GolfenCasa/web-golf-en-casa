export const projectCardImageSizes = "(min-width: 1280px) 410px, (min-width: 768px) calc((100vw - 72px) / 2), calc(100vw - 32px)";
export const landingProjectImageSizes = "(min-width: 1280px) 410px, (min-width: 1024px) calc((100vw - 112px) / 3), calc(100vw - 48px)";
export const projectDetailImageSizes = "(min-width: 1280px) 604px, (min-width: 768px) calc((100vw - 72px) / 2), calc(100vw - 48px)";

function responsivePhoto(name, alt, label, caption) {
  const base = `/proyectos/ubrique/${name}`;
  return {
    src: `${base}.webp`,
    srcSet: `${base}-480.webp 480w, ${base}-800.webp 800w, ${base}-1200.webp 1200w, ${base}.webp 1920w`,
    alt,
    label,
    caption,
    width: 1920,
    height: 1440,
  };
}

export const ubriqueProjectPhotos = [
  responsivePhoto(
    "simulador-golf-ubrique",
    "Simulador de golf terminado en Ubrique con pantalla de impacto, protección lateral y zona de golpeo",
    "Vista general",
    "Vista general: pantalla, protección y zona de golpeo integradas en la sala.",
  ),
  responsivePhoto(
    "pantalla-gspro-ubrique",
    "Detalle de la proyección de GSPro en la pantalla del simulador de golf de Ubrique",
    "Detalle de la pantalla",
    "Detalle de la proyección: recorrido virtual y datos del golpe en GSPro.",
  ),
];
