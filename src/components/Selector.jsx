import React from "react";
import { Tabs, Tab } from "@nextui-org/react";
import ArtistsTop from "./ArtistTop";
import { useAppContext } from "./Context/AppContext";

export default function Selector() {
  const { accessToken } = useAppContext();
  return (
    <div className="flex w-full flex-col h-full gap-2">
      <h1 className="flex justify-center text-4xl mt-4 font-bold">MIS ARTISTAS</h1>
      <h2 className="flex justify-center text-2xl font-medium">Generador de artistas mas escuchados</h2>
      <Tabs aria-label="Options" className="flex justify-center">
        <Tab key="photos" title="Último mes" className="">
          <ArtistsTop accessToken={accessToken} timeRange={"short_term"} />
        </Tab>
        <Tab key="music" title="Últimos 6 meses">
          <ArtistsTop accessToken={accessToken} timeRange={"medium_term"} />
        </Tab>
        <Tab key="videos" title="Todo el tiempo">
          <ArtistsTop accessToken={accessToken} timeRange={"long_term"} />
        </Tab>
      </Tabs>
    </div>
  );
}
