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
    videoTime: {
        type: NumberConstructor;
        default: number;
    };
    duration: {
        type: NumberConstructor;
        default: number;
    };
    updateTime: {
        type: FunctionConstructor;
        default: () => void;
    };
    videoDetails: {
        type: ObjectConstructor;
        default: () => void;
    };
    persistentChapter: {
        type: BooleanConstructor;
        default: boolean;
    };
    manualSlide: {
        type: NumberConstructor;
        default: null;
    };
    activeChapterProp: {
        type: StringConstructor;
        default: null;
    };
    showChapters: {
        type: BooleanConstructor;
        default: boolean;
    };
    previewPlayer: {
        type: StringConstructor;
        default: string;
    };
    isChapterExpanded: {
        type: BooleanConstructor;
        default: boolean;
    };
}, any, {
    feedbackPlayer: null;
    moveToRatio: number;
    videoDrag: boolean;
    seekGoToPoint: {
        ratio: number;
        timePosition: number;
    };
    isTimestampVisible: boolean;
    showSummaryInfo: boolean;
    videoPreviewData: null;
    chapterSetterTimeout: null;
}, {
    videoDateVal(): number;
    shouldNotShowVideoPopover(): any;
    activeChapter: {
        set(val: any): void;
        get(): number;
    };
    summaryCardVisible(): boolean;
    isSummaryCardOverlapping(): any;
    currentlyInActiveChapter(): boolean;
}, {
    isManuallySlid(key: any): any;
    isActiveChapter(key: any): any;
    updateFeedbackPlayer: any;
    innerWidth(): number;
    getVideoPreviewPosition(): {
        left: any;
        width: any;
        height: any;
    } | undefined;
    getSectionPlayWidth(chapter: any): string | 0 | 100;
    getActiveChapterTitle(): any;
    onMouseMove(e: any): void;
    onMouseLeave(): void;
    onProgressClick(): void;
    onMouseMoveOnScreen(e: any): void;
    onTouchMoveOnScreen(e: any): void;
    seekVideoTime(x: any): void;
    onSeekHeadMouseDown(e: any): void;
    onSeekHeadTouchStart(e: any): void;
    onSeekHeadMouseUp(): void;
    onSeekHeadTouchEnd(): void;
    findCurrentChapter(time: any): string | undefined;
    onTouchMove(e: any): void;
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
    videoTime: {
        type: NumberConstructor;
        default: number;
    };
    duration: {
        type: NumberConstructor;
        default: number;
    };
    updateTime: {
        type: FunctionConstructor;
        default: () => void;
    };
    videoDetails: {
        type: ObjectConstructor;
        default: () => void;
    };
    persistentChapter: {
        type: BooleanConstructor;
        default: boolean;
    };
    manualSlide: {
        type: NumberConstructor;
        default: null;
    };
    activeChapterProp: {
        type: StringConstructor;
        default: null;
    };
    showChapters: {
        type: BooleanConstructor;
        default: boolean;
    };
    previewPlayer: {
        type: StringConstructor;
        default: string;
    };
    isChapterExpanded: {
        type: BooleanConstructor;
        default: boolean;
    };
}>>, {
    videoDetails: Record<string, any>;
    isPlaying: boolean;
    isFullScreen: boolean;
    duration: number;
    isActive: boolean;
    isFinalState: boolean;
    videoTime: number;
    updateTime: Function;
    persistentChapter: boolean;
    manualSlide: number;
    activeChapterProp: string;
    showChapters: boolean;
    previewPlayer: string;
    isChapterExpanded: boolean;
}, {}>;
export default _default;
