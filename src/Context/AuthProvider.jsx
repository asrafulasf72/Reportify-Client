import React, { useEffect, useState } from 'react';
import { AuthContext } from './AuthContext';
import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from 'firebase/auth';
import { auth } from '../Firebase/firebase.init';
import useAxiosSecure from '../Hooks/useAxiosSecure';

const googleProvider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {
    const [firebaseUser, setFirebaseUser] = useState(null);
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)

    const axiosSecure = useAxiosSecure()
    const fetchDbUser = async (email) => {
        try {
            const res = await axiosSecure.get(`/users/${email}`)
            setUser(res.data)
        } catch (error) {
            console.error("Failed to fetch DB user", error)
        }
    };

    const refetchUser = async () => {
        if (firebaseUser?.email) {
            await fetchDbUser(firebaseUser.email);
        }
    };



    const registerUser = (email, password) => {
        setLoading(true)
        return createUserWithEmailAndPassword(auth, email, password)
    }

    const signInUser = (email, password) => {
        setLoading(true)
        return signInWithEmailAndPassword(auth, email, password)
    }

    const signInWithGoogle = () => {
        setLoading(true)
        return signInWithPopup(auth, googleProvider)
    }

    const userLogout = () => {
        return signOut(auth)
    }

    const UpdateUserProfile = (name, photo) => {
        return updateProfile(auth.currentUser, {
            displayName: name,
            photoURL: photo,
        })
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
            setFirebaseUser(currentUser);

            if (currentUser?.email) {
                await currentUser.getIdToken(true)
                await fetchDbUser(currentUser.email);
            } else {
                setUser(null);
        
            }

            setLoading(false);
            console.log(currentUser)
        });

        return () => unsubscribe();
    }, []);

    const authInfo = {
        user,
        loading,
        registerUser,
        signInUser,
        signInWithGoogle,
        userLogout,
        UpdateUserProfile,
         refetchUser
    }

    return <AuthContext value={authInfo}>{children}</AuthContext>
};

export default AuthProvider;