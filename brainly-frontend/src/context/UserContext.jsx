import { useContext,createContext } from "react";

export let AuthContext=createContext()

export let AuthProvider=({children})=>{
    let name="umashankar"
    return <AuthContext.Provider value={{name}}>
        {children}
    </AuthContext.Provider>
}

let useAuth=()=>{
    return useContext(AuthContext)
}

export default useAuth;