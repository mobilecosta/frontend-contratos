import { createContext, useContext, useMemo, useState } from 'react';
import type { PropsWithChildren } from 'react';
import { api } from './api';
import type { LoginPayload, LoginResponse } from './types';

type AuthContextType = {
  token: string | null;
  isAuthenticated: boolean;
  login: (payload: LoginPayload) => Promise<void>;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | null>(null);

function resolveToken(response: LoginResponse): string | null {
  // Estrutura principal: session.access_token (Supabase)
  if (response.session?.access_token) {
    return response.session.access_token;
  }

  // Fallback: data.session.access_token
  if (response.data?.session?.access_token) {
    return response.data.session.access_token;
  }

  // Fallback: response.token
  if (typeof response.token === 'string' && response.token.length > 0) {
    return response.token;
  }

  // Fallback: response.accessToken
  if (typeof response.accessToken === 'string' && response.accessToken.length > 0) {
    return response.accessToken;
  }

  // Fallback: response.access_token
  if (typeof response.access_token === 'string' && response.access_token.length > 0) {
    return response.access_token;
  }

  // Fallback: data.token
  if (response.data && typeof response.data.token === 'string' && response.data.token.length > 0) {
    return response.data.token;
  }

  return null;
}

export function AuthProvider({ children }: PropsWithChildren) {
  const [token, setToken] = useState<string | null>(() => localStorage.getItem('accessToken'));

  const value = useMemo<AuthContextType>(
    () => ({
      token,
      isAuthenticated: Boolean(token),
      login: async (payload) => {
        const { data } = await api.post<LoginResponse>('/auth/login', payload);
        const resolvedToken = resolveToken(data);

        if (!resolvedToken) {
          throw new Error('Token não encontrado na resposta de login');
        }

        localStorage.setItem('accessToken', resolvedToken);
        setToken(resolvedToken);
      },
      logout: () => {
        localStorage.removeItem('accessToken');
        setToken(null);
      }
    }),
    [token]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth deve ser usado dentro de AuthProvider');
  }
  return context;
}
