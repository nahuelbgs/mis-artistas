import { useState } from "react";
import SpotifyBadge from "../SpotifyBadge";

export default function SongCard({ obj, top }) {
  const [imgLoaded, setImgLoaded] = useState(false);

  if (!obj) return null;

  const cover = obj.album?.images?.[0]?.url;

  return (
    <div className="bg-black/40 backdrop-blur-md border border-white/5 rounded-2xl sm:rounded-3xl p-2 sm:p-4 flex flex-col gap-2 sm:gap-4 shadow-xl">
      <a
        href={obj.album.external_urls.spotify}
        target="_blank"
        rel="noopener noreferrer"
        title={obj.album.name}
        className="relative block aspect-square rounded-xl sm:rounded-2xl overflow-hidden group"
      >
        {!imgLoaded && (
          <div className="absolute inset-0 bg-white/5 animate-pulse" />
        )}
        <img
          alt={obj.album.name}
          src={cover}
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

      <div className="flex flex-col gap-0.5 sm:gap-1 px-0.5 sm:px-1 min-w-0">
        <div className="flex items-center gap-1 sm:gap-2 min-w-0">
          <a
            href={obj.external_urls.spotify}
            target="_blank"
            rel="noopener noreferrer"
            className="text-white text-xs sm:text-base font-semibold truncate hover:underline min-w-0"
            title={obj.name}
          >
            {obj.name}
          </a>
          {obj.explicit && (
            <span className="shrink-0 text-[8px] sm:text-[10px] font-bold bg-white/20 text-white px-1 py-0 sm:px-1.5 sm:py-0.5 rounded">
              E
            </span>
          )}
        </div>
        <p className="text-[10px] sm:text-sm text-white/60 truncate">
          {obj.artists.map((artist, i) => (
            <span key={artist.id}>
              <a
                href={artist.external_urls.spotify}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white hover:underline"
              >
                {artist.name}
              </a>
              {i !== obj.artists.length - 1 ? ", " : ""}
            </span>
          ))}
        </p>
      </div>
    </div>
  );
}
