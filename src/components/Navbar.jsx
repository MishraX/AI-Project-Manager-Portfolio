"use client";
import Link from 'next/link';
import { useState, useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import gsap from 'gsap';

export default function Navbar() {
    const pathname = usePathname();
    const [isExpanded, setIsExpanded] = useState(false);
    const navRef = useRef(null);
    const containerRef = useRef(null);
    const [activeHash, setActiveHash] = useState('Home');

    const links = [
        { name: 'Home', path: '/' },
        { name: 'Study', path: '/education' },
        { name: 'Contact me', path: '/contact' },
    ];

    // Scroll active state logic
    useEffect(() => {
        const handleScroll = () => {
            const sections = links.map(link => link.path.replace('/', ''));
            let current = 'Home';
            for (const section of sections) {
                if (!section) continue;
                const element = document.getElementById(section.replace('#', ''));
                if (element) {
                    const rect = element.getBoundingClientRect();
                    if (rect.top <= 200 && rect.bottom >= 200) {
                        current = links.find(l => l.path === section)?.name || 'Home';
                        break;
                    }
                }
            }
            setActiveHash(current);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Expand/Collapse Animation - Smoother elastic
    useEffect(() => {
        if (isExpanded) {
            gsap.to(navRef.current, {
                width: 'auto',
                minWidth: '380px',
                height: '60px',
                padding: '0 2rem',
                borderRadius: '9999px',
                duration: 0.6,
                ease: "elastic.out(1, 0.75)"
            });
        } else {
            gsap.to(navRef.current, {
                width: '120px',
                minWidth: '0px',
                height: '44px',
                padding: '0 1rem',
                borderRadius: '9999px',
                duration: 0.6,
                ease: "power3.inOut" // Smoother closing
            });
        }
    }, [isExpanded]);

    // Spotlight Effect
    const handleMouseMove = (e) => {
        if (!containerRef.current) return;
        const { left, top } = containerRef.current.getBoundingClientRect();
        const x = e.clientX - left;
        const y = e.clientY - top;

        containerRef.current.style.setProperty('--mouse-x', `${x}px`);
        containerRef.current.style.setProperty('--mouse-y', `${y}px`);
    };

    return (
        <div
            ref={containerRef}
            className="fixed top-6 left-1/2 -translate-x-1/2 z-50 p-[1px] rounded-full overflow-hidden group"
            onMouseMove={handleMouseMove}
            style={{
                background: 'radial-gradient(800px circle at var(--mouse-x) var(--mouse-y), rgba(255,255,255,0.4), transparent 40%)'
            }}
        >
            <nav
                ref={navRef}
                onMouseEnter={() => setIsExpanded(true)}
                onMouseLeave={() => setIsExpanded(false)}
                className="bg-black/90 relative z-10 flex items-center justify-center overflow-hidden"
                style={{ width: '120px', height: '44px' }}
            >
                {isExpanded ? (
                    <ul className="flex items-center gap-8 whitespace-nowrap opacity-0 animate-fadeIn">
                        {links.map((link) => (
                            <li key={link.name}>
                                <Link
                                    href={link.path}
                                    className={`text-sm font-medium tracking-wide transition-colors ${activeHash === link.name ? 'text-white font-bold' : 'text-gray-400 hover:text-gray-200'
                                        }`}
                                >
                                    {link.name}
                                </Link>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <div className="flex items-center gap-2 text-white/90 animate-fadeIn justify-center">
                        <span className="text-sm font-medium tracking-wide opacity-80">{activeHash}</span>
                    </div>
                )}
            </nav>

            <style jsx>{`
        @keyframes fadeIn {
          0% { opacity: 0; filter: blur(4px); }
          100% { opacity: 1; filter: blur(0px); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.4s ease-out forwards;
        }
      `}</style>
        </div>
    );
}
