"use client";

import { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { motion, useReducedMotion } from "framer-motion";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

type FormValues = {
  name: string;
  email: string;
  type?: string;
  message: string;
  website?: string; // honeypot
};

type FloatingFieldProps = {
  id: keyof FormValues;
  label: string;
  type?: string;
  required?: boolean;
  register: ReturnType<typeof useForm<FormValues>>["register"];
  component?: "input" | "textarea";
};

function FloatingField({ id, label, type = "text", required, register, component = "input" }: FloatingFieldProps) {
  const baseClassName = "peer w-full rounded-xl border border-border/70 bg-background/80 px-4 pb-2 pt-6 text-sm transition-all focus-visible:border-primary/60 focus-visible:ring-primary/30 placeholder-transparent";

  if (component === "textarea") {
    return (
      <div className="relative">
        <Textarea
          id={id}
          placeholder=" "
          className={cn(baseClassName, "min-h-32 resize-y pt-6 pb-4")}
          {...register(id, { required })}
        />
        <Label
          htmlFor={id}
          className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 rounded bg-background/80 px-1 text-sm text-muted-foreground transition-all duration-200 peer-focus:top-2.5 peer-focus:text-xs peer-focus:text-primary peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-not-placeholder-shown:top-2.5 peer-not-placeholder-shown:text-xs"
        >
          {label}
        </Label>
      </div>
    );
  }

  return (
    <div className="relative">
      <Input
        id={id}
        type={type}
        placeholder=" "
        className={cn(baseClassName, "h-12")}
        {...register(id, { required })}
      />
      <Label
        htmlFor={id}
        className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 rounded bg-background/80 px-1 text-sm text-muted-foreground transition-all duration-200 peer-focus:top-2.5 peer-focus:text-xs peer-focus:text-primary peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-not-placeholder-shown:top-2.5 peer-not-placeholder-shown:text-xs"
      >
        {label}
      </Label>
    </div>
  );
}

export function ContactForm() {
  const form = useForm<FormValues>();
  const { register, handleSubmit, reset } = form;
  const prefersReducedMotion = useReducedMotion() ?? false;
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [error, setError] = useState<string | null>(null);

  const floatingFields = useMemo(
    () => [
      { id: "name" as const, label: "Name", required: true },
      { id: "email" as const, label: "Email", type: "email", required: true },
      { id: "type" as const, label: "Project type" },
    ],
    [],
  );

  const onSubmit = async (values: FormValues) => {
    setStatus("loading");
    setError(null);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      if (!res.ok) throw new Error("Failed to send message");
      setStatus("success");
      reset();
      setTimeout(() => setStatus("idle"), 6000);
    } catch (e: unknown) {
      setStatus("error");
      const msg = e instanceof Error ? e.message : "Unknown error";
      setError(msg);
    }
  };

  const isLoading = status === "loading";

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="mt-8 grid gap-5 sm:max-w-lg">
      {floatingFields.map((field) => (
        <FloatingField key={field.id} register={register} {...field} />
      ))}
      <FloatingField id="message" label="Message" register={register} component="textarea" required />
      {/* Honeypot */}
      <input type="text" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden {...register("website")} />
      <Button
        type="submit"
        disabled={isLoading}
        className="group relative mt-2 inline-flex items-center justify-center overflow-hidden rounded-xl bg-primary text-primary-foreground transition-all duration-300 hover:glow-pulse"
        style={{ "--pulse-glow": "30 64 175" } as React.CSSProperties}
      >
        <span className="relative z-10 flex items-center gap-2">
          {isLoading ? "Sending..." : "Send message"}
          {status === "loading" && (
            <motion.span
              className="h-1.5 w-1.5 rounded-full bg-primary-foreground"
              animate={{ scale: [1, 1.4, 1], opacity: [1, 0.6, 1] }}
              transition={{ repeat: Infinity, duration: 1.2, ease: "easeInOut" }}
            />
          )}
        </span>
        {!prefersReducedMotion && (
          <span className="pointer-events-none absolute inset-0 z-0 bg-gradient-to-r from-primary/20 via-transparent to-primary/30 opacity-0 transition-opacity duration-500 group-hover:opacity-100" aria-hidden />
        )}
      </Button>
      {status === "success" ? (
        <motion.div
          className="flex items-center gap-3 rounded-xl border border-emerald-200/60 bg-emerald-100/40 px-4 py-3 text-sm text-emerald-700"
          initial={{ opacity: 0, y: prefersReducedMotion ? 0 : -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: prefersReducedMotion ? 0 : 0.4, ease: "easeOut" }}
        >
          <motion.svg
            viewBox="0 0 24 24"
            className="h-5 w-5 text-emerald-500"
            fill="none"
            stroke="currentColor"
            strokeWidth={1.8}
            initial={{ pathLength: prefersReducedMotion ? 1 : 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: prefersReducedMotion ? 0 : 0.6, ease: "easeOut" }}
          >
            <motion.path d="M5 12.5 9 16l10-10" strokeLinecap="round" strokeLinejoin="round" />
          </motion.svg>
          <span>Thanks! I will get back to you shortly.</span>
        </motion.div>
      ) : null}
      {status === "error" ? (
        <motion.p
          className="text-sm text-destructive"
          initial={{ opacity: 0, y: prefersReducedMotion ? 0 : -6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: prefersReducedMotion ? 0 : 0.3, ease: "easeOut" }}
        >
          {error ?? "Something went wrong. Please try again."}
        </motion.p>
      ) : null}
    </form>
  );
}
