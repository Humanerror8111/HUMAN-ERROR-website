import { Globe, ShoppingCart, GraduationCap, UserRound, Code2, PenTool, BrainCircuit, RefreshCw, Wrench, Workflow, Layers } from "lucide-react";
import type { Service } from "@/types";

const map = { globe: Globe, cart: ShoppingCart, school: GraduationCap, user: UserRound, code: Code2, pen: PenTool, brain: BrainCircuit, refresh: RefreshCw, wrench: Wrench, workflow: Workflow, layers: Layers };

export function ServiceIcon({ name, className }: { name: Service["icon"]; className?: string }) {
  const Icon = map[name];
  return <Icon className={className} aria-hidden strokeWidth={1.5} />;
}

/** Abstract visual panel per service (no stock images). */
export function ServiceVisual({ name, index }: { name: Service["icon"]; index: number }) {
  const hue = index % 3 === 0 ? "from-volt/25" : index % 3 === 1 ? "from-silver/15" : "from-crimson/20";
  return (
    <div aria-hidden className={`relative flex aspect-[4/3] items-center justify-center overflow-hidden rounded-2xl hairline bg-gradient-to-br ${hue} via-graphite to-void`}>
      <div className="grid-bg absolute inset-0" />
      <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-volt/10 blur-3xl" />
      <ServiceIcon name={name} className="relative h-16 w-16 text-chrome sm:h-20 sm:w-20" />
    </div>
  );
}
