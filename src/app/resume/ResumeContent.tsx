"use client";

import { motion } from "framer-motion";
import ContactForm from "@/components/ContactForm";

const categoryLabel: Record<string, string> = {
    frontend: "Frontend",
    backend: "Backend",
    database: "Database",
    devops: "DevOps & Tools",
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
            detail?: string;
        }>;
        skills: Record<string, string[]>;
        certifications: Array<{
            title: string;
            issuer: string;
            year: string;
        }>;
        achievements: string[];
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
                {/* ── Left (8/12): Experience + Education + Certifications ── */}
                <div className="lg:col-span-8 flex flex-col gap-24">

                    {/* Experience */}
                    <motion.section variants={itemVariants} aria-labelledby="experience-heading" className="flex flex-col gap-12">
                        <div className="flex items-center gap-4 lg:mb-4">
                            <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center border border-primary/20">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary"><path d="M12 12h.01" /><path d="M16 6V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" /><path d="M22 13a18.15 18.15 0 0 1-20 0" /><rect width="20" height="14" x="2" y="6" rx="2" /></svg>
                            </div>
                            <h2 id="experience-heading" className="text-3xl font-extrabold tracking-tight">Experience</h2>
                        </div>

                        <div className="relative">
                            {/* Glowing Timeline Line */}
                            <div className="absolute left-[178px] top-6 bottom-6 w-px bg-gradient-to-b from-primary/60 via-primary/20 to-transparent hidden md:block" />

                            <div className="flex flex-col gap-16">
                                {resume.timeline.map((item) => (
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

                        <div className="flex flex-col gap-8">
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
                                            <h4 className="text-sm font-semibold text-primary/80 uppercase tracking-widest mb-3">{item.institution}</h4>
                                            {item.detail && (
                                                <span className="inline-flex items-center gap-1.5 text-sm font-mono bg-primary/10 text-primary border border-primary/20 rounded-full px-3 py-1">
                                                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg>
                                                    {item.detail}
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </motion.section>

                    {/* Certifications */}
                    <motion.section variants={itemVariants} aria-labelledby="certs-heading" className="flex flex-col gap-12">
                        <div className="flex items-center gap-4 lg:mb-4">
                            <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center border border-primary/20">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary"><circle cx="12" cy="8" r="6" /><path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11" /></svg>
                            </div>
                            <h2 id="certs-heading" className="text-3xl font-extrabold tracking-tight">Certifications</h2>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {resume.certifications.map((cert, i) => (
                                <motion.div variants={itemVariants} key={i} className="card-surface glass p-6 flex flex-col gap-2 group">
                                    <div className="flex items-start justify-between gap-2">
                                        <h3 className="text-base font-bold text-foreground group-hover:text-primary transition-colors leading-tight">{cert.title}</h3>
                                        <span className="text-xs font-mono text-primary bg-primary/10 border border-primary/20 rounded-full px-2 py-0.5 shrink-0">{cert.year}</span>
                                    </div>
                                    <p className="text-sm text-muted-foreground font-medium">{cert.issuer}</p>
                                </motion.div>
                            ))}
                        </div>
                    </motion.section>

                </div>

                {/* ── Right (4/12): Skills + Achievements + Contact ─── */}
                <div className="lg:col-span-4 flex flex-col gap-12 lg:sticky lg:top-32">

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

                    {/* Achievements & Activities */}
                    <motion.section variants={itemVariants} aria-labelledby="achievements-heading" className="card-surface glass p-8 flex flex-col gap-6">
                        <div className="flex items-center gap-3 border-b border-border/40 pb-4">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-primary"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
                            <h2 id="achievements-heading" className="text-xl font-bold tracking-tight">Achievements</h2>
                        </div>

                        <ul className="flex flex-col gap-3">
                            {resume.achievements.map((item, i) => (
                                <li key={i} className="flex items-start gap-3 text-sm text-muted-foreground leading-relaxed">
                                    <span className="text-primary mt-1 shrink-0 opacity-80">
                                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                                    </span>
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </motion.section>

                    {/* Contact Form Card */}
                    <motion.section variants={itemVariants} aria-labelledby="contact-heading" className="card-surface glass p-8 flex flex-col gap-8 relative overflow-hidden group">
                        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                        <div>
                            <h2 id="contact-heading" className="text-2xl font-bold mb-3">Get in touch</h2>
                            <p className="text-[15px] text-muted-foreground/80 leading-relaxed mb-6">
                                Have an exciting project in mind? Let&apos;s collaborate. I usually reply within 24 hours.
                            </p>

                            <a
                                href="https://wa.me/918105292843"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center justify-center gap-2 w-full py-3 mb-2 rounded-lg font-semibold text-sm transition-all duration-150 btn-neon-click"
                                style={{ backgroundColor: "#25D366", color: "#ffffff" }}
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" /></svg>
                                Message on WhatsApp
                            </a>
                        </div>
                        <div className="mt-2 text-center text-xs text-muted-foreground/50">Or shoot an email below</div>
                        <ContactForm />
                    </motion.section>

                </div>
            </div>
        </motion.div>
    );
}
