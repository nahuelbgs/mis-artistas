import React, { useEffect, useState } from "react";
import SongCard from "./SongCards/SongCard";
import SkeletonCard from "./SkeletonCards/SkeletonCard";

function SongsTop({ accessToken, timeRange }) {
  const [songList, setSongList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!accessToken) return;

    const controller = new AbortController();

    setLoading(true);
    setSongList([]);

    fetch(
      `https://api.spotify.com/v1/me/top/tracks?time_range=${timeRange}&limit=10`,
      {
        method: "GET",
        signal: controller.signal,
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    )
      .then(async (response) => {
        if (!response.ok) {
          throw new Error(`Spotify API error: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => setSongList(Array.isArray(data?.items) ? data.items : []))
      .catch((error) => {
        if (error?.name === "AbortError") return;
        console.error(error);
      })
      .finally(() => setLoading(false));

    return () => controller.abort();
  }, [accessToken, timeRange]);
  const handleRestart = () =>{
    localStorage.removeItem('accessToken')
    window.location.reload()
  }
  return (
    <>
      {songList !== undefined && loading ? (
        <div className="max-w-[900px] gap-2 grid grid-cols-12 grid-rows-2 px-8">
          <SkeletonCard />
          <SkeletonCard />
          <SkeletonCard />
          <SkeletonCard />
          <SkeletonCard />
          <SkeletonCard />
          <SkeletonCard />
          <SkeletonCard />
        </div>
      ) : songList !== undefined && songList.length === 0 ? (
        <div className="max-w-[900px] px-8">
          <p>No tienes suficientes canciones</p>
        </div>
      ) : songList !== undefined && songList.length > 0 ? (
        <div className="max-w-[900px] gap-2 grid grid-cols-12 grid-rows-2 px-8">
          <SongCard obj={songList[0]} top={1} />
          <SongCard obj={songList[1]} top={2} />
          <SongCard obj={songList[2]} top={3} />
          <SongCard obj={songList[3]} top={4} />
          <SongCard obj={songList[4]} top={5} />
          <SongCard obj={songList[5]} top={6} />
          <SongCard obj={songList[6]} top={7} />
          <SongCard obj={songList[7]} top={8} />
        </div>
      ) :
      <div className="h-screen px-8">
      <button onClick={handleRestart}>Ha ocurrido un error, presiona aquí volver a iniciar sesión</button>
      </div> 
      }
    </>
  );
}

export default SongsTop;
