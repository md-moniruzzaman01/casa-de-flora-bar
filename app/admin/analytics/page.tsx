"use client";

import React, { useEffect, useState } from "react";
import { Activity, Users, FileText, MousePointerClick, RefreshCw, AlertCircle } from "lucide-react";
import { api } from "@/lib/api";

interface DailyHit {
  date: string;
  count: number;
}

interface MonthlyTraffic {
  month: string;
  count: number;
}

interface TopPage {
  path: string;
  count: number;
}

interface AnalyticsData {
  dailyHits: DailyHit[];
  monthlyTraffic: MonthlyTraffic[];
  topPages: TopPage[];
  summary: {
    totalVisits: number;
    uniqueVisitors: number;
  };
}

// Helper to format dates like "May 12"
function formatDate(dateStr: string) {
  const d = new Date(dateStr);
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

// Helper to format months like "May 2026"
function formatMonth(monthStr: string) {
  const [year, month] = monthStr.split("-");
  const d = new Date(parseInt(year), parseInt(month) - 1, 1);
  return d.toLocaleDateString("en-US", { month: "long", year: "numeric" });
}

export default function AnalyticsPage() {
  const [data, setData] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [days, setDays] = useState(30);

  const fetchAnalytics = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await api.get<{ data: AnalyticsData }>(`/api/analytics/stats?days=${days}`);
      setData(res.data);
    } catch (e) {
      setError("Failed to load analytics data.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAnalytics();
  }, [days]);

  // Stat Card Component
  const StatCard = ({
    title,
    value,
    icon: Icon,
    colorClass,
  }: {
    title: string;
    value: string | number;
    icon: React.ElementType;
    colorClass: string;
  }) => (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex items-center gap-5 transition-transform hover:-translate-y-1">
      <div className={`w-14 h-14 rounded-full flex items-center justify-center flex-shrink-0 ${colorClass}`}>
        <Icon size={24} />
      </div>
      <div>
        <p className="text-sm font-medium text-gray-500 mb-1">{title}</p>
        <p className="text-3xl font-bold text-gray-900">{value}</p>
      </div>
    </div>
  );

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8 animate-in fade-in duration-500">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
            <Activity className="text-pink-500" />
            Website Analytics
          </h1>
          <p className="text-gray-500 mt-1">Monitor your traffic, visitors, and most popular pages.</p>
        </div>
        <div className="flex items-center gap-3">
          <select
            value={days}
            onChange={(e) => setDays(Number(e.target.value))}
            className="px-4 py-2 bg-white border border-gray-200 rounded-xl text-sm font-medium text-gray-700 shadow-sm outline-none focus:ring-2 focus:ring-pink-100 cursor-pointer"
          >
            <option value={7}>Last 7 Days</option>
            <option value={30}>Last 30 Days</option>
            <option value={90}>Last 90 Days</option>
          </select>
          <button
            onClick={fetchAnalytics}
            className="p-2.5 bg-white border border-gray-200 rounded-xl text-gray-500 hover:text-pink-500 hover:bg-pink-50 transition-colors shadow-sm"
          >
            <RefreshCw size={18} className={loading ? "animate-spin text-pink-500" : ""} />
          </button>
        </div>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-100 rounded-2xl p-4 flex items-center gap-3 text-red-600">
          <AlertCircle size={20} />
          <p>{error}</p>
          <button onClick={fetchAnalytics} className="ml-auto underline text-sm font-medium">Retry</button>
        </div>
      )}

      {loading && !data ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-pulse">
          {[1, 2, 3].map(i => <div key={i} className="h-32 bg-gray-100 rounded-2xl" />)}
          <div className="h-80 bg-gray-100 rounded-2xl md:col-span-2" />
          <div className="h-80 bg-gray-100 rounded-2xl" />
        </div>
      ) : data ? (
        <>
          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <StatCard
              title={`Total Visits (${days} days)`}
              value={data.summary.totalVisits}
              icon={MousePointerClick}
              colorClass="bg-pink-100 text-pink-600"
            />
            <StatCard
              title={`Unique Visitors (${days} days)`}
              value={data.summary.uniqueVisitors}
              icon={Users}
              colorClass="bg-purple-100 text-purple-600"
            />
            <StatCard
              title="Avg. Pages / Visitor"
              value={data.summary.uniqueVisitors > 0 ? (data.summary.totalVisits / data.summary.uniqueVisitors).toFixed(1) : 0}
              icon={FileText}
              colorClass="bg-emerald-100 text-emerald-600"
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Daily Traffic Chart */}
            <div className="lg:col-span-2 bg-white rounded-3xl p-7 shadow-sm border border-gray-100 flex flex-col">
              <div className="mb-8">
                <h2 className="text-lg font-bold text-gray-900">Daily Visitors</h2>
                <p className="text-sm text-gray-500">Traffic trends over the selected period</p>
              </div>

              {data.dailyHits.length === 0 ? (
                <div className="flex-1 flex items-center justify-center text-gray-400 text-sm">
                  No data available for this period.
                </div>
              ) : (
                <div className="flex-1 flex items-end gap-2 h-64 mt-auto">
                  {(() => {
                    const maxHits = Math.max(...data.dailyHits.map(d => d.count), 1);
                    // If too many days, show a subset to avoid crowding
                    const displayData = data.dailyHits.length > 30 
                      ? data.dailyHits.filter((_, i) => i % Math.ceil(data.dailyHits.length / 30) === 0) 
                      : data.dailyHits;

                    return displayData.map((day, i) => {
                      const heightPercent = (day.count / maxHits) * 100;
                      return (
                        <div key={i} className="flex-1 flex flex-col items-center group relative">
                          {/* Tooltip */}
                          <div className="absolute -top-10 bg-gray-900 text-white text-xs py-1 px-2 rounded opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity whitespace-nowrap z-10">
                            {formatDate(day.date)}: {day.count} visits
                          </div>
                          {/* Bar */}
                          <div 
                            className="w-full bg-pink-100 group-hover:bg-pink-400 rounded-t-sm transition-all duration-300 relative overflow-hidden"
                            style={{ height: `${Math.max(heightPercent, 2)}%` }}
                          >
                            <div className="absolute inset-x-0 bottom-0 bg-pink-500 opacity-20" style={{ height: "100%" }} />
                          </div>
                          {/* Label (only show few if many) */}
                          {displayData.length <= 14 || i % 3 === 0 ? (
                            <span className="text-[10px] text-gray-400 mt-2 truncate w-full text-center hidden sm:block">
                              {formatDate(day.date).split(" ")[1]}
                            </span>
                          ) : <span className="h-4 mt-2" />}
                        </div>
                      );
                    });
                  })()}
                </div>
              )}
            </div>

            {/* Top Pages */}
            <div className="bg-white rounded-3xl p-7 shadow-sm border border-gray-100">
              <div className="mb-6">
                <h2 className="text-lg font-bold text-gray-900">Top Pages</h2>
                <p className="text-sm text-gray-500">Most visited URLs</p>
              </div>

              {data.topPages.length === 0 ? (
                <div className="h-40 flex items-center justify-center text-gray-400 text-sm">
                  No data available.
                </div>
              ) : (
                <div className="space-y-4">
                  {data.topPages.map((page, i) => {
                    const maxPageCount = data.topPages[0].count;
                    const widthPercent = (page.count / maxPageCount) * 100;
                    return (
                      <div key={i} className="group">
                        <div className="flex justify-between text-sm mb-1.5">
                          <span className="font-medium text-gray-700 truncate pr-4">{page.path || "/"}</span>
                          <span className="font-bold text-gray-900">{page.count}</span>
                        </div>
                        <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-gradient-to-r from-pink-400 to-pink-500 rounded-full transition-all duration-500 ease-out"
                            style={{ width: `${widthPercent}%` }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>

          {/* Monthly Traffic Breakdown */}
          <div className="bg-white rounded-3xl p-7 shadow-sm border border-gray-100 mt-6">
            <div className="mb-6">
              <h2 className="text-lg font-bold text-gray-900">Monthly Traffic Overview</h2>
              <p className="text-sm text-gray-500">Historical performance by month</p>
            </div>
            
            {data.monthlyTraffic.length === 0 ? (
               <div className="py-8 text-center text-gray-400 text-sm">No historical data available yet.</div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-gray-100 text-sm text-gray-400">
                      <th className="pb-3 font-medium">Month</th>
                      <th className="pb-3 font-medium text-right">Total Visits</th>
                      <th className="pb-3 font-medium text-right">Trend</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.monthlyTraffic.map((month, i) => {
                      const prevCount = i > 0 ? data.monthlyTraffic[i-1].count : month.count;
                      const change = month.count - prevCount;
                      const percentChange = prevCount > 0 ? (change / prevCount) * 100 : 0;
                      
                      return (
                        <tr key={i} className="border-b border-gray-50 last:border-0 hover:bg-gray-50/50 transition-colors">
                          <td className="py-4 text-sm font-medium text-gray-900">
                            {formatMonth(month.month)}
                          </td>
                          <td className="py-4 text-sm font-bold text-gray-900 text-right">
                            {month.count.toLocaleString()}
                          </td>
                          <td className="py-4 text-sm text-right">
                            {change === 0 ? (
                              <span className="text-gray-400">—</span>
                            ) : change > 0 ? (
                              <span className="inline-flex items-center gap-1 text-emerald-600 bg-emerald-50 px-2 py-1 rounded-md">
                                <span className="text-xs">↑</span> {percentChange.toFixed(1)}%
                              </span>
                            ) : (
                              <span className="inline-flex items-center gap-1 text-red-600 bg-red-50 px-2 py-1 rounded-md">
                                <span className="text-xs">↓</span> {Math.abs(percentChange).toFixed(1)}%
                              </span>
                            )}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </>
      ) : null}
    </div>
  );
}
