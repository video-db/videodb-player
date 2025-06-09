import { FC } from "react";
import "./styles.css";
interface SearchResultItem {
    id: string | number;
    start: number;
    end?: number;
    text: string;
    type: "relevant" | "exact" | string;
}
interface Props {
    searchContent?: string;
    searchResultItem: SearchResultItem;
    searchResultItemIndex: number;
    isLight?: boolean;
}
declare const SearchResultSlide: FC<Props>;
export default SearchResultSlide;
