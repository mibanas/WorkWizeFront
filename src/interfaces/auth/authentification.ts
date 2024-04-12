export interface UserState {
    isAuthenticated: boolean;
    loading : boolean,
    errors: {
      message: string | null;
      accountLock: string | null;
      tooManyAttempts: string | null;
      internalError: string | null;
    };
    accessToken: string | null;
    user: any | null;
  }
  
