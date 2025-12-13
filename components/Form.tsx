'use client';

import { useState } from 'react';
import { Tooltip } from '../components/Tooltip';


const STEPS = [
    {
    id: 'intro',
    title: 'UNLISTED MATTER',
    subtitle: 'Rilevatore di unlisted matter Professionale.',
    description:
      'Il CV tradizionale cattura solo il 5% del tuo valore: job title e output visibili. Il restante 95% è unlisted matter: come pensi, come impari, i tuoi fallimenti e le tue scelte di processo. In 7 Materie ti guidiamo a mappare questo valore nascosto e a trasformarlo in una Mappa del Valore Inespresso che l’AI può solo estendere, non sostituire.',
    key: 'intro', // questo non lo salviamo nello stato
  },
  {
    id: 'essence',
    title: 'Il Valore Gravitazionale',
    subtitle: "L'impatto che lasci (in una frase).",
    description: 'Una frase che cattura come ti descriverebbe qualcuno che conosce il tuo lavoro, misurando il tuo impatto gravitazionale (es: "Marco - Trasforma codici complessi in storie semplici e facili da capire").',
    key: 'essence',
  },
  {
    id: 'unique',
    title: 'Il Valore Inespresso',
    subtitle: 'Il Tuo Superpotere Irriproducibile.',
    description: 'Completa: "Nel mio campo, sono l\'unico che..." (L\'elemento "Polymath" che l\'AI non può replicare).',
    key: 'uniqueStatement',
  },
  {
    id: 'thinking',
    title: 'Il Valore di Intenzione',
    subtitle: 'Il tuo metodo risolutivo.',
    description:
      'Dai un nome e descrivi il tuo processo/metodologia unico. È il tuo "Orchestrion": come estendi te stesso per risolvere problemi a prescindere dal dominio.',
    key: 'howYouThink',
  },
  {
    id: 'vectors',
    title: 'I Vettori Funzionali',
    subtitle: 'Tre Capability Clusters (Conoscenza, Skill, Tool).',
    description:
      'Definisci tre cluster di capacità che usi. Per ogni cluster, elenca i componenti (es: "Strategie digitali / Architettura del dato / Mentoring team").',
    key: 'capabilityVectors', // Ho cambiato la chiave per riflettere il nuovo nome
  },
  {
    id: 'learning',
    title: 'Il Tasso di Acquisizione',
    subtitle: 'La tua metodologia di apprendimento (Cicli di Pratica).',
    description:
      'Descrivi il tuo ciclo di "pratica deliberata con feedback" e come ti metti in situazioni dove devi imparare (es: "Accetto il progetto prima di sapere come completarlo, poi uso l\'AI per i micro-blocchi").',
    key: 'learningRate',
  },
  {
    id: 'projects',
    title: 'Proof of Value',
    subtitle: 'Dimostra l\'Impatto Reale (Parti dal Problema).',
    description:
      'Formato: "Progetto: [titolo] - Problema/Intenzione: [X] - Soluzione: [Y] - Metrica/Risultato: [Z]". Parti dal risultato concreto che volevi ottenere.',
    key: 'proofOfValue',
  },
  {
    id: 'failures',
    title: 'Il Valore Acquisito',
    subtitle: 'La Lezione che ti ha reso indispensabile.',
    description:
      'Descrivi un fallimento, la lezione che ne hai tratto e come la insegneresti/documenteresti ad altri. (Insegnare per imparare).',
    key: 'acquiredValue',
  },
];

interface FormData {
  essence: string;
  uniqueStatement: string;
  howYouThink: string;
  capabilityVectors: string;
  learningRate: string;
  proofOfValue: string;
  acquiredValue: string;
}

export default function Form({
  onGenerate,
  loading,
  error,
}: {
  onGenerate: (data: FormData) => void;
  loading: boolean;
  error: string;
}) {
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState<any>({
  essence: '',
  uniqueStatement: '',
  howYouThink: '',
  capabilityVectors: '',
  learningRate: '',
  proofOfValue: '',
  acquiredValue: '',
});


  const currentStep = STEPS[step];
  const isIntro = currentStep.id === 'intro';
  const isComplete = isIntro
  ? true
  : (formData[currentStep.key as keyof FormData]?.trim().length ?? 0) > 0;


  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [currentStep.key]: e.target.value,
    });
  };

  const handleNext = () => {
    if (step < STEPS.length - 1) {
      setStep(step + 1);
    } else {
      onGenerate(formData);
    }
  };

  const handleBack = () => {
    if (step > 0) setStep(step - 1);
  };

  return (
  <div className="flex items-center justify-center px-4 py-12">
    <div className="w-full max-w-3xl">
            {/* Header */}
      <div className="mb-8 text-center">
            <p className="text-slate-400 uppercase text-lg">
             Mappa i tuoi Valori Inespressi
            </p>
      </div>

      {/* Form */}
      <div className="bg-slate-900 rounded-xl shadow-2xl border border-slate-800 p-8 md:p-10">
        {/* Title */}
{/* Title */}
<div className="mb-8">
  {!isIntro && (
    <div className="inline-block px-3 py-1 bg-blue-500 bg-opacity-20 rounded-full mb-3">
      <span className="text-blue-300 text-sm font-semibold">
        Matter {step} / {STEPS.length - 1}
      </span>
    </div>
  )}

  <h2
    className={
      isIntro
         ? "font-black text-[clamp(3rem,6vw,5rem)] leading-[0.95] text-white mb-4"
      : "font-black text-[clamp(2.2rem,4vw,3.2rem)] leading-tight text-white mb-2"
    }
  >
    {isIntro ? (
      <>
        UNLISTED
        <br />
        MATTER
      </>
    ) : (
      currentStep.title
    )}
  </h2>

  {!isIntro && (
    <p className="text-slate-300 text-[clamp(1rem,1.4vw,1.15rem)]">
      {currentStep.subtitle}
    </p>
  )}

  {/* DESCRIPTION + TOOLTIP LOGIC */}
  {!isIntro && (
    <p className="text-slate-400 text-[clamp(0.9rem,1.1vw,1rem)] mt-2">
      {currentStep.id === 'essence' && (
        <>
          Una frase che cattura come ti descriverebbe qualcuno che conosce il tuo lavoro,
          misurando il tuo{" "}
          <Tooltip
            label="Valore Gravitazionale"
            content="L’impatto magnetico che il tuo modo di lavorare esercita sugli altri: perché le persone sono attratte da te e dal tuo contributo."
          />
          .
        </>
      )}

      {currentStep.id === 'unique' && (
        <>
          Completa: "Nel mio campo, sono l'unico che..." (
          <Tooltip
            label="Polymath"
            content="Persona con competenze profonde in più domini, capace di collegarli in modo creativo."
          />
          {" "}che l'AI non può replicare).
        </>
      )}

      {currentStep.id === 'thinking' && (
        <>
          Dai un nome e descrivi il tuo processo/metodologia unico. È il tuo{" "}
          <Tooltip
            label="Orchestrion"
            content="Il tuo metodo personale per coordinare risorse, idee e strumenti diversi e trasformarli in una soluzione coerente e replicabile."
          />
          : il tuo{" "}
          <Tooltip
            label="Valore di Intenzione"
            content="Il valore che nasce da come definisci i problemi e da quali obiettivi scegli di perseguire, non solo da cosa sai fare operativamente."
          />
          , cioè come estendi te stesso per risolvere problemi a prescindere dal dominio.
        </>
      )}

      {currentStep.id === 'vectors' && (
        <>
          Definisci tre{" "}
          <Tooltip
            label="Vettori Funzionali"
            content="Insiemi di capacità che spingono tutte nella stessa direzione di impatto: conoscenze, skill e tool che lavorano insieme."
          />
          , cioè tre{" "}
          <Tooltip
            label="Capability Clusters"
            content="Gruppi di competenze affini che, combinate, generano un effetto moltiplicatore sul tuo lavoro."
          />
          {" "}che usi. Per ogni cluster, elenca i componenti (es: "Strategie digitali / Architettura del dato / Mentoring team").
        </>
      )}

      {currentStep.id === 'learning' && (
        <>
          Descrivi il tuo ciclo di "pratica deliberata con feedback" e come ti metti in
          situazioni dove devi imparare. Qui racconti il tuo{" "}
          <Tooltip
            label="Tasso di Acquisizione"
            content="La velocità e la qualità con cui trasformi nuove informazioni in competenze reali, attraverso cicli di pratica deliberata con feedback."
          />
          , la capability che ti mantiene rilevante nell’era AI.
        </>
      )}

      {currentStep.id === 'projects' && (
        <>
          Formato: "Progetto: [titolo] - Problema/Intenzione: [X] - Soluzione: [Y] -
          Metrica/Risultato: [Z]". Parti sempre dal risultato concreto che volevi ottenere e da
          come hai reso visibile il tuo impatto reale.
        </>
      )}

      {currentStep.id === 'failures' && (
        <>
          Descrivi un fallimento, la lezione che ne hai tratto e come la insegneresti o
          documenteresti ad altri. Qui valorizzi l’
          <Tooltip
            label="Effetto Protégé"
            content="Il fenomeno per cui impari meglio e più a fondo quando ti metti nella posizione di spiegare o insegnare qualcosa a qualcun altro."
          />
          , cioè il valore acquisito che ti rende indispensabile.
        </>
      )}
    </p>
  )}
</div>


        {/* Input */}
<div className="mb-8">
  {isIntro ? (
    <p className="text-slate-300 text-[clamp(0.95rem,1.2vw,1.1rem)] leading-relaxed">
      <span className="font-black">Rileva la tua unlisted matter in 7 passaggi. </span>
      <span>Mappa i tuoi processi, i fallimenti, i cicli di apprendimento e le capability che l&apos;AI può solo
      estendere, non sostituire. </span>Quando sei pronto, premi Avanti → per scoprire la tua <span className="font-black">unlisted matter: ciò che conta veramente nel tuo lavoro.
    </span></p>
  ) : (
    <textarea
      value={formData[currentStep.key as keyof FormData]}
      onChange={handleChange}
      placeholder="Scrivi qui..."
      className="w-full h-44 bg-slate-800 text-white rounded-lg p-4 border border-slate-700 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-20 transition-all resize-none text-lg leading-relaxed"
      disabled={loading}
    />
  )}
</div>


        {/* Error */}
        {error && (
          <div className="mb-6 p-4 bg-red-900 bg-opacity-30 border border-red-700 rounded-lg text-red-300 text-sm">
            {error}
          </div>
        )}

        {/* Progress Bar */}
{!isIntro && (
  <div className="mb-8 bg-slate-800 rounded-full h-1.5 overflow-hidden">
    <div
      className="bg-gradient-to-r from-blue-500 to-purple-500 h-full rounded-full transition-all duration-300"
      style={{ width: `${(step / (STEPS.length - 1)) * 100}%` }}
    />
  </div>
)}


        {/* Buttons */}
        <div className="flex gap-4 justify-between">
  {!isIntro ? (
    <button
      onClick={handleBack}
      disabled={step === 0 || loading}
      className="px-6 py-3 bg-slate-800 hover:bg-slate-700 disabled:opacity-50 text-white rounded-lg font-semibold transition-colors"
    >
      ← Indietro
    </button>
  ) : (
    <span /> // placeholder per mantenere il layout
  )}

  <button
    onClick={handleNext}
    disabled={!isComplete || loading}
    className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 disabled:opacity-50 text-white rounded-lg font-semibold transition-all"
  >
    {loading
      ? 'Generando... (30s)'
      : step === STEPS.length - 1
      ? '✨ Genera Portfolio'
      : 'Avanti →'}
  </button>
</div>

      </div>

      {/* Info */}
      <p className="mt-8 text-center text-slate-500 text-sm">
        Rilevatore di unlisted matter Professionale.
      </p>
    </div>
  </div>
);

}
