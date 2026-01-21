"use client";
import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function InteractiveBackground() {
    const blobRef = useRef(null);

    useEffect(() => {
        const blob = blobRef.current;

        const handlePointerMove = (e) => {
            const { clientX, clientY } = e;

            gsap.to(blob, {
                x: clientX,
                y: clientY,
                duration: 2, // Slow ease for smooth following
                ease: "power2.out"
            });
        };

        window.addEventListener('pointermove', handlePointerMove);

        return () => {
            window.removeEventListener('pointermove', handlePointerMove);
        };
    }, []);

    return (
        <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
            <div
                ref={blobRef}
                className="absolute w-[500px] h-[500px] bg-gradient-to-r from-indigo-500/20 to-purple-500/20 rounded-full blur-[100px] -translate-x-1/2 -translate-y-1/2 mix-blend-screen opacity-50 will-change-transform"
            />
            <div className="absolute inset-0 bg-[url('/noise.svg')] opacity-20 mix-blend-overlay"></div>
        </div>
    );
}
