import { createContext, useContext } from "react";

export type SubtitlesConfig = {
  src: string;
  kind?: string;
  lang?: string;
  label?: string;
};

export type VideoPlayerContextType = {
  showElements: boolean;
  playing: boolean;
  volume: number;
  videoMuted: boolean;
  duration: number;
  time: number;
  percentagePlayed: number;
  playBackRate: number;
  showSubtitles: boolean;
  subtitlesConfig: SubtitlesConfig;
  isFullScreen: boolean;
  play: () => void;
  pause: () => void;
  togglePlay: () => void;
  toggleMute: () => void;
  seekTo: (seconds: number) => void;
  seekToPercentage: (percent: number) => void;
  setPlayBackRate: (rate: number) => void;
  setVolume: (volume: number) => void;
  convertTimeToDuration: (time: number) => string;
  toggleFullScreen: (value?: boolean) => void;
  togglePictureInPicture: () => void;
  toggleSubtitles: (value: boolean) => void;
};

export const VideoPlayerContext = createContext<
  VideoPlayerContextType | undefined
>(undefined);

export const useVideoPlayerContext = (): VideoPlayerContextType => {
  const context = useContext(VideoPlayerContext);
  if (!context)
    throw new Error(
      "useVideoPlayerContext must be used within a VideoPlayerProvider",
    );
  return context;
};
