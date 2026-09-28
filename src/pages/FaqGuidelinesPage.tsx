import React, { useState } from 'react';
import { PageMeta } from '../components/PageMeta';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { FAQ_ITEMS } from '../data/mockData';
import { 
  HelpCircle, 
  ChevronDown, 
  Search, 
  ShieldCheck, 
  PhoneCall, 
  Ticket, 
  Car, 
  Sparkles,
  HeartHandshake
} from 'lucide-react';

export const FaqGuidelinesPage: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [openFaqId, setOpenFaqId] = useState<string | null>(FAQ_ITEMS[0].id);
  const [searchQuery, setSearchQuery] = useState('');

  const categories = [
    { id: 'all', label: 'All Questions' },
    { id: 'passes', label: 'Passes & M-Pass' },
    { id: 'parking', label: 'FASTag Parking' },
    { id: 'etiquette', label: 'Dress Code & Barefoot' },
    { id: 'safety', label: 'Safety & Emergency' },
  ];

  const filteredFaqs = FAQ_ITEMS.filter((item) => {
    if (activeCategory !== 'all' && item.category !== activeCategory) {
      return false;
    }
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      return item.question.toLowerCase().includes(q) || item.answer.toLowerCase().includes(q);
    }
    return true;
  });

  const toggleFaq = (id: string) => {
    setOpenFaqId((prev) => (prev === id ? null : id));
  };

  const breadcrumbItems = [
    { label: 'Guidelines, Safety & FAQ' },
  ];

  return (
    <>
      <PageMeta
        title="Festival Guidelines, Barefoot Etiquette & FAQ"
        description="Essential Navratri attendee guidelines, barefoot dance rules, FASTag smart parking instructions, pass transfer policies, and safety protocols."
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 space-y-8 pb-16">
        <Breadcrumbs items={breadcrumbItems} />

        {/* Hero Section */}
        <section aria-labelledby="page-heading" className="space-y-4 border-b border-[#252631] pb-6">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#271d0e] border border-[#ffa000]/40 text-[#ffa000] text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5" aria-hidden="true" />
            <span>FESTIVAL RULES, SAFETY &amp; POLICIES</span>
          </div>

          <h1 id="page-heading" tabIndex={-1} className="text-3xl sm:text-5xl font-black text-white font-display tracking-tight leading-tight focus:outline-none">
            Guidelines, Etiquette &amp; FAQ
          </h1>

          <p className="text-sm text-stone-300 leading-relaxed">
            Everything you need to know about celebrating Navratri across Gujarat with RaasPass: from traditional Chaniya Choli rules to FASTag vehicle gate access.
          </p>

          {/* Search Bar */}
          <div className="relative pt-2">
            <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" aria-hidden="true" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by topic, e.g. dress code, shoes, refund, parking..."
              aria-label="Search questions"
              className="w-full pl-10 pr-4 py-2.5 text-xs rounded-xl bg-[#171821] border border-[#2c2d3a] text-white placeholder:text-stone-500 focus:outline-none focus:border-[#ffa000]"
            />
          </div>

          {/* Category Tabs */}
          <div className="flex flex-wrap items-center gap-2 pt-1">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-[#ffa000] ${
                  activeCategory === cat.id
                    ? 'bg-[#ffa000] text-black font-bold shadow-md shadow-[#ffa000]/20'
                    : 'bg-[#1a1b22] text-stone-300 hover:bg-[#252631] hover:text-white border border-[#2b2d38]'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </section>

        {/* FAQ Accordion List */}
        <section aria-label="Frequently Asked Questions" className="space-y-3">
          {filteredFaqs.length === 0 ? (
            <div className="py-12 text-center text-stone-400 text-sm">
              No questions matched &ldquo;{searchQuery}&rdquo;. Try another term or clear the filter.
            </div>
          ) : (
            filteredFaqs.map((faq) => {
              const isOpen = openFaqId === faq.id;
              return (
                <article
                  key={faq.id}
                  className="bg-[#171822] border border-[#2b2d3a] rounded-2xl overflow-hidden shadow-md transition-colors"
                >
                  <h2>
                    <button
                      type="button"
                      onClick={() => toggleFaq(faq.id)}
                      aria-expanded={isOpen}
                      aria-controls={`faq-answer-${faq.id}`}
                      id={`faq-btn-${faq.id}`}
                      className="w-full text-left p-4 sm:p-5 flex items-center justify-between gap-4 font-bold text-sm sm:text-base text-white hover:text-[#ffa000] transition-colors focus-visible:outline-2 focus-visible:outline-[#ffa000]"
                    >
                      <span className="font-display tracking-tight">{faq.question}</span>
                      <ChevronDown
                        className={`w-4 h-4 text-stone-400 shrink-0 transition-transform duration-200 ${
                          isOpen ? 'rotate-180 text-[#ffa000]' : ''
                        }`}
                        aria-hidden="true"
                      />
                    </button>
                  </h2>

                  {isOpen && (
                    <div
                      id={`faq-answer-${faq.id}`}
                      role="region"
                      aria-labelledby={`faq-btn-${faq.id}`}
                      className="px-4 sm:px-5 pb-5 text-xs text-stone-300 leading-relaxed border-t border-[#232431] pt-3 animate-in fade-in duration-150"
                    >
                      {faq.answer}
                    </div>
                  )}
                </article>
              );
            })
          )}
        </section>

        {/* Quick Safety Assistance Card */}
        <section aria-label="Safety Help Desk" className="bg-[#13141b] border border-[#2a2b37] rounded-2xl p-6 shadow-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#281c0d] text-[#ffa000] flex items-center justify-center shrink-0">
              <HeartHandshake className="w-5 h-5" aria-hidden="true" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white font-display">
                Still have questions or need special venue assistance?
              </h3>
              <p className="text-xs text-stone-400">
                Our 24x7 Navratri Fairground Desk is available for elder assistance and medical queries.
              </p>
            </div>
          </div>

          <a
            href="tel:18004272201"
            className="px-4 py-2.5 rounded-xl bg-[#ffa000] hover:bg-[#ffb865] text-black font-extrabold text-xs shrink-0 flex items-center gap-2 shadow-lg transition-colors focus-visible:outline-2 focus-visible:outline-white"
          >
            <PhoneCall className="w-4 h-4 fill-black" aria-hidden="true" />
            <span>Call Fair Desk</span>
          </a>
        </section>
      </div>
    </>
  );
};
