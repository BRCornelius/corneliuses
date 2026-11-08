import type { Metadata } from "next";
import Link from "next/link";
import HolidayCard from "@/components/HolidayCard";
import { holidayCards } from "@/data/holiday-cards";

const title = "Holiday Card — Corneliuses";
const description =
  "Zoom through the Cornelius holiday cards, each one held in the next.";

export const metadata: Metadata = {
  title,
  description,
  openGraph: { title, description, url: "/card" },
  twitter: { title, description },
};

export default function CardPage() {
  return (
    <div className="hero-glow flex min-h-dvh flex-col text-foreground">
      <div className="mardi-stripe" />
      <main className="flex flex-1 flex-col items-center px-4 py-6 sm:px-6 sm:py-8">
        {holidayCards.length > 0 ? (
          <HolidayCard />
        ) : (
          <div className="mt-24 flex flex-col items-center gap-6">
            <p className="font-script text-2xl text-nola-green-bright">
              This year&rsquo;s card is on its way.
            </p>
            <Link
              href="/"
              className="rounded-full border border-nola-gold/40 px-4 py-2 text-sm text-nola-gold-bright transition-colors hover:border-nola-gold hover:bg-nola-gold/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-nola-gold"
            >
              <span aria-hidden="true">&larr; </span>corneliuses.com
            </Link>
          </div>
        )}
      </main>
    </div>
  );
}
