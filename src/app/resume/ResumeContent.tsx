"use client";

import { motion } from "framer-motion";
import ContactForm from "@/components/ContactForm";

const categoryLabel: Record<string, string> = {
    frontend: "Frontend",
    backend: "Backend",
    database: "Database",
    devops: "DevOps & Cloud",
};

interface ResumeContentProps {
    resume: {
        timeline: Array<{
            id: string;
            role: string;
            company: string;
            period: string;
            achievements: string[];
        }>;
        education: Array<{
            degree: string;
            institution: string;
            period: string;
        }>;
        skills: Record<string, string[]>;
    }
}

export default function ResumeContent({ resume }: ResumeContentProps) {
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.1 }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" as const } }
    };

    return (
        <motion.div
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            className="flex flex-col gap-24 pt-16 pb-20 relative"
        >
            {/* Header */}
            <motion.header variants={itemVariants} className="relative flex flex-col gap-6 overflow-hidden">
                <div
                    className="glow-orb w-72 h-72 -top-20 right-0 opacity-20 pointer-events-none"
                    style={{ background: "radial-gradient(circle, rgba(167, 139, 250, 0.4) 0%, transparent 70%)" }}
                />
                <span className="text-sm uppercase tracking-[0.2em] text-primary font-bold">
                    Background
                </span>
                <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight gradient-text pb-2">
                    Resume &amp; Contact
                </h1>
                <p className="text-xl text-muted-foreground/90 max-w-2xl leading-relaxed">
                    My professional journey so far. I&apos;m always open to discussing new
                    opportunities, technical challenges, and cutting-edge projects.
                </p>
            </motion.header>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-12 items-start relative z-10">
                {/* ── Left (8/12): Experience + Education ──────────── */}
                <div className="lg:col-span-8 flex flex-col gap-24">

                    {/* Experience */}
                    <motion.section variants={itemVariants} aria-labelledby="experience-heading" className="flex flex-col gap-12">
                        <div className="flex items-center gap-4 lg:mb-4">
                            <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center border border-primary/20">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary"><path d="M12 12h.01" /><path d="M16 6V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" /><path d="M22 13a18.15 18.15 0 0 1-20 0" /><rect width="20" height="14" x="2" y="6" rx="2" /></svg>
                            </div>
                            <h2 id="experience-heading" className="text-3xl font-extrabold tracking-tight">Experience</h2>
                        </div>

                        <div className="relative md:pl-0">
                            {/* Glowing Timeline Line */}
                            <div className="absolute left-[88px] md:left-[178px] top-6 bottom-6 w-px bg-gradient-to-b from-primary/60 via-primary/20 to-transparent hidden md:block" />

                            <div className="flex flex-col gap-16">
                                {resume.timeline.map((item, index) => (
                                    <motion.div
                                        key={item.id}
                                        variants={itemVariants}
                                        className="flex flex-col md:flex-row gap-6 md:gap-12 group relative"
                                    >
                                        <div className="md:w-36 shrink-0 mt-1 md:text-right hidden md:block">
                                            <span className="text-sm font-mono text-muted-foreground/80 font-medium tracking-wider group-hover:text-primary transition-colors">
                                                {item.period}
                                            </span>
                                        </div>

                                        <div className="relative flex flex-col gap-5 card-surface p-8 glass flex-grow">
                                            {/* Timeline Node */}
                                            <div className="absolute -left-7 top-8 w-[14px] h-[14px] rounded-full bg-background border-[3px] border-primary hidden md:block shadow-[0_0_15px_rgba(167,139,250,0.6)] group-hover:scale-125 transition-transform" />

                                            <div className="md:hidden">
                                                <span className="text-sm font-mono text-primary font-medium tracking-wider">
                                                    {item.period}
                                                </span>
                                            </div>

                                            <div>
                                                <h3 className="text-xl lg:text-2xl font-bold text-foreground tracking-tight leading-tight mb-2 group-hover:text-primary transition-colors">
                                                    {item.role}
                                                </h3>
                                                <h4 className="text-sm lg:text-base font-semibold text-primary/90">{item.company}</h4>
                                            </div>

                                            <ul className="flex flex-col gap-3 mt-1">
                                                {item.achievements.map((ach, i) => (
                                                    <li key={i} className="flex items-start gap-3 text-muted-foreground leading-relaxed">
                                                        <span className="text-primary mt-1.5 shrink-0 opacity-80">
                                                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                                                        </span>
                                                        <span className="text-[15px] leading-[1.65]">{ach}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    </motion.section>

                    {/* Education */}
                    <motion.section variants={itemVariants} aria-labelledby="education-heading" className="flex flex-col gap-12">
                        <div className="flex items-center gap-4 lg:mb-4">
                            <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center border border-primary/20">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary"><path d="M22 10v6M2 10l10-5 10 5-10 5z" /><path d="M6 12v5c3 3 9 3 12 0v-5" /></svg>
                            </div>
                            <h2 id="education-heading" className="text-3xl font-extrabold tracking-tight">Education</h2>
                        </div>

                        <div className="relative md:pl-0">
                            <div className="flex flex-col gap-12">
                                {resume.education.map((item, index) => (
                                    <motion.div variants={itemVariants} key={index} className="flex flex-col md:flex-row gap-6 md:gap-12 group">
                                        <div className="md:w-36 shrink-0 mt-1 md:text-right hidden md:block">
                                            <span className="text-sm font-mono text-muted-foreground/80 font-medium tracking-wider group-hover:text-primary transition-colors">
                                                {item.period}
                                            </span>
                                        </div>
                                        <div className="flex flex-col gap-3 card-surface glass p-8 flex-grow">
                                            <div className="md:hidden">
                                                <span className="text-sm font-mono text-primary font-medium tracking-wider">
                                                    {item.period}
                                                </span>
                                            </div>
                                            <div>
                                                <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors mb-1.5">{item.degree}</h3>
                                                <h4 className="text-sm font-semibold text-primary/80 uppercase tracking-widest">{item.institution}</h4>
                                            </div>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    </motion.section>

                </div>

                {/* ── Right (4/12): Skills + Contact ───────────────── */}
                <div className="lg:col-span-4 flex flex-col gap-16 lg:sticky lg:top-32">

                    {/* Skills Matrix */}
                    <motion.section variants={itemVariants} aria-labelledby="skills-heading" className="card-surface glass p-8 flex flex-col gap-8">
                        <div className="flex items-center gap-3 border-b border-border/40 pb-4">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-primary"><polyline points="16 18 22 12 16 6"></polyline><polyline points="8 6 2 12 8 18"></polyline></svg>
                            <h2 id="skills-heading" className="text-xl font-bold tracking-tight">Skills Matrix</h2>
                        </div>

                        <div className="flex flex-col gap-8">
                            {Object.entries(resume.skills).map(([category, skills]) => (
                                <div key={category} className="flex flex-col gap-4">
                                    <h3 className="text-[11px] uppercase tracking-[0.2em] font-bold text-muted-foreground/70">
                                        {categoryLabel[category] ?? category}
                                    </h3>
                                    <div className="flex flex-wrap gap-2.5">
                                        {skills.map((skill) => (
                                            <span key={skill} className="tag-pill cursor-default hover:border-primary/50 text-[13px] py-1.5 px-3">
                                                {skill}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </motion.section>

                    {/* Contact Form Card */}
                    <motion.section variants={itemVariants} aria-labelledby="contact-heading" className="card-surface glass p-8 flex flex-col gap-8 relative overflow-hidden group">
                        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                        <div>
                            <h2 id="contact-heading" className="text-2xl font-bold mb-3">Get in touch</h2>
                            <p className="text-[15px] text-muted-foreground/80 leading-relaxed">
                                Have an exciting project in mind? Let&apos;s build something exceptional together. I usually reply within 24 hours.
                            </p>
                        </div>
                        <ContactForm />
                    </motion.section>

                </div>
            </div>
        </motion.div>
    );
}
