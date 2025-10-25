// src/components/contacts/Departments.tsx
import { Mail, Phone } from "lucide-react";
import type { ContactsPayload } from "@/schemas/api";

type Dept = ContactsPayload["departments"][number];

function DeptCard({ title, phone, emailHref, emailLabel }: Dept) {
  return (
    <div>
      <h3 className="text-lg font-semibold border-b pb-2">{title}</h3>
      <div className="mt-4 space-y-3">
        <div className="flex items-center gap-2 text-sm">
          <Phone className="h-4 w-4 text-lime-600" />
          <span>{phone}</span>
        </div>
        <div className="flex items-center gap-2 text-sm">
          <Mail className="h-4 w-4 text-lime-600" />
          <a className="underline text-[#007e48]" href={emailHref}>
            {emailLabel}
          </a>
        </div>
      </div>
    </div>
  );
}

export default function Departments({ items }: { items: Dept[] }) {
  return (
    <div className="mx-auto max-w-6xl px-4">
      <div className="grid gap-10 md:grid-cols-4">
        {items.map((d) => (
          <DeptCard key={d.title} {...d} />
        ))}
      </div>
    </div>
  );
}
