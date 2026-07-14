"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { MenuIcon, XIcon, GithubIcon, LinkedInIcon } from "./Icons";
import portfolioData from "@/data/portfolio.json";

const navLinks = [
    { name: "Home", path: "/" },
    { name: "Projects", path: "/projects" },
    { name: "Resume", path: "/resume" },
];

export default function Navbar() {
    const pathname = usePathname();
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // Close mobile menu on route change
    useEffect(() => {
        setIsOpen(false);
    }, [pathname]);

    return (
        <nav
            className={`fixed top-0 w-full z-50 transition-all duration-500 ${scrolled ? "glass py-3" : "bg-transparent py-5"
                }`}
        >
            <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
                {/* Logo */}
                <Link href="/" className="text-xl font-bold tracking-tighter group">
                    <span className="text-foreground">gajanan</span>
                    <span className="text-primary transition-colors duration-200 group-hover:text-foreground">
                        .dev
                    </span>
                </Link>

                {/* Desktop Nav */}
                <div className="hidden md:flex items-center gap-8">
                    <div className="flex gap-1">
                        {navLinks.map((link) => (
                            <Link
                                key={link.path}
                                href={link.path}
                                className={`relative px-3 py-1.5 text-sm font-medium rounded-md transition-colors duration-200 ${pathname === link.path
                                    ? "text-foreground bg-muted/60"
                                    : "text-muted-foreground hover:text-foreground hover:bg-muted/40"
                                    }`}
                            >
                                {link.name}
                                {pathname === link.path && (
                                    <span className="absolute inset-x-0 -bottom-px h-px bg-primary/60 rounded-full" />
                                )}
                            </Link>
                        ))}
                    </div>

                    <div className="flex items-center gap-3 border-l border-border pl-6">
                        <a
                            href={portfolioData.profile.github}
                            target="_blank"
                            aria-label="GitHub"
                            className="p-2 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted/60 transition-all duration-200 nav-icon-click"
                        >
                            <GithubIcon className="w-[18px] h-[18px]" />
                        </a>
                        <a
                            href={portfolioData.profile.linkedin}
                            target="_blank"
                            aria-label="LinkedIn"
                            className="p-2 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted/60 transition-all duration-200 nav-icon-click"
                        >
                            <LinkedInIcon className="w-[18px] h-[18px]" />
                        </a>
                    </div>
                </div>

                {/* Mobile Toggle */}
                <button
                    className="md:hidden p-2 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted/60 transition-all"
                    onClick={() => setIsOpen(!isOpen)}
                    aria-label="Toggle menu"
                    aria-expanded={isOpen}
                >
                    {isOpen ? <XIcon className="w-5 h-5" /> : <MenuIcon className="w-5 h-5" />}
                </button>
            </div>

            {/* Mobile Nav */}
            <div
                className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? "max-h-72 opacity-100" : "max-h-0 opacity-0"
                    }`}
            >
                <div className="glass border-t border-border py-4 px-6 flex flex-col gap-1">
                    {navLinks.map((link) => (
                        <Link
                            key={link.path}
                            href={link.path}
                            className={`text-sm font-medium px-3 py-2.5 rounded-md transition-colors duration-150 ${pathname === link.path
                                ? "bg-muted/70 text-foreground"
                                : "text-muted-foreground hover:text-foreground hover:bg-muted/40"
                                }`}
                        >
                            {link.name}
                        </Link>
                    ))}
                    <div className="flex items-center gap-2 pt-3 mt-2 border-t border-border/60">
                        <a
                            href={portfolioData.profile.github}
                            target="_blank"
                            aria-label="GitHub"
                            className="flex items-center gap-2 px-3 py-2 rounded-md text-sm text-muted-foreground hover:text-foreground hover:bg-muted/40 transition-all nav-icon-click"
                        >
                            <GithubIcon className="w-4 h-4" />
                            GitHub
                        </a>
                        <a
                            href={portfolioData.profile.linkedin}
                            target="_blank"
                            aria-label="LinkedIn"
                            className="flex items-center gap-2 px-3 py-2 rounded-md text-sm text-muted-foreground hover:text-foreground hover:bg-muted/40 transition-all nav-icon-click"
                        >
                            <LinkedInIcon className="w-4 h-4" />
                            LinkedIn
                        </a>
                    </div>
                </div>
            </div>
        </nav>
    );
}
