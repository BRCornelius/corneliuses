import { ImageResponse } from "next/og";

export const size = { width: 64, height: 64 };
export const contentType = "image/png";

// One sixth of the ring's perimeter (Ramanujan approximation for
// an ellipse with rx=36, ry=24), so the three sugar colors each
// appear twice around the cake.
const SEG = 31.7;

function KingCake() {
  return (
    <svg width="54" height="54" viewBox="0 0 100 100">
      {/* dough base */}
      <ellipse
        cx="50"
        cy="52"
        rx="36"
        ry="24"
        fill="none"
        stroke="#c98a3c"
        strokeWidth="20"
      />
      {/* purple / green / gold sanding sugar bands */}
      <ellipse
        cx="50"
        cy="52"
        rx="36"
        ry="24"
        fill="none"
        stroke="#7a1fa8"
        strokeWidth="14"
        strokeDasharray={`${SEG} ${SEG * 2}`}
      />
      <ellipse
        cx="50"
        cy="52"
        rx="36"
        ry="24"
        fill="none"
        stroke="#35c26b"
        strokeWidth="14"
        strokeDasharray={`${SEG} ${SEG * 2}`}
        strokeDashoffset={-SEG}
      />
      <ellipse
        cx="50"
        cy="52"
        rx="36"
        ry="24"
        fill="none"
        stroke="#f7c948"
        strokeWidth="14"
        strokeDasharray={`${SEG} ${SEG * 2}`}
        strokeDashoffset={-SEG * 2}
      />
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
