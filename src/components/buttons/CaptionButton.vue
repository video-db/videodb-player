<template>
  <!-- Caption Button -->
  <WithPopper
    popper-text="Toggle subtitles"
    :is-popper-active="isPopperActive"
    :class="[
      'hidden transition sm:block',
      autoHide && !showElements ? 'opacity-0' : 'opacity-1',
    ]"
  >
    <template #button>
      <TransparentButton
        class="pale group ml-8 h-40 w-48"
        default-state-css="bg-black-16 border border-white-16 backdrop-blur hover:bg-random-313131 hover:border-random-8e6200"
        active-state-css="bg-black-16 border border-white-56 backdrop-blur "
        disabled-state-css="bg-black-45 opacity-20 backdrop-blur cursor-not-allowed pointer-events-none"
        :button-state="captionButtonState"
        @clickAction="
          () => {
            toggleSubtitles(!showSubtitles);
          }
        "
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
import { ref, computed, watch } from "vue";
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

const isPopperActive = ref(true);
const { showElements, showSubtitles, toggleSubtitles, subtitlesConfig } = useVideoDBPlayer();

const captionButtonState = computed(() => {
  if (!subtitlesConfig.src) return "disabled";
  return showSubtitles.value ? "active" : "default";
});
</script>

<style scoped>
/* Add any scoped styles here */
</style>
