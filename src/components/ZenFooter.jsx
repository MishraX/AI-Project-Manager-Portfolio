"use client";
import React, { useEffect, useRef } from 'react';
import { createTimeline, utils, createSpring } from 'animejs';

export default function ZenFooter() {
    const wrapperRef = useRef(null);

    useEffect(() => {
        if (!wrapperRef.current) return;

        const shapeEls = wrapperRef.current.querySelectorAll('.shape');
        const triangleEl = wrapperRef.current.querySelector('polygon');

        // Points for the triangle
        const pointsString = "48 17.28 86.4 80.11584 9.6 80.11584";
        const points = pointsString.split(' ').map(v => +v);

        // Easing options
        // v4 'createSpring' returns an easing function string or object? 
        // Docs say: easing: createSpring(mass, stiffness, damping, velocity)
        const springEase = createSpring(1, 80, 10, 0);
        const eases = ['inOutQuad', 'inOutCirc', 'inOutSine', springEase];

        // Local Random Helper to avoid 'undefined' issues if utils.random is missing
        const random = (min, max) => Math.random() * (max - min) + min;
        const randomPick = (arr) => arr[Math.floor(Math.random() * arr.length)];

        function createKeyframes(valueFn) {
            var keyframes = [];
            for (let i = 0; i < 30; i++) { // Reduced count for performance
                keyframes.push({
                    to: valueFn(),
                    ease: randomPick(eases),
                    duration: random(300, 1600)
                });
            }
            return keyframes;
        }

        function animateShape(el) {
            const circleEl = el.querySelector('circle');
            const rectEl = el.querySelector('rect');
            const polyEl = el.querySelector('polygon');

            const animation = createTimeline({
                onComplete: () => animateShape(el),
            });

            // v4 Timeline Add: .add(targets, params, offset)
            animation.add(el, {
                translateX: createKeyframes(() => random(-4, 4) + 'rem'),
                translateY: createKeyframes(() => random(-4, 4) + 'rem'),
                rotate: createKeyframes(() => random(-180, 180)),
            }, 0);

            if (circleEl) {
                animation.add(circleEl, {
                    r: createKeyframes(() => random(24, 56)),
                }, 0);
            }

            if (rectEl) {
                animation.add(rectEl, {
                    width: createKeyframes(() => random(56, 96)),
                    height: createKeyframes(() => random(56, 96)),
                }, 0);
            }

            if (polyEl) {
                animation.add(polyEl, {
                    points: createKeyframes(() => {
                        const s = random(0.9, 1.6);
                        return `${points[0] * s} ${points[1] * s} ${points[2] * s} ${points[3] * s} ${points[4] * s} ${points[5] * s}`;
                    }),
                }, 0);
            }
        }

        shapeEls.forEach(el => animateShape(el));

    }, []);

    // Email Click Handler
    const handleContactClick = () => {
        window.location.href = "mailto:mishraaa.suraj@gmail.com";
    };

    return (
        <section className="relative w-full h-screen overflow-hidden bg-black flex flex-col items-center justify-center">
            <div
                ref={wrapperRef}
                className="layered-animations flex justify-center items-center relative w-[16rem] h-[16rem] scale-[1] sm:scale-[1.5] md:scale-[2] lg:scale-[2.5]"
            >
                {/* Small Red Shapes */}
                <svg className="shape small color-red" viewBox="0 0 96 96">
                    <rect width="48" height="48" x="24" y="24" fillRule="evenodd" strokeLinecap="square" />
                </svg>
                <svg className="shape small color-red" viewBox="0 0 96 96">
                    <polygon fillRule="evenodd" points="48 17.28 86.4 80.11584 9.6 80.11584" strokeLinecap="square" />
                </svg>
                <svg className="shape small color-red" viewBox="0 0 96 96">
                    <circle cx="48" cy="48" r="32" fillRule="evenodd" strokeLinecap="square" />
                </svg>

                {/* Main Shapes */}
                <svg className="shape" viewBox="0 0 96 96">
                    <circle cx="48" cy="48" r="28" fillRule="evenodd" strokeLinecap="square" />
                </svg>
                <svg className="shape" viewBox="0 0 96 96">
                    <rect width="48" height="48" x="24" y="24" fillRule="evenodd" strokeLinecap="square" />
                </svg>
                <svg className="shape" viewBox="0 0 96 96">
                    <polygon fillRule="evenodd" points="48 17.28 86.4 80.11584 9.6 80.11584" strokeLinecap="square" />
                </svg>
            </div>

            {/* Bold Contact Me Overlay */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
                <h1
                    className="text-white font-bold text-6xl sm:text-8xl md:text-9xl uppercase tracking-tighter mix-blend-difference cursor-pointer pointer-events-auto hover:tracking-wide transition-all duration-300"
                    onClick={handleContactClick}
                >
                    Contact Me
                </h1>
            </div>

            <style jsx>{`
                .layered-animations .shape {
                  position: absolute;
                  overflow: visible;
                  width: 8rem;
                  height: 8rem;
                  stroke: currentColor;
                  fill: transparent;
                  color: white; /* Default color */
                }
                .layered-animations .small.shape {
                  width: 1.5rem;
                  height: 1.5rem;
                  stroke: currentColor;
                  stroke-width: 2px;
                  fill: currentColor;
                }
                .color-red {
                    color: #ef4444; /* Tailwind red-500 */
                }
            `}</style>
        </section>
    );
}
