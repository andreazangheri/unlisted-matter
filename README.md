# UNLISTED MATTER

**AI-native Professional Scanner** che genera una **Mappa del Valore Inespresso** a partire da 7 Matter (processi, intenzioni, fallimenti, cicli di apprendimento e capability).

Non è un portfolio. È lo strumento per **rilevare ciò che conta veramente** nel tuo lavoro (la tua *unlisted matter*) – il valore che nessun algoritmo può estendere, solo amplificare.

## Live Demo

👉 [**https://unlisted-matter.vercel.app**](https://unlisted-matter.vercel.app)

## Come funziona

1. **7 Matter guidate** – Compila domande su: **rilevanza gravitazionale**, essenza, impronta unica, intenzione, vettori funzionali, cicli di apprendimento, proof of value e valore acquisito.
2. **Generazione AI** – Gemini API analizza le tue risposte e genera una Mappa del Valore Inespresso coerente.
3. **Pagina condivisibile** – Output come pagina web con le Matter colorate, pronta da stampare in PDF o condividere via link.

## Stack

- **Frontend**: Next.js 15 (App Router), Tailwind CSS, TypeScript
- **Backend**: Next.js API Routes
- **AI**: Google Gemini 2.5 Flash Lite
- **Deploy**: Vercel
- **Storage**: localStorage per bozze

## Setup locale

1. Clona il repository:
```bash
git clone [https://github.com/andreazangheri/unlisted-matter.git](https://github.com/andreazangheri/unlisted-matter.git)
cd unlisted-matter
```

2. **Installa le dipendenze**
```bash
npm install
```

3. **Ottieni la tua chiave API di Gemini**

Puoi generarla gratuitamente da Google AI Studio: 
```bash 
https://aistudio.google.com/api-keys
```

4. **Crea il file di configurazione locale e inserisci la tua chiave**
```bash
# Crea il file .env.local e aggiungi la tua chiave

echo "GOOGLE_API_KEY=your_key_here" > .env.local
```

5. Avvia il progetto:
```bash
npm run dev
```