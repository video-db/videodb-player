import { JSX } from "react";
interface Suggestion {
    text: string;
}
interface SearchResult {
    hits: any[];
}
interface Props {
    autoHide?: boolean;
    isActive?: boolean;
    isRaw?: boolean;
    isAutoPilotLoading?: boolean;
    searchContent: string;
    searchResultsLoading?: boolean;
    searchInputPlaceholder?: string;
    wordsLoading?: boolean;
    showSearchResults?: boolean;
    searchSuggestions?: Suggestion[];
    searchResults?: SearchResult;
    updateParentIsFocused?: (focused: boolean) => void;
    highlights?: any[];
    isLight?: boolean;
    onSlideClick?: () => void;
    onSearchChange: (val: string) => void;
    onSearchSubmit: (val: string) => void;
}
export default function SearchBar({ autoHide, isActive, isRaw, isAutoPilotLoading, searchContent, searchResultsLoading, searchInputPlaceholder, wordsLoading, showSearchResults, searchSuggestions, searchResults, updateParentIsFocused, highlights, isLight, onSlideClick, onSearchChange, onSearchSubmit, }: Props): JSX.Element;
export {};
