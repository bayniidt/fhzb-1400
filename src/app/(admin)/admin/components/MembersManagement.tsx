"use client";

import { useState, useEffect } from 'react';
import { 
  Plus, 
  Trash2, 
  Save, 
  Loader2,
  CheckCircle2,
  AlertCircle,
  Users
} from 'lucide-react';
import { fetchMembers, createMember, updateMember, deleteMember } from '@/lib/api';

export default function MembersManagement() {
  const [members, setMembers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState<number | 'new' | null>(null);
  const [status, setStatus] = useState<{ [key: string]: 'idle' | 'success' | 'error' }>({});
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchMembersList();
  }, []);

  const fetchMembersList = async () => {
    try {
      const data = await fetchMembers();
      setMembers(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleAdd = () => {
    const newItem = {
      id: Date.now(),
      name: '',
      phone: '',
      is_super_admin: 0,
      isNew: true
    };
    setMembers([newItem, ...members]);
  };

  const handleSave = async (item: any) => {
    if (!item.name || !item.phone) {
      setError('姓名和手机号不能为空');
      return;
    }
    
    setSaving(item.isNew ? 'new' : item.id);
    setError(null);
    
    try {
      if (item.isNew) {
        const result = await createMember({ name: item.name, phone: item.phone });
        if (result.error) {
          setError(result.error);
          setSaving(null);
          return;
        }
        await fetchMembersList();
      } else {
        const result = await updateMember(item.id, { name: item.name, phone: item.phone });
        if (result.error) {
          setError(result.error);
          setSaving(null);
          return;
        }
        await fetchMembersList();
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
      setMembers(members.filter(n => n.id !== id));
      return;
    }
    if (!confirm('确认删除此成员？')) return;
    try {
      const result = await deleteMember(id);
      if (result.error) {
        alert(result.error);
        return;
      }
      await fetchMembersList();
    } catch (err) {
      alert('删除失败');
    }
  };

  const handleChange = (id: number, field: string, value: string) => {
    setMembers(members.map(n => n.id === id ? { ...n, [field]: value } : n));
  };

  if (loading) return <div className="flex justify-center p-10"><Loader2 className="w-8 h-8 animate-spin text-[#b7893b]" /></div>;

  return (
    <div className="space-y-8 pb-20">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-serif font-bold text-white mb-2">成员管理</h1>
          <p className="text-white/50">管理系统成员，成员可通过手机号登录后台。</p>
        </div>
        <button
          onClick={handleAdd}
          className="flex items-center gap-2 px-4 py-2 bg-[#b7893b]/10 text-[#b7893b] border border-[#b7893b]/30 rounded-lg hover:bg-[#b7893b] hover:text-black transition-all font-bold text-sm"
        >
          <Plus className="w-4 h-4" /> 新增成员
        </button>
      </div>

      {error && (
        <div className="bg-red-500/10 border border-red-500/30 text-red-400 px-4 py-3 rounded-xl">
          {error}
        </div>
      )}

      <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden">
        <table className="w-full">
          <thead className="border-b border-white/10">
            <tr>
              <th className="text-left p-6 text-sm font-bold text-white/60 uppercase tracking-wider">姓名</th>
              <th className="text-left p-6 text-sm font-bold text-white/60 uppercase tracking-wider">手机号</th>
              <th className="text-left p-6 text-sm font-bold text-white/60 uppercase tracking-wider">角色</th>
              <th className="text-right p-6 text-sm font-bold text-white/60 uppercase tracking-wider">操作</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {members.map((item) => (
              <tr key={item.id} className="hover:bg-white/5 transition-colors">
                <td className="p-6">
                  <input 
                    type="text" 
                    value={item.name} 
                    onChange={(e) => handleChange(item.id, 'name', e.target.value)}
                    className="bg-black border border-white/10 rounded-lg px-4 py-2 text-white focus:border-[#b7893b] outline-none transition-all text-sm w-full max-w-xs"
                    placeholder="输入姓名..."
                  />
                </td>
                <td className="p-6">
                  <input 
                    type="text" 
                    value={item.phone} 
                    onChange={(e) => handleChange(item.id, 'phone', e.target.value)}
                    className="bg-black border border-white/10 rounded-lg px-4 py-2 text-white focus:border-[#b7893b] outline-none transition-all text-sm w-full max-w-xs font-mono"
                    placeholder="输入手机号..."
                  />
                </td>
                <td className="p-6">
                  {item.is_super_admin ? (
                    <span className="px-3 py-1 bg-[#b7893b]/20 text-[#b7893b] rounded-full text-xs font-bold">
                      超级管理员
                    </span>
                  ) : (
                    <span className="text-white/40 text-sm">普通成员</span>
                  )}
                </td>
                <td className="p-6 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <button
                      onClick={() => handleDelete(item.id, item.isNew)}
                      className="p-2 text-white/40 hover:text-red-500 transition-colors rounded-lg hover:bg-red-500/10"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleSave(item)}
                      disabled={saving === item.id || saving === 'new'}
                      className="flex items-center gap-2 px-4 py-2 bg-[#b7893b] text-black rounded-lg font-bold hover:bg-[#a67c35] transition-all disabled:opacity-50 text-sm"
                    >
                      {saving === item.id || (item.isNew && saving === 'new') ? (
                        <Loader2 className="w-3 h-3 animate-spin" />
                      ) : status[item.id] === 'success' ? (
                        <CheckCircle2 className="w-3 h-3" />
                      ) : (
                        <Save className="w-3 h-3" />
                      )}
                      <span>{item.isNew ? '保存' : status[item.id] === 'success' ? '已保存' : '更新'}</span>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {members.length === 0 && (
          <div className="p-12 text-center text-white/40">
            <Users className="w-12 h-12 mx-auto mb-4 opacity-50" />
            <p className="text-lg">暂无成员</p>
            <p className="text-sm mt-2">点击上方"新增成员"添加第一个成员</p>
          </div>
        )}
      </div>
    </div>
  );
}
