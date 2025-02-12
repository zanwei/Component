/// <reference types="vite-plugin-svgr/client" />

declare module '*.svg?react' {
    import React from 'react';
    const SVGComponent: React.FC<React.SVGProps<SVGSVGElement>>;
    export default SVGComponent;
}

declare type SVGComponent = React.FC<React.SVGProps<SVGSVGElement>>; 