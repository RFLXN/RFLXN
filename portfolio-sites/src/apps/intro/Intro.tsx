import {
  ArrowRight,
  MousePointer2,
  Move,
  ALargeSmall,
  PanelsTopLeft,
} from "lucide-react";
import type { AppProps } from "../types";
import { profile } from "../../content/portfolio";
export function Intro({ openApp }: AppProps) {
  return (
    <article className="folio-page intro-page">
      <div className="eyebrow">RFLXN / PERSONAL DESKTOP</div>
      <div className="intro-hero">
        <div>
          <h1>환영합니다</h1>
          <p>
            {profile.role}
            <br />
            <strong>{profile.name}</strong>의 포트폴리오입니다.
          </p>
        </div>
        <div className="intro-art" aria-hidden="true">
          <div className="mini-window back" />
          <div className="mini-window front">
            <div className="mini-title">
              <i />
              <i />
              <i />
            </div>
            <span>hello, visitor.</span>
            <div className="mini-lines">
              <i />
              <i />
              <i />
            </div>
          </div>
        </div>
      </div>
      <div className="intro-actions">
        <button
          className="app-button primary"
          onClick={() => openApp({ appId: "profile" })}
        >
          프로필 보기 <ArrowRight size={16} />
        </button>
      </div>
      <section className="intro-guide" aria-label="기본 사용 방법">
        {[
          [
            MousePointer2,
            "앱 열기",
            "바탕화면 아이콘을 한 번 눌러 열어보세요.",
          ],
          [
            Move,
            "내게 맞게 배치",
            "제목 표시줄로 이동하고, 창 가장자리로 크기를 바꿔보세요.",
          ],
          [
            PanelsTopLeft,
            "열린 앱으로 돌아가기",
            "최소화한 앱은 상단의 아이콘으로 다시 열 수 있어요.",
          ],
          [
            ALargeSmall,
            "편하게 읽기",
            "상단의 S · M · L로 글자 크기를 조절할 수 있어요.",
          ],
        ].map(([Icon, title, text]) => {
          const GuideIcon = Icon as typeof Move;
          return (
            <div key={String(title)}>
              <GuideIcon size={19} aria-hidden="true" />
              <div>
                <h2>{String(title)}</h2>
                <p>{String(text)}</p>
              </div>
            </div>
          );
        })}
      </section>
    </article>
  );
}
