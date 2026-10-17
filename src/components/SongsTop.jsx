import { useEffect, useState } from "react";
import SongCard from "./SongCards/SongCard";
import SkeletonCard from "./SkeletonCards/SkeletonCard";
import ExportButton from "./ExportButton";

const LIMIT = 9;
const MIN_SKELETON_MS = 400;

export default function SongsTop({ accessToken, timeRange }) {
  const [songList, setSongList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    if (!accessToken) return;

    const controller = new AbortController();
    const startTime = Date.now();
    setLoading(true);
    setFailed(false);
    setSongList([]);

    fetch(
      `https://api.spotify.com/v1/me/top/tracks?time_range=${timeRange}&limit=${LIMIT}`,
      {
        method: "GET",
        signal: controller.signal,
        headers: { Authorization: `Bearer ${accessToken}` },
      }
    )
      .then(async (response) => {
        if (!response.ok) throw new Error(`Spotify API error: ${response.status}`);
        return response.json();
      })
      .then((data) => setSongList(Array.isArray(data?.items) ? data.items : []))
      .catch((error) => {
        if (error?.name === "AbortError") return;
        console.error(error);
        setFailed(true);
      })
      .finally(() => {
        const remaining = MIN_SKELETON_MS - (Date.now() - startTime);
        if (remaining > 0) setTimeout(() => setLoading(false), remaining);
        else setLoading(false);
      });

    return () => controller.abort();
  }, [accessToken, timeRange]);

  const handleRestart = () => {
    localStorage.removeItem("accessToken");
    window.location.reload();
  };

  if (loading) return <PodiumSkeleton />;

  if (failed) {
    return (
      <div className="px-8">
        <button
          onClick={handleRestart}
          className="text-white/80 underline"
        >
          Ha ocurrido un error, presioná aquí para volver a iniciar sesión
        </button>
      </div>
    );
  }

  if (songList.length === 0) {
    return (
      <div className="px-8">
        <p className="text-white/80">No tenés suficientes canciones</p>
      </div>
    );
  }

  const top = songList.slice(0, 3);
  const rest = songList.slice(3);

  return (
    <div className="flex flex-col gap-4 px-4 sm:px-8">
      <div className="grid grid-cols-3 gap-4">
        {top.map((song, i) => (
          <SongCard key={song.id ?? i} obj={song} top={i + 1} />
        ))}
      </div>
      {rest.length > 0 && (
        <div className="grid grid-cols-3 gap-3 w-full sm:w-5/6 mx-auto">
          {rest.map((song, i) => (
            <SongCard key={song.id ?? i + 3} obj={song} top={i + 4} />
          ))}
        </div>
      )}
      <ExportButton items={songList} type="songs" timeRange={timeRange} />
    </div>
  );
}

function PodiumSkeleton() {
  return (
    <div className="flex flex-col gap-4 px-4 sm:px-8">
      <div className="grid grid-cols-3 gap-4">
        {Array.from({ length: 3 }).map((_, i) => (
          <SkeletonCard key={i} />
        ))}
      </div>
      <div className="grid grid-cols-3 gap-3 w-full sm:w-5/6 mx-auto">
        {Array.from({ length: LIMIT - 3 }).map((_, i) => (
          <SkeletonCard key={i} />
        ))}
      </div>
    </div>
  );
}
