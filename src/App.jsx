import React from 'react';
import Layout from './components/Layout';
import { Navigate, Route, Routes } from 'react-router-dom';
import './App.css';

const HomePage = React.lazy(() => import('./pages/Analitic'));
const ArchivePage = React.lazy(() =>
  import('./components/Archive/ArchivePage'),
);
const EditorPage = React.lazy(() => import('./pages/Editor'));
const ReviewsPage = React.lazy(() => import('./pages/ReviewsPage'));
const ReviewDetail = React.lazy(() => import('./pages/ReviewDetail'));
const UserPage = React.lazy(() => import('./pages/UserPage'));

function App() {
  localStorage.setItem('currentUserId', 1);

  return (
    <Layout>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/editor" element={<EditorPage />} />
        <Route path="/reviews" element={<ReviewsPage />} />
        <Route path="/reviews/:id" element={<ReviewDetail />} />
        <Route path="/archive/:id" element={<ArchivePage />} />
        <Route path="/user/:id" element={<UserPage />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Layout>
  );
}

export default App;
