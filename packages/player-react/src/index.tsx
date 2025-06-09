import TimeCode from "./components/atoms/time-code";
import VideoPlayer from "./components/videos/videodb-player";
import SearchInsideMedia from "./components/search/search-inside-media";
import useVideoDBPlayer from "./hooks/useVideoJSPlayer";
import BigCenterButton from "./components/buttons/big-center-button";
import ProgressBar from "./components/videos/progress-bar";
import PlayPauseButton from "./components/buttons/play-pause-button";
import VolumeControlButton from "./components/buttons/volume-control-button";
import SearchResults from "./components/search/search-results";
import SpeedControlButton from "./components/buttons/speed-control-button";
import CaptionToggleButton from "./components/buttons/caption-button";
import FullscreenToggleButton from "./components/buttons/full-screen-button";
import "./styles.css";
import "./videojs.css";

export {
  VideoPlayer,
  useVideoDBPlayer,
  TimeCode,
  SearchInsideMedia,
  BigCenterButton,
  ProgressBar,
  PlayPauseButton,
  VolumeControlButton,
  SearchResults,
  SpeedControlButton,
  CaptionToggleButton,
  FullscreenToggleButton,
};
export default VideoPlayer;
