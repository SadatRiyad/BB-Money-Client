import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import logo from "../../assets/logo.png";
import useAxiosPublic from '../ui/hooks/useAxiosPublic/useAxiosPublic';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import useAuth from '../ui/hooks/useAuth/useAuth';
import Loader from '../Loader/Loader';

const Login = () => {
    const { loading, setUser, setLoading, setRender, render } = useAuth();
    const AxiosPublic = useAxiosPublic();
    const [identifier, setIdentifier] = useState('');
    const [pin, setPin] = useState('');
    const navigate = useNavigate();
    const [passwordVisible, setPasswordVisible] = useState(false);

    const togglePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible);
    };

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const response = await AxiosPublic.post('/login', { identifier, pin }, { withCredentials: true });
            if (response) {
                localStorage.setItem('access-token', response?.data?.token);
                document.cookie = `token=${response.data.token}`;
                setUser(response?.data?.user);
                toast.success('Login successful', { autoClose: 2000 });
                setLoading(false);
                setRender(!render); 
                requestAnimationFrame(() => {
                    setTimeout(() => {
                        navigate('/dashboard');
                    }, 3000);
                });
            }
        } catch (error) {
            toast.error("Invalid login credentials. Please check your email and password.", { type: "error", autoClose: 2000 })
        }
    };

    if (loading) {
        return <Loader />;
    }

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-customBlue px-2">
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
                <div className="flex justify-center mb-4">
                    <img src={logo} alt="Logo" className="w-fit h-24" />
                </div>
                <h1 className="text-2xl font-bold text-center mb-1">Welcome Back!</h1>
                <p className="text-center text-gray-600 mb-8">Login to your account to continue</p>
                <form onSubmit={handleLogin} className="space-y-6">
                    <div className="grid gap-2 form-control mb-2 mt-2">
                        <Label htmlFor="identifier">Mobile Number or Email</Label>
                        <Input
                            id="identifier"
                            type="text"
                            placeholder="Mobile Number or Email"
                            value={identifier}
                            onChange={(e) => setIdentifier(e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-customBlue"
                            autoComplete="username"
                        />
                    </div>
                    <div className="grid gap-2 relative form-control mb-2 mt-2">
                        <Label htmlFor="pin">PIN</Label>
                        <Input
                            id="pin"
                            type={passwordVisible ? 'text' : 'password'}
                            placeholder="YOUR PIN"
                            value={pin}
                            maxLength="5"
                            onChange={(e) => setPin(e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-customBlue"
                            autoComplete="current-password"
                        />
                        <button
                            type="button"
                            className="absolute inset-y-0 top-6 right-0 items-center px-3"
                            onClick={togglePasswordVisibility}
                        >
                            {passwordVisible ? <AiOutlineEye size={20} /> : <AiOutlineEyeInvisible size={20} />}
                        </button>
                    </div>
                    <Button type="submit" className="w-full form-control mt-6 bg-customBlue hover:bg-customRed">
                        Login
                    </Button>
                </form>
                <div className="mt-4 text-center">
                    <p className="text-sm text-gray-600">Don&apos;t have an account? <Link to="/register" className="text-customBlue font-semibold hover:underline">Sign Up</Link></p>
                </div>
            </div>
            <ToastContainer />
        </div>
    );
};

export default Login;
