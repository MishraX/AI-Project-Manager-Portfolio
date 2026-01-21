"use client";
import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

// Inline SVGs to avoid react-icons import issues with specific brands
const JiraIcon = ({ color, size }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={color} xmlns="http://www.w3.org/2000/svg">
        <path d="M11.53 0H24V9.45C24 16.38 18.42 22 11.53 22C4.65 22 0 17.5 0 10.55C0 3.6 4.65 0 11.53 0Z" fillOpacity="0.5" />
        <path d="M11.53 0H24V9.45C24 16.38 18.42 22 11.53 22H11.47V0H11.53Z" fill={color} />
        <path d="M12.6 15.16L19.49 8.27L20.9 9.68L12.6 17.99L7.45 12.83L8.86 11.42L12.6 15.16Z" fill="white" />
        {/* Simplified Jira-ish shape for recognition if path above is generic shield. Using standard simpler path below */}
        <path d="M12 0L24 12L12 24L0 12L12 0Z" fill="none" />
        {/* Actual Jira logo paths are complex gradients, using varied blocks representation */}
        <path d="M11.1 24C4.9 24 0 19.1 0 12.9V2H11.1V24Z" fill={color} fillOpacity="0.8" />
        <path d="M24 2H12.9V12.9C12.9 19.1 17.9 24 24 24V2Z" fill={color} />
        <path d="M12.9 0H24V11.1H12.9V0Z" fill={color} fillOpacity="0.6" />
    </svg>
);

const MSPIcon = ({ color, size }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={color} xmlns="http://www.w3.org/2000/svg">
        <path d="M0 0H11.4V11.4H0V0ZM12.6 0H24V11.4H12.6V0ZM0 12.6H11.4V24H0V12.6ZM12.6 12.6H24V24H12.6V12.6Z" />
    </svg>
);

const PowerBIIcon = ({ color, size }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={color} xmlns="http://www.w3.org/2000/svg">
        <path d="M6.4 15H0V24H6.4V15Z" fillOpacity="0.6" />
        <path d="M15.2 6H8.8V24H15.2V6Z" fillOpacity="0.8" />
        <path d="M24 0H17.6V24H24V0Z" />
    </svg>
);

const MondayIcon = ({ color, size }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={color} xmlns="http://www.w3.org/2000/svg">
        <path d="M18.8 3.5C18.8 1.5 17.2 0 15.3 0H8.7C6.8 0 5.2 1.5 5.2 3.5V16.8C5.2 18.2 6.3 19.2 7.7 19.2H8.3C9.7 19.2 10.8 18.2 10.8 16.8V6.6L12 8.3L13.2 6.6V16.8C13.2 18.2 14.3 19.2 15.7 19.2H16.3C17.7 19.2 18.8 18.2 18.8 16.8V3.5Z" />
        <circle cx="4" cy="20" r="2.5" />
        <circle cx="12" cy="20" r="2.5" />
        <circle cx="20" cy="20" r="2.5" />
    </svg>
);

const ClickUpIcon = ({ color, size }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={color} xmlns="http://www.w3.org/2000/svg">
        <path d="M2.5 13C2.5 11 3.5 8 6 6L11 2L16 6C18.5 8 19.5 11 19.5 13H16C16 11.5 15.5 10 14 9L11 6.5L8 9C6.5 10 6 11.5 6 13H2.5Z" />
        <path d="M2 15H20V19H2V15Z" />
    </svg>
);

const logos = [
    { Component: JiraIcon, color: '#0052CC', name: 'Jira' },
    { Component: MSPIcon, color: '#F25022', name: 'MS Projects' },
    { Component: PowerBIIcon, color: '#F2C811', name: 'PowerBI' },
    { Component: MondayIcon, color: '#FF3D57', name: 'Monday.com' },
    { Component: ClickUpIcon, color: '#7B68EE', name: 'ClickUp' },
];

export default function FloatingLogos() {
    const containerRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            const elements = containerRef.current.children;

            Array.from(elements).forEach((el) => {
                const startY = Math.random() * 80 + 10;
                const duration = Math.random() * 10 + 15;
                const delay = Math.random() * 5;

                gsap.set(el, {
                    x: -100,
                    y: `${startY}vh`,
                    opacity: 0
                });

                gsap.to(el, {
                    x: '110vw',
                    duration: duration,
                    repeat: -1,
                    ease: 'none',
                    delay: delay,
                    onStart: () => gsap.to(el, { opacity: 1, duration: 1 }),
                    onRepeat: () => {
                        gsap.set(el, { y: `${Math.random() * 80 + 10}vh` });
                    }
                });
            });

        }, containerRef);

        return () => ctx.revert();
    }, []);

    return (
        <div ref={containerRef} className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
            {logos.map((LogoObj, index) => (
                <div
                    key={index}
                    className="absolute pointer-events-auto cursor-pointer transition-all duration-300 filter grayscale hover:grayscale-0 hover:scale-125 opacity-70 hover:opacity-100"
                    title={LogoObj.name}
                    style={{ color: LogoObj.color }} // For direct SVG fill usage if needed
                >
                    <LogoObj.Component size={50} color={LogoObj.color} />
                </div>
            ))}
            {/* Duplicate for density */}
            {logos.map((LogoObj, index) => (
                <div
                    key={`dup-${index}`}
                    className="absolute pointer-events-auto cursor-pointer transition-all duration-300 filter grayscale hover:grayscale-0 hover:scale-125 opacity-70 hover:opacity-100"
                    title={LogoObj.name}
                >
                    <LogoObj.Component size={40} color={LogoObj.color} />
                </div>
            ))}
        </div>
    );
}
