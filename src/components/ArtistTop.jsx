import React, { useEffect, useState } from "react";
import ArtistCard from "./ArtistCard";
import SkeletonCard from "./SkeletonCards/SkeletonCard";

function ArtistsTop({ accessToken, timeRange }) {
  const [artistsList, setArtistsList] = useState([]);
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
        `https://api.spotify.com/v1/me/top/artists?time_range=${timeRange}&limit=6`,
        auth
      )
        .then((response) => response.json())
        .then((data) => setArtistsList(data.items))
        .finally(() => setLoading(false));
      mounted = false;
    }
  }, [mounted]);

  return (
    <>
      {loading ? (
        <div className="max-w-[900px] gap-2 grid grid-cols-12 grid-rows-2 px-8  m-auto">
          <SkeletonCard />
          <SkeletonCard />
          <SkeletonCard />
          <SkeletonCard />
          <SkeletonCard />
          <SkeletonCard />
        </div>
      ) : artistsList.length === 0 ? (
        <div className="max-w-[900px] px-8">
          <p>No tienes suficientes canciones</p>
        </div>
      ) : (
        <div className="max-w-[900px] px-8 m-auto">
          <div className="grid grid-cols-12 gap-2 grid-rows-2">
            <ArtistCard
              image={artistsList[0].images[0].url}
              name={artistsList[0].name}
              position="1"
              url={artistsList[0].external_urls.spotify}
            />
            <ArtistCard
              image={artistsList[1].images[0].url}
              name={artistsList[1].name}
              position="2"
              url={artistsList[1].external_urls.spotify}
            />
            <ArtistCard
              image={artistsList[2].images[0].url}
              name={artistsList[2].name}
              position="3"
              url={artistsList[2].external_urls.spotify}
            />
            <ArtistCard
              image={artistsList[3].images[0].url}
              name={artistsList[3].name}
              position="4"
              url={artistsList[3].external_urls.spotify}
            />
            <ArtistCard
              image={artistsList[4].images[0].url}
              name={artistsList[4].name}
              position="5"
              url={artistsList[4].external_urls.spotify}
            />
            <ArtistCard
              image={artistsList[5].images[0].url}
              name={artistsList[5].name}
              position="6"
              url={artistsList[5].external_urls.spotify}
            />
          </div>
        </div>
      )}
    </>
  );
}

export default ArtistsTop;
