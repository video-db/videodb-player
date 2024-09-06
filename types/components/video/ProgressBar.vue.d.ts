declare const _default: import("vue").DefineComponent<{}, {
    $emit: (event: "setActiveChapter" | "hideChapterSummary" | "setPreviewVisibility", ...args: any[]) => void;
    isActive: boolean;
    autoHide: boolean;
    streamUrl: string;
    chaptersList: unknown[];
    persistentChapter: boolean;
    manualSlide: number;
    activeChapterProp: string;
    showChapters: boolean;
    previewPlayer: string;
    isChapterExpanded: boolean;
    $props: {
        readonly isActive?: boolean | undefined;
        readonly autoHide?: boolean | undefined;
        readonly streamUrl?: string | undefined;
        readonly chaptersList?: unknown[] | undefined;
        readonly persistentChapter?: boolean | undefined;
        readonly manualSlide?: number | undefined;
        readonly activeChapterProp?: string | undefined;
        readonly showChapters?: boolean | undefined;
        readonly previewPlayer?: string | undefined;
        readonly isChapterExpanded?: boolean | undefined;
    };
}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").PublicProps, Readonly<import("vue").ExtractPropTypes<{}>>, {}, {}>;
export default _default;
