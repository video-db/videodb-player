<template>
  <div
    class="swiper-slide sr h-full rounded-8 {{ isLight ? 'light' : '' }}"
    :data-seconds="searchResultItem.start"
    :data-index="i"
    :data-id="searchResultItem.id"
    style="min-width: 204px"
  >
    <div
      class="flex h-full cursor-pointer flex-col justify-between transition"
      :data-seconds="searchResultItem.start"
    >
      <p
        class="mb-8 leading-normal swiper-truncate-overflow {{ isLight ? 'text-gray-950' : 'text-white' }}"
        :data-seconds="searchResultItem.start"
      >
        <span
          v-html="wrapSpan(searchResultItem.text, searchResultItem.type)"
        ></span>
      </p>
      <div class="flex w-full items-center justify-between">
        <div
          :class="`swiper-time ${searchResultItem.type} ${isLight ? 'light' : ''}`"
          :data-seconds="searchResultItem.start"
        >
          <p
            :class="`text-overline font-medium tracking-wider opacity-80 ${isLight ? 'swiper-time-light-text' : 'text-white-80'}`"
          >
            {{
              searchResultItem.start < 3600
                ? start.substring(14, 19)
                : start.substring(11, 19)
            }}
            {{ end ? " - " : "" }}
            {{
              end
                ? searchResultItem.end < 3600
                  ? end.substring(14, 19)
                  : end.substring(11, 19)
                : ""
            }}
          </p>
        </div>
        <p
          :data-seconds="searchResultItem.start"
          :class="`text-caption3 font-medium capitalize text-kilvish-600 ${searchResultItem.type}-text-br`"
        >
          {{ searchResultItem.type }}
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";

const props = defineProps({
  searchContent: {
    type: String,
    default: "",
  },
  searchResultItem: {
    type: Object,
    default: () => {},
  },
  searchResultItemIndex: {
    type: Number,
    default: 0,
  },
  isLight: {
    type: Boolean,
    default: true,
  },
});

const i = computed(() => props.searchResultItemIndex);

const start = computed(() =>
  new Date(parseFloat(props.searchResultItem.start) * 1000).toISOString(),
);

const end = computed(() =>
  props.searchResultItem.type === "relevant"
    ? new Date(parseFloat(props.searchResultItem.end) * 1000).toISOString()
    : null,
);

const wrapSpan = (strReplace, type) => {
  const searchMask = props.searchContent.trim();
  const regEx = new RegExp(searchMask, "ig");
  const replaceMask = `<span class="text-${
    props.searchResultItem.type === "relevant" ? "lime" : "yellow"
  } ${props.isLight ? "light" : ""}">${props.searchContent}</span>`;

  return strReplace.replace(regEx, replaceMask);
};
</script>

<style>
/* Swiper */
.sr-swiper .swiper-container {
  padding: 2rem;
}

.sr-swiper.light .swiper-container {
  padding: 0.5rem;
}

/* Truncate search results */
.swiper-truncate-overflow {
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
}

.sr-timeline-bg {
  background: rgba(0, 0, 0, 0.2);
  border-radius: 30px;
}

.sr-timeline-bg.light {
  background: #f3f4f6;
  border: 1px solid #e5e7eb;
  border-radius: 30px;
}

.swiper-slide.sr {
  height: 128px;
  padding: 10px;
}

.swiper-slide.sr:hover {
  background: rgba(12, 12, 12, 0.4);
}

.swiper-slide.sr.light:hover {
  background: #eceff3;
}

.swiper-slide.sr:hover .relevant-text-br {
  color: #cde210;
}

.swiper-slide.sr.light:hover .relevant-text-br {
  color: #53b745;
}

.swiper-slide.sr:hover .exact-text-br {
  color: #f8c450;
}

.swiper-slide.sr:hover .swiper-time.light {
  background-color: #fff;
}

.swiper-time {
  width: fit-content;
  background-color: #323232;
  border-radius: 4px;
  padding: 6px;
  display: flex;
}

.swiper-time.light {
  background-color: #eceff3;
}

.swiper-time > img {
  width: 14px;
  height: auto;
  margin-right: 4px;
}

.text-lime {
  color: #cde210;
}

.text-lime.light {
  background-color: #53b745;
}

.text-yellow {
  color: rgba(248, 196, 80, 1);
}

.bg-lime {
  background-color: #cde210;
}

.bg-lime.light {
  background-color: #53b745;
}

.sr-dot {
  box-sizing: content-box;
}

.sr-dot.active:not(.light) {
  outline: 1px solid rgba(0, 0, 0, 0.35);
}

.sr-dot.light {
  outline: 1px solid rgba(255, 255, 255, 1);
}

.sr-dot.relevant:not(.light):hover,
.sr-dot.forced-hover.relevant:not(.light) {
  outline: 7px solid rgba(180, 194, 54, 0.35);
  box-shadow: 0px 1px 4px rgba(0, 0, 0, 0.53);
}

.sr-dot.exact:not(.light):hover,
.sr-dot.forced-hover.exact:not(.light) {
  outline: 7px solid rgba(248, 196, 80, 0.35);
  box-shadow: 0px 1px 4px rgba(0, 0, 0, 0.53);
}

.sr-dot.light.relevant:hover,
.sr-dot.forced-hover.light.relevant {
  outline: 7px solid rgba(83, 183, 69, 0.35);
  box-shadow: 0px 1px 4px rgba(255, 255, 255, 0.53);
}

.swiper-time-light-text {
  color: #374151;
}
</style>
