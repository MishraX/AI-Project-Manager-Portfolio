"use client";
import React, { useRef, useState } from 'react';
import { FaCalendarAlt, FaCheckCircle } from 'react-icons/fa';

export default function SpotlightCard({ role, company, duration, children, accentColor = "cyan" }) {
    const divRef = useRef(null);
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [opacity, setOpacity] = useState(0);

    const handleMouseMove = (e) => {
        if (!divRef.current) return;
        const rect = divRef.current.getBoundingClientRect();
        setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
    };

    const handleMouseEnter = () => setOpacity(1);
    const handleMouseLeave = () => setOpacity(0);

    const colorMap = {
        cyan: 'rgb(6, 182, 212)',
        purple: 'rgb(168, 85, 247)',
        blue: 'rgb(59, 130, 246)'
    };
    const rgb = colorMap[accentColor] || colorMap.cyan;

    return (
        <div
            ref={divRef}
            onMouseMove={handleMouseMove}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            className={`relative rounded-3xl border border-white/10 bg-white/5 overflow-hidden transition-transform duration-300 hover:scale-[1.01]`}
        >
            {/* Spotlight Gradient */}
            <div
                className="pointer-events-none absolute -inset-px opacity-0 transition-opacity duration-300 z-0"
                style={{
                    opacity,
                    background: `radial-gradient(600px circle at ${position.x}px ${position.y}px, ${rgb.replace(')', ', 0.15)')}, transparent 40%)`
                }}
            />

            {/* Border Spotlight */}
            <div
                className="pointer-events-none absolute inset-0 z-0"
                style={{
                    background: `radial-gradient(600px circle at ${position.x}px ${position.y}px, ${rgb.replace(')', ', 0.4)')}, transparent 40%)`,
                    maskImage: 'linear-gradient(black, black) content-box, linear-gradient(black, black) border-box',
                    maskComposite: 'exclude',
                    WebkitMaskComposite: 'xor',
                    padding: '1px' // Border width
                }}
            />

            <div className="relative z-10 p-8 md:p-10 h-full flex flex-col">
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-6">
                    <div>
                        <h3 className="text-2xl md:text-3xl font-bold text-white mb-1 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-gray-400 transition-all cursor-default w-fit">
                            {role}
                        </h3>
                        <p className="text-xl font-medium tracking-wide" style={{ color: rgb }}>{company}</p>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-400 bg-black/40 px-3 py-1 rounded-full border border-white/5">
                        <FaCalendarAlt className="text-xs" />
                        <span>{duration}</span>
                    </div>
                </div>

                {/* Content */}
                <div className="text-gray-400 leading-relaxed space-y-4">
                    {children}
                </div>
            </div>
        </div>
    );
}
