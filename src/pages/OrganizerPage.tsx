import React from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthorOrganizerPortal } from '../components/AuthorOrganizerPortal';
import { PageMeta } from '../components/PageMeta';
import { Breadcrumbs } from '../components/Breadcrumbs';

export const OrganizerPage: React.FC = () => {
  const navigate = useNavigate();

  const handleReturnToExplore = () => {
    navigate('/');
  };

  const breadcrumbItems = [
    { label: 'Organizer Command Hub' },
  ];

  return (
    <>
      <PageMeta 
        title="Author & Organizer Command Hub" 
        description="Monitor turnstile gates, broadcast real-time fairground announcements, simulate contactless RFID scans, and configure pass quotas."
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
        <Breadcrumbs items={breadcrumbItems} />
      </div>

      <AuthorOrganizerPortal onReturnToExplore={handleReturnToExplore} />
    </>
  );
};
