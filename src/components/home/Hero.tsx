import Image from "next/image";

export default function Hero({ firstName = "Peter" }: { firstName?: string }) {
  return (
    <div className="relative w-full">
      <div className="relative mx-auto max-w-6xl h-[280px] sm:h-[360px] md:h-[420px] rounded-t-xl overflow-hidden">
        <Image
          src="/plant-hero.png"
          alt="FM Conway asphalt plant"
          fill
          priority
          className="object-cover"
        />

        {/* black pill top-left */}
        <div className="absolute left-0 top-4">
          <div className="bg-black/90 text-white rounded-r-lg px-5 py-3 shadow">
            <div className="text-[10px] uppercase tracking-wider opacity-80">
              Delivered cash sale
            </div>
            <div className="font-semibold">Welcome, {firstName}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
