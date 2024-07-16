import { Outlet, ScrollRestoration } from "react-router-dom";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';


const MainLayout = () => {
    return (
        <>
            <ScrollRestoration />
            <Outlet></Outlet>
            <ToastContainer />
        </>
    );
};

export default MainLayout;