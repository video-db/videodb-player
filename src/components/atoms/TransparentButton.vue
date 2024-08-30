<template>
  <button
    :class="`
      flex
      justify-center
      items-center
      font-semibold
      text-white
      rounded-8
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
      'bg-black-45 border border-yellow backdrop-blur hover:bg-random-313131 hover:border-random-8e6200',
  },
  activeStateCss: {
    type: String,
    default: 'chapter-button-active-lg border border-yellow pale-yellow',
  },
  disabledStateCss: {
    type: String,
    default:
      'bg-black-45 opacity-20 border border-yellow backdrop-blur cursor-not-allowed pointer-events-none',
  },
});

const customCss = computed(() => {
  switch (props.buttonState) {
    case 'active':
      return props.activeStateCss;
    case 'disabled':
      return props.disabledStateCss;
    case 'hidden':
      return 'hidden';
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
.backdrop-blur {
  backdrop-filter: blur(8px);
}
</style>
