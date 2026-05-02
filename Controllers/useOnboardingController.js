import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppStore } from '../Models/store';
import maleQuestions from '../Models/data/maleQuestions';
import femaleQuestions from '../Models/data/femaleQuestions';

export function useOnboardingController() {
  const navigate = useNavigate();
  const {
    isAuthenticated,
    setGender,
    selectedGender,
    onboardingAnswers,
    setOnboardingAnswer,
    login,
    updateUser,
    resetSwipes,
  } = useAppStore();

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/discover', { replace: true });
    }
  }, [isAuthenticated, navigate]);

  const [step, setStep] = useState(0);

  const goForward = useCallback((s) => {
    setStep(s !== undefined ? s : prev => prev + 1);
  }, []);

  const goBack = useCallback(() => {
    setStep(prev => Math.max(0, prev - 1));
  }, []);

  // Use the correct questions based on selected gender
  const questions = selectedGender === 'male' ? maleQuestions : femaleQuestions;

  // Linear step to question index mapping
  // Step 0: Splash
  // Step 1: Gender
  // Steps 2-5: Q1-Q4 (Indexes 0-3)
  // Step 6: Insight 1
  // Steps 7-11: Q5-Q9 (Indexes 4-8)
  // Step 12: Insight 2
  // Steps 13-16: Q10-Q13 (Indexes 9-12)
  // Step 17: Insight 3
  const stepToQuestionIndex = (s) => {
    if (s >= 2 && s <= 5) return s - 2;
    if (s >= 7 && s <= 11) return s - 3;
    if (s >= 13 && s <= 16) return s - 4;
    return -1;
  };

  const handleAnswer = (id, value) => {
    setOnboardingAnswer(id, value);
    setTimeout(() => goForward(step + 1), 300);
  };

  const handleGenderSelect = (g) => {
    setGender(g);
    goForward(2); // Proceed to first question
  };

  const handleAccountCreate = (name, email) => {
    login({ id: crypto.randomUUID(), name, email, plan: 'free', gender: selectedGender, realness_score: 0 });
    goForward(19);
  };

  const handlePlanSelect = (plan) => {
    updateUser({ plan });
    resetSwipes();
    goForward(20);
  };

  const handleProfileFinish = () => {
    navigate('/discover');
  };

  return {
    step,
    goForward,
    goBack,
    stepToQuestionIndex,
    questions,
    selectedGender,
    onboardingAnswers,
    handleAnswer,
    handleGenderSelect,
    handleAccountCreate,
    handlePlanSelect,
    handleProfileFinish
  };
}
