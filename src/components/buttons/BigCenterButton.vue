<template>
  <TransparentButton
    :class="[
      'h-72 w-72 rounded-full',
      autoHide && !showElements ? 'opacity-0' : 'opacity-1',
    ]"
    :style="`transform: translate(-50%, ${props.shiftUp ? '-350%' : '-50%'})`"
    :default-state-css="'bg-black-16 border border-white-16 backdrop-blur hover:bg-random-313131 hover:border-random-8e6200'"
    :disabled-state-css="'bg-black-45 opacity-20 backdrop-blur cursor-not-allowed pointer-events-none'"
    :button-state="isActive ? 'default' : 'hidden'"
    @click="togglePlay"
  >
    <PauseButton v-if="playing" class="h-28 w-28" />
    <PlayButton v-else class="h-28 w-28" />
  </TransparentButton>
</template>

<script setup>
import { defineProps } from "vue";
import PlayButton from "../icons/play.vue";
import PauseButton from "../icons/pause.vue";
import { useVideoDBPlayer } from "../../context.js";
import TransparentButton from "../atoms/TransparentButton.vue";

const { playing, togglePlay, showElements } = useVideoDBPlayer();

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
</script>
