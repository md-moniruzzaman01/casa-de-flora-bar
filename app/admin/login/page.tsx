"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import { Mail, Lock, ShieldCheck, ArrowLeft, RefreshCw, Eye, EyeOff } from "lucide-react";
import { requestOtp, verifyOtp, useAuth } from "@/lib/auth";

type Step = "credentials" | "otp";

const SAVED_EMAIL_KEY    = "adminSavedEmail";
const SAVED_PASSWORD_KEY = "adminSavedPassword";

export default function AdminLoginPage() {
  const router = useRouter();
  const params = useSearchParams();
  const next = params.get("next") || "/admin/dashboard";
  const { isAuthenticated } = useAuth();

  const [step,         setStep]         = useState<Step>("credentials");
  const [email,        setEmail]        = useState("");
  const [password,     setPassword]     = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe,   setRememberMe]   = useState(false);
  const [otp,          setOtp]          = useState("");
  const [busy,         setBusy]         = useState(false);
  const [error,        setError]        = useState<string | null>(null);
  const [info,         setInfo]         = useState<string | null>(null);

  // Pre-fill saved credentials on mount.
  useEffect(() => {
    const savedEmail    = localStorage.getItem(SAVED_EMAIL_KEY);
    const savedPassword = localStorage.getItem(SAVED_PASSWORD_KEY);
    if (savedEmail)    { setEmail(savedEmail);       setRememberMe(true); }
    if (savedPassword) { setPassword(savedPassword); }
  }, []);

  // If the user is already signed in, bounce straight to the destination.
  useEffect(() => {
    if (isAuthenticated) router.replace(next);
  }, [isAuthenticated, next, router]);

  async function handleCredentials(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setError(null);
    setInfo(null);
    try {
      const res = await requestOtp(email.trim().toLowerCase(), password);
      if (rememberMe) {
        localStorage.setItem(SAVED_EMAIL_KEY,    email.trim().toLowerCase());
        localStorage.setItem(SAVED_PASSWORD_KEY, password);
      } else {
        localStorage.removeItem(SAVED_EMAIL_KEY);
        localStorage.removeItem(SAVED_PASSWORD_KEY);
      }
      setInfo(res.message ?? "OTP sent to your email.");
      setStep("otp");
    } catch (e) {
      const err = e as { message?: string };
      setError(err.message ?? "Login failed");
    } finally {
      setBusy(false);
    }
  }

  async function handleOtp(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setError(null);
    try {
      await verifyOtp(email.trim().toLowerCase(), otp.trim());
      router.replace(next);
    } catch (e) {
      const err = e as { message?: string };
      setError(err.message ?? "OTP verification failed");
    } finally {
      setBusy(false);
    }
  }

  async function handleResend() {
    setBusy(true);
    setError(null);
    try {
      await requestOtp(email.trim().toLowerCase(), password);
      setInfo("A fresh code is on its way.");
    } catch (e) {
      const err = e as { message?: string };
      setError(err.message ?? "Could not resend code");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4 py-10"
      style={{ background: "linear-gradient(135deg, #fce8e8 0%, #fff5f7 60%, #ffffff 100%)" }}
    >
      <div className="w-full max-w-md">
        {/* Brand */}
        <div className="flex flex-col items-center mb-8">
          <div className="w-20 h-20 rounded-full bg-white shadow-md border border-pink-100 flex items-center justify-center mb-3">
            <Image src="/logo.png" alt="Casa de Flora" width={64} height={64} className="object-contain" />
          </div>
          <h1 className="text-2xl font-semibold text-gray-900" style={{ fontFamily: "var(--font-serif)" }}>
            Casa de Flora · Admin
          </h1>
          <p className="text-xs text-gray-500 mt-1">
            {step === "credentials"
              ? "Sign in to manage reservations and promotions"
              : "Enter the 6-digit code we just sent to your inbox"}
          </p>
        </div>

        {/* Card */}
        <div className="bg-white rounded-3xl shadow-xl border border-pink-50 p-7">
          {error && (
            <div className="mb-4 rounded-xl border border-red-100 bg-red-50 px-4 py-2.5 text-sm text-red-700">
              {error}
            </div>
          )}
          {info && !error && step === "otp" && (
            <div className="mb-4 rounded-xl border border-emerald-100 bg-emerald-50 px-4 py-2.5 text-sm text-emerald-700">
              {info}
            </div>
          )}

          {step === "credentials" ? (
            <form onSubmit={handleCredentials} className="space-y-4">
              <Field label="Email" icon={<Mail size={15} />}>
                <input
                  type="email"
                  required
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="hello@casadeflora.com"
                  className="w-full pl-9 pr-3 py-2.5 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-200 focus:border-pink-300 transition-all"
                />
              </Field>

              <Field label="Password" icon={<Lock size={15} />}>
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-9 pr-10 py-2.5 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-200 focus:border-pink-300 transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                  tabIndex={-1}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
                </button>
              </Field>

              {/* Remember me */}
              <label className="flex items-center gap-2.5 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 rounded border-gray-300 accent-pink-400 cursor-pointer"
                />
                <span className="text-xs text-gray-500">Remember me on this device</span>
              </label>

              <button
                type="submit"
                disabled={busy}
                className="w-full mt-2 flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-semibold text-white transition-all disabled:opacity-60"
                style={{ background: "#ED80A8" }}
              >
                {busy ? <RefreshCw size={14} className="animate-spin" /> : null}
                {busy ? "Sending code…" : "Continue"}
              </button>
            </form>
          ) : (
            <form onSubmit={handleOtp} className="space-y-4">
              <Field label="Verification code" icon={<ShieldCheck size={15} />}>
                <input
                  inputMode="numeric"
                  pattern="\d{6}"
                  maxLength={6}
                  required
                  autoFocus
                  value={otp}
                  onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
                  placeholder="123456"
                  className="w-full pl-9 pr-3 py-2.5 text-sm tracking-[0.4em] text-center border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-200 focus:border-pink-300 transition-all font-mono"
                />
              </Field>

              <p className="text-[11px] text-gray-400 text-center -mt-1">
                Code expires in 10 minutes.{" "}
                <button
                  type="button"
                  onClick={handleResend}
                  disabled={busy}
                  className="text-pink-600 hover:underline disabled:opacity-40"
                >
                  Resend
                </button>
              </p>

              <button
                type="submit"
                disabled={busy || otp.length !== 6}
                className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-semibold text-white transition-all disabled:opacity-60"
                style={{ background: "#ED80A8" }}
              >
                {busy ? <RefreshCw size={14} className="animate-spin" /> : null}
                {busy ? "Verifying…" : "Sign In"}
              </button>

              <button
                type="button"
                onClick={() => {
                  setStep("credentials");
                  setOtp("");
                  setError(null);
                  setInfo(null);
                }}
                className="w-full flex items-center justify-center gap-1.5 text-xs text-gray-500 hover:text-gray-800 transition-colors"
              >
                <ArrowLeft size={12} /> Use a different account
              </button>
            </form>
          )}
        </div>

        <p className="text-center text-[11px] text-gray-400 mt-6">
          Trouble signing in? Contact your super admin.
        </p>
      </div>
    </div>
  );
}

function Field({
  label, icon, children,
}: {
  label: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="text-[11px] font-semibold uppercase tracking-wider text-gray-500 mb-1.5 block">
        {label}
      </span>
      <div className="relative">
        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
          {icon}
        </span>
        {children}
      </div>
    </label>
  );
}
