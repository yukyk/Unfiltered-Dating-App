import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppStore } from '../Models/store';

export function useProfileController() {
  const navigate = useNavigate();
  const currentUser = useAppStore(s => s.currentUser);
  const profiles = useAppStore(s => s.profiles);

  // For prototype: merge currentUser data with first seed profile of same gender
  const seedMatch = profiles.find(p => p.gender === currentUser?.gender) || profiles[0];
  const profile = { ...seedMatch, ...currentUser };

  const plan = currentUser?.plan || 'free';
  const [openLayer, setOpenLayer] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [editForm, setEditForm] = useState({});

  const canSeeLayer = (num) => {
    if (plan === 'unfiltered') return true;
    if (plan === 'honest' && num <= 4) return true;
    if (num === 1) return true;
    return false;
  };

  // Realness score (use seed or compute)
  const score = profile.realness_score || 42;

  const handleLayerToggle = (num) => {
    setOpenLayer(openLayer === num ? null : num);
  };

  const handleUpgradeClick = () => {
    navigate('/plans');
  };

  const handleLogout = () => {
    useAppStore.getState().logout();
  };

  // ─── EDIT PROFILE LOGIC ───
  const openEdit = () => {
    setEditForm({
      name: profile.name || '',
      age: profile.age || '',
      city: profile.city || '',
      layer1_photos: [...(profile.layer1_photos || [])],
      layer2_photos: [...(profile.layer2_photos || [])],
      layer3_photos: [...(profile.layer3_photos || [])],
      layer4_habits: { ...(profile.layer4_habits || {}) },
      layer5_opinions: [...(profile.layer5_opinions || [])],
      layer6_wound: profile.layer6_wound || '',
      layer7_ask: profile.layer7_ask || ''
    });
    setIsEditing(true);
  };

  const closeEdit = () => setIsEditing(false);

  const handleFormChange = (key, val) => {
    setEditForm(prev => ({ ...prev, [key]: val }));
  };

  const handleHabitChange = (habit, val) => {
    setEditForm(prev => ({
      ...prev,
      layer4_habits: { ...prev.layer4_habits, [habit]: val }
    }));
  };

  const handleOpinionChange = (index, val) => {
    setEditForm(prev => {
      const ops = [...prev.layer5_opinions];
      ops[index] = val;
      return { ...prev, layer5_opinions: ops };
    });
  };

  const addOpinion = () => {
    setEditForm(prev => ({
      ...prev,
      layer5_opinions: [...prev.layer5_opinions, '']
    }));
  };

  const removeOpinion = (index) => {
    setEditForm(prev => {
      const ops = [...prev.layer5_opinions];
      ops.splice(index, 1);
      return { ...prev, layer5_opinions: ops };
    });
  };

  const handlePhotoUpload = (layerKey, index, file) => {
    if (!file) return;
    const url = URL.createObjectURL(file);
    setEditForm(prev => {
      const arr = [...(prev[layerKey] || [])];
      arr[index] = url;
      return { ...prev, [layerKey]: arr };
    });
  };

  const handlePhotoRemove = (layerKey, index) => {
    setEditForm(prev => {
      const arr = [...(prev[layerKey] || [])];
      arr.splice(index, 1);
      return { ...prev, [layerKey]: arr };
    });
  };

  const handleSaveProfile = () => {
    // Filter out empty opinions
    const cleanedOpinions = editForm.layer5_opinions.filter(o => o.trim().length > 0);
    const updatedData = { ...editForm, layer5_opinions: cleanedOpinions };
    
    useAppStore.getState().updateUser(updatedData);
    setIsEditing(false);
  };

  return {
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
  };
}
