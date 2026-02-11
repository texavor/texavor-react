"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function AiTracker({ trackingId }: { trackingId: string }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [currentUrl, setCurrentUrl] = useState("");

  useEffect(() => {
    // Construct full URL including query params
    if (typeof window !== "undefined") {
      const url = `${window.location.protocol}//${window.location.host}${pathname}${
        searchParams.toString() ? `?${searchParams.toString()}` : ""
      }`;
      setCurrentUrl(url);
    }
  }, [pathname, searchParams]);

  if (!currentUrl) return null;

  return (
    // We use a simple img tag for the pixel, but now with the FULL URL
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={`https://www.api.texavor.com/api/v1/pixel?id=${trackingId}&url=${encodeURIComponent(
        currentUrl,
      )}`}
      width="1"
      height="1"
      style={{ display: "none" }}
      alt=""
      aria-hidden="true"
    />
  );
}
