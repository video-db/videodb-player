declare const _default: import("vue").DefineComponent<{
    isExpanded: {
        type: BooleanConstructor;
        default: boolean;
    };
    chapterContent: {
        type: StringConstructor;
        required: true;
    };
    chapterTitle: {
        type: StringConstructor;
        required: true;
    };
}, any, {
    isCopied: boolean;
}, {}, {
    copyText(e: any): void;
}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").PublicProps, Readonly<import("vue").ExtractPropTypes<{
    isExpanded: {
        type: BooleanConstructor;
        default: boolean;
    };
    chapterContent: {
        type: StringConstructor;
        required: true;
    };
    chapterTitle: {
        type: StringConstructor;
        required: true;
    };
}>>, {
    isExpanded: boolean;
}, {}>;
export default _default;
