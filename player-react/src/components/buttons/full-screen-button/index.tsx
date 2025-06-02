import React, { JSX } from "react";
import { useVideoPlayerContext } from "../../../context";

import TransparentButton from "../../atoms/transparent-btn";
import WithPopper from "../../atoms/with-popper";
import FullScreen from "../../icons/full-screen";
import FullScreenExit from "../../icons/full-screen-exit";

interface FullscreenToggleButtonProps {
  isActive?: boolean;
  autoHide?: boolean;
}

export default function FullscreenToggleButton({
  isActive = true,
  autoHide = true,
}: FullscreenToggleButtonProps): JSX.Element {
  const { showElements, isFullScreen, toggleFullScreen } =
    useVideoPlayerContext();

  const opacityClass =
    autoHide && !showElements ? "vdb-p-opacity-0" : "vdb-p-opacity-1";

  return (
    <WithPopper
      popperText={isFullScreen ? "Exit Full Screen" : "Full Screen"}
      className={`vdb-p-transition-opacity ${opacityClass}`}
    >
      <TransparentButton
        className="vdb-p-flex vdb-p-h-40 vdb-p-w-48 vdb-p-rounded-8 vdb-p-font-semibold vdb-p-text-white sm:vdb-p-ml-8"
        defaultStateCss="vdb-p-bg-black-16 vdb-p-border vdb-p-border-white-16 vdb-p-backdrop-blur hover:vdb-p-bg-random-313131 hover:vdb-p-border-random-8e6200"
        disabledStateCss="vdb-p-bg-black-45 vdb-p-opacity-20 vdb-p-backdrop-blur vdb-p-cursor-not-allowed vdb-p-pointer-events-none"
        buttonState={isActive ? "default" : "hidden"}
        onClickAction={() => toggleFullScreen(!isFullScreen)}
      >
        <div>
          {isFullScreen ? (
            <FullScreenExit className="vdb-p-h-20 vdb-p-w-20" />
          ) : (
            <FullScreen className="vdb-p-flex vdb-p-h-20 vdb-p-w-20 group-hover:vdb-p-hidden" />
          )}
        </div>
      </TransparentButton>
    </WithPopper>
  );
}
