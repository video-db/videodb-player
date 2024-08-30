<template>
  <WithPopper
    :popper-text="playing ? 'Pause' : 'Play'"
    :is-popper-active="isPopperActive"
    :class="[
      'transition-opacity',
      autoHide && !showElements ? 'opacity-0' : 'opacity-1',
    ]"
  >
    <template #button>
      <TransparentButton
        class="w-56 h-40"
        :default-state-css="'bg-black-16 border border-white-16 backdrop-blur hover:bg-random-313131 hover:border-random-8e6200'"
        :disabled-state-css="'bg-black-45 opacity-20 backdrop-blur cursor-not-allowed pointer-events-none'"
        :button-state="isActive ? 'default' : 'hidden'"
        @click="togglePlay"
      >
        <PauseButton v-if="playing" class="h-20 w-20" />
        <PlayButton v-else class="h-20 w-20" />
      </TransparentButton>
    </template>
  </WithPopper>
</template>

<script setup>
import { ref } from "vue";
import Popper from "vue3-popper";
import PlayButton from "../icons/play.vue";
import PauseButton from "../icons/pause.vue";
import TransparentButton from "../atoms/TransparentButton.vue";
import WithPopper from "../atoms/WithPopper.vue";
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

const { playing, togglePlay, showElements } = useVideoDBPlayer();
const isPopperActive = ref(true);
</script>
