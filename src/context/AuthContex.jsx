import { auth } from "@/firebase/firebase.config";
import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth";

import { createContext, useContext, useEffect, useState } from "react"

const AuthContext=createContext();
export const useAuth=()=>{
    return useContext(AuthContext);
}

const googleProvider = new GoogleAuthProvider();

export const AuthProvide=({children})=>{
    const [currentUser,setCurrentUser]=useState(null);
    const [loading,setLoading]=useState(true)

    //register a user
    const registerUser=async (email,password)=>{
        return await createUserWithEmailAndPassword(auth, email, password)
    }
    
    //login user

    const loginUser=async(email,password)=>{
        return await signInWithEmailAndPassword(auth, email, password)   
    }

    //signin with google
    const signInWithGoogle=async()=>{
        return await signInWithPopup(auth, googleProvider);

    }

    //logout user

    const logout=()=>{
        localStorage.removeItem('token');
        return signOut(auth);
    }

    //mange user

    useEffect(()=>{
        const unsubscribe=onAuthStateChanged(auth, (user)=>{
            setCurrentUser(user);
            setLoading(false);

            if (user){
                const {email,displayName,photoURL}=user;
                const userdata={
                    email,
                    username:displayName,
                    photo:photoURL
                }
            }
        })

        return ()=>unsubscribe();
    },[])

    const value={
        currentUser,
        loading,
        registerUser,
        loginUser,
        signInWithGoogle,
        logout
    }


    return(
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}