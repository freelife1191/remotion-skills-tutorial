import React, { useMemo } from 'react';
import { AbsoluteFill, random, useCurrentFrame, interpolate, Easing } from 'remotion';

const NODE_COUNT = 20;
const CANVAS_WIDTH = 1920;
const CANVAS_HEIGHT = 1080;

export const NetworkNodes: React.FC = () => {
  const frame = useCurrentFrame();

  // Phase 1: Gathering (0-60 frames)
  const gatherProgress = interpolate(frame, [0, 60], [0, 1], {
    extrapolateRight: 'clamp',
    easing: Easing.out(Easing.ease),
  });

  // Phase 2: Explosion (starts at frame 60)
  const explodeProgress = interpolate(frame, [60, 80], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.out(Easing.cubic),
  });

  // Generate stable nodes
  const nodes = useMemo(() => {
    return new Array(NODE_COUNT).fill(0).map((_, i) => {
      const seed = i;
      // Random starting positions (scattered)
      const startX = random(seed) * CANVAS_WIDTH;
      const startY = random(seed + 1) * CANVAS_HEIGHT;

      // Target positions (center cluster) - smaller radius
      const angle = random(seed + 2) * Math.PI * 2;
      const radius = random(seed + 3) * 200; // 200px radius from center
      const targetX = CANVAS_WIDTH / 2 + Math.cos(angle) * radius;
      const targetY = CANVAS_HEIGHT / 2 + Math.sin(angle) * radius;

      // Explosion target (far out)
      const explodeX = CANVAS_WIDTH / 2 + Math.cos(angle) * 1500;
      const explodeY = CANVAS_HEIGHT / 2 + Math.sin(angle) * 1500;

      // Color variation
      const color = i % 2 === 0 ? '#60a5fa' : '#a855f7'; // Electric Blue or Cyber Purple

      return { startX, startY, targetX, targetY, explodeX, explodeY, color };
    });
  }, []);

  // Calculate current positions
  const currentNodes = nodes.map((node) => {
    // Interpolate between start and target based on gatherProgress
    let x = interpolate(gatherProgress, [0, 1], [node.startX, node.targetX]);
    let y = interpolate(gatherProgress, [0, 1], [node.startY, node.targetY]);

    // Apply explosion
    if (explodeProgress > 0) {
      x = interpolate(explodeProgress, [0, 1], [x, node.explodeX]);
      y = interpolate(explodeProgress, [0, 1], [y, node.explodeY]);
    }

    return { ...node, x, y };
  });

  // Calculate edges transparency
  const edgesOpacity = interpolate(frame, [0, 40], [0, 0.4], {
    extrapolateRight: 'clamp',
  });

  // Fade out nodes during explosion
  const containerOpacity = interpolate(explodeProgress, [0, 0.5], [1, 0]);

  if (containerOpacity <= 0) return null;

  return (
    <AbsoluteFill style={{ opacity: containerOpacity }}>
      <svg width={CANVAS_WIDTH} height={CANVAS_HEIGHT} className="absolute inset-0">
        {/* Draw Edges */}
        {currentNodes.map((node1, i) =>
          currentNodes.slice(i + 1).map((node2, j) => {
            const dist = Math.hypot(node1.x - node2.x, node1.y - node2.y);
            if (dist < 300) { // Only connect close nodes
              return (
                <line
                  key={`${i}-${j}`}
                  x1={node1.x}
                  y1={node1.y}
                  x2={node2.x}
                  y2={node2.y}
                  stroke="url(#lineGradient)"
                  strokeWidth="1.5"
                  strokeOpacity={edgesOpacity}
                  strokeLinecap="round"
                />
              );
            }
            return null;
          })
        )}

        <defs>
          <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#60a5fa" />
            <stop offset="100%" stopColor="#a855f7" />
          </linearGradient>
        </defs>

        {/* Draw Nodes */}
        {currentNodes.map((node, i) => (
          <circle
            key={i}
            cx={node.x}
            cy={node.y}
            r={4}
            fill={node.color}
            className="drop-shadow-[0_0_8px_rgba(96,165,250,0.8)]"
          />
        ))}
      </svg>
    </AbsoluteFill>
  );
};
