import type { NolaLink } from "@/data/links";

export default function LinkCard({ link }: { link: NolaLink }) {
  return (
    <a
      href={link.href}
      target="_blank"
      rel="noopener noreferrer"
      className="group relative flex flex-col gap-4 rounded-2xl border border-nola-gold/30 bg-gradient-to-b from-white/5 to-white/0 p-6 shadow-[0_0_0_1px_rgba(0,0,0,0.2)] backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-nola-gold hover:shadow-[0_10px_40px_-10px_rgba(247,201,72,0.45)]"
    >
      <span className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100 bg-[radial-gradient(circle_at_top_left,rgba(247,201,72,0.12),transparent_60%)]" />

      <div className="flex items-center justify-between">
        <div className="flex h-12 w-12 items-center justify-center rounded-full border border-nola-gold/50 bg-nola-purple-deep text-nola-gold-bright transition-colors duration-300 group-hover:bg-nola-gold group-hover:text-nola-purple-deep">
          {link.icon}
        </div>
        <span className="translate-x-0 text-nola-gold/60 transition-all duration-300 group-hover:translate-x-1 group-hover:text-nola-gold-bright">
          &#8599;
        </span>
      </div>

      <div>
        <p className="font-display text-xl text-nola-gold-bright">
          {link.title}
        </p>
        <p className="font-script text-lg leading-none text-nola-green mt-1">
          {link.subtitle}
        </p>
      </div>

      <p className="text-sm leading-relaxed text-foreground/70">
        {link.description}
      </p>

      <p className="mt-auto pt-2 text-xs uppercase tracking-[0.2em] text-nola-gold/50">
        {link.domain}
      </p>
    </a>
  );
}
