import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, sendPasswordResetEmail, signInWithEmailAndPassword, signInWithPopup, signOut } from 'firebase/auth';
import { createContext, useEffect, useState } from 'react';
import { auth } from '../firebase/firebase.config';

export const AuthContext = createContext(null);

const AuthProvider = (props = {}) => {

    const {children} = props || {};

    const provider = new GoogleAuthProvider();

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [dataLoading, setDataLoading] = useState(true);

    useEffect(() => {
        const unSubscribe = onAuthStateChanged(auth, currentUser => {
            setUser(currentUser);
            setLoading(false);
        })
        return () => {
            unSubscribe();
        }
    }, [user])

    const createUser = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password);
    }

    const logInUser = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password);
    }

    const loginWithGoogle = () => {
        setLoading(true);
        return signInWithPopup(auth, provider);
    }

    const logOutUser = () => {
        setLoading(true);
        return signOut(auth);
    }

    const passwordReset = (email) => {
        setLoading(true);
        return sendPasswordResetEmail(auth, email);
    }

    const userInfo = {
        user,
        setUser,
        loading,
        setLoading,
        dataLoading,
        setDataLoading,
        createUser,
        logInUser,
        logOutUser,
        loginWithGoogle,
        passwordReset
    }

    return (
        <AuthContext.Provider value={userInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;