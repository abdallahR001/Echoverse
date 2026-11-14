'use client';

import { useState, useRef } from 'react';
import ModalShell from './ModalShell';

export default function EditUniverseModal({ universe, onClose, onSave, onDelete }) {
  const [activeTab, setActiveTab] = useState('edit');

  // Edit tab state
  const [name, setName] = useState(universe.name ?? '');
  const [description, setDescription] = useState(universe.description ?? '');
  const [coverPreview, setCoverPreview] = useState(universe.cover ?? null);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const fileRef = useRef(null);

  // Infos tab state
  const [infos, setInfos] = useState(universe.infos ?? []);
  const [infoInput, setInfoInput] = useState('');
  const [pendingInfos, setPendingInfos] = useState([]);

  const handleCover = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setCoverPreview(URL.createObjectURL(file));
  };

  const addPendingInfo = () => {
    const trimmed = infoInput.trim();
    if (!trimmed) return;
    setPendingInfos(prev => [...prev, { id: Date.now(), content: trimmed }]);
    setInfoInput('');
  };

  const removePendingInfo = (id) => setPendingInfos(prev => prev.filter(i => i.id !== id));
  const removeExistingInfo = (id) => setInfos(prev => prev.filter(i => i.id !== id));

  const handleOkay = () => {
    if (!name.trim()) return;
    onSave({
      id: universe.id,
      name: name.trim(),
      description: description.trim(),
      image: coverPreview,
      pendingInfos, // new infos → each sent as separate POST /api/universes/info
    });
  };

  const tabs = [
    { key: 'edit', label: 'Edit' },
    { key: 'infos', label: 'Universe Infos' },
  ];

  return (
    <ModalShell onClose={onClose} title={universe.name}>
      <div className="flex flex-col gap-5">

        {/* Tabs */}
        <div
          className="flex gap-1 p-1 rounded-xl"
          style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.06)' }}
        >
          {tabs.map(t => (
            <button
              key={t.key}
              onClick={() => { setActiveTab(t.key); setConfirmDelete(false); }}
              className="flex-1 py-2 rounded-lg text-[0.75rem] font-bold tracking-[0.08em] uppercase transition-all duration-200"
              style={{
                fontFamily: "'DM Sans', sans-serif",
                background: activeTab === t.key ? 'linear-gradient(135deg, #6d28d9, #9333ea)' : 'transparent',
                color: activeTab === t.key ? 'white' : 'rgba(255,255,255,0.35)',
                boxShadow: activeTab === t.key ? '0 0 16px rgba(88,28,135,0.4)' : 'none',
              }}
            >
              {t.label}
            </button>
          ))}
        </div>

        {/* ── TAB: EDIT ── */}
        {activeTab === 'edit' && (
          <div className="flex flex-col gap-5">

            {/* Cover */}
            <div className="flex flex-col gap-2">
              <label className="field-label">Cover Image</label>
              <button
                type="button"
                onClick={() => fileRef.current?.click()}
                className="relative w-full h-36 rounded-xl overflow-hidden transition-all duration-200 group"
                style={{ border: '1px dashed rgba(147,51,234,0.3)', background: 'rgba(147,51,234,0.04)' }}
                onMouseEnter={e => e.currentTarget.style.borderColor = 'rgba(147,51,234,0.6)'}
                onMouseLeave={e => e.currentTarget.style.borderColor = 'rgba(147,51,234,0.3)'}
              >
                {coverPreview ? (
                  <>
                    <img src={coverPreview} alt="cover" className="absolute inset-0 w-full h-full object-cover" />
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200" style={{ background: 'rgba(0,0,0,0.5)' }}>
                      <span className="text-[0.72rem] font-bold tracking-[0.1em] uppercase text-white">Change</span>
                    </div>
                  </>
                ) : (
                  <div className="flex flex-col items-center justify-center w-full h-full gap-2" style={{ color: 'rgba(147,51,234,0.5)' }}>
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <rect x="3" y="3" width="18" height="18" rx="2"/>
                      <circle cx="8.5" cy="8.5" r="1.5"/>
                      <polyline points="21 15 16 10 5 21"/>
                    </svg>
                    <span className="text-[0.72rem] font-semibold" style={{ fontFamily: "'DM Sans', sans-serif" }}>Upload cover</span>
                  </div>
                )}
              </button>
              <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handleCover} />
            </div>

            {/* Name */}
            <div className="flex flex-col gap-1.5">
              <label className="field-label">Universe Name <span style={{ color: '#ef4444' }}>*</span></label>
              <input
                type="text"
                value={name}
                onChange={e => setName(e.target.value)}
                className="field-input"
              />
            </div>

            {/* Description */}
            <div className="flex flex-col gap-1.5">
              <label className="field-label">Description</label>
              <textarea
                value={description}
                onChange={e => setDescription(e.target.value)}
                rows={3}
                className="field-input resize-none"
              />
            </div>

            {/* Delete */}
            {confirmDelete ? (
              <div
                className="flex flex-col gap-3 p-4 rounded-xl"
                style={{ background: 'rgba(239,68,68,0.07)', border: '1px solid rgba(239,68,68,0.2)' }}
              >
                <p className="text-[0.83rem]" style={{ color: 'rgba(255,255,255,0.6)', fontFamily: "'DM Sans', sans-serif" }}>
                  Are you sure? This will permanently delete{' '}
                  <strong style={{ color: 'rgba(255,255,255,0.85)' }}>{universe.name}</strong>.
                </p>
                <div className="flex gap-2">
                  <button
                    onClick={() => setConfirmDelete(false)}
                    className="flex-1 py-2.5 rounded-lg text-[0.75rem] font-semibold uppercase transition-all duration-200"
                    style={{ border: '1px solid rgba(255,255,255,0.08)', color: 'rgba(255,255,255,0.5)', fontFamily: "'DM Sans', sans-serif" }}
                  >
                    Cancel
                  </button>
                  <button
                    onClick={onDelete}
                    className="flex-1 py-2.5 rounded-lg text-[0.75rem] font-bold uppercase text-white"
                    style={{ background: '#dc2626', fontFamily: "'DM Sans', sans-serif" }}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => setConfirmDelete(true)}
                className="flex items-center gap-2 text-[0.75rem] font-semibold tracking-[0.06em] uppercase transition-colors duration-200 w-fit"
                style={{ color: 'rgba(239,68,68,0.4)', fontFamily: "'DM Sans', sans-serif" }}
                onMouseEnter={e => e.currentTarget.style.color = '#ef4444'}
                onMouseLeave={e => e.currentTarget.style.color = 'rgba(239,68,68,0.4)'}
              >
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="3 6 5 6 21 6"/>
                  <path d="M19 6l-1 14H6L5 6"/>
                  <path d="M10 11v6M14 11v6"/>
                  <path d="M9 6V4h6v2"/>
                </svg>
                Delete Universe
              </button>
            )}

          </div>
        )}

        {/* ── TAB: UNIVERSE INFOS ── */}
        {activeTab === 'infos' && (
          <div className="flex flex-col gap-4">

            {/* Existing infos */}
            {infos.length > 0 && (
              <div className="flex flex-col gap-2">
                <label className="field-label">Saved Infos</label>
                <ul className="flex flex-col gap-2">
                  {infos.map(info => (
                    <li
                      key={info.id}
                      className="flex items-start gap-3 px-4 py-3 rounded-xl"
                      style={{ background: 'rgba(147,51,234,0.06)', border: '1px solid rgba(147,51,234,0.12)' }}
                    >
                      <span
                        className="text-[0.83rem] leading-[1.65] flex-1"
                        style={{ color: 'rgba(255,255,255,0.6)', fontFamily: "'DM Sans', sans-serif" }}
                      >
                        {info.content}
                      </span>
                      <button
                        type="button"
                        onClick={() => removeExistingInfo(info.id)}
                        className="flex-shrink-0 transition-colors duration-200"
                        style={{ color: 'rgba(255,255,255,0.2)' }}
                        onMouseEnter={e => e.currentTarget.style.color = '#ef4444'}
                        onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.2)'}
                      >
                        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                          <path d="M18 6L6 18M6 6l12 12"/>
                        </svg>
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Pending infos (not sent yet) */}
            {pendingInfos.length > 0 && (
              <div className="flex flex-col gap-2">
                <label className="field-label">
                  New Infos
                  <span
                    className="ml-2 px-1.5 py-0.5 rounded text-[0.6rem]"
                    style={{ background: 'rgba(147,51,234,0.2)', color: '#a855f7' }}
                  >
                    pending
                  </span>
                </label>
                <ul className="flex flex-col gap-2">
                  {pendingInfos.map(info => (
                    <li
                      key={info.id}
                      className="flex items-start gap-3 px-4 py-3 rounded-xl"
                      style={{ background: 'rgba(147,51,234,0.04)', border: '1px dashed rgba(147,51,234,0.25)' }}
                    >
                      <span
                        className="text-[0.83rem] leading-[1.65] flex-1"
                        style={{ color: 'rgba(255,255,255,0.55)', fontFamily: "'DM Sans', sans-serif" }}
                      >
                        {info.content}
                      </span>
                      <button
                        type="button"
                        onClick={() => removePendingInfo(info.id)}
                        className="flex-shrink-0 transition-colors duration-200"
                        style={{ color: 'rgba(255,255,255,0.2)' }}
                        onMouseEnter={e => e.currentTarget.style.color = '#ef4444'}
                        onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.2)'}
                      >
                        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                          <path d="M18 6L6 18M6 6l12 12"/>
                        </svg>
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Empty state */}
            {infos.length === 0 && pendingInfos.length === 0 && (
              <div
                className="flex flex-col items-center gap-2 py-8 rounded-xl"
                style={{ border: '1px dashed rgba(255,255,255,0.06)', color: 'rgba(255,255,255,0.2)' }}
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/>
                </svg>
                <p className="text-[0.78rem]" style={{ fontFamily: "'DM Sans', sans-serif" }}>No infos yet</p>
              </div>
            )}

            {/* Add info input */}
            <div className="flex flex-col gap-2">
              <label className="field-label">Add Info</label>
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Enter a lore detail..."
                  value={infoInput}
                  onChange={e => setInfoInput(e.target.value)}
                  onKeyDown={e => { if (e.key === 'Enter') { e.preventDefault(); addPendingInfo(); } }}
                  className="field-input flex-1"
                />
                <button
                  type="button"
                  onClick={addPendingInfo}
                  disabled={!infoInput.trim()}
                  className="px-4 py-2.5 rounded-xl text-[0.75rem] font-bold tracking-[0.08em] uppercase transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed flex-shrink-0"
                  style={{
                    background: 'rgba(147,51,234,0.15)',
                    border: '1px solid rgba(147,51,234,0.25)',
                    color: '#a855f7',
                    fontFamily: "'DM Sans', sans-serif",
                  }}
                  onMouseEnter={e => { if (infoInput.trim()) e.currentTarget.style.background = 'rgba(147,51,234,0.28)'; }}
                  onMouseLeave={e => e.currentTarget.style.background = 'rgba(147,51,234,0.15)'}
                >
                  Add
                </button>
              </div>
            </div>

          </div>
        )}

        {/* ── OKAY / CANCEL (always visible) ── */}
        <div className="flex gap-3 pt-1">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 py-3 rounded-xl text-[0.8rem] font-semibold tracking-[0.06em] uppercase transition-all duration-200"
            style={{ border: '1px solid rgba(255,255,255,0.08)', color: 'rgba(255,255,255,0.45)', fontFamily: "'DM Sans', sans-serif" }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.16)'; e.currentTarget.style.color = 'rgba(255,255,255,0.7)'; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'; e.currentTarget.style.color = 'rgba(255,255,255,0.45)'; }}
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleOkay}
            disabled={!name.trim()}
            className="flex-1 py-3 rounded-xl text-[0.8rem] font-bold tracking-[0.08em] uppercase text-white transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed hover:enabled:-translate-y-0.5"
            style={{ background: 'linear-gradient(135deg, #6d28d9, #9333ea)', boxShadow: '0 0 20px rgba(88,28,135,0.35)', fontFamily: "'DM Sans', sans-serif" }}
            onMouseEnter={e => { if (name.trim()) e.currentTarget.style.boxShadow = '0 0 30px rgba(147,51,234,0.55)'; }}
            onMouseLeave={e => e.currentTarget.style.boxShadow = '0 0 20px rgba(88,28,135,0.35)'}
          >
            Okay
          </button>
        </div>

      </div>
    </ModalShell>
  );
}