'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Form from '@/components/Form';
import Portfolio from '@/components/Portfolio';
import DraftsList from '@/components/DraftsList';
import { saveDraft, getAllDrafts, DraftPortfolio } from '@/lib/storage';

export default function Home() {
  const [portfolio, setPortfolio] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showDrafts, setShowDrafts] = useState(false);
  const [drafts, setDrafts] = useState<DraftPortfolio[]>([]);
  const [currentFormData, setCurrentFormData] = useState<any>(null);

  // Carica le bozze al mount
  useEffect(() => {
    setDrafts(getAllDrafts());
  }, []);

  const handleGenerate = async (formData: any) => {
    setCurrentFormData(formData);
    setLoading(true);
    setError('');
    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Failed to generate');
      }

      const data = await response.json();
      setPortfolio(data);
      
      // Salva la bozza con il portfolio generato
      const draft = saveDraft(formData, data);
      setDrafts(getAllDrafts());
      
    } catch (err) {
      setError('Errore nella generazione. Riprova.');
      console.error(err);
    }
    setLoading(false);
  };

  const handleLoadDraft = (draft: DraftPortfolio) => {
    if (draft.portfolio) {
      setPortfolio(draft.portfolio);
      setCurrentFormData(draft.data);
    }
    setShowDrafts(false);
  };

  const handleReset = () => {
    setPortfolio(null);
    setCurrentFormData(null);
  };

  if (showDrafts) {
    return (
      <DraftsList
        drafts={drafts}
        onSelectDraft={handleLoadDraft}
        onClose={() => setShowDrafts(false)}
      />
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">

      {!portfolio ? (
        <>
          <Form onGenerate={handleGenerate} loading={loading} error={error} />
          {drafts.length > 0 && (
            <div className="fixed bottom-6 right-6">
              <button
                onClick={() => setShowDrafts(true)}
                className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-lg text-sm font-semibold transition-colors"
              >
                📋 Bozze ({drafts.length})
              </button>
            </div>
          )}
        </>
      ) : (
        <Portfolio portfolio={portfolio} onReset={handleReset} />
      )}
    </main>
  );
}
