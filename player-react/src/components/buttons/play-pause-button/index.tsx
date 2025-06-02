import React, { JSX } from "react";
import { useVideoPlayerContext } from "../../../context";
import TransparentButton from "../../atoms/transparent-btn";
import WithPopper from "../../atoms/with-popper";
import PauseButton from "../../icons/pause";
import PlayButton from "../../icons/play";

interface PlayPauseButtonProps {
  isActive?: boolean;
  autoHide?: boolean;
}

export default function PlayPauseButton({
  isActive = true,
  autoHide = true,
}: PlayPauseButtonProps): JSX.Element {
  const { playing, togglePlay, showElements } = useVideoPlayerContext();

  const isPopperActive = true;

  const opacityClass =
    autoHide && !showElements ? "vdb-p-opacity-0" : "vdb-p-opacity-1";

  return (
    <WithPopper
      popperText={playing ? "Pause" : "Play"}
      isPopperActive={isPopperActive}
      className={`vdb-p-transition-opacity ${opacityClass}`}
    >
      <TransparentButton
        className="vdb-p-h-40 vdb-p-w-56"
        defaultStateCss="vdb-p-bg-black-16 vdb-p-border vdb-p-border-white-16 vdb-p-backdrop-blur hover:vdb-p-bg-random-313131 hover:vdb-p-border-random-8e6200"
        disabledStateCss="vdb-p-bg-black-45 vdb-p-opacity-20 vdb-p-backdrop-blur vdb-p-cursor-not-allowed vdb-p-pointer-events-none"
        buttonState={isActive ? "default" : "hidden"}
        onClickAction={togglePlay}
      >
        {playing ? (
          <PauseButton className="vdb-p-h-20 vdb-p-w-20" />
        ) : (
          <PlayButton className="vdb-p-h-20 vdb-p-w-20" />
        )}
      </TransparentButton>
    </WithPopper>
  );
}
