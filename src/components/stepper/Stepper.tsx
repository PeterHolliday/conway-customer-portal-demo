import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

type Step = { key: string; title: string };
export function Stepper({ steps, current }: { steps: Step[]; current: number }) {
  return (
    <div className="flex items-center gap-4">
      {steps.map((s, i) => {
        const isCurrent = i === current;
        const isDone = i < current;
        return (
          <div key={s.key} className="flex items-center gap-2">
            <div
              className={cn(
                "size-7 rounded-full grid place-items-center text-sm font-medium",
                isDone ? "bg-[#007e48] text-white" : isCurrent ? "bg-muted text-foreground ring-2 ring-[#007e48]" : "bg-muted text-muted-foreground"
              )}
              aria-current={isCurrent ? "step" : undefined}
            >
              {isDone ? "✓" : i + 1}
            </div>
            <span className={cn("text-sm", isCurrent ? "font-semibold" : "text-muted-foreground")}>{s.title}</span>
            {i < steps.length - 1 && <Separator orientation="vertical" className="mx-2 h-6" />}
          </div>
        );
      })}
    </div>
  );
}