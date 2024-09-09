<template>
  <WithPopper
    :popper-text="'Change Speed'"
    :is-popper-active="isPopperActive"
    :class="[
      'vdb-p-transition',
      autoHide && !showElements ? 'vdb-p-opacity-0' : 'vdb-p-opacity-1',
    ]"
  >
    <template #button>
      <TransparentButton
        class="vdb-p-pale vdb-p-group vdb-p-ml-8 vdb-p-h-40 vdb-p-w-48"
        :default-state-css="'vdb-p-bg-black-16 vdb-p-border vdb-p-border-white-16 vdb-p-backdrop-blur hover:vdb-p-bg-random-313131 hover:vdb-p-border-random-8e6200'"
        :disabled-state-css="'vdb-p-bg-black-45 vdb-p-opacity-20 vdb-p-backdrop-blur vdb-p-cursor-not-allowed vdb-p-pointer-events-none'"
        :button-state="isActive ? 'default' : 'hidden'"
        @click-action="onClickPlaybackRate"
      >
        <!-- Speed Indicator-->
        <div class="vdb-p-text-white">{{ playBackRate }}x</div>
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
  speedOptions: {
    type: Array,
    default: () => [1, 1.2, 1.5, 1.8, 2],
  },
  autoHide: {
    type: Boolean,
    default: true,
  },
});

const isPopperActive = ref(true);

const { playBackRate, setPlayBackRate, showElements } = useVideoDBPlayer();

const onClickPlaybackRate = () => {
  const newValue =
    props.speedOptions[
      (props.speedOptions.indexOf(playBackRate.value) + 1) %
        props.speedOptions.length
    ];
  setPlayBackRate(newValue);
};
</script>
