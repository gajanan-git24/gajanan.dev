import type { Metadata } from "next";
import ProjectsContent, { type GitHubRepo } from "./ProjectsContent";

export const metadata: Metadata = {
    title: "Projects – Gajanan B Hampiholi",
    description:
        "A live showcase of my GitHub repositories — AI systems, full-stack web apps, and more.",
};

// Repos to hide (exercise/practice repos with no real content)
const EXCLUDE = new Set(["Prog1", "Prog2", "Prog-3", "Prog4", "Prog5"]);

async function getRepos(): Promise<GitHubRepo[]> {
    try {
        const res = await fetch(
            "https://api.github.com/users/gajanan-git24/repos?sort=pushed&per_page=30",
            {
                next: { revalidate: 3600 }, // Revalidate every hour
                headers: { Accept: "application/vnd.github+json" },
            }
        );
        if (!res.ok) return [];
        const data: GitHubRepo[] = await res.json();
        return data.filter((r) => !EXCLUDE.has(r.name) && !r.name.includes("gajanan.dev") === false || r.full_name === "gajanan-git24/gajanan.dev");
    } catch {
        return [];
    }
}

export default async function ProjectsPage() {
    const allRepos = await fetch(
        "https://api.github.com/users/gajanan-git24/repos?sort=pushed&per_page=30",
        {
            next: { revalidate: 3600 },
            headers: { Accept: "application/vnd.github+json" },
        }
    )
        .then((r) => r.json() as Promise<GitHubRepo[]>)
        .catch(() => [] as GitHubRepo[]);

    const repos = allRepos.filter((r) => !EXCLUDE.has(r.name));

    return <ProjectsContent repos={repos} />;
}
