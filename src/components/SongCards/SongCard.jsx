import { Card, CardHeader, CardBody, CardFooter } from "@heroui/react";
import React, { useState } from "react";

function SongCard({ obj, top }) {
  const [imgLoaded, setImgLoaded] = useState(false);

  if (obj == undefined) {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    window.location.reload();
  }

  return (
    <>
    <Card
      isFooterBlurred
      className="w-full sm:h-[300px] col-span-6 sm:col-span-3 bg-[#111928bf] overflow-hidden"
    >
      <CardHeader className="z-10 flex-col h-1/6">
        <div className="flex w-full justify-between h-full items-center">
          <p className="text-tiny text-white/60 uppercase font-bold w-2/5">
            Top #{top}
          </p>
          
            <div title={obj.album.name}
            href={obj.album.external_urls.spotify}
            target="_blank"
            className="text-tiny text-right text-white/60 whitespace-nowrap uppercase font-bold overflow-hidden text-ellipsis w-3/5"
          >
            {obj.album.name}
          </div>
        </div>
      </CardHeader>

      <CardBody>
        <div className="h-4/6 relative">
          {/* Skeleton visible hasta que cargue la imagen */}
          {!imgLoaded && (
            <div className="absolute inset-0 rounded-lg bg-default-200/40 dark:bg-default-100/10 animate-pulse" />
          )}
          <a href={obj.album.external_urls.spotify} target="_blank">
            <img
              alt={obj.album.name}
              onLoad={() => setImgLoaded(true)}
              className={`object-cover h-full w-full rounded-lg transition-opacity duration-500 ${
                imgLoaded ? "opacity-100" : "opacity-0"
              }`}
              src={obj.album.images[0].url}
            />
          </a>
        </div>
      </CardBody>

      <CardFooter className="border-t-1 border-default-600 dark:border-default-100 w-full h-1/6 group">
        <div className="flex flex-col w-full">
          <div 
              className="h-3/6 text-sm text-white/60 w-fit whitespace-nowrap overflow-hidden text-ellipsis"
              href={obj.external_urls.spotify}
              target="_blank">
              {obj.name}

          </div>
          <div className="h-3/6">
            <p className="w-full text-tiny text-white/60 whitespace-nowrap overflow-hidden text-ellipsis">
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
    </>
  );
}

export default SongCard;