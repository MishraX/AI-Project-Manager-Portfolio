"use client";
import React, { useRef, useState, useEffect } from 'react';

// Morse Code Map
const MORSE_MAP = {
    'A': '.-', 'B': '-...', 'C': '-.-.', 'D': '-..', 'E': '.', 'F': '..-.',
    'G': '--.', 'H': '....', 'I': '..', 'J': '.---', 'K': '-.-', 'L': '.-..',
    'M': '--', 'N': '-.', 'O': '---', 'P': '.--.', 'Q': '--.-', 'R': '.-.',
    'S': '...', 'T': '-', 'U': '..-', 'V': '...-', 'W': '.--', 'X': '-..-',
    'Y': '-.--', 'Z': '--..', '0': '-----', '1': '.----', '2': '..---',
    '3': '...--', '4': '....-', '5': '.....', '6': '-....', '7': '--...',
    '8': '---..', '9': '----.', ' ': ' ', '.': '.-.-.-', ',': '--..--'
};

const DecryptText = ({ text, isVisible }) => {
    const [display, setDisplay] = useState('');

    useEffect(() => {
        if (!isVisible) {
            setDisplay(text.split('').map(c => MORSE_MAP[c.toUpperCase()] || '').join(' '));
            return;
        }

        const chars = text.split('');
        const totalDuration = 2500;
        let startTime = null;

        const animate = (timestamp) => {
            if (!startTime) startTime = timestamp;
            const progress = (timestamp - startTime) / totalDuration;

            if (progress >= 1) {
                setDisplay(text);
                return;
            }

            const simpleResult = chars.map((char, index) => {
                const charProgress = index / chars.length;
                if (progress > charProgress) return char;
                return MORSE_MAP[char.toUpperCase()] || '.';
            }).join('');

            setDisplay(simpleResult);
            requestAnimationFrame(animate);
        };
        requestAnimationFrame(animate);

    }, [isVisible, text]);

    return <span>{display}</span>;
}

export default function AiRoleDescription() {
    const containerRef = useRef(null);
    const [position, setPosition] = useState({ x: -100, y: -100 });
    const [inView, setInView] = useState(false);
    const [interactionMode, setInteractionMode] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting) {
                setInView(true);
                setTimeout(() => {
                    setInteractionMode(true);
                }, 3500);
            }
        }, { threshold: 0.2 });

        if (containerRef.current) {
            observer.observe(containerRef.current);
        }
        return () => observer.disconnect();
    }, []);

    const updatePosition = (clientX, clientY) => {
        if (!containerRef.current) return;
        const rect = containerRef.current.getBoundingClientRect();
        setPosition({
            x: clientX - rect.left,
            y: clientY - rect.top
        });
    };

    const handleMouseMove = (e) => {
        updatePosition(e.clientX, e.clientY);
    };

    const handleTouchMove = (e) => {
        // Prevent scroll when acting as flashlight? Maybe not, it's annoying.
        // We just update position.
        const touch = e.touches[0];
        updatePosition(touch.clientX, touch.clientY);
    };

    const lines = [
        "In an era where code writes itself, the true architect bridges human vision with synthetic intelligence.",
        "The AI Project Manager is not just an overseer but a translator of dreams into algorithms, steering the chaos of infinite possibility into the precision of reality.",
        "This is the future: where leadership is defined by the ability to harmonize biological creativity with digital execution.",
        "We stand at the precipice of a new industrial revolution, where the manager's role evolves from tracking tasks to orchestrating symphonies of agents.",
        "To ignore this shift is to be left behind; to embrace it is to define the next century of innovation."
    ];

    return (
        <section
            className="w-full relative z-20 py-32 bg-black flex justify-start items-center overflow-visible"
            id="ai-role-description"
        >
            <div
                ref={containerRef}
                onMouseMove={handleMouseMove}
                onTouchMove={handleTouchMove}
                className="relative w-full max-w-6xl px-8 ml-4 md:ml-12 lg:ml-24 cursor-crosshair select-none touch-auto"
            /* touch-none prevents scrolling while using flashlight on mobile, if desired. 
               If user wants to scroll, they can touch outside. 
               "compatible with phone... including flashlight" implies functional flashlight. */
            >
                <div
                    className="space-y-12 text-left relative z-0 text-cyan-900 font-mono tracking-wide transition-opacity duration-1000"
                    style={{ opacity: interactionMode ? 0.1 : 0 }}
                >
                    {lines.map((line, i) => (
                        <p key={i} className="text-xl md:text-2xl leading-loose break-words">
                            {line}
                        </p>
                    ))}
                </div>

                <div
                    className="absolute inset-0 px-8 ml-0 space-y-12 text-left z-10 pointer-events-none"
                    style={{
                        maskImage: interactionMode
                            ? `radial-gradient(300px circle at ${position.x}px ${position.y}px, black, transparent 100%)`
                            : 'none',
                        WebkitMaskImage: interactionMode
                            ? `radial-gradient(300px circle at ${position.x}px ${position.y}px, black, transparent 100%)`
                            : 'none',
                    }}
                >
                    {lines.map((line, i) => (
                        <p key={i} className="text-xl md:text-2xl leading-loose break-words font-mono text-cyan-50 drop-shadow-[0_0_8px_rgba(34,211,238,0.6)]">
                            {!interactionMode ? (
                                <DecryptText text={line} isVisible={inView} />
                            ) : (
                                <span>{line}</span>
                            )}
                        </p>
                    ))}
                </div>
            </div>
        </section>
    );
}
