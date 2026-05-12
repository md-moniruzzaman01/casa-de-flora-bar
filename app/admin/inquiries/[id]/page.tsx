"use client";

import React, { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { ArrowLeft, Save, Loader2, AlertCircle, RefreshCw, Mail, Phone, Calendar, User } from "lucide-react";
import Link from "next/link";
import { api } from "@/lib/api";

type InquiryStatus = "NEW" | "IN_PROGRESS" | "RESOLVED" | "CLOSED";

export default function InquiryDetailPage() {
  const router = useRouter();
  const params = useParams();
  const inquiryId = params?.id;

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [inquiry, setInquiry] = useState<any>(null);
  
  const [status, setStatus] = useState<InquiryStatus>("NEW");
  const [adminNotes, setAdminNotes] = useState("");

  useEffect(() => {
    if (!inquiryId) return;

    api.get<{ data: any }>(`/api/inquiries/${inquiryId}`)
      .then(res => {
        const i = res.data;
        setInquiry(i);
        setStatus(i.status);
        setAdminNotes(i.adminNotes || "");
      })
      .catch(err => {
        setError(err.message || "Failed to load inquiry");
      })
      .finally(() => setLoading(false));
  }, [inquiryId]);

  const handleUpdate = async () => {
    setSaving(true);
    setError(null);

    try {
      await api.patch(`/api/inquiries/${inquiryId}/status`, {
        status,
        adminNotes,
      });
      router.refresh();
      // Show success briefly or just leave as is
      alert("Inquiry updated successfully");
    } catch (err: any) {
      setError(err.message || "Failed to update inquiry");
    } finally {
      setSaving(false);
    }
  };

  const infoItemBase = "flex items-start gap-3 p-4 bg-gray-50 rounded-xl";
  const labelBase = "text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1";

  if (loading) {
    return (
      <div className="flex-1 flex items-center justify-center bg-white min-h-screen">
        <RefreshCw className="w-5 h-5 text-gray-300 animate-spin" />
      </div>
    );
  }

  if (error && !inquiry) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center bg-white min-h-screen px-6 text-center">
        <div className="w-16 h-16 bg-red-50 text-red-500 rounded-full flex items-center justify-center mb-4">
          <AlertCircle size={32} />
        </div>
        <h2 className="text-xl font-bold text-gray-900 mb-2">Error Loading Inquiry</h2>
        <p className="text-gray-500 max-w-sm mb-6">{error}</p>
        <Link href="/admin/inquiries" className="text-sm text-pink-500 font-medium hover:underline">Return to List</Link>
      </div>
    );
  }

  return (
    <div className="flex-1 bg-white min-h-screen">
      <main className="max-w-4xl mx-auto px-8 py-10">
        
        <Link 
          href="/admin/inquiries"
          className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-gray-900 mb-8 transition-colors"
        >
          <ArrowLeft size={16} />
          Back to Inquiries
        </Link>

        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-widest ${
                status === "NEW" ? "bg-blue-100 text-blue-700" :
                status === "IN_PROGRESS" ? "bg-amber-100 text-amber-700" :
                status === "RESOLVED" ? "bg-emerald-100 text-emerald-700" : "bg-gray-100 text-gray-600"
              }`}>
                {status.replace("_", " ")}
              </span>
              <span className="text-xs text-gray-400">ID: #{inquiry.id}</span>
            </div>
            <h1 className="text-3xl font-serif text-gray-900">{inquiry.subject}</h1>
          </div>

          <div className="flex items-center gap-3">
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value as any)}
              className="bg-gray-50 border border-gray-200 text-sm rounded-xl px-4 py-2.5 focus:outline-none focus:ring-1 focus:ring-pink-300"
            >
              <option value="NEW">New</option>
              <option value="IN_PROGRESS">In Progress</option>
              <option value="RESOLVED">Resolved</option>
              <option value="CLOSED">Closed</option>
            </select>
            <button
              onClick={handleUpdate}
              disabled={saving}
              className="bg-black text-white px-6 py-2.5 rounded-xl text-sm font-medium hover:bg-gray-800 transition-all shadow-sm disabled:opacity-50 flex items-center gap-2"
            >
              {saving ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />}
              Update Status
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          
          {/* Main Message */}
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-pink-50/30 border border-pink-100/50 rounded-2xl p-8">
              <p className="text-xs font-bold text-pink-400 uppercase tracking-widest mb-4">Message Content</p>
              <div className="text-gray-800 leading-relaxed whitespace-pre-wrap font-serif text-lg">
                {inquiry.message}
              </div>
            </div>

            <div>
              <label className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2 block">Internal Admin Notes</label>
              <textarea
                value={adminNotes}
                onChange={(e) => setAdminNotes(e.target.value)}
                rows={6}
                placeholder="Add notes about this inquiry (e.g. 'Called customer on May 13th, they are interested in a private brunch')..."
                className="w-full border border-gray-200 rounded-2xl p-5 text-sm focus:outline-none focus:ring-1 focus:ring-pink-300 focus:border-pink-300 transition-all placeholder:text-gray-300"
              />
            </div>
          </div>

          {/* Sidebar Info */}
          <div className="space-y-6">
            <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm">
              <h3 className="text-sm font-bold text-gray-900 mb-6">Sender Details</h3>
              
              <div className="space-y-4">
                <div className={infoItemBase}>
                  <div className="w-8 h-8 rounded-full bg-pink-100 text-pink-600 flex items-center justify-center flex-shrink-0">
                    <User size={16} />
                  </div>
                  <div>
                    <p className={labelBase}>Name</p>
                    <p className="text-sm font-medium text-gray-900">{inquiry.name}</p>
                  </div>
                </div>

                <div className={infoItemBase}>
                  <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center flex-shrink-0">
                    <Mail size={16} />
                  </div>
                  <div className="min-w-0">
                    <p className={labelBase}>Email</p>
                    <p className="text-sm font-medium text-gray-900 truncate">{inquiry.email}</p>
                  </div>
                </div>

                <div className={infoItemBase}>
                  <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center flex-shrink-0">
                    <Phone size={16} />
                  </div>
                  <div>
                    <p className={labelBase}>Phone</p>
                    <p className="text-sm font-medium text-gray-900">{inquiry.phone || "Not provided"}</p>
                  </div>
                </div>

                <div className={infoItemBase}>
                  <div className="w-8 h-8 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center flex-shrink-0">
                    <Calendar size={16} />
                  </div>
                  <div>
                    <p className={labelBase}>Submitted On</p>
                    <p className="text-sm font-medium text-gray-900">{new Date(inquiry.createdAt).toLocaleString()}</p>
                  </div>
                </div>
              </div>

              {inquiry.customerId && (
                <div className="mt-8 pt-6 border-t border-gray-100">
                  <Link 
                    href={`/admin/customers`}
                    className="flex items-center justify-center gap-2 w-full py-3 border border-gray-200 rounded-xl text-xs font-bold text-gray-600 hover:bg-gray-50 transition-colors uppercase tracking-widest"
                  >
                    View Customer Profile
                  </Link>
                </div>
              )}
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}
