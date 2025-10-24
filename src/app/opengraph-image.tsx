import { ImageResponse } from "next/og";
import { siteConfig } from "@/config/site";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: 64,
          background: "#0b0b0c",
          color: "#fff",
          fontSize: 56,
        }}
      >
        <div style={{ fontSize: 32, opacity: 0.7 }}>{siteConfig.title}</div>
        <div style={{ fontWeight: 700 }}>{siteConfig.name}</div>
        <div style={{ marginTop: 24, fontSize: 28, opacity: 0.8 }}>
          {siteConfig.description}
        </div>
      </div>
    ),
    size,
  );
}

