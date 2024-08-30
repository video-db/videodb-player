<template>
  <div class="absolute inset-0 h-full w-full overflow-hidden bg-kilvish-200">
    <div
      ref="videoWrapper"
      class="outline-16 relative h-full select-none outline-kilvish-200"
      :class="{
        'hide-subtitles': !showSubtitles
      }"
    >
      <!-- Video -->
      <video
        ref="videoElement"
        class="video-js pointer-events-none absolute bottom-0 left-0 right-0 top-0 h-full w-auto"
        playsinline
      >
        <track
          v-if="subtitle"
          kind="captions"
          :src="subtitle"
          srclang="en"
          label="English"
          default
        />
      </video>

      <!-- Backlayer -->
      <div class="absolute left-0 right-0 top-0 h-full w-full">
        <div
          :class="[
            'duration-400 absolute bottom-0 left-0 right-0 top-0 block cursor-pointer bg-gradient-to-b from-black to-transparent transition-opacity ease-in-out',
            !playing || showElements ? 'opacity-40' : 'opacity-0'
          ]"
          @click="togglePlay"
        />
        <slot name="overlay"></slot>
      </div>
      <div
        :class="[
          'absolute bottom-0 w-full',
          showElements ? 'lg-black-40' : 'lg-transparent'
        ]"
      >
        <slot name="controls"></slot>
      </div>
    </div>
  </div>
</template>

<script setup>
  import {
    ref,
    onMounted,
    onBeforeUnmount,
    defineExpose,
    provide
  } from 'vue'
  import { usePlayer } from '../hooks/useVideoJSPlayer.js'

  const props = defineProps({
    streamUrl: {
      type: String,
      required: true
    },
    thumbnailUrl: {
      type: String,
      required: true
    },
    subtitle: {
      type: String,
      default: ''
    },
    startAt: {
      type: Number,
      default: 0
    },
    autoPlay: {
      type: Boolean,
      default: false
    },
    autoHideDuration: {
      type: Number,
      defualt: 5000
    },
    defaultPlayBackRate: {
      type: Number,
      default: 1
    }
  })

  const videoWrapper = ref(null)
  const videoElement = ref(null)

  const emit = defineEmits([
    'play',
    'pause',
    'ended',
    'loadeddata',
    'waiting',
    'playing',
    'timeupdate',
    'canplay',
    'canplaythrough',
    'videoerrror',
    'fullscreenchange'
  ])

  const {
    events,
    playing,
    volume,
    videoMuted,
    duration,
    time,
    percentagePlayed,
    playBackRate,
    play,
    pause,
    togglePlay,
    toggleMute,
    seekTo,
    seekToPercentage,
    setVolume,
    setPlayBackRate,
    convertTimeToDuration,
    togglePictureInPicture,
    initializePlayer,
    bindEvents
  } = usePlayer(emit, props)

  const showElements = ref(true)
  const showElementsMouseMoveInterval = ref(null)

  const isFullScreen = ref(false)
  // const showSubtitles = ref(false);

  const orientation = ref('portrait')

  onMounted(() => {
    if (window.innerHeight > window.innerWidth) {
      orientation.value = 'portrait'
    } else {
      orientation.value = 'landscape'
    }

    //#TODO: can these event listeners be moved somewhere ?
    window.addEventListener('resize', () => {
      if (window.innerHeight > window.innerWidth) {
        orientation.value = 'portrait'
      } else {
        orientation.value = 'landscape'
      }
    })

    window.addEventListener('keypress', (e) => {
      if (isFullScreen.value && e.code === 'Escape') {
        toggleFullScreen(false)
      }
    })

    initializePlayer(videoElement)
    addVideoInteractions()
    addKeyboardKeyFunctions()
  })

  onBeforeUnmount(() => {
    removeKeyboardKeyFunctions()
  })

  const addKeyboardKeyFunctions = () => {
    document.addEventListener('keydown', keyDown)
  }

  const removeKeyboardKeyFunctions = () => {
    document.removeEventListener('keydown', keyDown)
  }

  const toggleFullScreen = (value) => {
    isFullScreen.value = value
    emit('fullscreenchange', value)
  }

  const keyDown = (e) => {
    const currentElement = document.activeElement.tagName
    if (currentElement === 'TEXTAREA' || currentElement === 'INPUT') {
      return
    }
    switch (e.code) {
      case 'Space':
        e.preventDefault()
        togglePlay()
        return
      // case 'ArrowLeft':
      //   e.preventDefault()
      //   rewind()
      //   return
      // case 'ArrowRight':
      //   e.preventDefault()
      //   forward()
      //   return
    }
  }

  // Mouse and touch events
  const addVideoInteractions = () => {
    // Touch events
    if (window.matchMedia('(any-hover: none)').matches) {
      videoWrapper.value.addEventListener('touchend', onTouchEnd)
    }
    // Hover events
    else {
      videoWrapper.value.addEventListener('mouseenter', onMouseEnter)
      videoWrapper.value.addEventListener('mouseleave', onMouseLeave)
    }
  }

  // Hover events
  const onMouseEnter = () => {
    showElements.value = true
    window.addEventListener('mousemove', onMouseMove)
  }

  const onMouseLeave = () => {
    clearTimeout(showElementsMouseMoveInterval.value)
    if (playing.value) {
      showElements.value = false
    }
    window.removeEventListener('mousemove', onMouseMove)
  }

  const onMouseMove = () => {
    clearTimeout(showElementsMouseMoveInterval.value)
    showElements.value = true
    showElementsMouseMoveInterval.value = setTimeout(() => {
      if (!playing.value) return
      showElements.value = false
    }, props.autoHideDuration)
  }

  // Touch events
  const onTouchEnd = () => {
    clearTimeout(showElementsMouseMoveInterval.value)
    showElements.value = true
    showElementsMouseMoveInterval.value = setTimeout(() => {
      if (!playing.value) return
      showElements.value = false
    }, props.autoHideDuration)
  }

  defineExpose({
    showElements,
    playing,
    volume,
    videoMuted,
    duration,
    time,
    percentagePlayed,
    playBackRate,
    isFullScreen,
    play,
    pause,
    togglePlay,
    toggleMute,
    seekTo,
    seekToPercentage,
    setPlayBackRate,
    setVolume,
    convertTimeToDuration,
    toggleFullScreen,
    togglePictureInPicture
  })

  provide('videodb-player', {
    showElements,
    playing,
    volume,
    videoMuted,
    duration,
    time,
    percentagePlayed,
    playBackRate,
    isFullScreen,
    play,
    pause,
    togglePlay,
    toggleMute,
    seekTo,
    seekToPercentage,
    setPlayBackRate,
    setVolume,
    convertTimeToDuration,
    toggleFullScreen,
    togglePictureInPicture
  })
</script>

<style scoped>
  .lg-transparent {
    background: linear-gradient(
      0deg,
      rgba(0, 0, 0, 0) 0%,
      rgba(0, 0, 0, 0) 100%
    );
  }

  .lg-black-40 {
    background: linear-gradient(
      0deg,
      rgba(0, 0, 0, 0.4) 0%,
      rgba(0, 0, 0, 0) 100%
    );
  }

  /* Subtitles */
  /deep/.vjs-text-track-display {
    position: absolute;
    bottom: 1rem;
  }

  .hide-subtitles /deep/.vjs-text-track-display {
    display: none !important;
  }

  /deep/.vjs-text-track-display .vjs-text-track-cue {
    font-size: 18px !important;
    height: auto !important;
    inset: unset !important;
    position: absolute !important;
    bottom: 0 !important;
  }

  /deep/.vjs-text-track-display .vjs-text-track-cue div {
    font-family: inherit !important;
    background: rgba(0, 0, 0, 0.72) !important;
    font-weight: 400 !important;
    color: #fff !important;
  }

  /* Shifting subtitles */
  .spext-player.show-elements /deep/.vjs-text-track-display,
  .spext-player.stopped /deep/.vjs-text-track-display {
    bottom: 5rem !important;
  }

  .show-playback-rates /deep/.vjs-text-track-display,
  .show-comment-box /deep/.vjs-text-track-display {
    display: none !important;
  }

  /* No selection */
  .bg-orientation-msg {
    background: #272727;
  }
</style>
