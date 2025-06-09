import { JSX } from "react";
interface Chapter {
    id?: string | number;
    start: number;
    length: number;
    title?: string;
    end?: number;
}
interface Props {
    isActive?: boolean;
    autoHide?: boolean;
    streamUrl?: string;
    chaptersList?: Chapter[];
    persistentChapter?: boolean;
    manualSlide?: number | null;
    activeChapterProp?: string | null;
    showChapters?: boolean;
    previewPlayer?: string;
    isChapterExpanded?: boolean;
    setActiveChapter?: (chapterIndex: number | null) => void;
    hideChapterSummary?: (isVisible: boolean) => void;
    setPreviewVisibility?: (isVisible: boolean) => void;
}
export default function SearchBar({ isActive, autoHide, streamUrl, chaptersList, persistentChapter, manualSlide, activeChapterProp: activeChapterPropRaw, showChapters, isChapterExpanded, setActiveChapter, hideChapterSummary, setPreviewVisibility, }: Props): JSX.Element;
export {};
