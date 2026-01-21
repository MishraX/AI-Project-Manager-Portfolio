"use client";
import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function CreatureCursor() {
    const creatureRef = useRef(null);
    const cursorRef = useRef({ x: 0, y: 0 });

    useEffect(() => {
        const creatureEl = creatureRef.current;
        if (!creatureEl) return;

        const rows = 13; // Match original count
        const totalParticles = rows * rows;

        // Cleanup and Create Particles
        creatureEl.innerHTML = '';
        for (let i = 0; i < totalParticles; i++) {
            const div = document.createElement('div');
            creatureEl.appendChild(div);
        }

        const particles = creatureEl.querySelectorAll('div');

        // Initial Styles
        gsap.set(creatureEl, {
            width: `${rows * 10}em`,
            height: `${rows * 10}em`
        });

        // Initial Particle States (Simulating the anime.js stagger grid)
        // GSAP doesn't have a direct "grid" stagger for properties like color in the same way 
        // without the Grid plugin (paid), but we can approximate or use function based values.

        gsap.set(particles, {
            x: 0,
            y: 0,
            scale: 0,
            opacity: 0,
            backgroundColor: (i) => `hsl(4, 70%, ${80 - (Math.random() * 20)}%)`, // Randomized red variation
            boxShadow: `0px 0px 2px 0px var(--red)`,
            zIndex: (i) => i
        });

        // Intro Animation
        gsap.to(particles, {
            scale: (i) => {
                // Approximate center-out scale
                // Simple random for organic feel or calc based on index
                return 0.2 + Math.random() * 0.5;
            },
            opacity: 1,
            duration: 0.8,
            stagger: {
                amount: 0.5,
                grid: [rows, rows],
                from: "center"
            },
            ease: "power2.out"
        });

        // Pulse Animation (Optional, matching the 'pulse' from before)
        const pulseAnim = gsap.to(particles, {
            scale: 1.5,
            duration: 0.5,
            paused: true,
            yoyo: true,
            repeat: 1,
            ease: "power1.inOut",
            stagger: {
                amount: 0.2,
                from: "center",
                grid: [rows, rows]
            }
        });

        // Mouse Movement Logic
        // We use gsap.quickTo for high performance mouse following
        const xTo = gsap.quickTo(particles, "x", { duration: 0.8, ease: "power3.out" });
        const yTo = gsap.quickTo(particles, "y", { duration: 0.8, ease: "power3.out" });

        // Staggered delay logic looks different in GSAP. 
        // If we want the whole cloud to move together but lag:
        // quickTo moves them all. 
        // To get the "worm/creature" internal delay effect:
        // We need to animate them individually or use a stagger on the update.
        // But quickSetter/quickTo applies to the selection.

        // Alternative: Animate a "Virtual Cursor" and have particles follow it with delay?
        // Or simply update the `stagger` in a tween.

        const moveParticles = (x, y) => {
            gsap.to(particles, {
                x: x,
                y: y,
                duration: 1.2,
                ease: "power3.out",
                stagger: {
                    amount: 0.3, // The lagging effect
                    from: "center",
                    grid: [rows, rows]
                },
                overwrite: "auto"
            });
        };

        const handleMouseMove = (e) => {
            const clientX = e.clientX || (e.touches ? e.touches[0].clientX : 0);
            const clientY = e.clientY || (e.touches ? e.touches[0].clientY : 0);

            // Center the cursor
            const targetX = clientX - window.innerWidth / 2;
            const targetY = clientY - window.innerHeight / 2;

            cursorRef.current = { x: targetX, y: targetY };
            moveParticles(targetX, targetY);
        };

        // Auto move (Idle animation)
        const autoMoveTl = gsap.timeline({ repeat: -1, yoyo: true });
        const w = window.innerWidth * 0.25;
        const h = window.innerHeight * 0.25;

        // Only run auto move if no mouse interaction for a while?
        // The original code mixed them. Let's stick to mouse mainly.
        // User wants "cursor is ... working".

        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('touchmove', handleMouseMove);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('touchmove', handleMouseMove);
            gsap.killTweensOf(particles);
            autoMoveTl.kill();
        };

    }, []);

    return (
        <div
            id="creature-wrapper"
            className="fixed inset-0 pointer-events-none z-[9999] overflow-hidden flex justify-center items-center mix-blend-difference"
        >
            <style jsx global>{`
                :root {
                    --red: #ff3333;
                }
                #creature {
                    font-size: .1vh; 
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    /* width/height set in JS */
                    flex-wrap: wrap;
                }
                #creature div {
                    transform-style: preserve-3d;
                    position: relative;
                    width: 4em;
                    height: 4em;
                    margin: 3em;
                    border-radius: 50%;
                    will-change: transform;
                    mix-blend-mode: plus-lighter;
                    background: var(--red);
                }
            `}</style>
            <div id="creature" ref={creatureRef}></div>
        </div>
    );
}
