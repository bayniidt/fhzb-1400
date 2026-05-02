"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Phone, ArrowRight, Loader2 } from "lucide-react";
import { login } from "@/lib/api";

export default function LoginPage() {
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const result = await login(phone);
      if (result.error) {
        setError(result.error);
        setLoading(false);
        return;
      }

      localStorage.setItem("admin_auth", "true");
      localStorage.setItem("admin_phone", result.member.phone);
      localStorage.setItem("admin_super", result.member.is_super_admin ? "true" : "false");
      router.push("/admin");
    } catch (err) {
      setError("登录失败，请稍后重试");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center p-6">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#b7893b]/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#b7893b]/5 rounded-full blur-[120px]" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md relative z-10"
      >
        <div className="text-center mb-10">
          <div className="w-20 h-20 bg-[#b7893b] rounded-2xl flex items-center justify-center font-bold text-3xl text-black mx-auto mb-6 shadow-[0_0_30px_rgba(183,137,59,0.3)]">
            FH
          </div>
          <h1 className="text-3xl font-serif font-bold text-white mb-2">峰壑资本后台管理</h1>
          <p className="text-white/40">请使用管理员账号登录</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-medium text-white/60 ml-1">手机号码</label>
            <div className="relative">
              <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/20" />
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="请输入已注册的手机号"
                className="w-full bg-white/5 border border-white/10 rounded-xl py-4 pl-12 pr-4 text-white focus:border-[#b7893b] focus:ring-1 focus:ring-[#b7893b] outline-none transition-all"
                required
              />
            </div>
          </div>

          {error && (
            <motion.p
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-red-500 text-sm text-center"
            >
              {error}
            </motion.p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#b7893b] text-black font-bold py-4 rounded-xl hover:bg-[#a67c35] transition-all flex items-center justify-center gap-2 group disabled:opacity-50 shadow-[0_10px_20px_rgba(183,137,59,0.2)]"
          >
            {loading ? (
              <Loader2 className="w-6 h-6 animate-spin" />
            ) : (
              <>
                进入管理后台
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </>
            )}
          </button>
        </form>

        <div className="mt-12 text-center">
          <p className="text-white/20 text-xs">
            <a href="https://beian.miit.gov.cn/" target="_blank" rel="noopener noreferrer">浙ICP备2026025942号-1</a>
          </p>
        </div>
      </motion.div>
    </div>
  );
}
