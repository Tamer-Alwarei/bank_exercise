// Netbank modelling exercise

// Currency Type
// This defines a Currency type as a union of specific currency codes. 
// It restricts the valid currency options to those specified in the requirements.
type Currency = 'DKK' | 'SEK' | 'NOK' | 'USD' | 'EUR';

// Regular Account Type
// This represents a regular account with properties such as name, IBAN, currency, and amount. 
// The type field ensures that we can distinguish between regular and pocket accounts.
interface RegularAccount {
    type: 'regular';
    name: string;
    IBAN: string;
    currency: Currency;
    amount: number;
}

// Pocket Type
// This defines the structure of a pocket within a pocket account, including currency and amount.
interface Pocket {
    currency: Currency;
    amount: number;
}

// Pocket Account Type
// This represents a pocket account with a name, IBAN, and an array of pockets. 
//The type field helps differentiate it from regular accounts.
interface PocketAccount {
    type: 'pocket';
    name: string;
    IBAN: string;
    pockets: Pocket[];
}

// International Payments Form Type
// This describes the structure of the form used for international payments, including the sender's 
// account (either regular or pocket), the recipient's IBAN, SWIFT code, and the transfer amount.
interface InternationalPaymentsForm {
    fromAccount: RegularAccount | PocketAccount;
    toIBAN: string;
    toSWIFT: string;
    amount: number;
}

// Transfer Receipt Type
// This represents the information displayed in a receipt after a successful transfer, including details and timestamp.
interface TransferReceipt {
    details: string;
    time: string;
}

// Chat Type
// This represents the chat state, including connection status, queue position, chat window status, 
// and additional details like messages and busy times.
interface Chat {
    status: 'connecting' | 'connected' | 'disconnected';
    queuePosition?: number;
    chatWindow: 'minimized' | 'open' | 'full-screen';
    messages?: string[];
    busyTimes?: string[];
}

// AppState Type
// This is the main application state, consisting of user information, the active page, 
// account details, international payments state, and support state. 
// It reflects the overall structure of the application state based on the described requirements.
interface AppState {
    user: {
      isLoggedIn: boolean;
      email?: string;
      name?: string;
      loading: boolean;
      loadingError?: 'user' | 'server';
    };
    activePage: 'accounts' | 'internationalPayments' | 'support';
    accounts: {
      loading: boolean;
      loadingError?: 'app' | 'server';
      regularAccounts: RegularAccount[];
      pocketAccounts: PocketAccount[];
    };
    internationalPayments: {
      form: InternationalPaymentsForm;
      transferStatus?: 'success' | 'error';
      transferError?: string;
      receipt?: TransferReceipt;
    };
    support: {
      chat: Chat;
    };
  }

  // Initial State
  const initialState: AppState = {
    user: {
      isLoggedIn: false,
      loading: false,
    },
    activePage: 'accounts',
    accounts: {
      loading: false,
      regularAccounts: [],
      pocketAccounts: [],
    },
    internationalPayments: {
      form: {
        fromAccount: {
          type: 'regular',
          name: '',
          IBAN: '',
          currency: 'DKK',
          amount: 0,
        },
        toIBAN: '',
        toSWIFT: '',
        amount: 0,
      },
    },
    support: {
      chat: {
        status: 'disconnected',
        chatWindow: 'minimized',
      },
    },
  };