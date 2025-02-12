/// <reference types="vite/client" />
/// <reference types="vite-plugin-svgr/client" />

declare module '*.svg' {
  const content: string;
  export default content;
}

declare module '*.svg?react' {
  import * as React from 'react';
  const Component: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  export default Component;
} 