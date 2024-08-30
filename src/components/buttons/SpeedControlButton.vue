<template>
  <WithPopper
    :popper-text="'Change Speed'"
    :is-popper-active="isPopperActive"
    :class="[
      'transition',
      autoHide && !showElements ? 'opacity-0' : 'opacity-1',
    ]"
  >
    <template #button>
      <TransparentButton
        class="w-48 h-40 ml-8 pale group"
        :default-state-css="'bg-black-16 border border-white-16 backdrop-blur hover:bg-random-313131 hover:border-random-8e6200'"
        :disabled-state-css="'bg-black-45 opacity-20 backdrop-blur cursor-not-allowed pointer-events-none'"
        :button-state="isActive ? 'default' : 'hidden'"
        @click-action="onClickPlaybackRate"
      >
        <!-- Speed Indicator-->
        <div class="text-white">{{ playBackRate }}x</div>
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
