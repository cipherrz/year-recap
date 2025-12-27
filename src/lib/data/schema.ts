export type RecapEventType = 'work' | 'life' | 'system';

export type RecapEvent = {
  id: string;
  date: string; // YYYY-MM-DD
  type: RecapEventType;
  title: string;
  detail: string;
  tags: string[];
};

export type Entry = { title: string; detail: string; severity: string };

export type RecapData = {
  year: number;
  integrity: number;
  tags: string[];
  summary: string;
  stats: { projects: number; focusSessions: number };
  achievements: Entry[];
  failures: Entry[];
  upgrades: { title: string; detail: string }[];
  nextCycle: { title: string; detail: string }[];
  events: RecapEvent[];
};
