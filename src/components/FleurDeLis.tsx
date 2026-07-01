export default function FleurDeLis({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 100 100"
      className={className}
      fill="currentColor"
      aria-hidden="true"
    >
      <path
        d="M50 4c3 9 3 18-1 26 6-4 10-11 10-19 8 5 12 14 9 24-2 7-8 12-15 14 3 2 7 3 11 3 2 6-1 12-7 15 3 4 3 9 0 13-3-3-7-4-11-3 1 4 1 8-1 11-2-3-2-7-1-11-4-1-8 0-11 3-3-4-3-9 0-13-6-3-9-9-7-15 4 0 8-1 11-3-7-2-13-7-15-14-3-10 1-19 9-24 0 8 4 15 10 19-4-8-4-17-1-26 1 3 2 6 4 9 2-3 3-6 4-9z"
      />
    </svg>
  );
}
