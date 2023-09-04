import React from 'react'
import { Card, Image, Skeleton } from "@nextui-org/react";

function Top1Skeleton() {
  return (
    <Card className="w-full h-[280px] col-span-12 sm:col-span-7">
    <Skeleton className="h-full w-full">
      <Image width={300} alt="loading image" />
    </Skeleton>
  </Card>
  )
}

export default Top1Skeleton