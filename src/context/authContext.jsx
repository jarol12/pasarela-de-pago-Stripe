import { createContext, useContext, useEffect, useState } from 'react'
import { auth } from '../firebase'
import { GoogleAuthProvider, createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut } from 'firebase/auth'


export const authContext = createContext()

export const useAuth = () => {
    const context = useContext(authContext)
    if(!context) throw new Error('There is not auth provider')
    return context
}
export function AuthProvider({children}) {
   const [user, setUser] = useState(null)
   const [loading, setLoading] = useState(true);

    const signup = (email, password) => 
      createUserWithEmailAndPassword(auth, email, password)

    useEffect(() =>{
      const unsubuscribe = onAuthStateChanged(auth, currentUser => {
        setUser(currentUser);
        setLoading(false);
      })
      return () => unsubuscribe();
    }, [])

    const login = async(email, password) =>
      signInWithEmailAndPassword(auth, email, password)
    
    const logout = () => signOut(auth)

    const resetPassword = async (email) => sendPasswordResetEmail(auth, email);

    const loginWithGoogle = () => {
      const googleProvider = new GoogleAuthProvider();
      return signInWithPopup(auth, googleProvider);
    };

    return( <authContext.Provider value={{ 
      signup,
      login,
      user,
      resetPassword,
      loading,
      logout,
      loginWithGoogle
    
    }}>{children}</authContext.Provider>);
} 