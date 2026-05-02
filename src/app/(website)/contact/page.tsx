"use client";

import { PageTransition } from "@/components/ui/PageTransition";
import { useLanguage } from "@/context/LanguageContext";
import { createContactSubmission } from "@/lib/api";
import type {
  ContactRole,
  CreateContactSubmissionInput,
  SubmissionDetail,
} from "@/types/contact-submission";
import { AnimatePresence, motion } from "framer-motion";
import { AlertCircle, CheckCircle2, Loader2 } from "lucide-react";
import React, { useState } from "react";
import { websiteHeroTitleClassName } from "@/lib/website-typography";

type Role = ContactRole | "none";
type FormValues = Record<string, string>;
type SubmitStatus = "idle" | "loading" | "success" | "error";

interface FieldConfig {
  key: string;
  labelZh: string;
  labelEn: string;
  placeholderZh: string;
  placeholderEn: string;
  type?: "text" | "email" | "tel" | "textarea";
  required?: boolean;
  rows?: number;
  accent?: boolean;
  span?: "full" | "half";
}

interface RoleConfig {
  roleLabelZh: string;
  roleLabelEn: string;
  submitLabelZh: string;
  submitLabelEn: string;
  buttonClassName: string;
  helperZh: string;
  helperEn: string;
  fields: FieldConfig[];
  normalize: (
    values: FormValues
  ) => Pick<CreateContactSubmissionInput, "companyOrOrg" | "region" | "summary">;
}

const commonContactFields: FieldConfig[] = [
  {
    key: "contactName",
    labelZh: "联系人",
    labelEn: "Contact Name",
    placeholderZh: "您的称呼",
    placeholderEn: "Your Name",
    required: true,
    span: "half",
  },
  {
    key: "phone",
    labelZh: "联系电话",
    labelEn: "Phone Number",
    placeholderZh: "手机号 / 微信号",
    placeholderEn: "Phone / WeChat",
    type: "tel",
    required: true,
    span: "half",
  },
  {
    key: "email",
    labelZh: "电子邮箱",
    labelEn: "Email Address",
    placeholderZh: "邮箱地址（选填）",
    placeholderEn: "Email Address (Optional)",
    type: "email",
    span: "full",
  },
];

const roleConfigs: Record<ContactRole, RoleConfig> = {
  project: {
    roleLabelZh: "项目合作",
    roleLabelEn: "Project Collaboration",
    submitLabelZh: "递交项目数据室",
    submitLabelEn: "Submit to Data Room",
    buttonClassName:
      "bg-[#FFFFFF] text-[#000000] hover:bg-white disabled:bg-white/70 disabled:text-black/60",
    helperZh: "提交后我们会在 1-2 个工作日内联系您，进一步安排项目沟通。",
    helperEn:
      "Our team will reach out within 1-2 business days to continue the project discussion.",
    fields: [
      {
        key: "companyName",
        labelZh: "企业全称与核心实业领域",
        labelEn: "Company Name & Core Industry",
        placeholderZh: "企业全称与核心实业领域",
        placeholderEn: "Company Name & Core Industry",
        required: true,
        span: "full",
      },
      {
        key: "currentStage",
        labelZh: "当前阶段",
        labelEn: "Current Stage",
        placeholderZh: "当前阶段 (天使/A轮/拟IPO等)",
        placeholderEn: "Current Stage",
        required: true,
        span: "half",
      },
      {
        key: "requirement",
        labelZh: "核心诉求",
        labelEn: "Key Requirements",
        placeholderZh: "核心诉求 (资金/模型重构)",
        placeholderEn: "Key Requirements",
        required: true,
        span: "half",
      },
      {
        key: "bpLink",
        labelZh: "商业计划书链接",
        labelEn: "Business Plan Link",
        placeholderZh: "商业计划书 / 云盘链接（选填）",
        placeholderEn: "Business Plan / Drive Link (Optional)",
        span: "full",
      },
    ],
    normalize: (values) => ({
      companyOrOrg: values.companyName.trim(),
      summary: values.requirement.trim(),
    }),
  },
  partner: {
    roleLabelZh: "加盟合作",
    roleLabelEn: "Regional Partner",
    submitLabelZh: "开启极核区域授权面审",
    submitLabelEn: "Start Regional Interview",
    buttonClassName:
      "bg-[#b7893b] text-black hover:bg-[#eac448] disabled:bg-[#b7893b]/70 disabled:text-black/60",
    helperZh: "提交后将进入区域合作初筛，我们会尽快与您确认后续面谈安排。",
    helperEn:
      "Your submission will enter our initial partner review, and we will follow up on the next interview step.",
    fields: [
      {
        key: "targetRegion",
        labelZh: "目标区域",
        labelEn: "Target Region",
        placeholderZh: "意向锁定的城市或省区",
        placeholderEn: "Target Region",
        required: true,
        span: "full",
      },
      {
        key: "capitalOverview",
        labelZh: "基础资金池准备概览",
        labelEn: "Capital Commitment Overview",
        placeholderZh: "基础资金池准备概览",
        placeholderEn: "Capital Commitment Overview",
        required: true,
        span: "full",
      },
      {
        key: "localResources",
        labelZh: "本地资源说明",
        labelEn: "Local Resources",
        placeholderZh: "简述您在当地的政商壁垒或核心实业产业群资源...",
        placeholderEn: "Briefly describe your local resources...",
        type: "textarea",
        rows: 3,
        required: true,
        span: "full",
      },
    ],
    normalize: (values) => ({
      region: values.targetRegion.trim(),
      summary: values.localResources.trim(),
    }),
  },
  club: {
    roleLabelZh: "会员入会",
    roleLabelEn: "Membership Inquiries",
    submitLabelZh: "提交后台资质核验",
    submitLabelEn: "Submit for Verification",
    buttonClassName:
      "border border-white text-white hover:bg-white hover:text-black disabled:border-white/30 disabled:text-white/40",
    helperZh: "会员申请将进入资质核验流程，请确保推荐人与基础信息准确完整。",
    helperEn:
      "Membership applications enter a qualification review, so please make sure the referrer and core information are accurate.",
    fields: [
      {
        key: "industryBackground",
        labelZh: "行业背景",
        labelEn: "Industry Background",
        placeholderZh: "您的行业背景与从业经历",
        placeholderEn: "Industry Background",
        required: true,
        span: "half",
      },
      {
        key: "referrer",
        labelZh: "圈内推荐人",
        labelEn: "Referrer",
        placeholderZh: "圈内推荐人 (必填项)",
        placeholderEn: "Referrer (Required)",
        required: true,
        accent: true,
        span: "half",
      },
      {
        key: "netWorth",
        labelZh: "基础验资证明",
        labelEn: "Proof of Net Worth",
        placeholderZh: "基础验资证明 (流动性资产声明)",
        placeholderEn: "Proof of Net Worth",
        required: true,
        span: "full",
      },
      {
        key: "joinReason",
        labelZh: "入会核心动机",
        labelEn: "Reason for Joining",
        placeholderZh: "入会核心动机 (学习圈层/锁定内定跟投权等)...",
        placeholderEn: "Reason for joining...",
        type: "textarea",
        rows: 2,
        required: true,
        span: "full",
      },
    ],
    normalize: (values) => ({
      summary: values.joinReason.trim(),
    }),
  },
  institution: {
    roleLabelZh: "机构同盟",
    roleLabelEn: "Institutional Alliance",
    submitLabelZh: "接驳基金管理人通道",
    submitLabelEn: "Connect with Fund Managers",
    buttonClassName:
      "bg-[#FFFFFF] text-[#000000] hover:bg-white disabled:bg-white/70 disabled:text-black/60",
    helperZh: "提交后将由相关基金管理人与您对接合作模型与资金安排。",
    helperEn:
      "Relevant fund managers will review your submission and follow up on structure and capital arrangements.",
    fields: [
      {
        key: "institutionName",
        labelZh: "机构主体名称与资本性质",
        labelEn: "Institution Name & Capital Nature",
        placeholderZh: "机构主体名称与资本性质",
        placeholderEn: "Institution Name & Capital Nature",
        required: true,
        span: "full",
      },
      {
        key: "aum",
        labelZh: "AUM 资产管理规模",
        labelEn: "AUM",
        placeholderZh: "AUM 资产管理规模",
        placeholderEn: "AUM",
        required: true,
        span: "half",
      },
      {
        key: "focus",
        labelZh: "投资偏好/赛道",
        labelEn: "Investment Focus",
        placeholderZh: "投资偏好/赛道",
        placeholderEn: "Investment Focus",
        required: true,
        span: "half",
      },
      {
        key: "cooperationModel",
        labelZh: "联合投资模型说明",
        labelEn: "Joint Investment Model Overview",
        placeholderZh: "联合投资模型或资金接驳方案简述...",
        placeholderEn: "Joint Investment Model Overview...",
        type: "textarea",
        rows: 2,
        required: true,
        span: "full",
      },
    ],
    normalize: (values) => ({
      companyOrOrg: values.institutionName.trim(),
      summary: values.cooperationModel.trim(),
    }),
  },
  media: {
    roleLabelZh: "媒体活动",
    roleLabelEn: "Press & Media",
    submitLabelZh: "发送至公关枢纽处",
    submitLabelEn: "Contact PR Hub",
    buttonClassName:
      "border border-white text-white hover:bg-white hover:text-black disabled:border-white/30 disabled:text-white/40",
    helperZh: "提交后公关团队会评估合作形式，并尽快与您确认曝光与资源置换方案。",
    helperEn:
      "Our PR team will review the proposal and follow up on exposure and resource exchange opportunities.",
    fields: [
      {
        key: "mediaBrand",
        labelZh: "媒体/品牌背书",
        labelEn: "Media Outlet or Event Brand",
        placeholderZh: "所属媒体、自媒体 IP 或会议品牌背书",
        placeholderEn: "Media Outlet or Event Brand",
        required: true,
        span: "full",
      },
      {
        key: "cooperationType",
        labelZh: "合作载体形式",
        labelEn: "Type of Cooperation",
        placeholderZh: "合作载体形式",
        placeholderEn: "Type of Cooperation",
        required: true,
        span: "full",
      },
      {
        key: "proposal",
        labelZh: "详细合作提案",
        labelEn: "Detailed Proposal",
        placeholderZh: "详细资源互换方案与核心曝光量级说明...",
        placeholderEn: "Detailed cooperation proposal...",
        type: "textarea",
        rows: 3,
        required: true,
        span: "full",
      },
    ],
    normalize: (values) => ({
      companyOrOrg: values.mediaBrand.trim(),
      summary: values.proposal.trim(),
    }),
  },
};

function buildInitialValues(fields: FieldConfig[]): FormValues {
  return Object.fromEntries(fields.map((field) => [field.key, ""]));
}

function createInitialForms(): Record<ContactRole, FormValues> {
  return {
    project: buildInitialValues([...roleConfigs.project.fields, ...commonContactFields]),
    partner: buildInitialValues([...roleConfigs.partner.fields, ...commonContactFields]),
    club: buildInitialValues([...roleConfigs.club.fields, ...commonContactFields]),
    institution: buildInitialValues([...roleConfigs.institution.fields, ...commonContactFields]),
    media: buildInitialValues([...roleConfigs.media.fields, ...commonContactFields]),
  };
}

function buildDetailPayload(fields: FieldConfig[], values: FormValues): SubmissionDetail[] {
  return fields
    .map((field) => ({
      key: field.key,
      labelZh: field.labelZh,
      labelEn: field.labelEn,
      value: values[field.key]?.trim() || "",
    }))
    .filter((detail) => detail.value);
}

function ContactField({
  field,
  value,
  language,
  onChange,
}: {
  field: FieldConfig;
  value: string;
  language: "zh" | "en";
  onChange: (value: string) => void;
}) {
  const placeholder = language === "zh" ? field.placeholderZh : field.placeholderEn;
  const label = language === "zh" ? field.labelZh : field.labelEn;
  const baseClassName = `w-full bg-transparent border-b pb-4 text-lg focus:outline-none transition-colors resize-none ${
    field.accent
      ? "border-[#b7893b]/50 text-[#b7893b] placeholder:text-[#b7893b]/40 focus:border-[#b7893b]"
      : "border-white/10 text-white placeholder:text-white focus:border-white"
  }`;

  return (
    <label className={field.span === "full" ? "md:col-span-2" : ""}>
      <span className="sr-only">{label}</span>
      {field.type === "textarea" ? (
        <textarea
          rows={field.rows || 3}
          value={value}
          onChange={(event) => onChange(event.target.value)}
          placeholder={placeholder}
          className={baseClassName}
          required={field.required}
        />
      ) : (
        <input
          type={field.type || "text"}
          value={value}
          onChange={(event) => onChange(event.target.value)}
          placeholder={placeholder}
          className={baseClassName}
          required={field.required}
        />
      )}
    </label>
  );
}

export default function ContactPage() {
  const { t, language } = useLanguage();
  const [role, setRole] = useState<Role>("none");
  const [forms, setForms] = useState<Record<ContactRole, FormValues>>(() => createInitialForms());
  const [submitState, setSubmitState] = useState<{
    role: ContactRole | null;
    status: SubmitStatus;
    message: string;
  }>({
    role: null,
    status: "idle",
    message: "",
  });

  React.useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash.replace("#", "");
      if (["project", "cooperation"].includes(hash)) setRole("project");
      else if (["partner", "partner-join"].includes(hash)) setRole("partner");
      else if (["club", "member-apply"].includes(hash)) setRole("club");
      else if (["institution", "institution-coop"].includes(hash)) setRole("institution");
      else if (["media", "media-coop"].includes(hash)) setRole("media");
      else if (hash === "form") setRole("project");
    };

    handleHash();
    window.addEventListener("hashchange", handleHash);
    return () => window.removeEventListener("hashchange", handleHash);
  }, []);

  const updateField = (targetRole: ContactRole, key: string, value: string) => {
    setForms((current) => ({
      ...current,
      [targetRole]: {
        ...current[targetRole],
        [key]: value,
      },
    }));
  };

  const resetRoleForm = (targetRole: ContactRole) => {
    const config = roleConfigs[targetRole];
    setForms((current) => ({
      ...current,
      [targetRole]: buildInitialValues([...config.fields, ...commonContactFields]),
    }));
  };

  const handleRoleChange = (value: Role) => {
    setRole(value);
    setSubmitState({
      role: null,
      status: "idle",
      message: "",
    });
  };

  const handleSubmit = async (
    event: React.FormEvent<HTMLFormElement>,
    targetRole: ContactRole
  ) => {
    event.preventDefault();

    const config = roleConfigs[targetRole];
    const currentValues = forms[targetRole];
    const details = buildDetailPayload(
      [...config.fields, ...commonContactFields],
      currentValues
    );
    const normalized = config.normalize(currentValues);

    setSubmitState({
      role: targetRole,
      status: "loading",
      message: "",
    });

    try {
      await createContactSubmission({
        role: targetRole,
        roleLabelZh: config.roleLabelZh,
        roleLabelEn: config.roleLabelEn,
        submitterName: currentValues.contactName.trim(),
        phone: currentValues.phone.trim(),
        email: currentValues.email.trim(),
        companyOrOrg: normalized.companyOrOrg?.trim() || "",
        region: normalized.region?.trim() || "",
        summary: normalized.summary?.trim() || "",
        details,
      });

      resetRoleForm(targetRole);
      setSubmitState({
        role: targetRole,
        status: "success",
        message: t(
          "提交成功，我们已收到您的资料。",
          "Submitted successfully. We have received your information."
        ),
      });
    } catch (error) {
      setSubmitState({
        role: targetRole,
        status: "error",
        message:
          error instanceof Error
            ? error.message
            : t("提交失败，请稍后重试。", "Submission failed. Please try again later."),
      });
    }
  };

  const activeRole = role === "none" ? null : role;
  const activeConfig = activeRole ? roleConfigs[activeRole] : null;
  const activeValues = activeRole ? forms[activeRole] : null;
  const activeSubmitState =
    activeRole && submitState.role === activeRole
      ? submitState
      : { role: null, status: "idle" as SubmitStatus, message: "" };

  return (
    <PageTransition>
      <div className="min-h-screen bg-[#000000] flex flex-col pt-20">
        <div className="flex flex-grow flex-col lg:flex-row">
          <div
            id="info"
            className="relative w-full overflow-hidden border-b border-white/5 bg-[#000000] p-10 lg:w-[40%] lg:border-b-0 lg:border-r lg:p-24"
          >
            <img
              src="/fhzb/videos/背景图_1.jpg"
              className="absolute inset-0 h-full w-full object-cover opacity-60 grayscale"
              alt="Contact Background"
            />
            <div className="absolute top-0 right-0 h-[500px] w-[500px] translate-x-1/3 -translate-y-1/3 rounded-full bg-[#b7893b]/5 blur-[100px] pointer-events-none" />
            <div className="relative z-10 flex h-full flex-col justify-center">
              <span className="mb-8 block text-xs font-bold uppercase tracking-[0.4em] text-[#b7893b] underline decoration-[#b7893b]">
                {t("接入门户", "Access Portal")}
              </span>
              <h1 className={websiteHeroTitleClassName(language, "mb-16 font-light leading-tight")}>
                {t("全业务", "Full Business")} <br />
                {t("合作通道。", "Collaboration.")}
              </h1>

              <div className="space-y-12">
                <div>
                  <h3 className="mb-4 text-[10px] font-bold uppercase tracking-[0.3em] text-[#b7893b] opacity-60">
                    {t("电子邮箱", "Email Address")}
                  </h3>
                  <a
                    href="mailto:zhenyongwv@hotmail.com"
                    className="text-xl font-light text-[#FFFFFF] transition-colors hover:text-[#b7893b] md:text-2xl"
                  >
                    zhenyongwv@hotmail.com
                  </a>
                </div>

                <div>
                  <h3 className="mb-4 text-[10px] font-bold uppercase tracking-[0.3em] text-[#b7893b] opacity-60">
                    {t("鑱旂郴鐢佃瘽", "Phone Number")}
                  </h3>
                  <a
                    href="tel:13681660460"
                    className="text-xl font-light text-[#FFFFFF] transition-colors hover:text-[#b7893b] md:text-2xl"
                  >
                    13681660460
                  </a>
                </div>

                <div>
                  <h3 className="mb-4 text-[10px] font-bold uppercase tracking-[0.3em] text-[#b7893b] opacity-60">
                    {t("总部地址", "Headquarter")}
                  </h3>
                  <p className="text-xl font-light leading-relaxed text-[#FFFFFF] md:text-2xl">
                    {t("浙江省杭州市萧山区", "Xiaoshan District, Hangzhou, Zhejiang")} <br />
                    {t(
                      "宁围街道利一路168号世华帝宝大厦1幢1901室",
                      "Room 1901, Building 1, Shihua Dibao Tower, No.168 Liyi 1st Road, Ningwei Subdistrict"
                    )}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div
            id="form"
            className="flex w-full flex-col justify-center bg-[#000000] p-10 lg:w-[60%] lg:p-32"
          >
            <div className="w-full max-w-2xl">
              <div className="mb-20">
                <label className="mb-8 block text-2xl font-serif font-light text-[#FFFFFF] lg:text-4xl">
                  {t("您希望以什么身份与峰壑结阵？", "How would you like to join the Alliance?")}
                </label>
                <div className="relative group">
                  <select
                    className="w-full appearance-none cursor-pointer border-b border-white/20 bg-transparent pb-4 text-xl font-light font-serif text-white transition-all focus:outline-none focus:border-[#b7893b] lg:text-2xl"
                    value={role}
                    onChange={(event) => handleRoleChange(event.target.value as Role)}
                  >
                    <option value="none" className="bg-[#111]">
                      -- {t("请选择战略角色", "Select Your Role")} --
                    </option>
                    <option value="project" className="bg-[#111]">
                      {t("项目合作 (寻求资本赋能)", "Project Collaboration")}
                    </option>
                    <option value="partner" className="bg-[#111]">
                      {t("加盟合作 (区域主理人)", "Regional Partner")}
                    </option>
                    <option value="club" className="bg-[#111]">
                      {t("会员入会 (圈层加入)", "Membership Inquiries")}
                    </option>
                    <option value="institution" className="bg-[#111]">
                      {t("机构同盟 (LP/GP 互动)", "Institutional Alliance")}
                    </option>
                    <option value="media" className="bg-[#111]">
                      {t("媒体活动 (公关合作)", "Press & Media")}
                    </option>
                  </select>
                  <div className="absolute right-0 bottom-6 pointer-events-none text-[#b7893b] opacity-40">
                    ↓
                  </div>
                </div>
              </div>

              <AnimatePresence mode="wait">
                {activeConfig && activeValues && activeRole ? (
                  <motion.form
                    key={activeRole}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.5 }}
                    className="space-y-10"
                    onSubmit={(event) => void handleSubmit(event, activeRole)}
                  >
                    <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                      {activeConfig.fields.map((field) => (
                        <ContactField
                          key={field.key}
                          field={field}
                          value={activeValues[field.key]}
                          language={language}
                          onChange={(value) => updateField(activeRole, field.key, value)}
                        />
                      ))}
                    </div>

                    <div className="space-y-6 rounded-3xl border border-white/10 bg-white/[0.02] p-6 lg:p-8">
                      <div>
                        <p className="text-xs font-bold uppercase tracking-[0.32em] text-[#b7893b]">
                          {t("联系人信息", "Contact Information")}
                        </p>
                        <p className="mt-3 text-sm leading-7 text-white/50">
                          {t(activeConfig.helperZh, activeConfig.helperEn)}
                        </p>
                      </div>

                      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                        {commonContactFields.map((field) => (
                          <ContactField
                            key={field.key}
                            field={field}
                            value={activeValues[field.key]}
                            language={language}
                            onChange={(value) => updateField(activeRole, field.key, value)}
                          />
                        ))}
                      </div>
                    </div>

                    {activeSubmitState.status === "success" ? (
                      <div className="flex items-center gap-3 rounded-2xl border border-emerald-500/30 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-300">
                        <CheckCircle2 className="h-4 w-4 shrink-0" />
                        <span>{activeSubmitState.message}</span>
                      </div>
                    ) : null}

                    {activeSubmitState.status === "error" ? (
                      <div className="flex items-center gap-3 rounded-2xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-300">
                        <AlertCircle className="h-4 w-4 shrink-0" />
                        <span>{activeSubmitState.message}</span>
                      </div>
                    ) : null}

                    <button
                      type="submit"
                      disabled={activeSubmitState.status === "loading"}
                      className={`mt-8 w-full px-12 py-5 text-sm font-bold uppercase tracking-widest transition-colors ${activeConfig.buttonClassName}`}
                    >
                      {activeSubmitState.status === "loading" ? (
                        <span className="inline-flex items-center gap-2">
                          <Loader2 className="h-4 w-4 animate-spin" />
                          {t("提交中...", "Submitting...")}
                        </span>
                      ) : (
                        t(activeConfig.submitLabelZh, activeConfig.submitLabelEn)
                      )}
                    </button>
                  </motion.form>
                ) : null}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </PageTransition>
  );
}
