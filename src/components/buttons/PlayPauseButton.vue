<template>
  <WithPopper
    :popper-text="playing ? 'Pause' : 'Play'"
    :is-popper-active="isPopperActive"
    :class="[
      'vdb-p-transition-opacity',
      autoHide && !showElements ? 'vdb-p-opacity-0' : 'vdb-p-opacity-1',
    ]"
  >
    <template #button>
      <TransparentButton
        class="vdb-p-h-40 vdb-p-w-56"
        :default-state-css="'vdb-p-bg-black-16 vdb-p-border vdb-p-border-white-16 vdb-p-backdrop-blur hover:vdb-p-bg-random-313131 hover:vdb-p-border-random-8e6200'"
        :disabled-state-css="'vdb-p-bg-black-45 vdb-p-opacity-20 vdb-p-backdrop-blur vdb-p-cursor-not-allowed vdb-p-pointer-events-none'"
        :button-state="isActive ? 'default' : 'hidden'"
        @click="togglePlay"
      >
        <PauseButton v-if="playing" class="vdb-p-h-20 vdb-p-w-20" />
        <PlayButton v-else class="vdb-p-h-20 vdb-p-w-20" />
      </TransparentButton>
    </template>
  </WithPopper>
</template>

<script setup>
import { ref } from "vue";
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
