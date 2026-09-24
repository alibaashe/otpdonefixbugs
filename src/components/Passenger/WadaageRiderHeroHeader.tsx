import React from 'react';
import { Menu, Bell } from 'lucide-react';

interface WadaageRiderHeroHeaderProps {
  onOpenMenu: () => void;
  onOpenNotifications: () => void;
}

export const WadaageRiderHeroHeader: React.FC<WadaageRiderHeroHeaderProps> = ({
  onOpenMenu,
  onOpenNotifications,
}) => {
  return (
    <div className="relative w-full overflow-hidden select-none bg-slate-900 shrink-0">
      {/* 1. Background City Twilight Skyline Image */}
      <div className="absolute inset-0 z-0">
        <img
          src="/images/wadaage_hero_hargeisa.jpg"
          alt="Hargeisa Twilight Skyline"
          className="w-full h-full object-cover object-center scale-105 filter contrast-110 brightness-95"
          onError={(e) => {
            // Fallback gradient if file is loading
            (e.currentTarget as HTMLElement).style.display = 'none';
          }}
        />
        {/* Soft Vignette and Evening Sky Gradient Overlays */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/20 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
      </div>

      {/* 2. Top Simulated iOS Status Bar */}
      <div className="relative z-20 px-6 pt-3 pb-1 flex items-center justify-between text-white text-xs font-semibold tracking-tight opacity-95">
        <span>9:41</span>
        <div className="flex items-center space-x-2 text-white">
          {/* Cellular bars */}
          <div className="flex items-end space-x-0.5 h-3">
            <span className="w-0.5 h-1 bg-white rounded-full" />
            <span className="w-0.5 h-1.5 bg-white rounded-full" />
            <span className="w-0.5 h-2.5 bg-white rounded-full" />
            <span className="w-0.5 h-3 bg-white rounded-full" />
          </div>
          {/* WiFi icon */}
          <svg className="w-3.5 h-3.5 fill-white" viewBox="0 0 24 24">
            <path d="M12 4C7.31 4 3.07 5.9 0 8.98L12 21 24 8.98C20.93 5.9 16.69 4 12 4zm0 3.5c3.8 0 7.23 1.54 9.72 4.03L12 19.26 2.28 11.53C4.77 9.04 8.2 7.5 12 7.5z" />
          </svg>
          {/* Battery pill */}
          <div className="w-5 h-2.5 rounded-sm border border-white p-0.5 flex items-center">
            <div className="w-full h-full bg-white rounded-2xs" />
          </div>
        </div>
      </div>

      {/* 3. Action Buttons & Center Wadaage Brand Identity */}
      <div className="relative z-20 px-4 pt-1 pb-6 flex items-start justify-between">
        {/* Left: Round Blue Menu Button */}
        <button
          type="button"
          onClick={onOpenMenu}
          className="w-10 h-10 rounded-full bg-[#0077E6]/90 hover:bg-[#0077E6] backdrop-blur-md flex items-center justify-center text-white shadow-lg active:scale-90 transition border border-white/25 cursor-pointer mt-1"
          aria-label="Fura Liiska (Open Menu)"
        >
          <Menu className="w-5 h-5 stroke-[2.5]" />
        </button>

        {/* Center: Official Wadaage Brand Art */}
        <div className="flex flex-col items-center justify-center text-center px-2 flex-1 min-w-0">
          {/* Arc above Logo & Main Wadaage Wordmark */}
          <div className="relative flex flex-col items-center">
            {/* Glowing orbital arc */}
            <svg
              className="w-48 h-6 text-sky-400 drop-shadow-[0_0_8px_rgba(56,189,248,0.8)] -mb-3"
              viewBox="0 0 200 40"
              fill="none"
            >
              <path
                d="M 15 35 Q 100 2 185 35"
                stroke="currentColor"
                strokeWidth="3.5"
                strokeLinecap="round"
              />
            </svg>

            {/* Custom Wadaage Logo typography */}
            <div className="flex items-center justify-center -space-x-1">
              {/* Vibrant Lime-Green Map Pin with Blue and White concentric center */}
              <div className="relative shrink-0 -mr-1.5 drop-shadow-[0_4px_10px_rgba(0,0,0,0.5)]">
                <svg viewBox="0 0 44 54" className="w-10 h-12" fill="none">
                  {/* Pin Body */}
                  <path
                    d="M22 2C10.95 2 2 10.95 2 22C2 37 22 52 22 52S42 37 42 22C42 10.95 33.05 2 22 2Z"
                    fill="#76D600"
                  />
                  {/* Outer Blue Circle */}
                  <circle cx="22" cy="21" r="9" fill="#0077E6" />
                  {/* Inner White Dot */}
                  <circle cx="22" cy="21" r="4" fill="#FFFFFF" />
                </svg>
              </div>

              {/* Bold Wadaage Wordmark with White outline styling */}
              <span
                className="text-4xl font-black tracking-tight text-white drop-shadow-[0_4px_12px_rgba(0,0,0,0.7)]"
                style={{
                  fontFamily: 'ui-rounded, "SF Pro Rounded", "Nunito", -apple-system, sans-serif',
                  letterSpacing: '-0.02em',
                }}
              >
                adaage
              </span>
            </div>
          </div>

          {/* Subtitle Bar: — TAXI & WADAAG — */}
          <div className="flex items-center justify-center space-x-2 mt-1">
            <span className="h-[2.5px] w-6 bg-[#C6F200] rounded-full shadow-xs" />
            <span
              className="text-xs font-black tracking-[0.22em] text-[#C6F200] uppercase drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]"
              style={{ fontFamily: 'system-ui, sans-serif' }}
            >
              TAXI & WADAAG
            </span>
            <span className="h-[2.5px] w-6 bg-[#C6F200] rounded-full shadow-xs" />
          </div>

          {/* Cursive Hargeisa */}
          <div
            className="text-2xl font-serif italic text-white tracking-wide mt-[-2px] drop-shadow-[0_2px_6px_rgba(0,0,0,0.8)]"
            style={{
              fontFamily: '"Brush Script MT", "Caveat", "Dancing Script", cursive, Georgia, serif',
            }}
          >
            Hargeisa
          </div>

          {/* Slogan */}
          <div className="text-[10px] font-medium text-white/95 tracking-wide mt-0.5 drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)]">
            Dadka isku xidh, safarka fududee
          </div>
        </div>

        {/* Right: Round Blue Notifications Bell */}
        <button
          type="button"
          onClick={onOpenNotifications}
          className="relative w-10 h-10 rounded-full bg-[#0077E6]/90 hover:bg-[#0077E6] backdrop-blur-md flex items-center justify-center text-white shadow-lg active:scale-90 transition border border-white/25 cursor-pointer mt-1"
          aria-label="Ogaysiisyada (Notifications)"
        >
          <Bell className="w-5 h-5" />
          <span className="absolute top-2 right-2 w-2.5 h-2.5 rounded-full bg-rose-500 ring-2 ring-white" />
        </button>
      </div>

      {/* 4. Fluid Layered Bottom Waves (Lime Green & Electric Blue) */}
      <div className="relative w-full leading-none z-20 pointer-events-none -mb-1">
        <svg
          viewBox="0 0 1440 180"
          fill="none"
          preserveAspectRatio="none"
          className="w-full h-12 block"
        >
          {/* Lime Green Accent Wave (Back Layer) */}
          <path
            d="M0,40 C280,140 520,-20 840,90 C1120,190 1340,30 1440,60 L1440,180 L0,180 Z"
            fill="#76D600"
            opacity="0.95"
          />
          {/* Electric Blue Wave (Front Layer) */}
          <path
            d="M0,70 C300,160 560,0 880,110 C1160,200 1360,60 1440,80 L1440,180 L0,180 Z"
            fill="#0077E6"
          />
        </svg>
      </div>
    </div>
  );
};
