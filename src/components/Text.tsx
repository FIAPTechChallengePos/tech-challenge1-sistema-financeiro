import React from "react";

type Variant =
  | "title-bold"
  | "title-regular"
  | "subtitle"
  | "text-regular"
  | "text-regular-special"
  | "text-small"
  | "text-small-bold";

const variantClasses: Record<Variant, string> = {
  "title-bold": "text-[32px] font-bold leading-[40px]",
  "title-regular": "text-[24px] font-normal",
  "subtitle": "text-[20px] font-semibold",
  "text-regular": "text-[16px] font-bold",
  "text-regular-special": "text-[16px] font-normal",
  "text-small": "text-[14px] font-normal",
  "text-small-bold": "text-[14px] font-bold",
};

interface TextProps {
  variant?: Variant;
  color?: string;
  as?: "h1" | "h2" | "span" | "p";
  children: React.ReactNode;
}

export function Text({
  variant = "text-regular",
  color = "text-white",
  as: Tag = "p",
  children,
}: TextProps) {
  const classes = `font-lato leading-[20px] ${variantClasses[variant]} ${color}`;
  return <Tag className={classes}>{children}</Tag>;
} 