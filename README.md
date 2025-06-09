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

**For VueJS applications**
```bash
npm install @videodb/player-vue
```

**For ReactJS applications**
```bash
npm install @videodb/player-react
```

### Usage

 Import the necessary components and styles. ( *Currently supports Vue.js only* )

**For VueJS**
```html
<script setup>
  import { VideoDBPlayer } from "@videodb/player-vue";
  import "@videodb/player-vue/dist/style.css";
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

**For ReactJS**
```jsx
import { VideoDBPlayer } from "@videodb/player-vue";

export default function Player() {
    return (
        <VideoDBPlayer
            streamUrl="https://stream.videodb.io/v3/published/manifests/12df6498-e955-4249-84b8-7568aaf72160.m3u8"
        />
    )
}

```

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


[npm-shield]: https://img.shields.io/npm/v/@videodb/player-vue?style=for-the-badge
[npm-url]: https://www.npmjs.com/package/@videodb/player-vue
[discord-shield]: https://img.shields.io/badge/dynamic/json?style=for-the-badge&url=https://discord.com/api/invites/py9P639jGz?with_counts=true&query=$.approximate_member_count&logo=discord&logoColor=blue&color=green&label=discord
[discord-url]: https://discord.com/invite/py9P639jGz
[stars-shield]: https://img.shields.io/github/stars/video-db/videodb-player.svg?style=for-the-badge
[stars-url]: https://github.com/video-db/videodb-player/stargazers
[issues-shield]: https://img.shields.io/github/issues/video-db/videodb-player.svg?style=for-the-badge
[issues-url]: https://github.com/video-db/videodb-player/issues
[website-shield]: https://img.shields.io/website?url=https%3A%2F%2Fvideodb.io%2F&style=for-the-badge&label=videodb.io
[website-url]: https://videodb.io/
