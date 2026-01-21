"use client";
import React from 'react';
import Navbar from '@/components/Navbar';
import ZenFooter from '@/components/ZenFooter';

export default function ContactPage() {
    return (
        <main className="min-h-screen bg-[#0a0a0a] text-white font-outfit relative overflow-hidden selection:bg-cyan-500/30 flex flex-col">
            <Navbar />

            {/* 
              We want the contact page to feature the ZenFooter effects. 
            */}
            <div className="flex-grow flex flex-col justify-center items-center relative z-10 pt-20">
                <div className="w-full h-full min-h-[80vh] flex items-center justify-center">
                    <ZenFooter />
                </div>
            </div>
        </main>
    );
}
