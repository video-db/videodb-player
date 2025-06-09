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

export default function CustomButton({
  buttonState = "default",
  defaultStateCss = "vdb-p-bg-black-45 vdb-p-border vdb-p-border-yellow vdb-p-backdrop-blur hover:vdb-p-bg-random-313131 hover:vdb-p-border-random-8e6200",
  activeStateCss = "chapter-button-active-lg vdb-p-border vdb-p-border-yellow pale-yellow",
  disabledStateCss = "vdb-p-bg-black-45 vdb-p-opacity-20 vdb-p-border vdb-p-border-yellow vdb-p-backdrop-blur vdb-p-cursor-not-allowed vdb-p-pointer-events-none",
  onClickAction,
  children,
  className = "",
  style,
}: CustomButtonProps) {
  const getCustomCss = () => {
    switch (buttonState) {
      case "active":
        return activeStateCss;
      case "disabled":
        return disabledStateCss;
      case "hidden":
        return "vdb-p-hidden";
      default:
        return defaultStateCss;
    }
  };

  return (
    <button
      className={`vdb-p-flex vdb-p-items-center vdb-p-justify-center vdb-p-rounded-8 vdb-p-font-semibold vdb-p-text-white focus:vdb-p-outline-none ${getCustomCss()} ${className}`}
      onClick={onClickAction}
      style={style}
    >
      {children}
    </button>
  );
}
