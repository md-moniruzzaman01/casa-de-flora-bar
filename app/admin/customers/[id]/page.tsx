"use client";

import React, { useEffect, useState, useMemo } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  ArrowLeft, Mail, Phone, MapPin, Calendar, Flower2,
  MessageSquare, Save, Trash2, Loader2, Send, CheckCircle2,
  AlertCircle, ChevronRight, History, User, Info
} from "lucide-react";
import { api } from "@/lib/api";
import { formatDisplayDate, formatTimeRange, formatTimeRangeBetween, initials } from "@/lib/admin-mappers";

interface BookingHistoryItem {
  id: string;
  type: "Table" | "Event" | "Inquiry";
  date: string;
  title: string;
  details: string;
  status: string;
}

interface CustomerFullDetails {
  id: string;
  name: string;
  email: string;
  phone: string;
  address?: string;
  notes?: string;
  isBlocked: boolean;
  createdAt: string;
  tableBookings: any[];
  eventBookings: any[];
  inquiries: any[];
}

export default function CustomerDetailPage() {
  const params = useParams();
  const router = useRouter();
  const customerId = params.id as string;

  const [customer, setCustomer] = useState<CustomerFullDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [blocking, setBlocking] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<"history" | "email" | "profile">("history");

  // Edit states
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    notes: "",
  });

  // Email states
  const [emailSubject, setEmailSubject] = useState("");
  const [emailMessage, setEmailMessage] = useState("");
  const [sendingEmail, setSendingEmail] = useState(false);
  const [emailSuccess, setEmailSuccess] = useState(false);

  useEffect(() => {
    fetchCustomer();
  }, [customerId]);

  const fetchCustomer = async () => {
    setLoading(true);
    try {
      const res = await api.get<{ data: CustomerFullDetails }>(`/api/customers/${customerId}`);
      setCustomer(res.data);
      setFormData({
        name: res.data.name,
        email: res.data.email,
        phone: res.data.phone,
        address: res.data.address || "",
        notes: res.data.notes || "",
      });
      setEmailSubject(`Update from Casa de Flora Bar — Hello ${res.data.name}`);
    } catch (err: any) {
      setError(err.message || "Failed to load customer details");
    } finally {
      setLoading(false);
    }
  };

  const handleToggleBlock = async () => {
    if (!customer) return;
    const action = customer.isBlocked ? "unblock" : "block";
    if (!window.confirm(`Are you sure you want to ${action} this customer? ${customer.isBlocked ? "" : "They will not be able to make new bookings."}`)) return;
    
    setBlocking(true);
    try {
      await api.patch(`/api/customers/${customerId}`, { isBlocked: !customer.isBlocked });
      await fetchCustomer();
    } catch (err: any) {
      setError(err.message || `Failed to ${action} customer`);
    } finally {
      setBlocking(false);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      await api.patch(`/api/customers/${customerId}`, formData);
      setEditMode(false);
      fetchCustomer();
    } catch (err: any) {
      setError(err.message || "Failed to update customer");
    } finally {
      setSaving(false);
    }
  };

  const handleSendEmail = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!emailMessage.trim()) return;

    setSendingEmail(true);
    setEmailSuccess(false);
    try {
      await api.post(`/api/customers/${customerId}/send-email`, {
        subject: emailSubject,
        message: emailMessage,
      });
      setEmailSuccess(true);
      setEmailMessage("");
      setTimeout(() => setEmailSuccess(false), 5000);
    } catch (err: any) {
      setError(err.message || "Failed to send email");
    } finally {
      setSendingEmail(false);
    }
  };


  const history: BookingHistoryItem[] = useMemo(() => {
    if (!customer) return [];
    const items: BookingHistoryItem[] = [];

    customer.tableBookings.forEach((b) => {
      items.push({
        id: `table-${b.id}`,
        type: "Table",
        date: b.date,
        title: "Table Reservation",
        details: `${b.guests} Guests • ${formatTimeRange(b.timeSlot)}`,
        status: b.status,
      });
    });

    customer.eventBookings.forEach((b) => {
      items.push({
        id: `event-${b.id}`,
        type: "Event",
        date: b.date,
        title: `Event: ${b.eventType}`,
        details: `${b.guests} Guests • ${formatTimeRangeBetween(b.startTime, b.endTime)}`,
        status: b.status,
      });
    });

    customer.inquiries.forEach((i) => {
      items.push({
        id: `inquiry-${i.id}`,
        type: "Inquiry",
        date: i.createdAt,
        title: `Inquiry: ${i.subject}`,
        details: i.message.substring(0, 80) + (i.message.length > 80 ? "..." : ""),
        status: i.status,
      });
    });

    return items.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  }, [customer]);

  if (loading) {
    return (
      <div className="flex-1 flex items-center justify-center bg-white min-h-screen">
        <Loader2 className="w-8 h-8 text-pink-500 animate-spin" />
      </div>
    );
  }

  if (!customer) return (
    <div className="flex-1 p-10 text-center">
      <AlertCircle className="w-12 h-12 text-red-400 mx-auto mb-4" />
      <h2 className="text-xl font-bold text-gray-900">Customer not found</h2>
      <button onClick={() => router.push("/admin/customers")} className="mt-4 text-pink-600 font-semibold underline">Back to list</button>
    </div>
  );

  return (
    <div className="flex-1 flex flex-col bg-[#F9F6F6] min-h-screen">

      {/* Header / Breadcrumbs */}
      <div className="bg-white border-b border-gray-100 px-8 py-4 flex items-center justify-between sticky top-0 z-10">
        <div className="flex items-center gap-4">
          <button
            onClick={() => router.push("/admin/customers")}
            className="p-2 rounded-xl hover:bg-gray-50 text-gray-500 transition-colors"
          >
            <ArrowLeft size={20} />
          </button>
          <div className="flex items-center gap-2 text-sm text-gray-400">
            <span>Customers</span>
            <ChevronRight size={14} />
            <span className="font-semibold text-gray-900">{customer.name}</span>
            {customer.isBlocked && (
              <span className="ml-2 bg-red-100 text-red-600 text-[10px] font-black px-2 py-0.5 rounded-full uppercase tracking-tighter">
                Blocked
              </span>
            )}
          </div>
        </div>

        <div className="flex items-center gap-3">
          {!editMode && (
            <button
              onClick={() => setEditMode(true)}
              className="px-4 py-2 bg-white border border-gray-200 rounded-xl text-sm font-bold text-gray-700 hover:bg-gray-50 shadow-sm transition-all"
            >
              Edit Profile
            </button>
          )}
          <button
            onClick={() => setActiveTab("email")}
            className="px-4 py-2 bg-pink-500 text-white rounded-xl text-sm font-bold hover:bg-pink-600 shadow-lg shadow-pink-100 transition-all flex items-center gap-2"
          >
            <Send size={14} />
            Send Email
          </button>
        </div>
      </div>

      <div className="flex-1 p-8 max-w-7xl mx-auto w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

          {/* Left Column: Quick Info & Edit */}
          <div className="lg:col-span-4 space-y-6">

            {/* Main Info Card */}
            <div className="bg-white rounded-[32px] p-8 shadow-sm border border-gray-100 flex flex-col items-center text-center relative overflow-hidden">
              {customer.isBlocked && (
                <div className="absolute top-0 left-0 w-full h-1.5 bg-red-500" />
              )}
              <div className="w-24 h-24 rounded-[32px] bg-gradient-to-br from-pink-400 to-rose-500 flex items-center justify-center text-white text-3xl font-bold shadow-xl shadow-pink-100 mb-6">
                {initials(customer.name)}
              </div>
              <h1 className="text-2xl font-bold text-gray-900 mb-1 flex items-center gap-2">
                {customer.name}
                {customer.isBlocked && <AlertCircle size={20} className="text-red-500" />}
              </h1>
              <p className="text-sm text-gray-400 mb-6 font-medium">Joined {formatDisplayDate(customer.createdAt)}</p>

              <div className="w-full grid grid-cols-2 gap-3 mb-8">
                <div className="bg-pink-50/50 rounded-2xl p-4">
                  <p className="text-[10px] font-bold text-pink-400 uppercase tracking-widest mb-1">Visits</p>
                  <p className="text-xl font-bold text-gray-900">{customer.tableBookings.length + customer.eventBookings.length}</p>
                </div>
                <div className="bg-blue-50/50 rounded-2xl p-4">
                  <p className="text-[10px] font-bold text-blue-400 uppercase tracking-widest mb-1">Inquiries</p>
                  <p className="text-xl font-bold text-gray-900">{customer.inquiries.length}</p>
                </div>
              </div>

              <div className="w-full space-y-4 text-left">
                <div className="flex items-center gap-3 text-gray-600">
                  <Mail size={16} className="text-gray-400" />
                  <span className="text-sm truncate">{customer.email}</span>
                </div>
                <div className="flex items-center gap-3 text-gray-600">
                  <Phone size={16} className="text-gray-400" />
                  <span className="text-sm">{customer.phone}</span>
                </div>
                <div className="flex items-start gap-3 text-gray-600">
                  <MapPin size={16} className="text-gray-400 mt-0.5" />
                  <span className="text-sm leading-snug">{customer.address || "No address listed"}</span>
                </div>
              </div>
            </div>

            {/* Internal Notes Card */}
            <div className="bg-white rounded-[32px] p-8 shadow-sm border border-gray-100">
              <h3 className="text-sm font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Info size={16} className="text-pink-400" />
                Internal Admin Notes
              </h3>
              <p className="text-sm text-gray-500 italic leading-relaxed">
                {customer.notes || "No internal notes for this customer yet. Use 'Edit Profile' to add some."}
              </p>
            </div>

            {/* Block Action Card */}
            <div className={`bg-white rounded-[32px] p-8 shadow-sm border border-gray-100 border-l-4 ${customer.isBlocked ? "border-l-emerald-500" : "border-l-red-500"}`}>
              <h3 className="text-sm font-bold text-gray-900 mb-2">Customer Access</h3>
              <p className="text-xs text-gray-400 mb-4">
                {customer.isBlocked 
                  ? "This customer is currently blocked and cannot make new reservations." 
                  : "Blocking this customer will prevent them from making any new table or event bookings."}
              </p>
              <button 
                onClick={handleToggleBlock}
                disabled={blocking}
                className={`flex items-center gap-2 text-xs font-black uppercase tracking-widest px-4 py-2 rounded-xl transition-all ${
                  customer.isBlocked 
                    ? "bg-emerald-50 text-emerald-600 hover:bg-emerald-100" 
                    : "bg-red-50 text-red-600 hover:bg-red-100"
                }`}
              >
                {blocking ? <Loader2 size={12} className="animate-spin" /> : <AlertCircle size={12} />}
                {customer.isBlocked ? "Unblock Customer" : "Block Customer"}
              </button>
            </div>
          </div>

          {/* Right Column: Dynamic Content (History / Email / Edit) */}
          <div className="lg:col-span-8 space-y-6">

            {/* Tabs */}
            <div className="flex items-center gap-1 bg-white p-1.5 rounded-[20px] shadow-sm border border-gray-100 w-fit">
              <button
                onClick={() => { setActiveTab("history"); setEditMode(false); }}
                className={`flex items-center gap-2 px-6 py-2.5 rounded-[14px] text-sm font-bold transition-all ${activeTab === "history" && !editMode ? "bg-gray-900 text-white" : "text-gray-500 hover:bg-gray-50"
                  }`}
              >
                <History size={16} />
                Booking History
              </button>
              <button
                onClick={() => { setActiveTab("email"); setEditMode(false); }}
                className={`flex items-center gap-2 px-6 py-2.5 rounded-[14px] text-sm font-bold transition-all ${activeTab === "email" && !editMode ? "bg-gray-900 text-white" : "text-gray-500 hover:bg-gray-50"
                  }`}
              >
                <Mail size={16} />
                Send Email
              </button>
              {editMode && (
                <button
                  className="flex items-center gap-2 px-6 py-2.5 rounded-[14px] text-sm font-bold bg-gray-900 text-white"
                >
                  <User size={16} />
                  Editing Profile
                </button>
              )}
            </div>

            {/* Content Area */}
            <div className="bg-white rounded-[32px] p-10 shadow-sm border border-gray-100 min-h-[500px]">

              {editMode ? (
                <div className="max-w-xl animate-in fade-in slide-in-from-bottom-4 duration-500">
                  <h2 className="text-xl font-bold text-gray-900 mb-8">Update Profile Details</h2>
                  <div className="space-y-6">
                    <div className="grid grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-xs font-bold text-gray-400 uppercase tracking-wider ml-1">Full Name</label>
                        <input
                          type="text"
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          className="w-full bg-gray-50 border border-gray-100 rounded-2xl px-5 py-3 outline-none focus:ring-2 focus:ring-pink-200 focus:bg-white transition-all text-sm font-medium"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs font-bold text-gray-400 uppercase tracking-wider ml-1">Phone Number</label>
                        <input
                          type="text"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          className="w-full bg-gray-50 border border-gray-100 rounded-2xl px-5 py-3 outline-none focus:ring-2 focus:ring-pink-200 focus:bg-white transition-all text-sm font-medium"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-gray-400 uppercase tracking-wider ml-1">Email Address</label>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full bg-gray-50 border border-gray-100 rounded-2xl px-5 py-3 outline-none focus:ring-2 focus:ring-pink-200 focus:bg-white transition-all text-sm font-medium"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-gray-400 uppercase tracking-wider ml-1">Home Address</label>
                      <input
                        type="text"
                        value={formData.address}
                        onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                        className="w-full bg-gray-50 border border-gray-100 rounded-2xl px-5 py-3 outline-none focus:ring-2 focus:ring-pink-200 focus:bg-white transition-all text-sm font-medium"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-gray-400 uppercase tracking-wider ml-1">Internal Notes</label>
                      <textarea
                        rows={4}
                        value={formData.notes}
                        onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                        className="w-full bg-gray-50 border border-gray-100 rounded-2xl px-5 py-3 outline-none focus:ring-2 focus:ring-pink-200 focus:bg-white transition-all text-sm font-medium resize-none"
                        placeholder="Add private notes about preferences, allergies, or special requirements..."
                      />
                    </div>
                    <div className="flex items-center gap-3 pt-4">
                      <button
                        onClick={handleSave}
                        disabled={saving}
                        className="px-8 py-3.5 bg-gray-900 text-white rounded-2xl text-sm font-bold hover:bg-gray-800 transition-all flex items-center justify-center gap-2 shadow-lg shadow-gray-200"
                      >
                        {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save size={18} />}
                        Save Changes
                      </button>
                      <button
                        onClick={() => setEditMode(false)}
                        className="px-8 py-3.5 bg-gray-100 text-gray-600 rounded-2xl text-sm font-bold hover:bg-gray-200 transition-all"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                </div>
              ) : activeTab === "email" ? (
                <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                  <div className="mb-8">
                    <h2 className="text-xl font-bold text-gray-900 mb-2">Send Direct Email</h2>
                    <p className="text-sm text-gray-400">Compose a personalized message for {customer.name}.</p>
                  </div>

                  {emailSuccess ? (
                    <div className="bg-emerald-50 border border-emerald-100 rounded-3xl p-12 text-center flex flex-col items-center">
                      <div className="w-16 h-16 bg-emerald-500 text-white rounded-full flex items-center justify-center mb-6 shadow-lg shadow-emerald-100">
                        <CheckCircle2 size={32} />
                      </div>
                      <h3 className="text-xl font-bold text-emerald-800 mb-2">Email Sent Successfully!</h3>
                      <p className="text-emerald-600 mb-8">The message has been delivered to {customer.email}.</p>
                      <button
                        onClick={() => setEmailSuccess(false)}
                        className="text-sm font-bold text-emerald-800 underline"
                      >
                        Send another email
                      </button>
                    </div>
                  ) : (
                    <form onSubmit={handleSendEmail} className="space-y-6">
                      <div className="space-y-2">
                        <label className="text-xs font-bold text-gray-400 uppercase tracking-wider ml-1">Subject Line</label>
                        <input
                          type="text"
                          required
                          value={emailSubject}
                          onChange={(e) => setEmailSubject(e.target.value)}
                          className="w-full bg-gray-50 border border-gray-100 rounded-2xl px-5 py-3 outline-none focus:ring-2 focus:ring-pink-200 focus:bg-white transition-all text-sm font-medium"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs font-bold text-gray-400 uppercase tracking-wider ml-1">Email Message</label>
                        <textarea
                          rows={10}
                          required
                          value={emailMessage}
                          onChange={(e) => setEmailMessage(e.target.value)}
                          className="w-full bg-gray-50 border border-gray-100 rounded-2xl px-5 py-4 outline-none focus:ring-2 focus:ring-pink-200 focus:bg-white transition-all text-sm font-medium resize-none leading-relaxed"
                          placeholder={`Hello ${customer.name.split(' ')[0]},\n\nWe would like to...`}
                        />
                      </div>
                      <div className="flex items-center gap-4 pt-4">
                        <button
                          type="submit"
                          disabled={sendingEmail}
                          className="px-10 py-4 bg-pink-500 text-white rounded-2xl text-sm font-bold hover:bg-pink-600 shadow-xl shadow-pink-100 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                        >
                          {sendingEmail ? <Loader2 className="w-5 h-5 animate-spin" /> : <Send size={18} />}
                          Send Message Now
                        </button>
                        <p className="text-xs text-gray-400 italic">This email will be sent from {process.env.NEXT_PUBLIC_SMTP_USER || "info@casadeflorabar.com"}</p>
                      </div>
                    </form>
                  )}
                </div>
              ) : (
                <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                  <div className="mb-10 flex items-center justify-between">
                    <div>
                      <h2 className="text-xl font-bold text-gray-900 mb-1">Activity History</h2>
                      <p className="text-sm text-gray-400">All interactions and bookings sorted by date.</p>
                    </div>
                    <div className="flex gap-2">
                      <span className="flex items-center gap-1.5 text-[10px] font-bold text-blue-500 bg-blue-50 px-2.5 py-1 rounded-full uppercase">Table</span>
                      <span className="flex items-center gap-1.5 text-[10px] font-bold text-pink-500 bg-pink-50 px-2.5 py-1 rounded-full uppercase">Event</span>
                      <span className="flex items-center gap-1.5 text-[10px] font-bold text-amber-500 bg-amber-50 px-2.5 py-1 rounded-full uppercase">Inquiry</span>
                    </div>
                  </div>

                  <div className="relative border-l-2 border-gray-50 ml-3 pl-10 space-y-10">
                    {history.map((item) => {
                      const colorClass = item.type === "Table" ? "text-blue-500 bg-blue-50" : item.type === "Event" ? "text-pink-500 bg-pink-50" : "text-amber-500 bg-amber-50";
                      const dotColor = item.type === "Table" ? "bg-blue-500" : item.type === "Event" ? "bg-pink-500" : "bg-amber-500";

                      return (
                        <div key={item.id} className="relative group">
                          {/* Timeline Dot */}
                          <div className={`absolute -left-[51px] top-0 w-5 h-5 rounded-full border-4 border-[#F9F6F6] ${dotColor} shadow-sm group-hover:scale-125 transition-transform duration-300`} />

                          <div className="bg-white border border-gray-100 p-6 rounded-3xl transition-all duration-300 group-hover:shadow-xl group-hover:shadow-gray-100/50 group-hover:-translate-y-1 relative">
                            <div className="flex items-center justify-between mb-3">
                              <span className={`text-[10px] font-black px-3 py-1 rounded-lg uppercase tracking-wider ${colorClass}`}>
                                {item.type}
                              </span>
                              <span className="text-[11px] font-bold text-gray-300">{formatDisplayDate(item.date)}</span>
                            </div>
                            <h4 className="text-base font-bold text-gray-800 mb-1.5">{item.title}</h4>
                            <p className="text-sm text-gray-500 leading-relaxed mb-4">{item.details}</p>
                            <div className="flex items-center justify-between pt-4 border-t border-gray-50">
                              <div className="flex items-center gap-1.5 text-xs text-gray-400">
                                <Clock size={14} />
                                <span>Status:</span>
                                <span className={`font-bold ${item.status === 'CONFIRMED' || item.status === 'COMPLETED' ? 'text-emerald-500' : 'text-amber-500'}`}>
                                  {item.status}
                                </span>
                              </div>
                              <button className="text-[11px] font-bold text-pink-500 hover:underline uppercase tracking-widest">
                                Details
                              </button>
                            </div>
                          </div>
                        </div>
                      );
                    })}

                    {history.length === 0 && (
                      <div className="py-20 text-center bg-gray-50/50 rounded-[40px] border border-dashed border-gray-100 -ml-4">
                        <History className="w-12 h-12 text-gray-200 mx-auto mb-4" />
                        <p className="text-sm text-gray-300 font-medium">No activity history recorded yet.</p>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

const Clock = ({ className, size }: { className?: string, size?: number }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size || "24"} height={size || "24"}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <circle cx="12" cy="12" r="10" />
    <polyline points="12 6 12 12 16 14" />
  </svg>
);
