import Image from "next/image";

import { clientLogos } from "@/data/clients";

export function ClientMarquee() {
  const items = [...clientLogos, ...clientLogos];

  return (
    <div className="border-y border-line bg-mist py-5">
      <p className="mb-6 text-center font-semibold font-mono text-[0.6875rem] tracking-[0.22em] text-ink-muted uppercase">
        Ils nous font confiance
      </p>
      <div className="mask-fade-x overflow-hidden">
        <ul className="animate-marquee flex w-max items-center gap-6 md:gap-8">
          {items.map((client, index) => (
            <li
              key={`${client.name}-${index}`}
              aria-hidden={index >= clientLogos.length}
              className="relative h-16 w-32 shrink-0 overflow-hidden rounded-xl border border-line bg-paper md:h-20 md:w-40"
            >
              <Image
                src={client.src}
                alt={client.name}
                fill
                sizes="160px"
                className="object-contain p-4 opacity-80 grayscale transition duration-300 hover:opacity-100 hover:grayscale-0"
              />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
