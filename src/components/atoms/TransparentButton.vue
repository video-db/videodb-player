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

<script>
export default {
  name: 'TransparentButton',
  props: {
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
  },
  computed: {
    customCss() {
      let _customCss
      switch (this.buttonState) {
        case 'active':
          _customCss = this.activeStateCss
          break
        case 'disabled':
          _customCss = this.disabledStateCss
          break
        case 'hidden':
          _customCss = 'hidden'
          break
        default:
          _customCss = this.defaultStateCss
          break
      }
      return _customCss
    },
  },
}
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
