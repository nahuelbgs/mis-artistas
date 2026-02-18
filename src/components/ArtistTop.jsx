import React, { useEffect, useState } from "react";
import ArtistCard from "./ArtistCard";
import SkeletonCard from "./SkeletonCards/SkeletonCard";

function ArtistsTop({ accessToken, timeRange }) {
  const [artistsList, setArtistsList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!accessToken) return;

    const controller = new AbortController();

    setLoading(true);
    setArtistsList([]);

    fetch(
      `https://api.spotify.com/v1/me/top/artists?time_range=${timeRange}&limit=8`,
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
      .then((data) =>
        setArtistsList(Array.isArray(data?.items) ? data.items : [])
      )
      .catch((error) => {
        if (error?.name === "AbortError") return;
        console.error(error);
      })
      .finally(() => setLoading(false));

    return () => controller.abort();
  }, [accessToken, timeRange]);

  const handleRestart = () => {
    localStorage.removeItem("accessToken");
    window.location.reload();
  };
  return (
    <>
      {loading ? (
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
      ) : artistsList !== undefined && artistsList.length === 0 ? (
        <div className="max-w-[900px] px-8">
          <p>No tienes suficientes canciones</p>
        </div>
      ) : artistsList !== undefined && artistsList.length > 0 ? (
        <div className="max-w-[900px] px-8 grid grid-cols-12 gap-2 grid-rows-2">
          <ArtistCard obj={artistsList[0]} top={1} />
          <ArtistCard obj={artistsList[1]} top={2} />
          <ArtistCard obj={artistsList[2]} top={3} />
          <ArtistCard obj={artistsList[3]} top={4} />
          <ArtistCard obj={artistsList[4]} top={5} />
          <ArtistCard obj={artistsList[5]} top={6} />
          <ArtistCard obj={artistsList[6]} top={7} />
          <ArtistCard obj={artistsList[7]} top={8} />
        </div>
      ) : (
        <div className="h-screen px-8">
          <button onClick={handleRestart}>
            Ha ocurrido un error, presiona aquí volver a iniciar sesión{" "}
          </button>
        </div>
      )}
    </>
  );
}

export default ArtistsTop;
