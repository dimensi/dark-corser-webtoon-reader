import { browser } from '$app/environment';

// Google Identity Services types
declare global {
  interface Window {
    google: {
      accounts: {
        oauth2: {
          initTokenClient: (config: {
            client_id: string;
            scope: string;
            callback: (response: { access_token: string; error?: string }) => void;
          }) => {
            requestAccessToken: () => void;
          };
        };
      };
    };
  }
}

const GOOGLE_CLIENT_ID = import.meta.env.PUBLIC_GOOGLE_CLIENT_ID || '697596246733-hioncmgqtau3vpr5mbn6qq6g4kkmv9cr.apps.googleusercontent.com';
const DRIVE_SCOPE = 'https://www.googleapis.com/auth/drive.readonly';
const TOKEN_KEY = 'google_drive_access_token';

export interface AuthState {
  isAuthenticated: boolean;
  accessToken: string | null;
  isLoading: boolean;
}

class GoogleAuthService {
  private tokenClient: any = null;
  private authState: AuthState = {
    isAuthenticated: false,
    accessToken: null,
    isLoading: false
  };
  private listeners: ((state: AuthState) => void)[] = [];

  constructor() {
    if (browser) {
      this.initializeAuth();
    }
  }

  private initializeAuth() {
    // Проверяем сохраненный токен при инициализации
    const savedToken = localStorage.getItem(TOKEN_KEY);
    if (savedToken) {
      this.authState.accessToken = savedToken;
      this.authState.isAuthenticated = true;
      this.notifyListeners();
    }

    // Инициализируем Google Identity Services когда загрузится
    if (window.google?.accounts?.oauth2) {
      this.setupTokenClient();
    } else {
      // Ждем загрузки Google Identity Services
      const checkGoogle = () => {
        if (window.google?.accounts?.oauth2) {
          this.setupTokenClient();
        } else {
          setTimeout(checkGoogle, 100);
        }
      };
      checkGoogle();
    }
  }

  private setupTokenClient() {
    this.tokenClient = window.google.accounts.oauth2.initTokenClient({
      client_id: GOOGLE_CLIENT_ID,
      scope: DRIVE_SCOPE,
      callback: (response) => {
        this.authState.isLoading = false;
        
        if (response.error) {
          console.error('OAuth error:', response.error);
          this.authState.isAuthenticated = false;
          this.authState.accessToken = null;
          localStorage.removeItem(TOKEN_KEY);
        } else {
          this.authState.accessToken = response.access_token;
          this.authState.isAuthenticated = true;
          localStorage.setItem(TOKEN_KEY, response.access_token);
        }
        
        this.notifyListeners();
      }
    });
  }

  public async signIn(): Promise<void> {
    if (!this.tokenClient) {
      throw new Error('Google Identity Services not loaded');
    }

    this.authState.isLoading = true;
    this.notifyListeners();
    
    this.tokenClient.requestAccessToken();
  }

  public signOut(): void {
    this.authState.isAuthenticated = false;
    this.authState.accessToken = null;
    this.authState.isLoading = false;
    localStorage.removeItem(TOKEN_KEY);
    this.notifyListeners();
  }

  public getAccessToken(): string | null {
    return this.authState.accessToken;
  }

  public isAuthenticated(): boolean {
    return this.authState.isAuthenticated;
  }

  public getAuthState(): AuthState {
    return { ...this.authState };
  }

  public subscribe(listener: (state: AuthState) => void): () => void {
    this.listeners.push(listener);
    
    // Возвращаем функцию отписки
    return () => {
      const index = this.listeners.indexOf(listener);
      if (index > -1) {
        this.listeners.splice(index, 1);
      }
    };
  }

  private notifyListeners() {
    this.listeners.forEach(listener => listener(this.authState));
  }

  public async validateToken(): Promise<boolean> {
    const token = this.getAccessToken();
    if (!token) return false;

    try {
      const response = await fetch('https://www.googleapis.com/oauth2/v1/tokeninfo', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) {
        this.signOut();
        return false;
      }

      return true;
    } catch (error) {
      console.error('Token validation failed:', error);
      this.signOut();
      return false;
    }
  }
}

// Создаем единственный экземпляр сервиса
export const googleAuthService = new GoogleAuthService();
