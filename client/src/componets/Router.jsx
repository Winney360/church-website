import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import Header from './layout/Header';
import Footer from './layout/Footer';
import HomePage from './pages/HomePage';
import EventsPage from './pages/EventsPage';
import SermonsPage from './pages/SermonsPage';
import GalleryPage from './pages/GalleryPage';
import CommunityPage from './pages/CommunityPage';
import ContactPage from './pages/ContactPage';
import AboutPage from './pages/AboutPage';
import SearchPage from './pages/SearchPage';
import AdminDashboard from './admin/AdminDashboard';
import LoadingSpinner from './ui/LoadingSpinner';

const Router = () => {
  const { loading } = useAuth();
  const [currentPage, setCurrentPage] = useState('home');

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage />;
      case 'events':
        return <EventsPage />;
      case 'sermons':
        return <SermonsPage />;
      case 'gallery':
        return <GalleryPage />;
      case 'community':
        return <CommunityPage />;
      case 'contact':
        return <ContactPage />;
      case 'about':
        return <AboutPage />;
      case 'search':
        return <SearchPage />;
      case 'admin':
        return <AdminDashboard />;
      default:
        return <HomePage />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header currentPage={currentPage} setCurrentPage={setCurrentPage} />
      <main className="flex-1">
        {renderPage()}
      </main>
      <Footer />
    </div>
  );
};

export default Router;