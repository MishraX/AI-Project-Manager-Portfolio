"use client";
import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { CustomEase, SplitText, ScrambleTextPlugin } from 'gsap-trial/all';

export default function ZenFooter() {
    const containerRef = useRef(null);

    useEffect(() => {
        // Register GSAP plugins
        gsap.registerPlugin(CustomEase, SplitText, ScrambleTextPlugin);

        // Create Custom Eases
        // Check if exists to avoid overwrite warning or just create
        if (!CustomEase.get("customEase")) CustomEase.create("customEase", "0.86, 0, 0.07, 1");
        if (!CustomEase.get("mouseEase")) CustomEase.create("mouseEase", "0.25, 0.1, 0.25, 1");

        const backgroundTextItems = document.querySelectorAll(".text-item");
        const backgroundImages = {
            default: document.getElementById("default-bg"),
            contact: document.getElementById("contact-bg"), // Mapped 'focus' or 'contact' to this
        };

        // --- Data & Config ---
        const alternativeTexts = {
            contact: {
                BE: "LET'S",
                PRESENT: "CONNECT",
                LISTEN: "REACH",
                DEEPLY: "OUT",
                OBSERVE: "NOW",
                "&": "!",
                FEEL: "HELLO",
                MAKE: "SAY",
                BETTER: "HI",
                DECISIONS: "THERE",
                THE: "YOUR",
                CREATIVE: "NEXT",
                PROCESS: "STEP",
                IS: "WAITING",
                MYSTERIOUS: "EXCITING",
                S: "SEND",
                I: "MESSAGE",
                M: "MAIL",
                P: "PING",
                L: "LINK",
                C: "CHAT",
                T: "TALK",
                Y: "YES",
                "IS THE KEY": "STARTS HERE",
                "FIND YOUR VOICE": "DROP A LINE",
                "TRUST INTUITION": "GET IN TOUCH",
                "EMBRACE SILENCE": "COLLABORATE",
                "QUESTION EVERYTHING": "BUILD TOGETHER",
                TRUTH: "REAL",
                WISDOM: "WORK",
                FOCUS: "CONTACT",
                ATTENTION: "EMAIL",
                AWARENESS: "SOCIALS",
                PRESENCE: "ME",
                SIMPLIFY: "SIMPLE",
                REFINE: "EASY"
            }
        };

        function switchBackgroundImage(id) {
            // Reset all
            Object.values(backgroundImages).forEach((bg) => {
                if (bg) {
                    gsap.to(bg, {
                        opacity: 0,
                        duration: 0.8,
                        ease: "customEase"
                    });
                }
            });

            // Activate target
            const target = backgroundImages[id] || backgroundImages.default;
            if (target) {
                gsap.to(target, {
                    opacity: 1,
                    duration: 0.8,
                    ease: "customEase",
                    delay: 0.2
                });
            }
        }

        // --- Init Data Attributes ---
        backgroundTextItems.forEach((item) => {
            if (!item.dataset.originalText) {
                item.dataset.originalText = item.textContent;
                item.dataset.text = item.textContent;
            }
            gsap.set(item, { opacity: 1 });
        });

        // --- Type Lines Setup ---
        const typeLines = document.querySelectorAll(".type-line");
        typeLines.forEach((line, index) => {
            if (index % 2 === 0) line.classList.add("odd");
            else line.classList.add("even");
        });
        const oddLines = document.querySelectorAll(".type-line.odd");
        const evenLines = document.querySelectorAll(".type-line.even");
        const TYPE_LINE_OPACITY = 0.015;

        // --- State ---
        const state = {
            activeRowId: null,
            kineticAnimationActive: false,
            activeKineticAnimation: null,
            textRevealAnimation: null,
            transitionInProgress: false
        };

        // --- SplitText Setup ---
        const textRows = document.querySelectorAll(".text-row");
        const splitTexts = {};

        textRows.forEach((row) => {
            const textElement = row.querySelector(".text-content");
            const rowId = row.dataset.rowId;

            // Clean up previous split if any (React strict mode double invoke protection usually requires refs, but we'll try to be safe)
            if (splitTexts[rowId]) splitTexts[rowId].revert();

            splitTexts[rowId] = new SplitText(textElement, {
                type: "chars",
                charsClass: "char",
                mask: true,
                reduceWhiteSpace: false
            });
            textElement.style.visibility = "visible";
        });

        function updateCharacterWidths() {
            const isMobile = window.innerWidth < 1024;

            textRows.forEach((row) => {
                const rowId = row.dataset.rowId;
                const textElement = row.querySelector(".text-content");
                const computedStyle = window.getComputedStyle(textElement);
                const currentFontSize = computedStyle.fontSize;
                const chars = splitTexts[rowId].chars;

                chars.forEach((char, i) => {
                    const charText = char.textContent || (char.querySelector(".char-inner") ? char.querySelector(".char-inner").textContent : "");
                    if (!charText && i === 0) return;

                    let charWidth;
                    if (isMobile) {
                        const fontSizeValue = parseFloat(currentFontSize);
                        charWidth = fontSizeValue * 0.6;

                        if (!char.querySelector(".char-inner") && charText) {
                            char.textContent = "";
                            const innerSpan = document.createElement("span");
                            innerSpan.className = "char-inner";
                            innerSpan.textContent = charText;
                            char.appendChild(innerSpan);
                        }
                        char.style.width = `${charWidth}px`;
                        char.style.maxWidth = `${charWidth}px`;
                        char.dataset.charWidth = charWidth;
                        char.dataset.hoverWidth = charWidth;
                    } else {
                        // Desktop
                        const tempSpan = document.createElement("span");
                        tempSpan.style.cssText = `position:absolute;visibility:hidden;font-size:${currentFontSize};font-family:"Longsile", sans-serif;`;
                        tempSpan.textContent = charText;
                        document.body.appendChild(tempSpan);
                        const actualWidth = tempSpan.offsetWidth;
                        document.body.removeChild(tempSpan);

                        const fontSizeValue = parseFloat(currentFontSize);
                        const fontSizeRatio = fontSizeValue / 160;
                        const padding = 10 * fontSizeRatio;
                        charWidth = Math.max(actualWidth + padding, 30 * fontSizeRatio);

                        if (!char.querySelector(".char-inner") && charText) {
                            char.textContent = "";
                            const innerSpan = document.createElement("span");
                            innerSpan.className = "char-inner";
                            innerSpan.textContent = charText;
                            char.appendChild(innerSpan);
                        }
                        char.style.width = `${charWidth}px`;
                        char.style.maxWidth = `${charWidth}px`;
                        char.dataset.charWidth = charWidth;
                        char.dataset.hoverWidth = Math.max(charWidth * 1.8, 85 * fontSizeRatio);
                    }
                    char.style.setProperty("--char-index", i);
                });
            });
        }

        updateCharacterWidths();
        const resizeHandler = () => setTimeout(updateCharacterWidths, 250);
        window.addEventListener("resize", resizeHandler);

        // Initial Fade In
        textRows.forEach((row, rowIndex) => {
            const rowId = row.dataset.rowId;
            const chars = splitTexts[rowId].chars;
            gsap.set(chars, { opacity: 0, filter: "blur(15px)" });
            gsap.to(chars, {
                opacity: 1,
                filter: "blur(0px)",
                duration: 0.8,
                stagger: 0.09,
                ease: "customEase",
                delay: 0.15 * rowIndex
            });
        });

        // --- Kinetic Animation ---
        function forceResetKineticAnimation() {
            if (state.activeKineticAnimation) {
                state.activeKineticAnimation.kill();
                state.activeKineticAnimation = null;
            }
            const kineticType = document.getElementById("kinetic-type");
            gsap.killTweensOf([kineticType, typeLines, oddLines, evenLines]);
            gsap.set(kineticType, { display: "grid", scale: 1, rotation: 0, opacity: 1, visibility: "visible" });
            gsap.set(typeLines, { opacity: TYPE_LINE_OPACITY, x: "0%" });
            state.kineticAnimationActive = false;
        }

        function startKineticAnimation(text) {
            forceResetKineticAnimation();
            const kineticType = document.getElementById("kinetic-type");
            kineticType.style.display = "grid";
            kineticType.style.opacity = "1";
            kineticType.style.visibility = "visible";

            const repeatedText = `${text} ${text} ${text}`;
            typeLines.forEach(line => line.textContent = repeatedText);

            setTimeout(() => {
                const timeline = gsap.timeline({ onComplete: () => { state.kineticAnimationActive = false; } });
                timeline.to(kineticType, { duration: 1.4, ease: "customEase", scale: 2.7, rotation: -90 });
                timeline.to(oddLines, { keyframes: [{ x: "20%", duration: 1, ease: "customEase" }, { x: "-200%", duration: 1.5, ease: "customEase" }], stagger: 0.08 }, 0);
                timeline.to(evenLines, { keyframes: [{ x: "-20%", duration: 1, ease: "customEase" }, { x: "200%", duration: 1.5, ease: "customEase" }], stagger: 0.08 }, 0);
                timeline.to(typeLines, { keyframes: [{ opacity: 1, duration: 1, ease: "customEase" }, { opacity: 0, duration: 1.5, ease: "customEase" }], stagger: 0.05 }, 0);
                state.kineticAnimationActive = true;
                state.activeKineticAnimation = timeline;
            }, 20);
        }

        function fadeOutKineticAnimation() {
            if (!state.kineticAnimationActive) return;
            if (state.activeKineticAnimation) {
                state.activeKineticAnimation.kill();
                state.activeKineticAnimation = null;
            }
            const kineticType = document.getElementById("kinetic-type");
            const fadeOutTimeline = gsap.timeline({
                onComplete: () => {
                    gsap.set(kineticType, { scale: 1, rotation: 0, opacity: 1 });
                    gsap.set(typeLines, { opacity: TYPE_LINE_OPACITY, x: "0%" });
                    state.kineticAnimationActive = false;
                }
            });
            fadeOutTimeline.to(kineticType, { opacity: 0, scale: 0.8, duration: 0.5, ease: "customEase" });
        }

        // --- Text Reveal Animation ---
        function createTextRevealAnimation(rowId) {
            const timeline = gsap.timeline();
            timeline.to(backgroundTextItems, { opacity: 0.3, duration: 0.5, ease: "customEase" });
            timeline.call(() => backgroundTextItems.forEach(item => item.classList.add("highlight")));
            timeline.call(() => {
                backgroundTextItems.forEach(item => {
                    const originalText = item.dataset.text;
                    if (alternativeTexts[rowId] && alternativeTexts[rowId][originalText]) {
                        item.textContent = alternativeTexts[rowId][originalText];
                    }
                });
            }, null, "+=0.5");
            timeline.call(() => backgroundTextItems.forEach(item => { item.classList.remove("highlight"); item.classList.add("highlight-reverse"); }));
            timeline.call(() => backgroundTextItems.forEach(item => item.classList.remove("highlight-reverse")), null, "+=0.5");
            return timeline;
        }

        function resetBackgroundTextWithAnimation() {
            const timeline = gsap.timeline();
            timeline.call(() => backgroundTextItems.forEach(item => item.classList.add("highlight")));
            timeline.call(() => backgroundTextItems.forEach(item => item.textContent = item.dataset.originalText), null, "+=0.5");
            timeline.call(() => backgroundTextItems.forEach(item => { item.classList.remove("highlight"); item.classList.add("highlight-reverse"); }));
            timeline.call(() => backgroundTextItems.forEach(item => item.classList.remove("highlight-reverse")), null, "+=0.5");
            timeline.to(backgroundTextItems, { opacity: 1, duration: 0.5, ease: "customEase" });
            return timeline;
        }

        // --- Interactions ---
        function activateRow(row) {
            const rowId = row.dataset.rowId;
            if (state.activeRowId === rowId || state.transitionInProgress) return;

            row.classList.add("active");
            state.activeRowId = rowId;

            const text = row.querySelector(".text-content").dataset.text;
            const chars = splitTexts[rowId].chars;
            const innerSpans = row.querySelectorAll(".char-inner");

            switchBackgroundImage("contact"); // Always use contact bg
            startKineticAnimation(text);

            if (state.textRevealAnimation) state.textRevealAnimation.kill();
            state.textRevealAnimation = createTextRevealAnimation(rowId);

            const timeline = gsap.timeline();
            timeline.to(chars, { maxWidth: (i, target) => parseFloat(target.dataset.hoverWidth), duration: 0.64, stagger: 0.04, ease: "customEase" }, 0);
            timeline.to(innerSpans, { x: -35, duration: 0.64, stagger: 0.04, ease: "customEase" }, 0.05);
        }

        function deactivateRow(row) {
            const rowId = row.dataset.rowId;
            if (state.activeRowId !== rowId || state.transitionInProgress) return;

            state.activeRowId = null;
            row.classList.remove("active");

            switchBackgroundImage("default");
            fadeOutKineticAnimation();

            if (state.textRevealAnimation) state.textRevealAnimation.kill();
            state.textRevealAnimation = resetBackgroundTextWithAnimation();

            const chars = splitTexts[rowId].chars;
            const innerSpans = row.querySelectorAll(".char-inner");
            const timeline = gsap.timeline();
            timeline.to(innerSpans, { x: 0, duration: 0.64, stagger: 0.03, ease: "customEase" }, 0);
            timeline.to(chars, { maxWidth: (i, target) => parseFloat(target.dataset.charWidth), duration: 0.64, stagger: 0.03, ease: "customEase" }, 0.05);
        }

        // --- Event Listeners ---
        textRows.forEach((row) => {
            const interactiveArea = row.querySelector(".interactive-area");
            const enterHandler = () => activateRow(row);
            const leaveHandler = () => deactivateRow(row);

            interactiveArea.addEventListener("mouseenter", enterHandler);
            interactiveArea.addEventListener("mouseleave", leaveHandler);
            row.addEventListener("click", enterHandler);
        });

        // --- Scramble Effect for background ---
        function scrambleRandomText() {
            if (!backgroundTextItems.length) return;
            const randomIndex = Math.floor(Math.random() * backgroundTextItems.length);
            const randomItem = backgroundTextItems[randomIndex];
            if (!randomItem) return;
            const originalText = randomItem.dataset.text;

            gsap.to(randomItem, {
                duration: 1,
                scrambleText: { text: originalText, chars: "■▪▌▐▬", revealDelay: 0.5, speed: 0.3 },
                ease: "none"
            });
            setTimeout(scrambleRandomText, (0.5 + Math.random() * 2) * 1000);
        }
        setTimeout(scrambleRandomText, 1000);

        // --- Cleanup ---
        return () => {
            window.removeEventListener("resize", resizeHandler);
        };
    }, []);

    // Email Click Handler
    const handleContactClick = () => {
        window.location.href = "mailto:mishraaa.suraj@gmail.com";
    };

    return (
        <section className="relative w-full h-screen overflow-hidden bg-black text-[#ffcc00] font-longsile selection:bg-[#ffcc00] selection:text-black">
            <style jsx global>{`
                @import url("https://fonts.cdnfonts.com/css/longsile");
                @import url("https://fonts.cdnfonts.com/css/thegoodmonolith");
                @import url("https://fonts.cdnfonts.com/css/pp-neue-montreal");

                .font-longsile { font-family: "Longsile", sans-serif; }
                .font-monolith { font-family: "TheGoodMonolith", monospace; }
                .font-montreal { font-family: "PP Neue Montreal", sans-serif; }

                /* Text Item Styles */
                 .text-item {
                    font-family: "TheGoodMonolith", monospace;
                    text-transform: uppercase;
                    /* Ensure visibility for GSAP */
                    opacity: 0.8;
                }
                .text-item::after {
                    content: ""; position: absolute; top: -2px; left: -4px;
                    width: 0; height: calc(100% + 4px); background-color: #ffcc00; z-index: 1;
                    transition: width 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);
                }
                .text-item.highlight::after { width: calc(100% + 8px); }
                .text-item.highlight-reverse::after { width: 0; right: -4px; left: auto; }

                /* Main Content */
                .char { display: inline-block; position: relative; overflow: hidden; max-width: 80px; transition: max-width 0.64s cubic-bezier(0.86, 0, 0.07, 1); margin-right: 0px; }
                .char-inner { position: relative; display: inline-block; width: 100%; height: 100%; will-change: transform; transform: translate3d(-20px, 0, 0); }
                .text-row.active .char::after {
                    content: ""; position: absolute; top: 0; right: 0; width: 1px; height: 80%;
                    background-color: rgba(255, 204, 0, 0.2); animation: fadeIn 0.3s forwards;
                    animation-delay: calc(var(--char-index, 0) * 0.05s);
                }
                @keyframes fadeIn { to { opacity: 1; } }

                /* Type Lines */
                .type-line {
                    white-space: nowrap; font-size: clamp(7rem, 18.75vh, 15rem); line-height: 0.75;
                    font-weight: bold; font-family: "PP Neue Montreal", sans-serif; color: #ffffff;
                    opacity: 0.05; user-select: none; will-change: transform, opacity; position: relative;
                }
                .type-line.odd { z-index: 50; }
                .type-line.even { z-index: 150; }

                /* Mobile Optimization */
                @media screen and (max-width: 992px) {
                    .text-row { height: 110px; }
                    .type-line { font-size: clamp(5rem, 12vh, 10rem); }
                }
                @media screen and (max-width: 768px) {
                    .text-row { height: 80px; margin: 8px 0; }
                    .type-line { font-size: clamp(3.5rem, 8vh, 7rem); }
                    .text-item { font-size: 0.7rem; }
                }
                @media screen and (max-width: 480px) {
                    .text-row { height: 60px; margin: 6px 0; }
                    .type-line { font-size: clamp(2.5rem, 6vh, 5rem); }
                    .text-item { font-size: 0.6rem; }
                }
            `}</style>

            <div className="absolute inset-0 z-0 pointer-events-none">
                <div className="absolute top-0 left-0 w-full h-full bg-[url('https://assets.codepen.io/7558/web03.webp')] bg-cover bg-center z-0" />
                <div id="default-bg" className="absolute w-full h-full top-0 left-0 bg-[url('https://assets.codepen.io/7558/wave-bg-001.webp')] bg-cover bg-center opacity-100 mix-blend-multiply transition-opacity duration-800" />
                <div id="contact-bg" className="absolute w-full h-full top-0 left-0 bg-[url('https://assets.codepen.io/7558/wave-bg-002.webp')] bg-cover bg-center opacity-0 mix-blend-multiply transition-opacity duration-800" />
                <div className="absolute bottom-0 left-0 w-full h-[40vh] bg-gradient-to-t from-black to-transparent z-[1]" />
            </div>

            <div className="absolute inset-0 z-[2] pointer-events-none text-[#ffcc00] text-xs font-monolith">
                {/* Text Items */}
                <div className="text-item absolute top-[5%] left-[8%]" data-text="BE">BE</div>
                <div className="text-item absolute top-[5%] left-[15%]" data-text="PRESENT">PRESENT</div>
                <div className="text-item absolute top-[5%] left-[28%]" data-text="LISTEN">LISTEN</div>
                <div className="text-item absolute top-[5%] left-[42%]" data-text="DEEPLY">DEEPLY</div>
                <div className="text-item absolute top-[5%] left-[55%]" data-text="OBSERVE">OBSERVE</div>
                <div className="text-item absolute top-[5%] left-[75%]" data-text="&">& </div>
                <div className="text-item absolute top-[5%] left-[85%]" data-text="FEEL">FEEL</div>

                <div className="text-item absolute top-[10%] left-[12%]" data-text="MAKE">MAKE</div>
                <div className="text-item absolute top-[10%] left-[45%]" data-text="BETTER">BETTER</div>
                <div className="text-item absolute top-[10%] right-[20%]" data-text="DECISIONS">DECISIONS</div>

                <div className="text-item absolute top-[15%] left-[8%]" data-text="THE">THE</div>
                <div className="text-item absolute top-[15%] left-[30%]" data-text="CREATIVE">CREATIVE</div>
                <div className="text-item absolute top-[15%] left-[55%]" data-text="PROCESS">PROCESS</div>
                <div className="text-item absolute top-[15%] right-[20%]" data-text="IS">IS</div>
                <div className="text-item absolute top-[15%] right-[5%]" data-text="MYSTERIOUS">MYSTERIOUS</div>

                <div className="text-item absolute top-[25%] left-[5%]" data-text="S">S</div>
                <div className="text-item absolute top-[25%] left-[10%]" data-text="I">I</div>
                <div className="text-item absolute top-[25%] left-[15%]" data-text="M">M</div>
                <div className="text-item absolute top-[25%] left-[20%]" data-text="P">P</div>
                <div className="text-item absolute top-[25%] left-[25%]" data-text="L">L</div>
                <div className="text-item absolute top-[25%] left-[30%]" data-text="I">I</div>
                <div className="text-item absolute top-[25%] left-[35%]" data-text="C">C</div>
                <div className="text-item absolute top-[25%] left-[40%]" data-text="I">I</div>
                <div className="text-item absolute top-[25%] left-[45%]" data-text="T">T</div>
                <div className="text-item absolute top-[25%] left-[50%]" data-text="Y">Y</div>
                <div className="text-item absolute top-[25%] right-[5%]" data-text="IS THE KEY">IS THE KEY</div>

                <div className="text-item absolute top-[35%] left-[25%]" data-text="FIND YOUR VOICE">FIND YOUR VOICE</div>
                <div className="text-item absolute top-[35%] left-[65%]" data-text="TRUST INTUITION">TRUST INTUITION</div>

                <div className="text-item absolute top-[50%] left-[5%]" data-text="EMBRACE SILENCE">EMBRACE SILENCE</div>
                <div className="text-item absolute top-[50%] right-[5%]" data-text="QUESTION EVERYTHING">QUESTION EVERYTHING</div>

                <div className="text-item absolute top-[75%] left-[20%]" data-text="TRUTH">TRUTH</div>
                <div className="text-item absolute top-[75%] right-[20%]" data-text="WISDOM">WISDOM</div>

                <div className="text-item absolute top-[80%] left-[10%]" data-text="FOCUS">FOCUS</div>
                <div className="text-item absolute top-[80%] left-[35%]" data-text="ATTENTION">ATTENTION</div>
                <div className="text-item absolute top-[80%] left-[65%]" data-text="AWARENESS">AWARENESS</div>
                <div className="text-item absolute top-[80%] right-[10%]" data-text="PRESENCE">PRESENCE</div>

                <div className="text-item absolute top-[85%] left-[25%]" data-text="SIMPLIFY">SIMPLIFY</div>
                <div className="text-item absolute top-[85%] right-[25%]" data-text="REFINE">REFINE</div>
            </div>

            <div className="relative z-10 h-full flex flex-col justify-center items-center">
                <div className="relative w-auto max-w-full mx-auto transform translate-z-0">
                    {/* The Interactive Contact Row */}
                    <div className="text-row relative w-full h-[140px] my-2 flex items-center justify-center overflow-visible z-[100]" data-row-id="contact" onClick={handleContactClick}>
                        <div className="text-content relative text-[3.5rem] sm:text-[5rem] md:text-[7rem] lg:text-[10rem] font-normal uppercase h-full flex items-center justify-center z-[1] text-[#ffcc00] tracking-normal transition-all duration-500 hover:tracking-[5px] invisible" data-text="CONTACT">CONTACT</div>
                        <div className="interactive-area absolute top-0 left-0 w-full h-full z-[10] cursor-pointer" />
                    </div>
                </div>
            </div>

            {/* Kinetic Type Overlay */}
            <div id="kinetic-type" className="fixed h-[100vmax] w-[100vmax] uppercase hidden justify-center align-content-center text-center top-1/2 left-1/2 -mt-[50vmax] -ml-[50vmax] will-change-transform z-[5] transform-preserve-3d pointer-events-none opacity-0 invisible" aria-hidden="true">
                <div className="type-line odd">contact contact contact</div>
                <div className="type-line even">contact contact contact</div>
                <div className="type-line odd">contact contact contact</div>
                <div className="type-line even">contact contact contact</div>
                <div className="type-line odd">contact contact contact</div>
                <div className="type-line even">contact contact contact</div>
                <div className="type-line odd">contact contact contact</div>
                <div className="type-line even">contact contact contact</div>
                <div className="type-line odd">contact contact contact</div>
                <div className="type-line even">contact contact contact</div>
                <div className="type-line odd">contact contact contact</div>
                <div className="type-line even">contact contact contact</div>
            </div>
        </section>
    );
}
