<template>
  <div
    class="absolute left-0 top-0 h-48 w-full overflow-visible transition-opacity duration-200 ease-in-out"
  >
    <!-- Basic search elements -->
    <div
      class="spext-player-search h-full w-full"
      :class="{
        'opacity-30': !isActive && !isAutoPilotLoading,
        'opacity-40': wordsLoading,
      }"
    >
      <div ref="searchTopContainer" class="searchTopContainer" tabindex="0">
        <!-- Input -->
        <div
          id="searchInputWrapper"
          :class="[
            'search-input-wrapper absolute top-20 h-48 -translate-x-1/2 transform rounded-8 sm:top-24',
            autoHide && !showElements && searchContent === ''
              ? 'opacity-0'
              : 'opacity-1',
            {
              'is-focused': isFocused,
              'left-1/2 bg-black-16 text-white': isUploadingScreen,
              'left-1/2 bg-steelblue-100 text-kilvish-500':
                isAutoPilotLoadingScreen,
              'left-1/2 bg-black-32 text-white': isRawScreen,
              'search-input-wrapper-done left-20 transform-none bg-black-32 text-white sm:left-1/2 sm:-translate-x-1/2 sm:transform':
                isFinalScreen,
              'search-input-wrapper-done-full mr-20':
                isFinalScreen && (isFocused || searchContent !== ''),
            },
          ]"
        >
          <input
            v-if="!(isAutoPilotLoading || isRaw || wordsLoading)"
            ref="searchInput"
            class="search-input h-48 w-full appearance-none rounded-8 border border-solid border-yellow bg-transparent pl-12 pr-44 text-left transition focus:border-yellow-600 sm:pl-44"
            :class="{
              'search-input-uploading':
                !isActive && !isAutoPilotLoading && !isRaw,
              'search-input-raw': !isActive && isRaw,
              'text-left': !isUploadingScreen,
              'text-left': isUploadingScreen,
              'border-0 border-none': wordsLoading,
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
            class="search-input my-auto flex h-48 w-full appearance-none items-center justify-start rounded-8 border border-yellow bg-transparent px-16 pl-44 transition"
            :class="{
              'search-input-wrapper-done-full mr-20':
                isFinalScreen && (isFocused || searchContent !== ''),
              'border-0 border-none': wordsLoading,
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
          <div class="hidden sm:block">
            <SearchIcon
              v-if="!isUploadingScreen"
              class="absolute left-16 top-1/2 h-20 w-20 -translate-y-1/2 transform"
            />
            <CloseIcon
              v-if="searchContent !== ''"
              class="absolute right-16 top-1/2 h-20 w-20 -translate-y-1/2 transform cursor-pointer transition"
              @click="closeInput()"
            />
          </div>

          <div class="block sm:hidden">
            <SearchIcon
              v-if="!isUploadingScreen && searchContent == ''"
              class="absolute right-16 top-1/2 h-20 w-20 -translate-y-1/2 transform"
            />
            <CloseIcon
              v-if="!isUploadingScreen && searchContent !== ''"
              class="absolute right-16 top-1/2 h-20 w-20 -translate-y-1/2 transform cursor-pointer transition"
              @click="closeInput()"
            />
          </div>
        </div>

        <!-- Search Suggestions -->
        <div
          v-if="showSearchSuggestions && searchSuggestions.length"
          v-show="!wordsLoading"
          :class="[
            'search-suggestions absolute left-1/2 top-76 hidden -translate-x-1/2 transform rounded-8 border border-white-24 bg-random-222222 px-16 py-8',
            autoHide && !showElements ? 'opacity-0' : 'opacity-1',
          ]"
        >
          <div
            class="leading-24 uppercase text-others-gray42"
            style="font-size: 0.625rem"
          >
            Popular Topics in this file
          </div>
          <div class="search-suggestions-wrapper">
            <div
              v-for="(suggestion, i) in searchSuggestions"
              :key="i"
              class="leading-24 search-suggestion min-h-24 cursor-pointer border-b border-others-black181818 py-8 font-medium text-white hover:text-kilvish-500"
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
            'search-suggestions absolute left-1/2 top-76 hidden -translate-x-1/2 transform rounded-8 border border-white-24 bg-random-222222 px-16 py-8',
            autoHide && !showElements && searchContent === ''
              ? 'opacity-0'
              : 'opacity-1',
          ]"
        >
          <div
            class="leading-24 uppercase text-others-gray42"
            style="font-size: 0.625rem"
          >
            Popular Topics in this file
          </div>
          <div class="search-suggestions-wrapper">
            <div
              class="mb-4 h-14 w-full animate-pulse rounded-2 bg-others-suggLoader"
            />
            <div
              class="mb-4 h-14 w-3/4 animate-pulse rounded-2 bg-others-suggLoader"
            />
            <div
              class="mb-4 h-14 w-4/6 animate-pulse rounded-2 bg-others-suggLoader"
            />
            <div
              class="mb-4 h-14 w-1/2 animate-pulse rounded-2 bg-others-suggLoader"
            />
            <div
              class="mb-4 h-14 w-10/12 animate-pulse rounded-2 bg-others-suggLoader"
            />
          </div>
        </div>
        <!-- Search Results -->
        <div
          v-if="showSearchResults"
          id="searchResultsContainer"
          class="searchResultsContainer absolute left-8 right-8 top-80 mx-auto overflow-hidden rounded-16 border shadow-3 transition sm:left-16 sm:right-16 md:top-80"
          :class="{
            'border-white-24 text-white': !isLight,
            'border-kilvish-300 text-gray-900': isLight,
          }"
          :style="`max-width: 820px; background: ${
            isLight ? '#F9FAFB' : '#222222'
          }`"
        >
          <div
            class="flex justify-center p-28"
            :class="{ hidden: !searchResultsLoading }"
          >
            <loading />
          </div>
          <div
            :class="{
              hidden: searchResultsLoading,
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
              <p class="px-8 py-32 text-center opacity-80">No results found</p>
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

const showSearchSuggestions = computed(() => props.searchContent === "" && props.searchSuggestions.length);
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

watch(()=>props.searchContent, (val)=>{
  if(val === ""){
    emit("toggleResults", false);
    return;
  }
  emit("toggleResults", true);
})

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
