<!-- PROJECT SHIELDS -->
<!--
*** Reference links are enclosed in brackets [ ] instead of parentheses ( ).
*** https://www.markdownguide.org/basic-syntax/#reference-style-links
-->


[![NPM version][npm-shield]][npm-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![Website][website-shield]][website-url]
<!-- PROJECT LOGO -->
<br />
<p align="center">
  <a href="https://videodb.io/">
    <img src="https://codaio.imgix.net/docs/_s5lUnUCIU/blobs/bl-RgjcFrrJjj/d3cbc44f8584ecd42f2a97d981a144dce6a66d83ddd5864f723b7808c7d1dfbc25034f2f25e1b2188e78f78f37bcb79d3c34ca937cbb08ca8b3da1526c29da9a897ab38eb39d084fd715028b7cc60eb595c68ecfa6fa0bb125ec2b09da65664a4f172c2f" alt="Logo" width="300" height="">
  </a>

  <h3 align="center">VideoDB Player</h3>

  <p align="center">
    AI First Video Player
    <br />
    <a href="https://docs.videodb.io"><strong>Explore the docs »</strong></a>
    <br />
    <br />
    <a href="https://stackblitz.com/">View Demo</a>
    ·
    <a href="https://github.com/video-db/videodb-player/issues">Report Bug</a>
    ·
    <a href="https://github.com/video-db/videodb-player/issues">Request Feature</a>
  </p>
</p>

<!-- ABOUT THE PROJECT -->
# 📺 VideoDB Player

## 🤔 Why ? 

## ✨VideoDB Player

## 🧩 Components


## 🚀 Quickstart

### Installation

To add the VideoDB Player library to your project, use the following command in your project's directory:

```bash
npm install videodb-player
```

### Usage

To use the VideoDB Player in your Vue.js application, import the necessary components and styles:

```html
<script setup>
  import { VideoDBPlayer } from "videodb-player";
  import "videodb-player/dist/style.css";
</script>

<template>
  <div class="player-wrapper">
    <VideoDBPlayer 
      class="player" 
      streamUrl="https://stream.videodb.io/v3/published/manifests/12df6498-e955-4249-84b8-7568aaf72160.m3u8"
    >
    </VideoDBPlayer>
  </div>
</template>

<style scoped>
  .player-wrapper {
    width: 100vw;
    height: 100vh;
  }

  .player {
    width: 100%;
    height: 100%;
  }
</style>
```

## 🧑‍💻 Advanced Usage

### 🔧 Custom Controls

To create custom controls for the VideoDBPlayer component, you can utilize the provided slot feature. First, you'll need to disable the default controls by setting the `defaultControls` prop to `false`. Here's how you can do it:

```html
<VideoDBPlayer 
  streamUrl="https://example.com/video.m3u8"
  :defaultControls="false"
>
  <template #controls>
    <YourCustomControls />
  </template>
</VideoDBPlayer>
```

### 🔧 Custom overlay

Similar to disabling the default controls, you can disable the default overlay by setting the `defaultOverlay` prop to `false` within the VideoDBPlayer component:

```html
<VideoDBPlayer 
  streamUrl="https://example.com/video.m3u8"
  :defaultOverlay="false"
>
  <template #overlay>
    <YourCustomOverlay />
  </template>
</VideoDBPlayer>
```

### 🔎 Using `<SearchInsideMedia/>` Component
The `<SearchInsideMedia/>` component enables in-video search functionality. To use it:

1. Disable the default overlay in `<VideoDBPlayer>`.
2. Add the `<SearchInsideMedia/>` component in the `#overlay` slot.
3. To get the search results from Video you can use [VideoDB](https://videodb.io). Checkout [VideoDB Quickstart Guide](https://docs.videodb.io/quick-start-guide-38) for more details.


```html
<template>
  <VideoDBPlayer
    ref="playerRef"
    streamUrl="https://example.com/video.m3u8"
    :defaultOverlay="false"
  >
    <template #overlay>
      <BigCenterButton />
      <SearchInsideMedia 
        :search-content="searchContent"
        :search-results="searchResults"
        :search-results-loading="searchResultsLoading"
        :show-search-results="showSearchResults"
        @toggle-results="(e) => (showSearchResults = e)"
        @search-change="handleSearchChange"
        @search-submit="handleSearchSubmit"
      />
    </template>
  </VideoDBPlayer>
</template>
```

> ℹ️ Checkout [SearchInsideMedia interface](#searchinsidemedia) for more details on props and events



### 🧑‍💻 Accessing Player State Inside Child Components of `VideoDBPlayer` 

The player state and methods are provided through the Vue composition API. You can access them using the `useVideoDBPlayer` hook in Child Components of `VideoDBPlayer`:

```html
<script setup>
  import { useVideoDBPlayer } from "videodb-player";
  const {
    playing,
    volume,
    duration,
    time,
    togglePlay,
    setVolume,
    // ... other properties and methods
    // checkout reference for more details
  } = useVideoDBPlayer();
</script>
```
> ℹ️ Checkout [VideoDBPlayer interface](#videodbplayer) for more details

### 🧑‍💻 Accessing Player Instance 

The VideoDB Player exposes its internal player instance through a ref.
Its useful for accessing player methods and state from outside the component

```html
<template>
  <VideoDBPlayer
    ref="playerRef"
    streamUrl="https://example.com/video.m3u8"
  />
</template>

<script setup>
import { ref, onMounted } from "vue";
import { VideoDBPlayer } from "videodb-player";

const playerRef = ref(null);

onMounted(() => {
    playerRef.value.togglePlay();
  // ... other exposed methods & variable
  // checkout reference for more details
});
</script>
```

> ℹ️ Checkout [VideoDBPlayer interface](#videodbplayer) for more details


### 🔔 Events

The VideoDB Player emits several events that you can listen to in the parent component:

1. `play`: Emitted when the video starts playing.
2. `pause`: Emitted when the video is paused.
3. `ended`: Emitted when the video playback ends.
4. `loadeddata`: Emitted when video data has loaded.
5. `waiting`: Emitted when the video is waiting for data to continue playback.
6. `playing`: Emitted when the video starts playing after being paused or stopped for buffering.
7. `timeupdate`: Emitted continuously as the video plays, providing the current playback time.
8. `canplay`: Emitted when the browser can start playing the video.
9. `canplaythrough`: Emitted when the browser estimates it can play through the video without stopping for buffering.
10. `videoerrror`: Emitted when an error occurs during video playback.
11. `toggleSubtitles`: Emitted when subtitles are toggled on or off.
12. `fullScreenChange`: Emitted when entering or exiting fullscreen mode.

Example usage:
```html
<template>
  <VideoDBPlayer
    @play="onPlay"
    @pause="onPause"
    @ended="onEnded"
    @toggleSubtitles="onToggleSubtitles"
    @fullScreenChange="onFullScreenChange"
    streamUrl="https://example.com/video.m3u8"
  />
</template>

<script setup>
import { VideoDBPlayer } from 'videodb-player';

const onPlay = () => {
  console.log('Video started playing');
};

const onPause = () => {
  console.log('Video paused');
};

const onEnded = () => {
  console.log('Video playback ended');
};

const onToggleSubtitles = (subtitlesEnabled) => {
  console.log('Subtitles toggled:', subtitlesEnabled ? 'on' : 'off');
};

const onFullScreenChange = (isFullScreen) => {
  console.log('Fullscreen mode:', isFullScreen ? 'entered' : 'exited');
};
</script>
```

# 📡 Interface

## VideoDBPlayer

### Props
- `streamUrl`: (String, required): The URL of the video stream.
- `thumbnailUrl`: (String, optional): URL of the video thumbnail.
- `subtitlesConfig`: (Object, optional): Configuration for subtitles.
  - `src` (String, default: ""): The URL of the subtitles file.
  - `kind` (String, default: "captions"): The kind of text track.
  - `lang` (String, default: "en"): The language of the subtitles.
  - `label` (String, default: "English"): The label for the subtitles.
- `startAt` (Number, default: 0): Time in seconds to start the video.
- `autoPlay` (Boolean, default: false): Whether to start playing automatically.
- `autoHideDuration` (Number, default: 5000): Duration in milliseconds before controls are hidden.
- `defaultControls` (Boolean, default: true): Whether to use default controls.
- `defaultOverlay` (Boolean, default: true): Whether to use the default overlay.
- `defaultPlayBackRate` (Number, default: 1): Default playback rate.
- `debug` (Boolean, default: false): Enable debug mode.


### Exposed and Injected Variables

Following variables are both exposed (via `defineExpose`) and injected (via `provide`) under the key "videodb-player":

### State Variables

- `showElements`: Boolean indicating whether control elements are visible.
- `playing`: Boolean indicating if the video is currently playing.
- `volume`: Number representing the current volume level.
- `videoMuted`: Boolean indicating if the video is muted.
- `duration`: Number representing the total duration of the video.
- `time`: Number representing the current playback time.
- `percentagePlayed`: Number representing the percentage of the video that has been played.
- `playBackRate`: Number representing the current playback speed.
- `showSubtitles`: Boolean indicating if subtitles are currently displayed.
- `subtitlesConfig`: Object containing subtitle configuration (src, kind, lang, label).
- `isFullScreen`: Boolean indicating if the player is in fullscreen mode.

### Methods

- `play()`: Start playing the video.
- `pause()`: Pause the video.
- `togglePlay()`: Toggle between play and pause.
- `toggleMute()`: Toggle audio mute.
- `seekTo(time)`: Seek to a specific time in the video.
- `seekToPercentage(percentage)`: Seek to a specific percentage of the video.
- `setPlayBackRate(rate)`: Set the playback speed.
- `setVolume(level)`: Set the volume level.
- `toggleFullScreen(value)`: Toggle fullscreen mode.
- `toggleSubtitles(value)`: Toggle subtitle display.

## SearchInsideMedia

### Props
- `searchInputPlaceholder` (String, default: "Search or ask a question"): Placeholder text for the search input.
- `searchContent` (String, required): The search query.
- `searchSuggestions` (Array, optional): List of search suggestions. Each suggestion is an object with the format `{ "text": "search suggestion" }`.
- `searchResultsLoading` (Boolean, required): Whether search results are loading.
- `showSearchResults` (Boolean, required): Whether to show search results.
- `searchResults` (Object, optional): Search results object containing:
  - `hits` (Array, required): Array of match objects, each with the following fields:
    - `id` (String, required): Unique identifier for the match.
    - `start` (Number, required): Start time of the match in seconds relative to video start.
    - `end` (Number, required): End time of the match in seconds relative to video start.
    - `text` (String, required): Relevant text matching the query.
    - `type` (String, required): Type of match, either "relevant" or "exact".

### Events
- `toggle-results`: Emitted when the search results are required to be toggled on or off.
- `search-change`: Emitted when the search input changes.
- `search-submit`: Emitted when the search is submitted (enter key pressed )



# 🛣️ Roadmap
- ⚡ Optimization for ProgressBar 
- 🔍 Search Component Interface improvements 
- 🎨 Improve tailwind.config.js; use default values for spacing
- ⚛️ React Conversion

<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->

[npm-shield]: https://img.shields.io/npm/v/videodb-player?style=for-the-badge
[npm-url]: https://www.npmjs.com/package/videodb-player
[stars-shield]: https://img.shields.io/github/stars/video-db/videodb-player.svg?style=for-the-badge
[stars-url]: https://github.com/video-db/videodb-player/stargazers
[issues-shield]: https://img.shields.io/github/issues/video-db/videodb-player.svg?style=for-the-badge
[issues-url]: https://github.com/video-db/videodb-player/issues
[website-shield]: https://img.shields.io/website?url=https%3A%2F%2Fvideodb.io%2F&style=for-the-badge&label=videodb.io
[website-url]: https://videodb.io/