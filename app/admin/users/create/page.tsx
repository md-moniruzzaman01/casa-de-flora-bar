"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Save, Loader2, AlertCircle } from "lucide-react";
import Link from "next/link";
import { api } from "@/lib/api";
import { useAuth } from "@/lib/auth";

export default function CreateUserPage() {
  const router = useRouter();
  const { user: currentUser } = useAuth();
  const isSuperAdmin = currentUser?.role === "SUPER_ADMIN";

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<"ADMIN" | "SUPER_ADMIN">("ADMIN");

  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError(null);

    try {
      await api.post("/api/users", {
        name,
        email,
        password,
        role: isSuperAdmin ? role : "ADMIN", // Enforce ADMIN if not SuperAdmin
      });
      router.push("/admin/users");
      router.refresh();
    } catch (err: any) {
      setError(err.message || "Failed to create user");
    } finally {
      setSaving(false);
    }
  };

  const inputBase = "w-full border border-gray-200 px-4 py-3 rounded-xl text-sm text-gray-800 focus:outline-none focus:ring-1 focus:ring-pink-300 focus:border-pink-300 transition-all";
  const labelBase = "text-xs font-medium text-gray-500 block mb-1.5";

  return (
    <div className="flex-1 bg-white min-h-screen">
      <main className="max-w-xl mx-auto px-8 py-10">
        
        <Link 
          href="/admin/users"
          className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-gray-900 mb-8 transition-colors"
        >
          <ArrowLeft size={16} />
          Back to Users
        </Link>

        <div className="mb-8">
          <h1 className="text-2xl font-semibold text-gray-900">Create New User</h1>
          <p className="text-sm text-gray-500 mt-1">Add a new administrator or staff account</p>
        </div>

        {error && (
          <div className="mb-6 rounded-xl border border-red-100 bg-red-50 px-4 py-3 text-sm text-red-700 flex items-center gap-2">
            <AlertCircle size={16} />
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className={labelBase}>Full Name</label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="John Doe"
              className={inputBase}
            />
          </div>

          <div>
            <label className={labelBase}>Email Address</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="john@example.com"
              className={inputBase}
            />
          </div>

          <div>
            <label className={labelBase}>Password</label>
            <input
              type="password"
              required
              minLength={6}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Min. 6 characters"
              className={inputBase}
            />
          </div>

          <div>
            <label className={labelBase}>User Role</label>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value as any)}
              disabled={!isSuperAdmin}
              className={`${inputBase} ${!isSuperAdmin ? "bg-gray-50 cursor-not-allowed text-gray-500" : "bg-white"}`}
            >
              <option value="ADMIN">Regular Admin</option>
              {isSuperAdmin && <option value="SUPER_ADMIN">Super Admin</option>}
            </select>
            {!isSuperAdmin && (
              <p className="mt-1.5 text-[10px] text-gray-400 italic">Only Super Admins can create other Super Admins.</p>
            )}
          </div>

          <div className="pt-4">
            <button
              type="submit"
              disabled={saving}
              className="w-full bg-black text-white py-3.5 rounded-xl font-medium hover:bg-gray-800 transition-all shadow-sm disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {saving ? (
                <>
                  <Loader2 size={18} className="animate-spin" />
                  Creating...
                </>
              ) : (
                <>
                  <Save size={18} />
                  Save User
                </>
              )}
            </button>
          </div>
        </form>
      </main>
    </div>
  );
}
