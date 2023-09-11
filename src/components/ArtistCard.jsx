import { Card, CardFooter, CardHeader, Image } from "@nextui-org/react";
import React from "react";

function SongCard({ obj, top }) {
  return (
    <Card
      isFooterBlurred
      className="w-full h-[300px] col-span-12 sm:col-span-3 bg-[#111928bf]"
    >
      <CardHeader className="z-10 flex-col h-1/6">
        <div className="flex w-full justify-between h-full items-center">
          <p className="text-tiny text-center text-white/60 uppercase font-bold w-full">
            Top #{top}
          </p>
        </div>
      </CardHeader>
      <div className="h-4/6">
        <a href={obj.external_urls.spotify} target="_blank">
          <Image
            removeWrapper
            alt="Relaxing app background"
            className="object-contain rounded-none h-full w-full"
            src={obj.images[0].url}
          />
        </a>
      </div>
      <CardFooter className="border-t-1 border-default-600 dark:border-default-100 w-full h-1/6">
        <a
          href={obj.external_urls.spotify}
          target="_blank"
          className="text-tiny text-center text-white/60 uppercase font-bold whitespace-nowrap overflow-hidden text-ellipsis w-full"
        >
          {obj.name}
        </a>
      </CardFooter>
    </Card>
  );
}

export default SongCard;
