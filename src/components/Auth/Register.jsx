import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { BsInfoCircle } from 'react-icons/bs';
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { toast, ToastContainer } from 'react-toastify';
import logo from "../../assets/logo.png";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import useAxiosPublic from '../ui/hooks/useAxiosPublic/useAxiosPublic';
import useAuth from '../ui/hooks/useAuth/useAuth';
import Loader from '../Loader/Loader';

const Register = () => {
    const { loading, setRender, render, setLoading, registerUser } = useAuth();
    const AxiosPublic = useAxiosPublic();
    const navigate = useNavigate();
    const [passwordVisible, setPasswordVisible] = useState(false);
    const { register, handleSubmit, formState: { errors }, reset } = useForm();

    const togglePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible);
    };

    const onSubmit = async (data) => {
        const { name, pin, mobileNumber, email, role, photoURL } = data;

        const userInfo = {
            role,
            name,
            photoURL,
            pin,
            mobileNumber,
            email,
            status: 'pending'
        };

        try {
            const response = await AxiosPublic.post('/register', userInfo, {
                withCredentials: true
            });
            if (response?.status == 201) {
                registerUser(userInfo)
                toast.success(response.data.message, { autoClose: 2000 });
                setRender(!render);
                localStorage.setItem('access-token', response.data.token);
                setTimeout(() => {
                    navigate('/dashboard');
                }, 3000);
                setLoading(false);
            }
        } catch (error) {
            toast.error(error.response.data.error || 'Registration failed', { autoClose: 2000 });
            reset();
        }
    };

    if (loading) {
        <Loader></Loader>
    }
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-customBlue via-blue-800 to-customBlue p-4">
            <Card className="mx-auto max-w-xl">
                <CardHeader className="text-center">
                    <div className="flex justify-center mb-4">
                        <img src={logo} alt="Logo" className="w-fit h-24" />
                    </div>
                    <CardTitle className="text-2xl text-customBlue">Register to BB-Money</CardTitle>
                    <CardDescription className="text-balance">
                        Sign up with your basic information and get started with a welcome bonus. Our secure login system ensures that your data is always protected.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                        <div className="grid gap-2 form-control mb-2 mt-2">
                            <Label htmlFor="name">Name</Label>
                            <Input
                                id="name"
                                type="text"
                                {...register("name", { required: "Please input your name" })}
                                placeholder="Your full name"
                                required
                                className={`w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-customBlue ${errors.name ? 'border-red-500' : ''}`}
                            />
                            {errors.name && (
                                <span className="text-customRed text-sm mt-1 items-center flex">
                                    <BsInfoCircle className="mr-1 font-bold" />
                                    {errors.name.message}
                                </span>
                            )}
                        </div>
                        <div className="grid gap-2 form-control mb-2 mt-4">
                            <Label htmlFor="photoURL">Photo URL</Label>
                            <Input
                                id="photoURL"
                                type="text"
                                {...register("photoURL", {
                                    required: "Please input your photo URL",
                                    pattern: {
                                        value: /\.(jpeg|jpg|png)$/i,
                                        message: "Invalid photo URL format"
                                    }
                                })}
                                placeholder="https://example.com/photo.jpg"
                                required
                                className={`w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-customBlue ${errors.photoURL ? 'border-red-500' : ''}`}
                            />
                            {errors.photoURL && (
                                <span className="text-customRed text-sm mt-1 items-center flex">
                                    <BsInfoCircle className="mr-1 font-bold" />
                                    {errors.photoURL.message}
                                </span>
                            )}
                        </div>
                        <div className="grid gap-2 form-control relative mb-2 mt-4">
                            <Label htmlFor="pin">PIN</Label>
                            <Input
                                id="pin"
                                type={passwordVisible ? 'text' : 'password'}
                                {...register("pin", {
                                    required: "PIN is required",
                                    pattern: {
                                        value: /^\d{5}$/,
                                        message: "PIN must be a 5-digit number"
                                    }
                                })}
                                placeholder="5-digit PIN"
                                maxLength="5"
                                required
                                className={`w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm
                                focus:outline-none focus:ring-2 focus:ring-customBlue ${errors.pin ? 'border-red-500' : ''}`}
                            />
                            <button
                                type="button"
                                className="absolute inset-y-0 top-6 right-0 items-center px-3"
                                onClick={togglePasswordVisibility}
                            >
                                {passwordVisible ? <AiOutlineEye size={20} /> : <AiOutlineEyeInvisible size={20} />}
                            </button>

                        </div>
                        {errors?.pin && (
                            <span className="text-customRed text-sm mt-1 items-center flex">
                                <BsInfoCircle className="mr-1 font-bold" />
                                {errors.pin.message}
                            </span>
                        )}
                        <div className="grid gap-2 form-control mb-2 mt-4">
                            <Label htmlFor="mobileNumber">Mobile Number</Label>
                            <Input
                                id="mobileNumber"
                                type="text"
                                {...register("mobileNumber", {
                                    required: "Mobile number is required",
                                    // pattern start with 01 and total 11 digit
                                    pattern: {
                                        value: /^01[0-9]{9}$/,
                                        message: "Invalid mobile number format"
                                    }
                                })}
                                placeholder="01700011122"
                                required
                                maxLength="11"
                                className={`w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-customBlue ${errors.mobileNumber ? 'border-red-500' : ''}`}
                            />
                            {errors.mobileNumber && (
                                <span className="text-customRed text-sm mt-1 items-center flex">
                                    <BsInfoCircle className="mr-1 font-bold" />
                                    {errors.mobileNumber.message}
                                </span>
                            )}
                        </div>
                        <div className="grid gap-2 form-control mb-2 mt-4">
                            <Label htmlFor="email">Email</Label>
                            <Input
                                id="email"
                                type="email"
                                {...register("email", {
                                    required: "Please enter your email",
                                    pattern: {
                                        value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/,
                                        message: "Invalid email format"
                                    }
                                })}
                                placeholder="mail@example.com"
                                required
                                className={`w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-customBlue ${errors.email ? 'border-red-500' : ''}`}
                            />
                            {errors.email && (
                                <span className="text-customRed text-sm mt-1 items-center flex">
                                    <BsInfoCircle className="mr-1 font-bold" />
                                    {errors.email.message}
                                </span>
                            )}
                        </div>
                        {/* select user role between,  1.user , 2.agent 3.admin */}
                        <div className="grid gap-2 form-control mb-2 mt-4">
                            <Label htmlFor="role">Role</Label>
                            <select
                                id="role"
                                {...register("role", { required: "Please select a role" })}
                                className={`w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-customBlue ${errors.role ? 'border-red-500' : ''}`}
                            >
                                <option value="">Select a role</option>
                                <option value="user">User</option>
                                <option value="agent">Agent</option>
                                <option value="admin">Admin</option>
                            </select>
                            {errors.role && (
                                <span className="text-customRed text-sm mt-1 items-center flex">
                                    <BsInfoCircle className="mr-1 font-bold" />
                                    {errors.role.message}
                                </span>
                            )}
                        </div>
                        <Button type="submit" className="w-full form-control mt-6 bg-customBlue hover:bg-customRed">
                            Register
                        </Button>
                        {/* login redirect */}
                        <div className="text-center">
                            <p className="text-sm text-gray-600">Already have an account? <Link to="/login" className="text-customBlue font-semibold hover:underline">Login</Link></p>
                        </div>
                    </form>
                </CardContent>
            </Card>
            <ToastContainer />
        </div>
    );
};

export default Register;
