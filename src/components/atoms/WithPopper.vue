<template>
  <popper
    hover
    arrow
    placement="top"
    :modifiers="{ offset: { offset: '0,10px' } }"
    boundaries-selector=".video-player"
    boundaries="30px"
  >
    <template
      #content
      class="popper hidden sm:block"
      :class="!isPopperActive ? 'invisible' : ''"
    >
      {{ popperText }}
    </template>
    <div slot="reference"><slot name="button" /></div>
    <!-- <button slot="reference">THis is a good button</button> -->
    <!-- <slot name="button">ada</slot> -->
  </popper>
</template>

<script setup>
import Popper from "vue3-popper";

defineProps({
  popperText: {
    type: String,
    default: "",
  },
  isPopperActive: {
    type: Boolean,
    default: false,
  },
});
</script>
