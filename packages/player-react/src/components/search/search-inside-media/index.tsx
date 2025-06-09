import React, { JSX, useEffect, useRef, useState } from "react";
import EllipsesLoading from "../../atoms/ellipse-loading";
import Loading from "../../atoms/loading";
import CloseIcon from "../../icons/close";
import SearchIcon from "../../icons/search";
import SearchResults from "../search-results";
import "./styles.css";
import { useVideoPlayerContext } from "../../../context";
interface Suggestion {
  text: string;
}

interface SearchResultHit {
  id: string | number;
  start: number;
  end: number;
  type: string;
  text: string;
}

interface SearchResult {
  hits: SearchResultHit[];
}

interface Highlight {
  time: number;
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
  highlights?: Highlight[];
  isLight?: boolean;
  onSearchChange: (val: string) => void;
  onSearchSubmit: (val: string) => void;
  className?: string;
  toggleResults?: (show: boolean) => void;
  onInputFocused?: () => void;
}

export default function SearchInsideMedia({
  autoHide = true,
  isActive = true,
  isRaw = false,
  isAutoPilotLoading = false,
  searchContent = "",
  searchResultsLoading = false,
  searchInputPlaceholder = "Search or ask a question",
  wordsLoading = false,
  showSearchResults = false,
  searchSuggestions = [],
  searchResults = { hits: [] },
  updateParentIsFocused = () => {},
  highlights = [],
  isLight = false,
  onSearchChange,
  onSearchSubmit,
  className = "",
  toggleResults,
  onInputFocused,
}: Props): JSX.Element {
  const { playing, duration, seekTo, showElements, togglePlay } =
    useVideoPlayerContext();
  const [isFocused, setIsFocused] = useState(false);
  const searchInputRef = useRef<HTMLInputElement | null>(null);
  const searchTopContainer = useRef<HTMLDivElement | null>(null);
  const isUploadingScreen = !isActive && !isAutoPilotLoading && !isRaw;
  const isAutoPilotLoadingScreen = !isActive && isAutoPilotLoading && !isRaw;
  const isRawScreen = !isActive && !isAutoPilotLoading && isRaw;
  const isFinalScreen = isActive && !isAutoPilotLoading && !isRaw;

  const handleInputFocus = () => {
    setIsFocused(true);
    onInputFocused?.();
    window.parent.postMessage("Search Focus", "*");
  };

  const handleInputBlur = () => {
    setIsFocused(false);
    updateParentIsFocused(false);
  };

  const closeInput = () => {
    onSearchChange("");
    searchInputRef.current?.blur();
    setIsFocused(true);
  };

  const handleSuggestionClick = (text: string) => {
    onSearchChange(text);
    searchInputRef.current?.focus();
    setIsFocused(true);
  };

  const showSearchSuggestions =
    searchContent === "" && searchSuggestions.length > 0;

  useEffect(() => {
    if (toggleResults) {
      if (searchContent === "") {
        toggleResults(false);
      } else {
        toggleResults(true);
      }
    }
  }, [searchContent]);

  const onSlideClick = (value: string) => {
    seekTo(Number(value));
    if (!playing) {
      togglePlay();
    }
    searchTopContainer.current?.blur();
    toggleResults?.(false);
    return;
  };

  useEffect(() => {
    if (searchContent === "") {
      updateParentIsFocused(isFocused);
    } else if (isFocused) {
      toggleResults?.(true);
    }
  }, [isFocused, searchContent, updateParentIsFocused, toggleResults]);

  useEffect(() => {
    const checkForIdInParentNodes = (
      element: EventTarget | null,
      id: string,
    ): boolean => {
      let el = element as HTMLElement | null;
      while (el?.parentNode) {
        if (el.id === id) return true;
        el = el.parentNode as HTMLElement | null;
      }
      return false;
    };

    const clickAwayListener = (event: MouseEvent) => {
      const ids = [
        "videoPlay",
        "videoPause",
        "searchResultsContainer",
        "searchInputWrapper",
      ];
      const isAnyComp = ids.some((id) =>
        checkForIdInParentNodes(event.target, id),
      );
      if (!isAnyComp) {
        toggleResults?.(false);
      }
    };

    document.addEventListener("mousedown", clickAwayListener);
    return () => {
      document.removeEventListener("mousedown", clickAwayListener);
    };
  }, [toggleResults]);

  const prevShowSearchResultsRef = useRef<boolean | null>(null);
  useEffect(() => {
    if (
      prevShowSearchResultsRef.current === false &&
      showSearchResults === true
    ) {
      toggleResults?.(true);
    }
    prevShowSearchResultsRef.current = showSearchResults;
  }, [showSearchResults, toggleResults]);
  return (
    <div
      className={`vdb-p-absolute vdb-p-left-0 vdb-p-top-0 vdb-p-h-48 vdb-p-w-full vdb-p-overflow-visible vdb-p-transition-opacity vdb-p-duration-200 vdb-p-ease-in-out ${className}`}
    >
      <div
        className={`spext-player-search vdb-p-h-full vdb-p-w-full ${
          !isActive && !isAutoPilotLoading ? "vdb-p-opacity-30" : ""
        } ${wordsLoading ? "vdb-p-opacity-40" : ""}`}
      >
        <div
          ref={searchTopContainer}
          className="searchTopContainer"
          tabIndex={0}
        >
          <div
            id="searchInputWrapper"
            className={`search-input-wrapper vdb-p-absolute vdb-p-left-1/2 vdb-p-top-20 vdb-p-h-48 vdb-p--translate-x-1/2 vdb-p-transform vdb-p-rounded-8 sm:vdb-p-top-24 ${
              autoHide && !showElements && searchContent === ""
                ? "vdb-p-opacity-0"
                : "vdb-p-opacity-1"
            } ${isFocused ? "is-focused" : ""} ${
              isUploadingScreen
                ? "vdb-p-left-1/2 vdb-p-bg-black-16 vdb-p-text-white"
                : ""
            } ${
              isAutoPilotLoadingScreen
                ? "vdb-p-left-1/2 vdb-p-bg-steelblue-100 vdb-p-text-kilvish-500"
                : ""
            } ${
              isRawScreen
                ? "vdb-p-left-1/2 vdb-p-bg-black-32 vdb-p-text-white"
                : ""
            } ${
              isFinalScreen
                ? "search-input-wrapper-done vdb-p-left-20 vdb-p-transform-none vdb-p-bg-black-32 vdb-p-text-white sm:vdb-p-left-1/2 sm:vdb-p--translate-x-1/2 sm:vdb-p-transform"
                : ""
            } ${
              isFinalScreen ? "search-input-wrapper-done-full vdb-p-mr-20" : ""
            } `}
          >
            {!isAutoPilotLoading && !isRaw && !wordsLoading ? (
              <input
                ref={searchInputRef}
                className={`search-input vdb-p-h-48 vdb-p-w-full vdb-p-appearance-none vdb-p-rounded-8 vdb-p-border vdb-p-border-solid vdb-p-border-yellow vdb-p-bg-transparent vdb-p-pl-12 vdb-p-pr-44 vdb-p-text-left vdb-p-text-white vdb-p-transition focus:vdb-p-border-yellow-600 focus:vdb-p-outline-none sm:vdb-p-pl-44 ${
                  !isActive && !isAutoPilotLoading && !isRaw
                    ? "search-input-uploading"
                    : ""
                } ${!isActive && isRaw ? "search-input-raw" : ""} ${
                  wordsLoading ? "vdb-p-border-0 vdb-p-border-none" : ""
                } `}
                placeholder={isFocused ? "" : searchInputPlaceholder}
                value={searchContent}
                onFocus={handleInputFocus}
                onBlur={handleInputBlur}
                onChange={(e) => onSearchChange(e.target.value)}
                onKeyUp={(e) =>
                  e.key === "Enter" && onSearchSubmit(searchContent)
                }
                disabled={!isActive || wordsLoading}
              />
            ) : (
              <div
                className={`search-input vdb-p-my-auto vdb-p-flex vdb-p-h-48 vdb-p-w-full vdb-p-appearance-none vdb-p-items-center vdb-p-justify-start vdb-p-rounded-8 vdb-p-border vdb-p-border-yellow vdb-p-bg-transparent vdb-p-px-16 vdb-p-pl-44 vdb-p-text-white vdb-p-transition ${
                  isFinalScreen && (isFocused || searchContent !== "")
                    ? "search-input-wrapper-done-full vdb-p-mr-20"
                    : ""
                } ${wordsLoading ? "vdb-p-border-0 vdb-p-border-none" : ""} `}
              >
                {wordsLoading ? (
                  <EllipsesLoading>
                    <span className="search-input-autopiloting">
                      {searchInputPlaceholder}
                    </span>
                  </EllipsesLoading>
                ) : (
                  <span className="search-input-autopiloting">
                    {searchInputPlaceholder}
                  </span>
                )}
              </div>
            )}

            <div className="vdb-p-hidden sm:vdb-p-block">
              {!isUploadingScreen && (
                <SearchIcon
                  color="#ffffff" // Assuming color prop exists
                  className="vdb-p-absolute vdb-p-left-16 vdb-p-top-1/2 vdb-p-h-20 vdb-p-w-20 vdb-p--translate-y-1/2 vdb-p-transform vdb-p-text-white"
                />
              )}
              {searchContent !== "" && (
                <CloseIcon
                  color="#ffffff" // Assuming color prop exists
                  className="vdb-p-absolute vdb-p-right-16 vdb-p-top-1/2 vdb-p-h-20 vdb-p-w-20 vdb-p--translate-y-1/2 vdb-p-transform vdb-p-cursor-pointer vdb-p-text-white vdb-p-transition"
                  onClick={closeInput}
                />
              )}
            </div>

            {/* Mobile Icons */}
            <div className="vdb-p-block sm:vdb-p-hidden">
              {!isUploadingScreen && searchContent === "" && (
                <SearchIcon
                  color="#ffffff"
                  className="vdb-p-absolute vdb-p-right-16 vdb-p-top-1/2 vdb-p-h-20 vdb-p-w-20 vdb-p--translate-y-1/2 vdb-p-transform vdb-p-text-white" // Note: Vue uses right-16 for mobile search
                />
              )}
              {!isUploadingScreen && searchContent !== "" && (
                <CloseIcon
                  color="#ffffff"
                  className="vdb-p-absolute vdb-p-right-16 vdb-p-top-1/2 vdb-p-h-20 vdb-p-w-20 vdb-p--translate-y-1/2 vdb-p-transform vdb-p-cursor-pointer vdb-p-text-white vdb-p-transition"
                  onClick={closeInput}
                />
              )}
            </div>
          </div>

          {showSearchSuggestions && (
            <div
              className={`search-suggestions vdb-p-absolute vdb-p-left-1/2 vdb-p-top-76 vdb-p--translate-x-1/2 vdb-p-transform vdb-p-rounded-8 vdb-p-border vdb-p-border-white-24 vdb-p-bg-random-222222 vdb-p-px-16 vdb-p-py-8 ${
                autoHide && !showElements
                  ? "vdb-p-opacity-0"
                  : "vdb-p-opacity-1"
              } `}
            >
              <div
                className="vdb-p-leading-24 vdb-p-text-left vdb-p-uppercase vdb-p-text-others-gray42"
                style={{ fontSize: "0.625rem" }}
              >
                Popular Topics in this file
              </div>
              <div className="search-suggestions-wrapper">
                {searchSuggestions.map((s, i) => (
                  <div
                    key={i}
                    className="vdb-p-leading-24 search-suggestion vdb-p-min-h-24 vdb-p-cursor-pointer vdb-p-border-b vdb-p-border-others-black181818 vdb-p-py-8 vdb-p-text-left vdb-p-font-medium vdb-p-text-white hover:vdb-p-text-kilvish-500"
                    style={{ fontSize: "0.75rem" }}
                    onClick={() => handleSuggestionClick(s.text)}
                  >
                    {s.text}
                  </div>
                ))}
              </div>
            </div>
          )}

          {showSearchResults && (
            <div
              id="searchResultsContainer"
              className={`searchResultsContainer vdb-p-absolute vdb-p-left-8 vdb-p-right-8 vdb-p-top-80 vdb-p-mx-auto vdb-p-overflow-hidden vdb-p-rounded-16 vdb-p-border vdb-p-shadow-3 vdb-p-transition sm:vdb-p-left-16 sm:vdb-p-right-16 md:vdb-p-top-80 ${
                isLight
                  ? "vdb-p-border-kilvish-300 vdb-p-text-gray-900"
                  : "vdb-p-border-white-24 vdb-p-text-white"
              } `}
              style={{
                maxWidth: "820px",
                background: isLight ? "#F9FAFB" : "#222222",
              }}
            >
              {searchResultsLoading ? (
                <div className="vdb-p-flex vdb-p-justify-center vdb-p-p-28">
                  <Loading />
                </div>
              ) : searchResults.hits.length > 0 ? (
                <SearchResults
                  bg="34,34,34"
                  theme="yellow"
                  searchResults={searchResults}
                  duration={duration}
                  onSlideClick={onSlideClick}
                  highlights={highlights}
                  searchContent={searchContent.trim()}
                  isLight={isLight}
                />
              ) : (
                <p className="vdb-p-px-8 vdb-p-py-32 vdb-p-text-center vdb-p-opacity-80">
                  No results found
                </p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
