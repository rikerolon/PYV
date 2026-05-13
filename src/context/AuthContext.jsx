// ========================================
// CONTEXTO DE AUTENTICACIÓN — Firebase
// ========================================
import { createContext, useContext, useState, useEffect } from 'react';
import { initializeApp } from 'firebase/app';
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
} from 'firebase/auth';

// ⚠️ REEMPLAZA ESTOS VALORES con tu configuración de Firebase
const firebaseConfig = {
  apiKey: "TU_API_KEY",
  authDomain: "TU_AUTH_DOMAIN",
  projectId: "TU_PROJECT_ID",
  storageBucket: "TU_STORAGE_BUCKET",
  messagingSenderId: "TU_MESSAGING_SENDER_ID",
  appId: "TU_APP_ID",
};

// Inicializar Firebase
let app, auth, provider;
try {
  app = initializeApp(firebaseConfig);
  auth = getAuth(app);
  provider = new GoogleAuthProvider();
} catch (e) {
  console.warn('Firebase no configurado. Usa credenciales reales en AuthContext.jsx');
}

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!auth) { setLoading(false); return; }
    const unsubscribe = onAuthStateChanged(auth, (u) => {
      setUser(u);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  // Iniciar sesión con Google
  const signInWithGoogle = async () => {
    if (!auth) {
      // Mock para demo sin Firebase configurado
      setUser({ displayName: 'Usuario Demo', email: 'demo@pyv.com', photoURL: null });
      return;
    }
    try {
      await signInWithPopup(auth, provider);
    } catch (err) {
      console.error('Error al iniciar sesión:', err);
    }
  };

  // Cerrar sesión
  const logout = async () => {
    if (!auth) { setUser(null); return; }
    try {
      await signOut(auth);
      setUser(null);
    } catch (err) {
      console.error('Error al cerrar sesión:', err);
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, signInWithGoogle, logout }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth debe usarse dentro de AuthProvider');
  return ctx;
};
