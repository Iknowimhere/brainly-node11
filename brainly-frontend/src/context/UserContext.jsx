import { useContext, createContext, useState, useEffect } from "react";

let AuthContext = createContext();
import { useNavigate } from "react-router-dom";

export let AuthProvider = ({ children }) => {
    let navigate=useNavigate()
  let [user, setUser] = useState(()=>{
    let user=localStorage.getItem("user")||null
    let res=user?JSON.parse(user): null;
    return res;
  });
  console.log(user);
  
  let [token, setToken] = useState(null);



  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    }
    if (token) {
      localStorage.setItem("token", token);
    }
  }, [user, token]);

  let logout=()=>{
    if(user){
        localStorage.removeItem("user")
    }
    if(token){
        localStorage.removeItem("token")
    }
    navigate("/")
  }

  return (
    <AuthContext.Provider value={{ user, setUser, token, setToken,logout }}>
      {children}
    </AuthContext.Provider>
  );
};

let useAuth = () => {
  return useContext(AuthContext);
};

export default useAuth;
