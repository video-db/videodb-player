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
}>>, {
    isActive: boolean;
    playbackRate: number;
    changePlaybackRate: Function;
}, {}>;
export default _default;
