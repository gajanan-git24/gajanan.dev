import type { Metadata } from "next";
import portfolioData from "@/data/portfolio.json";
import ContactForm from "@/components/ContactForm";

export const metadata: Metadata = {
    title: "Resume & Contact",
    description: "My professional experience, skills, and a direct way to get in touch.",
};

const categoryLabel: Record<string, string> = {
    frontend: "Frontend",
    backend: "Backend",
    database: "Database",
    devops: "DevOps & Cloud",
};

export default function ResumePage() {
    const { resume } = portfolioData;

    return (
        <div className="flex flex-col gap-20 pt-12 animate-fade-in">

            {/* Header */}
            <header className="relative flex flex-col gap-4 overflow-hidden">
                <div
                    className="glow-orb w-64 h-64 -top-16 right-0 opacity-12"
                    style={{ background: "radial-gradient(circle, #818cf8 0%, transparent 70%)" }}
                />
                <span className="text-xs uppercase tracking-widest text-primary font-semibold">
                    Background
                </span>
                <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
                    Resume &amp; Contact
                </h1>
                <p className="text-lg text-muted-foreground max-w-2xl leading-relaxed">
                    My professional journey so far. I&apos;m always open to discussing new
                    opportunities and interesting projects.
                </p>
            </header>

            <div className="grid lg:grid-cols-3 gap-16 lg:gap-12 items-start">

                {/* ── Left (2/3): Experience + Education ──────────── */}
                <div className="lg:col-span-2 flex flex-col gap-20">

                    {/* Experience */}
                    <section aria-labelledby="experience-heading" className="flex flex-col gap-10">
                        <h2
                            id="experience-heading"
                            className="text-2xl font-bold pb-4 border-b border-border/60"
                        >
                            Experience
                        </h2>
                        <div className="flex flex-col gap-12">
                            {resume.timeline.map((item) => (
                                <div key={item.id} className="flex flex-col md:flex-row gap-4 md:gap-10">
                                    <div className="md:w-48 shrink-0">
                                        <span className="text-xs font-mono text-muted-foreground tracking-wider">
                                            {item.period}
                                        </span>
                                    </div>
                                    <div className="flex flex-col gap-1.5 relative pl-5 md:pl-0 border-l-2 border-primary/30 md:border-l-0 md:pl-0">
                                        {/* Timeline dot on mobile */}
                                        <div className="absolute -left-[5px] top-1 w-2 h-2 rounded-full bg-primary md:hidden" />
                                        <h3 className="text-lg font-semibold text-foreground leading-tight">
                                            {item.role}
                                        </h3>
                                        <h4 className="text-sm font-medium text-primary/80">{item.company}</h4>
                                        <p className="text-sm text-muted-foreground leading-relaxed mt-1">
                                            {item.description}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* Education */}
                    <section aria-labelledby="education-heading" className="flex flex-col gap-10">
                        <h2
                            id="education-heading"
                            className="text-2xl font-bold pb-4 border-b border-border/60"
                        >
                            Education
                        </h2>
                        <div className="flex flex-col gap-8">
                            {resume.education.map((item, index) => (
                                <div key={index} className="flex flex-col md:flex-row gap-4 md:gap-10">
                                    <div className="md:w-48 shrink-0">
                                        <span className="text-xs font-mono text-muted-foreground tracking-wider">
                                            {item.period}
                                        </span>
                                    </div>
                                    <div className="flex flex-col gap-1">
                                        <h3 className="text-lg font-semibold text-foreground">{item.degree}</h3>
                                        <h4 className="text-sm font-medium text-primary/80">{item.institution}</h4>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>
                </div>

                {/* ── Right (1/3): Skills + Contact ───────────────── */}
                <div className="flex flex-col gap-10 lg:sticky lg:top-28">

                    {/* Skills Matrix */}
                    <section aria-labelledby="skills-heading" className="flex flex-col gap-6">
                        <h2
                            id="skills-heading"
                            className="text-2xl font-bold pb-4 border-b border-border/60"
                        >
                            Skills
                        </h2>
                        <div className="flex flex-col gap-6">
                            {Object.entries(resume.skills).map(([category, skills]) => (
                                <div key={category} className="flex flex-col gap-2.5">
                                    <h3 className="text-xs uppercase tracking-widest font-semibold text-muted-foreground">
                                        {categoryLabel[category] ?? category}
                                    </h3>
                                    <div className="flex flex-wrap gap-1.5">
                                        {skills.map((skill) => (
                                            <span key={skill} className="tag-pill cursor-default">
                                                {skill}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* Contact Form Card */}
                    <section
                        aria-labelledby="contact-heading"
                        className="card-surface p-6 flex flex-col gap-6"
                    >
                        <div>
                            <h2 id="contact-heading" className="text-xl font-bold mb-1">
                                Get in touch
                            </h2>
                            <p className="text-sm text-muted-foreground">
                                Fill out the form and I&apos;ll get back to you within 24 hours.
                            </p>
                        </div>
                        <ContactForm />
                    </section>
                </div>

            </div>
        </div>
    );
}
