"use client";

import { useState, useEffect } from 'react';
import { 
  Plus, 
  Trash2, 
  Save, 
  Calendar, 
  Type, 
  AlignLeft,
  Loader2,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { getNews, createNews, updateNews, deleteNews } from '@/lib/api';

export default function NewsListManagement() {
  const [news, setNews] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState<number | 'new' | null>(null);
  const [status, setStatus] = useState<{ [key: string]: 'idle' | 'success' | 'error' }>({});

  useEffect(() => {
    fetchNews();
  }, []);

  const fetchNews = async () => {
    try {
      const data = await getNews();
      setNews(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleAdd = () => {
    const newItem = {
      id: Date.now(), // temporary id
      date: new Date().toISOString().split('T')[0],
      title_zh: '',
      title_en: '',
      desc_zh: '',
      desc_en: '',
      isNew: true
    };
    setNews([newItem, ...news]);
  };

  const handleSave = async (item: any) => {
    const saveId = item.isNew ? 'new' : item.id;
    setSaving(saveId);
    try {
      if (item.isNew) {
        const { id } = await createNews(item);
        // refresh to get real ID
        await fetchNews();
      } else {
        await updateNews(item.id, item);
      }
      setStatus(prev => ({ ...prev, [item.id]: 'success' }));
      setTimeout(() => setStatus(prev => ({ ...prev, [item.id]: 'idle' })), 3000);
    } catch (err) {
      setStatus(prev => ({ ...prev, [item.id]: 'error' }));
    } finally {
      setSaving(null);
    }
  };

  const handleDelete = async (id: number, isNew: boolean) => {
    if (isNew) {
      setNews(news.filter(n => n.id !== id));
      return;
    }
    if (!confirm('确认删除此新闻？')) return;
    try {
      await deleteNews(id);
      setNews(news.filter(n => n.id !== id));
    } catch (err) {
      alert('删除失败');
    }
  };

  const handleChange = (id: number, field: string, value: string) => {
    setNews(news.map(n => n.id === id ? { ...n, [field]: value } : n));
  };

  if (loading) return <div className="flex justify-center p-10"><Loader2 className="animate-spin" /></div>;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-bold text-white flex items-center gap-2">
          <Newspaper className="w-5 h-5 text-[#b7893b]" />
          动态列表管理
        </h3>
        <button
          onClick={handleAdd}
          className="flex items-center gap-2 px-4 py-2 bg-[#b7893b]/10 text-[#b7893b] border border-[#b7893b]/30 rounded-lg hover:bg-[#b7893b] hover:text-black transition-all font-bold text-sm"
        >
          <Plus className="w-4 h-4" /> 新增动态
        </button>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {news.map((item) => (
          <div key={item.id} className="bg-white/5 border border-white/10 rounded-2xl p-6 space-y-6 hover:border-[#b7893b]/30 transition-all">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Date & Save/Delete */}
              <div className="md:col-span-2 flex justify-between items-center bg-white/5 p-3 rounded-xl">
                <div className="flex items-center gap-3">
                  <Calendar className="w-4 h-4 text-[#b7893b]" />
                  <input 
                    type="text" 
                    value={item.date} 
                    onChange={(e) => handleChange(item.id, 'date', e.target.value)}
                    placeholder="2024.04"
                    className="bg-transparent border-none text-white font-bold outline-none text-sm w-32"
                  />
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleDelete(item.id, item.isNew)}
                    className="p-2 text-white/40 hover:text-red-500 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleSave(item)}
                    disabled={saving === item.id || saving === 'new'}
                    className="flex items-center gap-2 px-4 py-1.5 bg-[#b7893b] text-black rounded-lg font-bold hover:bg-[#a67c35] transition-all disabled:opacity-50"
                  >
                    {saving === item.id || (item.isNew && saving === 'new') ? (
                      <Loader2 className="w-3 h-3 animate-spin" />
                    ) : status[item.id] === 'success' ? (
                      <CheckCircle2 className="w-3 h-3" />
                    ) : (
                      <Save className="w-3 h-3" />
                    )}
                    <span className="text-xs">{item.isNew ? '保存新增' : '更新'}</span>
                  </button>
                </div>
              </div>

              {/* Chinese Content */}
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-[10px] font-bold text-[#b7893b] uppercase tracking-[0.2em]">
                  <Type className="w-3 h-3" /> 中文标题
                </div>
                <input 
                  type="text" 
                  value={item.title_zh} 
                  onChange={(e) => handleChange(item.id, 'title_zh', e.target.value)}
                  className="w-full bg-black border border-white/10 rounded-xl p-3 text-white focus:border-[#b7893b] outline-none transition-all text-sm"
                  placeholder="输入中文标题..."
                />
                <div className="flex items-center gap-2 text-[10px] font-bold text-[#b7893b] uppercase tracking-[0.2em]">
                  <AlignLeft className="w-3 h-3" /> 中文描述
                </div>
                <textarea 
                  value={item.desc_zh} 
                  onChange={(e) => handleChange(item.id, 'desc_zh', e.target.value)}
                  className="w-full bg-black border border-white/10 rounded-xl p-3 text-white focus:border-[#b7893b] outline-none transition-all text-sm min-h-[80px]"
                  placeholder="输入中文描述..."
                />
              </div>

              {/* English Content */}
              <div className="space-y-4 opacity-70">
                <div className="flex items-center gap-2 text-[10px] font-bold text-white/40 uppercase tracking-[0.2em]">
                  <Type className="w-3 h-3" /> 英文标题
                </div>
                <input 
                  type="text" 
                  value={item.title_en} 
                  onChange={(e) => handleChange(item.id, 'title_en', e.target.value)}
                  className="w-full bg-black border border-white/10 rounded-xl p-3 text-white focus:border-[#b7893b] outline-none transition-all text-sm"
                  placeholder="English Title..."
                />
                <div className="flex items-center gap-2 text-[10px] font-bold text-white/40 uppercase tracking-[0.2em]">
                  <AlignLeft className="w-3 h-3" /> 英文描述
                </div>
                <textarea 
                  value={item.desc_en} 
                  onChange={(e) => handleChange(item.id, 'desc_en', e.target.value)}
                  className="w-full bg-black border border-white/10 rounded-xl p-3 text-white focus:border-[#b7893b] outline-none transition-all text-sm min-h-[80px]"
                  placeholder="English Description..."
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

import { Newspaper } from 'lucide-react';
