import clsx from "clsx";
import React from "react";

const Label = ({
  children,
  animateRerendering,
  color,
}: {
  children: React.ReactNode;
  animateRerendering?: boolean;
  color?: "default" | "pink" | "blue" | "violet" | "cyan" | "orange";
}) => {
  return (
    <div
      className={clsx("rounded-full px-1.5 shadow-[0_0_1px_3px_black]", {
        "bg-neutral-800 text-neutral-300": color === "default",
        "bg-blue-pink text-white": color === "pink",
        "bg-blue-blue text-white": color === "blue",
        "bg-blue-cyan text-white": color === "cyan",
        "bg-blue-violet text-violet-100": color === "violet",
        "bg-blue-orange text-white": color === "orange",
        "animate-[highlight_1s_ease-in-out_1]": animateRerendering,
      })}
    >
      {children}
    </div>
  );
};
export const Boundary = ({
  children,
  labels = ["children"],
  size = "default",
  color = "default",
  animateRerendering = true,
}: {
  children: React.ReactNode;
  labels?: string[];
  size?: "small" | "default";
  color?: "default" | "pink" | "blue" | "violet" | "cyan" | "orange";
  animateRerendering?: boolean;
}) => {
  return (
    <div
      className={clsx("relative rounded-lg border border-dashed", {
        "p-3 lg:p-5": size === "small",
        "p-4 lg:p-9": size === "default",
        "border-neutral-700": color === "default",
        "border-pink-500": color === "pink",
        "border-blue-500": color === "blue",
        "border-cyan-500": color === "cyan",
        "border-violet-500": color === "violet",
        "border-orange-500": color === "orange",
        "animate-[rerender_1s_ease-in-out_1] text-pink-500": animateRerendering,
      })}
    >
      <div
        className={clsx(
          "absolute -top-2.5 flex gap-x-1 text-[9px] uppercase leading-4 tracking-widest",
          {
            "left-3 lg:left-5": size === "small",
            "left-4 lg:left-9": size === "default",
          }
        )}
      >
        {labels.map((label) => {
          return (
            <Label
              key={label}
              color={color}
              animateRerendering={animateRerendering}
            >
              {label}
            </Label>
          );
        })}
      </div>

      {children}
    </div>
  );
};
