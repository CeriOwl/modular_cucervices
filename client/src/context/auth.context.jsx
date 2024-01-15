import { createContext, useContext, useState } from "react";
import {registerUser} from "../api/auth.js"

export const AuthContext = createContext()
export const useAuth = () => {
    const context = useContext(AuthContext)
    if(!context) {
        throw new Error("Contexto erroeo")
    }
    return context
}

export const AuthProvider = ({children}) => {
    const [user,setUser] = useState(null)
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const [errors, setErrors] = useState([])

    const signUp = async (user) => {
        try {
            const res = await registerUser(user)
            setUser(res.data)
            setIsAuthenticated(true)
        }catch(error) {
            setErrors(error.response.data)
        }
    }

    return (
        <AuthContext.Provider value={{
            signUp,
            user,
            isAuthenticated,
            errors
        }}>
            {children}
        </AuthContext.Provider>
    )
}