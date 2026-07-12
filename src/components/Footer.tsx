import portfolioData from "@/data/portfolio.json";
import { GithubIcon, LinkedInIcon, MailIcon } from "./Icons";

export default function Footer() {
    const currentYear = new Date().getFullYear();
    const { profile } = portfolioData;

    return (
        <footer className="border-t border-border/60 mt-24">
            <div className="max-w-7xl mx-auto px-6 md:px-12 py-12">
                <div className="flex flex-col md:flex-row items-center md:items-start justify-between gap-8">

                    {/* Brand */}
                    <div className="flex flex-col items-center md:items-start gap-2">
                        <span className="text-lg font-bold tracking-tight">
                            gajanan<span className="text-primary">.dev</span>
                        </span>
                        <p className="text-sm text-muted-foreground max-w-xs text-center md:text-left leading-relaxed">
                            Building production-ready software designed to excel.
                        </p>
                    </div>

                    {/* Social Links */}
                    <div className="flex items-center gap-2">
                        {[
                            { href: profile.github, label: "GitHub", Icon: GithubIcon },
                            { href: profile.linkedin, label: "LinkedIn", Icon: LinkedInIcon },
                            { href: `mailto:${profile.email}`, label: "Email", Icon: MailIcon },
                        ].map(({ href, label, Icon }) => (
                            <a
                                key={label}
                                href={href}
                                target={href.startsWith("http") ? "_blank" : undefined}
                                rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                                aria-label={label}
                                className="p-2.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted/70 transition-all duration-200 group"
                            >
                                <Icon className="w-[18px] h-[18px] group-hover:-translate-y-0.5 transition-transform duration-200" />
                            </a>
                        ))}
                    </div>
                </div>

                {/* Bottom bar */}
                <div className="mt-8 pt-6 border-t border-border/40 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-muted-foreground">
                    <span>
                        &copy; {currentYear} {profile.name}. All rights reserved.
                    </span>
                    <span className="flex items-center gap-1">
                        Built with{" "}
                        <span className="text-primary font-medium">Next.js</span>
                        {" "}& Tailwind CSS
                    </span>
                </div>
            </div>
        </footer>
    );
}
