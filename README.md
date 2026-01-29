# 🎬 AI Agent + Remotion Skills 비디오 생성 튜토리얼

이 문서는 AI 에이전트 도구를 활용하여 복잡한 데이터를 고품질 인포그래픽 영상으로 변환하는 과정을 설명하는 튜토리얼입니다. 

## 🤖 지원되는 AI 도구
이 튜토리얼의 프롬프트는 **Remotion Skills**를 지원하는 다음의 AI 도구들에서 최적으로 작동합니다:
- **Antigravity**, **Claude Code**, **Codex**, **Cursor**, **Droid**, **Gemini CLI**, **OpenCode**, **Windsurf** 등

## 📺 최종 결과물 미리보기

<div align="center">
  <a href="./assets/StockReport-0129.mp4">
    <img src="https://img.shields.io/badge/▶%20Watch%20Video-Stock%20Report-blue?style=for-the-badge" alt="Watch Video">
  </a>
  <br>
  <a href="./assets/StockReport-0129.mp4">영상이 보이지 않으면 여기를 클릭하여 확인하세요</a>
  <p><em>AI 에이전트가 생성한 주가 분석 리포트 영상</em></p>
</div>

---

## ⚙️ 프로젝트 초기 셋팅

### 📁 프로젝트 생성

먼저 만들 프로젝트의 디렉토리를 만들고 이동해서 계속 진행하세요.

```bash
mkdir my-first-video
cd my-first-video
```

터미널을 열고 다음 명령어를 실행하세요:

```bash
npx create-video@latest
```

### 🛠 설정 옵션 선택

실행하면 몇 가지 질문이 나타납니다. 아래와 같이 선택하세요:

```
Welcome to Remotion!

✔ Choose a template: › Blank (Nothing except an empty canvas)
✔ Add TailwindCSS? … No / Yes  ← "Yes" 선택
✔ Add agent skills? … No / Yes  ← "Yes" 선택
```

#### 각 옵션 설명:

|     옵션     | 권장 선택 | 이유                         |
| :----------: | :-------: | :--------------------------- |
|   Template   | **Blank** | 깔끔한 빈 캔버스에서 시작    |
| TailwindCSS  |  **Yes**  | 스타일링을 쉽게 할 수 있음   |
| Agent skills |  **Yes**  | AI가 Remotion을 더 잘 이해함 |

---

## 🛠 준비 단계 (Prerequisites)

AI 에이전트에게 전달할 기초 데이터 파일이 필요합니다. 본 프로젝트에서는 `prompt/` 디렉토리에 다음 파일들을 준비했습니다.

1.  **`2026-01-29.json`**: 종합 지수 및 각 종목별 수치 데이터.
2.  **`2026-01-29-analysis.md`**: 원인, 현상, 결과, 미래 전망이 담긴 상세 분석 리포트.

---

## ⚡ 단계별 AI 프롬프트 가이드

AI 도구(Antigravity, Claude Code 등)를 열고 아래 프롬프트들을 순서대로 입력해보세요.

### Step 1. 기본 영상 구조 생성
> **Prompt:**
> "prompt/2026-01-29.json와 prompt/2026-01-29-analysis.md 파일을 바탕으로 Remotion Skills를 활용해 영상을 만들어줘. 분석 내용을 충분히 읽을 수 있는 인터벌을 두고, 한국어 자막이 포함된 인포그래픽 형태의 리포트 영상을 생성해줘."

### Step 2. 앵커 브리핑 스타일 적용
> **Prompt:**
> "주가 리포트를 실제 앵커가 읽어주는 것처럼 자연스러운 한국어 구어체(~입니다, ~전망됩니다)로 자막을 수정하고 화면 하단에 세련된 자막 바를 넣어줘."

### Step 3. AI TTS 음성 삽입 및 싱크 조정
> **Prompt:**
> "고품질 한국어 여성 TTS 음성을 생성해서 영상에 추가해줘. 음성 속도를 1.5배속으로 올리고, 음성이 겹치지 않도록 영상 길이를 자동으로 재조정해서 자막과 싱크를 정확히 맞춰줘."

### Step 4. 프리미엄 인포그래픽 디자인 개선
> **Prompt:**
> "주가 리포트 인포그래픽 디자인을 더 세련되게 수정해줘. Glassmorphism 효과, 네온 발광, 섹션별 아이콘을 추가해서 가독성과 미적 완성도를 높여줘."

### Step 5. 배경음악(BGM) 추가
> **Prompt:**
> "경제 리포트 영상에 어울리는 잔잔한 무료 BGM을 다운로드해서 넣어줘. TTS 음성이 잘 들리도록 배경음악 볼륨은 10% 정도로 낮게 설정해줘."

---

## ▶️ 개발 서버 시작 및 관리

AI가 코드를 모두 작성했다면, 다음 명령어로 로컬에서 확인하고 렌더링할 수 있습니다.

```bash
npm run dev
```

실행하면 브라우저가 자동으로 열리면서 **Remotion Studio**가 표시됩니다.

**Remotion Studio에서 할 수 있는 것:**
- 영상 미리보기 및 타임라인 조작
- 실시간 코드 변경 반영 확인
- 최종 영상 렌더링 (내보내기)

> 💡 **팁:** 빌드 및 TTS 생성을 위해 추가적인 설정이 필요할 수 있습니다:
> ```bash
> # TTS 기능을 위한 파이썬 환경 설정
> python3 -m venv .venv
> source .venv/bin/activate
> pip install edge-tts asyncio
> # 음성 파일 생성
> python scripts/generate_tts.py
> ```

---

## 📁 주요 파일 설명
- **`src/animations/stock-report-0129/StockCard.tsx`**: 인포그래픽 디자인 및 인터랙티브 하이라이트 로직의 핵심.
- **`scripts/generate_tts.py`**: 에이전트가 작성한 TTS 자동화 스크립트.
- **`prompt/PROMPT.md`**: 작업에 사용된 원본 프롬프트 저장 기록.

---
**이 튜토리얼을 통해 누구나 AI 에이전트와 함께 데이터만으로 전문가 수준의 영상을 제작할 수 있습니다.**
