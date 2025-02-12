/// <reference types="vite/client" />
/// <reference types="vite-plugin-svgr/client" />

declare module '*.svg' {
  import * as React from 'react';
  const Component: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
  export default Component;
}

declare module '*.svg?react' {
  import React = require('react');
  export const ReactComponent: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
  const src: string;
  export default ReactComponent;
} 