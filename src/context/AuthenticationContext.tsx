'use client';
import { createContext, useState } from 'react';
import { AuthContextType } from '@/types/types';

export const AuthContext = createContext<AuthContextType>({
  login: false,
});

export default function AuthProvider({ children }: { children: any }) {
  const [login, setLogin] = useState<boolean>(false);
  return (
    <AuthContext.Provider value={{ login }}>{children}</AuthContext.Provider>
  );
}
