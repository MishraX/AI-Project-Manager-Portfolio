"use client";
import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { FaServer, FaCode, FaChartLine, FaCheckCircle, FaRocket, FaBrain, FaFlask, FaAtom } from 'react-icons/fa';
import {
    NodeIcon, AWSIcon, PostgresIcon, BlockchainIcon, ReactIcon, PythonIcon
} from '@/components/Icons';

// New Project Data
const projects = [
    {
        id: 'akari',
        role: "Designer & Lead Developer",
        company: "Akari Planner (Personal)",
        period: "June 2025 - Present",
        status: "In Development",
        statusColor: "text-blue-400 bg-blue-400/10",
        theme: "blue",
        stats: [
            { label: "Budgeting Precision", value: 99, prefix: "", suffix: "%", icon: FaChartLine },
            { label: "Stack Reliability", value: 100, prefix: "", suffix: "%", icon: FaServer },
        ],
        tech: [
            { name: "Python", icon: PythonIcon },
            { name: "React", icon: ReactIcon },
            { name: "PostgreSQL", icon: PostgresIcon },
        ],
        tasks: [
            { title: "Budgeting Engine", desc: "Built data-driven engine with Pandas", tag: "Backend" },
            { title: "Full-Stack System", desc: "React, REST APIs, PostgreSQL arch", tag: "System Design" },
            { title: "Decision Logic", desc: "Analytical modeling for robust behavior", tag: "AI/Logic" },
        ]
    },
    {
        id: 'research',
        role: "Independent Researcher",
        company: "Affective Computing Research",
        period: "Feb 2025 - Dec 2025",
        status: "Published",
        statusColor: "text-purple-400 bg-purple-400/10",
        theme: "purple",
        stats: [
            { label: "Dimensions Mapped", value: 12, prefix: "", suffix: "D", icon: FaAtom },
            { label: "Hybrid Models", value: 2, prefix: "", suffix: "", icon: FaFlask },
        ],
        tech: [
            { name: "Quantum Hybrid", icon: FaAtom }, // Using generic atom for quantum
            { name: "Vector Systems", icon: FaChartLine },
            { name: "AI/Logic", icon: FaBrain },
        ],
        tasks: [
            { title: "Emotion Modeling", desc: "Representing affective states as vectors", tag: "Research" },
            { title: "Quantum-Classical", desc: "Modeling non-linear emotional transitions", tag: "Quantum AI" },
            { title: "Schema Design", desc: "Logic-driven empathy representation", tag: "Theory" },
        ]
    },
    {
        id: 'neurolearn',
        role: "AI System Developer",
        company: "NeuroLearn AI",
        period: "Jan 2023 - April 2024",
        status: "Completed",
        statusColor: "text-cyan-400 bg-cyan-400/10",
        theme: "cyan",
        stats: [
            { label: "Gap Identification", value: 85, prefix: "", suffix: "%", icon: FaCheckCircle },
            { label: "Retention Rate", value: 40, prefix: "+", suffix: "%", icon: FaRocket },
        ],
        tech: [
            { name: "Machine Learning", icon: FaBrain },
            { name: "LLM Analysis", icon: FaCode },
            { name: "Python", icon: PythonIcon },
        ],
        tasks: [
            { title: "Gap Analysis Model", desc: "Identified specific learning deficiencies", tag: "ML Model" },
            { title: "Recommendation Engine", desc: "LLM-based personalized study paths", tag: "AI" },
            { title: "Adaptive Feedback", desc: "Converted insights into pathways", tag: "EdTech" },
        ]
    }
];

export default function DashboardExperience() {
    const [activeTab, setActiveTab] = useState(0);
    const containerRef = useRef(null);
    const statsRef = useRef([]);

    // Spotlight State
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [opacity, setOpacity] = useState(0);

    const handleMouseMove = (e) => {
        if (!containerRef.current) return;
        const rect = containerRef.current.getBoundingClientRect();
        setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
    };

    const handleMouseEnter = () => setOpacity(1);
    const handleMouseLeave = () => setOpacity(0);

    // Animation on Tab Change
    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo(".dashboard-content",
                { opacity: 0, y: 20 },
                { opacity: 1, y: 0, duration: 0.5, ease: "power2.out", stagger: 0.1 }
            );

            statsRef.current.forEach((stat, index) => {
                if (projects[activeTab].stats[index]) {
                    const targetValue = projects[activeTab].stats[index].value;
                    gsap.fromTo(stat,
                        { innerText: 0 },
                        {
                            innerText: targetValue,
                            duration: 1.5,
                            ease: "power2.out",
                            snap: { innerText: 1 },
                            onUpdate: function () {
                                if (this.targets()[0]) this.targets()[0].innerText = Math.ceil(this.targets()[0].innerText);
                            }
                        }
                    );
                    gsap.fromTo(`.stat-bar-${index}`, { width: "0%" }, { width: `${targetValue}%`, duration: 1.2, ease: "power2.inOut" });
                }
            });
        }, containerRef);
        return () => ctx.revert();
    }, [activeTab]);

    return (
        <div className="w-full max-w-7xl mx-auto px-4 py-24" id="experience-dashboard">
            <h2 className="text-4xl md:text-5xl font-mono font-bold mb-12 text-center text-gray-400 uppercase tracking-widest">
                Workstation_v2.0
            </h2>

            {/* Dashboard Container (Window) with Spotlight */}
            <div
                ref={containerRef}
                onMouseMove={handleMouseMove}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                className="w-full bg-[#111] rounded-xl border border-white/10 overflow-hidden shadow-2xl flex flex-col md:flex-row min-h-[600px] relative group"
            >
                {/* Spotlight Overlay */}
                <div
                    className="pointer-events-none absolute -inset-px transition-opacity duration-300 z-10"
                    style={{
                        opacity,
                        background: `radial-gradient(800px circle at ${position.x}px ${position.y}px, rgba(255,255,255,0.06), transparent 40%)`
                    }}
                />

                {/* Sidebar */}
                <div className="w-full md:w-80 bg-[#0a0a0a] border-r border-white/5 flex flex-col relative z-20">
                    <div className="p-6 border-b border-white/5">
                        <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider">Work Experience</h3>
                    </div>
                    <div className="flex-1 overflow-y-auto p-4 space-y-2">
                        {projects.map((proj, idx) => (
                            <button
                                key={proj.id}
                                onClick={() => setActiveTab(idx)}
                                className={`w-full text-left p-4 rounded-lg transition-all duration-300 flex items-center justify-between group ${activeTab === idx
                                        ? `bg-${proj.theme}-500/10 border border-${proj.theme}-500/50`
                                        : 'hover:bg-white/5 border border-transparent'
                                    }`}
                            >
                                <div>
                                    <div className={`font-bold ${activeTab === idx ? 'text-white' : 'text-gray-400 group-hover:text-gray-200'}`}>
                                        {proj.id === 'akari' ? 'Akari Planner' : proj.company.split(' ')[0]}...
                                    </div>
                                    <div className="text-xs text-gray-500 mt-1 truncate max-w-[150px]">{proj.role}</div>
                                </div>
                                {activeTab === idx && <div className={`w-2 h-2 rounded-full bg-${proj.theme}-500 animate-pulse`} />}
                            </button>
                        ))}
                    </div>

                    {/* User Profile Mini */}
                    <div className="p-6 border-t border-white/5 flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-cyan-400 to-purple-500" />
                        <div>
                            <div className="text-sm font-bold text-white">Suraj Mishra</div>
                            <div className="text-xs text-gray-500">AI Project Manager</div>
                        </div>
                    </div>
                </div>

                {/* Main Content Area */}
                <div className="flex-1 bg-[#111] relative flex flex-col z-20">

                    {/* Toolbar Header */}
                    <div className="h-16 border-b border-white/5 flex items-center justify-between px-8 bg-[#141414]">
                        <div className="flex items-center gap-4">
                            <span className="text-gray-400 text-sm">/ workspace / {projects[activeTab].id}</span>
                            <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${projects[activeTab].statusColor}`}>
                                {projects[activeTab].status}
                            </span>
                        </div>
                        <div className="flex gap-2">
                            <div className="w-3 h-3 rounded-full bg-red-500/20" />
                            <div className="w-3 h-3 rounded-full bg-yellow-500/20" />
                            <div className="w-3 h-3 rounded-full bg-green-500/20" />
                        </div>
                    </div>

                    {/* Dashboard Body */}
                    <div className="p-8 flex-1 overflow-y-auto dashboard-content">

                        {/* Header Info */}
                        <div className="mb-10">
                            <h1 className="text-3xl md:text-5xl font-bold text-white mb-2">{projects[activeTab].role}</h1>
                            <p className="text-xl text-gray-400 font-light">{projects[activeTab].company} • <span className="text-sm font-mono opacity-60">{projects[activeTab].period}</span></p>
                        </div>

                        {/* Widgets Grid */}
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">

                            {/* 1. Stats Widget */}
                            <div className="col-span-1 lg:col-span-2 grid grid-cols-2 gap-4">
                                {projects[activeTab].stats.map((stat, i) => (
                                    <div key={i} className="bg-[#1a1a1a] p-6 rounded-xl border border-white/5 relative overflow-hidden group hover:border-white/10 transition-colors">
                                        <div className="flex justify-between items-start mb-4">
                                            <h4 className="text-gray-400 text-sm font-medium">{stat.label}</h4>
                                            <stat.icon className={`text-${projects[activeTab].theme}-400 text-lg`} />
                                        </div>
                                        <div className="text-4xl font-bold text-white flex items-baseline gap-1">
                                            {stat.prefix}
                                            <span ref={el => statsRef.current[i] = el}>0</span>
                                            <span className="text-lg text-gray-500">{stat.suffix}</span>
                                        </div>
                                        <div className="w-full h-1 bg-gray-800 mt-4 rounded-full overflow-hidden">
                                            <div className={`h-full bg-${projects[activeTab].theme}-500 stat-bar-${i} rounded-full`} />
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* 2. Tech Stack Widget */}
                            <div className="col-span-1 bg-[#1a1a1a] p-6 rounded-xl border border-white/5">
                                <h4 className="text-gray-400 text-sm font-medium mb-4">Technology Stack</h4>
                                <div className="flex flex-wrap gap-2">
                                    {projects[activeTab].tech.map((t, i) => (
                                        <span key={i} className="flex items-center gap-2 px-3 py-1.5 rounded-md bg-[#222] border border-white/5 text-sm text-gray-300 hover:text-white hover:border-white/20 transition-colors">
                                            <t.icon className={`w-4 h-4 text-${projects[activeTab].theme}-400`} />
                                            {t.name}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* 3. Task Board (Kanban Style List) */}
                        <div className="bg-[#1a1a1a] rounded-xl border border-white/5 overflow-hidden">
                            <div className="p-4 border-b border-white/5 flex justify-between items-center bg-[#222]">
                                <h4 className="text-gray-300 font-bold text-sm">Key Deliverables</h4>
                                <span className="text-xs text-gray-500">{projects[activeTab].tasks.length} Items</span>
                            </div>
                            <div className="divide-y divide-white/5">
                                {projects[activeTab].tasks.map((task, i) => (
                                    <div key={i} className="p-4 flex items-center justify-between hover:bg-white/5 transition-colors group">
                                        <div className="flex items-center gap-4">
                                            <div className={`w-5 h-5 rounded-full border-2 border-${projects[activeTab].theme}-500/30 flex items-center justify-center group-hover:border-${projects[activeTab].theme}-500 transition-colors`}>
                                                <div className={`w-2.5 h-2.5 rounded-full bg-${projects[activeTab].theme}-500 opacity-0 group-hover:opacity-100 transition-opacity`} />
                                            </div>
                                            <div>
                                                <div className="text-white font-medium text-sm line-through decoration-gray-600 decoration-2 opacity-80 group-hover:opacity-100 group-hover:line-through transition-all">{task.title}</div>
                                                <div className="text-xs text-gray-500 mt-0.5 max-w-lg">{task.desc}</div>
                                            </div>
                                        </div>
                                        <span className="ml-2 px-2 py-1 rounded text-[10px] bg-[#111] border border-white/10 text-gray-400 whitespace-nowrap">
                                            {task.tag}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
}
