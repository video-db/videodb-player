import React from "react";
import "./styles.css";

export default function Ellipses({ children }: React.PropsWithChildren) {
  return (
    <span>
      {children}
      <span className="ellipses-container">
        <span className="one">.</span>
        <span className="two">.</span>
        <span className="three">.</span>
      </span>
    </span>
  );
}
