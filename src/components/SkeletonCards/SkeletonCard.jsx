import React from "react";
import {Skeleton} from "@heroui/skeleton";

function SkeletonCard() {
  return (
    <Skeleton className="w-full h-[300px] max-sm:h-[230px] col-span-6 sm:col-span-3 overflow-hidden">
      <div className="h-full w-full rounded-large bg-default-200/40 dark:bg-default-100/10 animate-pulse" />
    </Skeleton>
  );
}

export default SkeletonCard;