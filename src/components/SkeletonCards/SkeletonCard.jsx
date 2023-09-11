import React from 'react'
import { Card, Image, Skeleton } from "@nextui-org/react";

function SkeletonCard() {
  return (
    <Card className="w-full h-[300px] col-span-12 sm:col-span-3">
    <Skeleton className="h-full w-full">
      <Image width={300} alt="loading image" />
    </Skeleton>
  </Card>
  )
}

export default SkeletonCard