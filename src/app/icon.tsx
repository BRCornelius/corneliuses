import { ImageResponse } from "next/og";

export const size = { width: 64, height: 64 };
export const contentType = "image/png";

// One sixth of the ring's perimeter (Ramanujan approximation for
// an ellipse with rx=34, ry=23), so the three sugar colors each
// appear twice around the cake.
const SEG = 30.1;

function KingCake() {
  return (
    <svg width="58" height="58" viewBox="0 0 100 100">
      {/* confetti */}
      <circle cx="12" cy="16" r="4" fill="#35c26b" />
      <circle cx="88" cy="12" r="3.5" fill="#f7c948" />
      <circle cx="92" cy="78" r="4" fill="#7a1fa8" />
      <circle cx="8" cy="72" r="3" fill="#f7c948" />
      <circle cx="72" cy="6" r="3" fill="#7a1fa8" />
      <g transform="rotate(-10 50 52)">
        {/* dough base */}
        <ellipse
          cx="50"
          cy="52"
          rx="34"
          ry="23"
          fill="none"
          stroke="#c98a3c"
          strokeWidth="19"
        />
        {/* purple / green / gold sanding sugar bands */}
        <ellipse
          cx="50"
          cy="52"
          rx="34"
          ry="23"
          fill="none"
          stroke="#7a1fa8"
          strokeWidth="13"
          strokeDasharray={`${SEG} ${SEG * 2}`}
        />
        <ellipse
          cx="50"
          cy="52"
          rx="34"
          ry="23"
          fill="none"
          stroke="#35c26b"
          strokeWidth="13"
          strokeDasharray={`${SEG} ${SEG * 2}`}
          strokeDashoffset={-SEG}
        />
        <ellipse
          cx="50"
          cy="52"
          rx="34"
          ry="23"
          fill="none"
          stroke="#f7c948"
          strokeWidth="13"
          strokeDasharray={`${SEG} ${SEG * 2}`}
          strokeDashoffset={-SEG * 2}
        />
      </g>
      {/* sparkle glints */}
      <path d="M78,30 L80.5,36 L86.5,38.5 L80.5,41 L78,47 L75.5,41 L69.5,38.5 L75.5,36 Z" fill="#fff6e0" />
      <path d="M24,80 L25.8,84.2 L30,86 L25.8,87.8 L24,92 L22.2,87.8 L18,86 L22.2,84.2 Z" fill="#fff6e0" />
    </svg>
  );
}

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background:
            "radial-gradient(circle at 50% 35%, #3a0a4a 0%, #1f0329 70%)",
        }}
      >
        <KingCake />
      </div>
    ),
    size,
  );
}
