import React, { JSX, useEffect, useRef, useState } from "react";
import { useVideoPlayerContext } from "../../../context";
import TransparentButton from "../../atoms/transparent-btn";
import WithPopper from "../../atoms/with-popper";
import VolumeIcon from "../../icons/volume";
import VolumeMuteIcon from "../../icons/volume-mute";

interface VolumeControlButtonProps {
  isActive?: boolean;
  autoHide?: boolean;
}

export default function VolumeControlButton({
  isActive = true,
  autoHide = true,
}: VolumeControlButtonProps): JSX.Element {
  const { volume, setVolume, showElements } = useVideoPlayerContext();

  const [volumeDrag, setVolumeDrag] = useState(false);
  const volumeRef = useRef<HTMLDivElement>(null);
  const isPopperActive = true;

  const opacityClass =
    autoHide && !showElements ? "vdb-p-opacity-0" : "vdb-p-opacity-1";

  const updateVolume = (x: number, vol?: number) => {
    const volumeEl = volumeRef.current;
    if (!volumeEl) return;

    let percentAsDecimal = 0;
    if (vol !== undefined) {
      percentAsDecimal = vol;
    } else {
      const rect = volumeEl.getBoundingClientRect();
      const position = x - rect.left;
      percentAsDecimal = position / rect.width;
    }
    percentAsDecimal = Math.max(0, Math.min(1, percentAsDecimal));

    volumeEl.style.clip = `rect(0px, ${percentAsDecimal * 32}px, 10px, 0px)`;
    setVolume(percentAsDecimal);
  };

  const onMouseMove = (e: MouseEvent) => {
    if (volumeDrag) {
      updateVolume(e.pageX);
    }
  };

  const onMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    setVolumeDrag(true);
    updateVolume(e.pageX);
    if (typeof window !== "undefined") {
      window.addEventListener("mouseup", onMouseUp);
    }
  };

  const onMouseUp = (e: MouseEvent) => {
    if (typeof window === "undefined") return;
    if (volumeDrag) {
      setVolumeDrag(false);
      updateVolume(e.pageX);
    }
  };

  useEffect(() => {
    window.addEventListener("mousemove", onMouseMove);
    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
    };
  }, []);

  return (
    <TransparentButton
      className={`vdb-p-ml-8 vdb-p-hidden vdb-p-h-40 vdb-p-items-center vdb-p-rounded-8 vdb-p-px-8 vdb-p-font-semibold vdb-p-text-white vdb-p-transition-opacity sm:vdb-p-flex ${opacityClass}`}
      defaultStateCss="vdb-p-bg-black-16 vdb-p-border vdb-p-border-white-16 vdb-p-backdrop-blur hover:vdb-p-bg-random-313131 hover:vdb-p-border-random-8e6200"
      disabledStateCss="vdb-p-bg-black-45 vdb-p-opacity-20 vdb-p-backdrop-blur vdb-p-cursor-not-allowed vdb-p-pointer-events-none"
      buttonState={isActive ? "default" : "hidden"}
    >
      <div className="vdb-p-mr-8 vdb-p-flex">
        <WithPopper
          popperText={volume === 0 ? "Unmute" : "Mute"}
          isPopperActive={isPopperActive}
        >
          <div
            id="videoplay"
            className="vdb-p-flex vdb-p-h-20 vdb-p-w-20 focus:vdb-p-outline-none"
            onClick={() => updateVolume(0, volume === 0 ? 1 : 0)}
          >
            {volume === 0 ? (
              <VolumeMuteIcon className="vdb-p-h-20 vdb-p-w-20" />
            ) : (
              <VolumeIcon className="vdb-p-h-20 vdb-p-w-20" />
            )}
          </div>
        </WithPopper>
      </div>

      <div
        className={`volumeBar vdb-p-block vdb-p-h-4 vdb-p-w-32 vdb-p-cursor-pointer vdb-p-overflow-hidden vdb-p-rounded-full ${
          !isActive ? "vdb-p-opacity-50" : ""
        }`}
        onMouseDown={onMouseDown}
      >
        <div className="vdb-p-absolute vdb-p-h-4 vdb-p-w-32 vdb-p-rounded-full vdb-p-bg-white-40" />
        <div
          ref={volumeRef}
          className="vdb-p-absolute vdb-p-h-4 vdb-p-w-32 vdb-p-rounded-full vdb-p-bg-white"
        />
      </div>
    </TransparentButton>
  );
}
