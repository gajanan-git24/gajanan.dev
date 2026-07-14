import type { Metadata } from "next";
import ProjectsContent, { type GitHubRepo } from "./ProjectsContent";

export const metadata: Metadata = {
    title: "Projects – Gajanan B Hampiholi",
    description:
        "A live showcase of my GitHub repositories — AI systems, full-stack web apps, and more.",
};

// Repos to hide from the showcase
const EXCLUDE = new Set([
    "Prog1", "Prog2", "Prog-3", "Prog4", "Prog5",
    "gajanan.dev", // portfolio site itself
]);

// Override descriptions & live demo links for repos that don't have them set on GitHub
const REPO_OVERRIDES: Record<string, Partial<GitHubRepo>> = {
    "Mental-Health": {
        description: "A compassionate web application providing mental health resources, self-assessment tools, and support content to help users manage their wellbeing and access professional guidance.",
        homepage: "https://v0-mental-health-beryl.vercel.app",
    },
    "SentinelIQ-01": {
        description: "Privileged Access Misuse & Insider Threat Detection — an AI-driven behavioral analytics platform using LSTM-based UEBA, GNN collusion mapping, and SHAP-based explainable AI.",
        homepage: "https://sentineliq-01.vercel.app",
    },
    "privacy-preserving-anomaly-detection": {
        description: "A Python-based behavioral anomaly detection API designed with privacy-preserving principles. Analyzes patterns and detects anomalies without exposing sensitive user data.",
        homepage: "https://privacy-anomaly.vercel.app",
    },
    "Project-Gajanan-SFS": {
        description: "An Enterprise Smart Farm Security Gateway built on Kali Linux using Python. Features real-time IoT anomaly detection, automated Nmap risk auditing, and business-focused PDF reporting.",
        homepage: "https://project-gajanan-sfs.vercel.app",
    },
};

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

    const repos = allRepos
        .filter((r) => !EXCLUDE.has(r.name))
        .map((r) => ({
            ...r,
            ...(REPO_OVERRIDES[r.name] ?? {}),
        }));

    return <ProjectsContent repos={repos} />;
}
