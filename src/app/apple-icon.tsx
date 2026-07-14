import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

// One sixth of the ring's perimeter (Ramanujan approximation for
// an ellipse with rx=36, ry=24), so the three sugar colors each
// appear twice around the cake.
const SEG = 31.7;

export default function AppleIcon() {
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
        <svg width="150" height="150" viewBox="0 0 100 100">
          <ellipse
            cx="50"
            cy="52"
            rx="36"
            ry="24"
            fill="none"
            stroke="#c98a3c"
            strokeWidth="20"
          />
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
      </div>
    ),
    size,
  );
}
