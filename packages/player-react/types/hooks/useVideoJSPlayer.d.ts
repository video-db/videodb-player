type PlayerProps = {
  streamUrl: string;
  autoPlay?: boolean;
  muted?: boolean;
  startAt?: number;
  thumbnailUrl?: string;
  defaultPlayBackRate?: number;
  debug?: boolean;
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
  | "canplaythrough"
  | "videoerrror"
  | "toggleSubtitles"
  | "fullScreenChange";
type EventEmitter = (
  event: PlayerEvents,
  data: {
    event: any;
  },
) => void;
export declare function useVideoDBPlayer(
  emit: EventEmitter,
  props: PlayerProps,
): {
  playing: boolean;
  volume: number;
  videoMuted: boolean;
  time: number;
  duration: number;
  percentagePlayed: number;
  playBackRate: number;
  events: PlayerEvents[];
  play: () => void;
  pause: () => void;
  togglePlay: () => void;
  toggleMute: () => void;
  setVolume: (percentAsDecimal: number) => void;
  seekTo: (timeValue: number) => void;
  seekToPercentage: (percentage: number) => void;
  setPlayBackRate: (value: number) => void;
  convertTimeToDuration: (seconds: number) => string;
  togglePictureInPicture: () => void;
  bindEvents: (eventList: PlayerEvents[], eventEmitter: EventEmitter) => void;
  initializePlayer: (playerElement: HTMLVideoElement | null) => void;
};
export {};
