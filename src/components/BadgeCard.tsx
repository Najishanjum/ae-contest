import { QRCodeSVG } from "qrcode.react";
import aeLogo from "@/assets/ae-logo.jpg";
import scannerQr from "@/assets/scanner-qr.jpeg";
import { forwardRef } from "react";
import { Star, Shield, Crown, Gem, Award, Flame, Sparkles, Moon } from "lucide-react";

export type BadgeTier = "cyber" | "gold" | "emerald" | "magenta" | "sunset" | "midnight" | "platinum" | "diamond";

export const themeOptions: { value: BadgeTier; label: string; emoji: string }[] = [
  { value: "cyber", label: "Cyber Cyan", emoji: "🌐" },
  { value: "gold", label: "Royal Gold", emoji: "🏆" },
  { value: "emerald", label: "Emerald Prestige", emoji: "💚" },
  { value: "magenta", label: "Neon Magenta", emoji: "💗" },
  { value: "sunset", label: "Sunset Blaze", emoji: "🔥" },
  { value: "midnight", label: "Midnight Purple", emoji: "🌙" },
  { value: "platinum", label: "Platinum Frost", emoji: "👑" },
  { value: "diamond", label: "Diamond Aura", emoji: "💎" },
];

const tierConfig: Record<BadgeTier, { label: string; colors: { border: string; text: string; bg: string; glow: string; gradient: string }; icon: typeof Star }> = {
  cyber: {
    label: "CYBER",
    colors: { border: "rgba(0,255,255,0.6)", text: "#00FFFF", bg: "rgba(0,255,255,0.08)", glow: "0 0 16px rgba(0,255,255,0.35)", gradient: "linear-gradient(135deg, rgba(0,255,255,0.08), rgba(0,128,255,0.04))" },
    icon: Sparkles,
  },
  gold: {
    label: "GOLD",
    colors: { border: "rgba(255,215,0,0.6)", text: "#FFD700", bg: "rgba(255,215,0,0.08)", glow: "0 0 16px rgba(255,215,0,0.35)", gradient: "linear-gradient(135deg, rgba(255,215,0,0.1), rgba(184,134,11,0.04))" },
    icon: Award,
  },
  emerald: {
    label: "EMERALD",
    colors: { border: "rgba(80,220,120,0.6)", text: "#50E07A", bg: "rgba(80,220,120,0.08)", glow: "0 0 16px rgba(80,220,120,0.35)", gradient: "linear-gradient(135deg, rgba(80,220,120,0.1), rgba(13,122,95,0.04))" },
    icon: Shield,
  },
  magenta: {
    label: "MAGENTA",
    colors: { border: "rgba(255,80,200,0.6)", text: "#FF50C8", bg: "rgba(255,80,200,0.08)", glow: "0 0 16px rgba(255,80,200,0.4)", gradient: "linear-gradient(135deg, rgba(255,80,200,0.1), rgba(120,30,160,0.04))" },
    icon: Flame,
  },
  sunset: {
    label: "SUNSET",
    colors: { border: "rgba(255,140,60,0.65)", text: "#FF9A50", bg: "rgba(255,140,60,0.08)", glow: "0 0 16px rgba(255,140,60,0.4)", gradient: "linear-gradient(135deg, rgba(255,140,60,0.1), rgba(232,67,147,0.05))" },
    icon: Flame,
  },
  midnight: {
    label: "MIDNIGHT",
    colors: { border: "rgba(167,139,250,0.65)", text: "#A78BFA", bg: "rgba(167,139,250,0.08)", glow: "0 0 16px rgba(167,139,250,0.4)", gradient: "linear-gradient(135deg, rgba(167,139,250,0.1), rgba(30,30,90,0.05))" },
    icon: Moon,
  },
  platinum: {
    label: "PLATINUM",
    colors: { border: "rgba(180,220,255,0.6)", text: "#B4DCFF", bg: "rgba(180,220,255,0.08)", glow: "0 0 16px rgba(180,220,255,0.35)", gradient: "linear-gradient(135deg, rgba(180,220,255,0.1), rgba(100,140,180,0.04))" },
    icon: Crown,
  },
  diamond: {
    label: "DIAMOND",
    colors: { border: "rgba(185,242,255,0.65)", text: "#B9F2FF", bg: "rgba(185,242,255,0.08)", glow: "0 0 18px rgba(185,242,255,0.45)", gradient: "linear-gradient(135deg, rgba(185,242,255,0.12), rgba(100,200,230,0.04))" },
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
    const tierInfo = tierConfig[tier] || tierConfig.cyber;

    const qrData = JSON.stringify({
      name: name || "Unknown",
      state: state || "N/A",
      referralCode: referralCode || "AE00000",
      socialHandle: socialHandle || "",
      website: "aecontest.online",
      theme: tierInfo.label,
      verified: true,
    });

    const IMG_SIZE = 160;

    return (
      <div
        ref={ref}
        className="relative w-[290px] badge-texture rounded-2xl overflow-hidden select-none"
        style={{
          minHeight: 500,
          border: `1px solid ${tierInfo.colors.border}`,
          boxShadow: tierInfo.colors.glow,
          backgroundImage: tierInfo.colors.gradient,
        }}
      >
        <div className="absolute inset-0 scanline pointer-events-none z-10" />
        <div className="sparkle" style={{ top: '8%', left: '5%', animationDelay: '0s' }} />
        <div className="sparkle" style={{ top: '5%', right: '8%', animationDelay: '0.5s' }} />
        <div className="sparkle" style={{ top: '30%', right: '3%', animationDelay: '1s' }} />
        <div className="sparkle" style={{ bottom: '15%', left: '4%', animationDelay: '1.5s' }} />

        {/* Header */}
        <div className="relative z-20 text-center pt-4 pb-2">
          <h2 className="font-display font-black text-xl tracking-[0.25em] text-foreground glow-text-white italic">
            AE <span style={{ color: tierInfo.colors.text }} className="glow-text">CONTEST</span>
          </h2>
        </div>

        {/* Circular Profile Image */}
        <div className="relative z-20 flex flex-col items-center px-6 mt-1">
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
            className="mt-2.5 flex items-center gap-2 px-4 py-1 rounded-full bg-secondary/80"
            style={{ border: `1px solid ${tierInfo.colors.border}` }}
          >
            <Star className="w-3 h-3" style={{ fill: tierInfo.colors.text, color: tierInfo.colors.text }} />
            <span className="font-display text-[9px] tracking-[0.3em] uppercase font-bold" style={{ color: tierInfo.colors.text }}>
              Verified Member
            </span>
            <Star className="w-3 h-3" style={{ fill: tierInfo.colors.text, color: tierInfo.colors.text }} />
          </div>
        </div>

        {/* Name Section */}
        <div className="relative z-20 mx-4 mt-3 p-2.5 rounded-lg bg-secondary/30" style={{ border: `1px solid ${tierInfo.colors.border}30` }}>
          <p className="text-[9px] tracking-[0.2em] text-muted-foreground font-display uppercase mb-0.5">Name:</p>
          <p className="font-display font-bold text-base tracking-wide text-foreground">{name || "Your Name"}</p>
        </div>

        {/* Referral Code + State Row */}
        <div className="relative z-20 mx-4 mt-2 grid grid-cols-2 gap-2">
          <div className="p-2.5 rounded-lg bg-secondary/30" style={{ border: `1px solid ${tierInfo.colors.border}30` }}>
            <p className="text-[9px] tracking-[0.2em] text-muted-foreground font-display uppercase mb-0.5">Referral:</p>
            <p className="font-display font-black text-base glow-text" style={{ color: tierInfo.colors.text }}>{referralCode || "AE00000"}</p>
          </div>
          <div className="p-2.5 rounded-lg bg-secondary/30" style={{ border: `1px solid ${tierInfo.colors.border}30` }}>
            <p className="text-[9px] tracking-[0.2em] text-muted-foreground font-display uppercase mb-0.5">State:</p>
            <p className="font-display font-bold text-xs glow-text" style={{ color: tierInfo.colors.text }}>{state || "Your State"}</p>
          </div>
        </div>

        {/* Scanner + QR Section */}
        <div className="relative z-20 mx-4 mt-2.5 flex items-center justify-between gap-2">
          <div className="flex-shrink-0 rounded-lg overflow-hidden" style={{ border: `1px solid ${tierInfo.colors.border}`, boxShadow: tierInfo.colors.glow }}>
            <img src={scannerQr} alt="Scanner QR" className="w-[70px] h-[70px] object-cover" crossOrigin="anonymous" />
          </div>

          <div className="flex items-center gap-1.5 flex-shrink-0">
            <div className="flex flex-col items-center gap-1">
              <div className="px-1.5 py-2.5 rounded" style={{ background: tierInfo.colors.text }}>
                <span className="font-display text-[6px] tracking-widest font-bold" style={{ writingMode: 'vertical-rl', textOrientation: 'mixed', color: '#0a0a0a' }}>
                  SCAN TO DOWNLOAD
                </span>
              </div>
              <span style={{ color: tierInfo.colors.text }} className="text-base">▶</span>
            </div>
            <div className="flex flex-col items-center gap-1">
              <div className="p-1.5 bg-foreground rounded-lg" style={{ border: `1px solid ${tierInfo.colors.border}` }}>
                <QRCodeSVG value={qrData} size={64} bgColor="#f0f0f0" fgColor="#0a0a0a" level="M" />
              </div>
              <div className="px-2 py-0.5 rounded bg-secondary/50" style={{ border: `1px solid ${tierInfo.colors.border}` }}>
                <span className="font-display text-[8px] tracking-wider font-bold" style={{ color: tierInfo.colors.text }}>{referralCode || "AE00000"}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="relative z-20 mx-4 mt-2">
          <p className="text-[7px] text-muted-foreground tracking-wider uppercase">Unauthorised copying of card is prohibited</p>
        </div>

        {/* Divider */}
        <div className="relative z-20 mx-4 mt-2 h-px" style={{ background: `linear-gradient(to right, transparent, ${tierInfo.colors.border}, transparent)` }} />

        {/* Bottom Logo */}
        <div className="relative z-20 flex items-center justify-center gap-3 py-3">
          <img src={aeLogo} alt="AE Contest" className="h-9 w-9 rounded-full object-cover" style={{ border: `1px solid ${tierInfo.colors.border}` }} loading="lazy" />
          <div>
            <p className="font-display font-bold text-xs tracking-wider text-foreground">AE <span style={{ color: tierInfo.colors.text }}>CONTEST</span></p>
            <p className="text-[7px] tracking-[0.3em] text-muted-foreground">aecontest.online</p>
          </div>
        </div>

        {/* Corner accents */}
        <div className="absolute top-0 left-0 w-7 h-7 rounded-tl-2xl" style={{ borderTop: `2px solid ${tierInfo.colors.border}`, borderLeft: `2px solid ${tierInfo.colors.border}` }} />
        <div className="absolute top-0 right-0 w-7 h-7 rounded-tr-2xl" style={{ borderTop: `2px solid ${tierInfo.colors.border}`, borderRight: `2px solid ${tierInfo.colors.border}` }} />
        <div className="absolute bottom-0 left-0 w-7 h-7 rounded-bl-2xl" style={{ borderBottom: `2px solid ${tierInfo.colors.border}`, borderLeft: `2px solid ${tierInfo.colors.border}` }} />
        <div className="absolute bottom-0 right-0 w-7 h-7 rounded-br-2xl" style={{ borderBottom: `2px solid ${tierInfo.colors.border}`, borderRight: `2px solid ${tierInfo.colors.border}` }} />
      </div>
    );
  }
);

BadgeCard.displayName = "BadgeCard";
export default BadgeCard;
