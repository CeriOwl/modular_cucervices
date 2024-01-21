import { createContext, useContext, useEffect, useState } from "react";
import {registerUser, login, verifyTokenRequest} from "../api/auth.js"
import Cookies from "js-cookie"

export const AuthContext = createContext()
export const useAuth = () => {
    const context = useContext(AuthContext)
    if(!context) {
        throw new Error("Contexto erroneo")
    }
    return context
}

export const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null)
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const [errorsSign, setErrorsSign] = useState([])
    const [errorsSignIn, setErrorsSignIn] = useState([])

    const signUp = async (user) => {
        try {
            const res = await registerUser(user)
            setUser(res.data)
            setIsAuthenticated(true)
        }catch(error) {
            console.log(error)
            setErrorsSign(await error.response.data.error)
        }
    }

    const signIn = async (user) => {
        try {
            const res = await login(user)
            setUser(res.data)
            setIsAuthenticated(true)
        }catch(error) {
            console.log(error)
            setErrorsSignIn(error.response.data.error)
        }
    }

    useEffect(() => {
        async function checkLogin() {
            const cookies = Cookies.get()
            if(cookies.token) {
                try {
                    const res = await verifyTokenRequest(cookies.token)
                    if(!res.data) setIsAuthenticated(false)
    
                    setIsAuthenticated(true)
                    setUser(res.data)
                } catch (error) {
                    setIsAuthenticated(false)
                    setUser(null)
                }
            }
        }
        checkLogin()
    }, [])

    return (
        <AuthContext.Provider value={{
            signUp,
            signIn,
            user,
            isAuthenticated,
            errorsSign,
            errorsSignIn
        }}>
            {children}
        </AuthContext.Provider>
    )
}