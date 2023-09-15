import React, { useState } from "react";
import { Tabs, Tab } from "@nextui-org/react";
import ArtistsTop from "./ArtistTop";
import SongsTop from "./SongsTop";

export default function Selector({ accessToken }) {
  const [option, setOption] = useState("tracks");
  const handleLogout = () =>{
    localStorage.removeItem('accessToken')
    const logoutUrl = 'https://accounts.spotify.com/logout';
    window.open(logoutUrl, '_blank');  
    window.location.reload()
  }
  return (
    <>
      <div className="flex max-w-[900px] m-auto flex-col gap-2 justify-center min-h-screen">
        <div className="flex px-8 mt-4 justify-between">
        <Tabs
          aria-label="Options"
          selectedKey={option}
          onSelectionChange={setOption}
        >
          <Tab key="tracks" title="Canciones"></Tab>
          <Tab key="artists" title="Artistas"></Tab>
        </Tabs>
        <a onClick={handleLogout} className="flex items-center text-sm cursor-pointer max-sm:text-tiny">Cerrar sesión</a>
        </div>
        <Tabs aria-label="Options" className="px-8">
          <Tab key="lastMonth" title="Último mes">
            {option === "artists" ? (
              <ArtistsTop accessToken={accessToken} timeRange={"short_term"} />
            ) : (
              <SongsTop accessToken={accessToken} timeRange={"short_term"} />
            )}
          </Tab>
          <Tab key="last6Months" title="Últimos 6 meses">
            {option === "artists" ? (
              <ArtistsTop accessToken={accessToken} timeRange={"medium_term"} />
            ) : (
              <SongsTop accessToken={accessToken} timeRange={"medium_term"} />
            )}
          </Tab>
          <Tab key="allTime" title="Todo el tiempo">
            {option === "artists" ? (
              <ArtistsTop accessToken={accessToken} timeRange={"long_term"} />
            ) : (
              <SongsTop accessToken={accessToken} timeRange={"long_term"} />
            )}
          </Tab>
        </Tabs>
      </div>
      <footer className="bg-[#111928bf] border-t-1 border-default-600 dark:border-default-100 h-14">
        <img
          className="object-contain w-full h-full py-2 grayscale"
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/26/Spotify_logo_with_text.svg/1200px-Spotify_logo_with_text.svg.png"
        />
      </footer>
    </>
  );
}
