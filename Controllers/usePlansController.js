import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppStore } from '../Models/store';

export function usePlansController() {
  const navigate = useNavigate();
  const [selected, setSelected] = useState('unfiltered');
  const updateUser = useAppStore(s => s.updateUser);
  const resetSwipes = useAppStore(s => s.resetSwipes);
  const isAuthenticated = useAppStore(s => s.isAuthenticated);

  const plans = [
    {
      id: 'free', name: 'Free', price: '$0 / forever',
      perks: ['5 swipes per day', 'View Layer 1 profiles only', 'Up to 10 messages per match', 'Standard matching algorithm'],
    },
    {
      id: 'honest', name: 'Honest', price: '$6.99 / month',
      perks: ['10 swipes per day', 'Layers 1–4 visible on all profiles', 'Unlimited messaging', 'See who liked you', 'Habits and Everyday unlocked'],
    },
    {
      id: 'unfiltered', name: 'Unfiltered', price: '$12.99 / month', badge: 'Most real',
      perks: ['20 swipes per day', 'All 7 layers fully unlocked', 'AI compatibility read', 'Realness Score visible to matches', 'The Wound and The Ask unlocked', 'Priority in matching algorithm'],
    },
  ];

  const handleSelect = () => {
    updateUser({ plan: selected });
    resetSwipes();
    navigate(isAuthenticated ? '/discover' : '/');
  };

  const handleBack = () => {
    navigate(-1);
  };

  return {
    plans,
    selected,
    setSelected,
    handleSelect,
    handleBack
  };
}
