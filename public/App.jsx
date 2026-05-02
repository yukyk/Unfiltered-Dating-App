import React, { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useAppStore } from '../Models/store';

const Onboarding = lazy(() => import('./pages/Onboarding'));
const Discover   = lazy(() => import('./pages/Discover'));
const Matches    = lazy(() => import('./pages/Matches'));
const Chat       = lazy(() => import('./pages/Chat'));
const Profile    = lazy(() => import('./pages/Profile'));
const Plans      = lazy(() => import('./pages/Plans'));

function ProtectedRoute({ children }) {
  const isAuthenticated = useAppStore(s => s.isAuthenticated);
  if (!isAuthenticated) return <Navigate to="/" replace />;
  return children;
}

function Loader() {
  return (
    <div className="flex h-[100svh] w-full items-center justify-center bg-ink">
      <div className="w-5 h-5 border-2 border-terra border-t-transparent rounded-full animate-spin" />
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <div className="phone">
        <div className="sbar"><span>9:41</span><span>▲ WiFi ⬛</span></div>
        <div className="stage" id="stage">
          <Suspense fallback={<Loader />}>
            <Routes>
              <Route path="/" element={<Onboarding />} />
              <Route path="/onboarding" element={<Onboarding />} />
              <Route path="/plans" element={<Plans />} />
              <Route path="/discover" element={
                <ProtectedRoute><Discover /></ProtectedRoute>
              } />
              <Route path="/matches" element={
                <ProtectedRoute><Matches /></ProtectedRoute>
              } />
              <Route path="/chat/:matchId" element={
                <ProtectedRoute><Chat /></ProtectedRoute>
              } />
              <Route path="/profile" element={
                <ProtectedRoute><Profile /></ProtectedRoute>
              } />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </Suspense>
        </div>
      </div>
    </BrowserRouter>
  );
}
