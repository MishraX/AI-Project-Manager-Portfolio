"use client";
import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function BuilderText() {
    const containerRef = useRef(null);
    const textRef = useRef(null);

    useEffect(() => {
        // Split text for individual character animation
        const textElement = textRef.current;
        if (textElement && !textElement.querySelector('.char')) {
            const text = textElement.textContent.trim();
            textElement.innerHTML = '';
            text.split('').forEach(char => {
                const span = document.createElement('span');
                span.textContent = char;
                span.className = 'char inline-block'; // inline-block needed for transform
                if (char === ' ') span.style.width = '0.6em';
                textElement.appendChild(span);
            });
        }

        const ctx = gsap.context(() => {
            const chars = textElement.querySelectorAll('.char');
            const tl = gsap.timeline({ repeat: -1, repeatDelay: 1.5 });

            // Initial set
            gsap.set(chars, { y: 100, opacity: 0, scale: 0, rotate: 180 });

            // 1. Construct (Staggered fly in)
            tl.to(chars, {
                y: 0,
                opacity: 1,
                scale: 1,
                rotate: 0,
                duration: 0.8,
                stagger: 0.05,
                ease: "back.out(1.7)"
            });

            // 2. Neon Pulse
            tl.to(chars, {
                color: '#4ade80', // Green
                textShadow: "0 0 20px #4ade80, 0 0 40px #4ade80",
                duration: 0.2,
                stagger: {
                    each: 0.02,
                    from: "start", // Wave effect
                    yoyo: true,
                    repeat: 3
                }
            });

            // 3. Return to yellow/gold base
            tl.to(chars, {
                color: '#facc15', // Yellow-400
                textShadow: "none",
                duration: 0.5
            });

            // 4. Deconstruct (Fall down) for loop
            tl.to(chars, {
                y: 50,
                opacity: 0,
                rotate: -45,
                scale: 0.5,
                duration: 0.5,
                stagger: 0.03,
                ease: "power2.in",
                delay: 1
            });

        }, containerRef);

        return () => ctx.revert();
    }, []);

    return (
        <div ref={containerRef} className="relative h-24 w-full flex items-center justify-center overflow-hidden">
            <h2
                ref={textRef}
                className="text-5xl md:text-7xl font-bold font-mono text-yellow-400 text-center tracking-tighter drop-shadow-[0_4px_0_rgba(168,85,247,0.5)]"
                style={{ textShadow: '4px 4px 0px #000, -1px -1px 0 #000' }}
            >
                AI PROJECT MANAGER
            </h2>
        </div>
    );
}
