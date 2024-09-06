<template>
  <TransparentButton
    :class="[
      'vdb-p-h-72 vdb-p-w-72 vdb-p-rounded-full',
      autoHide && !showElements ? 'vdb-p-opacity-0' : 'vdb-p-opacity-1',
    ]"
    :style="buttonStyle"
    :default-state-css="'vdb-p-bg-black-16 vdb-p-border vdb-p-border-white-16 vdb-p-backdrop-blur hover:vdb-p-bg-random-313131 hover:vdb-p-border-random-8e6200'"
    :disabled-state-css="'vdb-p-bg-black-45 vdb-p-opacity-20 vdb-p-backdrop-blur vdb-p-cursor-not-allowed vdb-p-pointer-events-none'"
    :button-state="isActive ? 'default' : 'hidden'"
    @click="togglePlay"
  >
    <PauseButton v-if="playing" class="vdb-p-w-[38.89%] vdb-p-h-[38.89%]" />
    <PlayButton v-else class="vdb-p-w-[38.89%] vdb-p-h-[38.89%]" />
  </TransparentButton>
</template>

<script setup>
import { computed } from "vue";
import PlayButton from "../icons/play.vue";
import PauseButton from "../icons/pause.vue";
import { useVideoDBPlayer } from "../../context.js";
import TransparentButton from "../atoms/TransparentButton.vue";

const props = defineProps({
  isActive: {
    type: Boolean,
    default: true,
  },
  isPlaying: {
    type: Boolean,
    default: false,
  },
  buttonState: {
    type: String,
    default: "default",
  },
  showPauseButton: {
    type: Boolean,
    default: false,
  },
  shiftUp: {
    type: Boolean,
    default: false,
  },
  autoHide: {
    type: Boolean,
    default: true,
  },
});

const { playing, togglePlay, showElements } = useVideoDBPlayer();

const buttonStyle = computed(() => {
  return `transform: translate(-50%, ${props.shiftUp ? '-350%' : '-50%'})`;
});
</script>
