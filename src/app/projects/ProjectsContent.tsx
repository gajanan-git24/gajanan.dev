"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { GithubIcon, ExternalLinkIcon } from "@/components/Icons";

export interface GitHubRepo {
    id: number;
    name: string;
    full_name: string;
    html_url: string;
    description: string | null;
    homepage: string | null;
    language: string | null;
    stargazers_count: number;
    forks_count: number;
    pushed_at: string;
    topics: string[];
}

const LANGUAGE_COLORS: Record<string, { dot: string; badge: string }> = {
    TypeScript: { dot: "bg-cyan-400", badge: "text-cyan-400 border-cyan-400/30 bg-cyan-400/10" },
    JavaScript: { dot: "bg-yellow-400", badge: "text-yellow-400 border-yellow-400/30 bg-yellow-400/10" },
    Python: { dot: "bg-blue-400", badge: "text-blue-400 border-blue-400/30 bg-blue-400/10" },
    HTML: { dot: "bg-orange-400", badge: "text-orange-400 border-orange-400/30 bg-orange-400/10" },
    CSS: { dot: "bg-pink-400", badge: "text-pink-400 border-pink-400/30 bg-pink-400/10" },
};

function timeAgo(dateStr: string): string {
    const diff = Math.floor((Date.now() - new Date(dateStr).getTime()) / 1000);
    if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
    if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
    if (diff < 2592000) return `${Math.floor(diff / 86400)}d ago`;
    if (diff < 31536000) return `${Math.floor(diff / 2592000)}mo ago`;
    return `${Math.floor(diff / 31536000)}y ago`;
}

function RepoCard({ repo, index }: { repo: GitHubRepo; index: number }) {
    const lang = repo.language ?? "Other";
    const colors = LANGUAGE_COLORS[lang];

    return (
        <motion.article
            layout
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.4, delay: index * 0.05, ease: "easeOut" }}
            className="card-surface glass flex flex-col gap-5 p-7 group relative overflow-hidden"
        >
            {/* Ambient glow on hover */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

            {/* Top row */}
            <div className="flex items-start justify-between gap-3">
                <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0 group-hover:bg-primary/20 transition-colors">
                    <GithubIcon className="w-5 h-5 text-primary" />
                </div>
                {colors && (
                    <span className={`inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-widest border rounded-full px-2.5 py-1 ${colors.badge}`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${colors.dot}`} />
                        {lang}
                    </span>
                )}
            </div>

            {/* Name + Description */}
            <div className="flex flex-col gap-2 flex-grow">
                <h3 className="text-lg font-bold leading-tight group-hover:text-primary transition-colors line-clamp-2">
                    {repo.name.replace(/-/g, " ").replace(/_/g, " ")}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3">
                    {repo.description ?? "No description provided."}
                </p>
            </div>

            {/* Stats */}
            <div className="flex items-center gap-4 text-xs text-muted-foreground/70 font-mono border-t border-border/40 pt-4">
                <span className="flex items-center gap-1">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" /></svg>
                    {repo.stargazers_count}
                </span>
                <span className="flex items-center gap-1">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="18" r="3" /><circle cx="6" cy="6" r="3" /><circle cx="18" cy="6" r="3" /><path d="M18 9v1a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2V9" /><path d="M12 12v3" /></svg>
                    {repo.forks_count}
                </span>
                <span className="ml-auto text-[10px]">Updated {timeAgo(repo.pushed_at)}</span>
            </div>

            {/* Action buttons */}
            <div className="flex gap-2">
                <a
                    href={repo.html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 inline-flex items-center justify-center gap-1.5 px-4 py-2 text-xs font-semibold rounded-lg border border-border hover:bg-muted/60 hover:border-primary/40 transition-all"
                >
                    <GithubIcon className="w-3.5 h-3.5" />
                    Source
                </a>
                {repo.homepage && (
                    <a
                        href={repo.homepage}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 inline-flex items-center justify-center gap-1.5 px-4 py-2 text-xs font-semibold rounded-lg bg-primary text-primary-foreground hover:opacity-90 transition-all"
                    >
                        <ExternalLinkIcon className="w-3.5 h-3.5" />
                        Live Demo
                    </a>
                )}
            </div>
        </motion.article>
    );
}

const FILTERS = ["All", "Python", "JavaScript", "TypeScript", "HTML"] as const;
type Filter = typeof FILTERS[number];

export default function ProjectsContent({ repos }: { repos: GitHubRepo[] }) {
    const [active, setActive] = useState<Filter>("All");

    const filtered = active === "All" ? repos : repos.filter(r => r.language === active);

    return (
        <div className="flex flex-col gap-16 pt-16 pb-20">
            {/* Header */}
            <motion.header
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="relative flex flex-col gap-6 overflow-hidden"
            >
                <div
                    className="glow-orb w-72 h-72 -top-24 right-0 opacity-20 pointer-events-none"
                    style={{ background: "radial-gradient(circle, rgba(167, 139, 250, 0.4) 0%, transparent 70%)" }}
                />
                <span className="text-sm uppercase tracking-[0.2em] text-primary font-bold">Open Source</span>
                <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight gradient-text pb-2">
                    My Projects
                </h1>
                <p className="text-xl text-muted-foreground/90 max-w-2xl leading-relaxed">
                    A live showcase of my GitHub repositories — from AI security systems to full-stack web apps. All fetched directly from GitHub.
                </p>

                {/* GitHub profile link */}
                <a
                    href="https://github.com/gajanan-git24"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="self-start inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors font-medium"
                >
                    <GithubIcon className="w-4 h-4" />
                    github.com/gajanan-git24
                    <ExternalLinkIcon className="w-3 h-3 opacity-60" />
                </a>
            </motion.header>

            {/* Filter Tabs */}
            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.15 }}
                className="flex flex-wrap gap-2"
            >
                {FILTERS.map((f) => {
                    const count = f === "All" ? repos.length : repos.filter(r => r.language === f).length;
                    if (count === 0 && f !== "All") return null;
                    return (
                        <button
                            key={f}
                            onClick={() => setActive(f)}
                            className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold border transition-all duration-200 ${active === f
                                    ? "bg-primary text-primary-foreground border-primary shadow-[0_0_20px_rgba(167,139,250,0.3)]"
                                    : "border-border text-muted-foreground hover:border-primary/40 hover:text-foreground"
                                }`}
                        >
                            {f}
                            <span className={`text-xs px-1.5 py-0.5 rounded-full font-mono ${active === f ? "bg-white/20" : "bg-muted text-muted-foreground"}`}>
                                {count}
                            </span>
                        </button>
                    );
                })}
            </motion.div>

            {/* Projects Grid */}
            <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                <AnimatePresence mode="popLayout">
                    {filtered.map((repo, i) => (
                        <RepoCard key={repo.id} repo={repo} index={i} />
                    ))}
                </AnimatePresence>
            </motion.div>

            {filtered.length === 0 && (
                <div className="text-center py-20 text-muted-foreground">
                    No projects found for this filter.
                </div>
            )}
        </div>
    );
}
