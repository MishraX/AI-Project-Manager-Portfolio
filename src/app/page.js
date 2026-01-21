"use client";
import { useState, useRef } from 'react';
import Loader from '@/components/Loader';
import Navbar from '@/components/Navbar';
import NetworkBackground from '@/components/NetworkBackground';
import BuilderText from '@/components/BuilderText';
import AiRoleDescription from '@/components/AiRoleDescription';
import InteractiveSentence from '@/components/InteractiveSentence';
import InfiniteTools from '@/components/InfiniteTools';
import SimpleSocialFooter from '@/components/SimpleSocialFooter';
import WorkExperienceDashboard from '@/components/WorkExperienceDashboard';
import PersonalProjectsDashboard from '@/components/PersonalProjectsDashboard';
import { FaDownload } from 'react-icons/fa6';
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const networkRef = useRef();

  const useScramble = (text) => {
    const [display, setDisplay] = useState(text);
    const chars = "!<>-_\\/[]{ }—=+*^?#________";
    const scramble = () => {
      let iteration = 0;
      const interval = setInterval(() => {
        setDisplay(
          text.split("").map((letter, index) => {
            if (index < iteration) return text[index];
            return chars[Math.floor(Math.random() * chars.length)];
          }).join("")
        );
        if (iteration >= text.length) {
          clearInterval(interval);
          setDisplay(text);
        }
        iteration += 1 / 5;
      }, 60);
    };
    return { display, scramble };
  };

  const { display: nameDisplay, scramble: scrambleName } = useScramble("SURAJ MISHRA");

  const handleLoaderComplete = () => {
    setIsLoading(false);
  };

  const handleDownloadCV = (e) => {
    // Trigger animation
    if (networkRef.current) networkRef.current.triggerCVAnimation();

    // Direct download link
    const cvUrl = "/cv/Suraj Mishra- Technical Project Manager.pdf";

    // Create a temporary link to trigger download
    const link = document.createElement('a');
    link.href = cvUrl;
    link.download = "Suraj_Mishra_CV.pdf"; // Renamed for cleaner download
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <main className="min-h-screen bg-[#0a0a0a] text-white overflow-x-hidden relative selection:bg-cyan-500/30 font-outfit scroll-smooth">

      {isLoading ? (
        <Loader onComplete={handleLoaderComplete} />
      ) : (
        <>
          {/* Effects Wrapper: Only covers Hero and Work Experience */}
          <div className="relative w-full overflow-hidden">
            <NetworkBackground ref={networkRef} />

            <Navbar />

            {/* Hero Section */}
            <section className="min-h-screen w-full flex flex-col items-center justify-center relative hero-content z-10 px-4 py-20 md:py-0">
              <div className="text-center relative w-full max-w-5xl flex flex-col items-center">

                <h1
                  className="text-4xl sm:text-6xl md:text-9xl font-bold mb-4 tracking-tighter leading-none hero-text-line cursor-pointer select-none"
                  onMouseEnter={scrambleName}
                >
                  <span className="bg-clip-text text-transparent bg-gradient-to-br from-white via-gray-200 to-gray-500">
                    {nameDisplay}
                  </span>
                </h1>

                <div className="mb-4 w-full">
                  <BuilderText />
                </div>

                <InteractiveSentence />

                {/* Buttons */}
                <div className="flex flex-col md:flex-row gap-6 justify-center hero-text-line mt-12 w-full max-w-lg px-4">
                  <button
                    onClick={() => window.location.href = '/education'}
                    className="flex-1 px-8 py-4 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 transition-all flex items-center justify-center group backdrop-blur-md cursor-pointer"
                  >
                    <span className="font-medium text-gray-300 group-hover:text-white">Education</span>
                  </button>

                  <button
                    onClick={handleDownloadCV}
                    className="flex-1 px-8 py-4 bg-white text-black rounded-xl hover:scale-105 transition-all flex items-center justify-center gap-2 font-bold shadow-[0_0_20px_rgba(255,255,255,0.2)] cursor-pointer"
                  >
                    <FaDownload /> CV
                  </button>
                </div>
              </div>
            </section>

            {/* AI Role Description Section */}
            <AiRoleDescription />

            {/* 1. Work Experience Section (Corporate Dashboard) */}
            <section id="work" className="w-full relative z-10 bg-transparent">
              <WorkExperienceDashboard />
            </section>
          </div>

          {/* 2. Personal Projects Section (IDE Dashboard) - OUTSIDE effects wrapper */}
          <section id="projects" className="w-full relative z-10 bg-[#0a0a0a]">
            <PersonalProjectsDashboard />
          </section>

          {/* Tools Section */}
          <section id="tools" className="w-full relative z-10 bg-[#0a0a0a]">
            <InfiniteTools />
          </section>

          {/* Simple Social Footer */}
          <SimpleSocialFooter />
        </>
      )}
    </main>
  );
}
