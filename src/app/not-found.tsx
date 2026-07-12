import Link from "next/link";

export default function NotFound() {
    return (
        <div className="flex flex-col items-center justify-center min-h-[60vh] gap-6 text-center px-4 animate-fade-in">
            <p className="text-8xl font-bold tracking-tighter gradient-text leading-none">404</p>
            <div className="flex flex-col gap-2">
                <h1 className="text-2xl font-bold">Page Not Found</h1>
                <p className="text-muted-foreground max-w-md leading-relaxed">
                    The page you&apos;re looking for doesn&apos;t exist or has been moved.
                </p>
            </div>
            <Link
                href="/"
                id="not-found-home"
                className="mt-2 px-6 py-3 bg-primary text-primary-foreground text-sm font-semibold rounded-lg hover:opacity-90 active:scale-[0.98] transition-all"
            >
                Back to Home
            </Link>
        </div>
    );
}
