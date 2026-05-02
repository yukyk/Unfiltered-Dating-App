import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppStore } from '../../Models/store';

function cn(...classes) { return classes.filter(Boolean).join(' '); }

export default function BottomNav({ active }) {
  const navigate = useNavigate();
  const matches = useAppStore(s => s.matches);
  const hasNewMatches = matches.length > 0;

  const tabs = [
    {
      id: 'discover',
      label: 'Discover',
      path: '/discover',
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <circle cx="12" cy="12" r="10" />
          <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" />
        </svg>
      ),
    },
    {
      id: 'matches',
      label: 'Matches',
      path: '/matches',
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
        </svg>
      ),
      badge: hasNewMatches,
    },
    {
      id: 'profile',
      label: 'Profile',
      path: '/profile',
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
          <circle cx="12" cy="7" r="4" />
        </svg>
      ),
    },
  ];

  return (
    <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[390px] h-[68px] bg-ink2 border-t border-faint flex items-center justify-around z-40">
      {tabs.map(tab => {
        const isActive = active === tab.id;
        return (
          <button
            key={tab.id}
            onClick={() => navigate(tab.path)}
            className={cn(
              'flex flex-col items-center gap-1 py-2 px-4 transition-colors relative',
              isActive ? 'text-terra' : 'text-muted hover:text-cream/60',
            )}
          >
            {tab.icon}
            <span className="font-josefin font-light text-[0.52rem] tracking-[0.18em] uppercase">
              {tab.label}
            </span>
            {tab.badge && !isActive && (
              <div className="absolute top-1 right-2 w-2 h-2 rounded-full bg-terra" />
            )}
          </button>
        );
      })}
    </nav>
  );
}
