import React, { useMemo } from 'react';
import './AbstractPattern.css';

const hashString = (str) => {
    let hash = 0;
    if (!str) return 0;
    for (let i = 0; i < str.length; i++) {
        const char = str.charCodeAt(i);
        hash = ((hash << 5) - hash) + char;
        hash = hash & hash;
    }
    return Math.abs(hash);
};

const AbstractPattern = ({ seed, color }) => {
    const { shapes, bgGradient } = useMemo(() => {
        const hash = hashString(seed);
        const shapeCount = 6;
        const items = [];

        const random = (offset) => {
            const x = Math.sin(hash * (offset + 1) * 999) * 10000;
            return x - Math.floor(x);
        };

        for (let i = 0; i < shapeCount; i++) {
            const size = 50 + random(i * 10) * 50;
            const x = random(i * 20) * 80;
            const y = random(i * 30) * 80;
            const duration = 15 + random(i * 40) * 15;
            const delay = -(random(i * 50) * 10);

            const isAccent = i % 2 === 0;
            const fill = isAccent ? color : '#ffffff';
            const opacity = 0.3 + random(i * 60) * 0.5;

            items.push({
                id: i,
                cx: `${x}%`, cy: `${y}%`,
                rx: `${size / 1.5}%`, ry: `${size / 2}%`,
                fill, opacity,
                duration: `${duration}s`, delay: `${delay}s`,
                rotation: random(i * 70) * 360
            });
        }

        const c1 = color;
        const gradient = `radial-gradient(circle at 30% 30%, ${c1}40, transparent 60%), 
                          radial-gradient(circle at 70% 70%, ${c1}20, transparent 50%),
                          linear-gradient(135deg, #f8fafc 0%, #ffffff 100%)`;

        return { shapes: items, bgGradient: gradient };
    }, [seed, color]);

    return (
        <div className="abstract-pattern-container" style={{ background: bgGradient }}>
            <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg" className="abstract-svg">
                {shapes.map((shape) => (
                    <ellipse key={shape.id} className="floating-shape" cx={shape.cx} cy={shape.cy} rx={shape.rx} ry={shape.ry} fill={shape.fill} opacity={shape.opacity}
                             style={{ transformBox: 'fill-box', transformOrigin: 'center', '--duration': shape.duration, '--delay': shape.delay, transform: `rotate(${shape.rotation}deg)` }}
                    />
                ))}
            </svg>
            <div className="noise-overlay"></div>
            <div className="shine-overlay"></div>
        </div>
    );
};

export default AbstractPattern;