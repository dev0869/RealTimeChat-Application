import { createContext, useContext, useEffect ,useState} from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../Firebase";
const AppContext=createContext()

export const AppProvider=({children})=>{
const [currentUser,setCurrentUser]=useState({})
// getting currently user signed in 
useEffect(() => {
    onAuthStateChanged(auth, (user) => {
        setCurrentUser(user)
      });
}, [])

return(
    <AppContext.Provider value={{currentUser}}>
        {children}
    </AppContext.Provider>
)
}



export const useChatContext = () => {
    return useContext(AppContext)
}

