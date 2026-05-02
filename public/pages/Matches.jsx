import React from 'react';
import { useMatchesController } from '../../Controllers/useMatchesController';
import BottomNav from '../components/BottomNav';

function cn(...classes) { return classes.filter(Boolean).join(' '); }

export default function Matches() {
  const { matches, newMatch, navigateToChat, navigateToProfile } = useMatchesController();

  return (
    <div className="page active s-in-r pb-[72px]" style={{ background: 'var(--ink)', zIndex: 10 }}>
      {/* Header */}
      <header className="px-6 py-6 border-b border-faint">
        <div className="flex items-baseline justify-between">
          <h1 className="font-cormorant italic text-3xl text-cream">Connections</h1>
          <span className="font-josefin text-[0.55rem] tracking-widest text-muted uppercase">
            {matches.length} {matches.length === 1 ? 'match' : 'matches'}
          </span>
        </div>
      </header>

      <div className="flex-1 overflow-y-auto">
        {matches.length === 0 ? (
          <div className="flex flex-col items-center justify-center p-12 text-center mt-12">
            <p className="font-lora italic text-muted text-lg leading-relaxed">
              The right people take time to find.
            </p>
          </div>
        ) : (
          <div className="flex flex-col">
            {/* New Match Banner */}
            {newMatch && (
              <div className="p-6">
                <button
                  onClick={() => navigateToChat(newMatch.id)}
                  className="w-full bg-terra/5 border border-terra/25 p-5 rounded-sm text-left hover:bg-terra/10 transition-colors"
                >
                  <div className="flex items-center gap-2 mb-4">
                    <span className="w-2 h-2 rounded-full bg-terra animate-pulse-dot" />
                    <span className="font-josefin text-[0.5rem] uppercase tracking-widest text-terra">New Match · Just now</span>
                  </div>

                  <div className="flex -space-x-3 mb-4">
                    <div className="w-12 h-12 rounded-full border border-ink overflow-hidden bg-ink4">
                      <div className="w-full h-full bg-gradient-to-br from-terra/20 to-sand/10" />
                    </div>
                    <div className="w-12 h-12 rounded-full border border-terra/50 overflow-hidden z-10">
                      {newMatch.user2.layer1_photos?.[0] ? (
                        <img src={newMatch.user2.layer1_photos[0]} alt="" className="w-full h-full object-cover" />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-terra/30 to-sand/20" />
                      )}
                    </div>
                  </div>

                  <p className="font-lora text-sm text-cream/80 leading-relaxed mb-4">
                    You and {newMatch.user2.name} matched. Before you say hello — here's something real about them.
                  </p>

                  <span className="font-josefin text-[0.5rem] uppercase tracking-[0.15em] text-sand flex items-center gap-1">
                    Reveal Layer 4 — Habits <span>→</span>
                  </span>
                </button>
              </div>
            )}

            {/* Layer Exchange Prompt */}
            {matches.length > 1 && (
              <div className="px-6 pb-4">
                <div className="bg-sand/5 border border-sand/20 p-4 rounded-sm">
                  <p className="font-lora italic text-sm text-sand/80 mb-2">
                    {matches[0].user2.name} shared their Habits. Share yours to unlock theirs.
                  </p>
                  <button
                    onClick={navigateToProfile}
                    className="font-josefin text-[0.5rem] uppercase tracking-widest text-sand"
                  >
                    Add your Habits →
                  </button>
                </div>
              </div>
            )}

            {/* Conversation List */}
            <div className="flex flex-col border-t border-faint">
              {matches.map((match, i) => (
                <button
                  key={match.id}
                  onClick={() => navigateToChat(match.id)}
                  className="flex items-center gap-4 p-5 border-b border-faint hover:bg-faint2 transition-colors text-left"
                >
                  <div className="relative flex-shrink-0">
                    <div className="w-[52px] h-[52px] rounded-full overflow-hidden">
                      {match.user2.layer1_photos?.[0] ? (
                        <img src={match.user2.layer1_photos[0]} alt="" className="w-full h-full object-cover" />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-ink4 to-ink5" />
                      )}
                    </div>
                    {i === 0 && (
                      <div className="absolute right-0 bottom-0 w-3 h-3 rounded-full bg-green-600 border-2 border-ink" />
                    )}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-baseline mb-1">
                      <h3 className="font-cormorant font-semibold text-xl text-cream not-italic truncate">{match.user2.name}</h3>
                      <span className="font-josefin text-[0.5rem] uppercase tracking-widest text-muted">{i === 0 ? 'Now' : '2h'}</span>
                    </div>
                    <p className="font-lora italic text-muted text-sm truncate">
                      {match.messages?.length > 0
                        ? match.messages[match.messages.length - 1].text
                        : 'You started a connection.'}
                    </p>
                  </div>

                  {i === 1 && (
                    <div className="w-5 h-5 rounded-full bg-terra flex items-center justify-center flex-shrink-0">
                      <span className="font-josefin text-[0.5rem] text-cream">1</span>
                    </div>
                  )}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      <BottomNav active="matches" />
    </div>
  );
}
