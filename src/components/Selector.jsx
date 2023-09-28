import React, { useState } from "react";
import ArtistsTop from "./ArtistTop";
import SongsTop from "./SongsTop";
import SwitcherTime from "./Switcher/SwitcherTime";
import SwitcherArtistSong from "./Switcher/SwitcherArtistSong";

export default function Selector({ accessToken }) {
  const [switcherArtistSong, setSwitcherArtistSong] = useState("songs");
  const [switcherTime, setSwitcherTime] = useState("short_term");
  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    const logoutUrl = "https://accounts.spotify.com/logout";
    window.open(logoutUrl, "_blank");
    window.location.reload();
  };
  return (
    <>
      <div className="flex max-w-[900px] m-auto flex-col gap-2 justify-center min-h-screen">
        <div className="mt-2 px-8 flex flex-col gap-2">
          <div className="flex justify-between">
            <SwitcherArtistSong
              switcherArtistSong={switcherArtistSong}
              setSwitcherArtistSong={setSwitcherArtistSong}
            />
            <a
              onClick={handleLogout}
              className="flex items-center text-sm cursor-pointer max-sm:text-tiny text-red-500"
            >
              Cerrar sesión
            </a>
          </div>
          <SwitcherTime
            switcherTime={switcherTime}
            setSwitcherTime={setSwitcherTime}
          />
        </div>
        {switcherArtistSong === "songs" && switcherTime === "short_term" && (
          <SongsTop accessToken={accessToken} timeRange="short_term" />
        )}
        {switcherArtistSong === "artists" && switcherTime === "short_term" && (
          <ArtistsTop accessToken={accessToken} timeRange="short_term" />
        )}
        {switcherArtistSong === "songs" && switcherTime === "medium_term" && (
          <SongsTop accessToken={accessToken} timeRange="medium_term" />
        )}
        {switcherArtistSong === "artists" && switcherTime === "medium_term" && (
          <ArtistsTop accessToken={accessToken} timeRange="medium_term" />
        )}
        {switcherArtistSong === "songs" && switcherTime === "long_term" && (
          <SongsTop accessToken={accessToken} timeRange="long_term" />
        )}
        {switcherArtistSong === "artists" && switcherTime === "long_term" && (
          <ArtistsTop accessToken={accessToken} timeRange="long_term" />
        )}
      </div>
      <footer className="bg-[#111928bf] border-t-1 border-default-600 dark:border-default-100 h-14 mt-1">
        <img
          className="object-contain w-full h-full py-2 grayscale"
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/26/Spotify_logo_with_text.svg/1200px-Spotify_logo_with_text.svg.png"
        />
      </footer>
    </>
  );
}
