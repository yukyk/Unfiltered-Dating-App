import { useState, useRef, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAppStore } from '../Models/store';

export function useChatController() {
  const navigate = useNavigate();
  const { matchId } = useParams();
  const matches = useAppStore(s => s.matches);
  const currentUser = useAppStore(s => s.currentUser);
  const addMessage = useAppStore(s => s.addMessage);

  const match = matches.find(m => m.id === matchId) || matches[0];
  const [input, setInput] = useState('');
  const messagesEndRef = useRef(null);
  
  const plan = currentUser?.plan || 'free';
  const messageLimit = plan === 'free' ? 10 : Infinity;

  const messages = match?.messages || [];
  const sentCount = messages.filter(m => m.sender === 'me').length;

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [match?.messages]);

  const handleSend = () => {
    if (!input.trim()) return;
    if (plan === 'free' && sentCount >= messageLimit) return;

    const msg = { id: Date.now().toString(), text: input, sender: 'me', time: 'Now' };
    addMessage(match.id, msg);
    setInput('');

    // Auto-reply mock
    setTimeout(() => {
      const replies = [
        "I can respect that honesty.",
        "That's the most real thing someone's said to me here.",
        "Tell me more.",
        "I think about that too, honestly.",
        "You don't have to explain — I get it.",
      ];
      const reply = replies[Math.floor(Math.random() * replies.length)];
      addMessage(match.id, { id: (Date.now() + 1).toString(), text: reply, sender: 'them', time: 'Now' });
    }, 1500);
  };

  const handleBack = () => {
    navigate('/matches');
  };

  return {
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
  };
}
