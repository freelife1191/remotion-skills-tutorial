import React from 'react';
import { AbsoluteFill, useCurrentFrame, interpolate, spring, useVideoConfig } from 'remotion';

export const TitleSection: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // --- Main Title Animation (Starts at frame 60) ---
  const titleStartFrame = 60;

  // Spring for Scale
  const titleScale = spring({
    frame: frame - titleStartFrame,
    fps,
    config: { stiffness: 60, damping: 12 },
    durationInFrames: 30,
  });

  // Interpolate Letter Spacing (Continuous expansion)
  const letterSpacing = interpolate(
    frame - titleStartFrame,
    [0, 90], // continues until end
    [0, 10], // 0px to 10px
    { extrapolateLeft: 'clamp' }
  );

  // Appearance Opacity
  const titleOpacity = interpolate(
    frame - titleStartFrame,
    [0, 10],
    [0, 1],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
  );

  // --- Sub Title Animation (Starts at frame 105) ---
  const subStartFrame = 105;

  const subOpacity = interpolate(
    frame - subStartFrame,
    [0, 20],
    [0, 1],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
  );

  const subTranslateY = interpolate(
    frame - subStartFrame,
    [0, 20],
    [-20, 0], // Slide from slightly above (-20px) to 0
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: (t) => t * (2 - t) } // Ease out
  );

  if (frame < titleStartFrame) return null;

  return (
    <AbsoluteFill className="flex flex-col items-center justify-center">
      {/* Main Title */}
      <h1
        className="text-7xl font-extrabold text-white text-center whitespace-nowrap"
        style={{
          transform: `scale(${titleScale})`,
          opacity: titleOpacity,
          letterSpacing: `${letterSpacing}px`,
          textShadow: '0 0 40px rgba(96, 165, 250, 0.6), 0 0 80px rgba(168, 85, 247, 0.4)',
        }}
      >
        <span className="text-blue-400">케이블랙</span>의 <span className="text-purple-400">AI연구실</span>
      </h1>

      {/* Sub Title */}
      <h2
        className="text-2xl font-bold text-gray-300 mt-6 tracking-[0.2em]"
        style={{
          opacity: subOpacity,
          transform: `translateY(${subTranslateY}px)`,
        }}
      >
        AI & FUTURE TECHNOLOGY
      </h2>
    </AbsoluteFill>
  );
};
