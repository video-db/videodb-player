import {
  arrow,
  offset,
  Placement,
  shift,
  useFloating,
} from "@floating-ui/react";
import React, { useRef, useState } from "react";

interface CustomPopperProps {
  popperText?: string;
  isPopperActive?: boolean;
  className?: string;
  children: React.ReactNode;
}

export default function CustomPopper({
  popperText = "",
  className = "",
  isPopperActive = false,
  children,
}: CustomPopperProps) {
  const [isOpen, setIsOpen] = useState(false);
  const arrowRef = useRef<HTMLDivElement | null>(null);

  const { refs, floatingStyles, middlewareData } = useFloating({
    placement: "top" as Placement,
    middleware: [offset(10), shift(), arrow({ element: arrowRef })],
  });

  return (
    <div
      className={`custom-popper-wrapper ${className}`}
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      {/* Trigger / reference element */}
      <div ref={refs.setReference}>{children}</div>

      {/* Floating popper */}
      {isOpen && (
        <div
          ref={refs.setFloating}
          className={`popper vdb-p-hidden vdb-p-text-white sm:vdb-p-block ${
            !isPopperActive ? "vdb-p-invisible" : ""
          }`}
          style={floatingStyles}
        >
          {popperText}
          <div
            ref={arrowRef}
            className="popper-arrow"
            style={{
              left: middlewareData.arrow?.x,
              top: middlewareData.arrow?.y,
            }}
          />
        </div>
      )}
    </div>
  );
}
