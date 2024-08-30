# VideoDB Player UI Library

## Overview

VideoDB Player is a Vue.js-based UI library for creating customizable video players. It provides a set of components and utilities to easily integrate video playback functionality into your Vue applications.

## Installation

To install the VideoDB Player library, run the following command in your project directory:

```bash
npm install videodb-player
```

### Usage

To use the VideoDB Player in your Vue.js application, import the necessary components and styles:

```html
<script setup>
  import { VideoDBPlayer } from "videodb-player";
</script>

<template>
  <div class="player-wrapper">
    <VideoDBPlayer 
      class="player" 
      streamUrl="https://stream.videodb.io/v3/published/manifests/12df6498-e955-4249-84b8-7568aaf72160.m3u8"
    >
      <template #overlay>
        <!-- Custom overlay can be added here -->
      </template>

      <template #controls>
        <!-- Custom controls can be added here -->
      </template>
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

## Components

### VideoDBPlayer

The main component for rendering the video player.

#### Props

- `streamUrl` (String, required): The URL of the video stream.
- `thumbnailUrl` (String, optional): URL of the video thumbnail.
- `subtitlesConfig` (Object, optional): Configuration for subtitles.
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

### Other Components

- `BigCenterButton`: Large play button displayed in the center of the player.
- `ProgressBar`: Shows the current progress of the video.
- `PlayPauseButton`: Toggle between play and pause states.
- `VolumeControlButton`: Control the volume of the video.
- `TimeCode`: Display the current time and duration of the video.
- `SpeedControlButton`: Adjust the playback speed.
- `CaptionButton`: Toggle captions/subtitles.
- `FullScreenButton`: Toggle fullscreen mode.

## Styling

The library uses Tailwind CSS for styling. Custom styles can be applied by overriding the provided classes.

## Advanced Usage

### Custom Controls

You can create custom controls by using the slot provided in the `VideoDBPlayer` component:

```html
<VideoDBPlayer streamUrl="https://example.com/video.m3u8">
  <template #controls>
    <YourCustomControls />
  </template>
</VideoDBPlayer>
```

### Custom overlay

You can create custom controls by using the slot provided in the `VideoDBPlayer` component:

```html
<VideoDBPlayer streamUrl="https://example.com/video.m3u8">
  <template #overlay>
    <YourCustomOverlay />
  </template>
</VideoDBPlayer>
```

### Accessing Player State

The player state and methods are provided through the Vue composition API. You can access them using the `useVideoDBPlayer` hook:

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
> Checkout [reference](#reference) for more details

### Accessing Player Instance 

The VideoDB Player exposes its internal player instance through a ref:

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

> Checkout [reference](#reference) for more details


### Events

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
    :streamUrl="streamUrl"
  />
</template>

<script setup>
import { VideoDBPlayer } from 'videodb-player';

const streamUrl = "https://example.com/video.m3u8";

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

# Reference

## Exposed and Injected Variables

The following variables are both exposed (via `defineExpose`) and injected (via `provide`) under the key "videodb-player":

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



## Know Issues
-  Optimization for ProgressBar 
-  Search Component improvements 
-  Improve tailwind.config.js; use default values for spacing
