import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

interface PageMetaProps {
  title: string;
  description?: string;
}

export const PageMeta: React.FC<PageMetaProps> = ({ title, description }) => {
  const location = useLocation();

  useEffect(() => {
    // Update document title
    const fullTitle = `${title} | RaasPass Navratri 2025`;
    document.title = fullTitle;

    // Update meta description
    if (description) {
      let metaDesc = document.querySelector('meta[name="description"]');
      if (metaDesc) {
        metaDesc.setAttribute('content', description);
      }
    }

    // Scroll to top smoothly
    window.scrollTo({ top: 0, behavior: 'instant' });

    // Accessibility: programmatically shift focus to the page heading for screen readers
    const timeout = setTimeout(() => {
      const heading = document.getElementById('page-heading');
      if (heading) {
        heading.focus();
      }
    }, 100);

    return () => clearTimeout(timeout);
  }, [title, description, location.pathname]);

  return (
    <div className="sr-only" aria-live="polite" aria-atomic="true">
      {`Navigated to ${title}`}
    </div>
  );
};
