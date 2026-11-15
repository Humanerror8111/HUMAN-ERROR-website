import { cn } from "@/lib/utilities/cn";

export function SectionHeading({ eyebrow, title, text, align = "left", className }: { eyebrow: string; title: string; text?: string; align?: "left" | "center"; className?: string }) {
  return (
    <div className={cn("max-w-3xl", align === "center" && "mx-auto text-center", className)}>
      <p className="mb-4 flex items-center gap-3 font-mono text-[11px] tracking-[0.35em] text-volt">
        <span aria-hidden className="h-px w-8 bg-volt" />
        {eyebrow}
      </p>
      <h2 className="metal font-display text-3xl font-extrabold uppercase leading-[1.05] sm:text-5xl">{title}</h2>
      {text && <p className="mt-5 text-base leading-relaxed text-silver/80 sm:text-lg">{text}</p>}
    </div>
  );
}
