import { FC } from "react";
import "swiper/css";
import "./styles.css";
interface SearchResultHit {
  id: string | number;
  start: number;
  end: number;
  type: string;
}
interface SearchResults {
  hits?: SearchResultHit[];
}
interface Highlight {
  time: number;
}
interface Props {
  bg?: string;
  duration?: number;
  searchResults?: SearchResults;
  onSlideClick?: (value: string) => void;
  highlights?: Highlight[];
  theme?: string;
  searchContent?: string;
  isLight?: boolean;
}
declare const SearchResults: FC<Props>;
export default SearchResults;
