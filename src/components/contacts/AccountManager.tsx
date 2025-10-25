import { Mail, Phone } from "lucide-react";

export default function AccountManager({
  name,
  phone,
  email,
}: {
  name: string;
  phone: string;
  email: string;
}) {
  return (
    <div className="mx-auto max-w-6xl px-4">
      <h2 className="mt-6 text-2xl font-semibold border-b pb-2">{name}</h2>

      <div className="mt-4 flex flex-wrap gap-6 text-[15px]">
        <div className="flex items-center gap-2">
          <Phone className="h-4 w-4 text-lime-600" />
          <span>{phone}</span>
        </div>

        <div className="flex items-center gap-2">
          <Mail className="h-4 w-4 text-lime-600" />
          <a className="text-[#007e48] underline" href={`mailto:${email}`}>
            {email}
          </a>
        </div>
      </div>
    </div>
  );
}
