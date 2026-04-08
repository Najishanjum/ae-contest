import { QRCodeSVG } from "qrcode.react";
import aeLogo from "@/assets/ae-logo.jpg";
import { forwardRef } from "react";
import { Star } from "lucide-react";

interface BadgeCardProps {
  name: string;
  referralCode: string;
  rank: string;
  profileImage: string | null;
  socialHandle: string;
  imageZoom: number;
  imagePositionX: number;
  imagePositionY: number;
}

const BadgeCard = forwardRef<HTMLDivElement, BadgeCardProps>(
  ({ name, referralCode, rank, profileImage, socialHandle, imageZoom, imagePositionX, imagePositionY }, ref) => {
    const formattedRank = rank ? rank.padStart(3, "0") : "000";

    const qrData = JSON.stringify({
      name: name || "Unknown",
      rank: formattedRank,
      referralCode: referralCode || "AE00000",
      socialHandle: socialHandle || "",
      website: "aecontest.online",
      verified: true,
    });

    return (
      <div
        ref={ref}
        className="relative w-[380px] badge-texture rounded-2xl border border-primary/30 glow-cyan overflow-hidden select-none"
        style={{ minHeight: 620 }}
      >
        {/* Scanline overlay */}
        <div className="absolute inset-0 scanline pointer-events-none z-10" />

        {/* Sparkle effects */}
        <div className="sparkle" style={{ top: '8%', left: '5%', animationDelay: '0s' }} />
        <div className="sparkle" style={{ top: '5%', right: '8%', animationDelay: '0.5s' }} />
        <div className="sparkle" style={{ top: '30%', right: '3%', animationDelay: '1s' }} />
        <div className="sparkle" style={{ bottom: '15%', left: '4%', animationDelay: '1.5s' }} />
        <div className="sparkle" style={{ top: '15%', left: '50%', animationDelay: '0.7s' }} />
        <div className="sparkle" style={{ bottom: '40%', right: '5%', animationDelay: '1.2s' }} />

        {/* AE CONTEST Header */}
        <div className="relative z-20 text-center pt-5 pb-3">
          <h2 className="font-display font-black text-2xl tracking-[0.25em] text-foreground glow-text-white italic">
            AE <span className="text-primary glow-text">CONTEST</span>
          </h2>
        </div>

        {/* Profile Image with glowing border */}
        <div className="relative z-20 flex flex-col items-center px-6">
          <div className="relative w-[280px] h-[200px] rounded-xl overflow-hidden border-2 border-primary/60 glow-cyan">
            {profileImage ? (
              <img
                src={profileImage}
                alt={name || "Profile"}
                className="w-full h-full object-cover"
                style={{
                  transform: `scale(${imageZoom}) translate(${imagePositionX}%, ${imagePositionY}%)`,
                  transformOrigin: 'center center',
                }}
              />
            ) : (
              <div className="w-full h-full bg-secondary flex items-center justify-center">
                <span className="text-muted-foreground font-display text-4xl">
                  {name ? name.charAt(0).toUpperCase() : "?"}
                </span>
              </div>
            )}
          </div>

          {/* Verified Member Badge */}
          <div className="mt-3 flex items-center gap-2 px-5 py-1.5 rounded-full border border-primary/60 bg-secondary/80">
            <Star className="w-3.5 h-3.5 text-primary fill-primary" />
            <span className="font-display text-[10px] tracking-[0.3em] text-primary uppercase font-bold">
              Verified Member
            </span>
            <Star className="w-3.5 h-3.5 text-primary fill-primary" />
          </div>
        </div>

        {/* Name Section */}
        <div className="relative z-20 mx-5 mt-4 p-3 border border-primary/20 rounded-lg bg-secondary/30">
          <p className="text-[10px] tracking-[0.2em] text-muted-foreground font-display uppercase mb-1">
            Name:
          </p>
          <p className="font-display font-bold text-lg tracking-wide text-foreground">
            {name || "Your Name"}
          </p>
        </div>

        {/* Rank + Referral Code Row */}
        <div className="relative z-20 mx-5 mt-2 grid grid-cols-2 gap-2">
          <div className="p-3 border border-primary/20 rounded-lg bg-secondary/30">
            <p className="text-[10px] tracking-[0.2em] text-muted-foreground font-display uppercase mb-1">
              Rank:
            </p>
            <p className="font-display font-black text-2xl text-primary glow-text">
              {formattedRank}
            </p>
          </div>
          <div className="p-3 border border-primary/20 rounded-lg bg-secondary/30">
            <p className="text-[10px] tracking-[0.2em] text-muted-foreground font-display uppercase mb-1">
              Referral Code:
            </p>
            <p className="font-display font-black text-lg text-primary glow-text">
              {referralCode || "AE00000"}
            </p>
          </div>
        </div>

        {/* QR Section */}
        <div className="relative z-20 mx-5 mt-3 flex items-center gap-3">
          {/* Hologram */}
          <div className="hologram w-[80px] h-[80px] flex-shrink-0 flex items-center justify-center">
            <span className="text-[6px] text-foreground/60 font-display text-center leading-tight">
              DIGITAL<br />HOLOGRAM<br />SECURITY
            </span>
          </div>

          {/* Scan to Download label */}
          <div className="flex flex-col items-center gap-1 flex-shrink-0">
            <div className="bg-primary px-2 py-3 rounded writing-vertical">
              <span className="font-display text-[7px] tracking-widest text-primary-foreground font-bold"
                style={{ writingMode: 'vertical-rl', textOrientation: 'mixed' }}>
                SCAN TO DOWNLOAD
              </span>
            </div>
            <span className="text-primary text-lg">▶</span>
          </div>

          {/* QR Code */}
          <div className="flex flex-col items-center gap-1 flex-shrink-0">
            <div className="p-2 bg-foreground rounded-lg border border-primary/40">
              <QRCodeSVG
                value={qrData}
                size={72}
                bgColor="#f0f0f0"
                fgColor="#0a0a0a"
                level="M"
              />
            </div>
            <div className="px-3 py-0.5 border border-primary/60 rounded bg-secondary/50">
              <span className="font-display text-[9px] text-primary tracking-wider font-bold">
                {referralCode || "AE00000"}
              </span>
            </div>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="relative z-20 mx-5 mt-2">
          <p className="text-[7px] text-muted-foreground tracking-wider uppercase">
            Unauthorised copying of card is prohibited
          </p>
        </div>

        {/* Divider */}
        <div className="relative z-20 mx-5 mt-3 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" />

        {/* Bottom Logo */}
        <div className="relative z-20 flex items-center justify-center gap-3 py-4">
          <img
            src={aeLogo}
            alt="Ajinava Edge"
            className="h-10 w-10 rounded-full object-cover border border-primary/40"
            loading="lazy"
          />
          <div>
            <p className="font-display font-bold text-sm tracking-wider text-foreground">
              AJINAVA <span className="text-primary">e</span>DGE
            </p>
            <p className="text-[8px] tracking-[0.3em] text-muted-foreground">
              aecontest.online
            </p>
          </div>
        </div>

        {/* Corner accents */}
        <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-primary/50 rounded-tl-2xl" />
        <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-primary/50 rounded-tr-2xl" />
        <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-primary/50 rounded-bl-2xl" />
        <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-primary/50 rounded-br-2xl" />
      </div>
    );
  }
);

BadgeCard.displayName = "BadgeCard";

export default BadgeCard;
