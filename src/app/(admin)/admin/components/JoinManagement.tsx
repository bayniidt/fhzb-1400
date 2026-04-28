"use client";

import { useEffect, useMemo, useState } from "react";
import {
  Building2,
  CheckCircle2,
  Clock3,
  Loader2,
  Mail,
  MapPin,
  Phone,
  RefreshCw,
  Save,
  Trash2,
  Users2,
} from "lucide-react";

import {
  deleteContactSubmission,
  fetchContactSubmissions,
  updateContactSubmission,
} from "@/lib/api";
import type {
  ContactRole,
  ContactSubmission,
  SubmissionStatus,
} from "@/types/contact-submission";

type RoleFilter = "all" | ContactRole;
type StatusFilter = "all" | SubmissionStatus;

const roleOptions: Array<{ value: RoleFilter; label: string }> = [
  { value: "all", label: "全部表单" },
  { value: "partner", label: "加盟合作" },
  { value: "project", label: "项目合作" },
  { value: "club", label: "会员入会" },
  { value: "institution", label: "机构同盟" },
  { value: "media", label: "媒体活动" },
];

const statusOptions: Array<{ value: StatusFilter; label: string }> = [
  { value: "all", label: "全部状态" },
  { value: "pending", label: "待跟进" },
  { value: "contacted", label: "跟进中" },
  { value: "closed", label: "已完成" },
];

const statusStyles: Record<SubmissionStatus, string> = {
  pending: "bg-amber-400/10 text-amber-300 border border-amber-400/30",
  contacted: "bg-sky-400/10 text-sky-300 border border-sky-400/30",
  closed: "bg-emerald-400/10 text-emerald-300 border border-emerald-400/30",
};

const formatDate = (value: string) =>
  new Intl.DateTimeFormat("zh-CN", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(value));

export default function JoinManagement() {
  const [submissions, setSubmissions] = useState<ContactSubmission[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [savingId, setSavingId] = useState<number | null>(null);
  const [deletingId, setDeletingId] = useState<number | null>(null);
  const [roleFilter, setRoleFilter] = useState<RoleFilter>("all");
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("all");

  const loadSubmissions = async () => {
    try {
      setError("");
      const data = await fetchContactSubmissions();
      setSubmissions(data);
    } catch (err) {
      const message = err instanceof Error ? err.message : "加载表单失败";
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void loadSubmissions();
  }, []);

  const filteredSubmissions = useMemo(
    () =>
      submissions.filter((item) => {
        const roleMatched = roleFilter === "all" || item.role === roleFilter;
        const statusMatched = statusFilter === "all" || item.status === statusFilter;
        return roleMatched && statusMatched;
      }),
    [roleFilter, statusFilter, submissions]
  );

  const stats = useMemo(() => {
    const pendingCount = submissions.filter((item) => item.status === "pending").length;
    const contactedCount = submissions.filter((item) => item.status === "contacted").length;
    const closedCount = submissions.filter((item) => item.status === "closed").length;

    return [
      {
        label: "总提交数",
        value: submissions.length,
        icon: Users2,
        color: "text-[#b7893b]",
      },
      {
        label: "待跟进",
        value: pendingCount,
        icon: Clock3,
        color: "text-amber-300",
      },
      {
        label: "跟进中",
        value: contactedCount,
        icon: Phone,
        color: "text-sky-300",
      },
      {
        label: "已完成",
        value: closedCount,
        icon: CheckCircle2,
        color: "text-emerald-300",
      },
    ];
  }, [submissions]);

  const handleLocalChange = (
    id: number,
    field: "status" | "adminNote",
    value: string
  ) => {
    setSubmissions((current) =>
      current.map((item) =>
        item.id === id
          ? {
              ...item,
              [field]: value,
            }
          : item
      )
    );
  };

  const handleSave = async (submission: ContactSubmission) => {
    setSavingId(submission.id);
    setError("");

    try {
      const result = await updateContactSubmission(submission.id, {
        status: submission.status,
        adminNote: submission.adminNote,
      });

      setSubmissions((current) =>
        current.map((item) => (item.id === submission.id ? result.submission : item))
      );
    } catch (err) {
      const message = err instanceof Error ? err.message : "保存失败";
      setError(message);
    } finally {
      setSavingId(null);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("确认删除这条表单记录吗？")) {
      return;
    }

    setDeletingId(id);
    setError("");

    try {
      await deleteContactSubmission(id);
      setSubmissions((current) => current.filter((item) => item.id !== id));
    } catch (err) {
      const message = err instanceof Error ? err.message : "删除失败";
      setError(message);
    } finally {
      setDeletingId(null);
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-[320px] items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-[#b7893b]" />
      </div>
    );
  }

  return (
    <div className="space-y-8 pb-20">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <h1 className="mb-2 text-3xl font-serif font-bold text-white">加盟管理</h1>
          <p className="text-white/50">
            统一查看官网联系页提交的加盟、合作与媒体表单，并记录跟进进度。
          </p>
        </div>

        <button
          onClick={() => void loadSubmissions()}
          className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-bold text-white/70 transition-all hover:border-[#b7893b]/40 hover:text-white"
        >
          <RefreshCw className="h-4 w-4" />
          刷新列表
        </button>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="rounded-2xl border border-white/10 bg-white/5 p-6"
          >
            <div className="mb-4 flex items-center justify-between">
              <div className={`rounded-xl bg-white/5 p-3 ${stat.color}`}>
                <stat.icon className="h-5 w-5" />
              </div>
            </div>
            <p className="text-sm text-white/50">{stat.label}</p>
            <p className="mt-1 text-3xl font-bold text-white">{stat.value}</p>
          </div>
        ))}
      </div>

      <div className="flex flex-col gap-4 rounded-2xl border border-white/10 bg-white/5 p-5">
        <div className="flex flex-wrap gap-2">
          {roleOptions.map((option) => (
            <button
              key={option.value}
              onClick={() => setRoleFilter(option.value)}
              className={`rounded-full px-4 py-2 text-sm font-medium transition-all ${
                roleFilter === option.value
                  ? "bg-[#b7893b] text-black"
                  : "bg-white/5 text-white/60 hover:bg-white/10 hover:text-white"
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>

        <div className="flex flex-wrap gap-2">
          {statusOptions.map((option) => (
            <button
              key={option.value}
              onClick={() => setStatusFilter(option.value)}
              className={`rounded-full px-4 py-2 text-sm font-medium transition-all ${
                statusFilter === option.value
                  ? "bg-white text-black"
                  : "bg-black/30 text-white/60 hover:bg-white/10 hover:text-white"
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>

      {error ? (
        <div className="rounded-2xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-300">
          {error}
        </div>
      ) : null}

      <div className="overflow-hidden rounded-3xl border border-white/10 bg-[#0f0f0f]">
        {filteredSubmissions.length === 0 ? (
          <div className="flex min-h-[240px] flex-col items-center justify-center px-6 text-center text-white/40">
            <Users2 className="mb-4 h-12 w-12 opacity-40" />
            <p className="text-lg text-white/70">当前筛选条件下暂无提交记录</p>
            <p className="mt-2 text-sm">前台用户提交后会自动出现在这里。</p>
          </div>
        ) : (
          filteredSubmissions.map((item, index) => (
            <section
              key={item.id}
              className={`space-y-5 p-6 lg:p-8 ${
                index !== filteredSubmissions.length - 1 ? "border-b border-white/10" : ""
              }`}
            >
              <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                <div className="space-y-3">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="rounded-full bg-[#b7893b]/15 px-3 py-1 text-xs font-bold text-[#d9b36a]">
                      {item.roleLabelZh}
                    </span>
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-bold ${statusStyles[item.status]}`}
                    >
                      {statusOptions.find((option) => option.value === item.status)?.label}
                    </span>
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-white">{item.submitterName}</h2>
                    <p className="mt-1 text-sm text-white/40">
                      提交时间：{formatDate(item.createdAt)}
                    </p>
                  </div>
                </div>

                <div className="rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-white/60">
                  最近更新：{formatDate(item.updatedAt)}
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
                <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                  <p className="mb-2 flex items-center gap-2 text-xs uppercase tracking-[0.18em] text-white/35">
                    <Phone className="h-3.5 w-3.5" />
                    电话
                  </p>
                  <p className="text-sm text-white">{item.phone}</p>
                </div>

                <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                  <p className="mb-2 flex items-center gap-2 text-xs uppercase tracking-[0.18em] text-white/35">
                    <Mail className="h-3.5 w-3.5" />
                    邮箱
                  </p>
                  <p className="text-sm text-white">{item.email || "未填写"}</p>
                </div>

                <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                  <p className="mb-2 flex items-center gap-2 text-xs uppercase tracking-[0.18em] text-white/35">
                    <Building2 className="h-3.5 w-3.5" />
                    主体
                  </p>
                  <p className="text-sm text-white">{item.companyOrOrg || "未填写"}</p>
                </div>

                <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                  <p className="mb-2 flex items-center gap-2 text-xs uppercase tracking-[0.18em] text-white/35">
                    <MapPin className="h-3.5 w-3.5" />
                    区域
                  </p>
                  <p className="text-sm text-white">{item.region || "未填写"}</p>
                </div>
              </div>

              {item.summary ? (
                <div className="rounded-2xl border border-[#b7893b]/20 bg-[#b7893b]/5 p-5">
                  <p className="mb-2 text-xs uppercase tracking-[0.18em] text-[#d9b36a]/70">
                    核心摘要
                  </p>
                  <p className="whitespace-pre-wrap text-sm leading-7 text-white/85">
                    {item.summary}
                  </p>
                </div>
              ) : null}

              <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
                {item.details
                  .filter((detail) => detail.value)
                  .map((detail) => (
                    <div
                      key={`${item.id}-${detail.key}`}
                      className="rounded-2xl border border-white/10 bg-white/[0.02] p-4"
                    >
                      <p className="mb-2 text-xs uppercase tracking-[0.18em] text-white/35">
                        {detail.labelZh}
                      </p>
                      <p className="whitespace-pre-wrap text-sm leading-7 text-white/85">
                        {detail.value}
                      </p>
                    </div>
                  ))}
              </div>

              <div className="grid grid-cols-1 gap-4 xl:grid-cols-[220px_minmax(0,1fr)_auto] xl:items-start">
                <div className="space-y-2">
                  <label className="block text-xs uppercase tracking-[0.18em] text-white/35">
                    跟进状态
                  </label>
                  <select
                    value={item.status}
                    onChange={(event) =>
                      handleLocalChange(item.id, "status", event.target.value)
                    }
                    className="w-full rounded-xl border border-white/10 bg-black px-4 py-3 text-sm text-white outline-none transition-all focus:border-[#b7893b]"
                  >
                    <option value="pending">待跟进</option>
                    <option value="contacted">跟进中</option>
                    <option value="closed">已完成</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="block text-xs uppercase tracking-[0.18em] text-white/35">
                    管理备注
                  </label>
                  <textarea
                    rows={3}
                    value={item.adminNote}
                    onChange={(event) =>
                      handleLocalChange(item.id, "adminNote", event.target.value)
                    }
                    placeholder="记录沟通进展、意向等级或后续安排..."
                    className="w-full rounded-2xl border border-white/10 bg-black px-4 py-3 text-sm text-white outline-none transition-all placeholder:text-white/25 focus:border-[#b7893b]"
                  />
                </div>

                <div className="flex flex-row gap-3 xl:flex-col">
                  <button
                    onClick={() => void handleSave(item)}
                    disabled={savingId === item.id}
                    className="inline-flex min-w-[116px] items-center justify-center gap-2 rounded-xl bg-[#b7893b] px-4 py-3 text-sm font-bold text-black transition-all hover:bg-[#a67c35] disabled:opacity-50"
                  >
                    {savingId === item.id ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <Save className="h-4 w-4" />
                    )}
                    保存
                  </button>

                  <button
                    onClick={() => void handleDelete(item.id)}
                    disabled={deletingId === item.id}
                    className="inline-flex min-w-[116px] items-center justify-center gap-2 rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm font-bold text-red-300 transition-all hover:bg-red-500/20 disabled:opacity-50"
                  >
                    {deletingId === item.id ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <Trash2 className="h-4 w-4" />
                    )}
                    删除
                  </button>
                </div>
              </div>
            </section>
          ))
        )}
      </div>
    </div>
  );
}
