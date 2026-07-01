import FleurDeLis from "@/components/FleurDeLis";
import LinkCard from "@/components/LinkCard";
import { links } from "@/data/links";

export default function Home() {
  return (
    <div className="hero-glow flex min-h-dvh flex-col text-foreground">
      <div className="mardi-stripe" />

      <header className="relative overflow-hidden px-6 pt-20 pb-16 text-center sm:pt-28 sm:pb-24">
        <FleurDeLis className="float-slow pointer-events-none absolute left-6 top-10 h-16 w-16 text-nola-gold/20 sm:left-16 sm:h-24 sm:w-24" />
        <FleurDeLis className="float-slow-delayed pointer-events-none absolute right-6 top-16 h-14 w-14 text-nola-green/25 sm:right-16 sm:h-20 sm:w-20" />

        <p className="font-script text-2xl text-nola-green sm:text-3xl">
          Bienvenue à
        </p>
        <h1 className="gaslamp-glow font-display shimmer-text mt-2 text-5xl font-black tracking-tight sm:text-7xl">
          Corneliuses
        </h1>
        <p className="mx-auto mt-6 max-w-xl text-balance text-base text-foreground/70 sm:text-lg">
          One address for every corner of the courtyard — pull up a chair,
          the second line is just getting started.
        </p>

        <div className="mt-8 flex items-center justify-center gap-3 text-nola-gold/60">
          <span className="h-px w-12 bg-nola-gold/40" />
          <FleurDeLis className="h-5 w-5" />
          <span className="h-px w-12 bg-nola-gold/40" />
        </div>
      </header>

      <main className="flex-1 px-6 pb-24">
        <div className="mx-auto grid w-full max-w-5xl grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {links.map((link) => (
            <LinkCard key={link.href} link={link} />
          ))}
        </div>
      </main>

      <footer className="relative px-6 pb-10 text-center">
        <div className="mardi-stripe mb-8" />
        <div className="mx-auto flex max-w-md items-center justify-center gap-3 text-nola-gold/50">
          <FleurDeLis className="h-4 w-4" />
          <p className="font-script text-lg text-nola-gold/70">
            Laissez les bons temps rouler
          </p>
          <FleurDeLis className="h-4 w-4" />
        </div>
        <p className="mt-4 text-xs text-foreground/40">
          &copy; {new Date().getFullYear()} Corneliuses. All rights reserved.
        </p>
      </footer>
    </div>
  );
}
