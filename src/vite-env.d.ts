/// <reference types="vite/client" />
/// <reference types="vite-plugin-svgr/client" />

declare module '*.svg' {
  const content: any;
  export default content;
}

declare module '*.svg?react' {
  import * as React from 'react';
  const Component: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
  export default Component;
} 