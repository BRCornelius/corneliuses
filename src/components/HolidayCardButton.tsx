import Link from "next/link";

const bulbs = ["#ffe08a", "#35c26b", "#f7c948", "#ff8a8a", "#8ad4ff", "#ffe08a", "#35c26b"];

function Snowflake({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth={1.6}
      strokeLinecap="round"
      aria-hidden="true"
    >
      <path d="M12 2v20M3.3 7l17.4 10M3.3 17 20.7 7" />
      <path d="m9.5 3.5 2.5 2 2.5-2M9.5 20.5l2.5-2 2.5 2M4 10.2l3.1-.6L6.2 6.6M17.8 17.4l-1-3 3.2-.6M4 13.8l3.1.6-1 3M20 10.2l-3.1-.6 1-3" />
    </svg>
  );
}

/** Seasonal link to the holiday card page: winter lights, nothing religious. */
export default function HolidayCardButton() {
  return (
    <Link
      href="/card"
      className="group relative mt-8 inline-flex items-center gap-3 rounded-full border border-nola-gold/50 bg-white/5 px-6 pb-3 pt-4 text-nola-gold-bright backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-nola-gold hover:shadow-[0_10px_40px_-10px_rgba(247,201,72,0.55)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-nola-gold"
    >
      {/* A string of twinkle lights along the top edge. */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-6 -top-1.5 flex justify-between"
      >
        {bulbs.map((color, i) => (
          <span
            key={i}
            className="twinkle h-2.5 w-2 rounded-full"
            style={{
              backgroundColor: color,
              boxShadow: `0 0 8px ${color}`,
              animationDelay: `${(i * 0.37) % 1.6}s`,
            }}
          />
        ))}
      </span>

      <Snowflake className="h-5 w-5 transition-transform duration-700 group-hover:rotate-60" />
      <span className="font-display text-lg font-bold tracking-wide">
        Holiday Card
      </span>
      <Snowflake className="h-5 w-5 transition-transform duration-700 group-hover:-rotate-60" />
    </Link>
  );
}
