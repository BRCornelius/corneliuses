import { ImageResponse } from "next/og";

export const size = { width: 64, height: 64 };
export const contentType = "image/png";

const RIVER_D = "M78,14 C40,10 16,34 16,60 C16,80 34,90 56,88";

const STAR_D =
  "M30,52 L33,60.8 L42.3,61 L34.9,66.6 L37.6,75.5 L30,70.1 L22.4,75.5 L25.1,66.6 L17.7,61 L27,60.8 Z";

function RiverBend() {
  return (
    <svg width="52" height="52" viewBox="0 0 100 100">
      <path
        d={RIVER_D}
        fill="none"
        stroke="#f7c948"
        strokeWidth="15"
        strokeLinecap="round"
      />
      <path d={STAR_D} fill="#35c26b" />
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
        <RiverBend />
      </div>
    ),
    size,
  );
}
