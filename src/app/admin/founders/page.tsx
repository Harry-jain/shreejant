'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import {
  Users,
  Plus,
  Edit2,
  Trash2,
  Eye,
  CheckCircle2,
  XCircle,
  Upload,
  ArrowUp,
  ArrowDown,
  Sparkles,
  RefreshCw,
  AlertCircle,
  X,
  ExternalLink,
  Lock,
  LogOut,
} from 'lucide-react';
import { Founder } from '@/lib/founders';

export default function AdminFoundersPage() {
  const [adminToken, setAdminToken] = useState<string>('');
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [passcodeInput, setPasscodeInput] = useState<string>('');
  const [authError, setAuthError] = useState<string | null>(null);

  const [founders, setFounders] = useState<Founder[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Modal / Form state
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [editingFounder, setEditingFounder] = useState<Founder | null>(null);
  const [formData, setFormData] = useState<Partial<Founder>>({
    name: '',
    designation: '',
    portrait_image: '/uploads/founders/ankit-portrait.png',
    signature_image: '/uploads/founders/ankit-signature.png',
    short_description: '',
    short_intro: '',
    biography: '',
    achievements: [''],
    personal_vision: '',
    display_order: 1,
    is_published: true,
  });

  const [uploadingPortrait, setUploadingPortrait] = useState<boolean>(false);
  const [uploadingSignature, setUploadingSignature] = useState<boolean>(false);
  const [saveSuccess, setSaveSuccess] = useState<string | null>(null);

  useEffect(() => {
    const saved = typeof window !== 'undefined' ? sessionStorage.getItem('shreejan_admin_token') : null;
    if (saved) {
      setAdminToken(saved);
      setIsAuthenticated(true);
    }
  }, []);

  const getHeaders = (extra: Record<string, string> = {}) => {
    return {
      'Authorization': `Bearer ${adminToken}`,
      'x-admin-key': adminToken,
      ...extra,
    };
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!passcodeInput.trim()) return;
    const token = passcodeInput.trim();
    sessionStorage.setItem('shreejan_admin_token', token);
    setAdminToken(token);
    setIsAuthenticated(true);
    setAuthError(null);
  };

  const handleLogout = () => {
    sessionStorage.removeItem('shreejan_admin_token');
    setAdminToken('');
    setIsAuthenticated(false);
  };

  const fetchFounders = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/founders?all=true');
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to fetch founders');
      setFounders(data.founders || []);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Unknown error';
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFounders();
  }, []);

  const openCreateModal = () => {
    setEditingFounder(null);
    setFormData({
      name: '',
      designation: '',
      portrait_image: '/uploads/founders/ankit-portrait.png',
      signature_image: '/uploads/founders/ankit-signature.png',
      short_description: '',
      short_intro: '',
      biography: '',
      achievements: [''],
      personal_vision: '',
      display_order: founders.length + 1,
      is_published: true,
    });
    setIsModalOpen(true);
  };

  const openEditModal = (founder: Founder) => {
    setEditingFounder(founder);
    setFormData({
      ...founder,
      short_description: founder.short_description || founder.short_intro || '',
      achievements: founder.achievements && founder.achievements.length > 0 ? founder.achievements : [''],
    });
    setIsModalOpen(true);
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>, type: 'portrait' | 'signature') => {
    const file = e.target.files?.[0];
    if (!file) return;

    const data = new FormData();
    data.append('file', file);
    data.append('type', type);

    if (type === 'portrait') setUploadingPortrait(true);
    else setUploadingSignature(true);

    try {
      const res = await fetch('/api/upload', {
        method: 'POST',
        headers: getHeaders(),
        body: data,
      });
      const result = await res.json();
      if (!res.ok) throw new Error(result.error || 'Upload failed');

      if (type === 'portrait') {
        setFormData((prev) => ({ ...prev, portrait_image: result.url }));
      } else {
        setFormData((prev) => ({ ...prev, signature_image: result.url }));
      }
    } catch (err: unknown) {
      alert(err instanceof Error ? err.message : 'Upload failed');
    } finally {
      if (type === 'portrait') setUploadingPortrait(false);
      else setUploadingSignature(false);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.designation) {
      alert('Name and designation are required.');
      return;
    }

    const payload = {
      ...formData,
      achievements: (formData.achievements || []).filter((a) => a.trim().length > 0),
    };

    try {
      let res;
      if (editingFounder) {
        res = await fetch(`/api/founders/${editingFounder.id}`, {
          method: 'PUT',
          headers: getHeaders({ 'Content-Type': 'application/json' }),
          body: JSON.stringify(payload),
        });
      } else {
        res = await fetch('/api/founders', {
          method: 'POST',
          headers: getHeaders({ 'Content-Type': 'application/json' }),
          body: JSON.stringify(payload),
        });
      }

      const result = await res.json();
      if (!res.ok) throw new Error(result.error || 'Failed to save founder profile');

      setSaveSuccess(editingFounder ? 'Founder profile updated!' : 'Founder profile created!');
      setTimeout(() => setSaveSuccess(null), 3000);
      setIsModalOpen(false);
      fetchFounders();
    } catch (err: unknown) {
      alert(err instanceof Error ? err.message : 'Save error');
    }
  };

  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`Are you sure you want to remove ${name} from the leadership team?`)) {
      return;
    }

    try {
      const res = await fetch(`/api/founders/${id}`, {
        method: 'DELETE',
        headers: getHeaders(),
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || 'Failed to delete');
      }
      fetchFounders();
    } catch (err: unknown) {
      alert(err instanceof Error ? err.message : 'Delete error');
    }
  };

  const togglePublished = async (founder: Founder) => {
    try {
      const res = await fetch(`/api/founders/${founder.id}`, {
        method: 'PUT',
        headers: getHeaders({ 'Content-Type': 'application/json' }),
        body: JSON.stringify({ is_published: !founder.is_published }),
      });
      if (res.ok) fetchFounders();
    } catch (err) {
      console.error('Failed to toggle status', err);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#07090F] flex items-center justify-center p-6 text-white">
        <div className="w-full max-w-md p-8 rounded-2xl bg-[#0E121E] border border-white/10 shadow-2xl text-center space-y-6">
          <div className="w-12 h-12 rounded-full bg-[#7C5CFC]/20 text-[#A78BFA] flex items-center justify-center mx-auto">
            <Lock className="w-6 h-6" />
          </div>
          <div>
            <h1 className="font-heading font-bold text-2xl text-white">Admin Security Verification</h1>
            <p className="font-body text-xs text-white/60 mt-1">
              Enter the administrative master key to access and modify leadership records.
            </p>
          </div>
          <form onSubmit={handleLogin} className="space-y-4">
            <input
              type="password"
              placeholder="Enter Admin Secret Key"
              value={passcodeInput}
              onChange={(e) => setPasscodeInput(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl bg-black/40 border border-white/15 text-white text-sm focus:outline-none focus:border-[#7C5CFC]"
              required
            />
            {authError && <p className="text-red-400 text-xs font-mono">{authError}</p>}
            <button
              type="submit"
              className="w-full py-2.5 rounded-xl bg-gradient-to-r from-[#7C5CFC] to-[#6847ED] text-white font-heading font-semibold text-sm shadow-lg hover:brightness-110 transition-all cursor-pointer"
            >
              Unlock Dashboard
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#07090F] text-white p-6 sm:p-10">
      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* Top Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/10">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#7C5CFC]/15 border border-[#7C5CFC]/30 text-xs font-mono text-[#A78BFA] mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>SHREEJAN AI LEADERSHIP SYSTEM</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black font-heading tracking-tight">
              Founders & Executive Showcase Manager
            </h1>
            <p className="text-sm text-white/60 mt-1">
              Manage dynamic scroll-driven transparent portraits, signature watermarks, and biographies.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={fetchFounders}
              className="p-2.5 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 text-white/70 hover:text-white transition-all"
              title="Refresh list"
            >
              <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
            </button>
            <button
              onClick={openCreateModal}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#7C5CFC] to-[#9D84FF] hover:from-[#6A47F2] hover:to-[#8B6EFC] text-white font-semibold text-sm shadow-lg shadow-[#7C5CFC]/20 transition-all cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>Add New Founder</span>
            </button>
            <button
              onClick={handleLogout}
              className="p-2.5 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/30 text-rose-300 hover:text-white transition-all cursor-pointer"
              title="Lock / Log Out"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Alerts */}
        {saveSuccess && (
          <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-sm flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4" />
            <span>{saveSuccess}</span>
          </div>
        )}

        {error && (
          <div className="p-4 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-sm flex items-center gap-2">
            <AlertCircle className="w-4 h-4" />
            <span>{error}</span>
          </div>
        )}

        {/* Roster Table / Cards */}
        {loading ? (
          <div className="p-12 text-center text-white/50 font-mono text-sm animate-pulse">
            Loading founders roster...
          </div>
        ) : founders.length === 0 ? (
          <div className="p-12 text-center rounded-2xl bg-white/[0.02] border border-white/10">
            <Users className="w-12 h-12 text-white/30 mx-auto mb-3" />
            <h3 className="text-lg font-bold">No founders configured yet</h3>
            <p className="text-sm text-white/50 mt-1 mb-6">Create the first leadership profile to display on the About page.</p>
            <button
              onClick={openCreateModal}
              className="px-5 py-2.5 rounded-xl bg-[#7C5CFC] hover:bg-[#6A47F2] text-white text-sm font-semibold"
            >
              Add First Founder
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4">
            {founders.map((founder, idx) => (
              <div
                key={founder.id}
                className="p-5 rounded-2xl bg-[#0E121E] border border-white/10 hover:border-white/20 transition-all flex flex-col md:flex-row items-start md:items-center justify-between gap-6"
              >
                {/* Visual Composite Preview */}
                <div className="flex items-center gap-4">
                  <span className="font-mono text-sm font-bold text-white/40 w-6">
                    0{idx + 1}
                  </span>
                  
                  {/* Portrait + Signature layer preview */}
                  <div className="relative w-20 h-24 rounded-xl bg-[#090C15] border border-white/10 overflow-hidden flex items-end justify-center">
                    {/* Layer 1: Signature behind portrait */}
                    {founder.signature_image && (
                      <div className="absolute inset-0 z-0 flex items-center justify-center opacity-30 pointer-events-none scale-125">
                        <Image
                          src={founder.signature_image}
                          alt="Signature"
                          fill
                          className="object-contain filter invert"
                          unoptimized
                        />
                      </div>
                    )}
                    {/* Layer 2: Transparent portrait on top */}
                    {founder.portrait_image ? (
                      <div className="relative z-10 w-full h-full">
                        <Image
                          src={founder.portrait_image}
                          alt={founder.name}
                          fill
                          className="object-contain object-bottom"
                          unoptimized
                        />
                      </div>
                    ) : (
                      <div className="relative z-10 text-xs font-mono text-white/40 mb-2">No photo</div>
                    )}
                  </div>

                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-heading font-bold text-base text-white">
                        {founder.name}
                      </h3>
                      <button
                        onClick={() => togglePublished(founder)}
                        className={`text-[10px] font-mono px-2 py-0.5 rounded-full border transition-all ${
                          founder.is_published
                            ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                            : 'bg-white/5 text-white/40 border-white/10'
                        }`}
                      >
                        {founder.is_published ? 'Published' : 'Draft'}
                      </button>
                    </div>
                    <p className="text-xs text-[#A78BFA] font-medium mt-0.5">
                      {founder.designation}
                    </p>
                    <p className="text-xs text-white/50 mt-1 line-clamp-1 max-w-xl">
                      {founder.short_intro}
                    </p>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2 w-full md:w-auto justify-end border-t md:border-t-0 border-white/5 pt-3 md:pt-0">
                  <button
                    onClick={() => openEditModal(founder)}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 text-xs text-white/80 hover:text-white transition-all cursor-pointer"
                  >
                    <Edit2 className="w-3.5 h-3.5" />
                    <span>Edit Profile</span>
                  </button>
                  <button
                    onClick={() => handleDelete(founder.id, founder.name)}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/20 text-xs text-rose-300 hover:text-rose-200 transition-all cursor-pointer"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>Delete</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Modal / Editor */}
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto">
            <div className="relative w-full max-w-3xl my-8 rounded-3xl bg-[#0E121E] border border-white/15 p-6 sm:p-8 shadow-2xl text-white max-h-[90vh] overflow-y-auto">
              
              <div className="flex items-center justify-between pb-4 mb-6 border-b border-white/10">
                <h2 className="text-xl font-bold font-heading">
                  {editingFounder ? `Edit: ${editingFounder.name}` : 'Add New Founder Profile'}
                </h2>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="p-2 rounded-lg text-white/50 hover:text-white bg-white/5"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <form onSubmit={handleSave} className="space-y-6">
                
                {/* Visual Composite Preview Box */}
                <div className="p-4 rounded-2xl bg-[#080B12] border border-[#7C5CFC]/30 flex flex-col sm:flex-row items-center gap-6">
                  <div className="relative w-36 h-48 rounded-2xl bg-[#090C15] border border-white/10 overflow-hidden flex items-end justify-center shadow-inner">
                    {/* Background Signature Watermark */}
                    {formData.signature_image && (
                      <div className="absolute inset-0 z-0 flex items-center justify-center opacity-30 pointer-events-none scale-125">
                        <Image
                          src={formData.signature_image}
                          alt="Signature Preview"
                          fill
                          className="object-contain filter invert"
                          unoptimized
                        />
                      </div>
                    )}
                    {/* Foreground Transparent Portrait */}
                    {formData.portrait_image ? (
                      <div className="relative z-10 w-full h-full">
                        <Image
                          src={formData.portrait_image}
                          alt="Portrait Preview"
                          fill
                          className="object-contain object-bottom"
                          unoptimized
                        />
                      </div>
                    ) : (
                      <div className="relative z-10 text-xs font-mono text-white/40 mb-4">No Portrait</div>
                    )}
                  </div>

                  <div className="space-y-2 text-left">
                    <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-[#7C5CFC]/20 text-[#A78BFA] border border-[#7C5CFC]/30">
                      Layering Specification Verified
                    </span>
                    <h4 className="font-heading font-bold text-base text-white">
                      {formData.name || 'Founder Name'}
                    </h4>
                    <p className="text-xs text-[#A78BFA]">
                      {formData.designation || 'Designation Title'}
                    </p>
                    <p className="text-[11px] text-white/50 leading-relaxed max-w-md">
                      Transparent PNG portrait placed in foreground (z-10), handwritten signature placed behind as decorative watermark (z-0).
                    </p>
                  </div>
                </div>

                {/* Basic Info */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono text-white/70 mb-1.5">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      value={formData.name || ''}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Ankit Vishwakarma"
                      required
                      className="w-full px-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-sm focus:outline-none focus:border-[#7C5CFC]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-white/70 mb-1.5">
                      Designation *
                    </label>
                    <input
                      type="text"
                      value={formData.designation || ''}
                      onChange={(e) => setFormData({ ...formData, designation: e.target.value })}
                      placeholder="e.g. Founder & Principal Systems Architect"
                      required
                      className="w-full px-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-sm focus:outline-none focus:border-[#7C5CFC]"
                    />
                  </div>
                </div>

                {/* Uploaders */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Portrait File / URL */}
                  <div className="p-4 rounded-xl bg-white/[0.02] border border-white/10 space-y-2">
                    <label className="block text-xs font-mono text-[#A78BFA] font-medium">
                      1. Transparent Portrait PNG (No Background)
                    </label>
                    <input
                      type="text"
                      value={formData.portrait_image || ''}
                      onChange={(e) => setFormData({ ...formData, portrait_image: e.target.value })}
                      placeholder="/uploads/founders/name-portrait.svg"
                      className="w-full px-3 py-1.5 rounded-lg bg-black/40 border border-white/10 text-xs font-mono text-white/80"
                    />
                    <label className="flex items-center justify-center gap-2 py-2 px-3 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-xs cursor-pointer text-white/80">
                      <Upload className="w-3.5 h-3.5" />
                      <span>{uploadingPortrait ? 'Uploading...' : 'Upload PNG Portrait'}</span>
                      <input
                        type="file"
                        accept="image/png,image/svg+xml,image/webp"
                        onChange={(e) => handleFileUpload(e, 'portrait')}
                        className="hidden"
                      />
                    </label>
                  </div>

                  {/* Signature File / URL */}
                  <div className="p-4 rounded-xl bg-white/[0.02] border border-white/10 space-y-2">
                    <label className="block text-xs font-mono text-[#A78BFA] font-medium">
                      2. Signature Watermark (SVG / PNG)
                    </label>
                    <input
                      type="text"
                      value={formData.signature_image || ''}
                      onChange={(e) => setFormData({ ...formData, signature_image: e.target.value })}
                      placeholder="/uploads/founders/name-signature.svg"
                      className="w-full px-3 py-1.5 rounded-lg bg-black/40 border border-white/10 text-xs font-mono text-white/80"
                    />
                    <label className="flex items-center justify-center gap-2 py-2 px-3 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-xs cursor-pointer text-white/80">
                      <Upload className="w-3.5 h-3.5" />
                      <span>{uploadingSignature ? 'Uploading...' : 'Upload SVG Signature'}</span>
                      <input
                        type="file"
                        accept="image/svg+xml,image/png"
                        onChange={(e) => handleFileUpload(e, 'signature')}
                        className="hidden"
                      />
                    </label>
                  </div>
                </div>

                {/* Short Description (Required, ~2-4 sentences for About Us) */}
                <div>
                  <label className="block text-xs font-mono text-[#7C5CFC] font-semibold mb-1.5">
                    Short Description (~2–4 sentences for About Us showcase) *
                  </label>
                  <textarea
                    rows={3}
                    value={formData.short_description || formData.short_intro || ''}
                    onChange={(e) => setFormData({ 
                      ...formData, 
                      short_description: e.target.value,
                      short_intro: e.target.value 
                    })}
                    placeholder="Founding Partner and Principal Systems Architect at SHREEJAN AI SOLUTIONS..."
                    className="w-full p-3.5 rounded-xl bg-white/[0.04] border border-[#7C5CFC]/30 text-sm focus:outline-none focus:border-[#7C5CFC] leading-relaxed resize-none text-white"
                  />
                </div>

                {/* Biography */}
                <div>
                  <label className="block text-xs font-mono text-white/70 mb-1.5">
                    Detailed Narrative & Background
                  </label>
                  <textarea
                    rows={4}
                    value={formData.biography || ''}
                    onChange={(e) => setFormData({ ...formData, biography: e.target.value })}
                    placeholder="Narrative biography detailing engineering experience, achievements, and technical contributions..."
                    className="w-full p-3.5 rounded-xl bg-white/[0.04] border border-white/10 text-sm focus:outline-none focus:border-[#7C5CFC] leading-relaxed resize-none"
                  />
                </div>

                {/* Achievements */}
                <div>
                  <label className="block text-xs font-mono text-white/70 mb-1.5">
                    Key Engineering Achievements (1 per line)
                  </label>
                  <textarea
                    rows={3}
                    value={(formData.achievements || []).join('\n')}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        achievements: e.target.value.split('\n'),
                      })
                    }
                    placeholder="Architected sub-50ms edge web platforms&#10;Integrated multi-agent Gen AI pipelines&#10;100% clean-code standards"
                    className="w-full p-3.5 rounded-xl bg-white/[0.04] border border-white/10 text-sm focus:outline-none focus:border-[#7C5CFC] leading-relaxed resize-none font-mono text-xs"
                  />
                </div>

                {/* Personal Vision */}
                <div>
                  <label className="block text-xs font-mono text-white/70 mb-1.5">
                    Personal Vision Statement / Philosophy
                  </label>
                  <input
                    type="text"
                    value={formData.personal_vision || ''}
                    onChange={(e) => setFormData({ ...formData, personal_vision: e.target.value })}
                    placeholder="Indian businesses should not have to choose between luxury design and raw engineering..."
                    className="w-full px-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-sm focus:outline-none focus:border-[#7C5CFC]"
                  />
                </div>

                {/* Hook / Headline */}
                <div>
                  <label className="block text-xs font-mono text-white/70 mb-1.5">
                    Lead Hook / Punchline
                  </label>
                  <input
                    type="text"
                    value={formData.hook || ''}
                    onChange={(e) => setFormData({ ...formData, hook: e.target.value })}
                    placeholder="Meet Akshay — the guy who sees a problem..."
                    className="w-full px-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-sm focus:outline-none focus:border-[#7C5CFC]"
                  />
                </div>

                {/* Superpower & Weakness & GitHub */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-xs font-mono text-[#A78BFA] mb-1.5 font-semibold">
                      Superpower
                    </label>
                    <input
                      type="text"
                      value={formData.superpower || ''}
                      onChange={(e) => setFormData({ ...formData, superpower: e.target.value })}
                      placeholder="e.g. Turning caffeine-free ideas..."
                      className="w-full px-3 py-2 rounded-xl bg-white/[0.04] border border-[#7C5CFC]/30 text-xs text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-mono text-amber-400 mb-1.5 font-semibold">
                      Weakness
                    </label>
                    <input
                      type="text"
                      value={formData.weakness || ''}
                      onChange={(e) => setFormData({ ...formData, weakness: e.target.value })}
                      placeholder='e.g. "I have one more feature idea."'
                      className="w-full px-3 py-2 rounded-xl bg-white/[0.04] border border-amber-500/30 text-xs text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-mono text-white/70 mb-1.5">
                      GitHub URL
                    </label>
                    <input
                      type="text"
                      value={formData.github || ''}
                      onChange={(e) => setFormData({ ...formData, github: e.target.value })}
                      placeholder="https://github.com/..."
                      className="w-full px-3 py-2 rounded-xl bg-white/[0.04] border border-white/10 text-xs text-white"
                    />
                  </div>
                </div>

                {/* Order & Published */}
                <div className="grid grid-cols-2 gap-4 pt-2">
                  <div>
                    <label className="block text-xs font-mono text-white/70 mb-1.5">
                      Display Order (1, 2, 3...)
                    </label>
                    <input
                      type="number"
                      value={formData.display_order ?? 1}
                      onChange={(e) => setFormData({ ...formData, display_order: parseInt(e.target.value) || 1 })}
                      className="w-full px-4 py-2 rounded-xl bg-white/[0.04] border border-white/10 text-sm font-mono"
                    />
                  </div>

                  <div className="flex items-center gap-3 pt-6">
                    <label className="flex items-center gap-2 cursor-pointer select-none">
                      <input
                        type="checkbox"
                        checked={formData.is_published ?? true}
                        onChange={(e) => setFormData({ ...formData, is_published: e.target.checked })}
                        className="w-4 h-4 rounded text-[#7C5CFC] focus:ring-[#7C5CFC]"
                      />
                      <span className="text-sm font-medium">Published on Live Site</span>
                    </label>
                  </div>
                </div>

                {/* Buttons */}
                <div className="pt-4 border-t border-white/10 flex items-center justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="px-5 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-sm font-medium"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#7C5CFC] to-[#9D84FF] text-white font-semibold text-sm shadow-lg shadow-[#7C5CFC]/25"
                  >
                    {editingFounder ? 'Save Changes' : 'Create Founder'}
                  </button>
                </div>

              </form>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
