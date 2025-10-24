"use client";

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <div className="mx-auto flex min-h-[60vh] max-w-2xl flex-col items-center justify-center gap-4 text-center">
      <h1 className="text-3xl font-semibold">Something went wrong</h1>
      <p className="text-muted-foreground">{error.message || "Unexpected error"}</p>
      <button className="text-primary underline-offset-4 hover:underline" onClick={() => reset()}>
        Try again
      </button>
    </div>
  );
}

