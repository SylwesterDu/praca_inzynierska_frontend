"use client";
import ReactPlayer from "react-player";

export function VideoPlayer({ url }: { url: string }) {
  return <ReactPlayer url={url} width="100%" height="100%" />;
}
