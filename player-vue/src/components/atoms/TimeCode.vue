<template>
  <p
    :class="[
      'vdb-p-ml-12 vdb-p-inline vdb-p-hidden vdb-p-font-medium vdb-p-text-white vdb-p-transition sm:vdb-p-block',
      autoHide && !showElements ? 'vdb-p-opacity-0' : 'vdb-p-opacity-1',
    ]"
  >
    <span>
      {{ currentTime }}
    </span>
    <span>/</span>
    <span>{{ totalTime }}</span>
  </p>
</template>

<script setup>
import { computed } from "vue";
import { useVideoDBPlayer } from "../../context.js";

const props = defineProps({
  autoHide: {
    type: Boolean,
    default: true,
  },
});

const { playing, time, duration, showElements } = useVideoDBPlayer();

const showHours = (duration) => Math.floor(duration / 3600) > 0;
const formaatPadded = (number) => String(number).padStart(2, "0");
const formatDuration = (duration) => {
  const hrs = formaatPadded(Math.floor(duration / 3600)) + ":";
  const mins = formaatPadded(Math.floor((duration % 3600) / 60)) + ":";
  const secs = formaatPadded(Math.floor(duration % 60));
  return `${showHours(duration) ? hrs : ""}${mins}${secs}`;
};

const currentTime = computed(() => formatDuration(time.value));
const totalTime = computed(() => formatDuration(duration.value));
</script>
