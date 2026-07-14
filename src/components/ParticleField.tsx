"use client";

import { useEffect, useRef } from "react";

interface Particle {
    x: number;
    y: number;
    vx: number;
    vy: number;
    r: number;
    alpha: number;
    color: string;
    pulse: number;
    pulseSpeed: number;
}

const COLORS = [
    "rgba(167,139,250,",   // primary purple
    "rgba(129,140,248,",   // indigo
    "rgba(196,181,253,",   // light purple
    "rgba(99,102,241,",    // violet
];

export default function ParticleField() {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        const particles: Particle[] = [];
        let animId: number;
        let W = 0, H = 0;

        function resize() {
            const parent = canvas!.parentElement;
            if (!parent) return;
            W = canvas!.width = parent.offsetWidth;
            H = canvas!.height = parent.offsetHeight;
        }

        function spawnParticle(): Particle {
            const color = COLORS[Math.floor(Math.random() * COLORS.length)];
            return {
                x: Math.random() * W,
                y: Math.random() * H,
                vx: (Math.random() - 0.5) * 0.3,
                vy: (Math.random() - 0.5) * 0.3,
                r: Math.random() * 3 + 1,
                alpha: Math.random() * 0.5 + 0.1,
                color,
                pulse: Math.random() * Math.PI * 2,
                pulseSpeed: Math.random() * 0.02 + 0.005,
            };
        }

        resize();
        window.addEventListener("resize", resize);

        for (let i = 0; i < 55; i++) particles.push(spawnParticle());

        function draw() {
            ctx!.clearRect(0, 0, W, H);

            for (const p of particles) {
                p.pulse += p.pulseSpeed;
                const a = p.alpha * (0.6 + 0.4 * Math.sin(p.pulse));

                // Glow
                const grd = ctx!.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r * 4);
                grd.addColorStop(0, `${p.color}${a})`);
                grd.addColorStop(1, `${p.color}0)`);
                ctx!.fillStyle = grd;
                ctx!.beginPath();
                ctx!.arc(p.x, p.y, p.r * 4, 0, Math.PI * 2);
                ctx!.fill();

                // Core
                ctx!.fillStyle = `${p.color}${Math.min(a * 2, 1)})`;
                ctx!.beginPath();
                ctx!.arc(p.x, p.y, p.r, 0, Math.PI * 2);
                ctx!.fill();

                p.x += p.vx;
                p.y += p.vy;

                if (p.x < -20) p.x = W + 20;
                if (p.x > W + 20) p.x = -20;
                if (p.y < -20) p.y = H + 20;
                if (p.y > H + 20) p.y = -20;
            }

            // Draw faint connecting lines between nearby particles
            for (let i = 0; i < particles.length; i++) {
                for (let j = i + 1; j < particles.length; j++) {
                    const dx = particles[i].x - particles[j].x;
                    const dy = particles[i].y - particles[j].y;
                    const dist = Math.sqrt(dx * dx + dy * dy);
                    if (dist < 120) {
                        const alpha = (1 - dist / 120) * 0.08;
                        ctx!.strokeStyle = `rgba(167,139,250,${alpha})`;
                        ctx!.lineWidth = 0.5;
                        ctx!.beginPath();
                        ctx!.moveTo(particles[i].x, particles[i].y);
                        ctx!.lineTo(particles[j].x, particles[j].y);
                        ctx!.stroke();
                    }
                }
            }

            animId = requestAnimationFrame(draw);
        }

        draw();
        return () => {
            window.removeEventListener("resize", resize);
            cancelAnimationFrame(animId);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="absolute inset-0 w-full h-full pointer-events-none"
            aria-hidden
        />
    );
}
