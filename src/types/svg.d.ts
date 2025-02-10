/// <reference types="vite-plugin-svgr/client" />

declare module '*.svg?react' {
    import React = require('react');
    const Component: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
    export default Component;
}

declare type SVGComponent = React.FC<React.SVGProps<SVGSVGElement>>; 