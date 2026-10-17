import { useRef, useState } from "react";
import * as htmlToImage from "html-to-image";
import ExportView from "./ExportView";

const TIME_LABELS = {
  short_term: "Último mes",
  medium_term: "Últimos 6 meses",
  long_term: "Todo el tiempo",
};

export default function ExportButton({ items, type, timeRange }) {
  const viewRef = useRef(null);
  const [busy, setBusy] = useState(false);

  if (!items || items.length === 0) return null;

  const title = type === "songs" ? "Mi Top Canciones" : "Mi Top Artistas";
  const subtitle = TIME_LABELS[timeRange] ?? "";

  const handleExport = async () => {
    if (!viewRef.current || busy) return;
    setBusy(true);
    try {
      const blob = await htmlToImage.toBlob(viewRef.current, {
        pixelRatio: 2,
        cacheBust: true,
      });
      if (!blob) throw new Error("Blob generation failed");

      const file = new File([blob], `mi-top-${type}.png`, {
        type: "image/png",
      });

      if (navigator.canShare?.({ files: [file] })) {
        await navigator.share({
          files: [file],
          title,
          text: `${title} · ${subtitle}`,
        });
      } else {
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = file.name;
        a.click();
        URL.revokeObjectURL(url);
      }
    } catch (err) {
      if (err?.name !== "AbortError") {
        console.error("Export failed:", err);
        alert("No se pudo generar la imagen. Probá de nuevo.");
      }
    } finally {
      setBusy(false);
    }
  };

  return (
    <>
      <div className="flex justify-center mt-4">
        <button
          onClick={handleExport}
          disabled={busy}
          className="bg-[#1DB954] hover:bg-[#1ed760] text-black font-semibold rounded-full px-8 py-3 text-sm sm:text-base transition-colors cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed shadow-lg"
        >
          {busy ? "Generando..." : "Compartir"}
        </button>
      </div>
      <div
        aria-hidden
        style={{
          position: "fixed",
          left: -20000,
          top: 0,
          pointerEvents: "none",
        }}
      >
        <ExportView
          ref={viewRef}
          items={items}
          type={type}
          title={title}
          subtitle={subtitle}
        />
      </div>
    </>
  );
}
