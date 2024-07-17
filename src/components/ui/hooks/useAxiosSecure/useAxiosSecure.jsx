import axios from "axios";
import { Navigate } from "react-router-dom";
// import { useNavigate } from "react-router-dom";
// import { useEffect } from "react";
// import useAuth from "../useAuth/useAuth";

const axiosSecure = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    // headers: {
    //     Authorization: `Bearer ${document.cookie.split("=")[1]}`,
    // },
    withCredentials: true,
});

const useAxiosSecure = () => {
    // const navigate = useNavigate();

    // request interceptor to add authorization header for every secure call to teh api
    axiosSecure.interceptors.request.use(function (config) {
        const token = localStorage.getItem('access-token')
        // console.log('request stopped by interceptors', token)
        config.headers.authorization = `Bearer ${token}`;
        return config;
    }, function (error) {
        // Do something with request error
        return Promise.reject(error);
    });


    // intercepts 401 and 403 status
    axiosSecure.interceptors.response.use(function (response) {
        return response;
    }, async (error) => {
        const status = error.response.status;
        // console.log('status error in the interceptor', status);
        // for 401 or 403 logout the user and move the user to the login
        if (status === 401 || status === 403) {
            // await logout();
            // navigate('/login');
            <Navigate to='/login'></Navigate>
        }
        return Promise.reject(error);
    })


    return axiosSecure;
};

export default useAxiosSecure;