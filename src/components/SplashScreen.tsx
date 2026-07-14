"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function SplashScreen() {
    const [visible, setVisible] = useState(true);
    const [phase, setPhase] = useState<"scan" | "name" | "burst" | "exit">("scan");

    useEffect(() => {
        // Skip if already seen this session
        if (sessionStorage.getItem("splash_seen")) {
            setVisible(false);
            return;
        }
        const t1 = setTimeout(() => setPhase("name"), 500);
        const t2 = setTimeout(() => setPhase("burst"), 1600);
        const t3 = setTimeout(() => setPhase("exit"), 2200);
        const t4 = setTimeout(() => {
            setVisible(false);
            sessionStorage.setItem("splash_seen", "1");
        }, 2900);
        return () => [t1, t2, t3, t4].forEach(clearTimeout);
    }, []);

    return (
        <AnimatePresence>
            {visible && (
                <motion.div
                    key="splash"
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.6, ease: "easeInOut" }}
                    className="fixed inset-0 z-[9999] flex items-center justify-center overflow-hidden"
                    style={{ background: "#070709" }}
                >
                    {/* Speed lines */}
                    <AnimatePresence>
                        {phase === "burst" && (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.5 }}
                                animate={{ opacity: [0, 1, 0], scale: [0.5, 3, 4] }}
                                transition={{ duration: 0.5 }}
                                className="absolute inset-0 pointer-events-none"
                                style={{
                                    background: "conic-gradient(from 0deg, transparent 0deg, rgba(167,139,250,0.15) 2deg, transparent 4deg, transparent 24deg, rgba(167,139,250,0.12) 26deg, transparent 28deg, transparent 60deg, rgba(129,140,248,0.1) 62deg, transparent 64deg, transparent 90deg, rgba(167,139,250,0.18) 92deg, transparent 94deg, transparent 120deg, rgba(167,139,250,0.1) 122deg, transparent 124deg, transparent 180deg, rgba(167,139,250,0.15) 182deg, transparent 184deg, transparent 240deg, rgba(129,140,248,0.12) 242deg, transparent 244deg, transparent 300deg, rgba(167,139,250,0.1) 302deg, transparent 304deg, transparent 360deg)",
                                }}
                            />
                        )}
                    </AnimatePresence>

                    {/* Center glow burst */}
                    <AnimatePresence>
                        {phase === "burst" && (
                            <motion.div
                                initial={{ opacity: 0, scale: 0 }}
                                animate={{ opacity: [0, 0.8, 0], scale: [0, 2.5, 5] }}
                                transition={{ duration: 0.55 }}
                                className="absolute w-96 h-96 rounded-full pointer-events-none"
                                style={{ background: "radial-gradient(circle, rgba(167,139,250,0.6) 0%, rgba(129,140,248,0.3) 40%, transparent 70%)" }}
                            />
                        )}
                    </AnimatePresence>

                    {/* Scan line */}
                    <AnimatePresence>
                        {phase === "scan" && (
                            <motion.div
                                initial={{ top: "-4px", opacity: 1 }}
                                animate={{ top: "105%" }}
                                transition={{ duration: 0.45, ease: "linear" }}
                                className="absolute left-0 right-0 h-[2px] pointer-events-none"
                                style={{
                                    background: "linear-gradient(90deg, transparent 0%, rgba(167,139,250,0.8) 30%, rgba(255,255,255,0.9) 50%, rgba(167,139,250,0.8) 70%, transparent 100%)",
                                    boxShadow: "0 0 20px rgba(167,139,250,0.8), 0 0 40px rgba(167,139,250,0.4)",
                                }}
                            />
                        )}
                    </AnimatePresence>

                    {/* Main Name Display */}
                    <div className="relative flex flex-col items-center gap-3 select-none">
                        <AnimatePresence>
                            {(phase === "name" || phase === "burst" || phase === "exit") && (
                                <>
                                    {/* Glitch name */}
                                    <motion.div
                                        initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
                                        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                                        transition={{ duration: 0.4, ease: "easeOut" }}
                                        className="relative"
                                    >
                                        <span
                                            className="text-6xl md:text-8xl font-black tracking-tighter text-white"
                                            style={{ fontFamily: "var(--font-inter)", letterSpacing: "-0.04em" }}
                                        >
                                            GAJANAN
                                        </span>
                                        {/* Glitch layers */}
                                        <motion.span
                                            animate={{ x: [-2, 2, -1, 1, 0], opacity: [0.8, 0, 0.8, 0, 0] }}
                                            transition={{ duration: 0.4, delay: 0.2, times: [0, 0.25, 0.5, 0.75, 1] }}
                                            className="absolute inset-0 text-6xl md:text-8xl font-black tracking-tighter"
                                            style={{ color: "#a78bfa", mixBlendMode: "screen", letterSpacing: "-0.04em", clipPath: "inset(20% 0 40% 0)" }}
                                            aria-hidden
                                        >
                                            GAJANAN
                                        </motion.span>
                                        <motion.span
                                            animate={{ x: [2, -2, 1, -1, 0], opacity: [0.8, 0, 0.8, 0, 0] }}
                                            transition={{ duration: 0.4, delay: 0.3, times: [0, 0.25, 0.5, 0.75, 1] }}
                                            className="absolute inset-0 text-6xl md:text-8xl font-black tracking-tighter"
                                            style={{ color: "#818cf8", mixBlendMode: "screen", letterSpacing: "-0.04em", clipPath: "inset(60% 0 10% 0)" }}
                                            aria-hidden
                                        >
                                            GAJANAN
                                        </motion.span>
                                    </motion.div>

                                    <motion.div
                                        initial={{ opacity: 0, scaleX: 0 }}
                                        animate={{ opacity: 1, scaleX: 1 }}
                                        transition={{ duration: 0.5, delay: 0.3 }}
                                        className="w-full h-px"
                                        style={{ background: "linear-gradient(90deg, transparent, #a78bfa, #818cf8, transparent)" }}
                                    />

                                    <motion.p
                                        initial={{ opacity: 0, letterSpacing: "0.5em" }}
                                        animate={{ opacity: 1, letterSpacing: "0.25em" }}
                                        transition={{ duration: 0.5, delay: 0.4 }}
                                        className="text-xs md:text-sm font-bold uppercase"
                                        style={{ color: "#a78bfa" }}
                                    >
                                        Full-Stack Developer · CS Student
                                    </motion.p>
                                </>
                            )}
                        </AnimatePresence>
                    </div>

                    {/* Corner decorations */}
                    {["top-4 left-4", "top-4 right-4", "bottom-4 left-4", "bottom-4 right-4"].map((pos, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, scale: 0 }}
                            animate={{ opacity: phase === "scan" ? 0 : 0.6, scale: 1 }}
                            transition={{ delay: 0.5 + i * 0.05 }}
                            className={`absolute ${pos} w-8 h-8 border-primary pointer-events-none`}
                            style={{
                                borderWidth: "2px 0 0 2px",
                                borderColor: "#a78bfa",
                                ...(i === 1 || i === 3 ? { transform: "scaleX(-1)" } : {}),
                                ...(i === 2 || i === 3 ? { transform: `scaleY(-1)${i === 3 ? " scaleX(-1)" : ""}` } : {}),
                            }}
                        />
                    ))}

                    {/* Bottom loading bar */}
                    <div className="absolute bottom-12 left-1/2 -translate-x-1/2 w-48 h-px bg-border/30 overflow-hidden rounded-full">
                        <motion.div
                            initial={{ width: "0%" }}
                            animate={{ width: "100%" }}
                            transition={{ duration: 2.0, ease: "easeInOut" }}
                            className="h-full rounded-full"
                            style={{ background: "linear-gradient(90deg, #a78bfa, #818cf8)" }}
                        />
                    </div>
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 0.5 }}
                        transition={{ delay: 0.3 }}
                        className="absolute bottom-6 left-1/2 -translate-x-1/2 text-[10px] font-mono tracking-[0.3em] uppercase"
                        style={{ color: "#71717a" }}
                    >
                        Initializing...
                    </motion.p>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
