import React, { useState } from 'react';
import { ShopInfo } from '../../types/studio';
import { defaultShopInfo } from '../../data/studioData';
import { FontPairId } from '../../types/typography';
import { TypographySelector } from './TypographySelector';
import { X, Save, RotateCcw, Youtube, Phone, MapPin, Check, Trash2, Users, Instagram, Key, RefreshCw, Sparkles, AlertCircle, CheckCircle2, ExternalLink, Type } from 'lucide-react';
import { parseInstagram } from '../../utils/instagram';
import { fetchInstagramGraphMedia, clearInstagramCache, getCachedInstagramMedia } from '../../services/instagramService';

interface ShopSettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  shopInfo: ShopInfo;
  onSave: (updated: ShopInfo) => void;
  onRefreshInstagram?: () => void;
  fontPair: FontPairId;
  onSelectFontPair: (pair: FontPairId) => void;
}

export const ShopSettingsModal: React.FC<ShopSettingsModalProps> = ({
  isOpen,
  onClose,
  shopInfo,
  onSave,
  onRefreshInstagram,
  fontPair,
  onSelectFontPair,
}) => {
  const [formData, setFormData] = useState<ShopInfo>(shopInfo);
  const [savedSuccess, setSavedSuccess] = useState(false);
  const [activeTab, setActiveTab] = useState<'details' | 'instagram' | 'leads' | 'typography'>('details');

  // Instagram test sync state
  const [isSyncing, setIsSyncing] = useState(false);
  const [syncStatus, setSyncStatus] = useState<{
    type: 'idle' | 'success' | 'error';
    message: string;
    itemCount?: number;
  }>({ type: 'idle', message: '' });

  // Load inquiries from localStorage
  const getLeads = () => {
    try {
      return JSON.parse(localStorage.getItem('smriti_inquiries') || '[]');
    } catch {
      return [];
    }
  };

  const [leads, setLeads] = useState<any[]>(getLeads());

  if (!isOpen) return null;

  // Extract youtube video ID helper if full URL is pasted
  const handleYoutubeChange = (url: string) => {
    let videoId = defaultShopInfo.youtubeVideoId || 'tsjfpKFTP5g';
    const match = url.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([\w-]{11})/);
    if (match && match[1]) {
      videoId = match[1];
    } else if (url.trim().length === 11) {
      videoId = url.trim();
    }
    setFormData({
      ...formData,
      youtubeUrl: url,
      youtubeVideoId: videoId,
    });
  };

  const handleTestInstagramSync = async () => {
    if (!formData.instagramAccessToken || !formData.instagramAccessToken.trim()) {
      setSyncStatus({
        type: 'error',
        message: 'Please enter an Instagram Access Token first.',
      });
      return;
    }

    setIsSyncing(true);
    setSyncStatus({ type: 'idle', message: 'Connecting to Meta Instagram Graph API...' });

    const result = await fetchInstagramGraphMedia(
      formData.instagramAccessToken,
      formData.instagramUserId,
      true
    );

    setIsSyncing(false);
    if (result.success) {
      setSyncStatus({
        type: 'success',
        message: `Successfully connected! Fetched ${result.items.length} live media posts from Instagram.`,
        itemCount: result.items.length,
      });
      if (onRefreshInstagram) {
        onRefreshInstagram();
      }
    } else {
      setSyncStatus({
        type: 'error',
        message: result.error || 'Failed to authenticate with Instagram Graph API.',
      });
    }
  };

  const handleClearCache = () => {
    clearInstagramCache();
    setSyncStatus({
      type: 'idle',
      message: 'Local Instagram cache cleared.',
    });
    if (onRefreshInstagram) {
      onRefreshInstagram();
    }
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
    setSavedSuccess(true);
    setTimeout(() => {
      setSavedSuccess(false);
      onClose();
    }, 1200);
  };

  const handleReset = () => {
    if (window.confirm('Reset all shop details to official Smriti Photo Kumbh defaults?')) {
      setFormData(defaultShopInfo);
      onSave(defaultShopInfo);
    }
  };

  const clearLeads = () => {
    if (window.confirm('Clear all customer booking inquiry leads?')) {
      localStorage.removeItem('smriti_inquiries');
      setLeads([]);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-xs animate-in fade-in">
      <div className="bg-[#161922] border border-[#262A36] text-white rounded-3xl max-w-2xl w-full max-h-[90vh] flex flex-col shadow-2xl overflow-hidden">
        
        {/* Header */}
        <div className="px-6 py-5 border-b border-[#262A36] flex items-center justify-between">
          <div className="space-y-0.5">
            <h3 className="text-lg font-bold font-['Outfit'] text-white">Shop Management &amp; Studio Settings</h3>
            <p className="text-xs text-[#8E95A5]">Update your phone numbers, YouTube video, and manage inquiries</p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-[#8E95A5] hover:text-white hover:bg-[#1B1F2A] transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-[#262A36] px-6 bg-[#0B0C0E]">
          <button
            onClick={() => setActiveTab('details')}
            className={`py-3 px-4 text-xs font-bold border-b-2 transition-colors cursor-pointer ${
              activeTab === 'details'
                ? 'border-[#E5A93C] text-[#E5A93C]'
                : 'border-transparent text-[#8E95A5] hover:text-white'
            }`}
          >
            Studio Details &amp; YouTube Link
          </button>
          <button
            onClick={() => setActiveTab('instagram')}
            className={`py-3 px-4 text-xs font-bold border-b-2 transition-colors cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'instagram'
                ? 'border-pink-500 text-pink-300'
                : 'border-transparent text-[#8E95A5] hover:text-white'
            }`}
          >
            <Instagram className="w-3.5 h-3.5 text-pink-400" />
            <span>Official Instagram Graph API</span>
            {formData.instagramAccessToken && (
              <span className="w-2 h-2 rounded-full bg-emerald-400" title="Token Configured" />
            )}
          </button>
          <button
            onClick={() => {
              setLeads(getLeads());
              setActiveTab('leads');
            }}
            className={`py-3 px-4 text-xs font-bold border-b-2 transition-colors cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'leads'
                ? 'border-[#E5A93C] text-[#E5A93C]'
                : 'border-transparent text-[#8E95A5] hover:text-white'
            }`}
          >
            <Users className="w-3.5 h-3.5" />
            <span>Customer Inquiries ({leads.length})</span>
          </button>
          <button
            onClick={() => setActiveTab('typography')}
            className={`py-3 px-4 text-xs font-bold border-b-2 transition-colors cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'typography'
                ? 'border-[#E5A93C] text-[#E5A93C]'
                : 'border-transparent text-[#8E95A5] hover:text-white'
            }`}
          >
            <Type className="w-3.5 h-3.5" />
            <span>Brand Typography</span>
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto flex-1 space-y-5 text-left text-xs bg-[#161922]">
          {activeTab === 'details' ? (
            <form onSubmit={handleSave} id="form-shop-settings" className="space-y-4">
              
              {/* Shop Name */}
              <div className="space-y-1">
                <label className="font-semibold text-[#C5CAD6]">Studio Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3 py-2.5 rounded-xl bg-[#0B0C0E] border border-[#262A36] text-white text-xs focus:border-[#E5A93C] focus:outline-hidden"
                />
              </div>

              {/* YouTube Video URL */}
              <div className="space-y-1 p-3.5 rounded-2xl bg-[#0B0C0E] border border-red-900/40">
                <div className="flex items-center justify-between">
                  <label className="font-bold text-red-400 flex items-center gap-1.5">
                    <Youtube className="w-4 h-4" />
                    <span>YouTube Video URL or Video ID</span>
                  </label>
                  <span className="text-[10px] text-[#8E95A5]">Current ID: {formData.youtubeVideoId}</span>
                </div>
                <input
                  type="text"
                  value={formData.youtubeUrl}
                  onChange={(e) => handleYoutubeChange(e.target.value)}
                  placeholder="https://youtu.be/3J2LdMhqS5U"
                  className="w-full px-3 py-2 rounded-lg bg-[#161922] border border-[#262A36] text-white text-xs focus:border-red-500 focus:outline-hidden"
                />
                <p className="text-[10px] text-[#8E95A5]">
                  Accepts your full link like <code className="text-[#E5A93C]">https://youtu.be/3J2LdMhqS5U?si=MmjqCgJ92BKhEGD1</code> or just the 11-char ID.
                </p>
              </div>

              {/* Instagram Handle & Profile Link */}
              <div className="space-y-1 p-3.5 rounded-2xl bg-[#0B0C0E] border border-pink-900/40">
                <div className="flex items-center justify-between">
                  <label className="font-bold text-pink-400 flex items-center gap-1.5">
                    <Instagram className="w-4 h-4" />
                    <span>Instagram Profile Handle or URL</span>
                  </label>
                  <span className="text-[10px] text-[#8E95A5]">
                    Display: <span className="text-pink-300 font-bold">{parseInstagram(formData.instagram).handle}</span>
                  </span>
                </div>
                <input
                  type="text"
                  value={formData.instagram}
                  onChange={(e) => setFormData({ ...formData, instagram: e.target.value })}
                  placeholder="@samriddhi.photo or https://www.instagram.com/samriddhi.photo/"
                  className="w-full px-3 py-2 rounded-lg bg-[#161922] border border-[#262A36] text-white text-xs focus:border-pink-500 focus:outline-hidden"
                />
                <p className="text-[10px] text-[#8E95A5]">
                  Enter your handle like <code className="text-pink-300">@samriddhi.photo</code> or full URL like <code className="text-[#E5A93C]">https://www.instagram.com/samriddhi.photo/</code>.
                </p>
              </div>

              {/* Phone & WhatsApp */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="font-semibold text-[#C5CAD6]">Phone Number</label>
                  <input
                    type="text"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-3 py-2.5 rounded-xl bg-[#0B0C0E] border border-[#262A36] text-white text-xs focus:border-[#E5A93C] focus:outline-hidden"
                  />
                </div>
                <div className="space-y-1">
                  <label className="font-semibold text-[#C5CAD6]">WhatsApp Number</label>
                  <input
                    type="text"
                    value={formData.whatsapp}
                    onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value })}
                    className="w-full px-3 py-2.5 rounded-xl bg-[#0B0C0E] border border-[#262A36] text-white text-xs focus:border-[#E5A93C] focus:outline-hidden"
                  />
                </div>
              </div>

              {/* Address & City */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="font-semibold text-[#C5CAD6]">Address / Ghat Area</label>
                  <input
                    type="text"
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    className="w-full px-3 py-2.5 rounded-xl bg-[#0B0C0E] border border-[#262A36] text-white text-xs focus:border-[#E5A93C] focus:outline-hidden"
                  />
                </div>
                <div className="space-y-1">
                  <label className="font-semibold text-[#C5CAD6]">City & State</label>
                  <input
                    type="text"
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    className="w-full px-3 py-2.5 rounded-xl bg-[#0B0C0E] border border-[#262A36] text-white text-xs focus:border-[#E5A93C] focus:outline-hidden"
                  />
                </div>
              </div>

              {/* Hours */}
              <div className="space-y-1">
                <label className="font-semibold text-[#C5CAD6]">Studio Hours</label>
                <input
                  type="text"
                  value={formData.hours}
                  onChange={(e) => setFormData({ ...formData, hours: e.target.value })}
                  className="w-full px-3 py-2.5 rounded-xl bg-[#0B0C0E] border border-[#262A36] text-white text-xs focus:border-[#E5A93C] focus:outline-hidden"
                />
              </div>

              {/* Tagline */}
              <div className="space-y-1">
                <label className="font-semibold text-[#C5CAD6]">Tagline / Motto</label>
                <input
                  type="text"
                  value={formData.tagline}
                  onChange={(e) => setFormData({ ...formData, tagline: e.target.value })}
                  className="w-full px-3 py-2.5 rounded-xl bg-[#0B0C0E] border border-[#262A36] text-white text-xs focus:border-[#E5A93C] focus:outline-hidden"
                />
              </div>

            </form>
          ) : activeTab === 'instagram' ? (
            <div className="space-y-5">
              {/* Header Box */}
              <div className="p-4 rounded-2xl bg-gradient-to-r from-pink-950/40 via-purple-950/30 to-[#0B0C0E] border border-pink-500/30 space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-[#E5A93C] via-rose-500 to-purple-600 flex items-center justify-center shadow-md">
                      <Instagram className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <h4 className="font-bold text-white text-sm">Official Meta / Instagram Graph API</h4>
                      <p className="text-[11px] text-pink-300">Live Auto-Sync from your Instagram Account (@samriddhi.photo)</p>
                    </div>
                  </div>
                  <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-pink-500/20 text-pink-300 border border-pink-500/40">
                    Live Feed
                  </span>
                </div>
                <p className="text-[11px] text-[#C5CAD6] leading-relaxed">
                  Connecting the Meta Instagram Graph API automatically syncs your newest photographs, authentic captions, and timestamps to the website.
                </p>
              </div>

              {/* Token Input Form */}
              <div className="space-y-4 p-4 rounded-2xl bg-[#0B0C0E] border border-[#262A36]">
                {/* Enable Auto Sync Switch */}
                <div className="flex items-center justify-between p-3 rounded-xl bg-[#161922] border border-[#262A36]">
                  <div>
                    <span className="font-bold text-white block">Auto-Sync Instagram Feed</span>
                    <span className="text-[11px] text-[#8E95A5]">Fetch latest photos automatically on page load</span>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.instagramSyncEnabled ?? true}
                      onChange={(e) => setFormData({ ...formData, instagramSyncEnabled: e.target.checked })}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-[#262A36] peer-focus:outline-hidden rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-[#262A36] after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-pink-600"></div>
                  </label>
                </div>

                {/* Access Token Input */}
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <label className="font-bold text-white flex items-center gap-1.5">
                      <Key className="w-3.5 h-3.5 text-pink-400" />
                      <span>Meta / Instagram User Access Token (Long-Lived)</span>
                    </label>
                    <a
                      href="https://developers.facebook.com/apps/"
                      target="_blank"
                      rel="noreferrer"
                      className="text-[10px] text-pink-400 hover:text-pink-300 flex items-center gap-1"
                    >
                      <span>Meta App Console</span>
                      <ExternalLink className="w-2.5 h-2.5" />
                    </a>
                  </div>
                  <textarea
                    rows={3}
                    value={formData.instagramAccessToken || ''}
                    onChange={(e) => setFormData({ ...formData, instagramAccessToken: e.target.value })}
                    placeholder="IGQV... ya EAA... Paste your Instagram User Token or Graph API Long-lived Token here"
                    className="w-full px-3 py-2 rounded-xl bg-[#161922] border border-[#262A36] text-white font-mono text-[11px] focus:border-pink-500 focus:outline-hidden"
                  />
                  <p className="text-[10px] text-[#8E95A5]">
                    Token is securely stored locally in your browser/applet configuration.
                  </p>
                </div>

                {/* Optional User ID / Business Account ID */}
                <div className="space-y-1.5">
                  <label className="font-bold text-white block">
                    Instagram Business / Creator Account ID (Optional)
                  </label>
                  <input
                    type="text"
                    value={formData.instagramUserId || ''}
                    onChange={(e) => setFormData({ ...formData, instagramUserId: e.target.value })}
                    placeholder="178414... (Optional: If using Facebook Graph API endpoint)"
                    className="w-full px-3 py-2 rounded-xl bg-[#161922] border border-[#262A36] text-white text-xs focus:border-pink-500 focus:outline-hidden"
                  />
                  <p className="text-[10px] text-[#8E95A5]">
                    Leave blank to use default <code className="text-pink-300">/me/media</code> endpoint.
                  </p>
                </div>

                {/* Test & Sync Buttons */}
                <div className="flex flex-wrap items-center gap-3 pt-2">
                  <button
                    type="button"
                    onClick={handleTestInstagramSync}
                    disabled={isSyncing}
                    className="px-4 py-2 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-500 hover:to-purple-500 shadow-md shadow-pink-600/30 flex items-center gap-2 cursor-pointer disabled:opacity-50"
                  >
                    <RefreshCw className={`w-3.5 h-3.5 ${isSyncing ? 'animate-spin' : ''}`} />
                    <span>{isSyncing ? 'Connecting to Instagram...' : 'Test & Sync Now'}</span>
                  </button>

                  <button
                    type="button"
                    onClick={handleClearCache}
                    className="px-3 py-2 rounded-xl text-xs font-semibold text-[#8E95A5] hover:text-white bg-[#161922] hover:bg-[#1B1F2A] border border-[#262A36] cursor-pointer"
                  >
                    Clear Cache
                  </button>
                </div>

                {/* Sync Status Banner */}
                {syncStatus.type !== 'idle' && (
                  <div
                    className={`p-3 rounded-xl border text-xs flex items-start gap-2.5 ${
                      syncStatus.type === 'success'
                        ? 'bg-emerald-950/60 border-emerald-500/40 text-emerald-200'
                        : 'bg-red-950/60 border-red-500/40 text-red-200'
                    }`}
                  >
                    {syncStatus.type === 'success' ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    ) : (
                      <AlertCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                    )}
                    <div className="space-y-0.5">
                      <p className="font-semibold">{syncStatus.message}</p>
                      {syncStatus.type === 'error' && (
                        <p className="text-[10px] text-[#C5CAD6]">
                          If you do not have an API token configured, the website will continue displaying verified studio showcase photos.
                        </p>
                      )}
                    </div>
                  </div>
                )}
              </div>

              {/* How to get Token guide box */}
              <div className="p-4 rounded-2xl bg-[#0B0C0E] border border-[#262A36] space-y-2.5">
                <div className="flex items-center gap-1.5 text-xs font-bold text-[#E5A93C]">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>How to Generate an Instagram Graph API Token:</span>
                </div>
                <ol className="list-decimal list-inside space-y-1.5 text-[11px] text-[#C5CAD6] leading-relaxed">
                  <li>
                    Visit Meta for Developers (<a href="https://developers.facebook.com" target="_blank" rel="noreferrer" className="text-pink-400 underline">developers.facebook.com</a>) and log in.
                  </li>
                  <li>
                    Click <strong>Create App</strong> &rarr; Select <strong>Other / Consumer</strong> &rarr; Add <strong>Instagram Basic Display</strong> or <strong>Instagram Graph API</strong>.
                  </li>
                  <li>
                    Navigate to <strong>Instagram App &rarr; Basic Display &rarr; User Token Generator</strong>, add your Instagram account (<span className="text-pink-300 font-semibold">@samriddhi.photo</span>) as a test user, and click <strong>Generate Token</strong>.
                  </li>
                  <li>
                    Paste the generated token into the field above, click <strong>Test &amp; Sync Now</strong>, and hit <strong>Save Changes</strong>.
                  </li>
                </ol>
              </div>

            </div>
          ) : (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[#8E95A5] text-xs">Customer booking requests received from the website:</span>
                {leads.length > 0 && (
                  <button
                    onClick={clearLeads}
                    className="text-red-400 hover:text-red-300 text-[11px] flex items-center gap-1 cursor-pointer"
                  >
                    <Trash2 className="w-3 h-3" />
                    <span>Clear All</span>
                  </button>
                )}
              </div>

              {leads.length === 0 ? (
                <div className="text-center py-10 text-[#8E95A5]">
                  No inquiries recorded yet. When pilgrims or clients fill out the contact form, their details will appear here.
                </div>
              ) : (
                <div className="space-y-2">
                  {leads.map((lead: any) => (
                    <div key={lead.id} className="p-3.5 rounded-2xl bg-[#0B0C0E] border border-[#262A36] space-y-1">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-white text-sm">{lead.name}</span>
                        <span className="text-[10px] text-[#8E95A5]">{lead.createdAt}</span>
                      </div>
                      <div className="text-[#E5A93C] font-semibold text-xs">
                        {lead.service} {lead.date ? `• Date: ${lead.date}` : ''}
                      </div>
                      <div className="text-[#C5CAD6] flex items-center gap-3">
                        <a href={`tel:${lead.phone}`} className="text-[#E5A93C] underline font-medium">
                          📞 {lead.phone}
                        </a>
                        <a
                          href={`https://wa.me/${lead.phone.replace(/[^0-9]/g, '')}`}
                          target="_blank"
                          rel="noreferrer"
                          className="text-emerald-400 underline font-medium"
                        >
                          💬 WhatsApp
                        </a>
                      </div>
                      {lead.message && (
                        <p className="text-[11px] text-[#8E95A5] mt-1 italic">&ldquo;{lead.message}&rdquo;</p>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {activeTab === 'typography' && (
            <div className="space-y-4">
              <TypographySelector
                currentPair={fontPair}
                onSelect={(pair) => {
                  onSelectFontPair(pair);
                  setFormData((prev) => ({ ...prev, fontPair: pair }));
                }}
              />
            </div>
          )}
        </div>

        {/* Footer actions */}
        <div className="px-6 py-4 border-t border-[#262A36] bg-[#0B0C0E] flex items-center justify-between">
          <button
            onClick={handleReset}
            type="button"
            className="flex items-center gap-1.5 text-xs text-[#8E95A5] hover:text-white transition-colors cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Defaults</span>
          </button>

          <div className="flex items-center gap-3">
            <button
              onClick={onClose}
              type="button"
              className="px-4 py-2 rounded-xl text-xs font-semibold text-[#C5CAD6] hover:text-white bg-[#1B1F2A] hover:bg-[#262A36] border border-[#262A36] transition-colors cursor-pointer"
            >
              Cancel
            </button>

            {(activeTab === 'details' || activeTab === 'instagram') && (
              <button
                onClick={handleSave}
                type="button"
                className="px-5 py-2 rounded-xl text-xs font-black text-[#0B0C0E] bg-gradient-to-r from-[#E5A93C] to-[#F3BA54] hover:brightness-110 shadow-md shadow-[#E5A93C]/20 flex items-center gap-1.5 transition-all cursor-pointer"
              >
                {savedSuccess ? (
                  <>
                    <Check className="w-3.5 h-3.5" />
                    <span>Saved!</span>
                  </>
                ) : (
                  <>
                    <Save className="w-3.5 h-3.5" />
                    <span>Save Changes</span>
                  </>
                )}
              </button>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};
