
import { MarketIndex, NewsItem, Comment } from './types';

export const DEFAULT_MARKET_INDICES: MarketIndex[] = [
  { name: 'S&P 500', value: '6,966.28', change: '+0.65%', percent: 65 },
  { name: 'Dow 30', value: '49,504.07', change: '+0.48%', percent: 48 },
  { name: 'Nasdaq', value: '23,671.35', change: '+0.81%', percent: 81 },
];

export const INITIAL_NEWS: NewsItem[] = [
  {
    id: '1',
    category: 'Market Analysis',
    title: 'Greenland is a priority for Trump, and may be the oil industry\'s next hope',
    snippet: 'An American oil company is trying to extract oil on Greenland as Trump escalates tensions and shifts focus to arctic energy reserves.',
    source: 'Yahoo Finance',
    time: '2h ago',
  },
  {
    id: '2',
    category: 'Technology',
    title: 'Nvidia takes on Tesla with \'ChatGPT moment\' for self-driving',
    snippet: 'The semiconductor giant introduces new AI models specifically designed for autonomous vehicle reasoning and decision making.',
    source: 'Yahoo Finance',
    time: '4h ago',
  },
  {
    id: '3',
    category: 'Economy',
    title: 'Trump\'s call for 10% credit-card cap aims at banks\' crown jewels',
    snippet: 'Financial institutions warn of restricted credit access as politicians push for aggressive interest rate ceilings.',
    source: 'Yahoo Finance',
    time: '5h ago',
  }
];

export const INITIAL_COMMENTS: Comment[] = [
  {
    id: 'c1',
    userInitials: 'JD',
    username: '@jdoe_invests',
    text: 'Still long on tech. NVDA earnings was the signal.',
    time: '12m ago',
    avatarColor: 'bg-blue-100 dark:bg-blue-900/30 text-blue-600',
  },
  {
    id: 'c2',
    userInitials: 'SC',
    username: '@sam_crypto',
    text: 'S&P 500 looking overextended here, taking some profit.',
    time: '45m ago',
    avatarColor: 'bg-slate-100 dark:bg-slate-800 text-slate-400',
  },
  {
    id: 'c3',
    userInitials: 'MK',
    username: '@mark_kap',
    text: 'The 10% credit cap is a win for the consumer!',
    time: '1h ago',
    avatarColor: 'bg-green-100 dark:bg-green-900/30 text-emerald-600',
  }
];

export const TRENDING_TAGS = ['#AIRevolution', '#BullMarket', '#InterestRates', '#CleanEnergy', '#VentureCapital'];
