"use client";
import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function InteractiveSentence() {
    const textWrapperRef = useRef(null);
    const contextRef = useRef(null);

    useEffect(() => {
        // Wrap every letter in a span
        const textWrapper = textWrapperRef.current;
        if (textWrapper && !textWrapper.querySelector('.letter')) {
            const text = textWrapper.textContent.trim();
            textWrapper.innerHTML = "";

            // Create spans for each letter
            text.split("").forEach(char => {
                const span = document.createElement("span");
                span.textContent = char;
                span.className = "letter inline-block relative";
                // Preserve spaces
                if (char === " ") {
                    span.style.width = "0.5em";
                }
                textWrapper.appendChild(span);
            });
        }

        // GSAP Context for cleanup
        const ctx = gsap.context(() => {
            // Prepare animations
        }, textWrapperRef);

        contextRef.current = ctx;

        return () => ctx.revert();
    }, []);

    const handleMouseEnter = () => {
        if (!textWrapperRef.current) return;

        // Kill existing tweaks to restart smoothly
        gsap.killTweensOf(".letter");

        // Wave Animation
        gsap.to(".letter", {
            y: -10,
            scale: 1.2,
            color: "#4ade80", // Green highlight
            duration: 0.4,
            ease: "back.out(2)",
            stagger: {
                each: 0.05,
                from: "start",
                yoyo: true,
                repeat: 1 // Return to normal
            },
            onComplete: () => {
                // Ensure return to base state
                gsap.to(".letter", {
                    y: 0,
                    scale: 1,
                    color: "#9ca3af", // Gray-400
                    duration: 0.2
                });
            }
        });
    };

    return (
        <div className="py-8 text-center cursor-default">
            <p
                ref={textWrapperRef}
                onMouseEnter={handleMouseEnter}
                className="text-xl md:text-2xl text-gray-400 font-light tracking-wide inline-block"
            >
                Transforming complexity into Intelligence.
            </p>
        </div>
    );
}
