import { QRCodeSVG } from "qrcode.react";
import aeLogo from "@/assets/ae-logo.jpg";
import scannerQr from "@/assets/scanner-qr.jpeg";
import { forwardRef } from "react";
import { Star, Shield, Crown, Gem, Award } from "lucide-react";

export type BadgeTier = "silver" | "gold" | "platinum" | "diamond";

const tierConfig: Record<BadgeTier, { label: string; colors: { border: string; text: string; bg: string; glow: string }; icon: typeof Star }> = {
  silver: {
    label: "SILVER",
    colors: { border: "rgba(192,192,192,0.6)", text: "#C0C0C0", bg: "rgba(192,192,192,0.1)", glow: "0 0 12px rgba(192,192,192,0.3)" },
    icon: Shield,
  },
  gold: {
    label: "GOLD",
    colors: { border: "rgba(255,215,0,0.6)", text: "#FFD700", bg: "rgba(255,215,0,0.1)", glow: "0 0 12px rgba(255,215,0,0.3)" },
    icon: Award,
  },
  platinum: {
    label: "PLATINUM",
    colors: { border: "rgba(180,220,255,0.6)", text: "#B4DCFF", bg: "rgba(180,220,255,0.1)", glow: "0 0 12px rgba(180,220,255,0.3)" },
    icon: Crown,
  },
  diamond: {
    label: "DIAMOND",
    colors: { border: "rgba(185,242,255,0.6)", text: "#B9F2FF", bg: "rgba(185,242,255,0.1)", glow: "0 0 16px rgba(185,242,255,0.4)" },
    icon: Gem,
  },
};

interface BadgeCardProps {
  name: string;
  referralCode: string;
  state: string;
  profileImage: string | null;
  socialHandle: string;
  imageZoom: number;
  imagePositionX: number;
  imagePositionY: number;
  tier: BadgeTier;
}

const BadgeCard = forwardRef<HTMLDivElement, BadgeCardProps>(
  ({ name, referralCode, state, profileImage, socialHandle, imageZoom, imagePositionX, imagePositionY, tier }, ref) => {
    const tierInfo = tierConfig[tier] || tierConfig.silver;
    const TierIcon = tierInfo.icon;

    const qrData = JSON.stringify({
      name: name || "Unknown",
      state: state || "N/A",
      referralCode: referralCode || "AE00000",
      socialHandle: socialHandle || "",
      website: "aecontest.online",
      tier: tierInfo.label,
      verified: true,
    });

    const IMG_SIZE = 180;

    return (
      <div
        ref={ref}
        className="relative w-[320px] badge-texture rounded-2xl overflow-hidden select-none"
        style={{
          minHeight: 540,
          border: `1px solid ${tierInfo.colors.border}`,
          boxShadow: tierInfo.colors.glow,
        }}
      >
        <div className="absolute inset-0 scanline pointer-events-none z-10" />
        <div className="sparkle" style={{ top: '8%', left: '5%', animationDelay: '0s' }} />
        <div className="sparkle" style={{ top: '5%', right: '8%', animationDelay: '0.5s' }} />
        <div className="sparkle" style={{ top: '30%', right: '3%', animationDelay: '1s' }} />
        <div className="sparkle" style={{ bottom: '15%', left: '4%', animationDelay: '1.5s' }} />

        {/* Header */}
        <div className="relative z-20 text-center pt-5 pb-3">
          <h2 className="font-display font-black text-2xl tracking-[0.25em] text-foreground glow-text-white italic">
            AE <span style={{ color: tierInfo.colors.text }} className="glow-text">CONTEST</span>
          </h2>
        </div>

        {/* Square Profile Image */}
        <div className="relative z-20 flex flex-col items-center px-6 mt-2">
          <div
            className="relative overflow-hidden"
            style={{
              width: IMG_SIZE,
              height: IMG_SIZE,
              borderRadius: '50%',
              border: `2px solid ${tierInfo.colors.border}`,
              boxShadow: tierInfo.colors.glow,
            }}
          >
            {profileImage ? (
              <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', overflow: 'hidden' }}>
                <img
                  src={profileImage}
                  alt={name || "Profile"}
                  style={{
                    display: 'block',
                    width: `${imageZoom * 100}%`,
                    height: `${imageZoom * 100}%`,
                    objectFit: 'cover',
                    marginLeft: `${imagePositionX}%`,
                    marginTop: `${imagePositionY}%`,
                  }}
                  crossOrigin="anonymous"
                />
              </div>
            ) : (
              <div className="w-full h-full bg-secondary flex items-center justify-center">
                <span className="text-muted-foreground font-display text-4xl">
                  {name ? name.charAt(0).toUpperCase() : "?"}
                </span>
              </div>
            )}
          </div>

          {/* Verified Member Badge */}
          <div
            className="mt-3 flex items-center gap-2 px-5 py-1.5 rounded-full bg-secondary/80"
            style={{ border: `1px solid ${tierInfo.colors.border}` }}
          >
            <Star className="w-3.5 h-3.5" style={{ fill: tierInfo.colors.text, color: tierInfo.colors.text }} />
            <span className="font-display text-[10px] tracking-[0.3em] uppercase font-bold" style={{ color: tierInfo.colors.text }}>
              Verified Member
            </span>
            <Star className="w-3.5 h-3.5" style={{ fill: tierInfo.colors.text, color: tierInfo.colors.text }} />
          </div>
        </div>

        {/* Name Section */}
        <div className="relative z-20 mx-5 mt-4 p-3 rounded-lg bg-secondary/30" style={{ border: `1px solid ${tierInfo.colors.border}30` }}>
          <p className="text-[10px] tracking-[0.2em] text-muted-foreground font-display uppercase mb-1">Name:</p>
          <p className="font-display font-bold text-lg tracking-wide text-foreground">{name || "Your Name"}</p>
        </div>

        {/* Referral Code + State Row */}
        <div className="relative z-20 mx-5 mt-2 grid grid-cols-2 gap-2">
          <div className="p-3 rounded-lg bg-secondary/30" style={{ border: `1px solid ${tierInfo.colors.border}30` }}>
            <p className="text-[10px] tracking-[0.2em] text-muted-foreground font-display uppercase mb-1">Referral Code:</p>
            <p className="font-display font-black text-lg glow-text" style={{ color: tierInfo.colors.text }}>{referralCode || "AE00000"}</p>
          </div>
          <div className="p-3 rounded-lg bg-secondary/30" style={{ border: `1px solid ${tierInfo.colors.border}30` }}>
            <p className="text-[10px] tracking-[0.2em] text-muted-foreground font-display uppercase mb-1">State:</p>
            <p className="font-display font-bold text-sm glow-text" style={{ color: tierInfo.colors.text }}>{state || "Your State"}</p>
          </div>
        </div>

        {/* Scanner + QR Section */}
        <div className="relative z-20 mx-5 mt-3 flex items-center justify-between gap-3">
          {/* Scanner QR (replacing hologram) */}
          <div className="flex-shrink-0 rounded-lg overflow-hidden" style={{ border: `1px solid ${tierInfo.colors.border}`, boxShadow: tierInfo.colors.glow }}>
            <img src={scannerQr} alt="Scanner QR" className="w-[80px] h-[80px] object-cover" crossOrigin="anonymous" />
          </div>

          {/* Data QR code + Scan to download label side by side */}
          <div className="flex items-center gap-2 flex-shrink-0">
            <div className="flex flex-col items-center gap-1">
              <div className="px-2 py-3 rounded" style={{ background: tierInfo.colors.text }}>
                <span className="font-display text-[7px] tracking-widest font-bold" style={{ writingMode: 'vertical-rl', textOrientation: 'mixed', color: '#0a0a0a' }}>
                  SCAN TO DOWNLOAD
                </span>
              </div>
              <span style={{ color: tierInfo.colors.text }} className="text-lg">▶</span>
            </div>
            <div className="flex flex-col items-center gap-1">
              <div className="p-2 bg-foreground rounded-lg" style={{ border: `1px solid ${tierInfo.colors.border}` }}>
                <QRCodeSVG value={qrData} size={72} bgColor="#f0f0f0" fgColor="#0a0a0a" level="M" />
              </div>
              <div className="px-3 py-0.5 rounded bg-secondary/50" style={{ border: `1px solid ${tierInfo.colors.border}` }}>
                <span className="font-display text-[9px] tracking-wider font-bold" style={{ color: tierInfo.colors.text }}>{referralCode || "AE00000"}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="relative z-20 mx-5 mt-2">
          <p className="text-[7px] text-muted-foreground tracking-wider uppercase">Unauthorised copying of card is prohibited</p>
        </div>

        {/* Divider */}
        <div className="relative z-20 mx-5 mt-3 h-px" style={{ background: `linear-gradient(to right, transparent, ${tierInfo.colors.border}, transparent)` }} />

        {/* Bottom Logo */}
        <div className="relative z-20 flex items-center justify-center gap-3 py-4">
          <img src={aeLogo} alt="AE Contest" className="h-10 w-10 rounded-full object-cover" style={{ border: `1px solid ${tierInfo.colors.border}` }} loading="lazy" />
          <div>
            <p className="font-display font-bold text-sm tracking-wider text-foreground">AE <span style={{ color: tierInfo.colors.text }}>CONTEST</span></p>
            <p className="text-[8px] tracking-[0.3em] text-muted-foreground">aecontest.online</p>
          </div>
        </div>

        {/* Corner accents */}
        <div className="absolute top-0 left-0 w-8 h-8 rounded-tl-2xl" style={{ borderTop: `2px solid ${tierInfo.colors.border}`, borderLeft: `2px solid ${tierInfo.colors.border}` }} />
        <div className="absolute top-0 right-0 w-8 h-8 rounded-tr-2xl" style={{ borderTop: `2px solid ${tierInfo.colors.border}`, borderRight: `2px solid ${tierInfo.colors.border}` }} />
        <div className="absolute bottom-0 left-0 w-8 h-8 rounded-bl-2xl" style={{ borderBottom: `2px solid ${tierInfo.colors.border}`, borderLeft: `2px solid ${tierInfo.colors.border}` }} />
        <div className="absolute bottom-0 right-0 w-8 h-8 rounded-br-2xl" style={{ borderBottom: `2px solid ${tierInfo.colors.border}`, borderRight: `2px solid ${tierInfo.colors.border}` }} />
      </div>
    );
  }
);

BadgeCard.displayName = "BadgeCard";
export default BadgeCard;
