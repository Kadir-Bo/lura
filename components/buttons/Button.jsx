import Link from "next/link";
import React from "react";
import { twMerge } from "tailwind-merge";

const TOOLTIP_POSITION_CLASSES = {
  top: "bottom-full left-1/2 -translate-x-1/2 mb-2",
  bottom: "top-full left-1/2 -translate-x-1/2 mt-2",
  left: "right-full top-1/2 -translate-y-1/2 mr-2",
  right: "left-full top-1/2 -translate-y-1/2 ml-2",
};

export default function Button({
  className = "",
  onClick,
  href = null,
  active = false,
  filled = false,
  tooltip = null,
  tooltipPosition = "top",
  activeClassName = "",
  disabled = false,
  children,
  ...props
}) {
  const classes = twMerge(
    // Base
    "relative group/btn w-full p-2 rounded-md font-medium outline-none",
    "border border-neutral-400 cursor-pointer",
    "transition-colors duration-150",
    // Hover (only when not disabled)
    "hover:bg-neutral-900/20 hover:border-neutral-200",
    // Filled variant
    filled &&
      "bg-white border-white text-neutral-950 hover:bg-white hover:border-white",
    // Active state
    active && "bg-neutral-900/10 border-neutral-200",
    active && activeClassName,
    // Disabled state
    disabled && "opacity-30 cursor-not-allowed pointer-events-none",
    className,
  );

  const tooltipElement = tooltip && (
    <span
      className={twMerge(
        "absolute whitespace-nowrap bg-neutral-800 text-neutral-100 text-sm px-2 py-1 rounded z-10",
        "opacity-0 pointer-events-none",
        "transition-opacity duration-200 group-hover/btn:opacity-100 group-hover/btn:delay-500",
        TOOLTIP_POSITION_CLASSES[tooltipPosition] ??
          TOOLTIP_POSITION_CLASSES.top,
      )}
    >
      {tooltip}
    </span>
  );

  if (href) {
    return (
      <Link href={href} className={classes} aria-disabled={disabled} {...props}>
        {tooltipElement}
        {children}
      </Link>
    );
  }

  return (
    <button
      className={classes}
      onClick={onClick}
      disabled={disabled}
      {...props}
    >
      {tooltipElement}
      {children}
    </button>
  );
}
