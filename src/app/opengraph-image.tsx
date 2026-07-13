import { ImageResponse } from "next/og";

export const alt = "Corneliuses — Laissez les bons temps rouler";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background:
            "radial-gradient(ellipse 70% 60% at 50% 0%, rgba(247, 201, 72, 0.25), transparent 60%), linear-gradient(180deg, #1f0329 0%, #140019 100%)",
          color: "#f7c948",
        }}
      >
        <div style={{ fontSize: 36, color: "#35c26b", fontStyle: "italic" }}>
          Bienvenue à
        </div>
        <div
          style={{
            fontSize: 120,
            fontWeight: 800,
            marginTop: 8,
            color: "#ffe08a",
          }}
        >
          Corneliuses
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 20,
            marginTop: 32,
          }}
        >
          <div style={{ width: 80, height: 2, background: "#f7c948" }} />
          <div style={{ fontSize: 28, color: "#f6e9c9" }}>
            Laissez les bons temps rouler
          </div>
          <div style={{ width: 80, height: 2, background: "#f7c948" }} />
        </div>
      </div>
    ),
    size,
  );
}
