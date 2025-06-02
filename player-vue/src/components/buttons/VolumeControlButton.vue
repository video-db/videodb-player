<template>
  <TransparentButton
    :class="[
      'vdb-p-ml-8 vdb-p-hidden vdb-p-h-40 vdb-p-items-center vdb-p-rounded-8 vdb-p-px-8 vdb-p-font-semibold vdb-p-text-white vdb-p-transition-opacity sm:vdb-p-flex',
      autoHide && !showElements ? 'vdb-p-opacity-0' : 'vdb-p-opacity-1',
    ]"
    :default-state-css="'vdb-p-bg-black-16 vdb-p-border vdb-p-border-white-16 vdb-p-backdrop-blur hover:vdb-p-bg-random-313131 hover:vdb-p-border-random-8e6200'"
    :disabled-state-css="'vdb-p-bg-black-45 vdb-p-opacity-20 vdb-p-backdrop-blur vdb-p-cursor-not-allowed vdb-p-pointer-events-none'"
    :button-state="isActive ? 'default' : 'hidden'"
  >
    <div class="vdb-p-mr-8 vdb-p-flex">
      <WithPopper
        :popper-text="volume === 0 ? 'Unmute' : 'Mute'"
        :is-popper-active="isPopperActive"
      >
        <template #button>
          <button
            id="videoplay"
            slot="reference"
            class="vdb-p-flex vdb-p-h-20 vdb-p-w-20 focus:vdb-p-outline-none"
            @click="updateVolume(0, volume === 0 ? 1 : 0)"
          >
            <VolumeMute v-if="volume == 0" class="vdb-p-h-20 vdb-p-w-20" />
            <Volume v-else class="vdb-p-h-20 vdb-p-w-20" />
          </button>
        </template>
      </WithPopper>
    </div>
    <div
      class="volumeBar vdb-p-block vdb-p-h-4 vdb-p-w-32 vdb-p-cursor-pointer vdb-p-overflow-hidden vdb-p-rounded-full"
      :class="{
        'vdb-p-opacity-50': !isActive,
      }"
      @mousedown="onMouseDown"
    >
      <div
        class="vdb-p-absolute vdb-p-h-4 vdb-p-w-32 vdb-p-rounded-full vdb-p-bg-white-40"
      />
      <div
        ref="volumeRef"
        class="vdb-p-absolute vdb-p-h-4 vdb-p-w-32 vdb-p-rounded-full vdb-p-bg-white"
      ></div>
    </div>
  </TransparentButton>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import Popper from "vue3-popper";
import VolumeMute from "../icons/volume-mute.vue";
import Volume from "../icons/volume.vue";
import WithPopper from "../atoms/WithPopper.vue";
import TransparentButton from "../atoms/TransparentButton.vue";

import { useVideoDBPlayer } from "../../context.js";

const props = defineProps({
  isActive: {
    type: Boolean,
    default: true,
  },
  autoHide: {
    type: Boolean,
    default: true,
  },
});

const { volume, setVolume, showElements } = useVideoDBPlayer();

const volumeDrag = ref(false);
const isPopperActive = ref(true);
const volumeRef = ref(null);

const onMouseMove = (e) => {
  if (volumeDrag.value) {
    updateVolume(e.pageX);
  }
};

const onMouseDown = (e) => {
  volumeDrag.value = true;
  updateVolume(e.pageX);
  window.addEventListener("mouseup", onMouseUp);
};

const onMouseUp = (e) => {
  if (volumeDrag.value) {
    volumeDrag.value = false;
    updateVolume(e.pageX);
  }
};

const updateVolume = (x, vol) => {
  const volume = volumeRef.value;
  let percentAsDecimal = 0;
  if (vol !== undefined) {
    percentAsDecimal = vol;
  } else {
    const position = x - volume.getBoundingClientRect().left;
    percentAsDecimal = position / volume.offsetWidth;
  }
  percentAsDecimal = Math.max(0, Math.min(1, percentAsDecimal));
  volume.style.clip = `rect(0px, ${percentAsDecimal * 32}px, 10px, 0px)`;
  console.log("this is setVolume", setVolume);
  setVolume(percentAsDecimal);
};

onMounted(() => {
  window.addEventListener("mousemove", onMouseMove);
});

onUnmounted(() => {
  window.removeEventListener("mousemove", onMouseMove);
  window.removeEventListener("mouseup", onMouseUp);
});
</script>
