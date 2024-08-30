<template>
  <!-- Caption Button -->
  <WithPopper
    popper-text="Toggle subtitles"
    :is-popper-active="isPopperActive"
    :class="[
      'hidden sm:block transition',
      autoHide && !showElements ? 'opacity-0' : 'opacity-1',
    ]"
  >
    <template #button>
      <TransparentButton
        class="w-48 h-40 ml-8 pale group"
        default-state-css="bg-black-16 border border-white-16 backdrop-blur hover:bg-random-313131 hover:border-random-8e6200"
        active-state-css="bg-black-16 border border-white-56 backdrop-blur "
        disabled-state-css="bg-black-45 opacity-20 backdrop-blur cursor-not-allowed pointer-events-none"
        :button-state="isActive ? captionButtonState : 'hidden'"
        @clickAction="toggleSubtiles"
      >
        <!-- CC-->
        <div
          class="text-white"
          :class="{ underline: captionButtonState === 'active' }"
        >
          CC
        </div>
      </TransparentButton>
    </template>
  </WithPopper>
</template>

<script setup>
import { ref } from "vue";
import TransparentButton from "../atoms/TransparentButton.vue";
import WithPopper from "../atoms/WithPopper.vue";
import { useVideoDBPlayer } from "../../context.js";

const props = defineProps({
  isActive: {
    type: Boolean,
    default: true,
  },
  captionButtonState: {
    type: String,
    default: "default",
  },
  toggleSubtiles: {
    type: Function,
    default: () => {},
  },
  autoHide: {
    type: Boolean,
    default: true,
  },
});

const isPopperActive = ref(true);
const { showElements } = useVideoDBPlayer();
</script>

<style scoped>
/* Add any scoped styles here */
</style>
