"use client";
import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FaCalendarAlt, FaBuilding, FaUserTie } from 'react-icons/fa';

gsap.registerPlugin(ScrollTrigger);

const experiences = [
    {
        role: "Lead Developer & Project Manager",
        company: "Pyramid Timber Associates Pvt. Ltd.",
        period: "April 2025 - Present",
        accent: "cyan",
        description: [
            "Led end-to-end delivery of a custom full-stack B2B portal using Node.js, PostgreSQL, and AWS (Linux/EC2), increasing order processing efficiency by 40% through digitization.",
            "Owned approximately 85% of the software lifecycle, from infrastructure provisioning to deployment, ensuring reliable, secure operation in a production environment.",
            "Translated business requirements from non-technical stakeholders into technical specifications, prioritizing scope and coordinating implementation across the development lifecycle.",
            "Defined and managed project scope, milestones, and release timelines to ensure on-time delivery and alignment with business priorities.",
            "Monitored system performance and reliability, coordinating fixes and enhancements to maintain continuity of critical ordering operations."
        ]
    },
    {
        role: "Technical Project Manager",
        company: "Dira Foundation",
        period: "Feb 2022 - July 2025",
        accent: "purple",
        description: [
            "Led technical project management for a blockchain-focused Real World Assets (RWA) initiative, aligning technical delivery with product and business strategy in a remote, distributed setup.",
            "Conducted in-depth research on the RWA blockchain sector and synthesized findings into actionable inputs that directly shaped the entire product roadmap and technical architecture decisions.",
            "Structured and organized the technical and product teams, implementing standardized workflows and documentation frameworks that improved cross-functional alignment by over 30%.",
            "Defined and maintained project scope and priorities in collaboration with stakeholders, ensuring that technical workstreams stayed focused on validated use cases.",
            "Established documentation practices to capture decisions, architecture rationale, and lessons learned, supporting continuous improvement of delivery processes."
        ]
    }
];

export default function ExperienceTimeline() {
    const sectionRef = useRef(null);
    const cardsRef = useRef([]);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Pinning the section? No, let's just animate elements in place nicely.

            cardsRef.current.forEach((card, index) => {
                if (!card) return;

                // 1. Card entry
                gsap.fromTo(card,
                    { opacity: 0, y: 100, scale: 0.95 },
                    {
                        opacity: 1,
                        y: 0,
                        scale: 1,
                        duration: 1,
                        ease: "power3.out",
                        scrollTrigger: {
                            trigger: card,
                            start: "top 85%",
                            end: "top 50%",
                            scrub: 1,
                        }
                    }
                );

                // 2. Text Reveal ("Jumping" effect / Line by line highlight)
                const lines = card.querySelectorAll('.exp-line');
                gsap.fromTo(lines,
                    { color: "#4b5563", x: -20 }, // Gray-600 start
                    {
                        color: "#e5e7eb", // Gray-200 end
                        x: 0,
                        duration: 1,
                        stagger: 0.1,
                        ease: "power2.out",
                        scrollTrigger: {
                            trigger: card,
                            start: "top 70%",
                            end: "bottom 70%",
                            scrub: 1
                        }
                    }
                );
            });

        }, sectionRef);

        return () => ctx.revert();
    }, []);

    const addToRefs = (el) => {
        if (el && !cardsRef.current.includes(el)) {
            cardsRef.current.push(el);
        }
    };

    return (
        <div ref={sectionRef} className="w-full max-w-7xl mx-auto px-4 py-24 relative">
            <h2 className="text-5xl md:text-7xl font-bold mb-24 text-center">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 font-space">
                    Professional Chronicle
                </span>
            </h2>

            <div className="flex flex-col gap-32">
                {experiences.map((exp, i) => (
                    <div
                        key={i}
                        ref={addToRefs}
                        className={`
              relative w-full rounded-[2rem] p-1 
              bg-gradient-to-br from-white/10 via-white/5 to-transparent 
              backdrop-blur-xl border border-white/10
              hover:border-${exp.accent}-500/50 transition-colors duration-500
              group
            `}
                    >
                        {/* Long Box Inner */}
                        <div className="bg-[#0a0a0a]/80 rounded-[1.9rem] p-8 md:p-12 h-full relative overflow-hidden">

                            {/* Ambient Glow */}
                            <div className={`absolute top-0 right-0 w-[500px] h-[500px] bg-${exp.accent}-500/10 blur-[100px] rounded-full pointer-events-none -translate-y-1/2 translate-x-1/2`} />

                            {/* Header Row */}
                            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-12 border-b border-white/10 pb-8">
                                <div>
                                    <h3 className="text-3xl md:text-4xl font-bold text-white mb-2 flex items-center gap-3">
                                        <FaUserTie className={`text-${exp.accent}-500 text-2xl`} />
                                        {exp.role}
                                    </h3>
                                    <div className="flex items-center gap-2 text-xl md:text-2xl font-light text-gray-300">
                                        <FaBuilding className={`text-${exp.accent}-400/70`} />
                                        {exp.company}
                                    </div>
                                </div>

                                <div className={`flex items-center gap-3 px-6 py-3 rounded-full bg-${exp.accent}-900/20 border border-${exp.accent}-500/30 text-${exp.accent}-300 font-mono tracking-wider w-fit`}>
                                    <FaCalendarAlt />
                                    {exp.period}
                                </div>
                            </div>

                            {/* Description - Scroll Trigger Targets */}
                            <div className="space-y-6 text-lg md:text-xl font-light leading-relaxed">
                                {exp.description.map((line, idx) => (
                                    <div key={idx} className="flex gap-4 items-start exp-line opacity-90 transition-all">
                                        <span className={`mt-2 w-2 h-2 rounded-full bg-${exp.accent}-500 shrink-0`} />
                                        <p>{line}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
