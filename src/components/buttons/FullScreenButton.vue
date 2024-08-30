<template>
  <WithPopper
    :popper-text="isFullScreen ? 'Exit Full Screen' : 'Full Screen'"
    :class="[
      'absolute -top-60 right-16 transition-opacity sm:static',
      autoHide && !showElements ? 'opacity-0' : 'opacity-1',
    ]"
  >
    <template #button>
      <TransparentButton
        class="flex h-40 w-48 rounded-8 font-semibold text-white sm:ml-8"
        :default-state-css="'bg-black-16 border border-white-16 backdrop-blur hover:bg-random-313131 hover:border-random-8e6200'"
        :disabled-state-css="'bg-black-45 opacity-20 backdrop-blur cursor-not-allowed pointer-events-none'"
        :button-state="isActive ? 'default' : 'hidden'"
        @click-action="isFullScreen ? toggleFullScreen(false) : toggleFullScreen(true)"
      >
        <!-- Full Screen button icons -->
        <div>
          <FullScreenExit v-if="isFullScreen" class="h-20 w-20" />
          <FullScreen v-else class="flex h-20 w-20 group-hover:hidden" />
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
