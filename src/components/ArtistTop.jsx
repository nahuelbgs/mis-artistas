import React, { useEffect, useState } from "react";
import ArtistCard from "./ArtistCard";
import SkeletonCard from "./SkeletonCards/SkeletonCard";

function ArtistsTop({ accessToken, timeRange }) {
  const [data, setData] = useState([]);
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
        .then((data) => setData(data.items))
        .finally(() => setLoading(false));
        mounted = false
    }
  }, [mounted]);

  console.log(data);
  return (
    <>
      {loading ? (
        <div>
          <div className="max-w-[900px] gap-2 grid grid-cols-12 grid-rows-2 px-8  m-auto">
            <SkeletonCard />
            <SkeletonCard />
            <SkeletonCard />
            <SkeletonCard />
            <SkeletonCard />
            <SkeletonCard />
          </div>
        </div>
      ) : (
        <div className="max-w-[900px] px-8 m-auto">
          <div className="grid grid-cols-12 gap-2 grid-rows-2">
            <ArtistCard
              image={data[0].images[0].url}
              name={data[0].name}
              position='1'
              url={data[0].external_urls.spotify}
            />
            <ArtistCard
              image={data[1].images[0].url}
              name={data[1].name}
              position='2'
              url={data[1].external_urls.spotify}
            />
            <ArtistCard
              image={data[2].images[0].url}
              name={data[2].name}
              position='3'
              url={data[2].external_urls.spotify}
            />
            <ArtistCard
              image={data[3].images[0].url}
              name={data[3].name}
              position='4'
              url={data[3].external_urls.spotify}
            />
            <ArtistCard
              image={data[4].images[0].url}
              name={data[4].name}
              position='5'
              url={data[4].external_urls.spotify}
            />
            <ArtistCard
              image={data[5].images[0].url}
              name={data[5].name}
              position='6'
              url={data[5].external_urls.spotify}
            />
          </div>
        </div>
      )}
    </>
  );
}

export default ArtistsTop;