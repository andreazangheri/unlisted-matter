import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY || '');

const SYSTEM_PROMPT = `Sei un esperto di carriera che aiuta persone straordinarie a scoprire e comunicare la loro vera unicità professionale.

PRINCIPI:
- Zero job titles. Mai.
- Focus sulla ESSENZA, non sul titolo
- Linguaggio diretto, potente, conversazionale
- Rivela il PROCESSO, non solo l'output
- Celebra le lezioni dai fallimenti
- Identifica l'impronta unica che nessun altro ha

OUTPUT:
Genera SOLO un JSON valido (parseable) con questi campi esatti:
{
  "name": "nome completo",
  "essence": "chi sei veramente (1-2 paragrafi, tono conversazionale)",
  "methodology": "il tuo processo risolutivo (1 paragrafo)",
  "capabilities": ["capability 1", "capability 2", "capability 3"],
  "projects": "narrativa dei progetti con impatti reali (1-2 paragrafi)",
  "failures": "lezioni dai fallimenti (1-2 paragrafi)",
  "uniqueness": "dichiarazione della tua impronta unica (1 paragrafo)",
  "uniqueStatement": "statement di unicità polished (1-2 frasi)"
}

Scrivi tutto in italiano, tono professionale ma umano, nessun corporate speak.`;

export async function POST(request: Request) {
  try {
    const body = await request.json();
        const {
        essence,
        uniqueStatement,
        howYouThink,
        capabilityVectors,
        learningRate,
        proofOfValue,
        acquiredValue,
        } = body;

    const userPrompt = `${SYSTEM_PROMPT}

Ecco le risposte di una persona straordinaria:

matter 1 - VALORE GRAVITAZIONALE (IMPATTO): ${essence}
matter 2 - VALORE INESPRESSO (SUPERPOTERE IRRIPRODUCIBILE): ${uniqueStatement}
matter 3 - VALORE DI INTENZIONE (ORCHESTRION, METODO PROPRIETARIO): ${howYouThink}
matter 4 - VETTORI FUNZIONALI (CAPABILITY CLUSTERS: CONOSCENZA / SKILL / TOOL): ${capabilityVectors}
matter 5 - TASSO DI ACQUISIZIONE (CICLI DI APPRENDIMENTO): ${learningRate}
matter 6 - PROOF OF VALUE (PROGETTI, PROBLEMI, RISULTATI): ${proofOfValue}
matter 7 - VALORE ACQUISITO (FALLIMENTI, LEZIONI, EFFETTO PROTÉGÉ): ${acquiredValue}

Analizza queste risposte e genera un unlisted matter che NON è un CV ma una Mappa del Valore Inespresso.
Assicurati che l'output sia valido JSON e contenga SOLO i campi specificati nel system prompt.

Se le risposte dell’utente sono troppo brevi, generiche o non informative (per esempio una singola lettera, la stessa parola ripetuta in tutti i campi, oppure frasi come “non so”), NON inventare dettagli biografici, progetti o competenze specifiche. In questi casi:
mantieni la Mappa del Valore Inespresso estremamente essenziale;
segnala chiaramente che servono risposte più ricche per poter generare un vero unlisted matter;
usa un tono rispettoso ma diretto, invitando l’utente a rifare l’esercizio con maggiore profondità.

Nota importante: le risposte potrebbero essere incomplete o compilate in modo superficiale. Se noti che molti campi contengono solo caratteri singoli, parole casuali o frasi generiche, limita l’output a una versione minimale e includi un breve avviso del tipo: “Per generare una Mappa del Valore Inespresso realmente utile servono risposte più approfondite in ogni matter”. Non inventare informazioni che non sono presenti nelle risposte.​`;


    const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash-lite' });

    const result = await model.generateContent(userPrompt);

    const responseText = result.response.text();

    // Parse JSON dalla risposta
    const jsonMatch = responseText.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      console.error('Response text:', responseText);
      throw new Error('Invalid JSON response from API');
    }

    const portfolio = JSON.parse(jsonMatch[0]);

    return Response.json(portfolio);
  } catch (error) {
    console.error('Error:', error);
    return Response.json(
      { error: 'Failed to generate portfolio', details: String(error) },
      { status: 500 }
    );
  }
}
