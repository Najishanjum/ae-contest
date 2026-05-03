import { useState, useRef, useCallback } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import BadgeCard from "@/components/BadgeCard";
import type { BadgeTier } from "@/components/BadgeCard";
import BadgeForm from "@/components/BadgeForm";
import { Button } from "@/components/ui/button";
import { Download, Sparkles, FileImage, FileText, Share2 } from "lucide-react";
import { toast } from "sonner";
import SocialShareButtons from "@/components/SocialShareButtons";
import Footer from "@/components/Footer";

const Index = () => {
  const [name, setName] = useState("");
  const [referralCode, setReferralCode] = useState("");
  const [state, setState] = useState("");
  const [socialHandle, setSocialHandle] = useState("");
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [downloading, setDownloading] = useState(false);
  const [imageZoom, setImageZoom] = useState(1);
  const [imagePositionX, setImagePositionX] = useState(0);
  const [imagePositionY, setImagePositionY] = useState(0);
  const [tier, setTier] = useState<BadgeTier>("cyber");
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

  const captureCanvas = useCallback(async () => {
    if (!badgeRef.current) return null;
    return html2canvas(badgeRef.current, {
      backgroundColor: null,
      scale: 4,
      useCORS: true,
      allowTaint: true,
      logging: false,
    });
  }, []);

  const handleDownloadPNG = useCallback(async () => {
    setDownloading(true);
    try {
      const canvas = await captureCanvas();
      if (!canvas) return;
      const link = document.createElement("a");
      link.download = `AE-Badge-${name || "badge"}-${tier}.png`;
      link.href = canvas.toDataURL("image/png", 1.0);
      link.click();
      toast.success("Badge downloaded as PNG!");
    } catch {
      toast.error("Failed to download badge");
    } finally {
      setDownloading(false);
    }
  }, [name, tier, captureCanvas]);

  const handleDownloadPDF = useCallback(async () => {
    setDownloading(true);
    try {
      const canvas = await captureCanvas();
      if (!canvas) return;
      const imgData = canvas.toDataURL("image/png", 1.0);
      const pdfWidth = 100;
      const pdfHeight = (canvas.height / canvas.width) * pdfWidth;
      const pdf = new jsPDF({ orientation: pdfHeight > pdfWidth ? "portrait" : "landscape", unit: "mm", format: [pdfWidth, pdfHeight] });
      pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
      pdf.save(`AE-Badge-${name || "badge"}-${tier}.pdf`);
      toast.success("Badge downloaded as PDF!");
    } catch {
      toast.error("Failed to download badge as PDF");
    } finally {
      setDownloading(false);
    }
  }, [name, tier, captureCanvas]);

  return (
    <div className="min-h-screen bg-background relative overflow-hidden flex flex-col">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />

      <header className="relative z-10 text-center pt-10 pb-6 px-4">
        <div className="inline-flex items-center gap-2 mb-2">
          <Sparkles className="w-5 h-5 text-primary" />
          <span className="font-display text-[10px] tracking-[0.4em] text-primary/70 uppercase">Premium Access</span>
          <Sparkles className="w-5 h-5 text-primary" />
        </div>
        <h1 className="font-display font-black text-3xl md:text-4xl tracking-wider text-foreground">
          AE <span className="text-primary glow-text">CONTEST</span>
        </h1>
        <p className="text-sm text-muted-foreground mt-2 max-w-md mx-auto">
          Generate your exclusive digital badge card — <span className="text-primary">aecontest.online</span>
        </p>
      </header>

      <main className="relative z-10 flex flex-col lg:flex-row items-center lg:items-start justify-center gap-10 px-4 pb-16 max-w-5xl mx-auto flex-1">
        <BadgeForm
          name={name} setName={setName}
          referralCode={referralCode} setReferralCode={setReferralCode}
          state={state} setState={setState}
          socialHandle={socialHandle} setSocialHandle={setSocialHandle}
          onImageUpload={handleImageUpload} profileImage={profileImage}
          imageZoom={imageZoom} setImageZoom={setImageZoom}
          imagePositionX={imagePositionX} setImagePositionX={setImagePositionX}
          imagePositionY={imagePositionY} setImagePositionY={setImagePositionY}
          tier={tier} setTier={setTier}
        />

        <div className="flex flex-col items-center gap-6 animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
          <p className="font-display text-[10px] tracking-[0.3em] text-muted-foreground uppercase">Live Preview</p>
          <div className="transition-all duration-500 hover:scale-[1.02]">
            <BadgeCard
              ref={badgeRef}
              name={name} referralCode={referralCode} state={state}
              profileImage={profileImage} socialHandle={socialHandle}
              imageZoom={imageZoom} imagePositionX={imagePositionX} imagePositionY={imagePositionY}
              tier={tier}
            />
          </div>

          {/* Download buttons */}
          <div className="flex flex-wrap items-center justify-center gap-3">
            <Button onClick={handleDownloadPNG} disabled={downloading}
              className="font-display tracking-wider gap-2 px-6 py-3 bg-primary hover:bg-primary/90 text-primary-foreground glow-cyan transition-all duration-300" size="lg">
              <FileImage className="w-4 h-4" />
              {downloading ? "Generating..." : "Download PNG"}
            </Button>
            <Button onClick={handleDownloadPDF} disabled={downloading} variant="outline"
              className="font-display tracking-wider gap-2 px-6 py-3 border-primary/50 text-primary hover:bg-primary/10 transition-all duration-300" size="lg">
              <FileText className="w-4 h-4" />
              Download PDF
            </Button>
          </div>

          {/* Social Sharing */}
          <div className="flex flex-col items-center gap-2">
            <div className="flex items-center gap-2 text-muted-foreground">
              <Share2 className="w-3.5 h-3.5" />
              <span className="font-display text-[10px] tracking-[0.3em] uppercase">Share Badge</span>
            </div>
            <SocialShareButtons name={name} tier={tier} />
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Index;
