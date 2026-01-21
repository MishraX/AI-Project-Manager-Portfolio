"use client";
import React, { useEffect, useRef } from 'react';
import { animate, createTimeline, stagger, utils } from 'animejs';

export default function CreatureCursor() {
    const creatureRef = useRef(null);
    const wrapperRef = useRef(null);

    useEffect(() => {
        if (!creatureRef.current || !wrapperRef.current) return;

        const creatureEl = creatureRef.current;
        const rows = 13;
        const grid = [rows, rows];
        const from = 'center';

        // Clean up
        creatureEl.innerHTML = '';
        const fragment = document.createDocumentFragment();
        for (let i = 0; i < rows * rows; i++) {
            const div = document.createElement('div');
            fragment.appendChild(div);
        }
        creatureEl.appendChild(fragment);

        const particuleEls = creatureEl.querySelectorAll('div');
        const viewport = { w: window.innerWidth * .5, h: window.innerHeight * .5 };
        const cursor = { x: 0, y: 0 };

        const scaleStagger = stagger([2, 5], { ease: 'inQuad', grid, from });
        const opacityStagger = stagger([1, .1], { grid, from });

        utils.set(creatureEl, {
            width: rows * 10 + 'em',
            height: rows * 10 + 'em'
        });

        // Initial State
        animate(particuleEls, {
            translateX: 0,
            translateY: 0,
            scale: scaleStagger,
            opacity: opacityStagger,
            backgroundColor: stagger([80, 20], { grid, from, modifier: v => `hsl(4, 70%, ${v}%)` }),
            boxShadow: stagger([8, 1], { grid, from, modifier: v => `0px 0px ${utils.round(v, 0)}em 0px var(--red)` }),
            zIndex: stagger([rows * rows, 1], { grid, from, modifier: v => Math.round(v) }),
            duration: 0
        });

        const pulse = () => {
            animate(particuleEls, {
                keyframes: [
                    {
                        scale: 5,
                        opacity: 1,
                        delay: stagger(90, { start: 1650, grid, from }),
                        duration: 150,
                    }, {
                        scale: scaleStagger,
                        opacity: opacityStagger,
                        easing: 'inOutQuad',
                        duration: 600
                    }
                ],
            });
        };

        // --- SMOOTHNESS FIX: REPLACE createTimer(15FPS) WITH NATIVE RAF ---
        // requestAnimationFrame runs at the monitor's refresh rate (60Hz, 120Hz, 144Hz, 180Hz etc.)
        // This ensures maximum smoothness.

        let animationFrameId;
        const tick = (time) => {
            // We update the particles to follow the cursor every frame
            animate(particuleEls, {
                translateX: cursor.x,
                translateY: cursor.y,
                // We keep the stagger delay for the 'creature' effect, 
                // but the update itself happens every frame.
                delay: stagger(40, { grid, from }),
                // Duration needs to be balanced. 
                // Too long = sluggish. Too short = jittery.
                // 600ms catch-up is good.
                duration: stagger(120, { start: 750, easing: 'inQuad', grid, from }),
                easing: 'outQuad',
            });

            // Update auto-move values manually if not using timeline for that?
            // Actually, we can assume the timeline handles the 'cursor' object values if we play it.

            animationFrameId = requestAnimationFrame(tick);
        };

        // Auto Move Timeline
        // We use the timeline to animate the 'cursor' object properties (x,y)
        const autoMove = createTimeline({
            loop: true,
            onBegin: pulse,
            onLoop: pulse,
            autoplay: true
        })
            .add(cursor, {
                x: [-viewport.w * .45, viewport.w * .45],
                // We can replicate the sine wave modifier if needed, or just let 'easing' handle it.
                // The original code used a timer to modify. Simple easing is smoother for RAF.
                easing: 'inOutExpo',
                duration: 3000,
                direction: 'alternate',
            }, 0)
            .add(cursor, {
                y: [-viewport.h * .45, viewport.h * .45],
                easing: 'inOutQuad',
                duration: 1000,
                direction: 'alternate',
            }, 0);

        let manualMovementTimeout;
        const startManualTimeout = () => {
            clearTimeout(manualMovementTimeout);
            manualMovementTimeout = setTimeout(() => {
                autoMove.play();
            }, 1000);
        };

        const followPointer = (e) => {
            // Touch support
            const event = e.type === 'touchmove' ? e.touches[0] : e;

            // Client coordinates are usually better for fixed overlay
            cursor.x = event.clientX - window.innerWidth / 2;
            cursor.y = event.clientY - window.innerHeight / 2;

            autoMove.pause();
            startManualTimeout();
        };

        document.addEventListener('mousemove', followPointer, { passive: true });
        document.addEventListener('touchmove', followPointer, { passive: true }); // Passive for scroll perf

        // Start Loop
        animationFrameId = requestAnimationFrame(tick);

        return () => {
            document.removeEventListener('mousemove', followPointer);
            document.removeEventListener('touchmove', followPointer);
            cancelAnimationFrame(animationFrameId);
            autoMove.pause();
            clearTimeout(manualMovementTimeout);
        };

    }, []);

    return (
        <div
            id="creature-wrapper"
            ref={wrapperRef}
            className="fixed inset-0 pointer-events-none z-[9999] overflow-hidden flex justify-center items-center mix-blend-difference"
            suppressHydrationWarning
        >
            <style jsx global>{`
                :root {
                    --red: #ff3333;
                }
                #creature {
                    font-size: .1vh; /* Small styling */
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    width: 150em; 
                    height: 150em; 
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
            <div id="creature" ref={creatureRef} suppressHydrationWarning></div>
        </div>
    );
}
