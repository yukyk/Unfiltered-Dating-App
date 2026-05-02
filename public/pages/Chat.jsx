import React from 'react';
import { useChatController } from '../../Controllers/useChatController';

function cn(...classes) { return classes.filter(Boolean).join(' '); }

export default function Chat() {
  const {
    match,
    messages,
    input,
    setInput,
    messagesEndRef,
    plan,
    sentCount,
    messageLimit,
    handleSend,
    handleBack
  } = useChatController();

  if (!match) {
    return (
      <div className="min-h-[100svh] bg-ink flex items-center justify-center p-8">
        <p className="font-lora italic text-muted">Match not found.</p>
      </div>
    );
  }

  const layerNames = ['Cover', 'Picks', 'Daily', 'Habits', 'Opinions', 'Wound', 'Ask'];
  const sharedLayers = match.layers_shared || [1];

  return (
    <div className="page active s-in-r" style={{ background: 'var(--ink)', zIndex: 20 }}>
      {/* Header */}
      <header className="flex items-center gap-4 px-4 py-4 border-b border-faint shrink-0 bg-ink z-20">
        <button onClick={handleBack} className="text-muted hover:text-cream transition-colors">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
        </button>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full overflow-hidden border border-faint">
            {match.user2.layer1_photos?.[0] ? (
              <img src={match.user2.layer1_photos[0]} alt="" className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-ink4 to-ink5" />
            )}
          </div>
          <div>
            <h2 className="font-cormorant font-semibold text-xl text-cream leading-none not-italic">{match.user2.name}</h2>
            <p className="font-josefin text-[0.5rem] uppercase tracking-widest text-sand mt-1">
              Layers shared: {sharedLayers.length} of 7
            </p>
          </div>
        </div>
      </header>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-5">
        {messages.length === 0 && (
          <div className="flex-1 flex items-center justify-center">
            <p className="font-lora italic text-muted/50 text-center">
              Say something true. Not "hey".
            </p>
          </div>
        )}
        {messages.map((msg) => {
          const isMe = msg.sender === 'me';
          return (
            <div key={msg.id} className={cn('flex flex-col max-w-[80%]', isMe ? 'self-end items-end' : 'self-start items-start')}>
              <div className={cn(
                'py-3 px-4 rounded-2xl text-sm',
                isMe ? 'bg-terra text-cream rounded-br-sm font-josefin tracking-wide text-[0.7rem]' : 'bg-ink3 border border-faint text-cream rounded-bl-sm font-lora'
              )}>
                {msg.text}
              </div>
              <span className="font-josefin text-[0.45rem] text-muted tracking-widest mt-1.5 px-1 uppercase">{msg.time}</span>
            </div>
          );
        })}
        <div ref={messagesEndRef} />
      </div>

      {/* Layer Peek Bar */}
      <div className="flex items-center gap-2 overflow-x-auto px-4 py-2.5 border-t border-faint/50 bg-ink">
        {layerNames.map((name, i) => {
          const layerNum = i + 1;
          const unlocked = sharedLayers.includes(layerNum);
          return (
            <button
              key={layerNum}
              className={cn(
                'font-josefin text-[0.5rem] uppercase tracking-widest px-3 py-1 whitespace-nowrap border rounded-sm transition-colors',
                unlocked
                  ? 'border-terra/60 text-terra bg-terra/5 hover:bg-terra/10'
                  : 'border-cream/5 text-muted/40 cursor-not-allowed opacity-50',
              )}
            >
              {layerNum} {name}
            </button>
          );
        })}
      </div>

      {/* Input */}
      <div className="p-4 border-t border-faint bg-ink shrink-0">
        {plan === 'free' && (
          <div className="text-center mb-2">
            <span className="font-josefin text-[0.45rem] tracking-wider text-muted uppercase">
              {sentCount} of {messageLimit} messages used
            </span>
          </div>
        )}
        <div className="flex items-center gap-3">
          <input
            type="text"
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleSend()}
            placeholder="Say something true..."
            className="flex-1 bg-ink3 border border-cream/8 rounded-full px-5 py-3 text-sm font-lora italic text-cream placeholder-muted/40 transition-colors"
            disabled={plan === 'free' && sentCount >= messageLimit}
          />
          <button
            onClick={handleSend}
            disabled={!input.trim() || (plan === 'free' && sentCount >= messageLimit)}
            className="w-11 h-11 rounded-full bg-terra flex flex-shrink-0 items-center justify-center text-cream disabled:opacity-40 transition-all hover:bg-terra2"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z"/></svg>
          </button>
        </div>
      </div>
    </div>
  );
}
