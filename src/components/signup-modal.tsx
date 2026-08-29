"use client";

import { useEffect, useState } from "react";
import { Check, X } from "lucide-react";

let signupOpener: (() => void) | null = null;

export function SignupModal() {
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);

  useEffect(() => {
    signupOpener = () => setOpen(true);
    return () => {
      signupOpener = null;
    };
  }, []);

  if (!open) return null;

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    setDone(true);
    setTimeout(() => {
      setOpen(false);
      setDone(false);
      setEmail("");
    }, 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
      <div className="relative w-full max-w-md rounded-2xl border border-orange-500/25 bg-[#1a1028] p-6">
        <button
          type="button"
          onClick={() => setOpen(false)}
          className="absolute right-4 top-4 text-zinc-500 hover:text-white"
          aria-label="Close"
        >
          <X className="h-5 w-5" />
        </button>
        {done ? (
          <div className="py-8 text-center">
            <Check className="mx-auto h-10 w-10 text-emerald-400" aria-hidden="true" />
            <p className="mt-4 text-lg font-semibold text-white">¡Estás en Starter!</p>
            <p className="mt-1 text-sm text-zinc-400">Te enviaremos acceso al dashboard demo.</p>
          </div>
        ) : (
          <>
            <h2 className="text-xl font-bold text-white">Empieza con Pulse</h2>
            <p className="mt-1 text-sm text-zinc-400">Plan Starter · gratis para siempre</p>
            <form onSubmit={submit} className="mt-4 space-y-3">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="tu@email.com"
                className="w-full rounded-lg border border-white/10 bg-black/30 px-4 py-2.5 text-sm text-white outline-none focus:border-orange-500/50"
              />
              <button
                type="submit"
                className="w-full rounded-lg bg-gradient-to-r from-orange-400 to-rose-500 py-2.5 text-sm font-semibold text-white"
              >
                Crear cuenta
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}

export function openPulseSignup() {
  signupOpener?.();
}
