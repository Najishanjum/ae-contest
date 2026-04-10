import { useRef } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Upload, ZoomIn, Move } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import type { BadgeTier } from "./BadgeCard";

interface BadgeFormProps {
  name: string;
  setName: (v: string) => void;
  referralCode: string;
  setReferralCode: (v: string) => void;
  rank: string;
  setRank: (v: string) => void;
  socialHandle: string;
  setSocialHandle: (v: string) => void;
  onImageUpload: (file: File) => void;
  profileImage: string | null;
  imageZoom: number;
  setImageZoom: (v: number) => void;
  imagePositionX: number;
  setImagePositionX: (v: number) => void;
  imagePositionY: number;
  setImagePositionY: (v: number) => void;
  tier: BadgeTier;
  setTier: (v: BadgeTier) => void;
}

const BadgeForm = ({
  name, setName, referralCode, setReferralCode, rank, setRank,
  socialHandle, setSocialHandle, onImageUpload, profileImage,
  imageZoom, setImageZoom, imagePositionX, setImagePositionX,
  imagePositionY, setImagePositionY, tier, setTier,
}: BadgeFormProps) => {
  const fileRef = useRef<HTMLInputElement>(null);

  return (
    <div className="glass-panel rounded-2xl p-6 space-y-5 w-full max-w-md animate-fade-in-up">
      <div>
        <h3 className="font-display font-bold text-lg tracking-wider text-primary glow-text">
          Generate Badge
        </h3>
        <p className="text-[10px] text-muted-foreground tracking-wider mt-1">
          aecontest.online
        </p>
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="name" className="font-display text-xs tracking-widest text-muted-foreground uppercase">
          Full Name
        </Label>
        <Input id="name" value={name} onChange={(e) => setName(e.target.value)}
          placeholder="Najish Onic"
          className="bg-secondary border-border focus:border-primary focus:ring-primary/30" maxLength={50} />
      </div>

      <div className="space-y-1.5">
        <Label className="font-display text-xs tracking-widest text-muted-foreground uppercase">
          Profile Image
        </Label>
        <button type="button" onClick={() => fileRef.current?.click()}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-lg bg-secondary border border-border hover:border-primary/50 transition-colors">
          {profileImage ? (
            <img src={profileImage} alt="Preview" className="w-10 h-10 rounded-lg object-cover" />
          ) : (
            <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center">
              <Upload className="w-4 h-4 text-muted-foreground" />
            </div>
          )}
          <span className="text-sm text-muted-foreground">
            {profileImage ? "Change image" : "Upload photo"}
          </span>
        </button>
        <input ref={fileRef} type="file" accept="image/*" className="hidden"
          onChange={(e) => { const file = e.target.files?.[0]; if (file) onImageUpload(file); }} />
      </div>

      {profileImage && (
        <div className="space-y-3 p-3 rounded-lg bg-secondary/50 border border-border">
          <p className="font-display text-[10px] tracking-widest text-muted-foreground uppercase">Adjust Image</p>
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <ZoomIn className="w-3.5 h-3.5 text-muted-foreground flex-shrink-0" />
              <span className="text-[10px] text-muted-foreground w-10">Zoom</span>
              <Slider value={[imageZoom]} onValueChange={(v) => setImageZoom(v[0])} min={1} max={3} step={0.1} className="flex-1" />
            </div>
            <div className="flex items-center gap-2">
              <Move className="w-3.5 h-3.5 text-muted-foreground flex-shrink-0" />
              <span className="text-[10px] text-muted-foreground w-10">X</span>
              <Slider value={[imagePositionX]} onValueChange={(v) => setImagePositionX(v[0])} min={-50} max={50} step={1} className="flex-1" />
            </div>
            <div className="flex items-center gap-2">
              <Move className="w-3.5 h-3.5 text-muted-foreground flex-shrink-0" />
              <span className="text-[10px] text-muted-foreground w-10">Y</span>
              <Slider value={[imagePositionY]} onValueChange={(v) => setImagePositionY(v[0])} min={-50} max={50} step={1} className="flex-1" />
            </div>
          </div>
        </div>
      )}

      {/* Badge Tier */}
      <div className="space-y-1.5">
        <Label className="font-display text-xs tracking-widest text-muted-foreground uppercase">
          Badge Tier
        </Label>
        <Select value={tier} onValueChange={(v) => setTier(v as BadgeTier)}>
          <SelectTrigger className="bg-secondary border-border focus:border-primary">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="silver">🛡️ Silver</SelectItem>
            <SelectItem value="gold">🏆 Gold</SelectItem>
            <SelectItem value="platinum">👑 Platinum</SelectItem>
            <SelectItem value="diamond">💎 Diamond</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="referral" className="font-display text-xs tracking-widest text-muted-foreground uppercase">
          Referral Code
        </Label>
        <Input id="referral" value={referralCode} onChange={(e) => setReferralCode(e.target.value.toUpperCase())}
          placeholder="AE12345"
          className="bg-secondary border-border focus:border-primary focus:ring-primary/30 font-display tracking-wider" maxLength={20} />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <Label htmlFor="rank" className="font-display text-xs tracking-widest text-muted-foreground uppercase">Rank</Label>
          <Input id="rank" type="number" value={rank} onChange={(e) => setRank(e.target.value)}
            placeholder="1" min={1}
            className="bg-secondary border-border focus:border-primary focus:ring-primary/30 font-display" />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="social" className="font-display text-xs tracking-widest text-muted-foreground uppercase">Social Handle</Label>
          <Input id="social" value={socialHandle} onChange={(e) => setSocialHandle(e.target.value)}
            placeholder="@ajinavaedge"
            className="bg-secondary border-border focus:border-primary focus:ring-primary/30" maxLength={30} />
        </div>
      </div>
    </div>
  );
};

export default BadgeForm;
