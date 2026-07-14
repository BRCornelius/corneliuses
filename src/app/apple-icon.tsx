import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

const CRESCENT_D = "M50,18 A32,32 0 0,0 50,82 A40,40 0 0,1 50,18 Z";

const STAR_D =
  "M58,42 L61.5,52.1 L72.3,52.4 L63.7,58.9 L66.8,69.1 L58,63 L49.2,69.1 L52.3,58.9 L43.7,52.4 L54.5,52.1 Z";

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
        <svg width="136" height="136" viewBox="0 0 100 100">
          <path d={CRESCENT_D} fill="#f7c948" />
          <path d={STAR_D} fill="#35c26b" />
        </svg>
      </div>
    ),
    size,
  );
}
