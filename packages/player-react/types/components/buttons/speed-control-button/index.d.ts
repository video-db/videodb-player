import { JSX } from "react";
interface PlaybackRateButtonProps {
    isActive?: boolean;
    autoHide?: boolean;
    speedOptions?: number[];
}
export default function PlaybackRateButton({ isActive, autoHide, speedOptions, }: PlaybackRateButtonProps): JSX.Element;
export {};
