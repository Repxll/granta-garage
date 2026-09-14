import { cn } from "@/lib/utils";

// Силуэт машины сбоку — серый рендер на тёмном hero, как в банковском гараже,
// только рисованный: седан/лифтбек, хэтчбек и универсал отличаются задней частью.
type Body = "2190" | "2191" | "2192" | "2194";

const tails: Record<Body, string> = {
  // седан: покатая корма, короткий багажник
  "2190": "L470,78 Q510,92 560,104 Q600,112 606,146 L608,170",
  // лифтбек: та же линия, чуть длиннее скат
  "2191": "L470,78 Q505,96 552,108 Q598,116 606,148 L608,170",
  // хэтчбек: обрубленная корма
  "2192": "L448,70 Q470,72 480,90 Q580,96 596,140 L600,170",
  // универсал: крыша до самого конца
  "2194": "L540,52 Q572,54 584,90 Q600,110 604,146 L606,170",
};

const rearGlass: Record<Body, string> = {
  "2190": "M318,54 L392,54 Q430,56 458,82 L470,94 L318,94 Z",
  "2191": "M318,54 L392,54 Q432,56 462,86 L474,94 L318,94 Z",
  "2192": "M318,54 L400,54 Q440,56 452,72 L456,94 L318,94 Z",
  "2194": "M318,54 L520,54 Q548,56 556,82 L562,94 L318,94 Z",
};

export function CarSilhouette({ body = "2190", className }: { body?: string; className?: string }) {
  const b = (["2190", "2191", "2192", "2194"].includes(body) ? body : "2190") as Body;
  return (
    <svg viewBox="0 0 640 240" className={cn("block h-auto w-full", className)} role="img" aria-label="Силуэт машины">
      <defs>
        <linearGradient id="car-body" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#C9CAD1" />
          <stop offset="1" stopColor="#8E8F98" />
        </linearGradient>
        <radialGradient id="car-shadow" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor="#000" stopOpacity="0.55" />
          <stop offset="1" stopColor="#000" stopOpacity="0" />
        </radialGradient>
      </defs>
      <ellipse cx="322" cy="206" rx="270" ry="16" fill="url(#car-shadow)" />
      <path
        d={`M34,170 L52,124 Q80,102 140,96 L206,64 Q238,48 300,46 L390,46 Q436,48 470,78 ${tails[b]} Q604,184 588,184 L52,184 Q34,184 34,170 Z`}
        fill="url(#car-body)"
      />
      {/* стёкла */}
      <path d="M214,74 L300,56 L306,94 L192,94 Z" fill="#33343B" />
      <path d={rearGlass[b]} fill="#33343B" />
      {/* линия дверей и ручки */}
      <path d="M306,56 L306,150" stroke="#7B7C85" strokeWidth="2" />
      <rect x="260" y="112" width="26" height="6" rx="3" fill="#6E6F78" />
      <rect x="326" y="112" width="26" height="6" rx="3" fill="#6E6F78" />
      {/* фары */}
      <path d="M40,150 Q44,132 62,128 L92,126 L86,150 Z" fill="#E8E9EE" opacity="0.9" />
      {/* колёса */}
      {[150, 500].map((cx) => (
        <g key={cx}>
          <circle cx={cx} cy="182" r="38" fill="#15161B" />
          <circle cx={cx} cy="182" r="24" fill="#A9AAB3" />
          <circle cx={cx} cy="182" r="9" fill="#3A3B42" />
          {[0, 60, 120, 180, 240, 300].map((a) => (
            <rect key={a} x={cx - 3} y="160" width="6" height="18" rx="3" fill="#7C7D86" transform={`rotate(${a} ${cx} 182)`} />
          ))}
        </g>
      ))}
    </svg>
  );
}
