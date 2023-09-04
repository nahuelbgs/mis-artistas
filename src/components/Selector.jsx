import React from "react";
import { Tabs, Tab } from "@nextui-org/react";
import ArtistsTop from "./ArtistTop";
import { useAppContext } from "./Context/AppContext";
import SongsTop from "./SongsTop";

export default function Selector() {
  const { accessToken } = useAppContext();
  return (
    <div className="flex max-w-[900px] m-auto flex-col gap-2">
      <h1 className="px-8 text-3xl mt-4 font-bold">Tu top de artistas</h1>
      <Tabs aria-label="Options" className="px-8">
        <Tab key="lastMonth" title="Último mes">
          <SongsTop accessToken={accessToken} timeRange={"long_term"} />
        </Tab>
        <Tab key="last6Months" title="Últimos 6 meses">
          <ArtistsTop accessToken={accessToken} timeRange={"medium_term"} />
        </Tab>
        <Tab key="allTime" title="Todo el tiempo">
          <ArtistsTop accessToken={accessToken} timeRange={"long_term"} />
        </Tab>
      </Tabs>
    </div>
  );
}
