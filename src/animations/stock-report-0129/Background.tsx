import { AbsoluteFill } from 'remotion';

export const Background = () => {
  return (
    <AbsoluteFill className="bg-[#0f172a] overflow-hidden -z-50">
      <div className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `linear-gradient(#334155 1px, transparent 1px),
            linear-gradient(90deg, #334155 1px, transparent 1px)`,
          backgroundSize: '40px 40px',
        }}
      />
      {/* Glow effect at the bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-[500px] bg-gradient-to-t from-blue-900/20 to-transparent" />
    </AbsoluteFill>
  );
};
