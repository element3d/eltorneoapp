import React from 'react';
import LegendIconSvg from './assets/LegendIcon.svg'
import ProIconSvg from './assets/ProIcon.svg'
import AmateurIconSvg from './assets/AmateurIcon.svg'
import RegularIconSvg from './assets/RegularIcon.svg'
import SuperstarIconSvg from './assets/SuperstarIcon.svg'

const LegendIcon = React.memo(function LegendIcon({ size = 26 }) {
    return (
        <LegendIconSvg
            width={size}
            height={size}
        />
    );
});

const ProIcon = React.memo(function LegendIcon({ size = 30 }) {
    return (
        <ProIconSvg
            width={size}
            height={size - 6}
        />
    );
});

const AmateurIcon = React.memo(function LegendIcon({ size = 22 }) {
    return (
        <AmateurIconSvg
            width={size}
            height={size}
        />
    );
});

const RegularIcon = React.memo(function RegularIcon({ size = 22 }) {
    return (
        <RegularIconSvg
            width={size}
            height={size}
        />
    );
});

const SuperstarIcon = React.memo(function SuperstarIcon({ size = 22 }) {
    return (
        <SuperstarIconSvg
            width={size}
            height={size}
        />
    );
});

export { LegendIcon, ProIcon, AmateurIcon, RegularIcon, SuperstarIcon }