// Hand-drawn line icons for the vehicle spec tiles — consistent 24×24 grid,
// 1.7px strokes, inherit currentColor (gold via parent).
const base = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.7,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

export function IconPassengers({ className = "h-6 w-6" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...base} aria-hidden>
      <circle cx="9" cy="8" r="3.2" />
      <path d="M3.5 19.5c0-3 2.5-5 5.5-5s5.5 2 5.5 5" />
      <circle cx="16.5" cy="9" r="2.4" />
      <path d="M15.5 14.6c2.8.1 5 1.9 5 4.4" />
    </svg>
  );
}

export function IconHybrid({ className = "h-6 w-6" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...base} aria-hidden>
      <path d="M13 2.5L5.5 13H11l-1 8.5L18.5 10H13l1-7.5z" />
    </svg>
  );
}

export function IconAutomatic({ className = "h-6 w-6" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...base} aria-hidden>
      <circle cx="6" cy="5" r="2" />
      <circle cx="12" cy="5" r="2" />
      <circle cx="18" cy="5" r="2" />
      <circle cx="6" cy="19" r="2" />
      <circle cx="12" cy="19" r="2" />
      <path d="M6 7v10M12 7v10M18 7v5h-6" />
    </svg>
  );
}

export function IconLeather({ className = "h-6 w-6" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...base} aria-hidden>
      <path d="M8.5 3.5c-1.5 0-2.3 1-2.1 2.4l1.2 8.1h8l1.3-8.1c.2-1.4-.6-2.4-2.1-2.4h-6.3z" />
      <path d="M7.6 14l-.9 3.2c-.3 1.2.5 2.3 1.8 2.3h7c1.3 0 2.1-1.1 1.8-2.3L16.4 14" />
      <path d="M9.5 6.5h5M9.8 9.5h4.4" />
    </svg>
  );
}

export function IconClimate({ className = "h-6 w-6" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...base} aria-hidden>
      <path d="M12 3v18M12 12l7.5-4.3M12 12L4.5 7.7M12 12l7.5 4.3M12 12l-7.5 4.3" />
      <path d="M12 5.5l-2-2M12 5.5l2-2M12 18.5l-2 2M12 18.5l2 2" />
    </svg>
  );
}

export function IconInsured({ className = "h-6 w-6" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...base} aria-hidden>
      <path d="M12 2.8l7 2.6v5.4c0 4.6-2.9 8.4-7 10.4-4.1-2-7-5.8-7-10.4V5.4l7-2.6z" />
      <path d="M8.8 12l2.2 2.3 4.2-4.6" />
    </svg>
  );
}

export const FLEET_ICONS = [IconPassengers, IconHybrid, IconAutomatic, IconLeather, IconClimate, IconInsured];
