import { useState, useRef, useCallback } from "react";
import html2canvas from "html2canvas";
import BadgeCard from "@/components/BadgeCard";
import BadgeForm from "@/components/BadgeForm";
import { Button } from "@/components/ui/button";
import { Download, Sparkles } from "lucide-react";
import { toast } from "sonner";

const Index = () => {
  const [name, setName] = useState("");
  const [referralCode, setReferralCode] = useState("");
  const [rank, setRank] = useState("");
  const [socialHandle, setSocialHandle] = useState("");
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [downloading, setDownloading] = useState(false);
  const [imageZoom, setImageZoom] = useState(1);
  const [imagePositionX, setImagePositionX] = useState(0);
  const [imagePositionY, setImagePositionY] = useState(0);
  const badgeRef = useRef<HTMLDivElement>(null);

  const handleImageUpload = useCallback((file: File) => {
    if (file.size > 5 * 1024 * 1024) {
      toast.error("Image must be under 5MB");
      return;
    }
    const reader = new FileReader();
    reader.onload = (e) => {
      setProfileImage(e.target?.result as string);
      setImageZoom(1);
      setImagePositionX(0);
      setImagePositionY(0);
    };
    reader.readAsDataURL(file);
  }, []);

  const handleDownload = useCallback(async () => {
    if (!badgeRef.current) return;
    setDownloading(true);
    try {
      const canvas = await html2canvas(badgeRef.current, {
        backgroundColor: null,
        scale: 2,
        useCORS: true,
      });
      const link = document.createElement("a");
      link.download = `AE-Badge-${name || "badge"}.png`;
      link.href = canvas.toDataURL("image/png");
      link.click();
      toast.success("Badge downloaded!");
    } catch {
      toast.error("Failed to download badge");
    } finally {
      setDownloading(false);
    }
  }, [name]);

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Ambient glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[400px] h-[300px] bg-primary/3 rounded-full blur-[100px] pointer-events-none" />

      {/* Header */}
      <header className="relative z-10 text-center pt-10 pb-6 px-4">
        <div className="inline-flex items-center gap-2 mb-2">
          <Sparkles className="w-5 h-5 text-primary" />
          <span className="font-display text-[10px] tracking-[0.4em] text-primary/70 uppercase">
            Premium Access
          </span>
          <Sparkles className="w-5 h-5 text-primary" />
        </div>
        <h1 className="font-display font-black text-3xl md:text-4xl tracking-wider text-foreground">
          AE <span className="text-primary glow-text">CONTEST</span>
        </h1>
        <p className="text-sm text-muted-foreground mt-2 max-w-md mx-auto">
          Generate your exclusive digital badge card — <span className="text-primary">aecontest.online</span>
        </p>
      </header>

      {/* Main content */}
      <main className="relative z-10 flex flex-col lg:flex-row items-center lg:items-start justify-center gap-10 px-4 pb-16 max-w-5xl mx-auto">
        {/* Form */}
        <BadgeForm
          name={name}
          setName={setName}
          referralCode={referralCode}
          setReferralCode={setReferralCode}
          rank={rank}
          setRank={setRank}
          socialHandle={socialHandle}
          setSocialHandle={setSocialHandle}
          onImageUpload={handleImageUpload}
          profileImage={profileImage}
          imageZoom={imageZoom}
          setImageZoom={setImageZoom}
          imagePositionX={imagePositionX}
          setImagePositionX={setImagePositionX}
          imagePositionY={imagePositionY}
          setImagePositionY={setImagePositionY}
        />

        {/* Badge preview */}
        <div className="flex flex-col items-center gap-6 animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
          <p className="font-display text-[10px] tracking-[0.3em] text-muted-foreground uppercase">
            Live Preview
          </p>

          <div className="transition-all duration-500 hover:scale-[1.02]">
            <BadgeCard
              ref={badgeRef}
              name={name}
              referralCode={referralCode}
              rank={rank}
              profileImage={profileImage}
              socialHandle={socialHandle}
              imageZoom={imageZoom}
              imagePositionX={imagePositionX}
              imagePositionY={imagePositionY}
            />
          </div>

          <Button
            onClick={handleDownload}
            disabled={downloading}
            className="font-display tracking-wider gap-2 px-8 py-3 bg-primary hover:bg-primary/90 text-primary-foreground glow-cyan transition-all duration-300 hover:glow-cyan-intense"
            size="lg"
          >
            <Download className="w-4 h-4" />
            {downloading ? "Generating..." : "Download Badge"}
          </Button>
        </div>
      </main>
    </div>
  );
};

export default Index;
