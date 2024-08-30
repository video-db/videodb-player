declare const _default: __VLS_WithTemplateSlots<typeof __VLS_component, ReturnType<typeof __VLS_template>>;
export default _default;

type __VLS_WithTemplateSlots<T, S> = T & (new () => {
    $slots: S;
});
declare const __VLS_component: import("vue").DefineComponent<{}, {
    showElements: import("vue").Ref<boolean>;
    playing: import("vue").Ref<boolean>;
    volume: import("vue").Ref<number>;
    videoMuted: import("vue").Ref<any>;
    duration: import("vue").Ref<number>;
    time: import("vue").Ref<any>;
    percentagePlayed: import("vue").Ref<number>;
    playBackRate: import("vue").Ref<any>;
    showSubtitles: import("vue").Ref<boolean>;
    subtitlesConfig: Record<string, any>;
    isFullScreen: import("vue").Ref<boolean>;
    play: () => void;
    pause: () => void;
    togglePlay: () => void;
    toggleMute: () => void;
    seekTo: (time: any) => void;
    seekToPercentage: (percentage: any) => void;
    setPlayBackRate: (value: any) => void;
    setVolume: (percentAsDecimal: any) => void;
    convertTimeToDuration: (seconds: any) => string;
    toggleFullScreen: (value: any) => void;
    toggleSubtitles: (value: any) => void;
    togglePictureInPicture: () => void;
    $emit: (event: "playing" | "play" | "pause" | "ended" | "loadeddata" | "waiting" | "timeupdate" | "canplay" | "canplaythrough" | "toggleSubtitles" | "videoerrror" | "fullScreenChange", ...args: any[]) => void;
    streamUrl: string;
    thumbnailUrl: string;
    startAt: number;
    autoPlay: boolean;
    autoHideDuration: number;
    defaultControls: boolean;
    defaultOverlay: boolean;
    defaultPlayBackRate: number;
    debug: boolean;
    $props: {
        readonly streamUrl?: string | undefined;
        readonly subtitlesConfig?: Record<string, any> | undefined;
        readonly thumbnailUrl?: string | undefined;
        readonly startAt?: number | undefined;
        readonly autoPlay?: boolean | undefined;
        readonly autoHideDuration?: number | undefined;
        readonly defaultControls?: boolean | undefined;
        readonly defaultOverlay?: boolean | undefined;
        readonly defaultPlayBackRate?: number | undefined;
        readonly debug?: boolean | undefined;
    };
}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").PublicProps, Readonly<import("vue").ExtractPropTypes<{}>>, {}, {}>;
declare function __VLS_template(): {
    overlay?(_: {}): any;
    controls?(_: {}): any;
};
