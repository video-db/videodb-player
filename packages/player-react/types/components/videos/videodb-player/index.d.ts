import React, { ReactNode } from "react";
import { SubtitlesConfig } from "../../../context";
interface VideoPlayerProps {
    streamUrl: string;
    thumbnailUrl?: string;
    subtitlesConfig?: SubtitlesConfig;
    startAt?: number;
    autoPlay?: boolean;
    autoHideDuration?: number;
    defaultControls?: boolean;
    defaultOverlay?: boolean;
    defaultPlayBackRate?: number;
    aspectRatio?: string;
    debug?: boolean;
    children?: ReactNode;
    overlayContent?: ReactNode;
    controlsContent?: ReactNode;
}
declare const VideoPlayer: React.FC<VideoPlayerProps>;
export default VideoPlayer;
