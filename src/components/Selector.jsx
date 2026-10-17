import { useState } from "react";
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
  const title = switcherArtistSong === "songs" ? "Top Canciones" : "Top Artistas";

  return (
    <div className="flex max-w-5xl m-auto flex-col gap-6 min-h-screen py-6">
        <div className="px-4 sm:px-8 flex flex-col gap-4">
          <div className="flex justify-between items-center">
            <SwitcherArtistSong
              switcherArtistSong={switcherArtistSong}
              setSwitcherArtistSong={setSwitcherArtistSong}
            />
            <div className="bg-black/40 backdrop-blur border border-white/5 rounded-full p-1">
              <button
                onClick={handleLogout}
                className="px-4 py-1.5 rounded-full text-sm text-red-400 hover:bg-red-500/10 hover:text-red-300 transition-colors cursor-pointer"
              >
                Cerrar sesión
              </button>
            </div>
          </div>
          <SwitcherTime
            switcherTime={switcherTime}
            setSwitcherTime={setSwitcherTime}
          />
          <h1 className="text-3xl sm:text-4xl font-bold text-white mt-2">
            {title}
          </h1>
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
  );
}
