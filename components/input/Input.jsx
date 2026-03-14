import React from "react";
import { twMerge } from "tailwind-merge";

const BASE_CLASSES =
  "outline-none border w-full p-2 rounded-md bg-transparent transition-colors duration-150 border-neutral-600 focus:ring-1 focus:ring-blue-500/30";
const ERROR_CLASSES =
  "border-red-500 focus:ring-red-500/30 focus:border-red-500";
const DISABLED_CLASSES = "opacity-50 cursor-not-allowed";

export default function Input({
  label = "",
  type = "text",
  placeholder = "",
  error = null,
  disabled = false,
  className = "",
  ...props
}) {
  const id = label ? label.toLowerCase().replace(/\s+/g, "-") : undefined;

  const classes = twMerge(
    BASE_CLASSES,
    error && ERROR_CLASSES,
    disabled && DISABLED_CLASSES,
    className,
  );

  return (
    <div className="w-full flex flex-col items-start gap-1">
      {label && (
        <label htmlFor={id} className="text-sm text-neutral-400">
          {label}
        </label>
      )}
      <input
        id={id}
        type={type}
        placeholder={placeholder}
        disabled={disabled}
        {...props}
        className={classes}
      />
      {error && <p className="text-red-500 text-xs">{error}</p>}
    </div>
  );
}
