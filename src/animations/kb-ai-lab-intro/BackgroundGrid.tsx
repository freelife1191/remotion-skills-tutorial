import { AbsoluteFill } from 'remotion';

export const BackgroundGrid: React.FC = () => {
  return (
    <AbsoluteFill className="bg-[#020617] overflow-hidden">
      {/* Subtle Grid */}
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `linear-gradient(to right, #334155 1px, transparent 1px),
                            linear-gradient(to bottom, #334155 1px, transparent 1px)`,
          backgroundSize: '50px 50px',
        }}
      />
      
      {/* Vignette / Depth */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-transparent via-[#020617]/50 to-[#020617]" />
      
      {/* Floating dust/particles could be added here if needed, but keeping it clean for the nodes */}
    </AbsoluteFill>
  );
};
