import React from 'react';
import Navbar from '@/components/Navbar';

export default function EducationPage() {
    return (
        <main className="min-h-screen bg-[#0a0a0a] text-white font-outfit relative overflow-hidden selection:bg-cyan-500/30">
            <Navbar />

            <div className="relative w-full min-h-screen flex flex-col items-center justify-center px-6 py-24 z-10">
                {/* Background Decoration */}
                <div className="absolute inset-0 z-0 opacity-20 pointer-events-none">
                    <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-900/40 rounded-full blur-[120px]" />
                    <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-900/40 rounded-full blur-[120px]" />
                </div>

                <div className="max-w-4xl w-full relative z-10 text-center">
                    <h1 className="text-5xl md:text-7xl font-bold mb-12 tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white via-gray-300 to-gray-500">
                        My Educational Journey
                    </h1>

                    <div className="space-y-8 text-lg md:text-xl text-gray-300 leading-relaxed max-w-3xl mx-auto backdrop-blur-sm bg-black/30 p-8 rounded-3xl border border-white/5 shadow-2xl">
                        <p>
                            During my 10th and 12th grades, I discovered a profound passion for technology that went far beyond the classroom curriculum. I found myself consistently engaged in learning, exploring complex systems, and building real-world projects while my peers were focused solely on textbooks.
                        </p>
                        <p>
                            The momentum of acquiring tangible skills and the excitement of working on live projects made one thing clear: my path wasn't going to be traditional. When the time came for college, I was offered <span className="text-white font-bold">100% scholarships</span> from multiple institutions.
                        </p>
                        <p>
                            However, I made a bold choice. I realized that a conventional degree might restrict the pace at which I wanted to grow. I chose to reject those offers to define my own destiny—prioritizing <span className="text-cyan-400 font-medium">skills, knowledge, and hands-on experience</span> over chasing a paper credential.
                        </p>
                        <p>
                            I decided not to get stuck in a loop but to forge a path where my value is defined by what I can create and solve, not just what I've studied.
                        </p>
                    </div>
                </div>
            </div>
        </main>
    );
}
