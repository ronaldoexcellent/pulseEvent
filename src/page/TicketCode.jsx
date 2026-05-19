import { useState, useRef } from "react";
import { QRCodeSVG } from "qrcode.react";

export default function TicketCodePage() {
  const [text, setText] = useState("https://tailwindexport.com");
  const [fgColor, setFgColor] = useState("#0f172a"); // Slate 900
  const [bgColor, setBgColor] = useState("#ffffff");
  const qrRef = useRef(null);

  // Function to handle downloading the QR Code as a PNG
  const downloadQRCode = () => {
    const svg = qrRef.current.querySelector("svg");
    const svgData = new XMLSerializer().serializeToString(svg);
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    const img = new Image();

    img.onload = () => {
      canvas.width = img.width + 40; // Add padding
      canvas.height = img.height + 40;
      
      // Draw background
      ctx.fillStyle = bgColor;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // Draw QR code centered
      ctx.drawImage(img, 20, 20);
      
      const pngFile = canvas.toDataURL("image/png");
      const downloadLink = document.createElement("a");
      downloadLink.download = "qr-code.png";
      downloadLink.href = pngFile;
      downloadLink.click();
    };

    img.src = "data:image/svg+xml;base64," + btoa(svgData);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-6 text-slate-800 antialiased">
      
      {/* Header */}
      <div className="text-center mb-8 max-w-md">
        <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
          QR Code Generator
        </h1>
        <p className="mt-2 text-sm text-slate-500">
          Enter your URL or text below to instantly generate a custom, downloadable QR code.
        </p>
      </div>

      {/* Main Container */}
      <div className="w-full max-w-4xl bg-white rounded-2xl shadow-xl shadow-slate-200/80 border border-slate-100 overflow-hidden grid md:grid-cols-2">
        
        {/* Left Column: Controls */}
        <div className="p-8 flex flex-col justify-between border-b md:border-b-0 md:border-r border-slate-100">
          <div className="space-y-6">
            {/* Text Input */}
            <div>
              <label htmlFor="qr-text" className="block text-sm font-semibold text-slate-700 mb-2">
                URL or Text Content
              </label>
              <input
                id="qr-text"
                type="text"
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all text-sm"
                placeholder="https://example.com"
                value={text}
                onChange={(e) => setText(e.target.value)}
              />
            </div>

            {/* Color Pickers */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  QR Code Color
                </label>
                <div className="flex items-center gap-2 px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl">
                  <input
                    type="color"
                    className="w-8 h-8 rounded border-0 cursor-pointer bg-transparent"
                    value={fgColor}
                    onChange={(e) => setFgColor(e.target.value)}
                  />
                  <span className="text-xs uppercase font-mono text-slate-600">{fgColor}</span>
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Background Color
                </label>
                <div className="flex items-center gap-2 px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl">
                  <input
                    type="color"
                    className="w-8 h-8 rounded border-0 cursor-pointer bg-transparent"
                    value={bgColor}
                    onChange={(e) => setBgColor(e.target.value)}
                  />
                  <span className="text-xs uppercase font-mono text-slate-600">{bgColor}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-slate-100 hidden md:block">
            <p className="text-xs text-slate-400">
              Tip: Ensure high contrast between the QR code color and the background for optimal scanning.
            </p>
          </div>
        </div>

        {/* Right Column: Live Preview & Actions */}
        <div className="p-8 bg-slate-50/50 flex flex-col items-center justify-center min-h-[350px]">
          {/* QR Code Frame Wrapper */}
          <div 
            ref={qrRef} 
            className="p-6 bg-white rounded-2xl shadow-md border border-slate-100 flex items-center justify-center transition-transform hover:scale-102 duration-300"
            style={{ backgroundColor: bgColor }}
          >
            {text ? (
              <QRCodeSVG
                value={text}
                size={200}
                fgColor={fgColor}
                bgColor={bgColor}
                level="H" // High error correction level
                includeMargin={false}
              />
            ) : (
              <div className="w-[200px] h-[200px] flex items-center justify-center text-slate-400 text-sm text-center border-2 border-dashed border-slate-200 rounded-xl">
                Waiting for input...
              </div>
            )}
          </div>

          {/* Action Button */}
          <button
            onClick={downloadQRCode}
            disabled={!text}
            className="mt-8 w-full sm:w-auto px-6 py-3 bg-indigo-600 hover:bg-indigo-700 disabled:bg-slate-300 disabled:cursor-not-allowed text-white font-medium text-sm rounded-xl shadow-lg shadow-indigo-600/20 hover:shadow-indigo-700/30 transition-all flex items-center justify-center gap-2"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
            </svg>
            Download PNG
          </button>
        </div>

      </div>
    </div>
  );
}