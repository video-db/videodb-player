import React, { useMemo } from "react";
import { useVideoPlayerContext } from "../../../context";

interface TimeCodeProps {
  autoHide?: boolean;
}

export default function TimeCode({ autoHide = true }: TimeCodeProps) {
  const { time, duration, showElements } = useVideoPlayerContext();

  const showHours = (duration: number) => Math.floor(duration / 3600) > 0;

  const formatPadded = (num: number) => String(num).padStart(2, "0");

  const formatDuration = (duration: number) => {
    const hrs = formatPadded(Math.floor(duration / 3600)) + ":";
    const mins = formatPadded(Math.floor((duration % 3600) / 60)) + ":";
    const secs = formatPadded(Math.floor(duration % 60));
    return `${showHours(duration) ? hrs : ""}${mins}${secs}`;
  };

  const currentTime = useMemo(() => formatDuration(time), [time]);
  const totalTime = useMemo(() => formatDuration(duration), [duration]);

  const paragraphClasses = [
    "vdb-p-ml-12",
    "vdb-p-inline",
    "vdb-p-hidden",
    "vdb-p-font-medium",
    "vdb-p-text-white",
    "vdb-p-transition",
    "sm:vdb-p-block",
    autoHide && !showElements ? "vdb-p-opacity-0" : "vdb-p-opacity-1",
  ].join(" ");

  return (
    <p className={paragraphClasses}>
      <span>{currentTime}</span>
      <span>/</span>
      <span>{totalTime}</span>
    </p>
  );
}
