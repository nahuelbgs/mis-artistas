import React, { useState } from "react";
import { Tabs, Tab } from "@nextui-org/react";
import ArtistsTop from "./ArtistTop";
import SongsTop from "./SongsTop";

export default function Selector({accessToken}) {
  const [option, setOption] = useState("tracks");

  return (
    <div className="flex max-w-[900px] m-auto flex-col gap-2">
      <Tabs 
      className="px-8 mt-4"
        aria-label="Options"         
        selectedKey={option}
        onSelectionChange={setOption}
      >
        <Tab key="tracks" title="Canciones">
        </Tab>
        <Tab key="artists" title="Artistas"> 
        </Tab>
      </Tabs>
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
  );
}
