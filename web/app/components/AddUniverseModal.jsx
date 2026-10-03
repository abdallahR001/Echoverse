'use client';

import { useState, useRef } from 'react';
import ModalShell from './ModalShell';

export default function AddUniverseModal({ onClose, onSave }) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [coverPreview, setCoverPreview] = useState(null);
  const fileRef = useRef(null);

  const handleCover = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setCoverPreview(URL.createObjectURL(file));
  };

  const handleOkay = () => {
    if (!name.trim()) return;
    onSave({
      name: name.trim(),
      description: description.trim(),
      cover: coverPreview || '/image1.png',
      infos: [],
    });
  };

  return (
    <ModalShell onClose={onClose} title="Add Universe">
      <div className="flex flex-col gap-5">

        {/* Cover upload */}
        <div className="flex flex-col gap-2">
          <label className="field-label">Cover Image</label>
          <button
            type="button"
            onClick={() => fileRef.current?.click()}
            className="relative w-full h-36 rounded-xl overflow-hidden transition-all duration-200 flex items-center justify-center group"
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
              <div className="flex flex-col items-center gap-2" style={{ color: 'rgba(147,51,234,0.5)' }}>
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <rect x="3" y="3" width="18" height="18" rx="2"/>
                  <circle cx="8.5" cy="8.5" r="1.5"/>
                  <polyline points="21 15 16 10 5 21"/>
                </svg>
                <span className="text-[0.72rem] font-semibold" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                  Click to upload cover
                </span>
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
            placeholder="The Hollow Crown..."
            value={name}
            onChange={e => setName(e.target.value)}
            className="field-input"
          />
        </div>

        {/* Description */}
        <div className="flex flex-col gap-1.5">
          <label className="field-label">Description</label>
          <textarea
            placeholder="A medieval kingdom where..."
            value={description}
            onChange={e => setDescription(e.target.value)}
            rows={3}
            className="field-input resize-none"
          />
        </div>

        {/* Actions */}
        <div className="flex gap-3 pt-2">
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
            Create
          </button>
        </div>

      </div>
    </ModalShell>
  );
}