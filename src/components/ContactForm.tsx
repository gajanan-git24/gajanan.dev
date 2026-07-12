"use client";

import { useState, useId } from "react";

type Status = "idle" | "success" | "error";

export default function ContactForm() {
    const uid = useId();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [status, setStatus] = useState<Status>("idle");
    const [errorMessage, setErrorMessage] = useState("");

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsSubmitting(true);
        setStatus("idle");
        setErrorMessage("");

        const formData = new FormData(e.currentTarget);
        const data = {
            name: formData.get("name"),
            email: formData.get("email"),
            message: formData.get("message"),
        };

        try {
            const response = await fetch("/api/contact", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            });

            if (!response.ok) {
                const json = await response.json().catch(() => ({}));
                throw new Error(json.error ?? "Failed to send message.");
            }

            setStatus("success");
            (e.target as HTMLFormElement).reset();
        } catch (err: unknown) {
            setStatus("error");
            setErrorMessage(
                err instanceof Error ? err.message : "An unexpected error occurred."
            );
        } finally {
            setIsSubmitting(false);
        }
    };

    const inputBase =
        "w-full bg-muted/40 border border-border rounded-lg px-4 py-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary/60 transition-all duration-200 placeholder:text-muted-foreground/50";

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-5" noValidate>
            {/* Name */}
            <div className="flex flex-col gap-1.5">
                <label htmlFor={`${uid}-name`} className="text-sm font-medium text-foreground/90">
                    Name
                </label>
                <input
                    id={`${uid}-name`}
                    name="name"
                    type="text"
                    required
                    className={inputBase}
                    placeholder="John Doe"
                    autoComplete="name"
                />
            </div>

            {/* Email */}
            <div className="flex flex-col gap-1.5">
                <label htmlFor={`${uid}-email`} className="text-sm font-medium text-foreground/90">
                    Email
                </label>
                <input
                    id={`${uid}-email`}
                    name="email"
                    type="email"
                    required
                    className={inputBase}
                    placeholder="john@example.com"
                    autoComplete="email"
                />
            </div>

            {/* Message */}
            <div className="flex flex-col gap-1.5">
                <label htmlFor={`${uid}-message`} className="text-sm font-medium text-foreground/90">
                    Message
                </label>
                <textarea
                    id={`${uid}-message`}
                    name="message"
                    required
                    rows={5}
                    className={`${inputBase} resize-none`}
                    placeholder="Tell me about your project…"
                />
            </div>

            {/* Submit */}
            <button
                type="submit"
                disabled={isSubmitting}
                className="mt-1 px-6 py-3 bg-primary text-primary-foreground text-sm font-semibold rounded-lg hover:opacity-90 active:scale-[0.98] transition-all duration-150 disabled:opacity-50 disabled:cursor-not-allowed self-start flex items-center gap-2"
            >
                {isSubmitting ? (
                    <>
                        <span className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                        Sending…
                    </>
                ) : (
                    "Send Message"
                )}
            </button>

            {/* Status messages */}
            {status === "success" && (
                <p role="status" className="text-sm text-emerald-400 flex items-center gap-2">
                    <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                    Message sent! I&apos;ll get back to you soon.
                </p>
            )}
            {status === "error" && (
                <p role="alert" className="text-sm text-red-400 flex items-center gap-2">
                    <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                    {errorMessage}
                </p>
            )}
        </form>
    );
}
