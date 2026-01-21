"use client";
import React, { useState } from 'react';
import {
    PythonIcon, ReactIcon, PostgresIcon, AkariIcon, QuantumIcon, NodeIcon
} from '@/components/Icons'; // Using generic placeholders where needed
import { FaTerminal, FaFolderOpen, FaCode, FaExternalLinkAlt, FaBrain } from 'react-icons/fa';

const personalProjects = [
    {
        id: "akari",
        title: "Akari Planner",
        role: "Designer & Lead Developer",
        period: "June 2025 - Present",
        type: "AI Platform",
        summary: "AI-assisted planning platform combining budgeting, scenario simulation, and execution workflows.",
        tech: [
            { name: "Python", icon: PythonIcon },
            { name: "React", icon: ReactIcon },
            { name: "PostgreSQL", icon: PostgresIcon }
        ],
        details: [
            "Built a data-driven budgeting engine using Python/Pandas for expense modeling.",
            "Architected full-stack system (React/REST/Postgres) converting insights to workflows.",
            "Applied analytical modeling for robust, explainable decision-making logic."
        ]
    },
    {
        id: "research",
        title: "Independent Research",
        role: "Researcher",
        period: "Feb 2025 - Dec 2025",
        type: "Affective Computing",
        summary: "Mathematical modeling of human emotions via multi-dimensional vector systems.",
        tech: [
            { name: "Quantum Logic", icon: QuantumIcon }, // Placeholder
            { name: "Math Vectors", icon: FaBrain },
        ],
        details: [
            "Represented affective states as multi-dimensional vector systems.",
            "Explored quantum-classical hybrid approaches for non-linear emotional transitions.",
            "Designed logic-driven schemas for empathy representation in computational systems."
        ]
    },
    {
        id: "neuro",
        title: "NeuroLearn AI",
        role: "AI Developer",
        period: "Jan 2023 - April 2024",
        type: "EdTech System",
        summary: "AI system analyzing academic performance with continuous monthly assessments.",
        tech: [
            { name: "Machine Learning", icon: FaBrain },
            { name: "Python", icon: PythonIcon }
        ],
        details: [
            "Designed topic-level gap analysis identifying specific deficiencies.",
            "Integrated LLMs to generate personalized learning recommendations.",
            "Created feedback loops converting insights into adaptive study pathways."
        ]
    }
];

export default function PersonalProjectsDashboard() {
    const [activeFile, setActiveFile] = useState(0);

    return (
        <div className="max-w-7xl mx-auto px-4 py-10 md:py-24">
            <div className="flex items-center gap-4 mb-12 justify-end">
                <h2 className="text-3xl font-mono uppercase tracking-widest text-gray-400">Personal Projects & Research</h2>
                <div className="w-12 h-1 bg-gradient-to-l from-green-500 to-blue-500 rounded-full" />
            </div>

            {/* IDE Window Container */}
            <div className="w-full bg-[#1e1e1e] rounded-xl overflow-hidden shadow-2xl border border-[#333] font-mono text-sm relative">

                {/* Top Bar (Traffic Lights + Filename) */}
                <div className="h-10 bg-[#252526] flex items-center px-4 justify-between border-b border-[#333]">
                    <div className="flex gap-2">
                        <div className="w-3 h-3 rounded-full bg-[#ff5f56]" />
                        <div className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
                        <div className="w-3 h-3 rounded-full bg-[#27c93f]" />
                    </div>
                    <div className="text-gray-400 select-none">Suraj_Portfolio_Projects</div>
                    <div className="w-10" />
                </div>

                <div className="flex flex-col md:flex-row h-auto md:h-[650px]">

                    {/* Explorer Sidebar */}
                    <div className="w-full md:w-64 bg-[#252526] border-r border-[#333] flex flex-col">
                        <div className="p-3 text-xs font-bold text-gray-400 uppercase">Explorer</div>
                        <div className="flex-1 overflow-y-auto max-h-[200px] md:max-h-full">
                            <div className="px-2 py-1 text-gray-300 flex items-center gap-2 cursor-pointer hover:bg-[#37373d]">
                                <FaFolderOpen className="text-blue-400" />
                                <span>src</span>
                            </div>
                            <div className="pl-4">
                                {personalProjects.map((proj, idx) => (
                                    <div
                                        key={proj.id}
                                        onClick={() => setActiveFile(idx)}
                                        className={`px-2 py-1.5 flex items-center gap-2 cursor-pointer transition-colors ${activeFile === idx ? 'bg-[#37373d] text-white' : 'text-gray-500 hover:text-gray-300'
                                            }`}
                                    >
                                        <FaCode className={activeFile === idx ? 'text-yellow-400' : 'text-gray-600'} />
                                        <span>{proj.id}.jsx</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Editor Area */}
                    <div className="flex-1 bg-[#1e1e1e] flex flex-col relative min-h-[400px]">
                        {/* Tabs */}
                        <div className="flex bg-[#252526] overflow-x-auto scrollbar-hide">
                            {personalProjects.map((proj, idx) => (
                                <div
                                    key={idx}
                                    onClick={() => setActiveFile(idx)}
                                    className={`px-4 py-2 text-xs flex items-center gap-2 border-r border-[#1e1e1e] cursor-pointer min-w-fit ${activeFile === idx ? 'bg-[#1e1e1e] text-white' : 'bg-[#2d2d2d] text-gray-500 hover:bg-[#2a2a2a]'
                                        }`}
                                >
                                    <FaCode className="text-yellow-400" />
                                    {proj.id}.jsx
                                </div>
                            ))}
                        </div>

                        {/* Code Content */}
                        <div className="flex-1 p-4 md:p-8 overflow-y-auto font-mono text-gray-300 leading-relaxed selection:bg-blue-500/30">
                            {/* Animated "Typing" or Static Code Block Representation */}

                            <div>
                                <span className="text-purple-400">export const</span> <span className="text-yellow-300">{personalProjects[activeFile].title.replace(/\s/g, '')}</span> <span className="text-white">=</span> <span className="text-blue-300">()</span> <span className="text-purple-400">{'=>'}</span> <span className="text-yellow-300">{'{'}</span>
                            </div>

                            <div className="pl-6 py-4 space-y-4">
                                <div>
                                    <span className="text-gray-500">// {personalProjects[activeFile].summary}</span>
                                </div>

                                <div>
                                    <span className="text-blue-400">const</span> <span className="text-white">role</span> <span className="text-white">=</span> <span className="text-green-300">"{personalProjects[activeFile].role}"</span>;
                                </div>
                                <div>
                                    <span className="text-blue-400">const</span> <span className="text-white">timeline</span> <span className="text-white">=</span> <span className="text-green-300">"{personalProjects[activeFile].period}"</span>;
                                </div>

                                <div className="mt-4">
                                    <span className="text-blue-400">const</span> <span className="text-white">techStack</span> <span className="text-white">=</span> <span className="text-purple-400">['</span>
                                    {personalProjects[activeFile].tech.map((t, i) => (
                                        <span key={i} className="text-green-300">
                                            {t.name}{i < personalProjects[activeFile].tech.length - 1 ? "', '" : ""}
                                        </span>
                                    ))}
                                    <span className="text-purple-400">']</span>;
                                </div>

                                <div className="mt-4">
                                    <span className="text-pink-400">return</span> <span className="text-blue-300">(</span>
                                </div>

                                <div className="pl-6 border-l-2 border-[#333] ml-2">
                                    <div className="text-gray-400">{'<ProjectDetails>'}</div>
                                    {personalProjects[activeFile].details.map((detail, i) => (
                                        <div key={i} className="pl-4 py-1 hover:bg-white/5 rounded">
                                            <span className="text-gray-500">{'<Feature>'}</span>
                                            <span className="text-white mx-2">{detail}</span>
                                            <span className="text-gray-500">{'</Feature>'}</span>
                                        </div>
                                    ))}
                                    <div className="text-gray-400">{'</ProjectDetails>'}</div>
                                </div>

                                <div>
                                    <span className="text-blue-300">);</span>
                                </div>
                            </div>

                            <div>
                                <span className="text-yellow-300">{'}'}</span>
                            </div>

                        </div>

                        {/* Preview Box Bottom Right floating */}
                        <div className="absolute bottom-6 right-6 w-64 bg-[#141414] border border-[#333] rounded-lg p-4 shadow-xl opacity-90 hidden md:block">
                            <div className="flex items-center gap-2 mb-2 pb-2 border-b border-[#333]">
                                <FaTerminal className="text-sm text-gray-500" />
                                <span className="text-xs text-gray-400">Output Terminal</span>
                            </div>
                            <div className="text-xs text-green-400 font-mono">
                                &gt; Build successful<br />
                                &gt; Loaded {personalProjects[activeFile].tech.length} dependencies<br />
                                &gt; Status: <span className="text-yellow-400">Ready to Deploy</span>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
}
