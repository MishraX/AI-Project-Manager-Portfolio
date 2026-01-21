"use client";
import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function Loader({ onComplete }) {
    const containerRef = useRef(null);

    // Refs for sequence elements
    const nameRef = useRef(null);
    const roleRef = useRef(null);
    const shutterTopRef = useRef(null);
    const shutterBottomRef = useRef(null);
    const [isMounted, setIsMounted] = React.useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    useEffect(() => {
        if (!isMounted) return;

        const tl = gsap.timeline({
            onComplete: () => {
                onComplete();
            }
        });

        // Initial Setup
        gsap.set(nameRef.current, { opacity: 0, y: 50, filter: "blur(10px)" });
        gsap.set(roleRef.current, { opacity: 0, scale: 0.8, filter: "blur(5px)" });
        gsap.set([shutterTopRef.current, shutterBottomRef.current], { scaleY: 1 });

        // Animation Sequence
        // 1. Name appears ("Suraj Mishra")
        tl.to(nameRef.current, {
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            duration: 1.0,
            ease: "power3.out"
        })
            .to(nameRef.current, {
                opacity: 0,
                y: -50,
                filter: "blur(10px)",
                duration: 0.6,
                ease: "power2.in",
                delay: 0.4
            })

            // 2. Role appears ("AI Project Manager")
            // User requested different font and color.
            // We used CSS class 'font-space' (Space Grotesk) and a new gradient/color in the JSX below.
            .to(roleRef.current, {
                opacity: 1,
                scale: 1,
                filter: "blur(0px)",
                duration: 0.8,
                ease: "back.out(1.7)"
            }, "-=0.1")

            // 3. Role Zoom/Exit
            .to(roleRef.current, {
                scale: 5, // Zoom really close
                opacity: 0,
                duration: 0.8,
                ease: "expo.in",
                delay: 0.8
            })

            // 4. Shutter Open (The "One more animation" to load homepage)
            // The black background splits top and bottom
            .to([shutterTopRef.current, shutterBottomRef.current], {
                scaleY: 0,
                duration: 0.8,
                ease: "power3.inOut",
                stagger: 0.1
            }, "-=0.2")

            // 5. Remove container
            .set(containerRef.current, { display: 'none' });

        return () => tl.kill();
    }, [onComplete, isMounted]);

    if (!isMounted) return null;

    return (
        <div ref={containerRef} className="fixed inset-0 z-[9999] bg-transparent">
            {/* Shutter Panels (Top and Bottom) */}
            <div
                ref={shutterTopRef}
                className="absolute top-0 left-0 w-full h-[50vh] bg-black origin-top z-40"
            />
            <div
                ref={shutterBottomRef}
                className="absolute bottom-0 left-0 w-full h-[50vh] bg-black origin-bottom z-40"
            />

            {/* Content Layer (on top of shutters) */}
            <div className="absolute inset-0 z-50 flex items-center justify-center pointer-events-none">
                {/* Name Stage */}
                <h1 ref={nameRef} className="absolute text-5xl md:text-7xl font-bold text-white tracking-wider font-outfit">
                    SURAJ MISHRA
                </h1>

                {/* Role Stage */}
                {/* Changed Font to Space Grotesk (font-space) and Color to a vibrant tech cyan/blue */}
                <div ref={roleRef} className="absolute flex flex-col items-center justify-center">
                    <h2 className="text-4xl md:text-7xl font-bold font-space bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-blue-500 to-cyan-400 bg-[length:200%_auto] animate-gradient text-center px-4">
                        AI PROJECT MANAGER
                    </h2>
                    {/* Tech decoration line */}
                    <div className="w-full h-px bg-gradient-to-r from-transparent via-cyan-500 to-transparent mt-4 opacity-50"></div>
                </div>
            </div>
        </div>
    );
}
