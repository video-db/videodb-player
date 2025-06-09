import type { App } from "vue";
import VideoDBPlayer from "./components/video/VideoDBPlayer.vue";
import SearchInsideMedia from "./components/search/SearchInsideMedia.vue";
import SearchResults from "./components/search/SearchResults.vue";
import ProgressBar from "./components/video/ProgressBar.vue";
import BigCenterButton from "./components/buttons/BigCenterButton.vue"
import PlayPauseButton from "./components/buttons/PlayPauseButton.vue";
import VolumeControlButton from "./components/buttons/VolumeControlButton.vue";
import TimeCode from "./components/atoms/TimeCode.vue"
import SpeedControlButton from "./components/buttons/SpeedControlButton.vue";
import CaptionButton from "./components/buttons/CaptionButton.vue";
import FullScreenButton from "./components/buttons/FullScreenButton.vue";
import { useVideoDBPlayer } from "./context"; 
import "./style.css";
import "./videojs.css";

function install(app: App) {
  app.component("VideoDBPlayer", VideoDBPlayer);
  app.component("SearchInsideMedia", SearchInsideMedia);
  app.component("BigCenterButton", BigCenterButton);
  app.component("ProgressBar", ProgressBar);
  app.component("PlayPauseButton", PlayPauseButton);
  app.component("VolumeContorlButton", VolumeControlButton);
  app.component("TimeCode", TimeCode);
  app.component("SpeedControlButton", SpeedControlButton);
  app.component("CaptionButton", CaptionButton);
  app.component("FullScreenButton", FullScreenButton);
}

export {
  install,
  useVideoDBPlayer,
  VideoDBPlayer,
  TimeCode,
  SearchInsideMedia,
  BigCenterButton,
  ProgressBar,
  PlayPauseButton,
  VolumeControlButton,
  SearchResults,
  SpeedControlButton,
  CaptionButton,
  FullScreenButton,
};
