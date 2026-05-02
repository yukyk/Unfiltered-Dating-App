import React from 'react';
import BottomNav from '../components/BottomNav';
import { useProfileController } from '../../Controllers/useProfileController';

function cn(...classes) { return classes.filter(Boolean).join(' '); }

// ════════════════════════════════════════
// SETTINGS OVERLAY
// ════════════════════════════════════════
function SettingsOverlay({ isOpen, onClose, onLogout, profile, plan, onUpgrade }) {
  if (!isOpen) return null;
  return (
    <div className="absolute inset-0 z-50 bg-ink flex flex-col slide-up-in">
      <div className="flex items-center justify-between p-6 border-b border-faint">
        <h2 className="font-cormorant italic text-2xl text-cream">Settings</h2>
        <button onClick={onClose} className="text-muted font-josefin text-xs uppercase tracking-widest hover:text-cream">Close ✕</button>
      </div>
      
      <div className="flex-1 overflow-y-auto p-6 space-y-8">
        <div>
          <p className="font-josefin text-[0.6rem] tracking-[0.2em] uppercase text-muted mb-4">Account</p>
          <div className="bg-ink3 rounded-sm border border-faint/50 p-4">
            <p className="font-lora text-cream text-sm mb-1">{profile.email || 'user@unfiltered.app'}</p>
            <p className="font-josefin text-xs text-muted">Signed in via Google</p>
          </div>
        </div>

        <div>
          <p className="font-josefin text-[0.6rem] tracking-[0.2em] uppercase text-muted mb-4">Subscription</p>
          <div className="bg-ink3 rounded-sm border border-faint/50 p-4 flex items-center justify-between">
            <div>
              <p className="font-lora text-cream text-sm mb-1 capitalize">{plan} Plan</p>
              <p className="font-josefin text-xs text-muted">{plan === 'unfiltered' ? 'All features unlocked' : 'Limited features'}</p>
            </div>
            {plan !== 'unfiltered' && (
              <button onClick={onUpgrade} className="font-josefin text-[0.55rem] tracking-widest uppercase text-terra border border-terra/40 px-3 py-1.5 rounded-sm hover:bg-terra/5">Upgrade</button>
            )}
          </div>
        </div>

        <div>
          <p className="font-josefin text-[0.6rem] tracking-[0.2em] uppercase text-muted mb-4">Preferences</p>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="font-lora text-cream text-sm">Distance Preference</span>
              <span className="font-josefin text-xs text-muted">Up to 25 mi</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="font-lora text-cream text-sm">Age Range</span>
              <span className="font-josefin text-xs text-muted">22 - 32</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="font-lora text-cream text-sm">Push Notifications</span>
              <div className="w-8 h-4 rounded-full bg-terra/20 relative">
                <div className="w-4 h-4 rounded-full bg-terra absolute right-0"></div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="pt-8 pb-12">
          <button onClick={onLogout} className="w-full py-4 border border-faint text-muted hover:text-cream hover:border-cream/20 font-josefin text-xs tracking-widest uppercase transition-colors">
            Log Out
          </button>
        </div>
      </div>
    </div>
  );
}

// ════════════════════════════════════════
// EDIT PROFILE OVERLAY
// ════════════════════════════════════════
function EditProfileOverlay({ isOpen, onClose, form, onFormChange, onSave, onHabitChange, onOpinionChange, addOpinion, removeOpinion, onPhotoUpload, onPhotoRemove, gender }) {
  if (!isOpen) return null;

  const habitsList = ['sleep', 'diet', 'screentime', 'faith'];

  const renderPhotoGrid = (layerKey, maxSlots, title, desc) => (
    <div className="mb-8">
      <h3 className="font-cormorant italic text-xl text-cream mb-1">{title}</h3>
      <p className="font-lora text-muted text-xs mb-4">{desc}</p>
      <div className={cn("grid gap-2", maxSlots === 4 ? "grid-cols-2" : "grid-cols-3")}>
        {Array.from({ length: maxSlots }).map((_, i) => {
          const url = form[layerKey]?.[i];
          return (
            <div key={i} className="relative aspect-[3/4] bg-ink4 border border-dashed border-faint/50 flex flex-col items-center justify-center rounded-sm overflow-hidden" onClick={() => !url && document.getElementById(`up-${layerKey}-${i}`).click()}>
              <input id={`up-${layerKey}-${i}`} type="file" accept="image/*" className="hidden" onChange={(e) => onPhotoUpload(layerKey, i, e.target.files[0])} />
              {url ? (
                <>
                  <img src={url} alt="" className="w-full h-full object-cover" />
                  <button onClick={(e) => { e.stopPropagation(); onPhotoRemove(layerKey, i); }} className="absolute top-1 right-1 w-6 h-6 bg-black/50 text-white rounded-full text-xs flex items-center justify-center backdrop-blur-md">✕</button>
                </>
              ) : (
                <span className="text-muted text-[0.6rem] uppercase tracking-widest">+ Add</span>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );

  return (
    <div className="absolute inset-0 z-50 bg-ink flex flex-col slide-up-in">
      <div className="flex items-center justify-between p-5 border-b border-faint sticky top-0 bg-ink/95 backdrop-blur-md z-10">
        <button onClick={onClose} className="text-muted font-josefin text-xs uppercase tracking-widest hover:text-cream">Cancel</button>
        <h2 className="font-cormorant italic text-xl text-cream">Edit Profile</h2>
        <button onClick={onSave} className="text-terra font-josefin text-xs uppercase tracking-widest hover:text-terra2">Save</button>
      </div>
      
      <div className="flex-1 overflow-y-auto p-6 pb-24">
        {/* Basic Info */}
        <div className="mb-10 space-y-4">
          <p className="font-josefin text-[0.6rem] tracking-[0.2em] uppercase text-muted mb-2">Basic Info</p>
          <div className="flex gap-4">
            <div className="flex-1">
              <label className="block text-xs font-josefin text-muted mb-1 uppercase tracking-widest">Name</label>
              <input type="text" value={form.name} onChange={e => onFormChange('name', e.target.value)} className="w-full bg-ink3 border border-faint text-cream p-3 text-sm focus:border-terra/50 outline-none rounded-sm" />
            </div>
            <div className="w-20">
              <label className="block text-xs font-josefin text-muted mb-1 uppercase tracking-widest">Age</label>
              <input type="number" value={form.age} onChange={e => onFormChange('age', e.target.value)} className="w-full bg-ink3 border border-faint text-cream p-3 text-sm focus:border-terra/50 outline-none rounded-sm" />
            </div>
          </div>
          <div>
            <label className="block text-xs font-josefin text-muted mb-1 uppercase tracking-widest">City</label>
            <input type="text" value={form.city} onChange={e => onFormChange('city', e.target.value)} className="w-full bg-ink3 border border-faint text-cream p-3 text-sm focus:border-terra/50 outline-none rounded-sm" />
          </div>
        </div>

        {/* Media Layers */}
        <p className="font-josefin text-[0.6rem] tracking-[0.2em] uppercase text-muted mb-4 mt-8">Photos</p>
        {renderPhotoGrid('layer1_photos', gender === 'female' ? 4 : 2, 'Layer 1: The Cover', 'Your best honest angles.')}
        {renderPhotoGrid('layer2_photos', gender === 'female' ? 2 : 2, 'Layer 2: Real Picks', 'Unposed, badly lit, authentic.')}
        {renderPhotoGrid('layer3_photos', 3, 'Layer 3: The Everyday', 'What a standard Tuesday looks like.')}

        {/* Deep Layers */}
        <div className="mt-12 space-y-10">
          <p className="font-josefin text-[0.6rem] tracking-[0.2em] uppercase text-muted mb-4 border-b border-faint pb-2">Deep Layers</p>
          
          <div>
            <h3 className="font-cormorant italic text-xl text-cream mb-1">Layer 4: Habits</h3>
            <p className="font-lora text-muted text-xs mb-4">Your actual lifestyle.</p>
            <div className="grid grid-cols-2 gap-3">
              {habitsList.map(h => (
                <div key={h}>
                  <label className="block text-[0.55rem] font-josefin text-muted mb-1 uppercase tracking-widest">{h}</label>
                  <input type="text" value={form.layer4_habits[h] || ''} onChange={e => onHabitChange(h, e.target.value)} placeholder="e.g., 1-3am" className="w-full bg-ink3 border border-faint text-cream p-2 text-sm focus:border-terra/50 outline-none rounded-sm" />
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-cormorant italic text-xl text-cream mb-1">Layer 5: Opinions</h3>
            <p className="font-lora text-muted text-xs mb-4">Hills to die on.</p>
            <div className="space-y-2">
              {form.layer5_opinions.map((op, i) => (
                <div key={i} className="flex gap-2">
                  <input type="text" value={op} onChange={e => onOpinionChange(i, e.target.value)} className="flex-1 bg-ink3 border border-faint text-cream p-2 text-sm focus:border-terra/50 outline-none rounded-sm" />
                  <button onClick={() => removeOpinion(i)} className="text-muted hover:text-terra px-2">✕</button>
                </div>
              ))}
              {form.layer5_opinions.length < 3 && (
                <button onClick={addOpinion} className="text-xs text-terra font-josefin uppercase tracking-widest mt-2 hover:opacity-80">+ Add Opinion</button>
              )}
            </div>
          </div>

          <div>
            <h3 className="font-cormorant italic text-xl text-cream mb-1">Layer 6: The Wound</h3>
            <p className="font-lora text-muted text-xs mb-4">Private until exchanged.</p>
            <textarea value={form.layer6_wound} onChange={e => onFormChange('layer6_wound', e.target.value)} rows="4" className="w-full bg-wound border border-terra/30 text-cream p-3 text-sm focus:border-terra/60 outline-none rounded-sm resize-none" placeholder="What hurt you most..." />
          </div>

          <div>
            <h3 className="font-cormorant italic text-xl text-cream mb-1">Layer 7: The Ask</h3>
            <p className="font-lora text-muted text-xs mb-4">What do you really need?</p>
            <textarea value={form.layer7_ask} onChange={e => onFormChange('layer7_ask', e.target.value)} rows="3" className="w-full bg-gradient-to-br from-terra/5 to-ink4 border border-faint text-cream p-3 text-sm focus:border-terra/50 outline-none rounded-sm resize-none text-center font-cormorant italic text-lg" placeholder="Just tell me the truth..." />
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Profile() {
  const {
    profile,
    plan,
    score,
    openLayer,
    canSeeLayer,
    handleLayerToggle,
    handleUpgradeClick,
    handleLogout,
    isEditing,
    openEdit,
    closeEdit,
    isSettingsOpen,
    setIsSettingsOpen,
    editForm,
    handleFormChange,
    handleHabitChange,
    handleOpinionChange,
    addOpinion,
    removeOpinion,
    handlePhotoUpload,
    handlePhotoRemove,
    handleSaveProfile
  } = useProfileController();

  const layerData = [
    { num: 1, name: 'The Cover', content: () => (
      <div className="grid grid-cols-2 gap-2">
        {(profile.layer1_photos || []).map((url, i) => (
          <img key={i} src={url} alt="" className="w-full aspect-[3/4] object-cover rounded-sm" />
        ))}
        {(!profile.layer1_photos || profile.layer1_photos.length === 0) && (
          <div onClick={openEdit} className="w-full aspect-[3/4] border border-dashed border-cream/8 flex items-center justify-center text-muted font-josefin uppercase text-[0.5rem] tracking-widest rounded-sm cursor-pointer hover:border-cream/20">
            + Add
          </div>
        )}
      </div>
    )},
    { num: 2, name: 'Real Picks', desc: 'Bad lighting. Tired mornings. Unposed.', content: () => (
      <div className="grid grid-cols-2 gap-2">
        {(profile.layer2_photos || []).map((url, i) => (
          <img key={i} src={url} alt="" className="w-full aspect-[3/4] object-cover rounded-sm" />
        ))}
        {(!profile.layer2_photos || profile.layer2_photos.length === 0) && (
          <div onClick={openEdit} className="w-full aspect-[3/4] border border-dashed border-cream/8 flex items-center justify-center text-muted font-josefin uppercase text-[0.5rem] tracking-widest rounded-sm cursor-pointer hover:border-cream/20">
            + Unposed
          </div>
        )}
      </div>
    )},
    { num: 3, name: 'The Everyday', desc: 'What a Tuesday actually looks like.', content: () => (
      <div className="grid grid-cols-3 gap-2">
        {(profile.layer3_photos || []).map((url, i) => (
          <img key={i} src={url} alt="" className="w-full aspect-[3/4] object-cover rounded-sm" />
        ))}
        {(!profile.layer3_photos || profile.layer3_photos.length === 0) && (
          <div onClick={openEdit} className="w-full aspect-square border border-dashed border-cream/8 flex items-center justify-center text-muted font-josefin uppercase text-[0.45rem] tracking-widest rounded-sm cursor-pointer hover:border-cream/20">
            + Daily
          </div>
        )}
      </div>
    )},
    { num: 4, name: 'Habits', desc: 'Sleep, diet, faith, and screen time.', content: () => {
      const h = profile.layer4_habits;
      if (!h || Object.keys(h).length === 0) return <p className="font-lora italic text-muted text-sm cursor-pointer hover:text-cream transition-colors" onClick={openEdit}>No habits added yet. Tap to add.</p>;
      return (
        <div className="grid grid-cols-2 gap-3" onClick={openEdit}>
          {Object.entries(h).map(([key, val]) => val && (
            <div key={key} className="bg-ink5 p-3 rounded-sm cursor-pointer hover:bg-ink4 transition-colors">
              <span className="font-josefin text-[0.5rem] tracking-wider uppercase text-muted block mb-1 capitalize">{key}</span>
              <span className="font-lora text-sm text-cream">{val}</span>
            </div>
          ))}
        </div>
      );
    }},
    { num: 5, name: 'Opinions', desc: 'Unfiltered statements and hills to die on.', content: () => {
      const opinions = profile.layer5_opinions || [];
      if (!opinions.length) return <p className="font-lora italic text-muted text-sm cursor-pointer hover:text-cream transition-colors" onClick={openEdit}>No opinions shared yet. Tap to add.</p>;
      return (
        <div className="flex flex-col gap-3" onClick={openEdit}>
          {opinions.map((op, i) => (
            <div key={i} className="border-l-2 border-terra pl-4 py-1 cursor-pointer hover:opacity-80 transition-opacity">
              <p className="font-lora italic text-cream/80">{op}</p>
            </div>
          ))}
        </div>
      );
    }},
    { num: 6, name: 'The Wound', desc: 'Private · Shared only when they share theirs', content: () => {
      const wound = profile.layer6_wound;
      return (
        <div className="bg-wound p-5 border-t-2 border-terra rounded-sm cursor-pointer hover:opacity-90 transition-opacity" onClick={openEdit}>
          {wound ? (
            <p className="font-lora italic text-cream/80 leading-relaxed">{wound}</p>
          ) : (
            <p className="font-lora italic text-muted/50">
              No judgment here. This is between you and whoever earns the right to read it. Tap to write.
            </p>
          )}
          <span className="font-josefin text-[0.45rem] tracking-wider uppercase text-muted mt-3 block">
            Private · Exchange required
          </span>
        </div>
      );
    }},
    { num: 7, name: 'The Ask', desc: 'Your one ask — honest & raw.', content: () => {
      const ask = profile.layer7_ask;
      return (
        <div className="bg-gradient-to-br from-terra/10 to-ink4 p-5 rounded-sm text-center cursor-pointer hover:opacity-90 transition-opacity" onClick={openEdit}>
          {ask ? (
            <p className="font-cormorant italic text-2xl text-cream leading-relaxed">{ask}</p>
          ) : (
            <p className="font-lora italic text-muted/50">
              What's the one thing you've never quite said out loud? Tap to write.
            </p>
          )}
        </div>
      );
    }},
  ];

  return (
    <div className="page active s-in-r pb-[72px]" style={{ background: 'var(--ink)', zIndex: 10 }}>
      {/* Hero */}
      <div className="relative h-[260px] w-full overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-ink/40 via-transparent to-ink z-10" />
        {profile.layer1_photos?.[0] ? (
          <img src={profile.layer1_photos[0]} alt="" className="w-full h-full object-cover" />
        ) : (
          <div className={cn('w-full h-full', profile.gender === 'male' ? 'bg-m-bg' : 'bg-f-bg')} />
        )}

        {/* Settings button */}
        <button onClick={() => setIsSettingsOpen(true)} className="absolute top-6 right-6 z-20 flex items-center justify-center w-10 h-10 bg-black/30 backdrop-blur-md border border-white/10 text-cream rounded-full hover:bg-black/50 transition-colors">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path></svg>
        </button>

        {/* Edit button */}
        <button onClick={openEdit} className="absolute top-6 left-6 z-20 flex items-center gap-2 bg-black/30 backdrop-blur-md border border-white/10 px-4 py-2 h-10 text-cream font-josefin text-[0.5rem] tracking-[0.2em] uppercase rounded-full hover:bg-black/50 transition-colors">
          Edit Profile
        </button>

        {/* Info overlay */}
        <div className="absolute bottom-6 left-6 z-20">
          <h1 className="font-cormorant font-semibold text-[2.3rem] text-cream leading-none not-italic">{profile.name}</h1>
          <div className="flex items-center gap-2 font-josefin text-sm tracking-widest text-muted mt-2">
            <span>{profile.age || '—'}</span>
            <span className="w-1 h-1 rounded-full bg-terra" />
            <span>{profile.city || '—'}</span>
            <span className="w-1 h-1 rounded-full bg-terra" />
            <button onClick={handleUpgradeClick} className="uppercase text-terra underline underline-offset-2">
              {plan} plan
            </button>
          </div>

          {/* Realness badge */}
          <div className="mt-3 flex items-center gap-2 bg-terra/15 border border-terra/40 px-3 py-1.5 rounded-sm w-fit">
            <div className="w-2 h-2 rounded-full bg-terra animate-pulse-dot" />
            <span className="font-josefin text-[0.5rem] tracking-widest uppercase text-sand">
              Realness Score: {score}%
            </span>
          </div>
        </div>
      </div>

      {/* 7 Layer Accordions */}
      <div className="flex flex-col bg-ink relative z-10">
        {layerData.map(layer => {
          const unlocked = canSeeLayer(layer.num);
          const isOpen = openLayer === layer.num;

          return (
            <div key={layer.num} className="border-b border-faint/50">
              <button
                onClick={() => handleLayerToggle(layer.num)}
                className="w-full flex items-center gap-4 px-6 py-5 text-left hover:bg-faint2 transition-colors"
              >
                <span className="font-josefin text-terra text-[0.7rem] tracking-wider font-mono w-4">{layer.num}</span>
                <span className="font-josefin text-[0.6rem] tracking-[0.2em] uppercase text-cream/80 flex-1">{layer.name}</span>
                {!unlocked && <span className="text-[0.6rem]">🔒</span>}
                <span className={cn('text-muted/50 text-sm transition-transform', isOpen && 'rotate-180')}>▾</span>
              </button>

              {isOpen && (
                <div className="px-6 pb-6">
                  {unlocked ? (
                    layer.content()
                  ) : (
                    <div className="bg-ink3 border border-cream/5 p-5 rounded-sm text-center">
                      <span className="text-2xl mb-3 block">🔒</span>
                      <p className="font-lora italic text-muted text-sm mb-4">{layer.desc || 'Unlock this layer for deeper visibility.'}</p>
                      <button
                        onClick={handleUpgradeClick}
                        className="font-josefin text-[0.5rem] tracking-widest uppercase text-terra border border-terra/40 px-4 py-2 hover:bg-terra/5 transition-colors"
                      >
                        Upgrade to unlock
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>

      <BottomNav active="profile" />
      
      {/* Overlays */}
      <SettingsOverlay 
        isOpen={isSettingsOpen} 
        onClose={() => setIsSettingsOpen(false)} 
        onLogout={handleLogout} 
        profile={profile} 
        plan={plan} 
        onUpgrade={handleUpgradeClick} 
      />
      
      <EditProfileOverlay 
        isOpen={isEditing} 
        onClose={closeEdit} 
        form={editForm} 
        onFormChange={handleFormChange} 
        onSave={handleSaveProfile} 
        onHabitChange={handleHabitChange} 
        onOpinionChange={handleOpinionChange} 
        addOpinion={addOpinion} 
        removeOpinion={removeOpinion} 
        onPhotoUpload={handlePhotoUpload} 
        onPhotoRemove={handlePhotoRemove} 
        gender={profile.gender}
      />
    </div>
  );
}
