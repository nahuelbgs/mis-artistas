import { useState } from "react";
import SpotifyBadge from "./SpotifyBadge";

export default function ArtistCard({ obj, top }) {
  const [imgLoaded, setImgLoaded] = useState(false);

  if (!obj) return null;

  const image = obj.images?.[0]?.url;

  return (
    <div className="bg-black/40 backdrop-blur-md border border-white/5 rounded-2xl sm:rounded-3xl p-2 sm:p-4 flex flex-col gap-2 sm:gap-4 shadow-xl">
      <a
        href={obj.external_urls.spotify}
        target="_blank"
        rel="noopener noreferrer"
        title={obj.name}
        className="relative block aspect-square rounded-xl sm:rounded-2xl overflow-hidden group"
      >
        {!imgLoaded && (
          <div className="absolute inset-0 bg-white/5 animate-pulse" />
        )}
        <img
          alt={obj.name}
          src={image}
          onLoad={() => setImgLoaded(true)}
          className={`object-cover w-full h-full transition-opacity duration-500 ${
            imgLoaded ? "opacity-100" : "opacity-0"
          }`}
        />

        <span className="absolute top-1.5 left-1.5 sm:top-3 sm:left-3 bg-black/60 backdrop-blur-sm text-white text-[9px] sm:text-xs font-bold uppercase tracking-wide px-1.5 py-0.5 sm:px-2.5 sm:py-1 rounded-full">
          #{top}
        </span>

        <SpotifyBadge className="absolute top-1.5 right-1.5 sm:top-3 sm:right-3 w-5 h-5 sm:w-8 sm:h-8 drop-shadow-lg" />
      </a>

      <div className="px-0.5 sm:px-1 min-w-0">
        <a
          href={obj.external_urls.spotify}
          target="_blank"
          rel="noopener noreferrer"
          className="text-white text-xs sm:text-base font-semibold truncate block hover:underline"
          title={obj.name}
        >
          {obj.name}
        </a>
      </div>
    </div>
  );
}
