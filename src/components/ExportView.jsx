import { forwardRef } from "react";

const WIDTH = 1080;
const HEIGHT = 1920;
const PADDING = 72;
const GAP = 28;
const COVER_SIZE = Math.floor((WIDTH - PADDING * 2 - GAP * 2) / 3);

function proxyUrl(url) {
  if (!url) return null;
  return `/api/image?url=${encodeURIComponent(url)}`;
}

const ExportView = forwardRef(function ExportView(
  { items, type, title, subtitle },
  ref
) {
  return (
    <div
      ref={ref}
      style={{
        width: WIDTH,
        height: HEIGHT,
        background:
          "radial-gradient(circle at 20% 20%, #065f46 0%, transparent 55%), linear-gradient(135deg, #022c22 0%, #052e16 100%)",
        color: "white",
        fontFamily: "'Inter', system-ui, sans-serif",
        padding: PADDING,
        display: "flex",
        flexDirection: "column",
        boxSizing: "border-box",
      }}
    >
      <div style={{ marginBottom: 48 }}>
        <div style={{ fontSize: 76, fontWeight: 800, lineHeight: 1.05 }}>
          {title}
        </div>
        <div
          style={{
            fontSize: 36,
            color: "rgba(255,255,255,0.65)",
            marginTop: 14,
          }}
        >
          {subtitle}
        </div>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: `repeat(3, ${COVER_SIZE}px)`,
          gap: GAP,
          flex: 1,
        }}
      >
        {items.slice(0, 9).map((item, i) => {
          const originalCover =
            type === "songs"
              ? item.album?.images?.[0]?.url
              : item.images?.[0]?.url;
          const cover = proxyUrl(originalCover);
          const name = item.name;
          const subName =
            type === "songs"
              ? item.artists?.map((a) => a.name).join(", ")
              : null;

          return (
            <div
              key={item.id ?? i}
              style={{ display: "flex", flexDirection: "column", gap: 10 }}
            >
              <div
                style={{
                  position: "relative",
                  width: COVER_SIZE,
                  height: COVER_SIZE,
                  borderRadius: 24,
                  overflow: "hidden",
                  background: "rgba(0,0,0,0.3)",
                }}
              >
                {cover && (
                  <img
                    src={cover}
                    alt={name}
                    style={{
                      width: COVER_SIZE,
                      height: COVER_SIZE,
                      objectFit: "cover",
                      display: "block",
                    }}
                  />
                )}
                <div
                  style={{
                    position: "absolute",
                    top: 12,
                    left: 12,
                    background: "rgba(0,0,0,0.65)",
                    color: "white",
                    fontSize: 22,
                    fontWeight: 700,
                    padding: "4px 12px",
                    borderRadius: 999,
                  }}
                >
                  #{i + 1}
                </div>
              </div>
              <div
                style={{
                  width: COVER_SIZE,
                  fontSize: 24,
                  fontWeight: 600,
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  marginTop: 6,
                }}
              >
                {name}
              </div>
              {subName && (
                <div
                  style={{
                    width: COVER_SIZE,
                    fontSize: 18,
                    color: "rgba(255,255,255,0.6)",
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    marginTop: -2,
                  }}
                >
                  {subName}
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 14,
          marginTop: 40,
        }}
      >
        <svg width="52" height="52" viewBox="0 0 24 24" fill="#1DB954">
          <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z" />
        </svg>
        <span style={{ fontSize: 28, fontWeight: 600, color: "rgba(255,255,255,0.85)" }}>
          Datos de Spotify
        </span>
      </div>
    </div>
  );
});

export default ExportView;
