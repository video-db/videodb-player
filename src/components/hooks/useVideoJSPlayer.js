import { ref, reactive, toRefs, watch } from "vue";
import videojs from "video.js";

export function usePlayer(emit, props) {
  const playerState = reactive({
    playing: false,
    volume: 1,
    videoMuted: props.muted,
    time: props.startAt,
    duration: 0,
    percentagePlayed: 0,
    playBackRate: props.defaultPlayBackRate,
  });

  const player = ref(null);

  const getSource = () => {
    const src = props.streamUrl;
    const type = "application/x-mpegURL";

    return { src, type };
  };

  const events = [
    "play",
    "pause",
    "ended",
    "loadeddata",
    "waiting",
    "playing",
    "timeupdate",
    "canplay",
    "canplaythrough",
  ];

  const initializePlayer = (playerRef) => {
    if (playerRef) {
      try {
        const source = getSource();
        player.value = videojs(playerRef.value, {
          autoplay: props.autoPlay,
          controls: false,
          html5: {
            nativeTextTracks: false,
          },
          preload: true,
          poster: props.thumbnailUrl,
          sources: [source],
          crossorigin: "anonymous",
        });
        bindEvents(events, emit);
      } catch (err) {
        if (err) emit("videoerror", true);
        console.error("Error in initializing player ", err);
        return;
      }
    }
  };

  const disposePlayer = () => {
    if (player.value) {
      player.value.dispose();
      player.value = null;
    }
  };

  const play = () => {
    player.value.play();
    playerState.playing = true;
  };

  const pause = () => {
    player.value.pause();
    playerState.playing = false;
  };

  const togglePlay = () => {
    if (playerState.playing) {
      pause();
    } else {
      play();
    }
  };

  const setMuted = (state) => {
    player.value.muted = state;
    playerState.videoMuted = state;
  };

  const toggleMute = () => {
    if (playerState.videoMuted) {
      setMuted(false);
    } else {
      setMuted(true);
    }
  };

  const setVolume = (percentAsDecimal) => {
    if (player.value) {
      player.value.volume(percentAsDecimal);
      playerState.volume = percentAsDecimal;
    }
  };

  const seekTo = (time) => {
    if (player.value) {
      let newTime = parseInt(time);
      if (isNaN(newTime) && !isFinite(newTime)) return;

      if (newTime < 0) {
        newTime = 0;
      }

      if (newTime > playerState.duration) {
        newTime = playerState.duration;
        pause();
      }
      player.value.currentTime(time);
    }
  };

  const seekToPercentage = (percentage) => {
    (percentage / 100) * playerState.duration;
  };

  const setPlayBackRate = (value) => {
    playerState.playBackRate = value;
    player.value.playbackRate(value);
  };

  const convertTimeToDuration = (seconds) => {
    return [Math.floor((seconds / 60) % 60), Math.floor(seconds % 60)]
      .map((num) => num.toString().padStart(2, "0"))
      .join(":");
  };

  const togglePictureInPicture = () => {
    if (document.pictureInPictureElement) {
      document.exitPictureInPicture();
    } else if (document.pictureInPictureEnabled) {
      player.value.requestPictureInPicture();
    }
  };

  const bindEvents = (events, emit) => {
    if (player.value) {
      events.forEach((customEvent) => {
        (function () {
          player.value.on(customEvent, (event) => {
            if (props.debug) console.log("Player event ", customEvent, event);
            switch (customEvent) {
              case "loadeddata":
                playerState.duration = player.value.duration();
                seekTo(props.startAt);
                break;
              case "canplay":
                playerState.duration = player.value.duration();
                break;
              case "timeupdate":
                const _time = player.value.currentTime();
                playerState.percentagePlayed =
                  (_time / player.value.duration()) * 100;
                playerState.time = _time;
                break;
              case "play":
                playerState.playing = true;
                break;
              case "ended":
                togglePlay();
                break;
            }
            emit(customEvent, { event });
          });
        })();
      });
    }
  };

  return {
    ...toRefs(playerState),
    events,
    play,
    pause,
    togglePlay,
    toggleMute,
    setVolume,
    seekTo,
    seekToPercentage,
    setPlayBackRate,
    convertTimeToDuration,
    togglePictureInPicture,
    bindEvents,
    initializePlayer,
    disposePlayer,
  };
}
