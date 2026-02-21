"use client";

interface FaceProps {
  id: string;
  size?: number;
  color?: string;
  active?: boolean;
}

export function Face({ id, size = 36, color = "#888", active = false }: FaceProps) {
  const s = size;
  const cx = s / 2;
  const cy = s / 2;
  const r = s * 0.38;
  const eyeY = cy - r * 0.06;
  const sp = r * 0.3;
  const er = s * 0.035;
  const lc = active ? color : "#6b6560";
  const bg = active ? color + "14" : "transparent";

  const hasCustomEyes = ["sia", "neo", "boa"].includes(id);

  const features: Record<string, React.ReactNode> = {
    hal: (
      <line x1={cx - r * 0.65} y1={cy - r * 0.5} x2={cx + r * 0.65} y2={cy - r * 0.5}
        stroke={lc} strokeWidth={1.1} strokeLinecap="round" />
    ),
    koah: (
      <path d={`M${cx - r * 0.6},${cy - r * 0.55} Q${cx},${cy - r * 1.3} ${cx + r * 0.6},${cy - r * 0.55}`}
        fill="none" stroke={lc} strokeWidth={1.1} />
    ),
    dia: (
      <polygon
        points={`${cx},${cy - r - 3.5} ${cx + 2},${cy - r - 0.5} ${cx + 4},${cy - r - 0.5} ${cx + 2.5},${cy - r + 1.5} ${cx + 3.2},${cy - r + 3.5} ${cx},${cy - r + 2} ${cx - 3.2},${cy - r + 3.5} ${cx - 2.5},${cy - r + 1.5} ${cx - 4},${cy - r - 0.5} ${cx - 2},${cy - r - 0.5}`}
        fill={lc} opacity={0.7}
      />
    ),
    yua: (
      <ellipse cx={cx - r * 0.35} cy={cy - r * 0.7} rx={r * 0.5} ry={r * 0.22}
        fill="none" stroke={lc} strokeWidth={1} />
    ),
    luna: (
      <path
        d={`M${cx + r * 0.45},${cy - r * 0.25} Q${cx + r * 0.85},${cy + r * 0.1} ${cx + r * 0.55},${cy + r * 0.55} Q${cx + r * 0.95},${cy + r * 0.75} ${cx + r * 0.65},${cy + r * 0.95}`}
        fill="none" stroke={lc} strokeWidth={1} strokeLinecap="round"
      />
    ),
    sia: (
      <>
        <circle cx={cx - sp} cy={eyeY} r={r * 0.2} fill="none" stroke={lc} strokeWidth={0.8} />
        <circle cx={cx + sp} cy={eyeY} r={r * 0.2} fill="none" stroke={lc} strokeWidth={0.8} />
        <line x1={cx - sp + r * 0.2} y1={eyeY} x2={cx + sp - r * 0.2} y2={eyeY}
          stroke={lc} strokeWidth={0.7} />
      </>
    ),
    steve: (
      <>
        {[-1.2, -0.4, 0.4, 1.2].map((i) => (
          <line key={i} x1={cx + i * r * 0.25} y1={cy - r * 0.82}
            x2={cx + i * r * 0.2} y2={cy - r - 3 - Math.abs(i) * 0.8}
            stroke={lc} strokeWidth={0.9} strokeLinecap="round" />
        ))}
      </>
    ),
    bezos: (
      <path
        d={`M${cx - r * 0.3},${cy + r * 0.72} L${cx},${cy + r * 0.95} L${cx + r * 0.3},${cy + r * 0.72}`}
        fill="none" stroke={lc} strokeWidth={0.9} strokeLinecap="round"
      />
    ),
    boa: (
      <line x1={cx - r * 0.55} y1={eyeY} x2={cx + r * 0.55} y2={eyeY}
        stroke={lc} strokeWidth={1.8} strokeLinecap="round" opacity={0.6} />
    ),
    tea: (
      <>
        <circle cx={cx + r * 0.7} cy={cy + r * 0.25} r={r * 0.18}
          fill="none" stroke={lc} strokeWidth={0.9} />
        <line x1={cx + r * 0.83} y1={cy + r * 0.38} x2={cx + r * 0.98} y2={cy + r * 0.53}
          stroke={lc} strokeWidth={0.9} strokeLinecap="round" />
      </>
    ),
    doa: (
      <line x1={cx + r * 0.5} y1={cy - r * 0.4} x2={cx + r * 0.7} y2={cy - r * 0.85}
        stroke={lc} strokeWidth={1.1} strokeLinecap="round" />
    ),
    neo: (
      <>
        {[-2, -1, 0, 1, 2].map((i) => (
          <line key={i} x1={cx + i * r * 0.18} y1={cy - r * 0.78}
            x2={cx + i * r * 0.22 + (i % 2) * 1.2} y2={cy - r - 2 - Math.abs(i) * 1.3}
            stroke={lc} strokeWidth={0.8} strokeLinecap="round" />
        ))}
        <circle cx={cx - sp} cy={eyeY} r={r * 0.18} fill="none" stroke={lc} strokeWidth={0.7} />
        <circle cx={cx + sp} cy={eyeY} r={r * 0.18} fill="none" stroke={lc} strokeWidth={0.7} />
      </>
    ),
  };

  return (
    <svg width={s} height={s} viewBox={`0 0 ${s} ${s}`}>
      <circle cx={cx} cy={cy} r={r + 3} fill={bg} />
      <circle cx={cx} cy={cy} r={r} fill="none" stroke={lc} strokeWidth={1.2} />
      {!hasCustomEyes && (
        <>
          <circle cx={cx - sp} cy={eyeY} r={er} fill={lc} />
          <circle cx={cx + sp} cy={eyeY} r={er} fill={lc} />
        </>
      )}
      {hasCustomEyes && id !== "boa" && (
        <>
          <circle cx={cx - sp} cy={eyeY} r={er * 0.7} fill={lc} />
          <circle cx={cx + sp} cy={eyeY} r={er * 0.7} fill={lc} />
        </>
      )}
      <path
        d={`M${cx - r * 0.1},${cy + r * 0.28} Q${cx},${cy + r * 0.36} ${cx + r * 0.1},${cy + r * 0.28}`}
        fill="none" stroke={lc} strokeWidth={0.7} strokeLinecap="round"
      />
      {features[id]}
    </svg>
  );
}
