"use client";

import { useState } from "react";
import Image, { type ImageProps } from "next/image";
import { Skeleton } from "skullet/react";

// Image with a Skullet skeleton until it has loaded.
export function SkeletonImage({ onLoad, ...props }: ImageProps) {
  const [loading, setLoading] = useState(true);
  return (
    <Skeleton loading={loading} label="Loading image">
      <Image
        {...props}
        onLoad={(e) => {
          setLoading(false);
          onLoad?.(e);
        }}
      />
    </Skeleton>
  );
}
