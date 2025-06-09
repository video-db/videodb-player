<template>
  <div>
    <div
      class="vdb-p-relative vdb-p-z-10"
      :class="{
        'vdb-p-px-16 vdb-p-pt-16 md:vdb-p-px-24 md:vdb-p-pt-24 xl:vdb-p-px-32 xl:vdb-p-pt-32':
          isLight,
        'vdb-p-px-32 vdb-p-pt-40': !isLight,
      }"
    >
      <!-- Progress bar and bullets -->
      <div class="vdb-p-relative vdb-p-h-12">
        <div
          class="sr-timeline-bg vdb-p-absolute vdb-p-bottom-0 vdb-p-left-0 vdb-p-right-0 vdb-p-top-0 vdb-p-py-3"
          :class="isLight ? 'light' : ''"
        />
        <!-- HighLights -->
        <button
          v-for="(item, index) in highlights"
          v-show="!isLight"
          :key="`highligt-marker-${item.time}-${index}`"
          class="vdb-p-pointer-events-none vdb-p-absolute vdb-p-top-1/2 vdb-p-flex vdb-p-h-16 vdb-p-w-6 vdb-p--translate-x-1/2 vdb-p--translate-y-1/2 vdb-p-transform vdb-p-items-center vdb-p-justify-center vdb-p-rounded-full vdb-p-border vdb-p-border-black-64 vdb-p-bg-primary vdb-p-shadow-1"
          :style="{
            left: `${Math.max(Math.min((100 * item.time) / duration, 95), 5)}%`,
          }"
        />
        <!-- Bullets front -->
        <div
          v-for="(searchResultsItem, index) in searchResults.hits"
          :key="`searchResults-${searchResultsItem.id}-${index}`"
          class="sr-dot vdb-p-absolute vdb-p-top-1/2 vdb-p-h-6 vdb-p--translate-y-1/2 vdb-p-transform vdb-p-cursor-pointer vdb-p-rounded-full"
          :style="{
            left: `${getLeftValue(searchResultsItem.start, duration)}%`,
            width: isRelevant(searchResultsItem)
              ? getSearchResultsItemWidth(searchResultsItem)
              : '',
          }"
          :class="`${
            activeBullets.includes(index)
              ? 'active vdb-p-opacity-100'
              : 'vdb-p-opacity-20 hover:vdb-p-opacity-100'
          } ${
            isRelevant(searchResultsItem)
              ? 'relevant bg-lime vdb-p-z-10 vdb-p-min-w-12'
              : 'exact vdb-p-z-20 vdb-p-w-8 vdb-p--translate-x-1/2 vdb-p-bg-yellow'
          } ${isLight ? 'light' : ''} ${
            hoveredSlide && hoveredSlide == searchResultsItem.id
              ? 'forced-hover'
              : ''
          } `"
          @click="goToSlide(index)"
        />
      </div>
    </div>
    <!-- Swiper -->

    <div
      class="sr-swiper vdb-p-relative vdb-p-z-0 vdb-p-overflow-hidden vdb-p-rounded-b-16"
      :class="{
        'light vdb-p-px-16 vdb-p-pb-16 xl:vdb-p-px-24 xl:vdb-p-pb-24': isLight,
      }"
      @click="swiperClick"
    >
      <swiper
        :modules="swiperModules"
        :slides-per-view="1.3"
        :space-between="24"
        :mousewheel="{
          forceToAxis: true,
          invert: false,
        }"
        :breakpoints="{
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
        }"
        navigation
        @swiper="getSwiperRef"
        @reachBeginning="reachBeginning"
        @reachEnd="reachEnd"
        @slideChangeTransitionStart="onSwiperSlideChangeTransitionStart"
      >
        <swiper-slide
          v-for="(slideContent, index) in searchResults.hits"
          :key="index"
          :virtualIndex="index"
        >
          <SearchResultSlide
            :searchResultItem="slideContent"
            :searchResultItemIndex="index"
            :searchContent="searchContent"
            :isLight="isLight"
          />
        </swiper-slide>
      </swiper>
      <div
        v-if="!isBeginning"
        class="vdb-p-pointer-events-none vdb-p-absolute vdb-p-bottom-0 vdb-p-left-0 vdb-p-top-0 vdb-p-z-10 vdb-p-block vdb-p-w-40 sm:vdb-p-w-60"
        :style="{
          background: `linear-gradient(90deg, rgba(${bg},1) 3.12%, rgba(${bg}, 0.838542) 32.92%, rgba(${bg}, 0) 95.39%)`,
        }"
      />
      <button
        v-if="!isBeginning"
        class="vdb-p-absolute vdb-p-left-24 vdb-p-top-1/2 vdb-p-z-10 vdb-p-hidden vdb-p-h-40 vdb-p-w-40 vdb-p--translate-y-1/2 vdb-p-transform vdb-p-items-center vdb-p-justify-center vdb-p-rounded-full vdb-p-border vdb-p-bg-white vdb-p-shadow-3 vdb-p-transition hover:vdb-p-shadow-4 sm:vdb-p-flex"
        :class="`vdb-p-border-${theme}-8`"
        @click="changeSlide('prev')"
      >
        <ArrowLeftIcon class="vdb-p-text-black" />
      </button>
      <!-- Next button -->
      <div
        v-if="!isEnd"
        class="sm:vdb-p-w-600 vdb-p-pointer-events-none vdb-p-absolute vdb-p-bottom-0 vdb-p-right-0 vdb-p-top-0 vdb-p-z-10 vdb-p-block vdb-p-w-40"
        :style="{
          background: `linear-gradient(270deg, rgba(${bg},1) 3.12%, rgba(${bg}, 0.838542) 32.92%, rgba(${bg}, 0) 95.39%)`,
        }"
      />
      <button
        v-if="!isEnd"
        class="vdb-p-absolute vdb-p-right-24 vdb-p-top-1/2 vdb-p-z-10 vdb-p-hidden vdb-p-h-40 vdb-p-w-40 vdb-p--translate-y-1/2 vdb-p-transform vdb-p-items-center vdb-p-justify-center vdb-p-rounded-full vdb-p-border vdb-p-bg-white vdb-p-shadow-3 vdb-p-transition hover:vdb-p-shadow-4 sm:vdb-p-flex"
        :class="`vdb-p-border-${theme}-8`"
        @click="changeSlide('next')"
      >
        <ArrowRightIcon class="vdb-p-text-black" />
      </button>
    </div>
  </div>
</template>
<script setup>
import { ref, onMounted, watch } from "vue";
import { Swiper, SwiperSlide } from "swiper/vue";
import { Navigation, Mousewheel, Virtual, Manipulation } from "swiper/modules";
import "swiper/css";
import SearchResultSlide from "./SearchResultSlide.vue";

import ArrowLeftIcon from "../icons/arrow-left.vue";
import ArrowRightIcon from "../icons/arrow-right.vue";

const props = defineProps({
  bg: {
    type: String,
    default: "255,255,255",
  },
  duration: {
    type: Number,
    default: 0.01,
  },
  searchResults: {
    type: Object,
    default: () => ({}),
  },
  onSlideClick: {
    type: Function,
    default: () => {},
  },
  highlights: {
    type: Array,
    default: () => [],
  },
  theme: {
    type: String,
    default: "yellow",
  },
  searchContent: {
    type: String,
    default: "",
  },
  isLight: {
    type: Boolean,
    default: false,
  },
});

const isFocused = ref(false);
const hoveredSlide = ref(null);
const activeBullets = ref([]);
const swiperRef = ref({});
const isBeginning = ref(true);
const isEnd = ref(false);
const swiperModules = [Navigation, Mousewheel, Virtual, Manipulation];

onMounted(() => {
  onSwiperSlideChangeTransitionStart();
  setUpSlideMouseEvents();
});

const getSwiperRef = (instance) => {
  swiperRef.value = instance;
};

const reachBeginning = (instance) => {
  isBeginning.value = instance.isBeginning;
};

const reachEnd = (instance) => {
  isEnd.value = instance.isEnd;
};

const setUpSlideMouseEvents = () => {
  const slides = document.getElementsByClassName("swiper-slide");
  if (slides && slides.length) {
    for (let i = 0; i < slides.length; i++) {
      slides[i].addEventListener("mouseenter", (e) => {
        const a = e.target.getAttribute("data-id");
        hoveredSlide.value = a || null;
      });
      slides[i].addEventListener("mouseleave", () => {
        hoveredSlide.value = null;
      });
    }
  }
};

const onSwiperSlideChangeTransitionStart = () => {
  isBeginning.value = swiperRef.value.isBeginning;
  isEnd.value = swiperRef.value.isEnd;
  if (!swiperRef.value) return;
  const newActiveBullets = [];
  const activeSlideCount = Math.round(
    swiperRef.value.params.breakpoints[swiperRef.value.currentBreakpoint]
      .slidesPerView,
  );
  for (
    let i = swiperRef.value.activeIndex;
    i < swiperRef.value.activeIndex + activeSlideCount;
    i++
  ) {
    newActiveBullets.push(i);
  }
  activeBullets.value = newActiveBullets;
};

const getLeftValue = (startTime, duration) => {
  const val = (parseFloat(startTime) * 100) / duration;
  if (val < 0.5) return 0.5;
  return val;
};

const changeSlide = (type) => {
  if (type === "next") {
    const slideToMove = activeBullets.value[activeBullets.value.length - 1] + 1;
    goToSlide(Math.min(props.searchResults.hits.length - 1, slideToMove));
  } else if (type === "prev") {
    const slideToMove = activeBullets.value[0] - 3;
    goToSlide(Math.max(0, slideToMove));
  }
};

const goToSlide = (slide) => {
  swiperRef.value.slideTo(slide);
};

const getSearchResultsItemWidth = (srItem) => {
  const duration = srItem.end - srItem.start;
  const width = `${(duration / props.duration) * 100}%`;
  return width;
};

const isRelevant = (searchResult) => {
  return searchResult.type === "relevant";
};

const swiperClick = (e) => {
  if (!e.target) return;
  let value = e.target.getAttribute("data-seconds");
  if (!value) {
    const parentElement = e.target.parentElement;
    if (!parentElement) return;
    value = parentElement.getAttribute("data-seconds");
  }
  if (value) {
    props.onSlideClick(value);
  }
};
</script>

<style>
/* Swiper */
.sr-swiper .swiper {
  padding: 2rem;
}

.sr-swiper.light .swiper {
  padding: 0.5rem;
}

/* Truncate search results */
.swiper-truncate-overflow {
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
}

.sr-timeline-bg {
  background: rgba(0, 0, 0, 0.2);
  border-radius: 30px;
}

.sr-timeline-bg.light {
  background: #f3f4f6;
  border: 1px solid #e5e7eb;
  border-radius: 30px;
}

.swiper-slide.sr {
  height: 128px;
  padding: 10px;
}

.swiper-slide.sr:hover {
  background: rgba(12, 12, 12, 0.4);
}

.swiper-slide.sr.light:hover {
  background: #eceff3;
}

.swiper-slide.sr:hover .relevant-text-br {
  color: #cde210;
}

.swiper-slide.sr.light:hover .relevant-text-br {
  color: #53b745;
}

.swiper-slide.sr:hover .exact-text-br {
  color: #f8c450;
}

.swiper-slide.sr:hover .swiper-time.light {
  background-color: #fff;
}

.swiper-time {
  width: fit-content;
  background-color: #323232;
  border-radius: 4px;
  padding: 6px;
  display: flex;
}

.swiper-time.light {
  background-color: #eceff3;
}

.swiper-time > img {
  width: 14px;
  height: auto;
  margin-right: 4px;
}

.text-lime {
  color: #cde210;
}

.text-lime.light {
  background-color: #53b745;
}

.bg-lime {
  background-color: #cde210;
}

.bg-lime.light {
  background-color: #53b745;
}

.sr-dot {
  box-sizing: content-box;
}

.sr-dot.active:not(.light) {
  outline: 1px solid rgba(0, 0, 0, 0.35);
}

.sr-dot.light {
  outline: 1px solid rgba(255, 255, 255, 1);
}

.sr-dot.relevant:not(.light):hover,
.sr-dot.forced-hover.relevant:not(.light) {
  outline: 7px solid rgba(180, 194, 54, 0.35);
  box-shadow: 0px 1px 4px rgba(0, 0, 0, 0.53);
}

.sr-dot.exact:not(.light):hover,
.sr-dot.forced-hover.exact:not(.light) {
  outline: 7px solid rgba(248, 196, 80, 0.35);
  box-shadow: 0px 1px 4px rgba(0, 0, 0, 0.53);
}

.sr-dot.light.relevant:hover,
.sr-dot.forced-hover.light.relevant {
  outline: 7px solid rgba(83, 183, 69, 0.35);
  box-shadow: 0px 1px 4px rgba(255, 255, 255, 0.53);
}

.swiper-time-light-text {
  color: #374151;
}
</style>
