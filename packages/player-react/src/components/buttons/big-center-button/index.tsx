import React from "react";
import { useVideoPlayerContext } from "../../../context";
import TransparentButton from "../../atoms/transparent-btn";
import PauseButton from "../../icons/pause";
import PlayButton from "../../icons/play";

interface BigCenterButtonProps {
  className?: string;
  isActive?: boolean;
  autoHide?: boolean;
}

function BigCenterButton({
  className = "",
  isActive = true,
  autoHide = true,
}: BigCenterButtonProps) {
  const { playing, togglePlay, showElements } = useVideoPlayerContext();

  const buttonClassName =
    `vdb-p-h-72 vdb-p-w-72 vdb-p-rounded-full ${className} ` +
    (autoHide && !showElements ? "vdb-p-opacity-0" : "vdb-p-opacity-1");
  return (
    <TransparentButton
      className={buttonClassName}
      defaultStateCss="vdb-p-bg-black-16 vdb-p-border vdb-p-border-white-16 vdb-p-backdrop-blur hover:vdb-p-bg-random-313131 hover:vdb-p-border-random-8e6200"
      disabledStateCss="vdb-p-bg-black-45 vdb-p-opacity-20 vdb-p-backdrop-blur vdb-p-cursor-not-allowed vdb-p-pointer-events-none"
      buttonState={isActive ? "default" : "hidden"}
      onClickAction={togglePlay}
    >
      {playing ? (
        <PauseButton className="vdb-p-h-[38.89%] vdb-p-w-[38.89%]" />
      ) : (
        <PlayButton className="vdb-p-h-[38.89%] vdb-p-w-[38.89%]" />
      )}
    </TransparentButton>
  );
}

export default BigCenterButton;
