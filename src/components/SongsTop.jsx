import React, { useEffect, useState } from "react";
import SongCard from "./SongCards/SongCard";
import Top1Card from "./SongCards/Top1Card";
import Top2Card from "./SongCards/Top2Card";
import Top1Skeleton from "./SkeletonCards/Top1Skeleton";
import Top2Skeleton from "./SkeletonCards/Top2Skeleton";
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
        .finally(() => setLoading(false));
      mounted = false;
    }
  }, [mounted]);

  console.log(songList);
  return (
    <>
      {loading ? (
        <div className="max-w-[900px] gap-2 grid grid-cols-12 grid-rows-2 px-8">
          <Top1Skeleton/>
          <Top2Skeleton/>
          <SkeletonCard/>
          <SkeletonCard/>
          <SkeletonCard/>
          </div>
        ) : (
        <div className="max-w-[900px] gap-2 grid grid-cols-12 grid-rows-2 px-8">
          <Top1Card obj={songList[0]} top={1} />
          <Top2Card obj={songList[1]} top={2} />
          <SongCard obj={songList[2]} top={3} />
          <SongCard obj={songList[3]} top={4} />
          <SongCard obj={songList[4]} top={5} />
        </div>
      )}
    </>
  );
}

export default SongsTop;
