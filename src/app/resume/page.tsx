import type { Metadata } from "next";
import portfolioData from "@/data/portfolio.json";
import ResumeContent from "./ResumeContent";

export const metadata: Metadata = {
    title: "Resume & Contact - Gajanan",
    description: "My professional experience, skills, and a direct way to get in touch.",
};

export default function ResumePage() {
    // Explicit typing since we cast timeline structure
    const { resume } = portfolioData;

    return <ResumeContent resume={resume as any} />;
}
