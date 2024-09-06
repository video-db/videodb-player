<template>
  <WithPopper
    :popper-text="isFullScreen ? 'Exit Full Screen' : 'Full Screen'"
    :class="[
      'vdb-p-absolute vdb-p--top-60 vdb-p-right-16 vdb-p-transition-opacity sm:vdb-p-static',
      autoHide && !showElements ? 'vdb-p-opacity-0' : 'vdb-p-opacity-1',
    ]"
  >
    <template #button>
      <TransparentButton
        class="vdb-p-flex vdb-p-h-40 vdb-p-w-48 vdb-p-rounded-8 vdb-p-font-semibold vdb-p-text-white sm:vdb-p-ml-8"
        :default-state-css="'vdb-p-bg-black-16 vdb-p-border vdb-p-border-white-16 vdb-p-backdrop-blur hover:vdb-p-bg-random-313131 hover:vdb-p-border-random-8e6200'"
        :disabled-state-css="'vdb-p-bg-black-45 vdb-p-opacity-20 vdb-p-backdrop-blur vdb-p-cursor-not-allowed vdb-p-pointer-events-none'"
        :button-state="isActive ? 'default' : 'hidden'"
        @click-action="isFullScreen ? toggleFullScreen(false) : toggleFullScreen(true)"
      >
        <!-- Full Screen button icons -->
        <div>
          <FullScreenExit v-if="isFullScreen" class="vdb-p-h-20 vdb-p-w-20" />
          <FullScreen v-else class="vdb-p-flex vdb-p-h-20 vdb-p-w-20 group-hover:vdb-p-hidden" />
        </div>
      </TransparentButton>
    </template>
  </WithPopper>
</template>

<script setup>
import { ref } from "vue";
import TransparentButton from "../atoms/TransparentButton.vue";
import WithPopper from "../atoms/WithPopper.vue";
import FullScreen from "../icons/full-screen.vue";
import FullScreenExit from "../icons/full-screen-exit.vue";
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

const isPopperActive = ref(true);
const { showElements, isFullScreen, toggleFullScreen } =
  useVideoDBPlayer();
</script>

<style scoped></style>
