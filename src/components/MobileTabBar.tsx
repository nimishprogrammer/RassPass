import React from 'react';
import { NavLink } from 'react-router-dom';
import { Compass, Music2, Calendar, Car, Ticket } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const MobileTabBar: React.FC = () => {
  const { totalPassesCount } = useApp();

  const navItems = [
    { to: '/', label: 'Explore', icon: Compass, exact: true },
    { to: '/lineup', label: 'Lineup', icon: Music2 },
    { to: '/schedule', label: 'Schedule', icon: Calendar },
    { to: '/parking', label: 'Parking', icon: Car },
    { to: '/passes', label: 'My Passes', icon: Ticket, badge: totalPassesCount > 0 ? totalPassesCount : undefined },
  ];

  return (
    <nav
      aria-label="Mobile Bottom Navigation"
      className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#121317]/95 backdrop-blur-xl border-t border-[#25262c] pb-safe"
    >
      <div className="flex items-center justify-around h-16 px-1 max-w-lg mx-auto">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.exact}
              className={({ isActive }) =>
                `relative flex flex-col items-center justify-center flex-1 h-full py-1 text-[11px] font-medium transition-all min-w-[56px] focus-visible:outline-2 focus-visible:outline-[#ffa000] ${
                  isActive
                    ? 'text-[#ffa000] font-semibold'
                    : 'text-stone-400 hover:text-stone-200'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <div className="relative">
                    <Icon className={`w-5 h-5 transition-transform ${isActive ? 'scale-110 text-[#ffa000]' : 'text-stone-400'}`} aria-hidden="true" />
                    {item.badge !== undefined && (
                      <span className="absolute -top-1.5 -right-2 px-1.5 py-0.2 bg-[#ffa000] text-black text-[9px] font-bold rounded-full font-label">
                        {item.badge}
                      </span>
                    )}
                  </div>
                  <span className="mt-1 tracking-tight truncate">{item.label}</span>
                  {isActive && (
                    <span className="absolute bottom-1 w-6 h-0.5 rounded-full bg-[#ffa000]" />
                  )}
                </>
              )}
            </NavLink>
          );
        })}
      </div>
    </nav>
  );
};
