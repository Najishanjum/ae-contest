import { QRCodeSVG } from "qrcode.react";
import aeLogo from "@/assets/ae-logo.png";
import { forwardRef } from "react";

interface BadgeCardProps {
  name: string;
  referralCode: string;
  rank: string;
  profileImage: string | null;
  socialHandle: string;
}

const BadgeCard = forwardRef<HTMLDivElement, BadgeCardProps>(
  ({ name, referralCode, rank, profileImage, socialHandle }, ref) => {
    const formattedRank = rank ? rank.padStart(3, "0") : "000";

    return (
      <div
        ref={ref}
        className="relative w-[380px] min-h-[560px] badge-texture rounded-2xl border border-primary/30 glow-red overflow-hidden select-none"
      >
        {/* Scanline overlay */}
        <div className="absolute inset-0 scanline pointer-events-none z-10" />

        {/* Top bar */}
        <div className="relative z-20 flex items-center justify-between px-5 pt-5 pb-2">
          <h2 className="font-display font-black text-lg tracking-[0.2em] text-primary glow-text">
            AE CONTEST
          </h2>
          <span className="font-display text-xs tracking-widest text-muted-foreground">
            RANK {formattedRank}
          </span>
        </div>

        {/* Divider */}
        <div className="mx-5 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />

        {/* Profile Image */}
        <div className="relative z-20 flex flex-col items-center mt-5 px-5">
          <div className="relative w-36 h-36 rounded-xl overflow-hidden border-2 border-primary/40 glow-red">
            {profileImage ? (
              <img
                src={profileImage}
                alt={name || "Profile"}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full bg-secondary flex items-center justify-center">
                <span className="text-muted-foreground font-display text-3xl">
                  {name ? name.charAt(0).toUpperCase() : "?"}
                </span>
              </div>
            )}
          </div>

          <span className="mt-2 text-[10px] tracking-[0.3em] text-primary/70 font-display uppercase">
            Verified Member
          </span>
        </div>

        {/* User Info */}
        <div className="relative z-20 px-5 mt-5 space-y-2">
          <div className="text-center">
            <p className="font-display font-bold text-base tracking-wide text-foreground">
              {name || "Your Name"}
            </p>
            {socialHandle && (
              <p className="text-xs text-muted-foreground mt-0.5">
                @{socialHandle.replace("@", "")}
              </p>
            )}
          </div>

          {/* Divider */}
          <div className="h-px bg-gradient-to-r from-transparent via-border to-transparent" />

          {/* Referral + QR */}
          <div className="flex items-center gap-4 pt-1">
            <div className="flex-1 space-y-1">
              <p className="text-[10px] tracking-[0.2em] text-muted-foreground font-display uppercase">
                Referral Code
              </p>
              <p className="font-display font-bold text-sm text-primary glow-text tracking-wider">
                {referralCode || "AE00000"}
              </p>
            </div>
            <div className="flex-shrink-0 p-2 bg-foreground rounded-lg">
              <QRCodeSVG
                value={referralCode || "AE00000"}
                size={72}
                bgColor="hsl(0, 0%, 95%)"
                fgColor="hsl(0, 0%, 5%)"
                level="M"
              />
            </div>
          </div>

          <p className="text-center text-[9px] text-muted-foreground tracking-widest font-display">
            {referralCode || "AE00000"}
          </p>
        </div>

        {/* Bottom Logo */}
        <div className="relative z-20 flex flex-col items-center mt-4 pb-5">
          <div className="h-px w-3/4 bg-gradient-to-r from-transparent via-primary/30 to-transparent mb-3" />
          <img
            src={aeLogo}
            alt="Ajinava Edge"
            className="h-8 w-auto opacity-70"
            loading="lazy"
          />
          <p className="text-[8px] tracking-[0.4em] text-muted-foreground font-display mt-1 uppercase">
            Ajinava Edge
          </p>
        </div>

        {/* Corner accents */}
        <div className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-primary/50 rounded-tl-2xl" />
        <div className="absolute top-0 right-0 w-6 h-6 border-t-2 border-r-2 border-primary/50 rounded-tr-2xl" />
        <div className="absolute bottom-0 left-0 w-6 h-6 border-b-2 border-l-2 border-primary/50 rounded-bl-2xl" />
        <div className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 border-primary/50 rounded-br-2xl" />
      </div>
    );
  }
);

BadgeCard.displayName = "BadgeCard";

export default BadgeCard;
