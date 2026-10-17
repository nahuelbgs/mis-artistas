import { motion } from "framer-motion";

const OPTIONS = [
  { value: "songs", label: "Canciones" },
  { value: "artists", label: "Artistas" },
];

export default function SwitcherArtistSong({
  switcherArtistSong,
  setSwitcherArtistSong,
}) {
  return (
    <div className="bg-black/40 backdrop-blur border border-white/5 rounded-full p-1 flex gap-1">
      {OPTIONS.map(({ value, label }) => {
        const active = switcherArtistSong === value;
        return (
          <button
            key={value}
            onClick={() => setSwitcherArtistSong(value)}
            className={`relative px-4 py-1.5 rounded-full text-sm cursor-pointer transition-colors duration-300 ${
              active ? "text-black font-semibold" : "text-white/60 hover:text-white"
            }`}
          >
            {active && (
              <motion.div
                layoutId="artistSongPill"
                className="absolute inset-0 bg-[#1DB954] rounded-full"
                transition={{ type: "spring", stiffness: 500, damping: 35 }}
              />
            )}
            <span className="relative z-10">{label}</span>
          </button>
        );
      })}
    </div>
  );
}
