
export interface MarketIndex {
  name: string;
  value: string;
  change: string;
  percent: number;
}

export interface NewsItem {
  id: string;
  category: string;
  title: string;
  snippet: string;
  source: string;
  time: string;
}

export interface Comment {
  id: string;
  userInitials: string;
  username: string;
  text: string;
  time: string;
  avatarColor: string;
}

export enum SentimentStatus {
  BEARISH = 'Bearish',
  NEUTRAL = 'Neutral',
  BULLISH = 'Bullish'
}
