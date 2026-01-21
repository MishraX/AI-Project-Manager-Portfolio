"use client";
import React, { useState, useRef, useEffect } from 'react';
import gsap from 'gsap';
import {
    NodeIcon, AWSIcon, PostgresIcon, BlockchainIcon, RustIcon, RWAIcon
} from '@/components/Icons';
import { FaChartLine, FaServer, FaCheckCircle, FaRocket, FaClock } from 'react-icons/fa';

const workData = [
    {
        id: "pyramid",
        role: "Lead Developer & Project Manager",
        company: "Pyramid Timber Associates Pvt. Ltd.",
        period: "April 2025 - Present",
        type: "Full-Time",
        theme: "cyan",
        logoColor: "bg-transparent",
        logoImg: "/logos/pyramidlogo.png",
        description: "Leading digital transformation and full-stack development for B2B operations.",
        stats: [
            { label: "Efficiency", value: "+40%", desc: "Order Processing" },
            { label: "Lifecycle", value: "85%", desc: "Ownership" },
        ],
        tech: [
            { name: "Node.js", icon: NodeIcon },
            { name: "PostgreSQL", icon: PostgresIcon },
            { name: "AWS (EC2)", icon: AWSIcon },
        ],
        points: [
            "Led end-to-end delivery of custom full-stack B2B portal, digitizing legacy workflows.",
            "Owned 85% of software lifecycle: infra provisioning to secure production deployment.",
            "Translated business reqs into tech specs, prioritizing scope and milestones.",
            "Maintained operational continuity by monitoring system/reliability fixes."
        ]
    },
    {
        id: "dira",
        role: "Technical Project Manager",
        company: "Dira Foundation",
        period: "Feb 2022 - July 2025",
        type: "Remote",
        theme: "purple",
        logoColor: "bg-transparent",
        logoImg: "/logos/diralogo.png",
        description: "Managed technical delivery for Real World Assets (RWA) blockchain initiative.",
        stats: [
            { label: "Alignment", value: "+30%", desc: "Cross-functional" },
            { label: "Research", value: "100%", desc: "RWA Sector" },
        ],
        tech: [
            { name: "Blockchain", icon: BlockchainIcon },
            { name: "RWA Specs", icon: RWAIcon },
            { name: "Rust", icon: RustIcon },
        ],
        points: [
            "Aligned technical delivery with product strategy in distributed setup.",
            "Conducted RWA research shaping product roadmap and architecture.",
            "Implemented standardized workflows improving alignment by 30%.",
            "Established documentation practices for architecture rationale."
        ]
    }
];

export default function WorkExperienceDashboard() {
    const [activeId, setActiveId] = useState("pyramid");
    const activeJob = workData.find(j => j.id === activeId);
    const contentRef = useRef(null);

    useEffect(() => {
        if (contentRef.current) {
            gsap.fromTo(contentRef.current,
                { opacity: 0, x: 20 },
                { opacity: 1, x: 0, duration: 0.4, ease: "power2.out" }
            );
        }
    }, [activeId]);

    return (
        <div className="max-w-7xl mx-auto px-4 py-10 md:py-24">
            <div className="flex items-center gap-4 mb-12">
                <div className="w-12 h-1 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full" />
                <h2 className="text-3xl font-mono uppercase tracking-widest text-gray-400">Corporate & Client Work</h2>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 bg-[#0F0F0F] border border-white/5 rounded-3xl p-2 overflow-hidden shadow-2xl">

                {/* Sidebar / Navigation */}
                <div className="lg:col-span-4 bg-[#141414] rounded-2xl p-6 flex flex-col gap-4 h-full border border-white/5">
                    <div className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-4 px-2">Select Organization</div>
                    {workData.map((job) => (
                        <button
                            key={job.id}
                            onClick={() => setActiveId(job.id)}
                            className={`text-left p-5 rounded-xl border transition-all duration-300 relative overflow-hidden group ${activeId === job.id
                                ? `bg-white/5 border-${job.theme}-500/30`
                                : 'bg-transparent border-transparent hover:bg-white/5'
                                }`}
                        >
                            <div className={`absolute left-0 top-0 bottom-0 w-1 ${activeId === job.id ? `bg-${job.theme}-500` : 'bg-transparent'} transition-colors`} />
                            <div className="flex items-start justify-between mb-2">
                                <div className={`w-10 h-10 rounded-lg ${job.logoColor} flex items-center justify-center overflow-hidden shadow-lg`}>
                                    {job.logoImg ? (
                                        <img src={job.logoImg} alt={job.company} className="w-full h-full object-cover" />
                                    ) : (
                                        <span className="text-white font-bold text-lg">{job.company.charAt(0)}</span>
                                    )}
                                </div>
                                <span className="text-[10px] font-mono border border-white/10 px-2 py-1 rounded text-gray-400">{job.type}</span>
                            </div>
                            <h3 className={`font-bold text-lg ${activeId === job.id ? 'text-white' : 'text-gray-400 group-hover:text-gray-200'}`}>
                                {job.company}
                            </h3>
                            <p className="text-xs text-gray-500 mt-1">{job.role}</p>
                        </button>
                    ))}
                </div>

                {/* Main Content (Changes based on selection) */}
                <div className="lg:col-span-8 p-4 md:p-6 lg:p-10 relative min-h-[500px]" ref={contentRef}>

                    {/* Header */}
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10 border-b border-white/5 pb-8">
                        <div>
                            <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">{activeJob.role}</h2>
                            <div className="flex items-center gap-2 text-gray-400">
                                <span className={`text-${activeJob.theme}-400 font-bold`}>@{activeJob.company}</span>
                                <span>•</span>
                                <span className="flex items-center gap-1 text-sm bg-white/5 px-2 py-0.5 rounded"><FaClock className="text-xs" /> {activeJob.period}</span>
                            </div>
                        </div>
                        <div className="flex gap-3">
                            {activeJob.tech.map((t, i) => (
                                <div key={i} className="w-10 h-10 rounded-full bg-[#1a1a1a] border border-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:border-white/30 transition-all" title={t.name}>
                                    <t.icon className="w-5 h-5" />
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Stats Row */}
                    <div className="grid grid-cols-2 gap-4 mb-10">
                        {activeJob.stats.map((stat, i) => (
                            <div key={i} className="bg-[#1a1a1a] border border-white/5 p-6 rounded-2xl flex items-center gap-4">
                                <div className={`w-12 h-12 rounded-full bg-${activeJob.theme}-900/20 flex items-center justify-center text-${activeJob.theme}-400 text-xl`}>
                                    {i === 0 ? <FaRocket /> : <FaChartLine />}
                                </div>
                                <div>
                                    <div className="text-2xl font-bold text-white">{stat.value}</div>
                                    <div className="text-sm text-gray-500">{stat.desc}</div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Key Deliverables (Bullet Points but fancy) */}
                    <div>
                        <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-6">Key Deliverables & Impact</h3>
                        <div className="space-y-4">
                            {activeJob.points.map((point, index) => (
                                <div key={index} className="flex gap-4 p-4 rounded-xl hover:bg-white/5 transition-colors border border-transparent hover:border-white/5 group">
                                    <div className={`w-6 h-6 rounded-full border border-${activeJob.theme}-500/30 flex items-center justify-center shrink-0 mt-0.5 group-hover:bg-${activeJob.theme}-500/10`}>
                                        <div className={`w-2 h-2 rounded-full bg-${activeJob.theme}-500`} />
                                    </div>
                                    <p className="text-gray-300 leading-relaxed text-sm md:text-base">{point}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}
