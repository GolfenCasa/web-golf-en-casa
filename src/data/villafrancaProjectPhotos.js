function responsivePhoto(name, alt, label, caption, portrait = false) {
  const base = `/proyectos/villafranca-de-los-barros/${name}`;
  return {
    src: `${base}.webp`,
    srcSet: `${base}-480.webp 480w, ${base}-800.webp 800w, ${base}-1200.webp 1200w, ${base}.webp 1920w`,
    alt,
    label,
    caption,
    width: 1920,
    height: portrait ? 2560 : 1440,
    fit: portrait ? "contain" : "cover",
  };
}

export const villafrancaProjectPhotos = [
  responsivePhoto(
    "simulador-golf-villafranca-de-los-barros",
    "Simulador de golf a medida en Villafranca de los Barros con revestimiento de listones, pantalla, protecciones acolchadas y zona de golpeo",
    "Vista general",
    "Vista general: pantalla, protección y zona de golpeo integradas en un diseño a medida con tecnología 4K.",
  ),
  responsivePhoto(
    "pantalla-simulador-villafranca-de-los-barros",
    "Vista frontal de la pantalla del simulador en Villafranca de los Barros con protección acolchada en paredes y techo",
    "Pantalla y acabados",
    "Vista frontal: la pantalla y las protecciones acolchadas se integran con el revestimiento de listones.",
  ),
  responsivePhoto(
    "zona-tecnica-simulador-villafranca-de-los-barros",
    "Detalle del monitor mural, el mueble para el PC y el equipo de medición en el simulador de Villafranca de los Barros",
    "Detalle a medida",
    "Detalle de la personalización: monitor mural, mueble para el equipo y zona técnica junto al área de juego.",
    true,
  ),
];
