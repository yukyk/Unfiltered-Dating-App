import { useNavigate } from 'react-router-dom';
import { useAppStore } from '../Models/store';

export function useMatchesController() {
  const navigate = useNavigate();
  const matches = useAppStore(s => s.matches);
  const newMatch = matches.length > 0 ? matches[matches.length - 1] : null;

  const navigateToChat = (matchId) => {
    navigate(`/chat/${matchId}`);
  };

  const navigateToProfile = () => {
    navigate('/profile');
  };

  return {
    matches,
    newMatch,
    navigateToChat,
    navigateToProfile
  };
}
