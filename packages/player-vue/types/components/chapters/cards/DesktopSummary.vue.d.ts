declare const _default: import("vue").DefineComponent<{
    chapters: {
        type: ArrayConstructor;
        default: () => never[];
    };
    activeChapterProp: {
        type: StringConstructor;
        default: null;
    };
    persistentChapter: {
        type: BooleanConstructor;
        default: boolean;
    };
    isPlaying: {
        type: BooleanConstructor;
        required: true;
    };
    hidden: {
        type: BooleanConstructor;
        default: boolean;
    };
    isPreviewVisible: {
        type: BooleanConstructor;
        default: boolean;
    };
    manualSlide: {
        type: NumberConstructor;
        default: null;
    };
    videoDetails: {
        type: ObjectConstructor;
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
    showInit: {
        type: BooleanConstructor;
        default: boolean;
    };
    isChapterExpanded: {
        type: BooleanConstructor;
        default: boolean;
    };
    isIframe: {
        type: BooleanConstructor;
        default: boolean;
    };
}, any, {
    lastChapter: null;
    chapterTimeout: null;
}, any, {
    findCurrentChapter(time: any): any[] | undefined;
    getMarkdownText(markdown: any): any;
    goToSlide(num: any): void;
    handleSlideClick(_: any, chapter: any, index: any): void;
    secondsToHHMMSS(val: any): string;
    inView(chapIndex: any): void;
    setUpObservers(): void;
}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").PublicProps, Readonly<import("vue").ExtractPropTypes<{
    chapters: {
        type: ArrayConstructor;
        default: () => never[];
    };
    activeChapterProp: {
        type: StringConstructor;
        default: null;
    };
    persistentChapter: {
        type: BooleanConstructor;
        default: boolean;
    };
    isPlaying: {
        type: BooleanConstructor;
        required: true;
    };
    hidden: {
        type: BooleanConstructor;
        default: boolean;
    };
    isPreviewVisible: {
        type: BooleanConstructor;
        default: boolean;
    };
    manualSlide: {
        type: NumberConstructor;
        default: null;
    };
    videoDetails: {
        type: ObjectConstructor;
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
    showInit: {
        type: BooleanConstructor;
        default: boolean;
    };
    isChapterExpanded: {
        type: BooleanConstructor;
        default: boolean;
    };
    isIframe: {
        type: BooleanConstructor;
        default: boolean;
    };
}>>, {
    showInit: boolean;
    isIframe: boolean;
    hidden: boolean;
    chapters: unknown[];
    activeChapterProp: string;
    persistentChapter: boolean;
    isPreviewVisible: boolean;
    manualSlide: number;
    videoDetails: Record<string, any>;
    duration: number;
    videoTime: number;
    isChapterExpanded: boolean;
}, {}>;
export default _default;
