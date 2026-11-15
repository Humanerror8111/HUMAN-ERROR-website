import Link from "next/link";
import { cn } from "@/lib/utilities/cn";
import type { ReactNode } from "react";

type Props = { href: string; children: ReactNode; variant?: "primary" | "ghost"; className?: string; external?: boolean };

export function Button({ href, children, variant = "primary", className, external }: Props) {
  const styles = cn(
    "inline-flex min-h-[48px] items-center justify-center gap-2 rounded-full px-7 font-mono text-xs font-semibold tracking-[0.2em] transition duration-300",
    variant === "primary"
      ? "bg-chrome text-void hover:bg-volt hover:text-white hover:shadow-[0_0_40px_-8px_#2d7bff]"
      : "border border-silver/25 text-chrome hover:border-volt hover:text-white",
    className,
  );
  if (external) return <a href={href} className={styles} target="_blank" rel="noopener noreferrer">{children}</a>;
  return <Link href={href} className={styles}>{children}</Link>;
}
