import React, { createContext, useContext, useEffect, useState } from 'react';
import { 
  signInWithPopup, 
  GoogleAuthProvider, 
  signOut, 
  onAuthStateChanged 
} from 'firebase/auth';
import { getFirebaseAuth, isMockFirebase } from '../lib/firebase';

export interface AdminUser {
  email: string;
  displayName: string;
  photoURL: string;
}

interface AuthContextType {
  user: AdminUser | null;
  isAdmin: boolean;
  loading: boolean;
  loginWithCredentials: (id: string, pw: string) => Promise<boolean>;
  logout: () => Promise<void>;
  // Google login
  login: () => Promise<void>;
  loginWithNaver: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Default Admin Credentials
export const DEFAULT_ADMIN_ID = 'johyun3662';
export const DEFAULT_ADMIN_PW = 'qlalfdltkA1@3';

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<AdminUser | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 1. First check client credentials local storage fallback session
    const savedSession = localStorage.getItem('neutiul_admin_session');
    if (savedSession === 'true') {
      setUser({
        email: 'johyun3662@gmail.com',
        displayName: '느티울 어드민',
        photoURL: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop&crop=faces'
      });
      setIsAdmin(true);
      setLoading(false);
      return;
    }

    // 2. Real Firebase Auth state listener
    if (isMockFirebase) {
      setLoading(false);
      return;
    }

    let unsubscribe: (() => void) | undefined;
    let cancelled = false;
    getFirebaseAuth().then((auth) => {
      if (cancelled || !auth) {
        setLoading(false);
        return;
      }
      unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
        if (firebaseUser) {
          if (firebaseUser.email === 'johyun3662@gmail.com') {
            setUser({
              email: firebaseUser.email || '',
              displayName: firebaseUser.displayName || '느티울 어드민',
              photoURL: firebaseUser.photoURL || ''
            });
            setIsAdmin(true);
            localStorage.setItem('neutiul_admin_session', 'true');
          } else {
            signOut(auth).catch(e => console.error(e));
            setUser(null);
            setIsAdmin(false);
            localStorage.removeItem('neutiul_admin_session');
          }
        } else {
          setUser(null);
          setIsAdmin(false);
        }
        setLoading(false);
      }, (error) => {
        console.error("Auth state change error:", error);
        setLoading(false);
      });
    });

    return () => {
      cancelled = true;
      if (unsubscribe) unsubscribe();
    };
  }, []);

  const loginWithCredentials = async (id: string, pw: string): Promise<boolean> => {
    setLoading(true);
    try {
      // Support both easy "1234" password and the robust default "neutiul1234!"
      const isValidId = id.trim() === DEFAULT_ADMIN_ID;
      const isValidPw = pw === DEFAULT_ADMIN_PW || pw === '1234';

      if (isValidId && isValidPw) {
        localStorage.setItem('neutiul_admin_session', 'true');
        setUser({
          email: 'johyun3662@gmail.com',
          displayName: '느티울 어드민',
          photoURL: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop&crop=faces'
        });
        setIsAdmin(true);
        setLoading(false);
        return true;
      }
      setLoading(false);
      return false;
    } catch (err) {
      console.error(err);
      setLoading(false);
      return false;
    }
  };

  const logout = async () => {
    localStorage.removeItem('neutiul_admin_session');
    setUser(null);
    setIsAdmin(false);
    if (!isMockFirebase) {
      const auth = await getFirebaseAuth();
      if (auth) {
        try {
          await signOut(auth);
        } catch (err) {
          console.error("Sign out error:", err);
        }
      }
    }
  };

  // Google Login
  const login = async () => {
    setLoading(true);
    const auth = isMockFirebase ? null : await getFirebaseAuth();
    if (!auth) {
      localStorage.setItem('neutiul_admin_session', 'true');
      setUser({
        email: 'johyun3662@gmail.com',
        displayName: '느티울 어드민 (Mock)',
        photoURL: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop&crop=faces'
      });
      setIsAdmin(true);
      setLoading(false);
      return;
    }

    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const firebaseUser = result.user;
      if (firebaseUser.email === 'johyun3662@gmail.com') {
        setUser({
          email: firebaseUser.email || '',
          displayName: firebaseUser.displayName || '느티울 어드민',
          photoURL: firebaseUser.photoURL || ''
        });
        setIsAdmin(true);
        localStorage.setItem('neutiul_admin_session', 'true');
      } else {
        await signOut(auth);
        throw new Error('이 계정은 관리자 권한이 없습니다.');
      }
    } catch (err) {
      console.error("Google sign in failed:", err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const loginWithNaver = () => {
    console.warn("Legacy login with Naver is deprecated. Please use loginWithCredentials or login (Google).");
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      isAdmin, 
      loading, 
      loginWithCredentials, 
      logout,
      login,
      loginWithNaver
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
