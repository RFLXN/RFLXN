import { Monitor, Laptop, Server } from "lucide-react";
import { Heading, ExternalLink } from "../shared/AppUI";
export function Preference() {
  return (
    <article className="folio-page preference-page">
      <Heading
        eyebrow="PREFERENCE / DEVELOPMENT ENVIRONMENT"
        title="매일 사용하는 개발 환경"
      >
        데스크톱과 노트북, 홈서버를 직접 구성하고 관리합니다.
      </Heading>
      <div className="environment-banner">
        <span className="eyebrow">LINUX, EVERY DAY</span>
        <h2>데스크톱부터 홈서버까지, NixOS.</h2>
        <p>
          서버에서만 Linux를 쓰는 것이 아니라 일상적인 데스크톱도 NixOS로
          사용합니다. 공통 설정과 기기별 차이를 코드로 분리해 관리합니다.
        </p>
      </div>
      <div className="device-cards">
        {[
          {
            Icon: Monitor,
            name: "Desktop",
            role: "일상과 개발",
            text: "Hyprland와 DMS를 사용하는 작업 환경",
            host: "rflxn-desktop",
          },
          {
            Icon: Laptop,
            name: "Laptop",
            role: "이동하며 작업",
            text: "Asahi 지원을 사용하는 Apple Silicon 환경",
            host: "rflxn-asahi",
          },
          {
            Icon: Server,
            name: "Home server",
            role: "직접 운영하는 서비스",
            text: "저장소·동기화·원격 개발을 위한 환경",
            host: "rflxn-server",
          },
        ].map(({ Icon, name, role, text, host }) => (
          <section key={host}>
            <Icon size={28} strokeWidth={1.4} />
            <h3>{name}</h3>
            <span className="eyebrow">{role}</span>
            <p>{text}</p>
            <ExternalLink
              href={`https://github.com/RFLXN/nix-flake/tree/main/hosts/${host}`}
            >
              구성 코드
            </ExternalLink>
          </section>
        ))}
      </div>
      <section className="folio-section">
        <h2>자주 쓰는 환경을 직접 구성합니다.</h2>
        <p>
          하나의 flake에서 여러 기기를 관리하고, 공통 모듈을 기기별로
          조합합니다.
        </p>
        <div className="contact-row">
          <ExternalLink href="https://github.com/RFLXN/nix-flake">
            NixOS 구성
          </ExternalLink>
        </div>
      </section>
    </article>
  );
}
