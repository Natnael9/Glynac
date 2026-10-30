'use client';

import React from 'react';
import {
  FileText,
  AlertTriangle,
  CheckCircle2,
  Clock,
  TrendingUp,
  ArrowUpRight,
  ShieldCheck,
} from 'lucide-react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Cell,
} from 'recharts';
import { reviewTrendData, severityDistributionData } from '@/lib/mockData/admin';
import { useTheme } from '@/lib/themeContext';

export function MetricsDashboard() {
  const { theme } = useTheme();
  const isLight = theme === 'light';
  const kpis = [
    {
      title: 'Total Documents Audited',
      value: '379',
      change: '+18.4%',
      trend: 'up',
      subtitle: 'vs previous quarter',
      icon: <FileText className="h-5 w-5 text-[#ffffff]" />,
      bg: 'bg-[#141414] border-[#333333]',
    },
    {
      title: 'Compliance Violations Flagged',
      value: '7',
      change: '-12.5%',
      trend: 'down',
      subtitle: 'promptly contained',
      icon: <AlertTriangle className="h-5 w-5 text-amber-400" />,
      bg: 'bg-amber-500/10 border-amber-500/20',
    },
    {
      title: 'Overall Audit Pass Rate',
      value: '94.2%',
      change: '+3.1%',
      trend: 'up',
      subtitle: 'SEC Rule 17a-4 benchmark',
      icon: <CheckCircle2 className="h-5 w-5 text-emerald-400" />,
      bg: 'bg-emerald-500/10 border-emerald-500/20',
    },
    {
      title: 'Avg Audit Response Time',
      value: '2.4 hrs',
      change: '-45 mins',
      trend: 'up',
      subtitle: 'AI accelerated triage',
      icon: <Clock className="h-5 w-5 text-white" />,
      bg: 'bg-[#181818] border-[#333333]',
    },
  ];

  return (
    <div className="space-y-4">
      {/* KPI Cards Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
        {kpis.map((kpi, idx) => (
          <div
            key={idx}
            className="p-4 rounded-2xl bg-[#0a0a0a] border border-[#1a1a1a] shadow-lg relative overflow-hidden"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold text-[#888888]">{kpi.title}</span>
              <div className={`p-2 rounded-xl border ${kpi.bg}`}>{kpi.icon}</div>
            </div>
            <div className="flex items-baseline gap-2 mb-1">
              <span className="text-2xl font-bold text-white tracking-tight">{kpi.value}</span>
              <span className="text-xs font-semibold text-emerald-400 flex items-center">
                <ArrowUpRight className="h-3 w-3" />
                {kpi.change}
              </span>
            </div>
            <p className="text-[11px] text-[#666666]">{kpi.subtitle}</p>
          </div>
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Trend Area Chart */}
        <div className="lg:col-span-2 p-5 rounded-2xl bg-[#0a0a0a] border border-[#1a1a1a] shadow-lg">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h4 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2">
                <TrendingUp className="h-4 w-4 text-[#ffffff]" />
                Document Review Volume & Audit Pass Rate %
              </h4>
              <p className="text-[11px] text-[#888888] mt-0.5">
                Monthly throughput across SEC filings, client agreements, and disclosure packages.
              </p>
            </div>
            <div className="flex items-center gap-3 text-xs">
              <span className="flex items-center gap-1.5 text-[#ffffff]">
                <span className={`h-2 w-2 rounded-full ${isLight ? 'bg-[#111827]' : 'bg-[#141414]'}`} />
                Audited Docs
              </span>
              <span className="flex items-center gap-1.5 text-emerald-400">
                <span className="h-2 w-2 rounded-full bg-emerald-500" />
                Pass Rate %
              </span>
            </div>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={reviewTrendData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorDocs" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={isLight ? '#111827' : '#ffffff'} stopOpacity={0.25} />
                    <stop offset="95%" stopColor={isLight ? '#111827' : '#ffffff'} stopOpacity={0.0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke={isLight ? '#e5e7eb' : '#262626'} vertical={false} />
                <XAxis dataKey="month" stroke={isLight ? '#6b7280' : '#888888'} fontSize={11} tickLine={false} />
                <YAxis stroke={isLight ? '#6b7280' : '#888888'} fontSize={11} tickLine={false} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: isLight ? '#ffffff' : '#141414',
                    borderColor: isLight ? '#e5e7eb' : '#262626',
                    borderRadius: '0.75rem',
                    fontSize: '11px',
                    color: isLight ? '#111827' : '#ededed',
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="documents"
                  stroke={isLight ? '#111827' : '#ffffff'}
                  strokeWidth={2}
                  fillOpacity={1}
                  fill="url(#colorDocs)"
                />
                <Area
                  type="monotone"
                  dataKey="passRate"
                  stroke={isLight ? '#10b981' : '#888888'}
                  strokeWidth={1.5}
                  fill="none"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Violations Severity Distribution Bar Chart */}
        <div className="p-5 rounded-2xl bg-[#0a0a0a] border border-[#1a1a1a] shadow-lg flex flex-col justify-between">
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-1 flex items-center gap-2">
              <AlertTriangle className="h-4 w-4 text-amber-400" />
              Violation Severity Breakdown
            </h4>
            <p className="text-[11px] text-[#888888] mb-4">
              Distribution of flagged clauses across active platform rules.
            </p>

            <div className="h-48 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={severityDistributionData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke={isLight ? '#e5e7eb' : '#262626'} vertical={false} />
                  <XAxis dataKey="name" stroke={isLight ? '#6b7280' : '#888888'} fontSize={11} tickLine={false} />
                  <YAxis stroke={isLight ? '#6b7280' : '#888888'} fontSize={11} tickLine={false} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: isLight ? '#ffffff' : '#141414',
                      borderColor: isLight ? '#e5e7eb' : '#262626',
                      borderRadius: '0.75rem',
                      fontSize: '11px',
                      color: isLight ? '#111827' : '#f8fafc',
                    }}
                  />
                  <Bar dataKey="count" radius={[6, 6, 0, 0]}>
                    {severityDistributionData.map((entry, index) => {
                      let fill = entry.fill;
                      if (isLight) {
                        if (entry.name === 'Critical') fill = '#e11d48';
                        if (entry.name === 'High') fill = '#d97706';
                        if (entry.name === 'Medium') fill = '#6b7280';
                        if (entry.name === 'Low') fill = '#059669';
                      }
                      return <Cell key={`cell-${index}`} fill={fill} />;
                    })}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="pt-3 border-t border-[#1a1a1a] text-center">
            <span className="text-[11px] text-emerald-400 font-semibold flex items-center justify-center gap-1">
              <ShieldCheck className="h-3.5 w-3.5" />
              100% of Critical Violations Contained in VDR
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

