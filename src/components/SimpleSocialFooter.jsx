"use client";
import React from 'react';
import { FaInstagram, FaGithub, FaLinkedin } from 'react-icons/fa';

export default function SimpleSocialFooter() {
    return (
        <footer id="contact" className="w-full py-32 bg-black flex flex-col items-center justify-center relative overflow-hidden border-t border-white/10">

            {/* Glow Effect Background */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-blue-900/20 blur-[120px] rounded-full pointer-events-none" />

            <div className="relative z-10 flex flex-col items-center gap-12">
                <h2 className="text-4xl md:text-6xl font-bold text-center tracking-tighter group cursor-default">
                    <span className="bg-clip-text text-transparent bg-gradient-to-b from-white via-gray-200 to-gray-600 group-hover:via-white group-hover:to-cyan-200 transition-all duration-700">
                        Like what you saw?! Let's connect
                    </span>
                </h2>

                <div className="flex items-center gap-10">
                    <a
                        href="https://www.instagram.com/duskmuffin/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-400 hover:text-[#E1306C] transition-all duration-300 transform hover:scale-125 hover:rotate-6"
                        aria-label="Instagram"
                    >
                        <FaInstagram size={40} />
                    </a>
                    <a
                        href="https://github.com/MishraX"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-400 hover:text-white transition-all duration-300 transform hover:scale-125 hover:-rotate-6"
                        aria-label="GitHub"
                    >
                        <FaGithub size={40} />
                    </a>
                    <a
                        href="https://www.linkedin.com/in/mishrax27/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-400 hover:text-[#0077b5] transition-all duration-300 transform hover:scale-125 hover:rotate-6"
                        aria-label="LinkedIn"
                    >
                        <FaLinkedin size={40} />
                    </a>
                </div>
            </div>
        </footer>
    );
}
