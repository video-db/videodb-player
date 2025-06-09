import React, { JSX } from "react";
import { useVideoPlayerContext } from "../../../context";
import TransparentButton from "../../atoms/transparent-btn";
import WithPopper from "../../atoms/with-popper";

interface PlaybackRateButtonProps {
  isActive?: boolean;
  autoHide?: boolean;
  speedOptions?: number[];
}

export default function SpeedControlButton({
  isActive = true,
  autoHide = true,
  speedOptions = [1, 1.2, 1.5, 1.8, 2],
}: PlaybackRateButtonProps): JSX.Element {
  const { playBackRate, setPlayBackRate, showElements } =
    useVideoPlayerContext();
  const isPopperActive = true;

  const opacityClass =
    autoHide && !showElements ? "vdb-p-opacity-0" : "vdb-p-opacity-1";

  const onClickPlaybackRate = () => {
    const currentIndex = speedOptions.indexOf(playBackRate);
    const nextIndex = (currentIndex + 1) % speedOptions.length;
    setPlayBackRate(speedOptions[nextIndex]);
  };

  return (
    <WithPopper
      popperText="Change Speed"
      isPopperActive={isPopperActive}
      className={`vdb-p-transition ${opacityClass}`}
    >
      <TransparentButton
        className="vdb-p-pale vdb-p-group vdb-p-ml-8 vdb-p-h-40 vdb-p-w-48"
        defaultStateCss="vdb-p-bg-black-16 vdb-p-border vdb-p-border-white-16 vdb-p-backdrop-blur hover:vdb-p-bg-random-313131 hover:vdb-p-border-random-8e6200"
        disabledStateCss="vdb-p-bg-black-45 vdb-p-opacity-20 vdb-p-backdrop-blur vdb-p-cursor-not-allowed vdb-p-pointer-events-none"
        buttonState={isActive ? "default" : "hidden"}
        onClickAction={onClickPlaybackRate}
      >
        <div className="vdb-p-text-white">{playBackRate}x</div>
      </TransparentButton>
    </WithPopper>
  );
}
