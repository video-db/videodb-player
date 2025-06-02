declare const _default: import("vue").DefineComponent<{
    isActive: {
        type: BooleanConstructor;
        default: boolean;
    };
    playbackRate: {
        type: NumberConstructor;
        default: number;
    };
    changePlaybackRate: {
        type: FunctionConstructor;
        default: () => void;
    };
    captionButtonState: {
        type: StringConstructor;
        default: string;
    };
    toggleSubtiles: {
        type: FunctionConstructor;
        default: () => void;
    };
    isFullScreen: {
        type: BooleanConstructor;
        default: boolean;
    };
    enterFullScreen: {
        type: FunctionConstructor;
        default: () => void;
    };
    exitFullScreen: {
        type: FunctionConstructor;
        default: () => void;
    };
}, any, {
    isPopperActive: boolean;
}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").PublicProps, Readonly<import("vue").ExtractPropTypes<{
    isActive: {
        type: BooleanConstructor;
        default: boolean;
    };
    playbackRate: {
        type: NumberConstructor;
        default: number;
    };
    changePlaybackRate: {
        type: FunctionConstructor;
        default: () => void;
    };
    captionButtonState: {
        type: StringConstructor;
        default: string;
    };
    toggleSubtiles: {
        type: FunctionConstructor;
        default: () => void;
    };
    isFullScreen: {
        type: BooleanConstructor;
        default: boolean;
    };
    enterFullScreen: {
        type: FunctionConstructor;
        default: () => void;
    };
    exitFullScreen: {
        type: FunctionConstructor;
        default: () => void;
    };
}>>, {
    isActive: boolean;
    isFullScreen: boolean;
    enterFullScreen: Function;
    exitFullScreen: Function;
    playbackRate: number;
    changePlaybackRate: Function;
    captionButtonState: string;
    toggleSubtiles: Function;
}, {}>;
export default _default;
