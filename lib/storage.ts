export interface DraftPortfolio {
  id: string;
  timestamp: number;
  data: {
    essence: string;
    uniqueStatement: string;
    howYouThink: string;
    capabilities: string;
    learning: string;
    projects: string;
    failures: string;
  };
  portfolio?: {
    name: string;
    essence: string;
    uniqueStatement: string;
    methodology: string;
    capabilities: string[];
    learning: string;
    projects: string;
    failures: string;
    uniqueness: string;
  };
}

const STORAGE_KEY = 'unlisted matter-drafts';

export function saveDraft(data: DraftPortfolio['data'], portfolio?: DraftPortfolio['portfolio']) {
  const drafts = getAllDrafts();
  const newDraft: DraftPortfolio = {
    id: Date.now().toString(),
    timestamp: Date.now(),
    data,
    portfolio,
  };
  drafts.unshift(newDraft);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(drafts.slice(0, 10))); // Salva ultimi 10
  return newDraft;
}

export function getAllDrafts(): DraftPortfolio[] {
  if (typeof window === 'undefined') return [];
  const stored = localStorage.getItem(STORAGE_KEY);
  return stored ? JSON.parse(stored) : [];
}

export function getDraftById(id: string): DraftPortfolio | undefined {
  return getAllDrafts().find(d => d.id === id);
}

export function deleteDraft(id: string) {
  const drafts = getAllDrafts().filter(d => d.id !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(drafts));
}

export function clearAllDrafts() {
  localStorage.removeItem(STORAGE_KEY);
}
