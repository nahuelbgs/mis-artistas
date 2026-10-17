import { useState } from "react";

const TIME_LABELS = {
  short_term: "Último mes",
  medium_term: "Últimos 6 meses",
  long_term: "Todo el tiempo",
};

const WIDTH = 1080;
const HEIGHT = 1920;
const PADDING = 72;
const GAP = 28;
const COVER_SIZE = Math.floor((WIDTH - PADDING * 2 - GAP * 2) / 3);

const SPOTIFY_PATH =
  "M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z";

function roundRectPath(ctx, x, y, w, h, r) {
  const radius = Math.min(r, w / 2, h / 2);
  ctx.beginPath();
  ctx.moveTo(x + radius, y);
  ctx.lineTo(x + w - radius, y);
  ctx.quadraticCurveTo(x + w, y, x + w, y + radius);
  ctx.lineTo(x + w, y + h - radius);
  ctx.quadraticCurveTo(x + w, y + h, x + w - radius, y + h);
  ctx.lineTo(x + radius, y + h);
  ctx.quadraticCurveTo(x, y + h, x, y + h - radius);
  ctx.lineTo(x, y + radius);
  ctx.quadraticCurveTo(x, y, x + radius, y);
  ctx.closePath();
}

function truncateText(ctx, text, maxWidth) {
  if (!text) return "";
  if (ctx.measureText(text).width <= maxWidth) return text;
  const ellipsis = "…";
  let truncated = text;
  while (
    truncated.length > 0 &&
    ctx.measureText(truncated + ellipsis).width > maxWidth
  ) {
    truncated = truncated.slice(0, -1);
  }
  return truncated + ellipsis;
}

async function loadImage(url) {
  if (!url) return null;
  try {
    const img = new Image();
    img.src = `/api/image?url=${encodeURIComponent(url)}`;
    await img.decode();
    return img;
  } catch {
    return null;
  }
}

async function generateCanvas({ items, type, title, subtitle }) {
  const canvas = document.createElement("canvas");
  canvas.width = WIDTH;
  canvas.height = HEIGHT;
  const ctx = canvas.getContext("2d");

  const bg = ctx.createLinearGradient(0, 0, WIDTH, HEIGHT);
  bg.addColorStop(0, "#022c22");
  bg.addColorStop(0.5, "#052e16");
  bg.addColorStop(1, "#022c22");
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, WIDTH, HEIGHT);

  const accent = ctx.createRadialGradient(
    WIDTH * 0.2,
    HEIGHT * 0.2,
    0,
    WIDTH * 0.2,
    HEIGHT * 0.2,
    WIDTH * 0.6
  );
  accent.addColorStop(0, "rgba(6, 95, 70, 0.9)");
  accent.addColorStop(1, "rgba(6, 95, 70, 0)");
  ctx.fillStyle = accent;
  ctx.fillRect(0, 0, WIDTH, HEIGHT);

  ctx.textBaseline = "top";
  ctx.fillStyle = "white";
  ctx.font = "800 76px Inter, system-ui, -apple-system, sans-serif";
  ctx.fillText(title, PADDING, PADDING);

  ctx.font = "400 36px Inter, system-ui, -apple-system, sans-serif";
  ctx.fillStyle = "rgba(255,255,255,0.65)";
  ctx.fillText(subtitle, PADDING, PADDING + 92);

  const covers = await Promise.all(
    items.slice(0, 9).map((item) => {
      const url =
        type === "songs"
          ? item.album?.images?.[0]?.url
          : item.images?.[0]?.url;
      return loadImage(url);
    })
  );

  const gridStartY = PADDING + 200;
  const rowHeight = COVER_SIZE + 110;

  for (let i = 0; i < 9; i++) {
    const item = items[i];
    if (!item) continue;
    const col = i % 3;
    const row = Math.floor(i / 3);
    const x = PADDING + col * (COVER_SIZE + GAP);
    const y = gridStartY + row * rowHeight;

    ctx.save();
    roundRectPath(ctx, x, y, COVER_SIZE, COVER_SIZE, 24);
    ctx.clip();
    ctx.fillStyle = "rgba(0,0,0,0.3)";
    ctx.fillRect(x, y, COVER_SIZE, COVER_SIZE);
    if (covers[i]) {
      ctx.drawImage(covers[i], x, y, COVER_SIZE, COVER_SIZE);
    }
    ctx.restore();

    const badgeText = `#${i + 1}`;
    ctx.font = "700 22px Inter, system-ui, -apple-system, sans-serif";
    const badgeTextWidth = ctx.measureText(badgeText).width;
    const badgeHeight = 34;
    const badgePadX = 14;
    const badgeWidth = badgeTextWidth + badgePadX * 2;
    const badgeX = x + 12;
    const badgeY = y + 12;

    roundRectPath(ctx, badgeX, badgeY, badgeWidth, badgeHeight, 999);
    ctx.fillStyle = "rgba(0,0,0,0.65)";
    ctx.fill();
    ctx.fillStyle = "white";
    ctx.textBaseline = "middle";
    ctx.fillText(badgeText, badgeX + badgePadX, badgeY + badgeHeight / 2 + 1);

    ctx.textBaseline = "top";
    ctx.font = "600 24px Inter, system-ui, -apple-system, sans-serif";
    ctx.fillStyle = "white";
    ctx.fillText(
      truncateText(ctx, item.name, COVER_SIZE),
      x,
      y + COVER_SIZE + 14
    );

    if (type === "songs") {
      const subName = item.artists?.map((a) => a.name).join(", ") ?? "";
      ctx.font = "400 20px Inter, system-ui, -apple-system, sans-serif";
      ctx.fillStyle = "rgba(255,255,255,0.6)";
      ctx.fillText(
        truncateText(ctx, subName, COVER_SIZE),
        x,
        y + COVER_SIZE + 50
      );
    }
  }

  const footerY = HEIGHT - PADDING - 52;
  ctx.save();
  ctx.translate(PADDING, footerY);
  ctx.scale(52 / 24, 52 / 24);
  const path = new Path2D(SPOTIFY_PATH);
  ctx.fillStyle = "#1DB954";
  ctx.fill(path);
  ctx.restore();

  ctx.textBaseline = "middle";
  ctx.font = "600 28px Inter, system-ui, -apple-system, sans-serif";
  ctx.fillStyle = "rgba(255,255,255,0.85)";
  ctx.fillText("Datos de Spotify", PADDING + 72, footerY + 26);

  return canvas;
}

function canvasToBlob(canvas, type, quality) {
  return new Promise((resolve, reject) => {
    canvas.toBlob(
      (blob) => (blob ? resolve(blob) : reject(new Error("Blob failed"))),
      type,
      quality
    );
  });
}

export default function ExportButton({ items, type, timeRange }) {
  const [busy, setBusy] = useState(false);

  if (!items || items.length === 0) return null;

  const title = type === "songs" ? "Mi Top Canciones" : "Mi Top Artistas";
  const subtitle = TIME_LABELS[timeRange] ?? "";

  const handleExport = async () => {
    if (busy) return;
    setBusy(true);
    try {
      const canvas = await generateCanvas({ items, type, title, subtitle });
      const blob = await canvasToBlob(canvas, "image/jpeg", 0.85);
      const file = new File([blob], `mi-top-${type}.jpg`, {
        type: "image/jpeg",
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
    <div className="flex justify-center mt-4">
      <button
        onClick={handleExport}
        disabled={busy}
        className="bg-[#1DB954] hover:bg-[#1ed760] text-black font-semibold rounded-full px-8 py-3 text-sm sm:text-base transition-colors cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed shadow-lg"
      >
        {busy ? "Generando..." : "Compartir"}
      </button>
    </div>
  );
}
