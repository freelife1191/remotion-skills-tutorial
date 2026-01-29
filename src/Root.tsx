import "./index.css";
import { Composition } from "remotion";
import { MyComposition } from "./Composition";
import { KbAiLabIntroComposition } from "./animations/kb-ai-lab-intro";
import { StockReport } from "./animations/stock-report-0129/Main";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="MyComp"
        component={MyComposition}
        durationInFrames={60}
        fps={30}
        width={1280}
        height={720}
      />
      <Composition
        id="KbAiLabIntro"
        component={KbAiLabIntroComposition}
        durationInFrames={150}
        fps={30}
        width={1920}
        height={1080}
      />
      <Composition
        id="StockReport-0129"
        component={StockReport}
        durationInFrames={5600}
        fps={30}
        width={1080}
        height={1920}
      />
    </>
  );
};
