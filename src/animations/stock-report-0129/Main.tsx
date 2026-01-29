import React from 'react';
import { AbsoluteFill, Series, useCurrentFrame, useVideoConfig, interpolate, spring, staticFile } from 'remotion';
import { Audio } from "@remotion/media";
import { Background } from './Background';
import { StockCard } from './StockCard';
import '../../index.css';

const stocks = [
  {
    name: "삼성전자",
    code: "005930",
    price: 162400,
    change: 1.82,
    title: "16만원 안착 시도",
    variant: 'up',
    analysis: {
      cause: "메모리 반도체 슈퍼사이클 도래 기대감 및 저가 매수세 유입",
      phenomenon: "최근 하락세에서 벗어나 +1%대 반등 시도, 5일선 회복 움직임",
      result: "16만원 대 주가 지지력 확보 및 투자 심리 개선",
      future: "165,000원 저항선 돌파 시 본격적인 우상향 추세 전환 예상"
    }
  },
  {
    name: "LG에너지솔루션",
    code: "373220",
    price: 431000,
    change: 5.51,
    title: "2차전지 심리 호전",
    variant: 'up',
    analysis: {
      cause: "2차전지 섹터 전반의 투자 심리 호전 및 실적 개선 기대",
      phenomenon: "거래량을 동반한 +5% 이상 급등, 5일 이동평균선 강하게 상향 돌파",
      result: "섹터 주도주로서의 지위 재확인, 기술적 과열권 진입 직전",
      future: "440,000원 매물대 소화 과정이 필요하며, 눌림목 발생 시 매수 기회"
    }
  },
  {
    name: "TIGER KRX금현물",
    code: "0072R0",
    price: 16880,
    change: 3.21,
    title: "안전자산 선호 지속",
    variant: 'gold',
    analysis: {
      cause: "글로벌 불확실성 증대에 따른 안전자산(금) 선호 현상 지속",
      phenomenon: "역사적 신고가 경신 흐름, 5일선을 따라 가파른 상승세",
      result: "포트폴리오 내 헷지 자산으로서 최고의 수익률 달성",
      future: "단기 급등에 따른 피로감 존재하나, 17,000원 안착 시도 지속 전망"
    }
  },
  {
    name: "ACE 미국30년국채",
    code: "453850",
    price: 7695,
    change: 0.39,
    title: "금리 인하 사이클 기대",
    variant: 'up',
    analysis: {
      cause: "주요국 금리 인하 사이클 진입 기대감",
      phenomenon: "변동성 없이 꾸준히 저점을 높여가는 우상향 패턴",
      result: "7,600원대 안착 및 평단가 회복",
      future: "금리 정책 발표 전까지 완만한 상승 기조 유지 예상"
    }
  },
  {
    name: "ACE 테슬라밸류체인",
    code: "457480",
    price: 21540,
    change: 0.00,
    title: "기간 조정 진행 중",
    variant: 'flat',
    analysis: {
      cause: "테슬라 본주의 주가 정체 및 전기차 수요 둔화 우려",
      phenomenon: "뚜렷한 반등 없이 5일선 아래에서 기간 조정 진행 중",
      result: "투자자들의 관망세 짙어짐, 모멘텀 부재",
      future: "실적 발표나 대형 호재 전까지 박스권 등락 (21,500원 지지 테스트)"
    }
  },
  {
    name: "현대차3우B",
    code: "005389",
    price: 261500,
    change: 0.00,
    title: "보합권 유지",
    variant: 'flat',
    analysis: {
      cause: "밸류업 프로그램 기대감 및 고배당 매력",
      phenomenon: "주가 변동폭이 극히 적은 보합권 유지",
      result: "하락장에서 방어력은 좋으나 상방 탄력 부족",
      future: "배당 시즌이나 지배구조 이슈 발생 시까지 현 가격대 유지 전망"
    }
  },
  {
    name: "이스트에이드",
    code: "239340",
    price: 1758,
    change: -1.16,
    title: "약세 지속",
    variant: 'flat', // Negative but using flat color logic or add logic for down if needed. Using flat as placeholder or define 'down'
    analysis: {
      cause: "신규 성장 동력 부재 및 차익 실현 매물 출회",
      phenomenon: "5일선 저항을 맞고 지속적인 우하향 곡선 그림",
      result: "심리적 지지선 위협, 저가 매수 유입 부재",
      future: "1,700원 이탈 시 추가 하락 위험, 기술적 반등 시 비중 축소 고려"
    }
  },
  {
    name: "네오펙트",
    code: "290660",
    price: 863,
    change: 0.00,
    title: "숨고르기 장세",
    variant: 'flat',
    analysis: {
      cause: "(전일) 개별 호재 혹은 과대 낙폭에 따른 기술적 매수세 폭발",
      phenomenon: "상한가 이후 숨고르기 혹은 변동성 확대 장세",
      result: "단기 트레이딩 영역 진입, 보유자의 영역",
      future: "5일선과의 이격이 좁혀질 때까지 조정 가능성, 800원 지지 핵심"
    }
  },
  {
    name: "피엔티",
    code: "137400",
    price: 51900,
    change: 6.67,
    title: "실적 기반 강세",
    variant: 'up',
    analysis: {
      cause: "수주 잔고 기반의 실적 안정성 및 2차전지 장비주 순환매",
      phenomenon: "+6%대 강세, 전고점 돌파 시도",
      result: "상승 추세 강화, 매수 심리 자극",
      future: "55,000원 목표가 도달 가능성 높음, 거래량 유지가 관건"
    }
  },
  {
    name: "SOL 양자컴퓨터",
    code: "0023A0",
    price: 26210,
    change: 0.00,
    title: "횡보세",
    variant: 'flat',
    analysis: {
      cause: "아직 개화하지 않은 미래 기술에 대한 기대와 우려 공존",
      phenomenon: "등락폭 제한적인 횡보세",
      result: "시장의 주도 테마에서 비껴나 있음",
      future: "양자컴퓨터 관련 구체적 성과 뉴스 전까지 지루한 흐름 예상"
    }
  }
];

// Helper to determine variant
const getVariant = (change: number, code: string): 'up' | 'gold' | 'flat' => {
  if (code === '0072R0') return 'gold';
  if (change > 0) return 'up';
  return 'flat';
};

const Intro = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const scale = spring({
    frame,
    fps,
    config: { damping: 10, stiffness: 100 }
  });

  return (
    <AbsoluteFill className="items-center justify-center bg-black/40">
      <div
        style={{ transform: `scale(${scale})` }}
        className="flex flex-col items-center gap-4"
      >
        <div className="text-8xl font-black text-white tracking-tighter drop-shadow-lg">
          1월 29일
        </div>
        <div className="text-6xl font-bold text-blue-400 tracking-tight bg-white/10 px-8 py-2 rounded-full backdrop-blur-md">
          시장 핵심 분석 리포트
        </div>
      </div>
    </AbsoluteFill>
  );
};

const Outro = () => {
  const frame = useCurrentFrame();
  const { height } = useVideoConfig();

  const offset = interpolate(frame, [0, 60], [height, 350], {
    extrapolateRight: 'clamp',
  });

  return (
    <AbsoluteFill className="items-center bg-slate-900/95">
      <div className="absolute top-10 text-center z-10 bg-slate-800/90 p-8 rounded-2xl backdrop-blur-md border border-slate-600 shadow-2xl w-[90%]">
        <div className="text-4xl text-gray-300 mb-3 font-semibold">시장 요약</div>
        <div className="text-6xl font-bold text-white tracking-tight">변동성 확대 속 옥석 가리기</div>
      </div>

      <div
        className="absolute w-full px-8 flex flex-col gap-4 pb-20"
        style={{ transform: `translateY(${offset}px)` }}
      >
        {stocks.map((stock, i) => (
          <div key={i} className="flex justify-between items-center bg-slate-800/80 p-5 rounded-xl border border-slate-700 backdrop-blur-sm">
            <span className="text-4xl text-white font-bold tracking-tight">{stock.name}</span>
            <div className="flex gap-6 items-center">
              <span className="text-3xl text-slate-400 font-medium tabular-nums">{stock.price.toLocaleString()}</span>
              <span className={`text-3xl font-bold tabular-nums ${stock.change > 0 ? 'text-[#22c55e]' : stock.change < 0 ? 'text-[#ef4444]' : 'text-[#94a3b8]'
                }`}>
                {stock.change > 0 ? '+' : ''}{stock.change}%
              </span>
            </div>
          </div>
        ))}
      </div>
    </AbsoluteFill>
  );
};

export const StockReport = () => {
  return (
    <AbsoluteFill className="bg-[#0f172a] text-white">
      <Background />
      <Audio src={staticFile("audio/bgm.mp3")} volume={0.10} loop />

      <Series>
        {/* Intro */}
        <Series.Sequence durationInFrames={90}>
          <Intro />
        </Series.Sequence>

        {/* Stock Items */}
        {stocks.map((stock, i) => (
          <Series.Sequence key={i} durationInFrames={520}>
            <StockCard
              index={i}
              name={stock.name}
              change={stock.change}
              title={stock.title}
              variant={getVariant(stock.change, stock.code)}
              analysis={stock.analysis}
            />
          </Series.Sequence>
        ))}

        {/* Outro */}
        <Series.Sequence durationInFrames={300}>
          <Outro />
        </Series.Sequence>
      </Series>
    </AbsoluteFill>
  );
};
