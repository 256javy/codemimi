import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";

type Variant = "primary" | "secondary" | "ghost" | "success";

const base =
  "inline-flex items-center justify-center gap-2 rounded-full font-display font-semibold transition active:scale-95 disabled:opacity-50 disabled:active:scale-100 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-uva/40";

const variants: Record<Variant, string> = {
  primary:
    "bg-uva text-white shadow-lg shadow-uva/30 hover:bg-uva/90",
  secondary:
    "bg-white text-tinta border-2 border-uva/20 hover:border-uva/40",
  ghost: "bg-transparent text-tinta hover:bg-uva-claro",
  success: "bg-menta text-white shadow-lg shadow-menta/30 hover:bg-menta/90",
};

const sizes = {
  sm: "px-4 py-2 text-sm",
  md: "px-6 py-3 text-base",
  lg: "px-8 py-4 text-lg",
};

interface CommonProps {
  variant?: Variant;
  size?: keyof typeof sizes;
  children: ReactNode;
}

export function Button({
  variant = "primary",
  size = "md",
  className = "",
  children,
  ...props
}: CommonProps & ComponentProps<"button"> & { className?: string }) {
  return (
    <button
      className={`${base} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}

export function ButtonLink({
  variant = "primary",
  size = "md",
  className = "",
  children,
  ...props
}: CommonProps & ComponentProps<typeof Link> & { className?: string }) {
  return (
    <Link
      className={`${base} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </Link>
  );
}
