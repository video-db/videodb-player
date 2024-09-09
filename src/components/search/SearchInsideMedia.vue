<template>
  <div
    class="vdb-p-absolute vdb-p-left-0 vdb-p-top-0 vdb-p-h-48 vdb-p-w-full vdb-p-overflow-visible vdb-p-transition-opacity vdb-p-duration-200 vdb-p-ease-in-out"
  >
    <!-- Basic search elements -->
    <div
      class="spext-player-search vdb-p-h-full vdb-p-w-full"
      :class="{
        'vdb-p-opacity-30': !isActive && !isAutoPilotLoading,
        'vdb-p-opacity-40': wordsLoading,
      }"
    >
      <div ref="searchTopContainer" class="searchTopContainer" tabindex="0">
        <!-- Input -->
        <div
          id="searchInputWrapper"
          :class="[
            'search-input-wrapper vdb-p-absolute vdb-p-top-20 vdb-p-h-48 vdb-p--translate-x-1/2 vdb-p-transform vdb-p-rounded-8 sm:vdb-p-top-24',
            autoHide && !showElements && searchContent === ''
              ? 'vdb-p-opacity-0'
              : 'vdb-p-opacity-1',
            {
              'is-focused': isFocused,
              'vdb-p-left-1/2 vdb-p-bg-black-16 vdb-p-text-white':
                isUploadingScreen,
              'vdb-p-left-1/2 vdb-p-bg-steelblue-100 vdb-p-text-kilvish-500':
                isAutoPilotLoadingScreen,
              'vdb-p-left-1/2 vdb-p-bg-black-32 vdb-p-text-white': isRawScreen,
              'search-input-wrapper-done vdb-p-left-20 vdb-p-transform-none vdb-p-bg-black-32 vdb-p-text-white sm:vdb-p-left-1/2 sm:vdb-p--translate-x-1/2 sm:vdb-p-transform':
                isFinalScreen,
              'search-input-wrapper-done-full vdb-p-mr-20': isFinalScreen,
            },
          ]"
        >
          <input
            v-if="!(isAutoPilotLoading || isRaw || wordsLoading)"
            u
            ref="searchInput"
            class="search-input vdb-p-h-48 vdb-p-w-full vdb-p-appearance-none vdb-p-rounded-8 vdb-p-border vdb-p-border-solid vdb-p-border-yellow vdb-p-bg-transparent vdb-p-pl-12 vdb-p-pr-44 vdb-p-text-left vdb-p-transition focus:vdb-p-border-yellow-600 focus:vdb-p-outline-none sm:vdb-p-pl-44"
            :class="{
              'search-input-uploading':
                !isActive && !isAutoPilotLoading && !isRaw,
              'search-input-raw': !isActive && isRaw,
              'vdb-p-text-left': !isUploadingScreen,
              'vdb-p-text-left': isUploadingScreen,
              'vdb-p-border-0 vdb-p-border-none': wordsLoading,
            }"
            :value="searchContent"
            type="text"
            :placeholder="isFocused ? '' : searchInputPlaceholder"
            :disabled="!isActive || wordsLoading"
            @focus="onSearchFocus"
            @blur="handleInputBlur"
            @input="$emit('searchChange', $event.target.value)"
            @keyup.enter="$emit('searchSubmit', searchContent)"
          />
          <div
            v-else
            class="search-input vdb-p-my-auto vdb-p-flex vdb-p-h-48 vdb-p-w-full vdb-p-appearance-none vdb-p-items-center vdb-p-justify-start vdb-p-rounded-8 vdb-p-border vdb-p-border-yellow vdb-p-bg-transparent vdb-p-px-16 vdb-p-pl-44 vdb-p-transition"
            :class="{
              'search-input-wrapper-done-full vdb-p-mr-20':
                isFinalScreen && (isFocused || searchContent !== ''),
              'vdb-p-border-0 vdb-p-border-none': wordsLoading,
            }"
          >
            <ellipses-loading v-if="wordsLoading">
              <span class="search-input-autopiloting">
                {{ searchInputPlaceholder }}
              </span>
            </ellipses-loading>
            <span v-else class="search-input-autopiloting">
              {{ searchInputPlaceholder }}
            </span>
          </div>
          <div class="vdb-p-hidden sm:vdb-p-block">
            <SearchIcon
              v-if="!isUploadingScreen"
              class="vdb-p-absolute vdb-p-left-16 vdb-p-top-1/2 vdb-p-h-20 vdb-p-w-20 vdb-p--translate-y-1/2 vdb-p-transform"
            />
            <CloseIcon
              v-if="searchContent !== ''"
              class="vdb-p-absolute vdb-p-right-16 vdb-p-top-1/2 vdb-p-h-20 vdb-p-w-20 vdb-p--translate-y-1/2 vdb-p-transform vdb-p-cursor-pointer vdb-p-transition"
              @click="closeInput()"
            />
          </div>

          <div class="vdb-p-block sm:vdb-p-hidden">
            <SearchIcon
              v-if="!isUploadingScreen && searchContent == ''"
              class="vdb-p-absolute vdb-p-right-16 vdb-p-top-1/2 vdb-p-h-20 vdb-p-w-20 vdb-p--translate-y-1/2 vdb-p-transform"
            />
            <CloseIcon
              v-if="!isUploadingScreen && searchContent !== ''"
              class="vdb-p-absolute vdb-p-right-16 vdb-p-top-1/2 vdb-p-h-20 vdb-p-w-20 vdb-p--translate-y-1/2 vdb-p-transform vdb-p-cursor-pointer vdb-p-transition"
              @click="closeInput()"
            />
          </div>
        </div>

        <!-- Search Suggestions -->
        <div
          v-if="showSearchSuggestions && searchSuggestions.length"
          v-show="!wordsLoading"
          :class="[
            'search-suggestions vdb-p-absolute vdb-p-left-1/2 vdb-p-top-76 vdb-p-hidden vdb-p--translate-x-1/2 vdb-p-transform vdb-p-rounded-8 vdb-p-border vdb-p-border-white-24 vdb-p-bg-random-222222 vdb-p-px-16 vdb-p-py-8',
            autoHide && !showElements ? 'vdb-p-opacity-0' : 'vdb-p-opacity-1',
          ]"
        >
          <div
            class="vdb-p-leading-24 vdb-p-uppercase vdb-p-text-others-gray42 vdb-p-text-left"
            style="font-size: 0.625rem"
          >
            Popular Topics in this file
          </div>
          <div class="search-suggestions-wrapper">
            <div
              v-for="(suggestion, i) in searchSuggestions"
              :key="i"
              class="vdb-p-leading-24 search-suggestion vdb-p-min-h-24 vdb-p-cursor-pointer vdb-p-border-b vdb-p-border-others-black181818 vdb-p-py-8 vdb-p-font-medium vdb-p-text-white hover:vdb-p-text-kilvish-500 vdb-p-text-left"
              style="font-size: 0.75rem"
              @click="() => handleSearchSuggestionClick(suggestion.text)"
            >
              {{ suggestion.text }}
            </div>
          </div>
        </div>
        <div
          v-else-if="showSearchSuggestions && !searchSuggestions.length"
          :class="[
            'search-suggestions vdb-p-absolute vdb-p-left-1/2 vdb-p-top-76 vdb-p-hidden vdb-p--translate-x-1/2 vdb-p-transform vdb-p-rounded-8 vdb-p-border vdb-p-border-white-24 vdb-p-bg-random-222222 vdb-p-px-16 vdb-p-py-8',
            autoHide && !showElements && searchContent === ''
              ? 'vdb-p-opacity-0'
              : 'vdb-p-opacity-1',
          ]"
        >
          <div
            class="vdb-p-leading-24 vdb-p-uppercase vdb-p-text-others-gray42 vdb-p-text-left"
            style="font-size: 0.625rem"
          >
            Popular Topics in this file
          </div>
          <div class="search-suggestions-wrapper">
            <div
              class="vdb-p-mb-4 vdb-p-h-14 vdb-p-w-full vdb-p-animate-pulse vdb-p-rounded-2 vdb-p-bg-others-suggLoader"
            />
            <div
              class="vdb-p-mb-4 vdb-p-h-14 vdb-p-w-3/4 vdb-p-animate-pulse vdb-p-rounded-2 vdb-p-bg-others-suggLoader"
            />
            <div
              class="vdb-p-mb-4 vdb-p-h-14 vdb-p-w-4/6 vdb-p-animate-pulse vdb-p-rounded-2 vdb-p-bg-others-suggLoader"
            />
            <div
              class="vdb-p-mb-4 vdb-p-h-14 vdb-p-w-1/2 vdb-p-animate-pulse vdb-p-rounded-2 vdb-p-bg-others-suggLoader"
            />
            <div
              class="vdb-p-mb-4 vdb-p-h-14 vdb-p-w-10/12 vdb-p-animate-pulse vdb-p-rounded-2 vdb-p-bg-others-suggLoader"
            />
          </div>
        </div>
        <!-- Search Results -->
        <div
          v-if="showSearchResults"
          id="searchResultsContainer"
          class="searchResultsContainer vdb-p-absolute vdb-p-left-8 vdb-p-right-8 vdb-p-top-80 vdb-p-mx-auto vdb-p-overflow-hidden vdb-p-rounded-16 vdb-p-border vdb-p-shadow-3 vdb-p-transition sm:vdb-p-left-16 sm:vdb-p-right-16 md:vdb-p-top-80"
          :class="{
            'vdb-p-border-white-24 vdb-p-text-white': !isLight,
            'vdb-p-border-kilvish-300 vdb-p-text-gray-900': isLight,
          }"
          :style="`max-width: 820px; background: ${
            isLight ? '#F9FAFB' : '#222222'
          }`"
        >
          <div
            class="vdb-p-flex vdb-p-justify-center vdb-p-p-28"
            :class="{ 'vdb-p-hidden': !searchResultsLoading }"
          >
            <loading />
          </div>
          <div
            :class="{
              'vdb-p-hidden': searchResultsLoading,
            }"
          >
            <search-results
              v-if="searchResults.hits.length > 0"
              bg="34,34,34"
              theme="yellow"
              :search-results="searchResults"
              :duration="duration"
              :on-slide-click="onSlideClick"
              :highlights="highlights"
              :search-content="searchContent.trim()"
              :is-light="isLight"
            />
            <div v-else>
              <p
                class="vdb-p-px-8 vdb-p-py-32 vdb-p-text-center vdb-p-opacity-80"
              >
                No results found
              </p>
            </div>
          </div>
        </div>
      </div>
      <!-- Mobile CC button -->
      <div>
        <!-- #TOOD: Add Subitlte Button here -->
      </div>
    </div>
    <!-- Iframe top header -->
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from "vue";
import SearchResults from "./SearchResults.vue";
import SearchIcon from "../icons/search.vue";
import CloseIcon from "../icons/close.vue";
import EllipsesLoading from "../atoms/EllipsesLoading.vue";
import Loading from "../atoms/Loading.vue";

import { useVideoDBPlayer } from "../../context.js";

const props = defineProps({
  autoHide: { type: Boolean, default: true },
  isActive: { type: Boolean, default: true },
  isRaw: { type: Boolean, default: false },
  isAutoPilotLoading: { type: Boolean, default: false },
  searchContent: { type: String, default: "" },
  searchResultsLoading: { type: Boolean, default: false },
  searchInputPlaceholder: { type: String, default: "Search or ask a question" },
  wordsLoading: { type: Boolean, default: false },
  showSearchResults: { type: Boolean, default: false },
  searchSuggestions: { type: Array, default: () => [] },
  searchResults: { type: Object, default: () => ({}) },
  updateParentIsFocused: { type: Function, default: () => {} },
  highlights: { type: Array, default: () => [] },
  isLight: { type: Boolean, default: false },
});

const { playing, duration, seekTo, showElements, togglePlay } =
  useVideoDBPlayer();

const emit = defineEmits([
  "toggleResults",
  "inputFocused",
  "searchSubmit",
  "searchChange",
]);

const isFocused = ref(false);
const searchInput = ref(null);
const searchTopContainer = ref(null);

const showSearchSuggestions = computed(
  () => props.searchContent === "" && props.searchSuggestions.length,
);
const isUploadingScreen = computed(
  () => !props.isActive && !props.isAutoPilotLoading && !props.isRaw,
);
const isAutoPilotLoadingScreen = computed(
  () => !props.isActive && props.isAutoPilotLoading && !props.isRaw,
);
const isRawScreen = computed(
  () => !props.isActive && !props.isAutoPilotLoading && props.isRaw,
);
const isFinalScreen = computed(
  () => props.isActive && !props.isAutoPilotLoading && !props.isRaw,
);

watch(
  () => props.searchContent,
  (val) => {
    if (val === "") {
      emit("toggleResults", false);
      return;
    }
    emit("toggleResults", true);
  },
);

watch(isFocused, (val) => {
  if (props.searchContent === "") {
    props.updateParentIsFocused(val);
  } else if (val) {
    emit("toggleResults", true);
  }
});

watch(
  () => props.showSearchResults,
  (val, oldVal) => {
    if (!oldVal && val) emit("toggleResults", true);
  },
);

onMounted(() => {
  document.addEventListener("mousedown", clickAwayListener);
});

const handleSearchSuggestionClick = (text) => {
  forceFocus();
  emit("searchChange", text);
};

const onSlideClick = (value) => {
  seekTo(value);
  if (!playing.value) {
    togglePlay();
  }
  searchTopContainer.value.blur();
  emit("toggleResults", false);
};

const forceFocus = () => {
  searchInput.value.focus();
  isFocused.value = true;
};

const onSearchFocus = () => {
  isFocused.value = true;
  emit("inputFocused");
  window.parent.postMessage("Search Focus", "*");
};

const closeInput = () => {
  emit("searchChange", "");
  searchInput.value.focus();
};

const handleInputBlur = () => {
  isFocused.value = false;
};

const clickAwayListener = (e) => {
  const ids = [
    "videoPlay",
    "videoPause",
    "searchResultsContainer",
    "searchInputWrapper",
  ];
  const isAnyComp = ids.some((val) => checkForIdInParentNodes(e.target, val));
  if (!isAnyComp) emit("toggleResults", false);
};

const checkForIdInParentNodes = (elm, id) => {
  let element = elm;
  while (element.parentNode) {
    if (element.id === id) return true;
    element = element.parentNode;
  }
  return false;
};
</script>

<style scoped>
.iframe-video-header:not(.inactive) {
  background: linear-gradient(
    180deg,
    rgba(0, 0, 0, 0.4) 0%,
    rgba(0, 0, 0, 0) 100%
  );
}

.search-suggestions-wrapper {
  max-height: 160px;
  overflow-y: auto;
}
.search-suggestion:last-child {
  border-bottom: none;
  padding-bottom: 0.25rem;
}

::-webkit-scrollbar {
  width: 4px !important;
  height: 7px !important;
}
::-webkit-scrollbar-thumb {
  background: #353536;
}

/* Truncate search results */
.truncate-overflow {
  display: -webkit-box;
  -webkit-line-clamp: 1;
  overflow: hidden;
  -webkit-box-orient: vertical;
}
.search-suggestions {
  max-width: 344px;
  width: calc(100% - 24px);
  z-index: 28;
  transition: all 0.4s ease-in-out;
}

/* Search input */
.search-input-wrapper {
  backdrop-filter: blur(8px);
  border: 1px solid rgba(255, 255, 255, 0.08);
  transition: all 0.4s ease-in-out;
  width: calc(100% - 56px);
  max-width: 344px;
  z-index: 28;
}
.search-input-wrapper.is-focused {
  border: 1px solid rgba(255, 255, 255, 0.32);
  background: rgba(0, 0, 0, 0.32);
}
.search-input-wrapper input::placeholder {
  transition: all 0.4s ease-in-out;
  text-align: left;
}
.search-input-wrapper.is-focused input::placeholder {
  color: rgba(255, 255, 255, 0.4);
}
.search-input-uploading::placeholder {
  font-weight: 400;
  color: white;
}
.search-input-autopiloting::placeholder {
  color: #8ca8bd;
  font-weight: 500;
}

.search-input-autopiloting {
  width: 220px;
  max-width: 220px;
}

.search-input-raw::placeholder {
  color: white;
  font-weight: 500;
}
.search-input-done::placeholder {
  color: white;
}
/* Swiper highlight */
.spext-player-search /deep/.swiper-slide .highlight {
  display: inline-block;
  position: relative;
}
.spext-player-search /deep/.swiper-slide .highlight::before {
  content: "";
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  border-radius: 4px;
  z-index: -1;
  background: #e2462c;
}

.searchTopContainer {
  width: 100%;
  height: 100%;
}

.searchTopContainer:focus-within .search-suggestions {
  display: block;
}

@media (max-width: 639px) {
  .search-input-wrapper-done {
    max-width: unset;
    width: calc(100% - 80px);
  }

  .search-input-wrapper-done-full {
    max-width: unset;
    width: calc(100% - 40px);
  }

  .search-suggestions {
    max-width: unset;
    width: calc(100% - 40px);
  }
  .search-input-wrapper input::placeholder {
    transition: all 0.4s ease-in-out;
    text-align: left;
  }
}
</style>
