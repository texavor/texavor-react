"use client";

import React, { useState, useRef, useCallback } from "react";
import {
  Download,
  Plus,
  Trash2,
  Image as ImageIcon,
  MoveUpRight,
} from "lucide-react";
import { toPng } from "html-to-image";

export default function BlogThumbnailGenerator() {
  const [title, setTitle] = useState(
    "Future Trends in Answer Engine Optimization: What to Expect in this year?",
  );
  const [images, setImages] = useState<string[]>([
    "https://upload.wikimedia.org/wikipedia/commons/thumb/0/04/ChatGPT_logo.svg/1024px-ChatGPT_logo.svg.png",
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
      link.download = "blog-thumbnail.png";
      link.href = dataUrl;
      link.click();
    } catch (err) {
      console.error("Failed to download image", err);
    }
  }, [canvasRef]);

  return (
    <div className="min-h-screen bg-zinc-950 text-white p-8 font-sans flex flex-col items-center">
      <h1 className="text-3xl font-bold mb-8">Blog Thumbnail Generator</h1>

      <div className="flex flex-col lg:flex-row gap-12 w-full max-w-7xl">
        {/* Controls Section */}
        <div className="flex flex-col gap-6 w-full lg:w-1/3 bg-zinc-900 p-6 rounded-xl border border-zinc-800 h-fit">
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-zinc-400">
              Blog Title
            </label>
            <textarea
              className="w-full bg-zinc-950 border border-zinc-800 rounded-lg p-3 text-white focus:outline-none focus:ring-2 focus:ring-green-600 resize-none h-32"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter your blog title here..."
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-zinc-400">
              Add Logo URL
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                className="flex-1 bg-zinc-950 border border-zinc-800 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-600"
                value={newImageUrl}
                onChange={(e) => setNewImageUrl(e.target.value)}
                placeholder="https://example.com/logo.png"
                onKeyDown={(e) => e.key === "Enter" && handleAddImage()}
              />
              <button
                onClick={handleAddImage}
                className="bg-zinc-800 hover:bg-zinc-700 text-white p-2 rounded-lg transition-colors"
              >
                <Plus size={20} />
              </button>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-zinc-400">
              Current Images
            </label>
            <div className="flex flex-wrap gap-2">
              {images.map((url, idx) => (
                <div
                  key={idx}
                  className="relative group bg-white/10 p-2 rounded-md border border-zinc-700"
                >
                  <img
                    src={url}
                    alt={`logo-${idx}`}
                    className="w-10 h-10 object-contain"
                  />
                  <button
                    onClick={() => handleRemoveImage(idx)}
                    className="absolute -top-2 -right-2 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity shadow-sm"
                  >
                    <Trash2 size={12} />
                  </button>
                </div>
              ))}
              {images.length === 0 && (
                <span className="text-zinc-500 text-sm italic">
                  No images added
                </span>
              )}
            </div>
          </div>

          <button
            onClick={handleDownload}
            className="mt-4 flex items-center justify-center gap-2 w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-semibold transition-transform active:scale-95"
          >
            <Download size={20} />
            Download PNG (1000x420)
          </button>
        </div>

        {/* Preview Section */}
        <div className="flex-1 flex flex-col items-center justify-start pt-10 overflow-auto">
          <div className="text-zinc-500 mb-2 font-mono text-xs">
            Preview Scale: 100%
          </div>

          {/* The Canvas */}
          {/* Wrapper to enforce display size but canvas is fixed pixel size */}
          <div className="border border-zinc-800 shadow-2xl rounded-sm overflow-hidden">
            <div
              ref={canvasRef}
              style={{
                width: "1000px",
                height: "420px",
                backgroundColor: "#104127",
                position: "relative",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                background:
                  "radial-gradient(circle at 10% 90%, #1a5d3a 0%, transparent 60%), linear-gradient(to top right, #104127 0%, #0d3520 100%)",
              }}
            >
              {/* Top Right Arrow like Primary Metric Card */}
              <div className="absolute top-10 right-10 w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-lg transform transition-transform">
                <MoveUpRight className="w-8 h-8 text-[#104127]" />
              </div>

              {/* Main Content */}
              <div className="max-w-[800px] text-center z-10 flex flex-col items-center gap-8 px-12">
                {/* Title */}
                <h1 className="text-white font-['Poppins'] font-semibold text-5xl leading-tight tracking-tight drop-shadow-md">
                  {title}
                </h1>

                {/* Logos */}
                {images.length > 0 && (
                  <div className="flex items-center justify-center gap-10 mt-6 bg-white/10 p-6 rounded-2xl backdrop-blur-sm border border-white/10">
                    {images.map((url, i) => (
                      <div
                        key={i}
                        className="h-16 w-auto flex items-center justify-center"
                      >
                        <img
                          src={url}
                          alt=""
                          className="h-16 w-auto object-contain drop-shadow-lg"
                          crossOrigin="anonymous"
                        />
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
