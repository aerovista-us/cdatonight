import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "CDA Tonight — What's worth doing tonight in Coeur d'Alene?";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", padding: "64px 72px", background: "radial-gradient(circle at 82% 12%, #4a2d72 0%, #17131f 36%, #090a0d 72%)", color: "#f6f4ef", fontFamily: "Arial, sans-serif" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div style={{ display: "flex", fontSize: 28, fontWeight: 900, letterSpacing: "0.04em" }}>🌙 CDA TONIGHT</div>
        <div style={{ display: "flex", fontSize: 20, color: "#b99cff", fontWeight: 800 }}>AEROVISTA LOCAL</div>
      </div>
      <div style={{ display: "flex", flexDirection: "column", maxWidth: 980 }}>
        <div style={{ display: "flex", color: "#b99cff", fontWeight: 800, fontSize: 22, letterSpacing: ".08em", marginBottom: 18 }}>COEUR D&apos;ALENE · VERIFIED LOCAL PICKS</div>
        <div style={{ display: "flex", flexDirection: "column", fontSize: 76, lineHeight: .96, fontWeight: 900, letterSpacing: "-.045em" }}>
          <span>What&apos;s actually worth</span><span style={{ color: "#beb3d0" }}>doing tonight?</span>
        </div>
      </div>
      <div style={{ display: "flex", justifyContent: "space-between", borderTop: "1px solid rgba(255,255,255,.16)", paddingTop: 28, fontSize: 23 }}>
        <span>Starting soon · Best bets · Official sources · My Night</span><span style={{ color: "#827a8e", fontSize: 18 }}>Built in Coeur d&apos;Alene</span>
      </div>
    </div>,
    size
  );
}
