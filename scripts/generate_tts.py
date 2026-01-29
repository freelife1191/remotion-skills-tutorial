import os
import asyncio
import edge_tts

# Ensure output directory exists
output_dir = "public/audio"
os.makedirs(output_dir, exist_ok=True)

VOICE = "ko-KR-SunHiNeural" # High quality Korean Female Voice

def format_speech(text):
    t = text.strip()
    if t.endswith("전망"): return t + "됩니다."
    if t.endswith("기대"): return t + "됩니다."
    if t.endswith("필요"): return t + "합니다."
    if t.endswith("가능성"): return t + "이 있습니다."
    if t.endswith("우려"): return t + "됩니다."
    if t.endswith("유입"): return t + "되고 있습니다."
    if t.endswith("지속"): return t + "되고 있습니다."
    if t.endswith("확대"): return t + "되고 있습니다."
    if t.endswith("진입"): return t + "했습니다."
    if t.endswith("확인"): return t + "됩니다."
    if t.endswith("부족"): return t + "한 모습입니다."
    if t.endswith("양호"): return t + "합니다."
    if t.endswith("회복"): return t + "세를 보입니다."
    if t.endswith("돌파"): return t + "했습니다."
    if t.endswith("반등"): return t + "했습니다."
    if t.endswith("증가"): return t + "했습니다."
    if t.endswith("감소"): return t + "했습니다."
    if t.endswith("시도"): return t + "하고 있습니다."
    if t.endswith("유지"): return t + "하고 있습니다."
    if t.endswith("매력"): return t + "이 부각됩니다."
    if t.endswith("강화"): return t + "되고 있습니다."
    if t.endswith("자극"): return t + "하고 있습니다."
    if t.endswith("공존"): return t + "하고 있습니다."
    if t.endswith("부재"): return t + "합니다."
    if t.endswith("위협"): return t + "받고 있습니다."
    if t.endswith("폭발"): return t + "했습니다."
    if t.endswith("그림"): return t + "려지고 있습니다."
    if t.endswith("테스트"): return t + "가 예상됩니다."
    if t.endswith("관건"): return t + "입니다."
    if t.endswith("영역"): return t + "입니다."
    if t.endswith("보임"): return t + "니다."
    if t.endswith("중"): return t + "입니다."
    if t.endswith("있음"): return t[:-2] + "있습니다."
    
    # Extra fix for hanging sentences
    if not t.endswith((".", "요", "다", "까")):
        return t + "."
        
    return t

stocks = [
  {
    "name": "삼성전자",
    "analysis": {
      "cause": "메모리 반도체 슈퍼사이클 도래 기대감 및 저가 매수세 유입",
      "phenomenon": "최근 하락세에서 벗어나 +1%대 반등 시도, 5일선 회복 움직임",
      "result": "16만원 대 주가 지지력 확보 및 투자 심리 개선",
      "future": "165,000원 저항선 돌파 시 본격적인 우상향 추세 전환 예상"
    }
  },
  {
    "name": "LG에너지솔루션",
    "analysis": {
      "cause": "2차전지 섹터 전반의 투자 심리 호전 및 실적 개선 기대",
      "phenomenon": "거래량을 동반한 +5% 이상 급등, 5일 이동평균선 강하게 상향 돌파",
      "result": "섹터 주도주로서의 지위 재확인, 기술적 과열권 진입 직전",
      "future": "440,000원 매물대 소화 과정이 필요하며, 눌림목 발생 시 매수 기회"
    }
  },
  {
    "name": "TIGER KRX금현물",
    "analysis": {
      "cause": "글로벌 불확실성 증대에 따른 안전자산(금) 선호 현상 지속",
      "phenomenon": "역사적 신고가 경신 흐름, 5일선을 따라 가파른 상승세",
      "result": "포트폴리오 내 헷지 자산으로서 최고의 수익률 달성",
      "future": "단기 급등에 따른 피로감 존재하나, 17,000원 안착 시도 지속 전망"
    }
  },
  {
    "name": "ACE 미국30년국채",
    "analysis": {
      "cause": "주요국 금리 인하 사이클 진입 기대감",
      "phenomenon": "변동성 없이 꾸준히 저점을 높여가는 우상향 패턴",
      "result": "7,600원대 안착 및 평단가 회복",
      "future": "금리 정책 발표 전까지 완만한 상승 기조 유지 예상"
    }
  },
  {
    "name": "ACE 테슬라밸류체인",
    "analysis": {
      "cause": "테슬라 본주의 주가 정체 및 전기차 수요 둔화 우려",
      "phenomenon": "뚜렷한 반등 없이 5일선 아래에서 기간 조정 진행 중",
      "result": "투자자들의 관망세 짙어짐, 모멘텀 부재",
      "future": "실적 발표나 대형 호재 전까지 박스권 등락 (21,500원 지지 테스트)"
    }
  },
  {
    "name": "현대차3우B",
    "analysis": {
      "cause": "밸류업 프로그램 기대감 및 고배당 매력",
      "phenomenon": "주가 변동폭이 극히 적은 보합권 유지",
      "result": "하락장에서 방어력은 좋으나 상방 탄력 부족",
      "future": "배당 시즌이나 지배구조 이슈 발생 시까지 현 가격대 유지 전망"
    }
  },
  {
    "name": "이스트에이드",
    "analysis": {
      "cause": "신규 성장 동력 부재 및 차익 실현 매물 출회",
      "phenomenon": "5일선 저항을 맞고 지속적인 우하향 곡선 그림",
      "result": "심리적 지지선 위협, 저가 매수 유입 부재",
      "future": "1,700원 이탈 시 추가 하락 위험, 기술적 반등 시 비중 축소 고려"
    }
  },
  {
    "name": "네오펙트",
    "analysis": {
      "cause": "(전일) 개별 호재 혹은 과대 낙폭에 따른 기술적 매수세 폭발",
      "phenomenon": "상한가 이후 숨고르기 혹은 변동성 확대 장세",
      "result": "단기 트레이딩 영역 진입, 보유자의 영역",
      "future": "5일선과의 이격이 좁혀질 때까지 조정 가능성, 800원 지지 핵심"
    }
  },
  {
    "name": "피엔티",
    "analysis": {
      "cause": "수주 잔고 기반의 실적 안정성 및 2차전지 장비주 순환매",
      "phenomenon": "+6%대 강세, 전고점 돌파 시도",
      "result": "상승 추세 강화, 매수 심리 자극",
      "future": "55,000원 목표가 도달 가능성 높음, 거래량 유지가 관건"
    }
  },
  {
    "name": "SOL 양자컴퓨터",
    "analysis": {
      "cause": "아직 개화하지 않은 미래 기술에 대한 기대와 우려 공존",
      "phenomenon": "등락폭 제한적인 횡보세",
      "result": "시장의 주도 테마에서 비껴나 있음",
      "future": "양자컴퓨터 관련 구체적 성과 뉴스 전까지 지루한 흐름 예상"
    }
  }
]

keys = ['cause', 'phenomenon', 'result', 'future']

async def generate(text, filename, sem):
    async with sem:
        communicate = edge_tts.Communicate(text, VOICE, rate="+50%")
        await communicate.save(filename)
        print(f"Generated {filename}")

async def generate_all_tts():
    tasks = []
    sem = asyncio.Semaphore(5) # Limit to 5 concurrent requests
    print("Starting generation...")
    for i, stock in enumerate(stocks):
        for j, key in enumerate(keys):
            original_text = stock['analysis'][key]
            text_to_speak = format_speech(original_text)
            
            filename = f"{output_dir}/stock_{i}_{j}.mp3"
            tasks.append(generate(text_to_speak, filename, sem))
            
    await asyncio.gather(*tasks)
    print("Done generating audio files.")

if __name__ == "__main__":
    asyncio.run(generate_all_tts())
