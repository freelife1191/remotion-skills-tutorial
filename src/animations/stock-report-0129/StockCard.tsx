import React from 'react';
import { interpolate, spring, useCurrentFrame, useVideoConfig, Sequence, staticFile } from 'remotion';
import { Audio } from "@remotion/media";

interface StockCardProps {
  index: number;
  name: string;
  change: number;
  title: string;
  variant: 'up' | 'gold' | 'flat';
  analysis: {
    cause: string;
    phenomenon: string;
    result: string;
    future: string;
  };
}

const formatSpeech = (text: string) => {
  const t = text.trim();
  if (t.endsWith("전망")) return t + "됩니다.";
  if (t.endsWith("기대")) return t + "됩니다.";
  if (t.endsWith("필요")) return t + "합니다.";
  if (t.endsWith("가능성")) return t + "이 있습니다.";
  if (t.endsWith("우려")) return t + "됩니다.";
  if (t.endsWith("유입")) return t + "되고 있습니다.";
  if (t.endsWith("지속")) return t + "되고 있습니다.";
  if (t.endsWith("확대")) return t + "되고 있습니다.";
  if (t.endsWith("진입")) return t + "했습니다.";
  if (t.endsWith("확인")) return t + "됩니다.";
  if (t.endsWith("부족")) return t + "한 모습입니다.";
  if (t.endsWith("양호")) return t + "합니다.";
  if (t.endsWith("회복")) return t + "세를 보입니다.";
  if (t.endsWith("돌파")) return t + "했습니다.";
  if (t.endsWith("반등")) return t + "했습니다.";
  if (t.endsWith("증가")) return t + "했습니다.";
  if (t.endsWith("감소")) return t + "했습니다.";
  if (t.endsWith("시도")) return t + "하고 있습니다.";
  if (t.endsWith("유지")) return t + "하고 있습니다.";
  if (t.endsWith("매력")) return t + "이 부각됩니다.";
  if (t.endsWith("강화")) return t + "되고 있습니다.";
  if (t.endsWith("자극")) return t + "하고 있습니다.";
  if (t.endsWith("공존")) return t + "하고 있습니다.";
  if (t.endsWith("부재")) return t + "합니다.";
  if (t.endsWith("위협")) return t + "받고 있습니다.";
  if (t.endsWith("폭발")) return t + "했습니다.";
  if (t.endsWith("그림")) return t + "려지고 있습니다.";
  if (t.endsWith("테스트")) return t + "가 예상됩니다.";
  if (t.endsWith("관건")) return t + "입니다.";
  if (t.endsWith("영역")) return t + "입니다.";
  if (t.endsWith("보임")) return t + "니다.";
  if (t.endsWith("중")) return t + "입니다.";
  if (t.endsWith("있음")) return t.slice(0, -2) + "있습니다.";
  return t; // Fallback
};

export const StockCard: React.FC<StockCardProps> = ({
  index,
  name,
  change,
  title,
  variant,
  analysis,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Assuming total sequence duration is 520 frames as per plan
  const SEQUENCE_DURATION = 520;
  const SEGMENT_DURATION = SEQUENCE_DURATION / 4; // 130 frames

  // Calculate active segment (0 to 3)
  const currentSegment = Math.min(3, Math.floor(frame / SEGMENT_DURATION));

  // Determine active text for subtitle
  const segments = [
    { key: 'cause', text: analysis.cause, label: '원인 (Cause)', icon: '🌱', color: 'from-blue-500/20 to-blue-900/40', border: 'border-blue-400', textCol: 'text-blue-300' },
    { key: 'phenomenon', text: analysis.phenomenon, label: '현상 (Phenomenon)', icon: '👁️', color: 'from-indigo-500/20 to-indigo-900/40', border: 'border-indigo-400', textCol: 'text-indigo-300' },
    { key: 'result', text: analysis.result, label: '결과 (Result)', icon: '📊', color: 'from-amber-500/20 to-amber-900/40', border: 'border-amber-400', textCol: 'text-amber-300' },
    { key: 'future', text: analysis.future, label: '미래 (Future)', icon: '🚀', color: 'from-emerald-500/20 to-emerald-900/40', border: 'border-emerald-400', textCol: 'text-emerald-300' },
  ];

  const activeData = segments[currentSegment];
  const speechText = formatSpeech(activeData.text);

  const entrance = spring({
    frame,
    fps,
    config: { damping: 12 },
  });

  const count = interpolate(frame, [0, 30], [0, change], {
    extrapolateRight: 'clamp',
  });

  // Color determination
  const isPositive = change > 0;
  let colorClass = 'text-slate-400';
  if (variant === 'up' || (isPositive && variant !== 'flat')) colorClass = 'text-emerald-400';
  if (change < 0) colorClass = 'text-rose-500';
  if (variant === 'gold') colorClass = 'text-yellow-400';
  if (variant === 'flat') colorClass = 'text-slate-400';

  return (
    <div className="w-full h-full flex flex-col items-center pt-8 bg-[#0f172a] pb-40 px-4">
      {/* Audio Layer - Synced with segments */}
      <Sequence from={0}>
        <Audio src={staticFile(`audio/stock_${index}_0.mp3`)} />
      </Sequence>
      <Sequence from={130}>
        <Audio src={staticFile(`audio/stock_${index}_1.mp3`)} />
      </Sequence>
      <Sequence from={260}>
        <Audio src={staticFile(`audio/stock_${index}_2.mp3`)} />
      </Sequence>
      <Sequence from={390}>
        <Audio src={staticFile(`audio/stock_${index}_3.mp3`)} />
      </Sequence>

      {/* Main Card (Header) */}
      <div
        className="w-full bg-slate-900/50 backdrop-blur-md rounded-3xl p-6 flex flex-col justify-center border border-slate-700/50 shadow-2xl z-10 mb-6 shrink-0"
        style={{
          transform: `scale(${entrance})`,
          opacity: entrance,
        }}
      >
        <div className="flex flex-col gap-2">
          <div className="flex justify-between items-end border-b border-slate-700/50 pb-4 mb-4">
            <div className="text-5xl text-white font-black tracking-tighter drop-shadow-md bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400">
              {name}
            </div>
            <div className="flex items-center gap-2">
              <span className={`text-6xl font-black ${colorClass} tabular-nums tracking-tighter drop-shadow-lg`}>
                {change > 0 ? '+' : ''}{count.toFixed(1)}%
              </span>
            </div>
          </div>
          <div className="text-4xl font-bold text-slate-200 leading-tight text-center">
            "{title}"
          </div>
        </div>
      </div>

      {/* Analysis Grid */}
      <div className="w-full grid grid-cols-1 gap-4 z-0 flex-1">
        {/* Row 1 */}
        <div className="grid grid-cols-2 gap-4 h-full">
          {segments.slice(0, 2).map((seg, i) => (
            <div
              key={seg.key}
              className={`relative p-6 rounded-3xl border-[3px] backdrop-blur-lg transition-all duration-500 flex flex-col justify-start gap-3
                ${i === currentSegment
                  ? `bg-gradient-to-br ${seg.color} border-${seg.border.split('-')[1]}-400 shadow-[0_0_30px_rgba(0,0,0,0.5)] scale-[1.02] z-10`
                  : 'bg-slate-800/20 border-slate-700/30 opacity-40 blur-[1px]'}
               `}
            >
              <div className={`text-5xl mb-2 drop-shadow-md`}>{seg.icon}</div>
              <div className={`text-2xl font-black uppercase tracking-wider ${seg.textCol}`}>
                {seg.label}
              </div>
              <div className="w-full h-[2px] bg-white/10 my-1" />
              <p className={`text-3xl text-white font-bold leading-snug break-keep drop-shadow-sm`}>
                {seg.text}
              </p>

              {/* Active Glow Overlay */}
              {i === currentSegment && (
                <div className="absolute inset-0 rounded-3xl bg-white/5 animate-pulse pointer-events-none" />
              )}
            </div>
          ))}
        </div>

        {/* Row 2 */}
        <div className="grid grid-cols-2 gap-4 h-full">
          {segments.slice(2, 4).map((seg, i) => {
            const actualIndex = i + 2;
            return (
              <div
                key={seg.key}
                className={`relative p-6 rounded-3xl border-[3px] backdrop-blur-lg transition-all duration-500 flex flex-col justify-start gap-3
                    ${actualIndex === currentSegment
                    ? `bg-gradient-to-br ${seg.color} border-${seg.border.split('-')[1]}-400 shadow-[0_0_30px_rgba(0,0,0,0.5)] scale-[1.02] z-10`
                    : 'bg-slate-800/20 border-slate-700/30 opacity-40 blur-[1px]'}
                `}
              >
                <div className={`text-5xl mb-2 drop-shadow-md`}>{seg.icon}</div>
                <div className={`text-2xl font-black uppercase tracking-wider ${seg.textCol}`}>
                  {seg.label}
                </div>
                <div className="w-full h-[2px] bg-white/10 my-1" />
                <p className={`text-3xl text-white font-bold leading-snug break-keep drop-shadow-sm`}>
                  {seg.text}
                </p>

                {/* Active Glow Overlay */}
                {actualIndex === currentSegment && (
                  <div className="absolute inset-0 rounded-3xl bg-white/5 animate-pulse pointer-events-none" />
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Anchor Subtitle Bar */}
      <div className="absolute bottom-10 w-[92%] bg-slate-900/90 p-8 rounded-2xl border-l-[8px] border-blue-500 shadow-2xl backdrop-blur-xl">
        <div className="flex items-center gap-4 mb-3">
          <div className="bg-red-600 text-white text-xs font-black px-3 py-1 rounded-full uppercase tracking-widest animate-pulse shadow-red-500/50 shadow-lg">
            LIVE
          </div>
          <div className="text-slate-400 text-lg font-bold tracking-tight">
            AI ANALYST BRIEFING
          </div>
        </div>
        <div className="text-4xl font-bold text-white leading-normal tracking-tight drop-shadow-md">
          "{speechText}"
        </div>
      </div>
    </div>
  );
};
