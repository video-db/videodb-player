import React, { CSSProperties } from "react";
import "./styles.css";
type ButtonState = "default" | "active" | "disabled" | "hidden";
interface CustomButtonProps {
    buttonState?: ButtonState;
    defaultStateCss?: string;
    activeStateCss?: string;
    disabledStateCss?: string;
    onClickAction?: () => void;
    children: React.ReactNode;
    className?: string;
    style?: CSSProperties;
}
declare const CustomButton: React.FC<CustomButtonProps>;
export default CustomButton;
