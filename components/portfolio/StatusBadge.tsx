import type { ProjectStatus } from "@/types";

const label: Record<ProjectStatus, string> = {
  demonstration: "DEMONSTRATION",
  concept: "CONCEPT",
  "in-progress": "IN PROGRESS",
  completed: "COMPLETED",
};

export function StatusBadge({ status }: { status: ProjectStatus }) {
  const tone = status === "completed" ? "border-volt/50 text-volt" : status === "in-progress" ? "border-silver/40 text-silver" : "border-crimson/50 text-crimson";
  return <span className={`inline-block rounded-full border px-3 py-1 font-mono text-[10px] tracking-[0.25em] ${tone}`}>{label[status]}</span>;
}
