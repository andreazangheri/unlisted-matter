'use client';

export default function Portfolio({
  portfolio,
  onReset,
}: {
  portfolio: any;
  onReset: () => void;
}) {
  const handlePrint = () => {
    window.print();
  };

  const handleShare = () => {
    const url = window.location.href;
    navigator.clipboard.writeText(url);
    alert('Link copiato negli appunti!');
  };

  const displayName =
  portfolio.name && portfolio.name.trim().length > 0
    ? portfolio.name
    : 'Identità ancora non osservata';

  const isWeakInput =
  (!portfolio.name || portfolio.name.trim().length < 3) &&
  (!portfolio.essence || portfolio.essence.trim().length < 80);


  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
<div className="mb-16 text-center">
  <h1 className="font-black text-[clamp(2.4rem,4.5vw,3.5rem)] leading-[1.05] text-white mb-3">
    {displayName}
  </h1>

  <p className="text-slate-300 text-[clamp(0.9rem,1.2vw,1rem)] max-w-2xl mx-auto">
    Matter Map generata da UNLISTED MATTER.
  </p>

  <p className="text-[clamp(1rem,1.4vw,1.15rem)] text-blue-400 font-light mt-3 mb-8 leading-relaxed max-w-3xl mx-auto">
    {isWeakInput
      ? 'Questa mappa rileva solo una parte della tua Materia Oscura Professionale. Per far emergere davvero il tuo Valore Gravitazionale, torna alle Matter e arricchisci le risposte con esempi concreti, processi e fallimenti.'
      : portfolio.uniqueStatement}
  </p>




          {/* Actions */}
          <div className="flex flex-wrap gap-3 justify-center">
            <button
              onClick={handlePrint}
              className="px-6 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-lg text-sm font-semibold transition-colors"
            >
              📥 Scarica PDF
            </button>
            <button
              onClick={handleShare}
              className="px-6 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-lg text-sm font-semibold transition-colors"
            >
              🔗 Condividi Link
            </button>
            <button
              onClick={onReset}
              className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-semibold transition-colors"
            >
              ✨ Nuovo Portfolio
            </button>
          </div>
        </div>

        {/* Sections */}
        <div className="space-y-12">
          {/* Chi Sei */}
<section className="bg-slate-900/80 rounded-xl border border-slate-800 p-6 md:p-8">
  <h2 className="text-[clamp(1.1rem,1.5vw,1.3rem)] font-semibold text-white mb-3">
    Matter 1 · Il Valore Gravitazionale
  </h2>
  <p className="text-slate-300 text-[clamp(0.95rem,1.1vw,1rem)] leading-relaxed">
    {portfolio.essence}
  </p>
</section>


          {/* Unicità */}
          <section className="bg-gradient-to-br from-purple-900 to-slate-900 rounded-xl border border-purple-500 border-opacity-30 p-8">
            <h2 className="text-2xl font-bold text-white mb-4">Matter 2 · La Tua Impronta Unica</h2>
            <p className="text-purple-100 text-lg leading-relaxed">{portfolio.uniqueness}</p>
          </section>


          {/* Come Pensi */}
          <section className="bg-slate-900 rounded-xl border border-slate-800 p-8">
            <h2 className="text-[clamp(1.1rem,1.5vw,1.3rem)] font-semibold text-white mb-3">Matter 3 · Il Valore di Intenzione</h2>
            <p className="text-slate-300 text-lg leading-relaxed">{portfolio.methodology}</p>
          </section>

          {/* Capability Clusters */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-6">Matter 4 · I Vettori Funzionali</h2>
            <div className="space-y-3">
              {portfolio.capabilities &&
                portfolio.capabilities.map((cap: string, idx: number) => (
                  <div
                    key={idx}
                    className="bg-gradient-to-r from-slate-900 to-slate-800 rounded-lg p-6 border border-blue-500 border-opacity-30"
                  >
                    <p className="text-slate-200 text-lg">{cap}</p>
                  </div>
                ))}
            </div>
          </section>

          {/* Matter 5 · Tasso di Acquisizione */}
<section className="bg-slate-900/80 rounded-xl border border-slate-800 p-6 md:p-8">
  <h2 className="text-[clamp(1.1rem,1.5vw,1.3rem)] font-semibold text-white mb-3">
    Matter 5 · Il Tasso di Acquisizione
  </h2>
  <p className="text-slate-300 text-[clamp(0.95rem,1.1vw,1rem)] leading-relaxed whitespace-pre-wrap">
    {portfolio.learning} {/* o il campo che usi per il contenuto di Materia 5 */}
  </p>
</section>


          {/* Progetti */}
          <section className="bg-gradient-to-br from-orange-900 to-orange-950 rounded-xl border border-orange-700 border-opacity-50 p-8">
            <h2 className="text-2xl font-bold text-white mb-4">Matter 6 · Proof of Value</h2>
            <p className="text-slate-300 text-lg leading-relaxed whitespace-pre-wrap">
              {portfolio.projects}
            </p>
          </section>

          {/* Lezioni */}
          <section className="bg-slate-900 rounded-xl border border-slate-800 p-8">
            <h2 className="text-[clamp(1.1rem,1.5vw,1.3rem)] font-semibold text-white mb-3">Matter 7 · Il Valore Acquisito</h2>
            <p className="text-slate-300 text-lg leading-relaxed whitespace-pre-wrap">
              {portfolio.failures}
            </p>
          </section>

        </div>

        {/* Footer */}
        <div className="mt-20 text-center border-t border-slate-800 pt-8">
          <p className="text-slate-500 text-[0.8rem]">
            Questo non è un CV. È una Mappa del Valore Inespresso.
          </p>
          <p className="text-slate-600 text-[0.7rem] mt-3 tracking-[0.18em] uppercase">
            Generato con UNLISTED MATTER | Cosmico 2025
          </p>
        </div>
      </div>

      {/* Print Styles */}
      <style>{`
        @media print {
          body { background: white; color: black; }
          .bg-gradient-to-br { background: white; }
          .text-white { color: black; }
          .text-slate-300 { color: #555; }
          .border { border: 1px solid #ddd; }
          button { display: none; }
          h1 { font-size: 2.5rem; }
          h2 { font-size: 1.5rem; }
        }
      `}</style>
    </div>
  );
}
