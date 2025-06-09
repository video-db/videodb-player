import React, { FC, useCallback, useEffect, useRef, useState } from "react";
import type { Swiper as SwiperCore } from "swiper";
import { Manipulation, Mousewheel, Navigation, Virtual } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "./styles.css";
import "swiper/css";

import ArrowLeftIcon from "../../icons/arrow-left";
import ArrowRightIcon from "../../icons/arrow-right";
import SearchResultSlide from "../search-result-slide";

interface SearchResultHit {
  id: string | number;
  start: number;
  end: number;
  type: string;
  text: string;
}

interface SearchResultsData {
  hits?: SearchResultHit[];
}

interface Highlight {
  time: number;
}

interface Props {
  bg?: string;
  duration?: number;
  searchResults?: SearchResultsData;
  onSlideClick?: (value: string) => void;
  highlights?: Highlight[];
  theme?: string;
  searchContent?: string;
  isLight?: boolean;
}

const SearchResults: FC<Props> = ({
  bg = "255,255,255",
  duration = 0.01,
  searchResults = { hits: [] },
  onSlideClick = () => {},
  highlights = [],
  theme = "yellow",
  searchContent = "",
  isLight = false,
}) => {
  const [hoveredSlide, setHoveredSlide] = useState<string | number | null>(
    null,
  );
  const [activeBullets, setActiveBullets] = useState<number[]>([]);
  const swiperContainerRef = useRef<HTMLDivElement>(null);
  const [isBeginning, setIsBeginning] = useState<boolean>(true);
  const [isEnd, setIsEnd] = useState<boolean>(false);
  const swiperInstanceRef = useRef<SwiperCore | null>(null);
  const swiperModules = [Navigation, Mousewheel, Virtual, Manipulation];

  const getLeftValue = (startTime: number, totalDuration: number): number => {
    const val = (startTime * 100) / totalDuration;
    if (val < 0.5) return 0.5;
    return val > 99.5 ? 99.5 : val;
  };

  const isRelevant = (searchResult: SearchResultHit): boolean => {
    return searchResult.type === "relevant";
  };

  const getSearchResultsItemWidth = (srItem: SearchResultHit): string => {
    const itemDuration = srItem.end - srItem.start;
    const width = `${(itemDuration / duration) * 100}%`;
    return width;
  };

  const updateActiveBullets = useCallback(
    (swiper: SwiperCore | null) => {
      if (!swiper) return;
      const newActiveBullets: number[] = [];
      const currentBreakpoint = swiper.currentBreakpoint;
      const breakpoints = swiper.params.breakpoints;
      const slidesPerView =
        breakpoints &&
        currentBreakpoint &&
        breakpoints[currentBreakpoint]?.slidesPerView
          ? breakpoints[currentBreakpoint]!.slidesPerView!
          : swiper.params.slidesPerView;

      const activeSlideCount = slidesPerView
        ? Math.round(Number(slidesPerView))
        : 1;

      for (
        let i = swiper.activeIndex;
        i < swiper.activeIndex + activeSlideCount;
        i++
      ) {
        if (i < (searchResults?.hits?.length ?? 0)) {
          newActiveBullets.push(i);
        }
      }
      setActiveBullets(newActiveBullets);
    },
    [searchResults?.hits?.length],
  );

  const onSwiperSlideChangeTransitionStart = useCallback(
    (swiper: SwiperCore) => {
      setIsBeginning(swiper.isBeginning);
      setIsEnd(swiper.isEnd);
      updateActiveBullets(swiper);
    },
    [updateActiveBullets],
  );

  const setUpSlideMouseEvents = useCallback(() => {
    const swiperElement = swiperContainerRef.current;
    if (!swiperElement) return;

    const slides = swiperElement.querySelectorAll<HTMLElement>(".swiper-slide");

    if (slides && slides.length) {
      slides.forEach((slide) => {
        const handleMouseEnter = (e: MouseEvent) => {
          const target = e.currentTarget as HTMLElement;
          const id = target.getAttribute("data-id");
          setHoveredSlide(id || null);
        };
        const handleMouseLeave = () => {
          setHoveredSlide(null);
        };

        slide.removeEventListener("mouseenter", handleMouseEnter);
        slide.removeEventListener("mouseleave", handleMouseLeave);

        slide.addEventListener("mouseenter", handleMouseEnter);
        slide.addEventListener("mouseleave", handleMouseLeave);
      });
    }
    return () => {
      slides.forEach((slide) => {
        slide.removeEventListener("mouseenter", () => {});
        slide.removeEventListener("mouseleave", () => {});
      });
    };
  }, []);

  useEffect(() => {
    const cleanup = setUpSlideMouseEvents();
    return cleanup;
  }, [searchResults?.hits, setUpSlideMouseEvents]);

  const getSwiperRef = (swiper: SwiperCore) => {
    swiperInstanceRef.current = swiper;
    if (swiper) {
      setIsBeginning(swiper.isBeginning);
      setIsEnd(swiper.isEnd);
      updateActiveBullets(swiper);
      setUpSlideMouseEvents();
    }
  };

  const reachBeginning = (swiper: SwiperCore) => {
    setIsBeginning(swiper.isBeginning);
  };

  const reachEnd = (swiper: SwiperCore) => {
    setIsEnd(swiper.isEnd);
  };

  const goToSlide = (slideIndex: number) => {
    if (swiperInstanceRef.current) {
      swiperInstanceRef.current.slideTo(slideIndex);
    }
  };

  const changeSlide = (type: "prev" | "next") => {
    if (!swiperInstanceRef.current || !searchResults?.hits?.length) return;

    const swiper = swiperInstanceRef.current;

    if (type === "next") {
      const lastVisibleIndex =
        activeBullets.length > 0
          ? activeBullets[activeBullets.length - 1]
          : swiper.activeIndex;
      const slideToMove = lastVisibleIndex + 1;
      goToSlide(Math.min(searchResults.hits.length - 1, slideToMove));
    } else if (type === "prev") {
      const firstVisibleIndex =
        activeBullets.length > 0 ? activeBullets[0] : swiper.activeIndex;
      const currentBreakpoint = swiper.currentBreakpoint;
      const breakpoints = swiper.params.breakpoints;
      const slidesPerView =
        breakpoints &&
        currentBreakpoint &&
        breakpoints[currentBreakpoint]?.slidesPerView
          ? breakpoints[currentBreakpoint]!.slidesPerView!
          : swiper.params.slidesPerView;
      const slidesToMoveBack = slidesPerView
        ? Math.floor(Number(slidesPerView))
        : 1;

      const slideToMove = firstVisibleIndex - slidesToMoveBack;
      goToSlide(Math.max(0, slideToMove));
    }
  };

  const swiperClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const target = e.target as HTMLElement;
    let value = target.getAttribute("data-seconds");

    if (!value && target.parentElement) {
      value = target.parentElement.getAttribute("data-seconds");
    }

    if (value && onSlideClick) {
      onSlideClick(value);
    }
  };

  return (
    <>
      <div
        className={`vdb-p-relative vdb-p-z-10 ${
          isLight
            ? "vdb-p-px-16 vdb-p-pt-16 md:vdb-p-px-24 md:vdb-p-pt-24 xl:vdb-p-px-32 xl:vdb-p-pt-32"
            : "vdb-p-px-32 vdb-p-pt-40"
        }`}
      >
        <div className="vdb-p-relative vdb-p-h-12">
          <div
            className={`sr-timeline-bg vdb-p-absolute vdb-p-bottom-0 vdb-p-left-0 vdb-p-right-0 vdb-p-top-0 vdb-p-py-3 ${
              isLight ? "light" : ""
            }`}
          />
          {!isLight &&
            highlights?.map((item, index) => (
              <button
                key={`highligt-marker-${item.time}-${index}`}
                className="vdb-p-pointer-events-none vdb-p-absolute vdb-p-top-1/2 vdb-p-flex vdb-p-h-16 vdb-p-w-6 vdb-p--translate-x-1/2 vdb-p--translate-y-1/2 vdb-p-transform vdb-p-items-center vdb-p-justify-center vdb-p-rounded-full vdb-p-border vdb-p-border-black-64 vdb-p-bg-primary vdb-p-shadow-1"
                style={{
                  left: `${Math.max(
                    Math.min((100 * item.time) / duration, 95),
                    5,
                  )}%`,
                }}
                disabled
              />
            ))}
          {searchResults?.hits?.map((searchResultsItem, index) => (
            <div
              key={`searchResults-${searchResultsItem.id}-${index}`}
              className={`sr-dot vdb-p-absolute vdb-p-top-1/2 vdb-p-h-6 vdb-p--translate-y-1/2 vdb-p-transform vdb-p-cursor-pointer vdb-p-rounded-full ${
                activeBullets.includes(index)
                  ? "active vdb-p-opacity-100"
                  : "vdb-p-opacity-20 hover:vdb-p-opacity-100"
              } ${
                isRelevant(searchResultsItem)
                  ? "relevant bg-lime vdb-p-z-10 vdb-p-min-w-12"
                  : "exact vdb-p-z-20 vdb-p-w-8 vdb-p--translate-x-1/2 vdb-p-bg-yellow"
              } ${isLight ? "light" : ""} ${
                hoveredSlide && hoveredSlide == searchResultsItem.id
                  ? "forced-hover"
                  : ""
              } `}
              style={{
                left: `${getLeftValue(searchResultsItem.start, duration)}%`,
                width: isRelevant(searchResultsItem)
                  ? getSearchResultsItemWidth(searchResultsItem)
                  : "8px",
                ...(!isRelevant(searchResultsItem) && {
                  transform: "translate(-50%, -50%)",
                }),
              }}
              onClick={() => goToSlide(index)}
              data-id={searchResultsItem.id}
            />
          ))}
        </div>
      </div>

      <div
        ref={swiperContainerRef}
        className={`sr-swiper vdb-p-relative vdb-p-z-0 vdb-p-overflow-hidden vdb-p-rounded-b-16 ${
          isLight
            ? "light vdb-p-px-16 vdb-p-pb-16 xl:vdb-p-px-24 xl:vdb-p-pb-24"
            : ""
        }`}
        onClick={swiperClick}
      >
        <Swiper
          modules={swiperModules}
          slidesPerView={1.3}
          spaceBetween={24}
          mousewheel={{
            forceToAxis: true,
            invert: false,
          }}
          breakpoints={{
            320: {
              slidesPerView: 1.3,
              spaceBetween: 24,
            },
            460: {
              slidesPerView: 2.2,
              spaceBetween: 24,
            },
            680: {
              slidesPerView: 3.2,
              spaceBetween: 10,
            },
          }}
          navigation={false}
          virtual
          onSwiper={getSwiperRef}
          onReachBeginning={reachBeginning}
          onReachEnd={reachEnd}
          onSlideChangeTransitionStart={onSwiperSlideChangeTransitionStart}
        >
          {searchResults.hits?.map((slideData, index) => (
            <SwiperSlide
              key={slideData.id || index}
              virtualIndex={index}
              data-id={slideData.id}
            >
              <SearchResultSlide
                searchResultItem={slideData}
                searchResultItemIndex={index}
                searchContent={searchContent}
                isLight={isLight}
              />
            </SwiperSlide>
          ))}
        </Swiper>

        {!isBeginning && (
          <>
            <div
              className="vdb-p-pointer-events-none vdb-p-absolute vdb-p-bottom-0 vdb-p-left-0 vdb-p-top-0 vdb-p-z-10 vdb-p-block vdb-p-w-40 sm:vdb-p-w-60"
              style={{
                background: `linear-gradient(90deg, rgba(${bg},1) 3.12%, rgba(${bg}, 0.838542) 32.92%, rgba(${bg}, 0) 95.39%)`,
              }}
            />
            <button
              className={`vdb-p-absolute vdb-p-left-24 vdb-p-top-1/2 vdb-p-z-10 vdb-p-hidden vdb-p-h-40 vdb-p-w-40 vdb-p--translate-y-1/2 vdb-p-transform vdb-p-items-center vdb-p-justify-center vdb-p-rounded-full vdb-p-border vdb-p-bg-white vdb-p-shadow-3 vdb-p-transition hover:vdb-p-shadow-4 sm:vdb-p-flex vdb-p-border-${theme}-8`}
              onClick={() => changeSlide("prev")}
              aria-label="Previous slide"
            >
              <ArrowLeftIcon className="vdb-p-text-black" />
            </button>
          </>
        )}

        {!isEnd && (
          <>
            <div
              className="vdb-p-pointer-events-none vdb-p-absolute vdb-p-bottom-0 vdb-p-right-0 vdb-p-top-0 vdb-p-z-10 vdb-p-block vdb-p-w-40 sm:vdb-p-w-60"
              style={{
                background: `linear-gradient(270deg, rgba(${bg},1) 3.12%, rgba(${bg}, 0.838542) 32.92%, rgba(${bg}, 0) 95.39%)`,
              }}
            />
            <button
              className={`vdb-p-absolute vdb-p-right-24 vdb-p-top-1/2 vdb-p-z-10 vdb-p-hidden vdb-p-h-40 vdb-p-w-40 vdb-p--translate-y-1/2 vdb-p-transform vdb-p-items-center vdb-p-justify-center vdb-p-rounded-full vdb-p-border vdb-p-bg-white vdb-p-shadow-3 vdb-p-transition hover:vdb-p-shadow-4 sm:vdb-p-flex vdb-p-border-${theme}-8`}
              onClick={() => changeSlide("next")}
              aria-label="Next slide"
            >
              <ArrowRightIcon className="vdb-p-text-black" />
            </button>
          </>
        )}
      </div>
    </>
  );
};

export default SearchResults;
