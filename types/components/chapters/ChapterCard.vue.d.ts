declare const _default: import("vue").DefineComponent<{
    chapter: {
        type: ObjectConstructor;
        required: true;
    };
    isExpanded: {
        type: BooleanConstructor;
        default: boolean;
    };
    isActive: {
        type: BooleanConstructor;
        default: boolean;
    };
    chapterIndex: {
        type: NumberConstructor;
        required: true;
    };
    showInit: {
        type: BooleanConstructor;
        default: boolean;
    };
    isIframe: {
        type: BooleanConstructor;
        default: boolean;
    };
}, any, any, {
    chapterSummaryPoints(): any;
    analyticsPayload(): any;
}, {
    secondsToHHMMSS(val: any): string;
    handleReadMore(e: any): void;
}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").PublicProps, Readonly<import("vue").ExtractPropTypes<{
    chapter: {
        type: ObjectConstructor;
        required: true;
    };
    isExpanded: {
        type: BooleanConstructor;
        default: boolean;
    };
    isActive: {
        type: BooleanConstructor;
        default: boolean;
    };
    chapterIndex: {
        type: NumberConstructor;
        required: true;
    };
    showInit: {
        type: BooleanConstructor;
        default: boolean;
    };
    isIframe: {
        type: BooleanConstructor;
        default: boolean;
    };
}>>, {
    isExpanded: boolean;
    isActive: boolean;
    showInit: boolean;
    isIframe: boolean;
}, {}>;
export default _default;
