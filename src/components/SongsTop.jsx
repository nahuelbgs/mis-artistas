import React, { useEffect, useState } from "react";
import SongCard from "./SongCards/SongCard";
import SkeletonCard from "./SkeletonCards/SkeletonCard";

function SongsTop({ accessToken, timeRange }) {
  const [songList, setSongList] = useState([]);
  const [loading, setLoading] = useState(true);
  let mounted = true;
  useEffect(() => {
    if (accessToken && mounted) {
      const auth = {
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/x-www-form-urlencoded",
        },
      };
      fetch(
        `https://api.spotify.com/v1/me/top/tracks?time_range=${timeRange}&limit=10`,
        auth
      )
        .then((response) => response.json())
        .then((data) => setSongList(data.items))
        .catch((error) => console.log(error))
        .finally(() => setLoading(false));
      mounted = false;
    }
  }, [mounted]);
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
      ) : <button onClick={handleRestart}>Ha ocurrido un error, presiona aqui volver a iniciar sesion</button>
      }
    </>
  );
}

export default SongsTop;
