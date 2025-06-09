import React, { JSX, useMemo } from "react";
import { useVideoPlayerContext } from "../../../context";
import TransparentButton from "../../atoms/transparent-btn";
import WithPopper from "../../atoms/with-popper";

interface CaptionToggleButtonProps {
  isActive?: boolean;
  autoHide?: boolean;
}

export default function CaptionToggleButton({
  isActive = true,
  autoHide = true,
}: CaptionToggleButtonProps): JSX.Element {
  const { showElements, showSubtitles, toggleSubtitles, subtitlesConfig } =
    useVideoPlayerContext();

  const captionButtonState = useMemo(() => {
    if (!subtitlesConfig?.src) return "disabled";
    return showSubtitles ? "active" : "default";
  }, [showSubtitles, subtitlesConfig]);

  const opacityClass =
    autoHide && !showElements ? "vdb-p-opacity-0" : "vdb-p-opacity-1";

  return (
    <WithPopper
      popperText="Toggle subtitles"
      isPopperActive={isActive}
      className={`vdb-p-hidden vdb-p-transition sm:vdb-p-block ${opacityClass}`}
    >
      <TransparentButton
        className="vdb-p-pale vdb-p-group vdb-p-ml-8 vdb-p-h-40 vdb-p-w-48"
        defaultStateCss="vdb-p-bg-black-16 vdb-p-border vdb-p-border-white-16 vdb-p-backdrop-blur hover:vdb-p-bg-random-313131 hover:vdb-p-border-random-8e6200"
        activeStateCss="vdb-p-bg-black-16 vdb-p-border vdb-p-border-white-56 vdb-p-backdrop-blur"
        disabledStateCss="vdb-p-bg-black-45 vdb-p-opacity-20 vdb-p-backdrop-blur vdb-p-cursor-not-allowed vdb-p-pointer-events-none"
        buttonState={captionButtonState}
        onClickAction={() => toggleSubtitles(!showSubtitles)}
      >
        <div
          className={`vdb-p-text-white ${
            captionButtonState === "active" ? "vdb-p-underline" : ""
          }`}
        >
          CC
        </div>
      </TransparentButton>
    </WithPopper>
  );
}
