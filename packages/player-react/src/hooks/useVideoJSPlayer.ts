import { useCallback, useEffect, useRef, useState } from "react";
import videojs from "video.js";
import type Player from "video.js/dist/types/player";

type PlayerProps = {
  streamUrl: string;
  autoPlay?: boolean;
  muted?: boolean;
  startAt?: number;
  thumbnailUrl?: string;
  defaultPlayBackRate?: number;
  debug?: boolean;
  onVideoError?: (error: Error) => void;
};

type PlayerEvents =
  | "play"
  | "pause"
  | "ended"
  | "loadeddata"
  | "waiting"
  | "playing"
  | "timeupdate"
  | "canplay"
  | "canplaythrough";

type EventEmitter = (event: PlayerEvents, data: { event: Event }) => void;

export default function useVideoDBPlayer(
  emit: EventEmitter,
  props: PlayerProps,
) {
  const [playing, setPlaying] = useState(false);
  const [volume, setVolume] = useState(1);
  const [videoMuted, setVideoMuted] = useState(props.muted || false);
  const [time, setTime] = useState(props.startAt || 0);
  const [duration, setDuration] = useState(0);
  const [percentagePlayed, setPercentagePlayed] = useState(0);
  const [playBackRate, setPlayBackRate] = useState(
    props.defaultPlayBackRate || 1,
  );

  const playerRef = useRef<Player | null>(null);

  const getSource = () => {
    const src = props.streamUrl;
    const type = "application/x-mpegURL";

    return { src, type };
  };

  const events: PlayerEvents[] = [
    "play",
    "pause",
    "ended",
    "loadeddata",
    "waiting",
    "playing",
    "timeupdate",
    "canplay",
    "canplaythrough",
  ];

  const initializePlayer = (playerElement: HTMLVideoElement | null) => {
    if (playerElement) {
      try {
        const source = getSource();
        playerRef.current = videojs(playerElement, {
          autoplay: props.autoPlay,
          controls: false,
          html5: {
            nativeTextTracks: false,
          },
          preload: true,
          poster: props.thumbnailUrl,
          sources: [source],
          crossorigin: "anonymous",
        });
        bindEvents(events, emit);
      } catch (err) {
        if (props.onVideoError) {
          props.onVideoError(err as Error);
        }
        console.error("Error in initializing player ", err);
        return;
      }
    }
  };

  const play = async () => {
    if (playerRef.current) {
      await playerRef.current.play();
      setPlaying(true);
    }
  };

  const pause = () => {
    if (playerRef.current) {
      playerRef.current.pause();
      setPlaying(false);
    }
  };

  const togglePlay = () => {
    if (playing) {
      pause();
    } else {
      play();
    }
  };

  const setMuted = (state: boolean) => {
    if (playerRef.current) {
      playerRef.current.muted(state);
      setVideoMuted(state);
    }
  };

  const toggleMute = () => {
    if (videoMuted) {
      setMuted(false);
    } else {
      setMuted(true);
    }
  };

  const setVolumeValue = (percentAsDecimal: number) => {
    if (playerRef.current) {
      playerRef.current.volume(percentAsDecimal);
      setVolume(percentAsDecimal);
    }
  };

  const seekTo = useCallback(
    (timeValue: number) => {
      if (playerRef.current) {
        let newTime = parseInt(timeValue.toString());
        if (isNaN(newTime) && !isFinite(newTime)) return;

        if (newTime < 0) {
          newTime = 0;
        }

        if (newTime > duration) {
          newTime = duration;
          pause();
        }
        playerRef.current.currentTime(timeValue);
      }
    },
    [duration],
  );

  const seekToPercentage = (percentage: number) => {
    const newTime = (percentage / 100) * duration;
    seekTo(newTime);
  };

  const setPlayBackRateValue = (value: number) => {
    if (playerRef.current) {
      setPlayBackRate(value);
      playerRef.current.playbackRate(value);
    }
  };

  const convertTimeToDuration = (seconds: number) => {
    return [Math.floor((seconds / 60) % 60), Math.floor(seconds % 60)]
      .map((num) => num.toString().padStart(2, "0"))
      .join(":");
  };

  const togglePictureInPicture = () => {
    if (document.pictureInPictureElement) {
      document.exitPictureInPicture();
    } else if (document.pictureInPictureEnabled && playerRef.current) {
      playerRef.current.requestPictureInPicture();
    }
  };

  const bindEvents = (
    eventList: PlayerEvents[],
    eventEmitter: EventEmitter,
  ) => {
    if (playerRef.current !== null) {
      eventList.forEach((customEvent) => {
        playerRef.current?.on(customEvent, (event: Event) => {
          if (props.debug) console.log("Player event ", customEvent, event);
          switch (customEvent) {
            case "loadeddata":
              if (playerRef.current) {
                setDuration(playerRef.current.duration() ?? 0);
                seekTo(props.startAt || 0);
              }
              break;
            case "canplay":
              if (playerRef.current) {
                setDuration(playerRef.current.duration() ?? 0);
              }
              break;
            case "timeupdate":
              if (playerRef.current) {
                const currentTime = playerRef.current.currentTime();
                const percent =
                  ((currentTime ?? 0) / (playerRef.current.duration() ?? 1)) *
                  100;
                setPercentagePlayed(percent);
                setTime(currentTime ?? 0);
              }
              break;
            case "play":
              setPlaying(true);
              break;
            case "ended":
              togglePlay();
              break;
          }
          eventEmitter(customEvent, { event });
        });
      });
    }
  };

  useEffect(() => {
    return () => {
      if (playerRef.current && playerRef.current.isDisposed()) {
        playerRef.current.dispose();
        playerRef.current = null;
      }
    };
  }, []);

  return {
    playing,
    volume,
    videoMuted,
    time,
    duration,
    percentagePlayed,
    playBackRate,
    events,
    play,
    pause,
    togglePlay,
    toggleMute,
    setVolume: setVolumeValue,
    seekTo,
    seekToPercentage,
    setPlayBackRate: setPlayBackRateValue,
    convertTimeToDuration,
    togglePictureInPicture,
    bindEvents,
    initializePlayer,
  };
}
