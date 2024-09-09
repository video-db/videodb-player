<!-- PROJECT SHIELDS -->
<!--
*** Reference links are enclosed in brackets [ ] instead of parentheses ( ).
*** https://www.markdownguide.org/basic-syntax/#reference-style-links
-->

[![NPM version][npm-shield]][npm-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![Website][website-shield]][website-url]
[![Discord][discord-shield]][discord-url]

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
    <a href="https://stackblitz.com/edit/videodb-player-demo-pxy8k7?file=src%2FApp.vue"><strong>View Demo »</strong></a>
    <br />
    <br />
    <a href="https://github.com/video-db/videodb-player/issues">Report Bug</a>
    ·
    <a href="https://github.com/video-db/videodb-player/issues">Request Feature</a>
  </p>
</p>

<!-- ABOUT THE PROJECT -->

# 📺 VideoDB Player

VideoDB Player is an AI-first video player that enhances how we interact with videos.

### 🤖 AI-Powered Interactive Features

- Intelligent search bar and navigation in the video using search results.
- Automated chapter UI for easy consumpation and navigation.
- Seamless integration with chat interfaces for interactive experiences.


### 🌍 Versatile and User-Friendly Experience

- Cross platform support (Web, Android, iOS), features perfectly adjust on mobile devices.
- Out-of-the-box speed controls allow users to customize their viewing experience.
- [Designed](https://www.linkedin.com/posts/ashutoshtrivedi_spext-activity-7231616055834505216-UNsw) with both viewers and developers in mind, offering a sleek interface and easy integration.

### 🚀 Optimized for [VideoDB](https://videodb.io) Infra

While it can work with any video source, VideoDB Player is specially optimized to leverage the full potential of VideoDB's advanced video infrastructure.

- Enhanced compatibility with VideoDB's advanced video search feature.
- *(upcoming)* [videodb-chat](https://github.com/video-db/videodb-chat) provides necessary Chat UI components specially designed for "Chat with Video" interfaces.


<br>

# ✨ See it in Action

<br>

https://github.com/user-attachments/assets/5d674179-16cd-4ec3-b3f5-c8c613562fb8

<br>

## 🎨 Well-Designed UI Components

<br>

![player-components](https://github.com/user-attachments/assets/c57447d3-8c01-4e3c-ac90-d51053488178)

VideoDB Player offers a well crafted UI, composed of modular components that ensure both functionality and aesthetic appeal. Let's break down the key elements:

1. Main Components:

- `VideoDBPlayer` : Main Video Player Component

2. Overlays:

- `SearchInsideMedia`: Allows users to search within the video content. Includes a UI interface specifically designed to show Video Results ✨.
- `Chapters`: Chapters that overlays on a Video.
- `BigCenterButton`: Prominent play/pause control for easy interaction

3. Controls:

- `ProgressBar`: Visual indicator of playback progress. With integration of Video Chapter functionality.
- `PlayPauseButton`: Toggle between play and pause states
- `VolumeControl`: Adjust audio levels
- `SpeedControl`: Modify playback speed
- `Caption`: Toggle closed captions
- `Fullscreen`: Expand to full-screen mode

<br>
<br>

# 🚀 Quickstart



### Installation

 Clone this repo or use the following command in your project's directory:

```bash
npm install videodb-player
```

### Usage

 Import the necessary components and styles. ( *Currently supports Vue.js only* )

```html
<script setup>
  import { VideoDBPlayer } from "videodb-player";
  import "videodb-player/dist/style.css";
</script>

<template>
  <VideoDBPlayer
    class="player"
    streamUrl="https://stream.videodb.io/v3/published/manifests/12df6498-e955-4249-84b8-7568aaf72160.m3u8"
  >
  </VideoDBPlayer>
</template>

<style scoped>
  .player {
    width: 90vw;
  }
</style>
```

<br>

# 🧑‍💻 Advanced Usage

### 🧩 Slots

`<VideoDBPlayer/>` has two different [slots](https://vuejs.org/guide/components/slots.html) available to add Custom UI components on top of `VideoDBPlayer`.

- `overlay`
- `controls`

Child Components can access the player state by [injecting](https://vuejs.org/guide/components/provide-inject.html#inject) the state [provided](https://vuejs.org/guide/components/provide-inject.html#provide) under `videodb-player` key.
Checkout [Accessing State Inside Child Components of `VideoDBPlayer`](#-accessing-player-state-inside-child-components-of-videodbplayer) Section for more details

![slots](https://github.com/user-attachments/assets/90276518-0a72-4be1-b293-2c6b1309c66a)

<br>

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

<br>

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

<br>

### 🔎 Using `<SearchInsideMedia/>` Component

The `<SearchInsideMedia/>` component enables in-video search functionality. To use it:

1. Disable the default overlay in `<VideoDBPlayer>`.
2. Add the `<SearchInsideMedia/>` component in the `#overlay` slot.
3. To get the search results from Video you can use [VideoDB](https://videodb.io).

```html
<template>
  <VideoDBPlayer
    ref="playerRef"
    streamUrl="https://example.com/video.m3u8"
    :defaultOverlay="false"
  >
    <template #overlay>
      <BigCenterButton class="center-button" />
      <SearchInsideMedia
        :search-content="searchContent"
        :search-results="searchResults"
        :search-results-loading="searchResultsLoading"
        :show-search-results="showSearchResults"
        @toggle-results="showSearchResults = $event"
        @search-change="handleSearchChange"
        @search-submit="handleSearchSubmit"
      />
    </template>
  </VideoDBPlayer>
</template>

<style scoped>
  .center-button {
    position: absolute;
    top: 50%;
    left: 50%;
  }
</style>
```

> ℹ️ Checkout [SearchInsideMedia interface](#searchinsidemedia) for more details on props and events

<br>

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

<br>

### 🧑‍💻 Accessing Player Instance

Internal player instance are exposed through a `ref`.
Useful for accessing player methods and state from outside the component.

```html
<template>
  <VideoDBPlayer ref="playerRef" streamUrl="https://example.com/video.m3u8" />
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

<br>

### 🔔 Events

Emits several events that you can listen to, in the parent component:

1. `play`: Emitted when the video starts playing.
2. `pause`: Emitted when the video is paused.
   > ℹ️ Checkout [VideoDBPlayer interface](#videodbplayer) for full list of events

Example usage:

```html
<template>
  <VideoDBPlayer
    @play="onPlay"
    @pause="onPause"
    streamUrl="https://example.com/video.m3u8"
  />
</template>

<script setup>
  import { VideoDBPlayer } from "videodb-player";

  const onPlay = () => {
    console.log("Video started playing");
  };

  const onPause = () => {
    console.log("Video paused");
  };
</script>
```

<br>

# 📡 Interface

## VideoDBPlayer

### Props

- `streamUrl`: (String, required): URL of the video stream.
- `thumbnailUrl`: (String, optional): URL of the video thumbnail.
- `aspectRatio`: (String, default: "16:9"): Aspect ratio of the video. (ratio, seperated by ":")
- `subtitlesConfig`: (Object, optional): Configuration for subtitles.
  - `src` (String, default: ""): URL of the subtitles file.
  - `kind` (String, default: "captions"): text track type.
  - `lang` (String, default: "en"): Language of the subtitles.
  - `label` (String, default: "English"): Label for the subtitles.
- `startAt` (Number, default: 0): Time in seconds to start the video.
- `autoPlay` (Boolean, default: false): Toggle to start playing automatically.
- `autoHideDuration` (Number, default: 5000): Duration in milliseconds before controls are hidden.
- `defaultControls` (Boolean, default: true): Toggle to use default controls.
- `defaultOverlay` (Boolean, default: true): Toggle to use the default overlay.
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

### Events

- `play`: Emitted when the video starts playing.
- `pause`: Emitted when the video is paused.
- `ended`: Emitted when the video playback ends.
- `loadeddata`: Emitted when video data has loaded.
- `waiting`: Emitted when the video is waiting for data to continue playback.
- `playing`: Emitted when the video starts playing after being paused or stopped for buffering.
- `timeupdate`: Emitted continuously as the video plays, providing the current playback time.
- `canplay`: Emitted when the browser can start playing the video.
- `canplaythrough`: Emitted when the browser estimates it can play through the video without stopping for buffering.
- `videoerrror`: Emitted when an error occurs during video playback.
- `toggleSubtitles`: Emitted when subtitles are toggled on or off.
- `fullScreenChange`: Emitted when entering or exiting fullscreen mode.

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

## 🛣️ Roadmap

- Integration with upcoming VideoDB chat and agents projects.
- ⚡ Optimization for ProgressBar
- 🔍 Search Component Interface improvements
- 🎨 Improve tailwind.config.js; use default values for spacing
- ⚛️ React Conversion

<!-- CONTRIBUTING -->

## Contribute

Contributions are what make the open source community such an amazing place to be learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->

[npm-shield]: https://img.shields.io/npm/v/videodb-player?style=for-the-badge
[npm-url]: https://www.npmjs.com/package/videodb-player
[discord-shield]: https://img.shields.io/badge/dynamic/json?style=for-the-badge&url=https://discord.com/api/invites/py9P639jGz?with_counts=true&query=$.approximate_member_count&logo=discord&logoColor=blue&color=green&label=discord
[discord-url]: https://discord.com/invite/py9P639jGz
[stars-shield]: https://img.shields.io/github/stars/video-db/videodb-player.svg?style=for-the-badge
[stars-url]: https://github.com/video-db/videodb-player/stargazers
[issues-shield]: https://img.shields.io/github/issues/video-db/videodb-player.svg?style=for-the-badge
[issues-url]: https://github.com/video-db/videodb-player/issues
[website-shield]: https://img.shields.io/website?url=https%3A%2F%2Fvideodb.io%2F&style=for-the-badge&label=videodb.io
[website-url]: https://videodb.io/
