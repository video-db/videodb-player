declare const _default: import("vue").DefineComponent<{
    chapterNumber: {
        type: NumberConstructor;
        required: true;
    };
    isExpanded: {
        type: BooleanConstructor;
        default: boolean;
    };
}, any, {
    isCopied: boolean;
}, {}, {
    copyLink(e: any): void;
}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").PublicProps, Readonly<import("vue").ExtractPropTypes<{
    chapterNumber: {
        type: NumberConstructor;
        required: true;
    };
    isExpanded: {
        type: BooleanConstructor;
        default: boolean;
    };
}>>, {
    isExpanded: boolean;
}, {}>;
export default _default;
