import { Button } from "@/components/ui/button";

export function CollectionCard({ index, onRemove, children }: {
  index: number;
  onRemove: () => void;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-lg border">
      <div className="flex items-center justify-between bg-[#007e48] text-white rounded-t-lg px-4 py-2">
        <div className="font-semibold">Collection {index + 1}</div>
        <Button type="button" variant="secondary" size="sm" onClick={onRemove}>
          Remove
        </Button>
      </div>
      <div className="p-4 space-y-4">{children}</div>
    </div>
  );
}
