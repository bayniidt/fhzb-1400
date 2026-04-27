"use client";

import { useEffect, useState, useRef } from "react";
import { fetchContent, updateContent, uploadFile, cleanupMedia } from "@/lib/api";
import { 
  Save, 
  Loader2, 
  CheckCircle2, 
  AlertCircle, 
  Type,
  LucideIcon,
  Upload,
  Trash2,
  AlertTriangle
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface ManagementItem {
  key: string;
  label: string;
  type: 'text' | 'media';
}

interface ManagementSection {
  title: string;
  icon: LucideIcon;
  items: ManagementItem[];
  extra?: React.ReactNode;
}

interface ModuleManagementProps {
  moduleName: string;
  title: string;
  description: string;
  sections: ManagementSection[];
}

const videoExtensions = ['.mp4', '.webm', '.ogg', '.mov', '.avi', '.mkv'];

function isVideoUrl(url: string): boolean {
  if (!url) return false;
  const lower = url.toLowerCase();
  // Check if URL contains 'video' path or has a video extension
  if (lower.includes('/video') || lower.includes('videos/')) return true;
  return videoExtensions.some(ext => lower.endsWith(ext));
}

export default function ModuleManagement({ moduleName, title, description, sections }: ModuleManagementProps) {
  const [content, setContent] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState<string | null>(null);
  const [uploading, setUploading] = useState<string | null>(null);
  const [status, setStatus] = useState<{ [key: string]: 'idle' | 'success' | 'error' }>({});
  const [showConfirm, setShowConfirm] = useState<{ key: string, file: File, oldUrl: string } | null>(null);
  const [activeTab, setActiveTab] = useState(0);
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    fetchContent().then(data => {
      // Just store everything, we access by key anyway
      setContent(data);
      setLoading(false);
    }).catch(err => {
      console.error("Failed to fetch content:", err);
      setContent({});
      setLoading(false);
    });
  }, []);

  const handleUpdate = async (key: string) => {
    setSaving(key);
    try {
      // Pass module and type metadata for better categorization on backend
      await updateContent(key, { 
        ...content[key], 
        module: moduleName, 
        type: content[key]?.type || 'text' 
      });
      setStatus(prev => ({ ...prev, [key]: 'success' }));
      setTimeout(() => setStatus(prev => ({ ...prev, [key]: 'idle' })), 3000);
    } catch (error) {
      setStatus(prev => ({ ...prev, [key]: 'error' }));
    } finally {
      setSaving(null);
    }
  };

  const handleFileUpload = async (key: string, file: File, oldUrl: string) => {
    // If there's an old file that was uploaded (starts with /uploads/), ask for confirmation
    if (oldUrl && oldUrl.startsWith('/uploads/')) {
      setShowConfirm({ key, file, oldUrl });
      return;
    }
    
    // Otherwise just upload
    executeUpload(key, file);
  };

  const executeUpload = async (key: string, file: File, oldUrlToDelete?: string) => {
    setUploading(key);
    try {
      const { url } = await uploadFile(file);
      
      // Update local state
      handleChange(key, 'zh', url);
      handleChange(key, 'en', url);
      
      // If we have an old file to delete, do it now
      if (oldUrlToDelete) {
        await cleanupMedia(oldUrlToDelete);
      }
      
      // Automatically save the content with new URL
      await updateContent(key, { 
        zh: url, 
        en: url,
        module: moduleName,
        type: 'media'
      });
      
      setStatus(prev => ({ ...prev, [key]: 'success' }));
      setTimeout(() => setStatus(prev => ({ ...prev, [key]: 'idle' })), 3000);
    } catch (error) {
      setStatus(prev => ({ ...prev, [key]: 'error' }));
    } finally {
      setUploading(null);
      setShowConfirm(null);
    }
  };

  const handleChange = (key: string, field: string, value: string) => {
    setContent((prev: any) => ({
      ...prev,
      [key]: {
        ...(prev?.[key] || { zh: '', en: '', module: moduleName, type: 'text' }),
        [field]: value
      }
    }));
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="w-8 h-8 animate-spin text-[#b7893b]" />
      </div>
    );
  }

  return (
    <div className="space-y-8 pb-20">
      <motion.div 
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4"
      >
        <div>
          <h1 className="text-3xl font-serif font-bold text-white mb-2">{title}</h1>
          <p className="text-white/50">{description}</p>
        </div>
      </motion.div>

      {/* Tabs Navigation */}
      <div className="flex flex-wrap gap-2 border-b border-white/10 pb-4 sticky top-0 bg-[#0a0a0a] z-40 py-4">
        {sections.map((section, idx) => (
          <button
            key={idx}
            onClick={() => setActiveTab(idx)}
            className={`flex items-center gap-2 px-6 py-3 rounded-xl transition-all font-bold text-sm ${
              activeTab === idx 
                ? 'bg-[#b7893b] text-black shadow-[0_0_20px_rgba(183,137,59,0.3)]' 
                : 'bg-white/5 text-white/60 hover:bg-white/10 hover:text-white'
            }`}
          >
            <section.icon className={`w-4 h-4 ${activeTab === idx ? 'text-black' : 'text-[#b7893b]'}`} />
            {section.title}
          </button>
        ))}
      </div>

      <div className="pt-4">
        <AnimatePresence mode="wait">
          <motion.section 
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="space-y-8"
          >
            <div className="grid grid-cols-1 gap-8">
              {sections[activeTab].items.map((item) => (
                <div key={item.key} className="group bg-white/5 border border-white/10 rounded-2xl p-6 space-y-6 hover:border-[#b7893b]/30 transition-all">
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-[#b7893b]/10 rounded-lg">
                        <Type className="w-4 h-4 text-[#b7893b]" />
                      </div>
                      <div>
                        <span className="text-sm font-bold text-white block">{item.label}</span>
                        <span className="text-[10px] font-mono text-white/20 uppercase tracking-tighter">{item.key}</span>
                      </div>
                    </div>
                    <button
                      onClick={() => handleUpdate(item.key)}
                      disabled={saving === item.key || uploading === item.key}
                      className="flex items-center gap-2 px-5 py-2.5 bg-[#b7893b] text-black rounded-lg font-bold hover:bg-[#a67c35] transition-all disabled:opacity-50 whitespace-nowrap w-full sm:w-auto justify-center"
                    >
                      {saving === item.key ? (
                        <Loader2 className="w-4 h-4 animate-spin" />
                      ) : status[item.key] === 'success' ? (
                        <CheckCircle2 className="w-4 h-4" />
                      ) : status[item.key] === 'error' ? (
                        <AlertCircle className="w-4 h-4" />
                      ) : (
                        <Save className="w-4 h-4" />
                      )}
                      <span className="text-sm">
                        {saving === item.key ? '保存中...' : status[item.key] === 'success' ? '已保存' : '保存修改'}
                      </span>
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Chinese Version / Media Upload */}
                    <div className="space-y-3">
                      <div className="flex items-center gap-2 text-[10px] font-bold text-white/40 uppercase tracking-[0.2em]">
                        <Type className="w-3 h-3" /> 中文内容 (ZH)
                      </div>
                      {item.type === 'media' ? (
                        <div className="space-y-4">
                          <div className="flex gap-2">
                            <input
                              type="text"
                              value={content[item.key]?.zh || ''}
                              onChange={(e) => handleChange(item.key, 'zh', e.target.value)}
                              className="flex-1 bg-black border border-white/10 rounded-xl p-4 text-white focus:border-[#b7893b] outline-none transition-all font-mono text-xs"
                              placeholder="输入或上传媒体 URL..."
                            />
                            <label className="cursor-pointer bg-white/10 hover:bg-white/20 text-white p-4 rounded-xl transition-all flex items-center justify-center">
                              {uploading === item.key ? (
                                <Loader2 className="w-5 h-5 animate-spin" />
                              ) : (
                                <Upload className="w-5 h-5" />
                              )}
                              <input
                                type="file"
                                className="hidden"
                                accept="image/*,video/*"
                                onChange={(e) => {
                                  const file = e.target.files?.[0];
                                  if (file) handleFileUpload(item.key, file, content[item.key]?.zh);
                                }}
                              />
                            </label>
                          </div>
                          
                          {content[item.key]?.zh && (
                            <div className="aspect-video rounded-xl overflow-hidden bg-black border border-white/5 flex items-center justify-center group/preview relative">
                              {isVideoUrl(content[item.key].zh) ? (
                                <video src={content[item.key].zh} className="w-full h-full object-cover" muted autoPlay loop />
                              ) : (
                                <img src={content[item.key].zh} className="w-full h-full object-cover" alt="Preview" />
                              )}
                              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover/preview:opacity-100 transition-opacity flex items-center justify-center gap-4">
                                <span className="text-white text-xs font-bold bg-black/50 px-3 py-1 rounded-full">预览中</span>
                                {content[item.key].zh.startsWith('/uploads/') && (
                                  <button 
                                    onClick={async () => {
                                      if (confirm('确认删除此媒体文件？此操作无法撤销。')) {
                                        await cleanupMedia(content[item.key].zh);
                                        handleChange(item.key, 'zh', '');
                                        handleChange(item.key, 'en', '');
                                        await updateContent(item.key, { zh: '', en: '' });
                                      }
                                    }}
                                    className="p-2 bg-red-500 rounded-lg hover:bg-red-600 transition-colors"
                                  >
                                    <Trash2 className="w-4 h-4" />
                                  </button>
                                )}
                              </div>
                            </div>
                          )}
                        </div>
                      ) : (
                        <textarea
                          value={content[item.key]?.zh || ''}
                          onChange={(e) => handleChange(item.key, 'zh', e.target.value)}
                          className="w-full bg-black border border-white/10 rounded-xl p-4 text-white focus:border-[#b7893b] outline-none transition-all min-h-[100px] text-sm leading-relaxed"
                        />
                      )}
                    </div>

                    {/* English Version */}
                    <div className="space-y-3">
                      <div className="flex items-center gap-2 text-[10px] font-bold text-white/40 uppercase tracking-[0.2em]">
                        <Type className="w-3 h-3" /> 英文内容 (EN)
                      </div>
                      {item.type === 'media' ? (
                        <div className="space-y-3">
                          <input
                            type="text"
                            value={content[item.key]?.en || ''}
                            onChange={(e) => handleChange(item.key, 'en', e.target.value)}
                            className="w-full bg-black border border-white/10 rounded-xl p-4 text-white focus:border-[#b7893b] outline-none transition-all font-mono text-xs"
                            placeholder="输入媒体文件 URL..."
                          />
                          <p className="text-[10px] text-white/20 italic">媒体文件通常在双语版本中使用相同的路径。</p>
                        </div>
                      ) : (
                        <textarea
                          value={content[item.key]?.en || ''}
                          onChange={(e) => handleChange(item.key, 'en', e.target.value)}
                          className="w-full bg-black border border-white/10 rounded-xl p-4 text-white focus:border-[#b7893b] outline-none transition-all min-h-[100px] text-sm leading-relaxed"
                        />
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {sections[activeTab].extra && (
              <div className="pt-10 border-t border-white/10">
                {sections[activeTab].extra}
              </div>
            )}
          </motion.section>
        </AnimatePresence>
      </div>

      {/* Confirmation Modal */}
      <AnimatePresence>
        {showConfirm && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowConfirm(null)}
              className="absolute inset-0 bg-black/80 backdrop-blur-md"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-md bg-[#1a1a1a] border border-white/10 rounded-3xl p-8 shadow-2xl"
            >
              <div className="flex flex-col items-center text-center space-y-6">
                <div className="w-20 h-20 bg-yellow-500/10 rounded-full flex items-center justify-center">
                  <AlertTriangle className="w-10 h-10 text-yellow-500" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-2xl font-bold text-white">确认覆盖媒体？</h3>
                  <p className="text-white/60">
                    该位置已存在上传的文件。上传新文件将<span className="text-yellow-500 font-bold">永久删除</span>旧文件以节省服务器空间。
                  </p>
                </div>
                <div className="flex w-full gap-4">
                  <button
                    onClick={() => setShowConfirm(null)}
                    className="flex-1 px-6 py-4 rounded-2xl bg-white/5 hover:bg-white/10 text-white font-bold transition-all"
                  >
                    取消
                  </button>
                  <button
                    onClick={() => executeUpload(showConfirm.key, showConfirm.file, showConfirm.oldUrl)}
                    className="flex-1 px-6 py-4 rounded-2xl bg-yellow-500 text-black font-bold hover:bg-yellow-600 transition-all shadow-[0_0_20px_rgba(234,179,8,0.3)]"
                  >
                    确认覆盖
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
