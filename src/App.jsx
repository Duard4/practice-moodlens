import React, { useEffect } from 'react';
import Layout from './components/Layout';
import { Navigate, Route, Routes } from 'react-router-dom';
import './App.css';
import { useDispatch, useSelector } from 'react-redux';
import { getUser } from './redux/auth/operation';

const AnaliticPage = React.lazy(() => import('./pages/AnaliticPage'));
const ArchivePage = React.lazy(() => import('./pages/ArchivePage'));
const EditorPage = React.lazy(() => import('./pages/EditorPage'));
const ReviewsPage = React.lazy(() => import('./pages/ReviewsPage'));
const ReviewDetail = React.lazy(() => import('./pages/ReviewDetail'));
const UserPage = React.lazy(() => import('./pages/UserPage'));

function App() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    if (!user) {
      dispatch(getUser());
    }
  }, [dispatch, user]);

  return (
    <Layout>
      <Routes>
        <Route path="/" element={<AnaliticPage />} />
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
