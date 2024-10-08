export function usePlayer(emit: any, props: any): {
    events: string[];
    play: () => void;
    pause: () => void;
    togglePlay: () => void;
    toggleMute: () => void;
    setVolume: (percentAsDecimal: any) => void;
    seekTo: (time: any) => void;
    seekToPercentage: (percentage: any) => void;
    setPlayBackRate: (value: any) => void;
    convertTimeToDuration: (seconds: any) => string;
    togglePictureInPicture: () => void;
    bindEvents: (events: any, emit: any) => void;
    initializePlayer: (playerRef: any) => void;
    playing: import("vue").Ref<boolean>;
    volume: import("vue").Ref<number>;
    videoMuted: import("vue").Ref<any>;
    time: import("vue").Ref<any>;
    duration: import("vue").Ref<number>;
    percentagePlayed: import("vue").Ref<number>;
    playBackRate: import("vue").Ref<any>;
};
