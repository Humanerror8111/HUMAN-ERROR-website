
import { ImageResponse } from "next/og";

export const alt = "HUMAN ERROR: Digital Studio & AI Creative Platform";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OG() {
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
            "radial-gradient(circle at 50% 60%, #0d2250, #050507 65%)",
          color: "#eef1f6",
        }}
      >
        <div style={{ display: "flex", fontSize: 110, fontWeight: 900, letterSpacing: 10 }}>
          HUMAN
          <span style={{ color: "#d3213b" }}>/</span>
          ERROR
        </div>

        <div
          style={{
            display: "flex",
            marginTop: 24,
            fontSize: 28,
            letterSpacing: 8,
            color: "#9aa2b4",
          }}
        >
          WE BUILD THE DIGITAL FUTURE
        </div>
      </div>
    ),
    size
  );
}
