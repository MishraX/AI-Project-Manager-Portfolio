"use client";
import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

export default function SpotlightCursor() {
    const cursorRef = useRef(null);
    const spotlightRef = useRef(null);
    const [isHoveringClickable, setIsHoveringClickable] = useState(false);

    useEffect(() => {
        const cursor = cursorRef.current;
        const spotlight = spotlightRef.current;
        if (!cursor || !spotlight) return;

        // Move cursor and spotlight with GSAP
        // Using pageX/pageY because we are now absolute positioned inside the document (or a wrapper)
        // and we want to move with the document flow if the wrapper ends.
        const moveCursor = (e) => {
            // If parent is the document body (default), pageX/Y works.
            // If parent is a relative wrapper, we might want to offset.
            // But since we want it to follow the mouse...
            // If the wrapper is `relative`, `absolute` children are positioned relative to it.
            // e.pageX is relative to the document. 
            // If the wrapper starts at 0,0, then e.pageX is correct.
            // If the wrapper is offset, we might need subtraction.
            // Assuming wrapper starts near top.

            // However, to be safe and simple: if we want it "contained", using `e.pageX` works
            // if the container is the reference frame.

            // Actually, let's just use clientX + scrollY to simulate page coordinates 
            // OR if the container is "relative", we can use `e.layerX` / `e.offset...` ? No, those are unreliable.

            // Best bet: use `e.pageX` and `e.pageY`. 

            gsap.to(cursor, {
                x: e.pageX,
                y: e.pageY,
                duration: 0.1,
                ease: "power2.out"
            });
            gsap.to(spotlight, {
                x: e.pageX,
                y: e.pageY,
                duration: 0.8,
                ease: "power2.out"
            });
        };

        const handleMouseOver = (e) => {
            const target = e.target;
            // Check if clickable
            const isClickable = target.tagName === 'A' || target.tagName === 'BUTTON' ||
                target.closest('a') || target.closest('button') ||
                target.classList.contains('cursor-pointer');
            setIsHoveringClickable(!!isClickable);
        };

        window.addEventListener('mousemove', moveCursor);
        window.addEventListener('mouseover', handleMouseOver);

        return () => {
            window.removeEventListener('mousemove', moveCursor);
            window.removeEventListener('mouseover', handleMouseOver);
        };
    }, []);

    // Expand dot on clickables
    useEffect(() => {
        if (cursorRef.current) {
            gsap.to(cursorRef.current, {
                scale: isHoveringClickable ? 2 : 1,
                backgroundColor: isHoveringClickable ? "rgba(255, 255, 255, 0.8)" : "white",
                duration: 0.2
            });
        }
    }, [isHoveringClickable]);

    return (
        <>
            {/* The Dot Cursor - Changed to Absolute */}
            <div
                ref={cursorRef}
                className="absolute top-0 left-0 w-2 h-2 bg-white rounded-full pointer-events-none z-[100] transform -translate-x-1/2 -translate-y-1/2 mix-blend-difference"
                suppressHydrationWarning
            />

            {/* The Spotlight / Flashlight Effect - Changed to Absolute */}
            <div
                ref={spotlightRef}
                className="absolute top-0 left-0 w-[600px] h-[600px] pointer-events-none z-[10] transform -translate-x-1/2 -translate-y-1/2"
                style={{
                    background: 'radial-gradient(circle closest-side, rgba(29, 78, 216, 0.15), transparent)',
                }}
                suppressHydrationWarning
            />
        </>
    );
}
