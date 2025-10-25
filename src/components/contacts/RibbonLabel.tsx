export default function RibbonLabel({
  children,
  color = "#179bd7", // ribbon blue
}: {
  children: React.ReactNode;
  color?: string;
}) {
  return (
    <div className="relative inline-block">
      <span
        className="px-4 py-2 text-white font-semibold text-sm rounded-r-lg shadow"
        style={{ backgroundColor: color }}
      >
        {children}
      </span>
    </div>
  );
}
