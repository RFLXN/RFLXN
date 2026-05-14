import { Page, PageContents, type PageData } from "@/components/page";
import { FeaturedWork } from "@/components/featured-work";
import { PreviewImage } from "@/components/ui/preview-image";

const publicAsset = (fileName: string) => `${import.meta.env.BASE_URL}${fileName}`;

const worksPage: PageData = {
  title: "Works",
  subtitle: "Featured",
  label: "Featured Works",
  index: 3,
  element: (
    <Page snapEnd>
      <PageContents>
        <div className="space-y-4">
          <FeaturedWork
            title={"[FE] 동적 속성 테이블 기반 CRM 서비스 \"이노시트\""}
            href="https://github.com/InnoSage/front-end"
            stacks={[
              { icon: "typescript", label: "TypeScript" },
              { icon: "nextjs", label: "Next.js" },
              { icon: "docker", label: "Docker" },
              { icon: "ec2", label: "AWS" }
            ]}
          >
            <p className="text-sm font-medium tracking-[-0.01em] text-app-accent sm:text-[15px]">
              한국외대 캡스톤 프로젝트(졸업작품) / 현업 멘토 지도 하에 진행
            </p>

            <p className="text-sm leading-6 text-app-text-muted sm:text-base">
              Next.js/TypeScript 기반 CRM 프로젝트의 프론트엔드 개발을 맡았습니다. <br />
              Mantine, Zustand, AG Grid를 통해 UI, 상태관리, 테이블을 구현했습니다. <br />
              JWT를 이용한 로그인/인증 플로우부터, RestAPI와 Next.js server action을 통한 서버와의 통신까지 <br />
              FE 전반에 대한 설계와 구현을 담당했습니다. <br />
              Docker, AWS, Cloudflare를 통해 Next.js 서버 배포까지 직접 구성했습니다.
            </p>

            <PreviewImage
              src={publicAsset("inno-sheet.ex.png")}
              alt="InnoSheet UI"
              title="UI"
            />
            <PreviewImage
              src={publicAsset("inno-sheet.arch.png")}
              alt="InnoSheet Architecture"
              title="아키텍쳐"
            />
          </FeaturedWork>

          <FeaturedWork
            title={"[BE] 중고 대여 플랫폼 \"빌빌\""}
            href="https://github.com/billbill-umc/bilbil_backend"
            stacks={[
              { icon: "javascript", label: "JavaScript" },
              { icon: "express", label: "Express" },
              { icon: "mysql", label: "MySQL" },
              { icon: "redis", label: "Redis" },
              { icon: "gh-actions", label: "GitHub Actions" },
              { icon: "docker", label: "Docker" },
              { icon: "ec2", label: "AWS" }
            ]}
          >
            <p className="text-sm font-medium tracking-[-0.01em] text-app-accent sm:text-[15px]">
              대학 연합 동아리 UMC 팀 프로젝트
            </p>

            <p className="text-sm leading-6 text-app-text-muted sm:text-base">
              Express/JavaScript 기반 중고 대여 플랫폼의 백엔드 개발을 맡았습니다. <br />
              DB로는 Redis와 MySQL+Knex.js를 이용했습니다. <br />
              Redis, Passport.js, JWT를 통한 인증부터 Redis Pub/Sub, Socket.io를 통한 실시간 채팅까지 <br />
              BE 전반에 대한 설계와 구현을 담당했습니다. <br />
              GitHub Actions를 통한 CI/CD 구현과 Docker/AWS 기반 배포까지 다뤘습니다.
            </p>

            <PreviewImage
              src={publicAsset("bilbil.arch.png")}
              alt="BilBil Architecture"
              title="아키텍쳐"
            />
          </FeaturedWork>
        </div>
      </PageContents>
    </Page>
  )
};

export default worksPage;
