import { createContext, ReactNode, useEffect, useState } from "react";
import { auth, firebase } from "../services/firebase";

type User = {
    id: string,
    name: string,
    avatar: string;
  }
  
  type AuthContextType ={
    user: User | undefined,
    signInWithGoogle: () => Promise<void>;
  }

  type AuthContextProviderProps = {
      children: ReactNode;
  }
  
export const AuthContext = createContext({} as AuthContextType);

export function AuthContextProvider(props: AuthContextProviderProps) {
    const [user, setUser] = useState<User>();

    useEffect(() => {
      const unsubcribe = auth.onAuthStateChanged(user => {
        if ( user ){
          const { displayName, photoURL, uid } = user // retorno do user
  
          if (!displayName || !photoURL) { // se o user não tiver nome ou foto -> error
              throw new Error('Missing information from Google Account.')
          }
    
          setUser({ // vai setar as informações do user
            id: uid,
            name: displayName,
            avatar: photoURL
          })
        }   
      })
  
      return () => {
        unsubcribe();
      }
    }, [])
  
    async function signInWithGoogle(){
      const provider = new firebase.auth.GoogleAuthProvider();
  
      const result = await auth.signInWithPopup(provider)
      
      if (result.user) { // se for retornado um usuário(autenticação ok)
        const { displayName, photoURL, uid } = result.user // retorno do user
  
        if (!displayName || !photoURL) { // se o user não tiver nome ou foto -> error
            throw new Error('Missing information from Google Account.')
        }
  
        setUser({ // vai setar as informações do user
          id: uid,
          name: displayName,
          avatar: photoURL
        })
      }   
     
    }

    return (
        <AuthContext.Provider value={{user, signInWithGoogle}}> 
            {props.children}
        </AuthContext.Provider>
    );
}