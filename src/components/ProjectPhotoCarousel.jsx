import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function ProjectPhotoCarousel({ photos, projectName, href, sizes }) {
  const [index, setIndex] = useState(0);
  const photo = photos[index];
  const changePhoto = (direction) => {
    setIndex((current) => (current + direction + photos.length) % photos.length);
  };

  return (
    <div
      role="group"
      aria-roledescription="carrusel"
      aria-label={`Fotografías del proyecto de ${projectName}`}
      className="relative aspect-[4/3] w-full overflow-hidden bg-zinc-200"
    >
      <a href={href} aria-label={`Ver proyecto de ${projectName}`} className="block h-full w-full">
        <img
          key={photo.src}
          src={photo.src}
          srcSet={photo.srcSet}
          sizes={sizes}
          alt={photo.alt}
          width={photo.width}
          height={photo.height}
          loading="lazy"
          decoding="async"
          className={`h-full w-full ${photo.fit === "contain" ? "object-contain" : "object-cover"}`}
        />
      </a>

      <div aria-hidden="true" className="pointer-events-none absolute inset-x-4 bottom-4 flex items-end justify-between gap-3 text-xs font-bold text-white">
        <span className="rounded-full bg-black/75 px-3 py-2">{photo.label}</span>
        <span className="shrink-0 rounded-full bg-black/75 px-3 py-2">{index + 1} / {photos.length}</span>
      </div>

      <button
        type="button"
        aria-label={`Foto anterior de ${projectName}`}
        onClick={() => changePhoto(-1)}
        className="absolute left-3 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/60 bg-black/75 text-white shadow-lg transition hover:bg-emerald-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
      >
        <ChevronLeft className="h-6 w-6" aria-hidden="true" />
      </button>
      <button
        type="button"
        aria-label={`Foto siguiente de ${projectName}`}
        onClick={() => changePhoto(1)}
        className="absolute right-3 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/60 bg-black/75 text-white shadow-lg transition hover:bg-emerald-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
      >
        <ChevronRight className="h-6 w-6" aria-hidden="true" />
      </button>

      <p className="sr-only" role="status" aria-live="polite" aria-atomic="true">
        Fotografía {index + 1} de {photos.length}: {photo.label}
      </p>
    </div>
  );
}
