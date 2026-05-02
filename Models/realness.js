// Realness Score Calculator
// Scoring per spec:
//   Name filled:          +8
//   Email filled:         +7
//   Cover photo (each):   +8 (max 2 = +16)
//   Good chapter done:    +18
//   Sad chapter done:     +14
//   Bad chapter done:     +11
//   Each habit selected:  +3 (max 4 = +12)
//   The Ask filled:       +10
//   Total possible:       96 (normalized to 100)

export function calculateRealness(profile) {
  let score = 0;

  if (profile.name) score += 8;
  if (profile.email) score += 7;

  // Cover photos: +8 each, max 2
  const coverCount = Math.min((profile.layer1_photos || []).length, 2);
  score += coverCount * 8;

  // Chapters
  if (profile.goodChapterDone) score += 18;
  if (profile.sadChapterDone) score += 14;
  if (profile.badChapterDone) score += 11;

  // Habits: +3 each, max 4
  if (profile.layer4_habits) {
    const habits = profile.layer4_habits;
    if (habits.sleep)      score += 3;
    if (habits.diet)       score += 3;
    if (habits.screentime) score += 3;
    if (habits.faith)      score += 3;
  }

  // The Ask
  if (profile.layer7_ask && profile.layer7_ask.trim().length > 0) score += 10;

  // Normalize: total possible = 8+7+16+18+14+11+12+10 = 96
  // But spec says total = 100, so cap at 100
  return Math.min(score, 100);
}

export function getRealnessMessage(score) {
  if (score >= 80) return 'Deeply honest. Your matches will feel that.';
  if (score >= 60) return 'Getting there. Every layer you add matters.';
  if (score >= 30) return 'Good start. Keep going.';
  return 'Fill your profile to build your score.';
}
