/**
 * Fixing react svg module.
 */
declare module '*.svg' {
    import React = require('global');
    export const ReactComponent: React.FC<React.SVGProps<SVGSVGElement>>;
    const src: string;
    export default src;
}