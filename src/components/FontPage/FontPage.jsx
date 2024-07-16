import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from "../../assets/logo.png";
import Loader from '../Loader/Loader';

const FontPage = () => {
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false);
            navigate('/login');
        }, 7000);

        return () => clearTimeout(timer);
    }, [navigate]);

    return loading ? (
        <Loader />
    ) : (
        <div className="bg-customGulabi border-2 border-customBlue h-dvh">
            <div className="justify-center items-center text-center">
                <h1 className="text-center text-5xl text-white pt-16 font-bold">Welcome to BB-Money</h1>
                <h1 className="text-center text-xl text-white pt-2">Save, spend, invest, and borrow</h1>
                <h1 className="text-center text-xl text-white pt-1">All in one place</h1>
                <h1 className="text-center text-xl text-white pt-1">Join us today</h1>
                <h1 className="text-center text-xl text-white pt-1">And start your journey to financial freedom</h1>
                <h1 className="text-center text-xl text-white pt-1">With BB-Money!</h1>
                <h1 className="text-center text-xl text-white pt-1">Your money, your way...</h1>
                <div className="justify-center items-center flex text-center">
                    <img src={logo} className="w-fit h-24 animate-bounce" alt="logo" />
                </div>
            </div>
        </div>
    );
};

export default FontPage;
