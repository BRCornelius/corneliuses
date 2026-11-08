import type { Metadata } from "next";
import HolidayCard from "@/components/HolidayCard";
import { holidayCards } from "@/data/holiday-cards";

const title = "Holiday Card — Corneliuses";
const description = `Zoom through ${holidayCards.length} years of Cornelius holiday cards, each one held in the next.`;

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
        <HolidayCard />
      </main>
    </div>
  );
}
