import portfolioData from "@/data/portfolio.json";
import Link from "next/link";
import { ArrowRightIcon, ExternalLinkIcon, GithubIcon } from "@/components/Icons";
import ParticleField from "@/components/ParticleField";

export default function Home() {
  const { profile, projects } = portfolioData;

  return (
    <div className="flex flex-col gap-32">

      {/* ── Hero ──────────────────────────────────────────── */}
      <section className="relative flex flex-col gap-8 pt-12 md:pt-20 animate-fade-in overflow-hidden" style={{ minHeight: "60vh" }}>
        <ParticleField />

        {/* Ambient glow orbs */}
        <div
          className="glow-orb w-96 h-96 -top-32 -left-32 opacity-20"
          style={{ background: "radial-gradient(circle, #a78bfa 0%, transparent 70%)" }}
        />
        <div
          className="glow-orb w-64 h-64 top-0 right-0 opacity-10"
          style={{ background: "radial-gradient(circle, #818cf8 0%, transparent 70%)" }}
        />

        {/* Available badge */}
        <div className="inline-flex items-center w-fit gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-medium">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          Available for new projects
        </div>

        {/* Headline */}
        <h1 className="font-syne text-5xl md:text-7xl font-bold tracking-tighter max-w-4xl leading-[1.05]">
          Building digital{" "}
          <span className="gradient-text">products</span>
          {", "}
          brands, and experiences.
        </h1>

        {/* Bio */}
        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl leading-relaxed">
          Hi, I&apos;m{" "}
          <span className="text-foreground font-medium">{profile.name}</span>, a{" "}
          {profile.title} based {profile.location} — {profile.bio}
        </p>

        {/* CTA buttons */}
        <div className="flex flex-wrap gap-3 mt-2">
          <Link
            href="/projects"
            id="hero-cta-projects"
            className="group inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground text-sm font-semibold rounded-lg hover:opacity-90 transition-all duration-150 btn-blade-click"
          >
            View My Work
            <ArrowRightIcon className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          </Link>
          <Link
            href="/resume"
            id="hero-cta-resume"
            className="inline-flex items-center gap-2 px-6 py-3 bg-surface text-foreground text-sm font-semibold rounded-lg border border-border hover:border-border/80 transition-all duration-150 btn-neon-click"
          >
            Resume &amp; Contact
          </Link>
        </div>

        {/* Stats row */}
        <div className="flex flex-wrap gap-8 pt-6 mt-2 border-t border-border/60">
          {[
            { label: "GitHub Repositories", value: "10+" },
            { label: "Projects Shipped", value: "5+" },
            { label: "Certifications", value: "2" },
          ].map(({ label, value }) => (
            <div key={label} className="flex flex-col gap-0.5">
              <span className="text-2xl font-bold text-foreground">{value}</span>
              <span className="text-xs text-muted-foreground">{label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ── Featured Projects ──────────────────────────────── */}
      <section className="flex flex-col gap-10">
        <div className="flex items-end justify-between">
          <div className="flex flex-col gap-1">
            <span className="text-xs uppercase tracking-widest text-primary font-semibold">
              Selected Work
            </span>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight">Featured Projects</h2>
          </div>
          <Link
            href="/projects"
            id="featured-view-all"
            className="hidden sm:inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors group"
          >
            View All
            <ArrowRightIcon className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {projects.slice(0, 2).map((project, i) => (
            <Link
              key={project.id}
              href="/projects"
              id={`featured-project-${project.id}`}
              className="group card-surface flex flex-col overflow-hidden"
              style={{ animationDelay: `${i * 0.1}s` }}
            >
              {/* Image */}
              <div className="aspect-[16/9] overflow-hidden bg-muted relative">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span className="px-4 py-2 bg-primary text-primary-foreground text-xs font-semibold tracking-widest uppercase rounded-md">
                    View Case Study
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="flex flex-col gap-3 p-5">
                <div className="flex flex-wrap gap-1.5">
                  {project.techStack.slice(0, 4).map((tech) => (
                    <span key={tech} className="tag-pill">{tech}</span>
                  ))}
                </div>
                <h3 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors duration-200">
                  {project.title}
                </h3>
                <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed">
                  {project.description}
                </p>
                <div className="flex items-center gap-3 pt-2 mt-auto">
                  <span className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors">
                    <ExternalLinkIcon className="w-3.5 h-3.5" />
                    Live Demo
                  </span>
                  <span className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors">
                    <GithubIcon className="w-3.5 h-3.5" />
                    Source
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Mobile view all */}
        <Link
          href="/projects"
          className="sm:hidden inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors group self-center"
        >
          View All Projects
          <ArrowRightIcon className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
        </Link>
      </section>

      {/* ── Quick Skills ───────────────────────────────────── */}
      <section className="relative flex flex-col gap-8 py-16 overflow-hidden">
        <div
          className="glow-orb w-80 h-80 -bottom-20 right-0 opacity-10"
          style={{ background: "radial-gradient(circle, #a78bfa 0%, transparent 70%)" }}
        />
        <span className="text-xs uppercase tracking-widest text-primary font-semibold">
          Tech Stack
        </span>
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight max-w-xl">
          The tools I use to build great products
        </h2>
        <div className="flex flex-wrap gap-2 max-w-3xl">
          {[
            "Python", "FastAPI", "React", "JavaScript", "HTML", "CSS",
            "OpenCV", "MySQL", "Git", "Docker", "C", "C++",
          ].map((skill) => (
            <span key={skill} className="tag-pill cursor-default">{skill}</span>
          ))}
        </div>
        <Link
          href="/resume"
          id="skills-cta"
          className="inline-flex items-center gap-2 text-sm text-primary hover:underline decoration-primary/50 underline-offset-4 font-medium w-fit"
        >
          See full resume <ArrowRightIcon className="w-4 h-4" />
        </Link>
      </section>

    </div>
  );
}
