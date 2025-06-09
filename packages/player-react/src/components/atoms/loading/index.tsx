import React from "react";
import "./styles.css";

export default function Loading() {
  return (
    <div className="lds-spinner">
      {Array.from({ length: 12 }).map((_, i) => (
        <div key={i}></div>
      ))}
    </div>
  );
}
