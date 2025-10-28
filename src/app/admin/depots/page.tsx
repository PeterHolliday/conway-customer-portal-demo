// app/admin/depots/page.tsx
"use client";

type Depot = {
  id: string;
  name: string;
  code: string;
};
import useSWR from "swr";
import Link from "next/link";

const fetcher = (url: string) => fetch(url).then(r => r.json());

export default function DepotsListPage() {
  const { data, error, isLoading } = useSWR("/api/depots", fetcher);

  if (error) return <div className="p-6 text-red-600">Failed to load depots.</div>;
  if (isLoading) return <div className="p-6">Loading…</div>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-4">Depots</h1>
      <ul className="space-y-2">
        {data?.map((d: Depot) => (
          <li key={d.id} className="border rounded p-3 hover:bg-gray-50">
            <div className="flex items-center justify-between">
              <div>
                <div className="font-medium">{d.name}</div>
                <div className="text-xs text-gray-500">{d.code}</div>
              </div>
              <Link className="text-[#007e48] underline" href={`/admin/depots/${d.id}/config`}>
                Open config
              </Link>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
