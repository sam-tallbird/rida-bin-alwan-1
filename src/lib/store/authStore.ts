import { create } from 'zustand';

interface AuthState {
  isAuthenticated: boolean;
  user: {
    username: string;
  } | null;
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => void;
  initFromStorage: () => void;
}

// Simple hardcoded credentials for now (in production, this would be API-based)
const VALID_CREDENTIALS = {
  username: 'admin',
  password: 'ridha2025'
};

const STORAGE_KEY = 'cms-auth-storage';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const useAuthStore = create<AuthState>((set, _get) => ({
  isAuthenticated: false,
  user: null,
  
  login: async (username: string, password: string) => {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    if (username === VALID_CREDENTIALS.username && password === VALID_CREDENTIALS.password) {
      const authData = {
        isAuthenticated: true,
        user: { username }
      };
      
      // Save to localStorage
      if (typeof window !== 'undefined') {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(authData));
      }
      
      set(authData);
      return true;
    }
    return false;
  },
  
  logout: () => {
    const authData = {
      isAuthenticated: false,
      user: null
    };
    
    // Remove from localStorage
    if (typeof window !== 'undefined') {
      localStorage.removeItem(STORAGE_KEY);
    }
    
    set(authData);
  },

  initFromStorage: () => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        try {
          const authData = JSON.parse(stored);
          set(authData);
        } catch (error) {
          console.error('Failed to parse auth data from storage:', error);
        }
      }
    }
  }
})); 