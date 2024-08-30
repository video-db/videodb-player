<template>
  <TransparentButton
    :class="[
      ' hidden h-40 px-8 ml-8 font-semibold text-white rounded-8 md:flex items-center transition-opacity',
      autoHide && !showElements ? 'opacity-0' : 'opacity-1',
    ]"
    :default-state-css="'bg-black-16 border border-white-16 backdrop-blur hover:bg-random-313131 hover:border-random-8e6200'"
    :disabled-state-css="'bg-black-45 opacity-20 backdrop-blur cursor-not-allowed pointer-events-none'"
    :button-state="isActive ? 'default' : 'hidden'"
  >
    <div class="mr-8 flex">
      <WithPopper
        :popper-text="volume === 0 ? 'Unmute' : 'Mute'"
        :is-popper-active="isPopperActive"
      >
        <template #button>
          <button
            id="videoplay"
            slot="reference"
            class="flex w-20 h-20"
            @click="updateVolume(0, volume === 0 ? 1 : 0)"
          >
            <VolumeMute v-if="volume == 0" class="h-20 w-20" />
            <Volume v-else class="h-20 w-20" />
          </button>
        </template>
      </WithPopper>
    </div>
    <div
      class="block w-32 h-4 overflow-hidden rounded-full cursor-pointer volumeBar"
      :class="{
        'opacity-50': !isActive,
      }"
      @mousedown="onMouseDown"
    >
      <div class="absolute w-32 h-4 rounded-full bg-white-40" />
      <div
        ref="volumeRef"
        class="absolute w-32 h-4 bg-white rounded-full"
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
