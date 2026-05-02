"use client";

import { type ReactNode } from "react";
import { useContactModal } from "@/lib/modal-store";
import { cn } from "@/lib/utils";

type Props = {
  source?: string;
  className?: string;
  variant?: "accent" | "primary" | "ghost" | "outline" | "dark";
  size?: "sm" | "md" | "lg";
  children: ReactNode;
};

export default function CTAButton({
  source = "cta",
  className,
  variant = "accent",
  size = "md",
  children,
}: Props) {
  const open = useContactModal((s) => s.openModal);
  const variantClass =
    variant === "accent" ? "btn btn-accent"
    : variant === "primary" ? "btn btn-primary"
    : variant === "ghost" ? "btn btn-ghost"
    : variant === "outline" ? "btn btn-outline"
    : "btn btn-dark";
  const sizeClass = size === "sm" ? "btn-sm" : size === "lg" ? "btn-lg" : "";
  return (
    <button type="button" onClick={() => open(source)} className={cn(variantClass, sizeClass, className)}>
      {children}
    </button>
  );
}
