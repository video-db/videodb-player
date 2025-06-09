declare const _default: import("vue").DefineComponent<{
    isActive: {
        type: BooleanConstructor;
        default: boolean;
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
}, {}>;
export default _default;
