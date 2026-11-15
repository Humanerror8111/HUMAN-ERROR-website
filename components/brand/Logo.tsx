
import Image from "next/image";
import { cn } from "@/lib/utilities/cn";

export function LogoSymbol({
  className,
  id = "he",
}: {
  className?: string;
  id?: string;
}) {
  return (
    <span
      data-logo-id={id}
      className={cn(
        "relative inline-block overflow-hidden rounded-full",
        className
      )}
    >
      <Image
        src="/images/human-error-logo.jpg"
        alt="HUMAN ERROR symbol"
        fill
        sizes="144px"
        className="object-contain"
        priority
      />
    </span>
  );
}

export function Wordmark({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        "metal inline-flex flex-col items-start font-display font-extrabold uppercase leading-[0.9]",
        className
      )}
    >
      <span className="text-5xl tracking-[0.12em]">
        HUMAN
      </span>

      <span
        className="mt-1 text-3xl tracking-[0.18em] text-crimson"
        style={{ WebkitTextFillColor: "#d3213b" }}
      >
        ERROR
      </span>
    </span>
  );
}

export function Logo({
  compact = false,
  className,
}: {
  compact?: boolean;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "relative top-[1cm] inline-flex items-center gap-5",
        className
      )}
    >
      <LogoSymbol id="nav" className="h-36 w-36 shrink-0" />

      {!compact && <Wordmark />}
    </span>
  );
}
