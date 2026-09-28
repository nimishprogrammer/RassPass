import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

export const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ items }) => {
  return (
    <nav aria-label="Breadcrumb" className="py-2">
      <ol className="flex items-center flex-wrap gap-1.5 text-xs text-stone-400">
        <li className="flex items-center gap-1.5">
          <Link
            to="/"
            className="flex items-center gap-1 hover:text-[#ffa000] transition-colors focus-visible:outline-2 focus-visible:outline-[#ffa000] rounded-sm"
          >
            <Home className="w-3.5 h-3.5" aria-hidden="true" />
            <span className="sr-only">Home</span>
          </Link>
        </li>

        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          return (
            <li key={item.label + index} className="flex items-center gap-1.5">
              <ChevronRight className="w-3 h-3 text-stone-600 shrink-0" aria-hidden="true" />
              {isLast || !item.href ? (
                <span
                  aria-current={isLast ? 'page' : undefined}
                  className="font-medium text-stone-200 truncate max-w-[200px] sm:max-w-none"
                >
                  {item.label}
                </span>
              ) : (
                <Link
                  to={item.href}
                  className="hover:text-[#ffa000] transition-colors focus-visible:outline-2 focus-visible:outline-[#ffa000] rounded-sm truncate max-w-[150px] sm:max-w-none"
                >
                  {item.label}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};
