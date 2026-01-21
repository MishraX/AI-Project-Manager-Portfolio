"use client";
import React, { useEffect, useRef } from 'react';

export default function CreatureCursor() {
    const creatureRef = useRef(null);
    const wrapperRef = useRef(null);

    useEffect(() => {
        // Dynamic Import to ensure it runs ONLY in browser and bypasses build-time ESM issues
        let cleanup = () => { };

        const initCursor = async () => {
            if (!creatureRef.current || !wrapperRef.current) return;

            // Dynamically import animejs
            const animeModule = await import('animejs');
            // Handle both named exports (v4) and default export (v3) compatibility
            // The user installed ^4.3.0, so it should be named exports usually.
            const animate = animeModule.animate || animeModule.default?.animate;
            const createTimeline = animeModule.createTimeline || animeModule.default?.createTimeline;
            const stagger = animeModule.stagger || animeModule.default?.stagger;
            // Native utils replacement used previously, keeping that.

            if (!animate || !createTimeline || !stagger) {
                console.error("Anime.js failed to load correctly", animeModule);
                return;
            }

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

            creatureEl.style.width = `${rows * 10}em`;
            creatureEl.style.height = `${rows * 10}em`;

            animate(particuleEls, {
                translateX: 0,
                translateY: 0,
                scale: scaleStagger,
                opacity: opacityStagger,
                // Using HSL directly string
                backgroundColor: stagger([80, 20], { grid, from, modifier: v => `hsl(4, 70%, ${v}%)` }),
                boxShadow: stagger([8, 1], { grid, from, modifier: v => `0px 0px ${Math.round(v)}em 0px var(--red)` }),
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

            let animationFrameId;
            const tick = () => {
                animate(particuleEls, {
                    translateX: cursor.x,
                    translateY: cursor.y,
                    delay: stagger(40, { grid, from }),
                    duration: stagger(120, { start: 750, easing: 'inQuad', grid, from }),
                    easing: 'outQuad',
                });
                animationFrameId = requestAnimationFrame(tick);
            };

            const autoMove = createTimeline({
                loop: true,
                onBegin: pulse,
                onLoop: pulse,
                autoplay: true
            })
                .add(cursor, {
                    x: [-viewport.w * .45, viewport.w * .45],
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
                const event = e.type === 'touchmove' ? e.touches[0] : e;
                // Double check window existence
                if (typeof window !== 'undefined') {
                    cursor.x = event.clientX - window.innerWidth / 2;
                    cursor.y = event.clientY - window.innerHeight / 2;
                }
                autoMove.pause();
                startManualTimeout();
            };

            document.addEventListener('mousemove', followPointer, { passive: true });
            document.addEventListener('touchmove', followPointer, { passive: true });

            animationFrameId = requestAnimationFrame(tick);

            // Set cleanup function
            cleanup = () => {
                document.removeEventListener('mousemove', followPointer);
                document.removeEventListener('touchmove', followPointer);
                cancelAnimationFrame(animationFrameId);
                autoMove.pause();
                clearTimeout(manualMovementTimeout);
            };
        };

        initCursor();

        return () => {
            cleanup();
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
                    font-size: .1vh; 
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
