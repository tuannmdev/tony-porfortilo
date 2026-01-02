"use client";

import ContactForm from "@/components/contact/ContactForm";
import ContactSidebar from "@/components/contact/ContactSidebar";

export default function ContactPage() {
  return (
    <>
      {/* Scanlines overlay - fixed, full screen */}
      <div className="fixed inset-0 z-50 scanlines pointer-events-none h-full w-full" />

      <main className="relative z-10 flex-1 flex justify-center p-4 py-8 lg:p-10">
        <div className="w-full max-w-[1200px] flex flex-col lg:flex-row border-4 border-border-retro bg-panel-retro shadow-retro relative">
          {/* Corner decorations */}
          <div className="absolute top-2 left-2 w-2 h-2 bg-border-retro z-20" />
          <div className="absolute top-2 right-2 w-2 h-2 bg-border-retro z-20" />
          <div className="absolute bottom-2 left-2 w-2 h-2 bg-border-retro z-20" />
          <div className="absolute bottom-2 right-2 w-2 h-2 bg-border-retro z-20" />

          {/* Left side - Contact Form (60%) */}
          <div className="flex-1 flex flex-col p-6 lg:p-12 border-b-4 lg:border-b-0 lg:border-r-4 border-border-retro relative bg-panel-retro">
            <ContactForm />
          </div>

          {/* Right side - Sidebar (40%) */}
          <div className="w-full lg:w-[340px] bg-[#e8dacd] flex flex-col relative">
            {/* Diagonal pattern overlay */}
            <div
              className="absolute inset-0 opacity-10 pointer-events-none"
              style={{
                backgroundImage:
                  "repeating-linear-gradient(45deg, #4a3b32 25%, transparent 25%, transparent 75%, #4a3b32 75%, #4a3b32), repeating-linear-gradient(45deg, #4a3b32 25%, #e8dacd 25%, #e8dacd 75%, #4a3b32 75%, #4a3b32)",
                backgroundPosition: "0 0, 10px 10px",
                backgroundSize: "20px 20px",
              }}
            />
            <ContactSidebar />
          </div>
        </div>
      </main>
    </>
  );
}
