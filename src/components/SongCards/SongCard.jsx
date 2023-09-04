import { Button, Card, CardFooter, CardHeader, Image } from "@nextui-org/react";
import React from "react";

function SongCard({ obj, top }) {
  return (
    <Card isFooterBlurred className="col-span-12 sm:col-span-4 h-[300px]">
      <CardHeader className="absolute z-10 flex-col backdrop-blur-sm backdrop-saturate-150 bg-[#11192840]">
        <div className="flex w-full justify-between">
          <p className="text-tiny text-white/60 uppercase font-bold w-1/5 text-black">
            Top #{top}
          </p>
          <p className="text-tiny text-right text-white/60 uppercase font-bold whitespace-nowrap overflow-hidden text-ellipsis w-4/5">
            {obj.album.name}
          </p>
        </div>
      </CardHeader>
      <Image
        removeWrapper
        alt="Card background"
        className="z-0 w-full h-full object-cover"
        src={obj.album.images[0].url}
      />
      <CardFooter className="absolute bg-black/40 bottom-0 z-10 border-t-1 border-default-600 dark:border-default-100">
        <div className="flex w-full justify-between">
          <div className="flex-col w-9/12">
            <p className="text-small text-white/60">{obj.name}</p>
            <p className="text-tiny text-white/60 whitespace-nowrap overflow-hidden text-ellipsis">
              {obj.artists.map((artist, index) => (
                <span key={artist.id}>
                  {artist.name}
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
