import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

const CAKE_D = "M50,90 L20,26 Q50,10 80,26 Z";
const ICING_D = "M20,26 Q50,10 80,26 L72,38 L62,29 L50,40 L38,29 L28,38 Z";

const SPRINKLES: { cx: number; cy: number; color: string }[] = [
  { cx: 35, cy: 20, color: "#6b1f9e" },
  { cx: 47, cy: 16, color: "#35c26b" },
  { cx: 59, cy: 17, color: "#f7c948" },
  { cx: 68, cy: 23, color: "#6b1f9e" },
  { cx: 31, cy: 31, color: "#f7c948" },
  { cx: 50, cy: 29, color: "#35c26b" },
  { cx: 69, cy: 31, color: "#6b1f9e" },
];

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
        <svg width="140" height="140" viewBox="0 0 100 100">
          <path d={CAKE_D} fill="#c98a3c" />
          <path d={ICING_D} fill="#fff6e0" />
          {SPRINKLES.map((s, i) => (
            <circle key={i} cx={s.cx} cy={s.cy} r="3.4" fill={s.color} />
          ))}
        </svg>
      </div>
    ),
    size,
  );
}
