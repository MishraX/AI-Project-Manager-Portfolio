"use client";
import { useEffect, useRef, useImperativeHandle, forwardRef } from 'react';

const NetworkBackground = forwardRef((props, ref) => {
    const canvasRef = useRef(null);
    const animationRef = useRef(null);
    // Animation State Refs
    const animState = useRef({
        mode: 'normal',
        gatherTarget: { x: 0, y: 0 },
        explosionForce: 0
    });

    useImperativeHandle(ref, () => ({
        triggerCVAnimation: () => {
            startGatherSequence();
        }
    }));

    const startGatherSequence = () => {
        if (!canvasRef.current) return;
        const width = canvasRef.current.width;
        const height = canvasRef.current.height;

        animState.current.gatherTarget = { x: width / 2, y: height - 100 };
        animState.current.mode = 'gathering';

        setTimeout(() => {
            animState.current.mode = 'exploding';
            animState.current.explosionForce = 50;
            setTimeout(() => {
                animState.current.mode = 'normal';
            }, 1000);
        }, 1200);
    };

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        let width, height;
        let particles = [];
        const particleCount = 80;
        const connectionDistance = 140;
        const textProtectionRadius = 350;
        const mouse = { x: null, y: null, vx: 0, vy: 0, lastX: 0, lastY: 0 };
        let hue = 0;

        function resize() {
            if (canvas && canvas.parentElement) {
                width = canvas.width = canvas.parentElement.offsetWidth;
                height = canvas.height = canvas.parentElement.offsetHeight;
            } else {
                width = canvas.width = window.innerWidth;
                height = canvas.height = window.innerHeight;
            }
        }

        class Particle {
            constructor() {
                this.reset();
                this.x = Math.random() * width;
                this.y = Math.random() * height;
            }

            reset() {
                this.x = Math.random() * width;
                this.y = Math.random() * height;
                this.vx = (Math.random() - 0.5) * 0.5;
                this.vy = (Math.random() - 0.5) * 0.5;
                this.size = Math.random() * 2 + 1;
            }

            update() {
                const state = animState.current;
                if (state.mode === 'gathering') {
                    const dx = state.gatherTarget.x - this.x;
                    const dy = state.gatherTarget.y - this.y;
                    this.x += dx * 0.05;
                    this.y += dy * 0.05;
                } else if (state.mode === 'exploding') {
                    const dx = this.x - state.gatherTarget.x;
                    const dy = this.y - state.gatherTarget.y;
                    const angle = Math.atan2(dy, dx);
                    const force = (Math.random() * 10 + 10) + state.explosionForce;
                    this.vx = Math.cos(angle) * force * 0.5;
                    this.vy = Math.sin(angle) * force * 0.5;
                    this.x += this.vx;
                    this.y += this.vy;
                } else {
                    this.x += this.vx;
                    this.y += this.vy;

                    if (this.x < 0 || this.x > width) this.vx *= -1;
                    if (this.y < 0 || this.y > height) this.vy *= -1;

                    if (mouse.x != null) {
                        let dx = mouse.x - this.x;
                        let dy = mouse.y - this.y;
                        let distance = Math.sqrt(dx * dx + dy * dy);
                        const maxDistance = 200;
                        if (distance < maxDistance) {
                            const forceDirectionX = dx / distance;
                            const forceDirectionY = dy / distance;
                            const force = (maxDistance - distance) / maxDistance;
                            this.vx -= forceDirectionX * force * 0.05;
                            this.vy -= forceDirectionY * force * 0.05;
                        }
                    }

                    const centerX = width / 2;
                    const centerY = height / 2;
                    let dxCenter = centerX - this.x;
                    let dyCenter = centerY - this.y;
                    let distCenter = Math.sqrt(dxCenter * dxCenter + dyCenter * dyCenter);
                    if (distCenter < textProtectionRadius) {
                        const angle = Math.atan2(dyCenter, dxCenter);
                        this.vx -= Math.cos(angle) * 0.2;
                        this.vy -= Math.sin(angle) * 0.2;
                    }

                    this.vx *= 0.98;
                    this.vy *= 0.98;
                }
            }

            draw() {
                ctx.fillStyle = `hsla(${hue}, 70%, 60%, 0.8)`;
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fill();
            }
        }

        function init() {
            resize();
            particles = [];
            for (let i = 0; i < particleCount; i++) {
                particles.push(new Particle());
            }
        }

        function animate() {
            ctx.clearRect(0, 0, width, height);
            hue += 0.2;
            if (animState.current.explosionForce > 0) {
                animState.current.explosionForce *= 0.9;
            }
            for (let i = 0; i < particles.length; i++) {
                particles[i].update();
                particles[i].draw();
                if (animState.current.mode === 'normal') {
                    for (let j = i; j < particles.length; j++) {
                        let dx = particles[i].x - particles[j].x;
                        let dy = particles[i].y - particles[j].y;
                        let distance = Math.sqrt(dx * dx + dy * dy);
                        const midX = (particles[i].x + particles[j].x) / 2;
                        const midY = (particles[i].y + particles[j].y) / 2;
                        const distToCenter = Math.sqrt(Math.pow(midX - width / 2, 2) + Math.pow(midY - height / 2, 2));
                        if (distance < connectionDistance && distToCenter > textProtectionRadius - 20) {
                            ctx.beginPath();
                            const gradient = ctx.createLinearGradient(particles[i].x, particles[i].y, particles[j].x, particles[j].y);
                            gradient.addColorStop(0, `hsla(${hue}, 70%, 50%, ${0.4 * (1 - distance / connectionDistance)})`);
                            gradient.addColorStop(1, `hsla(${hue + 40}, 70%, 60%, ${0.4 * (1 - distance / connectionDistance)})`);
                            ctx.strokeStyle = gradient;
                            ctx.lineWidth = 1.0;
                            ctx.moveTo(particles[i].x, particles[i].y);
                            ctx.lineTo(particles[j].x, particles[j].y);
                            ctx.stroke();
                        }
                    }
                }
            }
            animationRef.current = requestAnimationFrame(animate);
        }

        const handleMouseMove = (e) => {
            // For absolute positioning, if container is relative, clientX/Y might need adjustment 
            // but for canvas overlaying the container, we often want coordinates relative to the canvas.
            // Using getBoundingClientRect to be safe.
            const rect = canvas.getBoundingClientRect();
            mouse.x = e.clientX - rect.left;
            mouse.y = e.clientY - rect.top;
        };

        const resizeObserver = new ResizeObserver(() => resize());
        if (canvasRef.current && canvasRef.current.parentElement) {
            resizeObserver.observe(canvasRef.current.parentElement);
        }
        window.addEventListener('resize', resize);
        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('mouseout', () => {
            mouse.x = null;
            mouse.y = null;
        });

        init();
        animate();

        return () => {
            resizeObserver.disconnect();
            window.removeEventListener('resize', resize);
            window.removeEventListener('mousemove', handleMouseMove);
            cancelAnimationFrame(animationRef.current);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="absolute inset-0 z-0 bg-[#0a0a0a] w-full h-full"
            style={{ pointerEvents: 'none' }}
        />
    );
});

NetworkBackground.displayName = 'NetworkBackground';
export default NetworkBackground;
