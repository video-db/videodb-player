import React, {
  ReactNode,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import {
  SubtitlesConfig,
  VideoPlayerContext,
  VideoPlayerContextType,
} from "../../../context";
import useVideoDBPlayer from "../../../hooks/useVideoJSPlayer";
import "../../../styles.css";
import "../../../videojs.css";
import TimeCode from "../../atoms/time-code";
import BigCenterButton from "../../buttons/big-center-button";
import CaptionToggleButton from "../../buttons/caption-button";
import FullscreenToggleButton from "../../buttons/full-screen-button";
import PlayPauseButton from "../../buttons/play-pause-button";
import SpeedControlButton from "../../buttons/speed-control-button";
import VolumeControlButton from "../../buttons/volume-control-button";
import ProgressBar from "../progress-bar";

interface VideoPlayerProps {
  streamUrl: string;
  thumbnailUrl?: string;
  subtitlesConfig?: SubtitlesConfig;
  startAt?: number;
  autoPlay?: boolean;
  autoHideDuration?: number;
  defaultControls?: boolean;
  defaultOverlay?: boolean;
  defaultPlayBackRate?: number;
  aspectRatio?: string;
  debug?: boolean;
  overlayContent?: ReactNode;
  controlsContent?: ReactNode;
  onPlay?: (event?: Event) => void;
  onPause?: (event?: Event) => void;
  onEnded?: (event?: Event) => void;
  onLoadedData?: (event?: Event) => void;
  onWaiting?: (event?: Event) => void;
  onPlaying?: (event?: Event) => void;
  onTimeUpdate?: (event?: Event) => void;
  onCanPlay?: (event?: Event) => void;
  onCanPlayThrough?: (event?: Event) => void;
  onVideoError?: (error?: Error) => void;
  onToggleSubtitles?: (isShowingSubtitles?: boolean) => void;
  onFullScreenChange?: (isFullScreen?: boolean) => void;
}

export default function VideoPlayer({
  streamUrl,
  thumbnailUrl = "",
  subtitlesConfig = {
    src: "",
    kind: "captions",
    lang: "en",
    label: "English",
  },
  startAt = 0,
  autoPlay = false,
  autoHideDuration = 5000,
  defaultControls = true,
  defaultOverlay = true,
  defaultPlayBackRate = 1,
  aspectRatio = "16:9",
  controlsContent,
  overlayContent,
  onPlay,
  onPause,
  onEnded,
  onLoadedData,
  onWaiting,
  onPlaying,
  onTimeUpdate,
  onCanPlay,
  onCanPlayThrough,
  onVideoError,
  onToggleSubtitles,
  onFullScreenChange,
}: VideoPlayerProps) {
  const videoWrapperRef = useRef<HTMLDivElement>(null);
  const videoElementRef = useRef<HTMLVideoElement>(null);
  const showElementsMouseMoveInterval = useRef<NodeJS.Timeout | null>(null);

  const [showElements, setShowElements] = useState(true);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [showSubtitles, setShowSubtitles] = useState(false);

  const aspectRatioPadding = `${
    (Number(aspectRatio.split(":")[1]) / Number(aspectRatio.split(":")[0])) *
    100
  }%`;

  const emit = useCallback(
    (event: string, data: { event: Event; error?: Error }) => {
      switch (event) {
        case "play":
          if (onPlay) onPlay(data.event);
          break;
        case "pause":
          if (onPause) onPause(data.event);
          break;
        case "ended":
          if (onEnded) onEnded(data.event);
          break;
        case "loadeddata":
          if (onLoadedData) onLoadedData(data.event);
          break;
        case "waiting":
          if (onWaiting) onWaiting(data.event);
          break;
        case "playing":
          if (onPlaying) onPlaying(data.event);
          break;
        case "timeupdate":
          if (onTimeUpdate) onTimeUpdate(data.event);
          break;
        case "canplay":
          if (onCanPlay) onCanPlay(data.event);
          break;
        case "canplaythrough":
          if (onCanPlayThrough) onCanPlayThrough(data.event);
          break;
        case "videoerror":
          if (onVideoError) onVideoError(data.error);
          break;
        default:
          break;
      }
    },
    [
      onPlay,
      onPause,
      onEnded,
      onLoadedData,
      onWaiting,
      onPlaying,
      onTimeUpdate,
      onCanPlay,
      onCanPlayThrough,
      onVideoError,
    ],
  );

  const {
    playing,
    volume,
    videoMuted,
    duration,
    time,
    percentagePlayed,
    playBackRate,
    play,
    pause,
    togglePlay,
    toggleMute,
    seekTo,
    seekToPercentage,
    setVolume,
    setPlayBackRate,
    convertTimeToDuration,
    togglePictureInPicture,
    initializePlayer,
  } = useVideoDBPlayer(emit, {
    streamUrl,
    thumbnailUrl,
    startAt,
    autoPlay,
    defaultPlayBackRate,
  });

  const toggleFullScreen = useCallback(
    (value?: boolean) => {
      const newState = value !== undefined ? value : !isFullScreen;
      setIsFullScreen(newState);
      if (onFullScreenChange) onFullScreenChange(newState);
    },
    [isFullScreen, onFullScreenChange],
  );

  const toggleSubtitlesHandler = useCallback(
    (value: boolean) => {
      setShowSubtitles(value);
      if (onToggleSubtitles) onToggleSubtitles(value);
    },
    [onToggleSubtitles],
  );

  useEffect(() => {
    if (videoElementRef.current) {
      initializePlayer(videoElementRef.current);
    }
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (["TEXTAREA", "INPUT"].includes(document.activeElement?.tagName || ""))
        return;

      if (e.code === "Space") {
        e.preventDefault();
        togglePlay();
      } else if (e.code === "Escape" && isFullScreen) {
        toggleFullScreen(false);
      }
    };

    const handleMouseMove = () => {
      if (showElementsMouseMoveInterval.current) {
        clearTimeout(showElementsMouseMoveInterval.current);
      }
      setShowElements(true);
      showElementsMouseMoveInterval.current = setTimeout(() => {
        if (playing) {
          setShowElements(false);
        }
      }, autoHideDuration);
    };

    const handleTouchEnd = () => {
      if (showElementsMouseMoveInterval.current) {
        clearTimeout(showElementsMouseMoveInterval.current);
      }
      setShowElements(true);
      showElementsMouseMoveInterval.current = setTimeout(() => {
        if (playing) {
          setShowElements(false);
        }
      }, autoHideDuration);
    };

    const handleMouseEnter = () => {
      setShowElements(true);
      window.addEventListener("mousemove", handleMouseMove);
    };

    const handleMouseLeave = () => {
      if (showElementsMouseMoveInterval.current) {
        clearTimeout(showElementsMouseMoveInterval.current);
      }
      if (playing) {
        setShowElements(false);
      }
      window.removeEventListener("mousemove", handleMouseMove);
    };

    const wrapper = videoWrapperRef.current;
    document.addEventListener("keydown", handleKeyDown);
    if (wrapper) {
      if (window.matchMedia("(any-hover: none)").matches) {
        wrapper.addEventListener("touchend", handleTouchEnd);
      } else {
        wrapper.addEventListener("mouseenter", handleMouseEnter);
        wrapper.addEventListener("mouseleave", handleMouseLeave);
      }
    }

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      if (wrapper) {
        wrapper.removeEventListener("touchend", handleTouchEnd);
        wrapper.removeEventListener("mouseenter", handleMouseEnter);
        wrapper.removeEventListener("mouseleave", handleMouseLeave);
      }
      window.removeEventListener("mousemove", handleMouseMove);
      if (showElementsMouseMoveInterval.current) {
        clearTimeout(showElementsMouseMoveInterval.current);
      }
    };
  }, [playing, autoHideDuration, togglePlay, isFullScreen, toggleFullScreen]);

  const contextValue: VideoPlayerContextType = {
    showElements,
    playing,
    volume,
    videoMuted,
    duration,
    time,
    percentagePlayed,
    playBackRate,
    showSubtitles,
    subtitlesConfig,
    isFullScreen,
    play,
    pause,
    togglePlay,
    toggleMute,
    seekTo,
    seekToPercentage,
    setPlayBackRate,
    setVolume,
    convertTimeToDuration,
    toggleFullScreen,
    togglePictureInPicture,
    toggleSubtitles: toggleSubtitlesHandler,
  };

  return (
    <VideoPlayerContext.Provider value={contextValue}>
      <div
        className="vdb-p-relative vdb-p-w-full"
        style={{ paddingBottom: aspectRatioPadding }}
      >
        <div className="vdb-p-absolute vdb-p-inset-0 vdb-p-h-full vdb-p-w-full vdb-p-overflow-hidden vdb-p-bg-kilvish-200">
          <div
            ref={videoWrapperRef}
            className={`video-container vdb-p-outline-16 vdb-p-relative vdb-p-h-full vdb-p-select-none vdb-p-outline-kilvish-200 ${
              showElements ? "show-elements" : ""
            } ${!showSubtitles ? "hide-subtitles" : ""}`}
          >
            <video
              ref={videoElementRef}
              className="video-js vdb-p-pointer-events-none vdb-p-absolute vdb-p-bottom-0 vdb-p-left-0 vdb-p-right-0 vdb-p-top-0 !vdb-p-h-full !vdb-p-w-auto"
              playsInline
            >
              {subtitlesConfig?.src && (
                <track
                  kind={subtitlesConfig.kind || "captions"}
                  src={subtitlesConfig.src}
                  srcLang={subtitlesConfig.lang || "en"}
                  label={subtitlesConfig.label || "English"}
                  default
                />
              )}
            </video>

            {/* Backlayer */}
            <div className="vdb-p-absolute vdb-p-left-0 vdb-p-right-0 vdb-p-top-0 vdb-p-h-full vdb-p-w-full">
              <div
                className={`vdb-p-duration-400 vdb-p-absolute vdb-p-bottom-0 vdb-p-left-0 vdb-p-right-0 vdb-p-top-0 vdb-p-block vdb-p-cursor-pointer vdb-p-bg-gradient-to-b vdb-p-from-black vdb-p-to-transparent vdb-p-transition-opacity vdb-p-ease-in-out ${
                  !playing || showElements
                    ? "vdb-p-opacity-40"
                    : "vdb-p-opacity-0"
                }`}
                onClick={togglePlay}
              />
              {!defaultOverlay ? (
                overlayContent
              ) : (
                <BigCenterButton className="vdb-p-absolute vdb-p-left-1/2 vdb-p-top-1/2 vdb-p-translate-x-[-50%] vdb-p-translate-y-[-50%]" />
              )}
            </div>

            <div
              className={`vdb-p-absolute vdb-p-bottom-0 vdb-p-w-full ${
                showElements ? "lg-black-40" : "lg-transparent"
              }`}
            >
              {!defaultControls ? (
                controlsContent
              ) : (
                <div className="vdb-p-p-20 vdb-p-pt-0">
                  <div className="vdb-p-mb-12 sm:vdb-p-mx-8">
                    <ProgressBar streamUrl={streamUrl} />
                  </div>
                  <div className="vdb-p-flex vdb-p-w-full vdb-p-justify-between">
                    <div className="vdb-p-z-10 vdb-p-ml-0 vdb-p-flex vdb-p-items-center">
                      <PlayPauseButton />
                      <VolumeControlButton />
                      <TimeCode />
                    </div>
                    <div className="vdb-p-flex vdb-p-w-auto vdb-p-flex-row vdb-p-items-center">
                      <CaptionToggleButton />
                      <SpeedControlButton
                        speedOptions={[1, 1.2, 1.5, 1.8, 2]}
                      />
                      <FullscreenToggleButton />
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </VideoPlayerContext.Provider>
  );
}
