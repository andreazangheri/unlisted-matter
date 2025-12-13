'use client';

import { DraftPortfolio, deleteDraft } from '@/lib/storage';
import Link from 'next/link';

export default function DraftsList({
  drafts,
  onSelectDraft,
  onClose,
}: {
  drafts: DraftPortfolio[];
  onSelectDraft: (draft: DraftPortfolio) => void;
  onClose: () => void;
}) {
  const formatDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleDateString('it-IT', {
      day: 'numeric',
      month: 'short',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
  <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 py-12 px-4">
    <div className="max-w-4xl mx-auto">

      {/* Titolo pagina bozze */}
      <div className="mb-8 text-center">
        <h1 className="text-4xl font-medium text-white mb-2">Le Tue Bozze</h1>
        <p className="text-slate-400">Riprendi dove hai lasciato</p>
      </div>


        {drafts.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-slate-400 mb-4">Nessuna bozza salvata ancora</p>
            <button
              onClick={onClose}
              className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold"
            >
              Crea Nuovo Portfolio
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {drafts.map((draft) => (
              <div
                key={draft.id}
                className="bg-slate-900 rounded-lg border border-slate-800 p-6 hover:border-blue-500 transition-colors"
              >
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-white">
                      {draft.portfolio?.name || draft.data.essence}
                    </h3>
                    <p className="text-slate-400 text-sm mt-1">
                      {formatDate(draft.timestamp)}
                    </p>
                  </div>
                  <button
                    onClick={() => {
                         deleteDraft(draft.id);
                        // Ricarica la lista
                        window.location.reload();
                    }}
                    className="px-3 py-1 bg-red-900 hover:bg-red-800 text-red-100 rounded text-sm"
                  >
                    Elimina
                  </button>
                </div>

                <p className="text-slate-300 text-sm mb-4 line-clamp-2">
                  {draft.data.uniqueStatement}
                </p>

                <button
                  onClick={() => onSelectDraft(draft)}
                  className="w-full px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition-colors"
                >
                  {draft.portfolio ? 'Visualizza Portfolio' : 'Continua Compilazione'}
                </button>
              </div>
            ))}
          </div>
        )}

        <button
          onClick={onClose}
          className="mt-8 w-full px-6 py-3 bg-slate-800 hover:bg-slate-700 text-white rounded-lg font-semibold"
        >
          ← Torna Indietro
        </button>
      </div>
    </div>
  );
}
