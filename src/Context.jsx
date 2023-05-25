import React, {createContext, useEffect, useState} from "react"
import {useNavigate} from "react-router-dom";
import jwt_decode from "jwt-decode";

export const CustomContext = createContext();

export const Context = (props) => {

    const navigate = useNavigate();

    const [user, setUser] = useState({
        token: ''
    });

    const [isLogged, setIsLogged] = useState(false);

    const [role, setRole] = useState('')

    const grantRole = (user) => {
        if (user.token) {
            const decoded = jwt_decode(user.token);
            setRole(decoded.role)
        }
    }

    const logOutUser = () => {
        if (window.confirm('Logout?')) {
            localStorage.removeItem('user');
            setUser({
                token: ''
            })
            setRole('')
            setIsLogged(false)
            navigate("/")
        } else {
            return ''
        }

    };

    useEffect(() => {
        if (localStorage.getItem('user') !== null) {
            setUser(JSON.parse(localStorage.getItem('user')))
            grantRole(JSON.parse(localStorage.getItem('user')))
            setIsLogged(true)
        }
    }, []);


    const value = {
        user,
        role,
        grantRole,
        setUser,
        logOutUser,
        isLogged,
        setIsLogged
    };

    return <CustomContext.Provider value={value}>
        {props.children}
    </CustomContext.Provider>
}