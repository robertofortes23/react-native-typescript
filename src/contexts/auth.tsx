import React, {useState, createContext, useEffect, useContext} from 'react';
import authService from '../services/auth';
import AsyncStorage from '@react-native-community/async-storage';
import api from '../services/api';

interface AuthContextState {
  signed: boolean;
  user: object | null;
  signIn(): Promise<void>;
  signOut(): void;
  loading: boolean;
}

const AuthContext = createContext<AuthContextState>({} as AuthContextState);

export const AuthProvider: React.FC = ({children}) => {
  const [user, setUser] = useState<object | null>(null);
  const [loading, setLoading] = useState(true);

  async function signIn() {
    const response = await authService.signIn();
    api.defaults.headers.Authorization = `Bearer ${response.token}`;
    setUser(response.user);
    await AsyncStorage.setItem('@RNAuth:user', JSON.stringify(response.user));
    await AsyncStorage.setItem('@RNAuth:token', response.token);
  }

  function signOut() {
    AsyncStorage.clear().then(() => {
      setUser(null);
    });
  }

  useEffect(() => {
    async function loadStorageData() {
      const storagedUser = await AsyncStorage.getItem('@RNAuth:user');
      const storagedToken = await AsyncStorage.getItem('@RNAuth:token');

      if (storagedUser && storagedToken) {
        setUser(JSON.parse(storagedUser));
        api.defaults.headers.Authorization = `Bearer ${storagedToken}`;
      }
      setLoading(false);
    }
    loadStorageData();
  }, []);

  return (
    <AuthContext.Provider
      value={{signed: !!user, user, signIn, signOut, loading}}>
      {children}
    </AuthContext.Provider>
  );
};

export default function useAuth() {
  const context = useContext(AuthContext);
  return context;
}
