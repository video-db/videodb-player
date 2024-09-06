<template>
  <button
    :class="`
      vdb-p-flex
      vdb-p-justify-center
      vdb-p-items-center
      vdb-p-font-semibold
      vdb-p-text-white
      vdb-p-rounded-8
      focus:vdb-p-outline-none
      ${customCss}
    `"
    @click="$emit('clickAction')"
  >
    <slot />
  </button>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
  buttonState: {
    type: String,
    default: 'default',
  },
  defaultStateCss: {
    type: String,
    default:
      'vdb-p-bg-black-45 vdb-p-border vdb-p-border-yellow vdb-p-backdrop-blur hover:vdb-p-bg-random-313131 hover:vdb-p-border-random-8e6200',
  },
  activeStateCss: {
    type: String,
    default: 'chapter-button-active-lg vdb-p-border vdb-p-border-yellow pale-yellow',
  },
  disabledStateCss: {
    type: String,
    default:
      'vdb-p-bg-black-45 vdb-p-opacity-20 vdb-p-border vdb-p-border-yellow vdb-p-backdrop-blur vdb-p-cursor-not-allowed vdb-p-pointer-events-none',
  },
});

const customCss = computed(() => {
  switch (props.buttonState) {
    case 'active':
      return props.activeStateCss;
    case 'disabled':
      return props.disabledStateCss;
    case 'hidden':
      return 'vdb-p-hidden';
    default:
      return props.defaultStateCss;
  }
});

defineEmits(['clickAction']);
</script>

<style scoped>
.chapter-button-active-lg {
  background: linear-gradient(0deg, #fdedcb, #fdedcb),
    radial-gradient(
      37.36% 50% at 49.15% 50%,
      #f8c450 17.14%,
      rgba(248, 196, 80, 0.29) 45.79%,
      rgba(13, 9, 0, 0.35) 100%
    );
}

.pale-yellow-bg {
  background: #8e6200;
}

.pale-yellow {
  color: #8e6200;
}
.vdb-p-backdrop-blur {
  backdrop-filter: blur(8px);
}
</style>
