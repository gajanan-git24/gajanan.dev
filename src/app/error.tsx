"use client";

import { useEffect } from "react";
import Link from "next/link";

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    useEffect(() => {
        console.error("Application error:", error);
    }, [error]);

    return (
        <div className="flex flex-col items-center justify-center min-h-[60vh] gap-6 text-center px-4 animate-fade-in">
            <div className="w-16 h-16 rounded-2xl bg-red-500/10 border border-red-500/20 flex items-center justify-center">
                <svg className="w-8 h-8 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
                </svg>
            </div>
            <div className="flex flex-col gap-2">
                <h2 className="text-3xl font-bold tracking-tight">Something went wrong</h2>
                <p className="text-muted-foreground max-w-md leading-relaxed">
                    An unexpected error occurred. You can try again or head back home.
                </p>
            </div>
            <div className="flex gap-3">
                <button
                    id="error-retry"
                    onClick={() => reset()}
                    className="px-5 py-2.5 bg-primary text-primary-foreground text-sm font-semibold rounded-lg hover:opacity-90 active:scale-[0.98] transition-all"
                >
                    Try Again
                </button>
                <Link
                    href="/"
                    id="error-home"
                    className="px-5 py-2.5 bg-surface text-foreground text-sm font-semibold rounded-lg border border-border hover:bg-muted/60 active:scale-[0.98] transition-all"
                >
                    Return Home
                </Link>
            </div>
        </div>
    );
}
