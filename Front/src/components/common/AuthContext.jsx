
import { useState , useEffect , createContext } from "react";
import { endpointHost } from "../../variables/endpoint";



const AuthContext = createContext();


export const AuthContextProvider = ({children}) =>{

const [isLoggedIn , setIsLoggedIn] = useState(false)

useEffect(()=>{
    const token = localStorage.getItem("JWT")
    if (token) {
        setIsLoggedIn(true);
    }
}, [])






const authenticate = async (values) => {
    const response = await fetch(`${endpointHost}/user/authenticate`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    });

    if (response.ok) {
      const data = await response.json();
      const token = data.token;
      const avatar = data.avatar
      const rol = data.rol
      localStorage.setItem("JWT", token);
      localStorage.setItem("INICIALES USUARIO" , avatar)
      localStorage.setItem("ROL DEL USUARIO" , rol)
      setIsLoggedIn(true);
      return { success: true };
    } else {
      return { success: false };
    }
  };



const login= (token) => {
    localStorage.setItem("JWT",  token);
    setIsLoggedIn(true)
}


const logout=(token)=>{
    localStorage.removeItem("JWT")
    localStorage.removeItem("INICIALES USUARIO")
    localStorage.removeItem("ROL DEL USUARIO")
    localStorage.removeItem("email")
    setIsLoggedIn(false)
}


return(
    <AuthContext.Provider value={{isLoggedIn , login , logout, authenticate}}>
        {children}
    </AuthContext.Provider>
)

}

export default AuthContext;
