"use client";

import React, { useState, useRef, useCallback } from "react";
import { Download, Plus, Trash2, Image as ImageIcon } from "lucide-react";
import { toPng } from "html-to-image";
import { SectionWrapper } from "@/components/ui/section-wrapper";
import { SectionHeading } from "@/components/ui/section-heading";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

export default function BlogThumbnailGenerator() {
  const [title, setTitle] = useState(
    "Developing for the Generative Era: Precision Engineering with Texavor",
  );
  const [images, setImages] = useState<string[]>([
    "https://upload.wikimedia.org/wikipedia/commons/thumb/e/ef/ChatGPT-Logo.svg/960px-ChatGPT-Logo.svg.png",
    "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/Google_2015_logo.svg/2560px-Google_2015_logo.svg.png",
  ]);
  const [newImageUrl, setNewImageUrl] = useState("");

  const canvasRef = useRef<HTMLDivElement>(null);

  const handleAddImage = () => {
    if (newImageUrl.trim()) {
      setImages([...images, newImageUrl.trim()]);
      setNewImageUrl("");
    }
  };

  const handleRemoveImage = (index: number) => {
    setImages(images.filter((_, i) => i !== index));
  };

  const handleDownload = useCallback(async () => {
    if (canvasRef.current === null) {
      return;
    }

    try {
      const dataUrl = await toPng(canvasRef.current, {
        cacheBust: true,
        pixelRatio: 2,
      });
      const link = document.createElement("a");
      link.download = `texavor-thumbnail-${Date.now()}.png`;
      link.href = dataUrl;
      link.click();
    } catch (err) {
      console.error("Failed to download image", err);
    }
  }, [canvasRef]);

  return (
    <SectionWrapper background="default" size="lg" className="min-h-screen">
      <div className="tx-container">
        <SectionHeading
          eyebrow="TECHNICAL TOOL"
          heading="Blog Thumbnail Generator"
          description="Create precision-engineered thumbnails for your technical articles and documentation."
          align="left"
        />

        <div className="flex flex-col lg:flex-row gap-12 mt-12">
          {/* Controls Section */}
          <aside className="w-full lg:w-1/3 space-y-8">
            <Card className="border-border shadow-none bg-card">
              <CardContent className="p-6 space-y-6">
                {/* Title Input */}
                <div className="space-y-3">
                  <Label
                    htmlFor="title"
                    className="text-xs font-semibold uppercase tracking-widest text-muted-foreground"
                  >
                    Article Title
                  </Label>
                  <Textarea
                    id="title"
                    className="min-h-[120px] bg-background border-border resize-none focus-visible:ring-primary/20"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Enter article title..."
                  />
                </div>

                {/* Logo URL Input */}
                <div className="space-y-3">
                  <Label
                    htmlFor="logo"
                    className="text-xs font-semibold uppercase tracking-widest text-muted-foreground"
                  >
                    Inbound Logos (URL)
                  </Label>
                  <div className="flex gap-2">
                    <Input
                      id="logo"
                      type="text"
                      className="bg-background border-border focus-visible:ring-primary/20"
                      value={newImageUrl}
                      onChange={(e) => setNewImageUrl(e.target.value)}
                      placeholder="https://icon-url.com/logo.png"
                      onKeyDown={(e) => e.key === "Enter" && handleAddImage()}
                    />
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={handleAddImage}
                      className="shrink-0 hover:bg-primary/5 hover:text-primary border-border"
                    >
                      <Plus className="w-4 h-4" />
                    </Button>
                  </div>
                </div>

                {/* Asset Explorer */}
                <div className="space-y-3">
                  <Label className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                    Active Assets
                  </Label>
                  <div className="flex flex-wrap gap-3">
                    {images.map((url, idx) => (
                      <div
                        key={idx}
                        className="relative group bg-background p-2 rounded-lg border border-border transition-colors hover:border-primary/30"
                      >
                        <img
                          src={url}
                          alt={`asset-${idx}`}
                          className="w-10 h-10 object-contain"
                        />
                        <button
                          onClick={() => handleRemoveImage(idx)}
                          className="absolute -top-2 -right-2 bg-destructive text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity shadow-sm"
                        >
                          <Trash2 className="w-3 h-3" />
                        </button>
                      </div>
                    ))}
                    {images.length === 0 && (
                      <p className="text-sm text-muted-foreground italic py-2">
                        No assets loaded.
                      </p>
                    )}
                  </div>
                </div>

                {/* Download Action */}
                <Button
                  onClick={handleDownload}
                  variant="brand"
                  className="w-full h-12 flex items-center justify-center gap-2"
                >
                  <Download className="w-4 h-4" />
                  Generate Archive (1000x420)
                </Button>
              </CardContent>
            </Card>

            <div className="p-4 rounded-lg bg-muted/50 border border-border/50">
              <p className="text-[11px] font-inter text-muted-foreground leading-relaxed">
                <strong className="text-foreground">Tip:</strong> Use
                high-quality PNGs with transparent backgrounds for the best
                semantic visibility in the thumbnail output.
              </p>
            </div>
          </aside>

          {/* Preview Section */}
          <main className="flex-1 flex flex-col items-center">
            <div className="w-full mb-4 flex items-center justify-between text-[10px] font-mono text-muted-foreground uppercase tracking-widest">
              <span>Canvas Preview (1:1 Scale)</span>
              <span>1000px × 420px</span>
            </div>

            {/* The Canvas */}
            <div className="w-full overflow-auto p-4 bg-muted/30 border border-border rounded-xl flex items-center justify-center">
              <div
                ref={canvasRef}
                className="shrink-0 relative flex flex-col items-center justify-center overflow-hidden tx-dot-bg border border-white/5"
                style={{
                  width: "1000px",
                  height: "420px",
                  backgroundColor: "#104127",
                  background:
                    "linear-gradient(135deg, #104127 0%, #0d3520 100%)",
                }}
              >
                {/* Main Content Cluster */}
                <div className="max-w-[850px] text-center z-10 flex flex-col items-center gap-10 px-12">
                  {/* Title Block */}
                  <h2 className="text-white font-poppins font-bold text-[56px] leading-[1.1] tracking-tight drop-shadow-sm">
                    {title}
                  </h2>

                  {/* Logo Distribution Cluster */}
                  {images.length > 0 && (
                    <div className="flex items-center justify-center gap-12 bg-white/[0.03] backdrop-blur-md border border-white/10 px-10 py-6 rounded-2xl">
                      {images.map((url, i) => (
                        <div
                          key={i}
                          className="h-16 w-auto flex items-center justify-center"
                        >
                          <img
                            src={url}
                            alt=""
                            className="h-16 w-auto object-contain brightness-0 invert opacity-90 transition-opacity hover:opacity-100"
                            crossOrigin="anonymous"
                          />
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
              <div className="p-4 rounded-lg border border-border bg-card">
                <span className="text-[10px] uppercase tracking-widest font-bold text-primary mb-2 block">
                  Resolution
                </span>
                <p className="text-sm font-medium">
                  Standard 1000x420px export, optimized for social sharing and
                  Open Graph headers.
                </p>
              </div>
              <div className="p-4 rounded-lg border border-border bg-card">
                <span className="text-[10px] uppercase tracking-widest font-bold text-accent mb-2 block">
                  Contrast
                </span>
                <p className="text-sm font-medium">
                  High-contrast text on deep forest background ensures maximum
                  readability in feeds.
                </p>
              </div>
            </div>
          </main>
        </div>
      </div>
    </SectionWrapper>
  );
}
