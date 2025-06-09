import debounce from "lodash.debounce";
import React, {
  JSX,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import videojs from "video.js";
import Player from "video.js/dist/types/player";
import { useVideoPlayerContext } from "../../../context";
import "./index.css";

interface Chapter {
  id?: string | number;
  start: number;
  length: number;
  title?: string;
  end?: number;
}

interface Props {
  isActive?: boolean;
  autoHide?: boolean;
  streamUrl?: string;
  chaptersList?: Chapter[];
  persistentChapter?: boolean;
  manualSlide?: number | null;
  activeChapterProp?: string | null;
  showChapters?: boolean;
  previewPlayer?: string;
  isChapterExpanded?: boolean;
  setActiveChapter?: (chapterIndex: number | null) => void;
  hideChapterSummary?: (isVisible: boolean) => void;
  setPreviewVisibility?: (isVisible: boolean) => void;
}

export default function ProgressBar({
  isActive = true,
  autoHide = true,
  streamUrl = "",
  chaptersList = [],
  persistentChapter = false,
  manualSlide = null,
  activeChapterProp: activeChapterPropRaw = null,
  showChapters = false,
  isChapterExpanded = false,
  setActiveChapter = () => {},
  hideChapterSummary = () => {},
  setPreviewVisibility = () => {},
}: Props): JSX.Element {
  const { time, duration, seekTo, showElements } = useVideoPlayerContext();

  const feedbackPlayerRef = useRef<Player | null>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const videoPreviewRef = useRef<HTMLDivElement>(null);
  const progressBarInteractRef = useRef<HTMLDivElement>(null);
  const videoFeedbackPlayerRef = useRef<HTMLVideoElement>(null);

  const [moveToRatio, setMoveToRatio] = useState(0);
  const [videoDrag, setVideoDrag] = useState(false);
  const [seekGoToPoint, setSeekGoToPoint] = useState({
    ratio: 0,
    timePosition: 0,
  });
  const [showSummaryInfo, setShowSummaryInfo] = useState(true);
  const [activeChapterLocal, setActiveChapterLocal] = useState<number | null>(
    activeChapterPropRaw !== null ? Number(activeChapterPropRaw) : null,
  );
  const [leftOffset, setLeftOffset] = useState(0);

  useEffect(() => {
    setActiveChapterLocal(
      activeChapterPropRaw !== null ? Number(activeChapterPropRaw) : null,
    );
  }, [activeChapterPropRaw]);

  useEffect(() => {
    setActiveChapter(activeChapterLocal);
  }, [activeChapterLocal, setActiveChapter]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const isWide = window.innerWidth > 640;
      const maxRatio = isWide ? 11 / 12 : 10.5 / 12;
      const minRatio = isWide ? 1 / 12 : 1.5 / 12;
      const clampedRatio = Math.max(Math.min(moveToRatio, maxRatio), minRatio);
      setLeftOffset(clampedRatio * 100);
    }
  }, [moveToRatio]);

  const videoDateVal = useMemo(() => {
    if (!duration || !moveToRatio) return 0;
    return moveToRatio * duration * 1000;
  }, [duration, moveToRatio]);

  const shouldNotShowVideoPopover = useMemo(() => {
    if (typeof window === "undefined") return true;
    if (showChapters) {
      return (
        activeChapterLocal === null ||
        moveToRatio === 0 ||
        (window.innerWidth < 640 && persistentChapter)
      );
    }
    return moveToRatio === 0;
  }, [showChapters, activeChapterLocal, moveToRatio, persistentChapter]);

  const summaryCardVisible = useMemo(() => {
    const overlapThreshold = isChapterExpanded ? 0.22 : 0.52;
    if (activeChapterPropRaw === null) return false;
    if (persistentChapter) {
      return moveToRatio > overlapThreshold;
    }
    return true;
  }, [isChapterExpanded, activeChapterPropRaw, persistentChapter, moveToRatio]);

  const isSummaryCardOverlapping = useMemo(() => {
    return summaryCardVisible && persistentChapter;
  }, [summaryCardVisible, persistentChapter]);

  useEffect(() => {
    hideChapterSummary(isSummaryCardOverlapping);
  }, [isSummaryCardOverlapping, hideChapterSummary]);

  const summaryHiddenOnceRef = useRef(false);
  useEffect(() => {
    if (moveToRatio > 0 && showSummaryInfo && !summaryHiddenOnceRef.current) {
      summaryHiddenOnceRef.current = true;
      const timer = setTimeout(() => {
        setShowSummaryInfo(false);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [moveToRatio, showSummaryInfo]);

  useEffect(() => {
    setPreviewVisibility(moveToRatio > 0);
  }, [moveToRatio, setPreviewVisibility]);

  useEffect(() => {
    const getSource = () => {
      const src = streamUrl;
      if (!src) return null;
      let type = "video/mp4";
      if (src.endsWith("m3u8")) {
        type = "application/x-mpegURL";
      }
      return { src, type };
    };
    const source = getSource();

    if (videoFeedbackPlayerRef.current && source) {
      if (!feedbackPlayerRef.current) {
        feedbackPlayerRef.current = videojs(videoFeedbackPlayerRef.current, {
          autoplay: false,
          controls: false,
          currentTime: 0,
          html5: { nativeTextTracks: false },
          preload: "auto",
          sources: [source],
        });
      }
    }
    return () => {
      if (
        feedbackPlayerRef.current &&
        !feedbackPlayerRef.current.isDisposed()
      ) {
        feedbackPlayerRef.current.dispose();
        feedbackPlayerRef.current = null;
      }
    };
  }, [streamUrl]);

  const findCurrentChapter = useCallback(
    (timeToCheck: number): number | null => {
      if (duration === 0) return null;
      const referenceTime = Math.min(Math.max(timeToCheck, 0), duration);
      for (let i = 0; i < chaptersList.length; i++) {
        const chapter = chaptersList[i];
        if (
          chapter.start <= referenceTime &&
          chapter.start + chapter.length > referenceTime
        ) {
          return i;
        }
      }
      return null;
    },
    [chaptersList, duration],
  );

  const updateFeedbackPlayer = useCallback(
    debounce((t: number) => {
      if (
        feedbackPlayerRef.current &&
        !feedbackPlayerRef.current.isDisposed()
      ) {
        feedbackPlayerRef.current.currentTime(t);
      }
    }, 300),
    [],
  );

  const seekVideoTimeCallback = useCallback(
    (x: number) => {
      if (!progressBarRef.current || duration === 0) {
        return;
      }
      const rect = progressBarRef.current.getBoundingClientRect();
      let position = x - rect.left;
      const totalWidth = rect.width;

      position = Math.max(0, Math.min(position, totalWidth));

      const newRatio = position / totalWidth;
      const newTimePosition = Math.round(duration * newRatio);

      setSeekGoToPoint({
        ratio: newRatio,
        timePosition: newTimePosition,
      });
    },
    [duration, setSeekGoToPoint],
  );

  const handleDragStartMouseDown = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      setVideoDrag(true);
      seekVideoTimeCallback(e.pageX);
    },
    [seekVideoTimeCallback, setVideoDrag],
  );

  const handleDragStartTouchStart = useCallback(
    (e: React.TouchEvent<HTMLDivElement>) => {
      if (e.touches.length > 0) {
        setVideoDrag(true);
        seekVideoTimeCallback(e.touches[0].clientX);
      }
    },
    [seekVideoTimeCallback, setVideoDrag],
  );

  // Effect for managing global event listeners during drag
  useEffect(() => {
    const handleWindowMouseMove = (e: MouseEvent) => {
      seekVideoTimeCallback(e.pageX);
    };

    const handleWindowTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        seekVideoTimeCallback(Math.floor(e.touches[0].clientX));
      }
    };

    const handleWindowMouseUp = () => {
      setVideoDrag(false);
      seekTo(seekGoToPoint.timePosition);
      if (persistentChapter) {
        const chapter = findCurrentChapter(seekGoToPoint.timePosition);
        setActiveChapterLocal(chapter);
      }
    };

    const handleWindowTouchEnd = () => {
      setVideoDrag(false);
      seekTo(Math.floor(seekGoToPoint.timePosition));
      setMoveToRatio(0); // Reset hover ratio
      if (!persistentChapter) {
        setActiveChapterLocal(null);
      }
    };

    if (videoDrag) {
      window.addEventListener("mousemove", handleWindowMouseMove);
      window.addEventListener("touchmove", handleWindowTouchMove, {
        passive: true,
      }); // passive: false if preventDefault is used
      window.addEventListener("mouseup", handleWindowMouseUp);
      window.addEventListener("touchend", handleWindowTouchEnd);

      return () => {
        window.removeEventListener("mousemove", handleWindowMouseMove);
        window.removeEventListener("touchmove", handleWindowTouchMove);
        window.removeEventListener("mouseup", handleWindowMouseUp);
        window.removeEventListener("touchend", handleWindowTouchEnd);
      };
    }
  }, [
    videoDrag,
    seekVideoTimeCallback,
    seekTo,
    persistentChapter,
    findCurrentChapter,
    setActiveChapterLocal,
    setMoveToRatio,
    seekGoToPoint, // Ensure latest seekGoToPoint is used in up/end handlers
  ]);

  // --- Hover and Click Logic on progressBarInteract ---
  const handleMouseMoveForHover = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!progressBarRef.current || duration === 0) return;
      const rect = progressBarRef.current.getBoundingClientRect();
      const tempRatio = (e.clientX - rect.x) / rect.width;

      const currentMoveToRatio = Math.min(Math.max(0, tempRatio), 1); // Clamp between 0 and 1
      setMoveToRatio(currentMoveToRatio);

      const newTime = duration * currentMoveToRatio;
      updateFeedbackPlayer(newTime);

      if (chaptersList.length > 0) {
        setActiveChapterLocal(findCurrentChapter(newTime));
      } else {
        setActiveChapterLocal(null); // Vue had `true`, null seems more appropriate
      }
    },
    [
      duration,
      updateFeedbackPlayer,
      chaptersList,
      findCurrentChapter,
      setMoveToRatio,
      setActiveChapterLocal /* progressBarRef is stable */,
    ],
  );

  const handleMouseLeaveForHover = useCallback(() => {
    // Reset active chapter and hover ratio if not dragging
    if (!videoDrag) {
      // Only reset if not in midst of a drag
      setActiveChapterLocal(null);
      setMoveToRatio(0);
      // Potentially reset showSummaryInfo if it should reappear
      // setShowSummaryInfo(true);
      // summaryHiddenOnceRef.current = false;
    }
  }, [setActiveChapterLocal, setMoveToRatio, videoDrag]);

  const handleTouchMoveOnProgressBar = useCallback(
    (e: React.TouchEvent<HTMLDivElement>) => {
      if (e.touches.length > 0 && progressBarRef.current && duration > 0) {
        e.preventDefault(); // Prevent scrolling while scrubbing preview
        const clientX = e.touches[0].clientX;
        const rect = progressBarRef.current.getBoundingClientRect();
        const tempRatio = (clientX - rect.left) / rect.width;

        const currentMoveToRatio = Math.min(Math.max(0, tempRatio), 1);
        setMoveToRatio(currentMoveToRatio);

        const newTime = duration * currentMoveToRatio;
        updateFeedbackPlayer(newTime);

        if (chaptersList.length > 0) {
          setActiveChapterLocal(findCurrentChapter(newTime));
        } else {
          setActiveChapterLocal(null);
        }
      }
    },
    [
      duration,
      updateFeedbackPlayer,
      chaptersList,
      findCurrentChapter,
      setMoveToRatio,
      setActiveChapterLocal /* progressBarRef stable */,
    ],
  );

  const handleProgressClick = useCallback(() => {
    if (duration > 0) {
      const goTo = duration * moveToRatio; // moveToRatio is from hover state
      seekTo(goTo);
    }
  }, [duration, moveToRatio, seekTo]);

  const getActiveChapterTitle = useCallback(() => {
    if (activeChapterLocal === null || !chaptersList[activeChapterLocal])
      return "";
    return chaptersList[activeChapterLocal]?.title || "";
  }, [chaptersList, activeChapterLocal]);

  const isManuallySlid = (key: number) => {
    return persistentChapter && manualSlide === key && moveToRatio === 0;
  };

  const isActiveChapter = (key: number) => {
    // Vue: isActiveChapter(key) && (persistentChapter && manualSlide && !moveToRatio ? isManuallySlid(key) : true)) || isManuallySlid(key)
    // This logic in React becomes:
    const currentlyActive = activeChapterLocal === key;
    const manuallySlid = isManuallySlid(key);

    if (manuallySlid) return true;
    if (currentlyActive) {
      if (
        persistentChapter &&
        manualSlide !== null &&
        manualSlide <= key &&
        moveToRatio === 0
      ) {
        // Check this condition. Vue had manualSlide >= key for manualSlid class
        return isManuallySlid(key); // Which means if manualSlide is not key, it's false. So it means only if it *is* manually slid.
      }
      return true;
    }
    return false;
  };

  const headLeftPercent = videoDrag
    ? seekGoToPoint.ratio * 100
    : duration > 0
      ? (time / duration) * 100
      : 0;

  return (
    <div className="vdb-p-w-full">
      <div
        className={`progress-bar vdb-p-relative vdb-p-flex vdb-p-h-8 vdb-p-items-center vdb-p-transition-opacity ${
          isActive ? "" : "vdb-p-hidden" // Using hidden instead of conditional rendering for simplicity if preferred
        } ${
          (autoHide && !showElements) || duration === 0
            ? "vdb-p-opacity-0"
            : "vdb-p-opacity-1"
        }`}
        ref={progressBarRef}
      >
        <div
          ref={videoPreviewRef}
          className={`vdb-p-pointer-events-none vdb-p-absolute vdb-p-bottom-28 vdb-p-left-0 vdb-p-w-2/12 vdb-p-min-w-112 vdb-p--translate-x-1/2 vdb-p-transform vdb-p-rounded-b-8 vdb-p-pb-2 sm:vdb-p-bottom-16 sm:vdb-p-pb-4 ${
            shouldNotShowVideoPopover ? "vdb-p-opacity-0" : "vdb-p-opacity-100"
          }`}
          style={{
            left: `${leftOffset}%`,
            zIndex: 29,
          }}
        >
          <div className="vdb-p-relative vdb-p-w-full">
            <div
              className="vdb-p-relative vdb-p-mb-4 vdb-p-w-full sm:vdb-p-mb-4"
              style={{ paddingBottom: "56.25%" }}
            >
              <video
                ref={videoFeedbackPlayerRef}
                className="video-js vdb-p-bottom-0 vdb-p-left-0 !vdb-p-h-full !vdb-p-w-full vdb-p-rounded-4 vdb-p-border-2 vdb-p-border-white"
                style={{ position: "absolute" }}
                playsInline
                preload="metadata"
              />
            </div>
          </div>
          {showChapters && (
            <div className="chapter-title-cont vdb-p-relative vdb-p-flex vdb-p-items-center vdb-p-justify-center vdb-p-transition-all">
              <p className="three-line-ellipses title-blur vdb-p-h-auto vdb-p-max-h-full vdb-p-w-full vdb-p-rounded-8 vdb-p-p-8 vdb-p-text-center vdb-p-font-primary vdb-p-text-lg vdb-p-capitalize vdb-p-text-white">
                {activeChapterLocal !== null
                  ? `${activeChapterLocal + 1}. `
                  : ""}
                {getActiveChapterTitle()}
              </p>
            </div>
          )}
          <p className="text-shadow vdb-p-w-full vdb-p-whitespace-nowrap vdb-p-text-center vdb-p-text-xs vdb-p-font-medium vdb-p-text-white">
            <span>
              {new Date(videoDateVal || 0).toISOString().substring(11, 19)}
            </span>
          </p>
        </div>

        {/* Main timelines */}
        <div className="main-timeline vdb-p-absolute vdb-p-left-0 vdb-p-top-2 vdb-p-w-full">
          {chaptersList.length === 0 ? (
            <div
              className={`chapter vdb-p-w-full vdb-p-backdrop-blur-lg ${
                // Assuming .chapter has height, bg etc.
                activeChapterLocal !== null ? "active" : "" // 'active' class might need specific styling
              }`}
            >
              {/* Seekbar */}
              <div
                className="vdb-p-absolute vdb-p-left-0 vdb-p-top-0 vdb-p-h-full vdb-p-bg-white vdb-p-shadow-2" // seekbar needs base styling from .chapter
                style={{
                  width: videoDrag
                    ? `${seekGoToPoint.ratio * 100}%`
                    : duration > 0
                      ? `${(time / duration) * 100}%`
                      : "0%",
                }}
              />
              {/* Hover fade bar */}
              <div
                className={`vdb-p-pointer-events-none vdb-p-absolute vdb-p-left-0 vdb-p-top-0 vdb-p-h-full vdb-p-bg-white vdb-p-shadow-2 ${
                  activeChapterLocal !== null // Based on hover, not main playhead
                    ? "vdb-p-opacity-40"
                    : "vdb-p-opacity-0"
                }`}
                style={{
                  width: `${moveToRatio * 100}%`,
                }}
              />
            </div>
          ) : (
            <div className="chaptersCont vdb-p-flex vdb-p-items-center vdb-p-gap-2">
              {chaptersList.map((chapter, key) => (
                <div
                  key={chapter.id || String(chapter.end) || key} // Ensure a unique key
                  className={`chapter ${
                    // Base .chapter styles needed
                    isActiveChapter(key) ? "active" : ""
                  } ${
                    persistentChapter &&
                    manualSlide !== null &&
                    manualSlide >= key &&
                    moveToRatio === 0
                      ? "manualSlid"
                      : ""
                  }`}
                  style={{
                    width:
                      duration > 0
                        ? `${(chapter.length / duration) * 100}%`
                        : "0%",
                    maxWidth:
                      duration > 0
                        ? `${(chapter.length / duration) * 100}%`
                        : "0%",
                  }}
                >
                  {/* Hover faded bar */}
                  <div
                    className="vdb-p-pointer-events-none vdb-p-absolute vdb-p-left-0 vdb-p-top-0 vdb-p-hidden vdb-p-h-full vdb-p-bg-white vdb-p-shadow-2 md:vdb-p-block"
                    style={{
                      width:
                        chapter.length > 0
                          ? `${
                              Math.max(
                                0,
                                Math.min(
                                  1,
                                  (moveToRatio * duration - chapter.start) /
                                    chapter.length,
                                ),
                              ) * 100
                            }%`
                          : "0%",
                    }}
                  />
                  {/* Seekbar */}
                  <div
                    className="vdb-p-absolute vdb-p-left-0 vdb-p-top-0 vdb-p-h-full vdb-p-bg-primary" // Primary color for played part
                    style={{
                      width:
                        chapter.length > 0
                          ? `${
                              Math.max(
                                0,
                                Math.min(
                                  1,
                                  ((videoDrag
                                    ? seekGoToPoint.ratio * duration
                                    : time) -
                                    chapter.start) /
                                    chapter.length,
                                ),
                              ) * 100
                            }%`
                          : "0%",
                    }}
                  />
                </div>
              ))}
            </div>
          )}
        </div>

        <div
          ref={progressBarInteractRef}
          className="vdb-p-absolute vdb-p--bottom-2 vdb-p-left-0 vdb-p-right-0 vdb-p-top-4 vdb-p-cursor-pointer sm:vdb-p--bottom-3 sm:vdb-p-top-3"
          onMouseDown={handleDragStartMouseDown}
          onTouchStart={handleDragStartTouchStart}
          onMouseMove={handleMouseMoveForHover}
          onMouseLeave={handleMouseLeaveForHover}
          onTouchMove={handleTouchMoveOnProgressBar}
          onClick={handleProgressClick}
        >
          <div
            className={`head vdb-p-align-center vdb-p-absolute vdb-p-top-0 vdb-p-z-10 vdb-p-flex vdb-p-h-10 vdb-p-w-10 vdb-p--translate-x-1/2 vdb-p--translate-y-1/2 vdb-p-transform vdb-p-cursor-pointer vdb-p-overflow-visible vdb-p-rounded-full vdb-p-border-2 vdb-p-border-outline-light vdb-p-bg-primary vdb-p-shadow-3 vdb-p-transition sm:vdb-p-h-14 sm:vdb-p-w-14 sm:vdb-p--translate-y-1/4 ${
              duration > 0 && time / duration <= 0.1
                ? "vdb-p-justify-start"
                : duration > 0 && time / duration >= 0.9
                  ? "vdb-p-justify-end"
                  : "vdb-p-justify-center"
            }`}
            style={{
              left: `${headLeftPercent}%`,
            }}
          >
            <span
              className={`vdb-p-pointer-events-none vdb-p-absolute vdb-p-flex vdb-p--translate-y-20 vdb-p-transform vdb-p-text-caption2 vdb-p-transition-opacity sm:vdb-p-hidden ${
                isActive && !persistentChapter && !videoDrag
                  ? "vdb-p-opacity-100"
                  : "vdb-p-opacity-0"
              }`}
            >
              <span className="vdb-p-text-white">
                {new Date(time * 1000).toISOString().substring(11, 19)}
              </span>
              <span className="vdb-p-text-kilvish-500">
                 / 
                {new Date(duration * 1000).toISOString().substring(11, 19)}
              </span>
            </span>
          </div>
        </div>
      </div>
      {/* Fallback for when not active */}
      {!isActive && (
        <div className="progress-bar vdb-p-mb-12 vdb-p-h-4 vdb-p-w-full vdb-p-bg-black-16 vdb-p-opacity-0"></div>
      )}
    </div>
  );
}
