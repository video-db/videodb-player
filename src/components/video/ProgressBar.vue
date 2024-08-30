<template>
  <div class="w-full">
    <div
      v-show="isActive"
      ref="progressBar"
      :class="[
        'progress-bar relative flex h-8 items-center transition-opacity',
        (autoHide && !showElements) || duration === 0
          ? 'opacity-0'
          : 'opacity-1',
      ]"
    >
      <!-- Video feedback popover -->
      <div
        ref="videoPreview"
        class="pointer-events-none absolute bottom-28 left-0 w-2/12 min-w-112 -translate-x-1/2 transform rounded-b-8 pb-2 sm:bottom-16 sm:pb-4"
        :class="{
          'opacity-0': shouldNotShowVideoPopover,
        }"
        :style="{
          left: `${
            Math.max(
              Math.min(moveToRatio, innerWidth() > 640 ? 11 / 12 : 10.5 / 12),
              innerWidth() > 640 ? 1 / 12 : 1.5 / 12,
            ) * 100
          }%`,
          zIndex: 29,
        }"
      >
        <div class="relative w-full">
          <div
            class="relative mb-4 w-full sm:mb-4"
            style="padding-bottom: 56.25%"
          >
            <video
              ref="videoFeedbackPlayer"
              class="video-js bottom-0 left-0 h-full w-full rounded-4 border-2 border-white"
              style="position: absolute"
              playsinline
              preload
            />
          </div>
        </div>
        <div
          v-if="showChapters"
          class="chapter-title-cont relative flex items-center justify-center transition-all"
        >
          <p
            class="three-line-ellipses title-blur h-auto max-h-full w-full rounded-8 p-8 text-center font-primary text-lg capitalize text-white"
          >
            {{ activeChapter + 1 }}. {{ getActiveChapterTitle() }}
          </p>
        </div>
        <p
          class="text-shadow w-full whitespace-nowrap text-center text-xs font-medium text-white"
        >
          <span>
            {{ new Date(videoDateVal || 0).toISOString().substring(11, 19) }}
          </span>
        </p>
      </div>
      <!-- Main timelines -->
      <div class="main-timeline absolute left-0 top-2 w-full">
        <!-- If no chapters -->
        <div
          v-if="chaptersList.length === 0"
          class="chapter w-full backdrop-blur-lg"
          :class="{ active: activeChapter }"
        >
          <!-- Seekbar -->
          <div
            class="absolute left-0 top-0 h-full bg-white shadow-2"
            :style="{
              width: videoDrag
                ? `${100 * seekGoToPoint.ratio}%`
                : `${(100 * time) / duration}%`,
            }"
          />
          <!-- Hover fade bar -->
          <div
            class="pointer-events-none absolute left-0 top-0 h-full bg-white shadow-2"
            :class="activeChapter !== null ? 'opacity-40' : 'opacity-0'"
            :style="{
              width: `${100 * moveToRatio}%`,
            }"
          />
        </div>
        <!-- If chapters -->
        <div v-else class="chaptersCont flex items-center gap-2">
          <div
            v-for="(chapter, key) in chaptersList"
            :key="`${chapter.id || String(chapter.end)}`"
            class="chapter"
            :class="{
              active:
                (isActiveChapter(key) &&
                  (persistentChapter && manualSlide && !moveToRatio
                    ? isManuallySlid(key)
                    : true)) ||
                isManuallySlid(key),
              manualSlid:
                persistentChapter && manualSlide >= key && !moveToRatio,
            }"
            :style="{
              width: `${(100 * chapter.length) / duration}%`,
              maxWidth: `${(100 * chapter.length) / duration}%`,
            }"
          >
            <!-- Hover faded bar -->
            <div
              class="pointer-events-none absolute left-0 top-0 hidden h-full bg-white shadow-2 md:block"
              :style="{
                width: `${
                  100 *
                  Math.max(
                    Math.min(
                      (moveToRatio * duration - chapter.start) / chapter.length,
                      1,
                    ),
                    0,
                  )
                }%`,
              }"
            />
            <!-- Seekbar -->
            <div
              class="absolute left-0 top-0 h-full bg-primary"
              :style="{
                width: videoDrag
                  ? `${
                      100 *
                      Math.max(
                        Math.min(
                          (seekGoToPoint.ratio * duration - chapter.start) /
                            chapter.length,
                          1,
                        ),
                        0,
                      )
                    }%`
                  : `${
                      100 *
                      Math.max(
                        Math.min((time - chapter.start) / chapter.length, 1),
                        0,
                      )
                    }%`,
              }"
            />
          </div>
        </div>
      </div>
      <!-- Hover Interations div & head -->
      <div
        ref="progressBarInteract"
        class="absolute -bottom-2 left-0 right-0 top-4 cursor-pointer sm:-bottom-3 sm:top-3"
        @mousemove="onMouseMove"
        @mouseleave="onMouseLeave"
        @click="onProgressClick"
      >
        <div
          ref="head"
          class="head align-center absolute top-0 z-10 flex h-10 w-10 -translate-x-1/2 -translate-y-1/2 transform cursor-pointer overflow-visible rounded-full border-2 border-outline-light bg-primary shadow-3 transition sm:h-14 sm:w-14 sm:-translate-y-1/4"
          :class="{
            'justify-start': seekGoToPoint.timePosition / duration <= 0.1,
            'justify-center': !(
              seekGoToPoint.timePosition / duration <= 0.1 ||
              seekGoToPoint.timePosition / duration >= 0.9
            ),
            'justify-end': seekGoToPoint.timePosition / duration >= 0.9,
          }"
          :style="{
            left: videoDrag
              ? `${100 * seekGoToPoint.ratio}%`
              : `${(100 * time) / duration}%`,
          }"
        >
          <span
            class="pointer-events-none absolute flex -translate-y-20 transform text-caption2 opacity-0 transition-opacity sm:hidden"
            :class="{
              'opacity-100': isActive && !persistentChapter && !videoDrag,
            }"
          >
            <span class="text-white">
              {{ new Date(time * 1000).toISOString().substring(11, 19) }}
            </span>

            <span class="text-kilvish-500">
              &nbsp;/&nbsp;{{
                new Date(parseFloat(duration * 1000))
                  .toISOString()
                  .substring(11, 19)
              }}
            </span>
          </span>
        </div>
      </div>
    </div>
    <div
      v-show="!isActive"
      class="progress-bar mb-12 h-4 w-full bg-black-16 opacity-0"
    ></div>
  </div>
</template>

<script setup>
import { ref, reactive, computed, watch, onMounted, nextTick } from "vue";
import { useVideoDBPlayer } from "../../context.js";
import videojs from "video.js";
import debounce from "lodash.debounce";

const props = defineProps({
  isActive: {
    type: Boolean,
    default: true,
  },
  autoHide: {
    type: Boolean,
    default: true,
  },
  streamUrl: {
    type: String,
    default: "",
  },
  chaptersList: {
    type: Array,
    default: () => [],
  },
  persistentChapter: {
    type: Boolean,
    default: false,
  },
  manualSlide: {
    type: Number,
    default: null,
  },
  activeChapterProp: {
    type: String,
    default: null,
  },
  showChapters: {
    type: Boolean,
    default: false,
  },
  previewPlayer: {
    type: String,
    default: "video",
  },
  isChapterExpanded: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits([
  "setActiveChapter",
  "hideChapterSummary",
  "setPreviewVisibility",
]);

const { playing, time, duration, seekTo, showElements } = useVideoDBPlayer();

const feedbackPlayer = ref(null);
const moveToRatio = ref(0);
const videoDrag = ref(false);
const seekGoToPoint = reactive({
  ratio: 0,
  timePosition: 0,
});
const isTimestampVisible = ref(false);
const showSummaryInfo = ref(true);
const videoPreviewData = ref(null);
const chapterSetterTimeout = ref(null);

const progressBar = ref(null);
const videoPreview = ref(null);
const progressBarInteract = ref(null);
const head = ref(null);
const videoFeedbackPlayer = ref(null);

const videoDateVal = computed(() => {
  if (!duration.value || !moveToRatio.value) return 0;
  return parseFloat(moveToRatio.value * duration.value) * 1000;
});

const shouldNotShowVideoPopover = computed(() => {
  if (props.showChapters) {
    return (
      !props.activeChapterProp ||
      moveToRatio.value === 0 ||
      (innerWidth() < 640 && props.persistentChapter)
    );
  } else {
    return moveToRatio.value === 0;
  }
});

const activeChapter = computed({
  get: () => Number(props.activeChapterProp),
  set: (val) => emit("setActiveChapter", val),
});

const summaryCardVisible = computed(() => {
  const overlapThreshold = props.isChapterExpanded ? 0.22 : 0.52;
  const initBool = props.activeChapterProp;
  if (!initBool) return false;
  if (props.persistentChapter) {
    if (moveToRatio.value > overlapThreshold) return true;
    else {
      return false;
    }
  } else {
    return true;
  }
});

const isSummaryCardOverlapping = computed(() => {
  return summaryCardVisible.value && props.persistentChapter;
});

const currentlyInActiveChapter = computed(() => {
  if (activeChapter.value === null) {
    return false;
  }
  const currentPosition = videoDrag.value
    ? seekGoToPoint.ratio * duration.value
    : time.value;

  const activeChapterData = props.chaptersList[activeChapter.value];
  return (
    currentPosition >= activeChapterData.start &&
    currentPosition < activeChapterData.start + activeChapterData.length
  );
});

watch(isSummaryCardOverlapping, (val) => {
  emit("hideChapterSummary", val);
});

watch(moveToRatio, (val) => {
  if (showSummaryInfo.value === true) {
    setTimeout(() => {
      showSummaryInfo.value = false;
    }, 2000);
  }
  videoPreviewData.value = getVideoPreviewPosition();
  emit("setPreviewVisibility", val > 0);
});

onMounted(() => {
  const getSource = () => {
    let src = props.streamUrl;
    let type = "video/mp4";

    if (src.endsWith("m3u8")) {
      type = "application/x-mpegURL";
    }

    return {
      src,
      type,
    };
  };
  const source = getSource();

  window.addEventListener("mousemove", onMouseMoveOnScreen);
  window.addEventListener("touchmove", onTouchMoveOnScreen);

  progressBarInteract.value.addEventListener("mousedown", onSeekHeadMouseDown);

  progressBarInteract.value.addEventListener(
    "touchstart",
    onSeekHeadTouchStart,
  );

  progressBarInteract.value.addEventListener("touchmove", onTouchMove);

  progressBarInteract.value.addEventListener("touchstart", () => {
    isTimestampVisible.value = true;
  });

  progressBarInteract.value.addEventListener("touchend", () => {
    isTimestampVisible.value = false;
  });
  videoPreviewData.value = getVideoPreviewPosition();

  if (videoFeedbackPlayer.value && source) {
    feedbackPlayer.value = videojs(videoFeedbackPlayer.value, {
      autoplay: false,
      controls: false,
      currentTime: 0,
      html5: {
        nativeTextTracks: false,
      },
      preload: true,
      sources: [source],
    });
  }
});

const isManuallySlid = (key) => {
  return (
    props.persistentChapter && props.manualSlide === key && !moveToRatio.value
  );
};

const isActiveChapter = (key) => {
  return props.activeChapterProp && activeChapter.value === key;
};

const updateFeedbackPlayer = debounce((time) => {
  feedbackPlayer.value.currentTime(time);
}, 300);

const innerWidth = () => {
  return window.innerWidth;
};

const getVideoPreviewPosition = () => {
  if (!videoPreview.value) return;

  const left = videoPreview.value.offsetLeft;
  const width = videoPreview.value.offsetWidth;
  const height = videoPreview.value.offsetHeight;
  return {
    left,
    width,
    height,
  };
};

const getSectionPlayWidth = (chapter) => {
  if (time.value > chapter.start + chapter.length) return 100;
  else if (time.value < chapter.start) return 0;
  else
    return (((time.value - chapter.start) * 100) / chapter.length).toFixed(2);
};

const getActiveChapterTitle = () => {
  if (!props.chaptersList[activeChapter.value]) return "";
  return props.chaptersList[activeChapter.value].title || "";
};

const onMouseMove = (e) => {
  if (!progressBar.value) {
    return;
  }
  const moveToTemp =
    (e.clientX - progressBar.value.getBoundingClientRect().x) /
    progressBar.value.clientWidth;
  if (moveToTemp && !isNaN(moveToTemp) && isFinite(moveToTemp))
    moveToRatio.value = Math.min(Math.abs(moveToTemp), 1);

  const newTime = duration.value * moveToRatio.value;
  if (feedbackPlayer.value) {
    updateFeedbackPlayer(newTime);
  }

  if (props.chaptersList.length > 0) {
    activeChapter.value = findCurrentChapter(newTime);
  } else {
    activeChapter.value = null;
  }
};

const onMouseLeave = () => {
  activeChapter.value = null;
  moveToRatio.value = 0;
};

const onProgressClick = () => {
  const goTo = duration.value * moveToRatio.value;
  seekTo(goTo);
};

const onMouseMoveOnScreen = (e) => {
  if (videoDrag.value) {
    seekVideoTime(e.pageX);
  }
};

const onTouchMoveOnScreen = (e) => {
  if (videoDrag.value) {
    seekVideoTime(Math.floor(e.touches[0].clientX));
  }
};

const seekVideoTime = (x) => {
  if (!x) return;
  if (!progressBar.value) {
    return;
  }

  let position = x - progressBar.value.getBoundingClientRect().left;
  const totalWidth = progressBar.value.clientWidth;

  if (position < 0) {
    position = 0;
  } else if (position > totalWidth) {
    position = totalWidth;
  }

  seekGoToPoint.ratio = position / totalWidth;
  seekGoToPoint.timePosition = Math.round(
    duration.value * (position / totalWidth),
  );
};

const onSeekHeadMouseDown = (e) => {
  videoDrag.value = true;
  seekVideoTime(e.pageX);
  window.addEventListener("mouseup", onSeekHeadMouseUp);
};

const onSeekHeadTouchStart = (e) => {
  videoDrag.value = true;
  seekVideoTime(e.pageX);
  window.addEventListener("touchend", onSeekHeadTouchEnd);
};

const onSeekHeadMouseUp = () => {
  if (videoDrag.value) {
    videoDrag.value = false;
    seekTo(seekGoToPoint.timePosition);
    if (props.persistentChapter) {
      activeChapter.value = findCurrentChapter(seekGoToPoint.timePosition);
    }
  }
};

const onSeekHeadTouchEnd = () => {
  if (videoDrag.value) {
    videoDrag.value = false;
    seekTo(Math.floor(seekGoToPoint.timePosition));
    moveToRatio.value = 0;
  }
  if (!props.persistentChapter) {
    activeChapter.value = null;
  }
};

const findCurrentChapter = (time) => {
  const referenceTime = Math.min(Math.max(time, 0), duration.value);

  for (let i = 0; i < props.chaptersList.length; i++) {
    const chapter = props.chaptersList[i];
    if (
      chapter.start <= referenceTime &&
      chapter.start + chapter.length >= referenceTime
    ) {
      return i;
    }
  }
};

const onTouchMove = (e) => {
  e.preventDefault();
  const clientX = e.touches[0].clientX;
  if (!progressBar.value) return;

  const moveToTemp =
    (clientX - progressBar.value.getBoundingClientRect().left) /
    progressBar.value.clientWidth;

  if (moveToTemp && !isNaN(moveToTemp) && isFinite(moveToTemp))
    moveToRatio.value = Math.min(Math.abs(moveToTemp), 1);
  const newTime = Math.round(duration.value * moveToRatio.value);

  if (feedbackPlayer.value) {
    updateFeedbackPlayer(newTime);
  }

  if (props.chaptersList.length > 0) {
    activeChapter.value = findCurrentChapter(newTime);
  } else {
    activeChapter.value = true;
  }
};
</script>

<style scoped>
.chapter {
  position: relative;
  background-color: rgba(255, 255, 255, 0.2);
  height: 6px;
  transition: all 0.2s ease-in-out;
}

.chaptersCont {
  min-height: 10px;
}

.progress-bar .main-timeline .chapter.manualSlid {
  background-color: rgb(251, 220, 150, 0.5);
}

.progress-bar .main-timeline .chapter.manualSlid.active {
  background-color: #f8c450;
}

.progress-bar .main-timeline .chapter.active {
  /* backdrop-filter: blur(16px); */
  /* background: rgba(0, 0, 0, 0.24); */
  height: 10px;
}

.chapter:hover {
  height: 10px;
}

/* .progress-bar:hover .head {
  opacity: 1;
} */

.head:hover {
  border-width: 2px;
  width: 14px;
  height: 14px;
}

/* 
@media (any-hover: none) {
  .head {
    opacity: 1 !important;
  }
} */

@media (max-width: 641px) {
  .chapter {
    height: 4px;
  }

  .progress-bar .main-timeline .chapter.active {
    height: 6px;
  }

  .chaptersCont {
    min-height: 6px;
  }
}

.summary-card {
  /* height: 20vw;
  max-height: 220px;
  min-width: 280px; */

  height: auto;
  max-height: 220px;
  width: auto;
  max-width: 280px;
}

.popover-width {
  width: 130px;
}

.three-line-ellipses {
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
}

.title-blur {
  background: rgba(20, 20, 20, 0.39);
  backdrop-filter: blur(24px);
}

.title-blur {
  text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.4);
}

.chapter-title-cont {
  height: 62px;
}

.chapter-title-cont > p {
  font-size: 11px;
  line-height: 16px;
}

@media (max-width: 640px) {
  .chapter-title-cont {
    width: 130%;
    transform: translateX(-12.5%);
  }
}
</style>
