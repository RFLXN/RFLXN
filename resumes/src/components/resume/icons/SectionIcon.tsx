import type { SectionIconName } from '../types';

export function SectionIcon({ name }: { name: SectionIconName }) {
  if (name === 'education') return <GraduationCapIcon />;
  if (name === 'keypoints') return <CheckIcon />;
  if (name === 'profile') return <UserIcon />;
  if (name === 'projects') return <StarIcon />;
  if (name === 'stack') return <StackIcon />;

  return null;
}

function CheckIcon() {
  return (
    <svg aria-hidden="true" className="section-icon-svg" focusable="false" viewBox="0 0 16 16">
      <path
        d="m4.1 8.15 2.55 2.55 5.25-5.4"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      />
    </svg>
  );
}

function GraduationCapIcon() {
  return (
    <svg aria-hidden="true" className="section-icon-svg" focusable="false" viewBox="0 0 16 16">
      <path
        d="M1.75 6.05 8 3.25l6.25 2.8L8 8.85 1.75 6.05Z"
        fill="none"
        stroke="currentColor"
        strokeLinejoin="round"
        strokeWidth="1.5"
      />
      <path
        d="M4.25 7.35v3.05c0 1.25 1.68 2.15 3.75 2.15s3.75-.9 3.75-2.15V7.35M13.05 6.65v3.15"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
      />
      <path d="M13.05 10.95h.01" fill="none" stroke="currentColor" strokeLinecap="round" strokeWidth="2" />
    </svg>
  );
}

function StackIcon() {
  return (
    <svg aria-hidden="true" className="section-icon-svg" focusable="false" viewBox="0 0 16 16">
      <path
        d="M8 2.25 2.2 5.1 8 7.95l5.8-2.85L8 2.25ZM2.2 8.05 8 10.9l5.8-2.85M2.2 11 8 13.85 13.8 11"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.45"
      />
    </svg>
  );
}

function StarIcon() {
  return (
    <svg aria-hidden="true" className="section-icon-svg" focusable="false" viewBox="0 0 16 16">
      <path
        d="m8 2.45 1.55 3.15 3.48.5-2.52 2.45.6 3.46L8 10.38l-3.11 1.63.6-3.46L2.97 6.1l3.48-.5L8 2.45Z"
        fill="currentColor"
        stroke="currentColor"
        strokeLinejoin="round"
        strokeWidth="0.7"
      />
    </svg>
  );
}

function UserIcon() {
  return (
    <svg aria-hidden="true" className="section-icon-svg" focusable="false" viewBox="0 0 16 16">
      <path
        d="M8 8.1a2.75 2.75 0 1 0 0-5.5 2.75 2.75 0 0 0 0 5.5ZM3.25 13.4c.55-2.25 2.25-3.55 4.75-3.55s4.2 1.3 4.75 3.55"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.6"
      />
    </svg>
  );
}
