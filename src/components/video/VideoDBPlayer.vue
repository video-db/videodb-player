<template>
  <div
    class="vdb-p-relative vdb-p-w-full"
    :style="{ paddingBottom: aspectRatioPadding }"
  >
    <div
      class="vdb-p-absolute vdb-p-inset-0 vdb-p-h-full vdb-p-w-full vdb-p-overflow-hidden vdb-p-bg-kilvish-200"
    >
      <div
        ref="videoWrapper"
        class="video-container vdb-p-outline-16 vdb-p-relative vdb-p-h-full vdb-p-select-none vdb-p-outline-kilvish-200"
        :class="{
          'show-elements': showElements,
          'hide-subtitles': !showSubtitles,
        }"
      >
        <!-- Video -->
        <video
          ref="videoElement"
          class="video-js vdb-p-pointer-events-none vdb-p-absolute vdb-p-bottom-0 vdb-p-left-0 vdb-p-right-0 vdb-p-top-0 vdb-p-h-full vdb-p-w-auto"
          playsinline
        >
          <track
            v-if="subtitlesConfig?.src"
            :kind="subtitlesConfig?.kind || 'captions'"
            :src="subtitlesConfig?.src"
            :srclang="subtitlesConfig?.lang || 'en'"
            :label="subtitlesConfig?.label || 'English'"
            default
          />
        </video>

        <!-- Backlayer -->
        <div
          class="vdb-p-absolute vdb-p-left-0 vdb-p-right-0 vdb-p-top-0 vdb-p-h-full vdb-p-w-full"
        >
          <div
            :class="[
              'vdb-p-duration-400 vdb-p-absolute vdb-p-bottom-0 vdb-p-left-0 vdb-p-right-0 vdb-p-top-0 vdb-p-block vdb-p-cursor-pointer vdb-p-bg-gradient-to-b vdb-p-from-black vdb-p-to-transparent vdb-p-transition-opacity vdb-p-ease-in-out',
              !playing || showElements ? 'vdb-p-opacity-40' : 'vdb-p-opacity-0',
            ]"
            @click="togglePlay"
          />
          <slot v-if="!defaultOverlay" name="overlay"></slot>
          <BigCenterButton
            v-else
            class="vdb-p-absolute vdb-p-left-1/2 vdb-p-top-1/2"
          />
        </div>
        <div
          :class="[
            'vdb-p-absolute vdb-p-bottom-0 vdb-p-w-full',
            showElements ? 'lg-black-40' : 'lg-transparent',
          ]"
        >
          <slot v-if="!defaultControls" name="controls"> </slot>
          <div v-else class="vdb-p-p-20 vdb-p-pt-0">
            <div class="vdb-p-mb-12 sm:vdb-p-mx-8">
              <ProgressBar :stream-url="streamUrl" />
            </div>
            <div class="vdb-p-flex vdb-p-w-full vdb-p-justify-between">
              <div class="vdb-p-z-10 vdb-p-ml-0 vdb-p-flex vdb-p-items-center">
                <PlayPauseButton />
                <VolumeControlButton />
                <TimeCode />
              </div>

              <div
                class="vdb-p-flex vdb-p-w-auto vdb-p-flex-row vdb-p-items-center"
              >
                <CaptionButton />
                <SpeedControlButton :speed-options="[1, 1.2, 1.5, 1.8, 2]" />
                <FullScreenButton />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import {
  ref,
  onMounted,
  onBeforeUnmount,
  defineExpose,
  provide,
  computed,
} from "vue";
import { usePlayer } from "../hooks/useVideoJSPlayer.js";
import BigCenterButton from "../buttons/BigCenterButton.vue";
import ProgressBar from "./ProgressBar.vue";
import PlayPauseButton from "../buttons/PlayPauseButton.vue";
import VolumeControlButton from "../buttons/VolumeControlButton.vue";
import TimeCode from "../atoms/TimeCode.vue";
import SpeedControlButton from "../buttons/SpeedControlButton.vue";
import CaptionButton from "../buttons/CaptionButton.vue";
import FullScreenButton from "../buttons/FullScreenButton.vue";

const props = defineProps({
  streamUrl: {
    type: String,
    required: true,
  },
  thumbnailUrl: {
    type: String,
    default: "",
  },
  subtitlesConfig: {
    type: Object,
    default: () => {
      return {
        src: "",
        kind: "captions",
        lang: "en",
        label: "English",
      };
    },
  },
  startAt: {
    type: Number,
    default: 0,
  },
  autoPlay: {
    type: Boolean,
    default: false,
  },
  autoHideDuration: {
    type: Number,
    default: 5000,
  },
  defaultControls: {
    type: Boolean,
    default: true,
  },
  defaultOverlay: {
    type: Boolean,
    default: true,
  },
  defaultPlayBackRate: {
    type: Number,
    default: 1,
  },
  aspectRatio: {
    type: String,
    default: "16:9",
  },
  debug: {
    type: Boolean,
    default: false,
  },
});

const aspectRatioPadding = computed(() => {
  const [width, height] = props.aspectRatio.split(":").map(Number);
  return `${(height / width) * 100}%`;
});

const videoWrapper = ref(null);
const videoElement = ref(null);

const emit = defineEmits([
  "play",
  "pause",
  "ended",
  "loadeddata",
  "waiting",
  "playing",
  "timeupdate",
  "canplay",
  "canplaythrough",
  "videoerrror",
  "toggleSubtitles",
  "fullScreenChange",
]);

const {
  events,
  playing,
  volume,
  videoMuted,
  duration,
  time,
  percentagePlayed,
  playBackRate,
  play,
  pause,
  togglePlay,
  toggleMute,
  seekTo,
  seekToPercentage,
  setVolume,
  setPlayBackRate,
  convertTimeToDuration,
  togglePictureInPicture,
  initializePlayer,
} = usePlayer(emit, props);

const showElements = ref(true);
const showElementsMouseMoveInterval = ref(null);

const isFullScreen = ref(false);
const showSubtitles = ref(false);

onMounted(() => {
  window.addEventListener("keypress", (e) => {
    if (isFullScreen.value && e.code === "Escape") {
      toggleFullScreen(false);
    }
  });

  initializePlayer(videoElement);
  addVideoInteractions();
  addKeyboardKeyFunctions();
});

onBeforeUnmount(() => {
  removeKeyboardKeyFunctions();
});

const addKeyboardKeyFunctions = () => {
  document.addEventListener("keydown", keyDown);
};

const removeKeyboardKeyFunctions = () => {
  document.removeEventListener("keydown", keyDown);
};

const toggleSubtitles = (value) => {
  showSubtitles.value = value;
  emit("toggleSubtitles", value);
};

const toggleFullScreen = (value) => {
  isFullScreen.value = value;
  emit("fullScreenChange", value);
};

const keyDown = (e) => {
  const currentElement = document.activeElement.tagName;
  if (currentElement === "TEXTAREA" || currentElement === "INPUT") {
    return;
  }
  switch (e.code) {
    case "Space":
      e.preventDefault();
      togglePlay();
      return;
    // case 'ArrowLeft':
    //   e.preventDefault()
    //   rewind()
    //   return
    // case 'ArrowRight':
    //   e.preventDefault()
    //   forward()
    //   return
  }
};

// Mouse and touch events
const addVideoInteractions = () => {
  // Touch events
  if (window.matchMedia("(any-hover: none)").matches) {
    videoWrapper.value.addEventListener("touchend", onTouchEnd);
  }
  // Hover events
  else {
    videoWrapper.value.addEventListener("mouseenter", onMouseEnter);
    videoWrapper.value.addEventListener("mouseleave", onMouseLeave);
  }
};

// Hover events
const onMouseEnter = () => {
  showElements.value = true;
  window.addEventListener("mousemove", onMouseMove);
};

const onMouseLeave = () => {
  clearTimeout(showElementsMouseMoveInterval.value);
  if (playing.value) {
    showElements.value = false;
  }
  window.removeEventListener("mousemove", onMouseMove);
};
const onMouseMove = () => {
  clearTimeout(showElementsMouseMoveInterval.value);
  showElements.value = true;
  showElementsMouseMoveInterval.value = setTimeout(() => {
    if (!playing.value) return;
    showElements.value = false;
  }, props.autoHideDuration);
};

// Touch events
const onTouchEnd = () => {
  clearTimeout(showElementsMouseMoveInterval.value);
  showElements.value = true;
  showElementsMouseMoveInterval.value = setTimeout(() => {
    if (!playing.value) return;
    showElements.value = false;
  }, props.autoHideDuration);
};

defineExpose({
  showElements,
  playing,
  volume,
  videoMuted,
  duration,
  time,
  percentagePlayed,
  playBackRate,
  showSubtitles,
  subtitlesConfig: props.subtitlesConfig,
  isFullScreen,
  play,
  pause,
  togglePlay,
  toggleMute,
  seekTo,
  seekToPercentage,
  setPlayBackRate,
  setVolume,
  convertTimeToDuration,
  toggleFullScreen,
  toggleSubtitles,
  togglePictureInPicture,
});

provide("videodb-player", {
  showElements,
  playing,
  volume,
  videoMuted,
  duration,
  time,
  percentagePlayed,
  playBackRate,
  showSubtitles,
  subtitlesConfig: props.subtitlesConfig,
  isFullScreen,
  play,
  pause,
  togglePlay,
  toggleMute,
  seekTo,
  seekToPercentage,
  setPlayBackRate,
  setVolume,
  convertTimeToDuration,
  toggleFullScreen,
  togglePictureInPicture,
  toggleSubtitles,
});
</script>

<style scoped>
.lg-transparent {
  background: linear-gradient(0deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0) 100%);
}

.lg-black-40 {
  background: linear-gradient(
    0deg,
    rgba(0, 0, 0, 0.4) 0%,
    rgba(0, 0, 0, 0) 100%
  );
}

/* Subtitles */
/deep/.vjs-text-track-display {
  position: absolute;
  bottom: 1rem;
}

.hide-subtitles /deep/.vjs-text-track-display {
  display: none !important;
}

/deep/.vjs-text-track-display .vjs-text-track-cue {
  font-size: 18px !important;
  height: auto !important;
  inset: unset !important;
  position: absolute !important;
  bottom: 0 !important;
}

/deep/.vjs-text-track-display .vjs-text-track-cue div {
  font-family: inherit !important;
  background: rgba(0, 0, 0, 0.72) !important;
  font-weight: 400 !important;
  color: #fff !important;
}

/* Shifting subtitles */
.video-container.show-elements /deep/.vjs-text-track-display,
.video-container.stopped /deep/.vjs-text-track-display {
  bottom: 5rem !important;
}

/* No selection */
.bg-orientation-msg {
  background: #272727;
}
</style>
