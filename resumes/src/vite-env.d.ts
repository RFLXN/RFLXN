/// <reference types="vite/client" />

declare module '*.mdx' {
  import type { ComponentType } from 'react';

  export const resumeMeta: {
    lang: string;
    title: string;
  };

  const MDXComponent: ComponentType;
  export default MDXComponent;
}
