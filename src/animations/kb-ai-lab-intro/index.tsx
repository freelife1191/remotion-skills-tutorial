import React from 'react';
import { AbsoluteFill, useCurrentFrame, interpolate } from 'remotion';
import { BackgroundGrid } from './BackgroundGrid';
import { NetworkNodes } from './NetworkNodes';
import { TitleSection } from './TitleSection';

export const KbAiLabIntroComposition: React.FC = () => {
  const frame = useCurrentFrame();

  // Ken Burns Effect (Global Zoom)
  // Scene 3: 3.5s ~ 5s (Frame 105 ~ 150)
  // Scale from 1 to 1.02
  const globalScale = interpolate(
    frame,
    [105, 150],
    [1, 1.02],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
  );

  return (
    <AbsoluteFill className="bg-slate-950">
      <AbsoluteFill style={{ transform: `scale(${globalScale})` }}>
        <BackgroundGrid />
        <NetworkNodes />
        <TitleSection />
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
