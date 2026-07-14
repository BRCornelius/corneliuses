import { ImageResponse } from "next/og";

export const size = { width: 64, height: 64 };
export const contentType = "image/png";

const PETAL_D =
  "M50,60 C38,47 37,20 50,3 C63,20 62,47 50,60 Z";

function FleurDeLis() {
  return (
    <svg width="46" height="46" viewBox="0 0 100 100">
      <path
        d={PETAL_D}
        fill="#f7c948"
        transform="translate(50 60) rotate(-36) scale(0.78) translate(-50 -60)"
      />
      <path
        d={PETAL_D}
        fill="#f7c948"
        transform="translate(50 60) rotate(36) scale(0.78) translate(-50 -60)"
      />
      <path d={PETAL_D} fill="#f7c948" />
      <circle cx="20" cy="64" r="6" fill="#35c26b" />
      <circle cx="80" cy="64" r="6" fill="#35c26b" />
      <rect x="22" y="59" width="56" height="10" rx="5" fill="#35c26b" />
      <rect x="46" y="67" width="8" height="16" rx="4" fill="#35c26b" />
      <circle cx="44" cy="84" r="5" fill="#35c26b" />
      <circle cx="56" cy="84" r="5" fill="#35c26b" />
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
        <FleurDeLis />
      </div>
    ),
    size,
  );
}
