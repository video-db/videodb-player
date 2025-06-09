declare const _default: import("vue").DefineComponent<{
    isActive: {
        type: BooleanConstructor;
        default: boolean;
    };
    volume: {
        type: NumberConstructor;
        default: number;
    };
    updatePlayerVolume: {
        type: FunctionConstructor;
        default: () => void;
    };
}, any, {
    volumeDrag: boolean;
    isPopperActive: boolean;
}, {}, {
    onMouseMove(e: any): void;
    onMouseDown(e: any): void;
    onMouseUp(e: any): void;
    updateVolume(x: any, vol: any): void;
}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").PublicProps, Readonly<import("vue").ExtractPropTypes<{
    isActive: {
        type: BooleanConstructor;
        default: boolean;
    };
    volume: {
        type: NumberConstructor;
        default: number;
    };
    updatePlayerVolume: {
        type: FunctionConstructor;
        default: () => void;
    };
}>>, {
    isActive: boolean;
    volume: number;
    updatePlayerVolume: Function;
}, {}>;
export default _default;
