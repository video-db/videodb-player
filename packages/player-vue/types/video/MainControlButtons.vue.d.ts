declare const _default: import("vue").DefineComponent<{
    isActive: {
        type: BooleanConstructor;
        default: boolean;
    };
    isFinalState: {
        type: BooleanConstructor;
        default: boolean;
    };
    isFullScreen: {
        type: BooleanConstructor;
        default: boolean;
    };
    isPlaying: {
        type: BooleanConstructor;
        default: boolean;
    };
    togglePlay: {
        type: FunctionConstructor;
        default: () => void;
    };
    rewind: {
        type: FunctionConstructor;
        default: () => void;
    };
    forward: {
        type: FunctionConstructor;
        default: () => void;
    };
    duration: {
        type: NumberConstructor;
        default: number;
    };
    videoTime: {
        type: NumberConstructor;
        default: number;
    };
    volume: {
        type: NumberConstructor;
        default: number;
    };
    updatePlayerVolume: {
        type: FunctionConstructor;
        default: () => void;
    };
    isIframe: {
        type: BooleanConstructor;
        default: boolean;
    };
}, any, {
    volumeDrag: boolean;
}, {
    showHours(): boolean;
    currentTime(): string;
    totalTime(): string;
}, {
    formaatPadded(number: any): string;
    formatDuration(duration: any): string;
    onMouseMove(e: any): void;
    onMouseDown(e: any): void;
    onMouseUp(e: any): void;
    updateVolume(x: any, vol: any): void;
}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").PublicProps, Readonly<import("vue").ExtractPropTypes<{
    isActive: {
        type: BooleanConstructor;
        default: boolean;
    };
    isFinalState: {
        type: BooleanConstructor;
        default: boolean;
    };
    isFullScreen: {
        type: BooleanConstructor;
        default: boolean;
    };
    isPlaying: {
        type: BooleanConstructor;
        default: boolean;
    };
    togglePlay: {
        type: FunctionConstructor;
        default: () => void;
    };
    rewind: {
        type: FunctionConstructor;
        default: () => void;
    };
    forward: {
        type: FunctionConstructor;
        default: () => void;
    };
    duration: {
        type: NumberConstructor;
        default: number;
    };
    videoTime: {
        type: NumberConstructor;
        default: number;
    };
    volume: {
        type: NumberConstructor;
        default: number;
    };
    updatePlayerVolume: {
        type: FunctionConstructor;
        default: () => void;
    };
    isIframe: {
        type: BooleanConstructor;
        default: boolean;
    };
}>>, {
    isActive: boolean;
    isFinalState: boolean;
    isFullScreen: boolean;
    isPlaying: boolean;
    togglePlay: Function;
    rewind: Function;
    forward: Function;
    duration: number;
    videoTime: number;
    volume: number;
    updatePlayerVolume: Function;
    isIframe: boolean;
}, {}>;
export default _default;
