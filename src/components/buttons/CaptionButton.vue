<template>
  <!-- Caption Button -->
  <WithPopper
    popper-text="Toggle subtitles"
    :is-popper-active="isPopperActive"
    :class="[
      'vdb-p-hidden vdb-p-transition sm:vdb-p-block',
      autoHide && !showElements ? 'vdb-p-opacity-0' : 'vdb-p-opacity-1',
    ]"
  >
    <template #button>
      <TransparentButton
        class="vdb-p-pale vdb-p-group vdb-p-ml-8 vdb-p-h-40 vdb-p-w-48"
        default-state-css="vdb-p-bg-black-16 vdb-p-border vdb-p-border-white-16 vdb-p-backdrop-blur hover:vdb-p-bg-random-313131 hover:vdb-p-border-random-8e6200"
        active-state-css="vdb-p-bg-black-16 vdb-p-border vdb-p-border-white-56 vdb-p-backdrop-blur"
        disabled-state-css="vdb-p-bg-black-45 vdb-p-opacity-20 vdb-p-backdrop-blur vdb-p-cursor-not-allowed vdb-p-pointer-events-none"
        :button-state="captionButtonState"
        @clickAction="
          () => {
            toggleSubtitles(!showSubtitles);
          }
        "
      >
        <!-- CC-->
        <div
          class="vdb-p-text-white"
          :class="{ 'vdb-p-underline': captionButtonState === 'active' }"
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
const { showElements, showSubtitles, toggleSubtitles, subtitlesConfig } =
  useVideoDBPlayer();

const captionButtonState = computed(() => {
  if (!subtitlesConfig.src) return "disabled";
  return showSubtitles.value ? "active" : "default";
});
</script>

<style scoped>
/* Add any scoped styles here */
</style>
