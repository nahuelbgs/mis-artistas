import { motion } from "framer-motion";

const OPTIONS = [
  { value: "short_term", label: "Último mes", short: "1 mes" },
  { value: "medium_term", label: "Últimos 6 meses", short: "6 meses" },
  { value: "long_term", label: "Todo el tiempo", short: "Siempre" },
];

export default function SwitcherTime({ switcherTime, setSwitcherTime }) {
  return (
    <div className="bg-black/40 backdrop-blur border border-white/5 rounded-full p-1 flex gap-1 w-fit">
      {OPTIONS.map(({ value, label, short }) => {
        const active = switcherTime === value;
        return (
          <button
            key={value}
            onClick={() => setSwitcherTime(value)}
            className={`relative px-3 sm:px-4 py-1.5 rounded-full text-xs sm:text-sm whitespace-nowrap cursor-pointer transition-colors duration-300 ${
              active ? "text-black font-semibold" : "text-white/60 hover:text-white"
            }`}
          >
            {active && (
              <motion.div
                layoutId="timePill"
                className="absolute inset-0 bg-[#1DB954] rounded-full"
                transition={{ type: "spring", stiffness: 500, damping: 35 }}
              />
            )}
            <span className="relative z-10">
              <span className="sm:hidden">{short}</span>
              <span className="hidden sm:inline">{label}</span>
            </span>
          </button>
        );
      })}
    </div>
  );
}
