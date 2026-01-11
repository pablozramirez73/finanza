
import React, { useState, useEffect, useCallback } from 'react';
import MarketCard from './components/MarketCard';
import SentimentMeter from './components/SentimentMeter';
import { 
  DEFAULT_MARKET_INDICES, 
  INITIAL_NEWS, 
  INITIAL_COMMENTS, 
  TRENDING_TAGS 
} from './constants';
import { NewsItem, Comment } from './types';
import { getMarketInsights } from './services/geminiService';

const App: React.FC = () => {
  const [isDark, setIsDark] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [news, setNews] = useState<NewsItem[]>(INITIAL_NEWS);
  const [isLoading, setIsLoading] = useState(false);
  const [sentiment, setSentiment] = useState(74);

  useEffect(() => {
    // Initial theme check
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setIsDark(true);
      document.documentElement.classList.add('dark');
    }
  }, []);

  const toggleTheme = () => {
    setIsDark(!isDark);
    document.documentElement.classList.toggle('dark');
  };

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;

    setIsLoading(true);
    try {
      const results = await getMarketInsights(searchQuery);
      if (results.length > 0) {
        setNews(results);
      }
      // Simulate random sentiment shift on search
      setSentiment(Math.floor(Math.random() * 40) + 40);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="max-w-7xl mx-auto px-6 pt-8 pb-6 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="bg-primary w-14 h-14 rounded-2xl flex items-center justify-center shadow-lg shadow-primary/20">
            <span className="material-symbols-outlined text-white text-3xl">trending_up</span>
          </div>
          <div>
            <h1 className="font-display font-800 text-3xl tracking-tight">FinanceFlow</h1>
            <p className="text-slate-500 dark:text-slate-400 font-medium">Market Insights & Visualization</p>
          </div>
        </div>

        <form onSubmit={handleSearch} className="relative flex-grow max-w-xl">
          <div className="relative flex items-center">
            <span className="material-symbols-outlined absolute left-4 text-slate-400">search</span>
            <input 
              className="w-full pl-12 pr-16 py-3.5 bg-card-light dark:bg-card-dark border-none rounded-xl shadow-sm ring-1 ring-slate-200 dark:ring-slate-700 focus:ring-2 focus:ring-primary transition-all text-slate-700 dark:text-slate-200 outline-none" 
              placeholder="Search markets, stocks, news..." 
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button 
              type="submit"
              disabled={isLoading}
              className="absolute right-2 px-4 py-1.5 bg-primary text-white font-semibold rounded-lg hover:bg-blue-600 transition-colors disabled:opacity-50"
            >
              {isLoading ? '...' : 'Go'}
            </button>
          </div>
        </form>

        <button 
          onClick={toggleTheme}
          className="p-2.5 rounded-xl bg-card-light dark:bg-card-dark shadow-sm ring-1 ring-slate-200 dark:ring-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
        >
          <span className="material-symbols-outlined dark:hidden">dark_mode</span>
          <span className="material-symbols-outlined hidden dark:inline text-yellow-400">light_mode</span>
        </button>
      </header>

      <main className="max-w-7xl mx-auto px-6 pb-20">
        {/* Market Overview */}
        <section className="mt-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-display font-700 text-2xl">Market Overview</h2>
            <div className="flex items-center gap-2">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-secondary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-secondary"></span>
              </span>
              <span className="text-sm font-medium text-slate-500 bg-slate-100 dark:bg-slate-800 px-3 py-1 rounded-full">Live Updates</span>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {DEFAULT_MARKET_INDICES.map((idx) => (
              <MarketCard key={idx.name} index={idx} />
            ))}
          </div>
        </section>

        <div className="mt-12 grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          {/* News Feed */}
          <section className="lg:col-span-2">
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-display font-700 text-2xl">Top News</h2>
              <a className="text-primary font-semibold text-sm hover:underline flex items-center" href="#">
                View all stories <span className="material-symbols-outlined text-sm ml-1">chevron_right</span>
              </a>
            </div>
            
            <div className="grid grid-cols-1 gap-6">
              {news.map((item) => (
                <div key={item.id} className="group bg-card-light dark:bg-card-dark p-6 rounded-xl shadow-sm border border-slate-100 dark:border-slate-800 hover:border-primary/30 transition-all cursor-pointer">
                  <div className="flex flex-col h-full justify-between">
                    <div>
                      <span className="text-[10px] font-800 text-primary uppercase tracking-[0.2em] mb-2 block">{item.category}</span>
                      <h3 className="font-display font-700 text-xl leading-snug group-hover:text-primary transition-colors">
                        {item.title}
                      </h3>
                      <p className="mt-3 text-slate-500 dark:text-slate-400 text-sm line-clamp-2">
                        {item.snippet}
                      </p>
                    </div>
                    <div className="mt-6 flex items-center justify-between">
                      <span className="text-[10px] font-700 text-slate-400 uppercase">{item.source} • {item.time}</span>
                      <button className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
                        <span className="material-symbols-outlined text-slate-400 text-lg">bookmark_border</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
              
              {isLoading && (
                <div className="flex items-center justify-center p-12">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                </div>
              )}
            </div>
          </section>

          {/* Sidebar */}
          <aside className="space-y-6">
            {/* Community Mood Card */}
            <div className="bg-card-light dark:bg-card-dark p-6 rounded-xl shadow-sm border border-slate-100 dark:border-slate-800">
              <div className="flex items-center gap-2 mb-6">
                <span className="material-symbols-outlined text-primary">analytics</span>
                <h3 className="font-display font-700 text-lg">Community Mood</h3>
              </div>
              
              <SentimentMeter value={sentiment} />

              <div className="text-center mt-12 mb-8">
                <span className="text-3xl font-display font-800 text-slate-800 dark:text-white">
                  {sentiment > 50 ? 'Greed' : 'Fear'} ({sentiment})
                </span>
                <p className="text-xs font-medium text-slate-500 dark:text-slate-400 mt-1 uppercase tracking-tighter">
                  Market Sentiment is {sentiment > 50 ? 'High' : 'Low'}
                </p>
              </div>

              <div className="space-y-4">
                {INITIAL_COMMENTS.map((comment) => (
                  <div key={comment.id} className="border-t border-slate-50 dark:border-slate-800 pt-4 first:border-none first:pt-0">
                    <div className="flex items-start gap-3">
                      <div className={`w-8 h-8 rounded-full ${comment.avatarColor} flex items-center justify-center text-xs font-bold`}>
                        {comment.userInitials}
                      </div>
                      <div>
                        <p className="text-sm font-medium leading-tight text-slate-700 dark:text-slate-200">
                          {comment.text}
                        </p>
                        <span className="text-[10px] text-slate-400 font-medium">
                          {comment.username} • {comment.time}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              <button className="w-full mt-6 py-3 bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-300 font-semibold text-sm rounded-xl hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors">
                Join Discussion
              </button>
            </div>

            {/* Trending Now Card */}
            <div className="bg-card-light dark:bg-card-dark p-6 rounded-xl shadow-sm border border-slate-100 dark:border-slate-800">
              <h3 className="font-display font-700 text-sm uppercase tracking-widest text-slate-400 mb-4">Trending Now</h3>
              <div className="flex flex-wrap gap-2">
                {TRENDING_TAGS.map((tag) => (
                  <span key={tag} className="px-3 py-1.5 bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-400 text-xs font-semibold rounded-lg border border-slate-100 dark:border-slate-700 hover:border-primary/30 cursor-pointer transition-colors">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </main>

      {/* Floating Action Button */}
      <div className="fixed bottom-8 right-8 z-50">
        <button className="w-14 h-14 bg-primary text-white rounded-full shadow-xl shadow-primary/30 flex items-center justify-center hover:scale-110 transition-transform active:scale-95 group relative">
          <span className="material-symbols-outlined">translate</span>
          <span className="absolute right-full mr-4 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-100 px-3 py-1.5 rounded-lg text-xs font-bold opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none shadow-lg border border-slate-100 dark:border-slate-700">
            Switch Language
          </span>
        </button>
      </div>
    </div>
  );
};

export default App;
