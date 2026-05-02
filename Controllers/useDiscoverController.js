import { useState } from 'react';

export function useDiscoverController() {
  // Tab State
  const [currentTab, setCurrentTab] = useState('good');

  // Match / Swiping state
  const [showMatchOverlay, setShowMatchOverlay] = useState(false);
  const [personOpacity, setPersonOpacity] = useState(1);
  const [personTransform, setPersonTransform] = useState('translateX(0)');
  const [liked, setLiked] = useState(false);

  // Swiper States
  const [swiperState, setSwiperState] = useState({
    g1: { current: 0, total: 3 },
    g2: { current: 0, total: 2 },
    r1: { current: 0, total: 2 },
    r2: { current: 0, total: 1 },
    rare1: { current: 0, total: 3 },
    rare2: { current: 0, total: 2 }
  });

  const [expandedStories, setExpandedStories] = useState({});
  const [likedStories, setLikedStories] = useState({});

  const goSlide = (id, idx) => {
    setSwiperState(prev => ({
      ...prev,
      [id]: { ...prev[id], current: idx }
    }));
  };

  const slidePhoto = (id, dir) => {
    const s = swiperState[id];
    if (!s) return;
    const next = s.current + dir;
    if (next < 0 || next >= s.total) return;
    goSlide(id, next);
  };

  const toggleExpand = (id) => {
    setExpandedStories(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const toggleReact = (id) => {
    setLikedStories(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const doPass = () => {
    setPersonOpacity(0);
    setPersonTransform('translateX(-20px)');
    setTimeout(() => {
      setPersonOpacity(1);
      setPersonTransform('translateX(0)');
    }, 400);
  };

  const doLike = () => {
    setLiked(true);
    setTimeout(() => {
      setLiked(false);
      setShowMatchOverlay(true);
    }, 250);
  };

  return {
    currentTab, setCurrentTab,
    showMatchOverlay, setShowMatchOverlay,
    personOpacity, personTransform, liked,
    swiperState, expandedStories, likedStories,
    goSlide, slidePhoto, toggleExpand, toggleReact,
    doPass, doLike
  };
}
