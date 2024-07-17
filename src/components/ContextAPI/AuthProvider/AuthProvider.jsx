/* eslint-disable no-unused-vars */
import { createContext, useEffect, useState } from "react";
import Loader from "@/components/Loader/Loader";
import useAxiosPublic from "@/components/ui/hooks/useAxiosPublic/useAxiosPublic";

// export the AuthContext so that other components can use it
export const AuthContext = createContext(null);


const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [render, setRender] = useState(false);
    const [loggedIn, setLoggedIn] = useState(false);
    const AxiosPublic = useAxiosPublic();

    // loading 
    if (loading) {
        <Loader></Loader>
    }

    // register new user
    const registerUser = (userInfo) => {
        setLoggedIn(true);
        setLoading(true);
        setUser(userInfo)
        setRender(!render);
        return user;
    }

    const logout = () => {
        setUser(null);
        setLoggedIn(false);
        setRender(!render);
        localStorage.removeItem('access-token');
        document.cookie = `token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
        return logout
    };

    useEffect(() => {
        const checkAuth = async () => {
            const token = localStorage.getItem("access-token");
            if (token) {
                try {
                    const response = await AxiosPublic.get("/me", {
                        headers: {
                            Authorization: `Bearer ${token}`,
                            withCredentials: true,
                        },
                    });
                    console.log(response)
                    setUser(response.data.user);
                } catch (error) {
                    console.error("Failed to verify token", error);
                    localStorage.removeItem("access-token");
                }
            }
            setLoading(false);
        };

        checkAuth();
    }, [AxiosPublic]);
    useEffect(() => { if (user) { setLoggedIn(true) } else { setLoggedIn(false) } }, [user]);


    // value to be provided to the children components in the AuthContext
    const authInfo = {
        user,
        setUser,
        setRender,
        render,
        logout,
        loading,
        setLoading,
        loggedIn,
        setLoggedIn,
        registerUser,
    }
    // console.log(authInfo)

    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;