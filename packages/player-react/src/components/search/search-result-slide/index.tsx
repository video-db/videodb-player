import React, { FC, useMemo } from "react";
import PlayIcon from "../../icons/play";
import "./styles.css";

interface SearchResultItem {
  start: number;
  id: string | number;
  text: string;
  type: string;
  end?: number;
}

interface SearchResultSlideProps {
  searchContent?: string;
  searchResultItem: SearchResultItem;
  searchResultItemIndex?: number;
  isLight?: boolean;
}

function SearchResultSlide({
  searchContent = "",
  searchResultItem,
  searchResultItemIndex = 0,
  isLight = true,
}: SearchResultSlideProps) {
  const i = searchResultItemIndex;

  const startIsoString = useMemo(
    () =>
      searchResultItem.type === "relevant" &&
      typeof searchResultItem.start === "number"
        ? new Date(Math.floor(searchResultItem.start) * 1000).toISOString()
        : null,
    [searchResultItem.type, searchResultItem.start],
  );

  const endIsoString = useMemo(
    () =>
      searchResultItem.type === "relevant" &&
      typeof searchResultItem.end === "number"
        ? new Date(Math.floor(searchResultItem.end) * 1000).toISOString()
        : null,
    [searchResultItem.type, searchResultItem.end],
  );

  const wrapSpan = (strReplace: string): string => {
    const trimmedSearchContent = searchContent.trim();
    if (!trimmedSearchContent) {
      return strReplace;
    }
    const searchMask = trimmedSearchContent.replace(
      /[.*+?^${}()|[\]\\]/g,
      "\\$&",
    );
    const regEx = new RegExp(searchMask, "ig");
    const replaceMask = `<span class="text-${
      searchResultItem.type === "relevant" ? "lime" : "yellow"
    } ${isLight ? "light" : ""}">${trimmedSearchContent}</span>`;

    return strReplace.replace(regEx, replaceMask);
  };

  return (
    <div
      className={`swiper-slide sr vdb-p-h-full vdb-p-rounded-8 vdb-p-text-left ${
        isLight ? "light" : ""
      }`}
      data-seconds={searchResultItem.start}
      data-index={i}
      data-id={searchResultItem.id}
      style={{ minWidth: "204px" }}
    >
      <div
        className="vdb-p-flex vdb-p-h-full vdb-p-cursor-pointer vdb-p-flex-col vdb-p-justify-between vdb-p-transition"
        data-seconds={searchResultItem.start}
      >
        <p
          className={`swiper-truncate-overflow vdb-p-mb-8 vdb-p-leading-normal ${
            isLight ? "vdb-p-text-gray-950" : "vdb-p-text-white"
          }`}
          data-seconds={searchResultItem.start}
        >
          <span
            dangerouslySetInnerHTML={{
              __html: wrapSpan(searchResultItem.text),
            }}
          />
        </p>
        <div className="vdb-p-flex vdb-p-w-full vdb-p-items-center vdb-p-justify-between">
          <div
            className={`swiper-time ${searchResultItem.type} ${
              isLight ? "light" : ""
            }`}
            data-seconds={searchResultItem.start}
          >
            <PlayIcon
              className={`${
                searchResultItem.type === "relevant"
                  ? isLight
                    ? "vdb-p-text-[#53B745]"
                    : "vdb-p-text-[#B4C236]"
                  : "vdb-p-text-[#F8C450]"
              }`}
            />
            <p
              className={`vdb-p-text-overline vdb-p-font-medium vdb-p-tracking-wider vdb-p-opacity-80 ${
                isLight ? "swiper-time-light-text" : "vdb-p-text-white-80"
              }`}
            >
              {startIsoString &&
                (searchResultItem.start < 3600
                  ? startIsoString.substring(14, 19)
                  : startIsoString.substring(11, 19))}
              {endIsoString ? " - " : ""}
              {endIsoString &&
                (searchResultItem.end! < 3600
                  ? endIsoString.substring(14, 19)
                  : endIsoString.substring(11, 19))}
            </p>
          </div>
          <p
            data-seconds={searchResultItem.start}
            className={`vdb-p-hidden vdb-p-text-caption3 vdb-p-font-medium vdb-p-capitalize vdb-p-text-kilvish-600 md:vdb-p-block ${searchResultItem.type}-text-br`}
          >
            {searchResultItem.type}
          </p>
        </div>
      </div>
    </div>
  );
}

export default SearchResultSlide;
