<template>
  <svg
    :className="className"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M10.83 12L15.78 7.04999L14.366 5.63599L8.00203 12L14.366 18.364L15.78 16.95L10.83 12Z"
      fill="black"
    />
  </svg>
</template>

<script>
export default {
  name: "ArrowLeft",
  props: {
    className: {
      type: String,
      default: "",
    },
  },
};
</script>

<style scoped>
svg path {
  fill: currentColor;
}
</style>
