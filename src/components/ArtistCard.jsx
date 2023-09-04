import React from "react";
import { Card, CardFooter, Image, Button } from "@nextui-org/react";

function ArtistCard({ image, name, url }) {
  return (
    <Card className="col-span-12 sm:col-span-4 h-[280px] group">
      <Image
        removeWrapper
        alt="Card background"
        className="z-0 w-full h-full object-cover group-hover:scale-125 group-hover:brightness-75"
        src={image}
      />
      <CardFooter className="absolute bg-black/40 bottom-0 z-10 border-t-1 border-default-600 dark:border-default-100 opacity-0 group-hover:opacity-100">
        <div className="flex flex-grow gap-2 items-center">
          <Image
            alt="Breathing app icon"
            className="rounded-full w-8 h-8 "
            src="https://cdn-icons-png.flaticon.com/256/2111/2111624.png"
          />
          <div className="flex flex-col">
            <p className="text-tiny text-white/60">Escucha lo mejor de</p>
            <p className="text-tiny text-white/60">{`${name} en Spotify`}</p>
          </div>
        </div>
        <a href={url} target="_blank">
          <Button radius="full" size="sm" className="bg-[#1DB954]">
            App
          </Button>
        </a>
      </CardFooter>
    </Card>
  );
}

export default ArtistCard;
