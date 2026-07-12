import type { Metadata } from "next";
import portfolioData from "@/data/portfolio.json";
import { ExternalLinkIcon, GithubIcon } from "@/components/Icons";

export const metadata: Metadata = {
    title: "Projects",
    description:
        "A curated showcase of my recent work — scalable, user-centric, and high-performance applications.",
};

export default function ProjectsPage() {
    const { projects } = portfolioData;

    return (
        <div className="flex flex-col gap-16 pt-12 animate-fade-in">

            {/* Header */}
            <header className="relative flex flex-col gap-4 overflow-hidden">
                <div
                    className="glow-orb w-72 h-72 -top-24 right-0 opacity-15"
                    style={{ background: "radial-gradient(circle, #a78bfa 0%, transparent 70%)" }}
                />
                <span className="text-xs uppercase tracking-widest text-primary font-semibold">
                    Portfolio
                </span>
                <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
                    Projects
                </h1>
                <p className="text-lg text-muted-foreground max-w-2xl leading-relaxed">
                    A selection of projects that showcase my expertise in building scalable,
                    user-centric, and high-performance applications.
                </p>
            </header>

            {/* Project List */}
            <div className="flex flex-col gap-24">
                {projects.map((project, index) => (
                    <article
                        key={project.id}
                        id={`project-${project.id}`}
                        className="grid md:grid-cols-2 gap-8 md:gap-16 items-center"
                    >
                        {/* Image */}
                        <div
                            className={`group aspect-[4/3] rounded-xl overflow-hidden bg-muted border border-border/60 relative ${index % 2 === 1 ? "md:order-2" : ""
                                }`}
                        >
                            <img
                                src={project.image}
                                alt={project.title}
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                            />
                            {/* Gradient overlay */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                            {/* Index badge */}
                            <div className="absolute top-4 left-4 px-2.5 py-1 rounded-md bg-black/50 backdrop-blur-sm border border-white/10 text-xs font-mono text-white/80">
                                {String(index + 1).padStart(2, "0")}
                            </div>
                        </div>

                        {/* Content */}
                        <div className="flex flex-col gap-5">
                            <div className="flex flex-col gap-2">
                                <span className="text-xs uppercase tracking-widest text-primary font-semibold">
                                    Case Study
                                </span>
                                <h2 className="text-2xl md:text-3xl font-bold leading-tight">
                                    {project.title}
                                </h2>
                            </div>

                            <div className="flex flex-wrap gap-1.5">
                                {project.techStack.map((tech) => (
                                    <span key={tech} className="tag-pill">{tech}</span>
                                ))}
                            </div>

                            <p className="text-muted-foreground leading-relaxed">
                                {project.description}
                            </p>

                            <div className="flex flex-wrap gap-3 mt-1">
                                <a
                                    id={`project-${project.id}-live`}
                                    href={project.liveLink}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-2 px-5 py-2.5 bg-primary text-primary-foreground text-sm font-semibold rounded-lg hover:opacity-90 active:scale-[0.98] transition-all duration-150"
                                >
                                    Live Demo <ExternalLinkIcon className="w-3.5 h-3.5" />
                                </a>
                                <a
                                    id={`project-${project.id}-source`}
                                    href={project.githubLink}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-2 px-5 py-2.5 bg-surface text-foreground text-sm font-semibold rounded-lg border border-border hover:bg-muted/60 active:scale-[0.98] transition-all duration-150"
                                >
                                    Source <GithubIcon className="w-3.5 h-3.5" />
                                </a>
                            </div>
                        </div>
                    </article>
                ))}
            </div>
        </div>
    );
}
