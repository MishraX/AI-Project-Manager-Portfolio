"use client";
import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import {
    JiraIcon, MondayIcon, ClickUpIcon, ReactIcon, MiroIcon, NotionIcon
} from '@/components/Icons';


const tools = [
    { Component: JiraIcon, color: '#0052CC', name: 'Jira' },
    { Component: MondayIcon, color: '#FF3D57', name: 'Monday.com' },
    { Component: ClickUpIcon, color: '#7B68EE', name: 'ClickUp' },
    { Component: ReactIcon, color: '#61DAFB', name: 'React' },
    { Component: MiroIcon, color: '#FFD02F', name: 'Miro' },
    { Component: NotionIcon, color: '#000000', name: 'Notion' },
];

export default function InfiniteTools() {
    const listRef = useRef(null);

    useEffect(() => {
        // Basic Clone for infinite scroll via CSS or GSAP
        // We will use CSS for simpler constant velocity
    }, []);

    return (
        <div className="w-full overflow-hidden py-24 bg-gradient-to-t from-black to-[#0a0a0a] relative z-20">
            <div className="max-w-7xl mx-auto px-4 mb-12 text-center">
                <h3 className="text-xl md:text-2xl font-mono text-gray-500 uppercase tracking-[0.3em]">
                    Architecture & Strategy
                </h3>
            </div>

            {/* Masked Gradient wrapper for fade out effect on sides */}
            <div className="relative w-full flex items-center overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
                {/* Moving Container */}
                <div className="flex animate-infinite-scroll w-max hover:[animation-play-state:paused]">
                    {/* 3 Sets for seamless looping */}
                    {[...tools, ...tools, ...tools, ...tools].map((Tool, i) => (
                        <div key={i} className="flex flex-col items-center justify-center mx-10 md:mx-16 group cursor-pointer">
                            <div className="relative w-24 h-24 flex items-center justify-center p-6 rounded-2xl bg-white/5 border border-white/5 group-hover:border-white/20 group-hover:bg-white/10 transition-all duration-300">
                                <Tool.Component
                                    className="w-full h-full filter grayscale group-hover:grayscale-0 transition-all duration-500 opacity-60 group-hover:opacity-100 group-hover:scale-110 drop-shadow-[0_0_10px_rgba(255,255,255,0)] group-hover:drop-shadow-[0_0_15px_rgba(255,255,255,0.2)]"
                                    color={Tool.color}
                                />
                            </div>
                            <span className="mt-4 text-sm font-medium text-gray-600 group-hover:text-white transition-colors tracking-wide opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 duration-300">{Tool.name}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
