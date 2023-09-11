import { Card, CardFooter, CardHeader, Image } from "@nextui-org/react";
import React from "react";
function SongCard({ obj, top }) {
  if (obj == undefined) {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    window.location.reload();
  }
  return (
    <Card
      isFooterBlurred
      className="w-full sm:h-[300px] col-span-6 sm:col-span-3 bg-[#111928bf]"
    >
      <CardHeader className="z-10 flex-col h-1/6">
        <div className="flex w-full justify-between h-full items-center">
          <p className="text-tiny text-white/60 uppercase font-bold w-2/5">
            Top #{top}
          </p>
          <a
            title={obj.album.name}
            href={obj.album.external_urls.spotify}
            target="_blank"
            className="text-tiny text-right text-white/60 whitespace-nowrap uppercase font-bold overflow-hidden text-ellipsis w-3/5"
          >
            {obj.album.name}
          </a>
        </div>
      </CardHeader>
      <div className="h-4/6">
        <a href={obj.album.external_urls.spotify} target="_blank">
          <Image
            removeWrapper
            alt="Relaxing app background"
            className="object-contain rounded-none h-full"
            src={obj.album.images[0].url}
          />
        </a>
      </div>
      <CardFooter className="border-t-1 border-default-600 dark:border-default-100 w-full h-1/6 group">
        <div className=" flex flex-col w-full">
          <div className="h-3/6">
            <a
              className="text-sm text-white/60 w-fit whitespace-nowrap overflow-hidden text-ellipsis hover:whitespace-normal"
              href={obj.external_urls.spotify}
              target="_blank"
            >
              {obj.name}
            </a>
          </div>
          <div className="h-3/6">
            <p
              title=""
              className="w-full text-tiny text-white/60 whitespace-nowrap overflow-hidden text-ellipsis hover:whitespace-normal transition-transform"
            >
              {obj.artists.map((artist, index) => (
                <span key={artist.id}>
                  <a href={artist.external_urls.spotify} target="_blank">
                    {artist.name}
                  </a>
                  {index !== obj.artists.length - 1 ? ", " : ""}
                </span>
              ))}
            </p>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}

export default SongCard;
