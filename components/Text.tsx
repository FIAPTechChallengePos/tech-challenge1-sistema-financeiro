import React from "react";
import { BaseTextProps } from "../src/types/components";

type Variant =
  | "title-bold"
  | "title-regular"
  | "subtitle"
  | "text-regular"
  | "text-regular-special"
  | "text-small"
  | "text-small-bold";

interface TextProps extends BaseTextProps {
  variant?: Variant;
  color?: string;
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "span" | "p" | "div";
}

const variantClasses: Record<Variant, string> = {
  "title-bold": "text-[32px] font-bold leading-[40px]",
  "title-regular": "text-[24px] font-normal",
  "subtitle": "text-[20px] font-semibold",
  "text-regular": "text-[16px] font-bold",
  "text-regular-special": "text-[16px] font-normal",
  "text-small": "text-[14px] font-normal",
  "text-small-bold": "text-[14px] font-bold",
};

export function Text({
  variant = "text-regular",
  color = "text-white",
  as: Tag = "p",
  children,
  align = "left",
  weight,
  'aria-label': ariaLabel,
  'aria-describedby': ariaDescribedBy,
  'aria-live': ariaLive,
  role,
  tabIndex,
  ...props
}: TextProps) {
  const weightClasses = weight ? {
    light: "font-light",
    normal: "font-normal", 
    medium: "font-medium",
    semibold: "font-semibold",
    bold: "font-bold"
  }[weight] : "";

  const alignClasses = {
    left: "text-left",
    center: "text-center", 
    right: "text-right",
    justify: "text-justify"
  }[align];

  const accessibilityClasses = `
    focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2
    dark:focus:ring-blue-violet-500
    high-contrast:focus:ring-4 high-contrast:focus:ring-offset-4
    reduced-motion:transition-none
  `;

  const classes = `
    font-lato leading-[20px] 
    ${variantClasses[variant]} 
    ${color} 
    ${weightClasses}
    ${alignClasses}
    ${accessibilityClasses}
  `.trim();

  return (
    <Tag 
      className={classes}
      aria-label={ariaLabel}
      aria-describedby={ariaDescribedBy}
      aria-live={ariaLive}
      role={role}
      tabIndex={tabIndex}
      {...props}
    >
      {children}
    </Tag>
  ); 