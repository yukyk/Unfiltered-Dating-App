import { create } from 'zustand';

// Seed profiles per spec (Section 9)
const seedProfiles = [
  {
    id: 'seed-sara', name: 'Sara', age: 24, city: 'New York', gender: 'female',
    plan: 'unfiltered', realness_score: 78, distance: '2 mi',
    tagline: "I'll warn you early — I overthink everything.",
    layer1_photos: ['https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80'],
    layer2_photos: [], layer3_photos: [],
    layer4_habits: { sleep: '1–3am', diet: 'Mixed', screentime: '4–6hrs', faith: 'Personal' },
    layer5_opinions: ['Overthinking is just another word for caring.'],
    layer6_wound: "I spent two years being the version of myself everyone needed. I forgot what I actually wanted. That's still something I'm finding.",
    layer7_ask: "Just stay when it gets hard. That's all I've needed.",
  },
  {
    id: 'seed-nadia', name: 'Nadia', age: 26, city: 'Chicago', gender: 'female',
    plan: 'unfiltered', realness_score: 91, distance: '1 mi',
    tagline: "Silence doesn't scare me. Shallow does.",
    layer1_photos: ['https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=800&q=80'],
    layer2_photos: ['https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=800&q=80'],
    layer3_photos: [],
    layer4_habits: { sleep: 'Before midnight', diet: 'Vegetarian', screentime: 'Under 3hrs', faith: 'Daily practice' },
    layer5_opinions: ['Honesty without empathy is just cruelty.', "If you can't sit in silence with me, we won't work."],
    layer6_wound: "I let someone treat me like a backup plan for so long I started to believe that was all I was worth. I know better now.",
    layer7_ask: "Tell me the truth even when it's uncomfortable.",
  },
  {
    id: 'seed-layla', name: 'Layla', age: 22, city: 'Austin', gender: 'female',
    plan: 'honest', realness_score: 45, distance: '5 mi',
    tagline: 'I need someone who reads.',
    layer1_photos: ['https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=800&q=80'],
    layer2_photos: [], layer3_photos: [],
    layer4_habits: null,
    layer5_opinions: [],
    layer6_wound: '',
    layer7_ask: 'Pay attention to the small things. I notice when you do.',
  },
  {
    id: 'seed-yusuf', name: 'Yusuf', age: 24, city: 'London', gender: 'male',
    plan: 'unfiltered', realness_score: 84, distance: '3 mi',
    tagline: "I spent a long time being who everyone needed. Still finding myself.",
    layer1_photos: ['https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=800&q=80'],
    layer2_photos: [], layer3_photos: [],
    layer4_habits: { sleep: '1–3am', diet: 'Mixed', screentime: '4–6hrs', faith: 'Daily practice' },
    layer5_opinions: ["Vulnerability isn't weakness — it's the hardest thing you can do."],
    layer6_wound: "I was the strong one for everyone else. Nobody asked how I was doing. I didn't know how to say I wasn't okay.",
    layer7_ask: "Don't confuse my quiet for distance.",
  },
  {
    id: 'seed-aryan', name: 'Aryan', age: 26, city: 'Toronto', gender: 'male',
    plan: 'honest', realness_score: 67, distance: '7 mi',
    tagline: "Loyalty isn't something I say — it's how I show up.",
    layer1_photos: ['https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80'],
    layer2_photos: [], layer3_photos: [],
    layer4_habits: null,
    layer5_opinions: [],
    layer6_wound: '',
    layer7_ask: "Be consistent. That's it.",
  },
  {
    id: 'seed-riya', name: 'Riya', age: 23, city: 'San Francisco', gender: 'female',
    plan: 'unfiltered', realness_score: 88, distance: '10 mi',
    tagline: 'I laugh too loud. Consider yourself warned.',
    layer1_photos: ['https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=800&q=80'],
    layer2_photos: [], layer3_photos: [],
    layer4_habits: { sleep: 'Before midnight', diet: "Whatever's there", screentime: '4–6hrs', faith: 'Not religious' },
    layer5_opinions: ['Coffee dates are better than drinks.', "I'd rather be overdressed."],
    layer6_wound: 'I pushed away the last person who actually understood me because I was scared of being seen.',
    layer7_ask: "Let me be a lot. It's the best thing I have.",
  },
];

export const useAppStore = create((set, get) => ({
  // ─── Auth State ───
  currentUser: null,
  isAuthenticated: false,

  // ─── Onboarding State ───
  selectedGender: null,  // 'male' | 'female'
  onboardingAnswers: {},
  onboardingStep: 0,     // tracks current position in onboarding

  // ─── Profile Setup State ───
  profileSetup: {
    name: '',
    email: '',
    coverPhotos: [],
    goodChapterAnswers: {},
    sadChapterAnswers: {},
    badChapterAnswers: {},
    habits: { sleep: null, diet: null, screentime: null, faith: null },
    theAsk: '',
  },

  // ─── App Data ───
  profiles: seedProfiles,
  matches: [],
  swipesLeft: 5,
  lastSwipeReset: new Date().toDateString(),

  // ─── Actions: Auth ───
  login: (userData) => set({
    currentUser: userData,
    isAuthenticated: true,
  }),
  logout: () => set({
    currentUser: null,
    isAuthenticated: false,
  }),
  updateUser: (data) => set(state => ({
    currentUser: { ...state.currentUser, ...data },
  })),

  // ─── Actions: Onboarding ───
  setGender: (gender) => set({ selectedGender: gender }),
  setOnboardingAnswer: (questionId, answer) => set(state => ({
    onboardingAnswers: { ...state.onboardingAnswers, [questionId]: answer },
  })),

  // ─── Actions: Profile Setup ───
  updateProfileSetup: (data) => set(state => ({
    profileSetup: { ...state.profileSetup, ...data },
  })),

  // ─── Actions: Swipes ───
  recordSwipe: (swipedId, direction) => {
    const state = get();
    if (state.swipesLeft <= 0) return { isMatch: false };

    set({ swipesLeft: state.swipesLeft - 1 });

    // Simulate match on right/super swipes (50% chance for prototype)
    if (direction === 'right' || direction === 'super') {
      const isMatch = Math.random() > 0.5;
      if (isMatch) {
        const swipedUser = state.profiles.find(p => p.id === swipedId);
        if (swipedUser) {
          const newMatch = {
            id: crypto.randomUUID(),
            user2: swipedUser,
            layers_shared: [1],
            created_at: new Date(),
            messages: [],
          };
          set(state => ({
            matches: [...state.matches, newMatch],
          }));
          return { isMatch: true, user: swipedUser };
        }
      }
    }
    return { isMatch: false };
  },

  resetSwipes: () => {
    const plan = get().currentUser?.plan || 'free';
    const limits = { free: 5, honest: 10, unfiltered: 20 };
    set({ swipesLeft: limits[plan], lastSwipeReset: new Date().toDateString() });
  },

  checkDailyReset: () => {
    const today = new Date().toDateString();
    if (get().lastSwipeReset !== today) {
      get().resetSwipes();
    }
  },

  // ─── Actions: Messages ───
  addMessage: (matchId, message) => set(state => ({
    matches: state.matches.map(m =>
      m.id === matchId
        ? { ...m, messages: [...m.messages, message] }
        : m
    ),
  })),
}));
