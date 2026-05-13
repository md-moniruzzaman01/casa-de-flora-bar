"use client";

import React, { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { ArrowLeft, Save, Loader2, AlertCircle, RefreshCw, ShieldAlert } from "lucide-react";
import Link from "next/link";
import { api } from "@/lib/api";
import { useAuth } from "@/lib/auth";

export default function EditUserPage() {
  const router = useRouter();
  const params = useParams();
  const userId = params?.id;
  const { user: currentUser } = useAuth();
  const isSuperAdmin = currentUser?.role === "SUPER_ADMIN";

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState(""); // Only if they want to reset it
  const [role, setRole] = useState<"ADMIN" | "SUPER_ADMIN">("ADMIN");
  const [isActive, setIsActive] = useState(true);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [targetUser, setTargetUser] = useState<any>(null);

  useEffect(() => {
    if (!userId) return;

    api.get<{ data: any }>(`/api/users/${userId}`)
      .then(res => {
        const u = res.data;
        setTargetUser(u);
        setName(u.name);
        setEmail(u.email);
        setRole(u.role);
        setIsActive(u.isActive);
      })
      .catch(err => {
        setError(err.message || "Failed to load user");
      })
      .finally(() => setLoading(false));
  }, [userId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError(null);

    const payload: any = {
      name,
      email,
      isActive,
    };

    // Only change role if SuperAdmin
    if (isSuperAdmin) {
      payload.role = role;
    }

    // Only include password if it was changed
    if (password.trim()) {
      payload.password = password;
    }

    try {
      await api.patch(`/api/users/${userId}`, payload);
      router.push("/admin/users");
      router.refresh();
    } catch (err: any) {
      setError(err.message || "Failed to update user");
    } finally {
      setSaving(false);
    }
  };

  const inputBase = "w-full border border-gray-200 px-4 py-3 rounded-xl text-sm text-gray-800 focus:outline-none focus:ring-1 focus:ring-pink-300 focus:border-pink-300 transition-all";
  const labelBase = "text-xs font-medium text-gray-500 block mb-1.5";

  if (loading) {
    return (
      <div className="flex-1 flex items-center justify-center bg-white min-h-screen">
        <RefreshCw className="w-5 h-5 text-gray-300 animate-spin" />
      </div>
    );
  }

  // Permission check: regular Admin cannot edit a SuperAdmin (unless it's themselves)
  const canEdit = isSuperAdmin || targetUser?.role !== "SUPER_ADMIN" || currentUser?.id === targetUser?.id;

  if (!canEdit) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center bg-white min-h-screen px-6 text-center">
        <div className="w-16 h-16 bg-red-50 text-red-500 rounded-full flex items-center justify-center mb-4">
          <ShieldAlert size={32} />
        </div>
        <h2 className="text-xl font-bold text-gray-900 mb-2">Access Denied</h2>
        <p className="text-gray-500 max-w-sm mb-6">You do not have permission to edit this account. Only Super Admins can manage other Super Admin profiles.</p>
        <Link href="/admin/users" className="text-sm text-pink-500 font-medium hover:underline">Return to User List</Link>
      </div>
    );
  }

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
          <h1 className="text-2xl font-semibold text-gray-900">Edit User</h1>
          <p className="text-sm text-gray-500 mt-1">Update profile details for {targetUser?.name}</p>
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
              className={inputBase}
            />
          </div>

          <div>
            <label className={labelBase}>New Password (leave blank to keep current)</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Min. 6 characters"
              className={inputBase}
            />
          </div>

          <div>
            <label className={labelBase}>Account Status</label>
            <div className="flex items-center gap-4 mt-2">
              <label className="flex items-center gap-2 cursor-pointer group">
                <input 
                  type="radio" 
                  checked={isActive} 
                  onChange={() => setIsActive(true)}
                  className="w-4 h-4 text-pink-500 focus:ring-pink-300 border-gray-300"
                />
                <span className="text-sm text-gray-700 group-hover:text-black transition-colors">Active</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer group">
                <input 
                  type="radio" 
                  checked={!isActive} 
                  onChange={() => setIsActive(false)}
                  className="w-4 h-4 text-pink-500 focus:ring-pink-300 border-gray-300"
                />
                <span className="text-sm text-gray-700 group-hover:text-black transition-colors">Disabled</span>
              </label>
            </div>
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
              <option value="SUPER_ADMIN">Super Admin</option>
            </select>
            {!isSuperAdmin && (
              <p className="mt-1.5 text-[10px] text-gray-400 italic">Only Super Admins can change user roles.</p>
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
                  Saving...
                </>
              ) : (
                <>
                  <Save size={18} />
                  Update User
                </>
              )}
            </button>
          </div>
        </form>
      </main>
    </div>
  );
}
