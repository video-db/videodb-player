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
    showInit: {
        type: BooleanConstructor;
        default: boolean;
    };
    manualSlide: {
        type: NumberConstructor;
        default: null;
    };
    isFullscreen: {
        type: BooleanConstructor;
        default: boolean;
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
    isChapterExpanded: {
        type: BooleanConstructor;
        default: boolean;
    };
}, any, {
    swiper: null;
    swiperOptions: {
        slidesPerGroup: number;
        slidesPerView: number;
        mousewheel: {
            forceToAxis: boolean;
            invert: boolean;
        };
        spaceBetween: number;
    };
}, {
    activeChapter: {
        set(val: any): void;
        get(): number;
    };
    isExpanded: {
        set(val: any): void;
        get(): any;
    };
}, {
    findCurrentChapter(time: any): any[] | undefined;
    getMarkdownText(markdown: any): any;
    onSwiperSlideChangeTransitionStart(): void;
    goToSlide(num: any): void;
    secondsToHHMMSS(val: any): string;
    handleSlideClick(e: any): void;
    handleChapterClick(_: any, chapter: any, index: any): void;
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
    showInit: {
        type: BooleanConstructor;
        default: boolean;
    };
    manualSlide: {
        type: NumberConstructor;
        default: null;
    };
    isFullscreen: {
        type: BooleanConstructor;
        default: boolean;
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
    isChapterExpanded: {
        type: BooleanConstructor;
        default: boolean;
    };
}>>, {
    showInit: boolean;
    chapters: unknown[];
    activeChapterProp: string;
    persistentChapter: boolean;
    manualSlide: number;
    videoDetails: Record<string, any>;
    duration: number;
    videoTime: number;
    isChapterExpanded: boolean;
    isFullscreen: boolean;
}, {}>;
export default _default;
