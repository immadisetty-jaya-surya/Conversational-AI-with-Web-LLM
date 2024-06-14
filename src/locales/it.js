import { SubmitKey } from "../store/config";

const it = {
  WIP: "Work in progress...",
  ChatItem: {
    ChatItemCount: (count) => `${count} messaggi`,
  },
  Chat: {
    SubTitle: (count) => `${count} messaggi con ChatGPT`,
    Actions: {
      ChatList: "Vai alla Chat List",
      CompressedHistory: "Prompt di memoria della cronologia compressa",
      Export: "Esportazione di tutti i messaggi come Markdown",
      Copy: "Copia",
      Stop: "Stop",
      Retry: "Riprova",
      Delete: "Delete",
    },
    Rename: "Rinomina Chat",
    Typing: "Typing…",
    Input: (submitKey) => {
      var inputHints = `Scrivi qualcosa e premi ${submitKey} per inviare`;
      if (submitKey === String(SubmitKey.Enter)) {
        inputHints += ", premi Shift + Enter per andare a capo";
      }
      return inputHints;
    },
    Send: "Invia",
    Config: {
      Reset: "Riportare alle condizioni originali",
      SaveAs: "Salva come modello",
    },
  },
  Export: {
    Title: "Tutti i messaggi",
    Copy: "Copia tutto",
    Download: "Scarica",
    MessageFromYou: "Messaggio da te",
    MessageFromWebLLM: "Messaggio da WebLLM",
  },
  Memory: {
    Title: "Prompt di memoria",
    EmptyContent: "Vuoto.",
    Copy: "Copia tutto",
    Send: "Send Memory",
    Reset: "Reset Session",
    ResetConfirm:
      "Ripristinare cancellerà la conversazione corrente e la cronologia di memoria. Sei sicuro che vuoi riavviare?",
  },
  Home: {
    NewChat: "Nuova Chat",
    DeleteChat: "Confermare la cancellazione della conversazione selezionata?",
    DeleteToast: "Chat Cancellata",
    Revert: "Revert",
  },
  Settings: {
    Title: "Impostazioni",
    SubTitle: "Tutte le impostazioni",

    Lang: {
      Name: "Language", // ATTENTION: if you wanna add a new translation, please do not translate this value, leave it as `Language`
      All: "Tutte le lingue",
    },
    Avatar: "Avatar",
    FontSize: {
      Title: "Dimensione carattere",
      SubTitle: "Regolare la dimensione dei caratteri del contenuto della chat",
    },
    InjectSystemPrompts: {
      Title: "Inserisci Prompts di Sistema",
      SubTitle:
        "Aggiungi forzatamente un prompt di sistema simulato di ChatGPT all'inizio della lista dei messaggi per ogni richiesta",
    },
    Update: {
      Version: (x) => `Versione: ${x}`,
      IsLatest: "Ultima versione",
      CheckUpdate: "Controlla aggiornamenti",
      IsChecking: "Sto controllando gli aggiornamenti...",
      FoundUpdate: (x) => `Trovata nuova versione: ${x}`,
      GoToUpdate: "Aggiorna",
    },
    SendKey: "Tasto invia",
    Theme: "Tema",
    TightBorder: "Schermo intero",
    SendPreviewBubble: {
      Title: "Anteprima di digitazione",
      SubTitle: "Preview markdown in bubble",
    },
    Prompt: {
      Disable: {
        Title: "Disabilita l'auto completamento",
        SubTitle: "Input / per attivare il completamento automatico",
      },
      List: "Elenco dei suggerimenti",
      ListCount: (builtin, custom) =>
        `${builtin} built-in, ${custom} user-defined`,
      Edit: "Modifica",
      Modal: {
        Title: "Prompt List",
        Add: "Add One",
        Search: "Search Prompts",
      },
      EditModal: {
        Title: "Edit Prompt",
      },
    },
    HistoryCount: {
      Title: "Conteggio dei messaggi allegati",
      SubTitle: "Numero di messaggi inviati allegati per richiesta",
    },
    CompressThreshold: {
      Title: "Soglia di compressione della cronologia",
      SubTitle:
        "Comprimerà se la lunghezza dei messaggi non compressi supera il valore",
    },

    Usage: {
      Title: "Bilancio Account",
      SubTitle(used, total) {
        return `Attualmente usato in questo mese $${used}, soglia massima $${total}`;
      },
      IsChecking: "Controllando...",
      Check: "Controlla ancora",
      NoAccess: "Inserire la chiave API per controllare il saldo",
    },

    Model: "Modello GPT",
    Temperature: {
      Title: "Temperature",
      SubTitle: "Un valore maggiore rende l'output più casuale",
    },
    MaxTokens: {
      Title: "Token massimi",
      SubTitle: "Lunghezza massima dei token in ingresso e dei token generati",
    },
    PresencePenalty: {
      Title: "Penalità di presenza",
      SubTitle:
        "Un valore maggiore aumenta la probabilità di parlare di nuovi argomenti",
    },
    FrequencyPenalty: {
      Title: "Penalità di frequenza",
      SubTitle:
        "Un valore maggiore che diminuisce la probabilità di ripetere la stessa riga",
    },
  },
  Store: {
    DefaultTopic: "Nuova conversazione",
    BotHello: "Ciao, come posso aiutarti oggi?",
    Error: "Qualcosa è andato storto, riprova più tardi.",
    Prompt: {
      History: (content) =>
        "Questo è un riassunto della cronologia delle chat tra l'IA e l'utente:" +
        content,
      Topic:
        "Si prega di generare un titolo di quattro o cinque parole che riassuma la nostra conversazione senza alcuna traccia, punteggiatura, virgolette, punti, simboli o testo aggiuntivo. Rimuovere le virgolette",
      Summarize:
        "Riassumi brevemente la nostra discussione in 200 caratteri o meno per usarla come spunto per una futura conversazione.",
    },
  },
  Copy: {
    Success: "Copiato sugli appunti",
    Failed:
      "Copia fallita, concedere l'autorizzazione all'accesso agli appunti",
  },
  Context: {
    Toast: (x) => `Con ${x} prompts contestuali`,
    Edit: "Prompt contestuali e di memoria",
    Add: "Aggiungi altro",
  },
  Plugin: {
    Name: "Plugin",
  },
  FineTuned: {
    Sysmessage: "Sei un assistente che",
  },
  Template: {
    Name: "Prompts",
    Item: {
      Info: (count) => `${count} prompts`,
      Chat: "Chat",
      View: "View",
      Edit: "Edit",
      Delete: "Delete",
      DeleteConfirm: "Confirm to delete?",
    },
    EditModal: {
      Title: (readonly) =>
        `Edit Prompt Template ${readonly ? "(readonly)" : ""}`,
      Download: "Download",
      Clone: "Clone",
    },
    Config: {
      Avatar: "Bot Avatar",
      Name: "Bot Name",
    },
  },
  NewChat: {
    Return: "Return",
    Skip: "Skip",
    Title: "Pick a Template",
    SubTitle: "Start chat with a template",
    More: "Find More",
    NotShow: "Not Show Again",
    ConfirmNoShow: "Confirm to disable？You can enable it in settings later.",
  },

  UI: {
    Confirm: "Confirm",
    Cancel: "Cancel",
    Close: "Close",
    Create: "Create",
    Edit: "Edit",
  },
  Exporter: {
    Model: "Modello",
    Messages: "Messaggi",
    Topic: "Argomento",
    Time: "Tempo",
  },
};

export default it;
