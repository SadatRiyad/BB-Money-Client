import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import logo from "../../assets/logo.png";

const Login = () => {
  const [identifier, setIdentifier] = useState('');
  const [pin, setPin] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    // console.log(identifier, pin)
    try {
      const response = await axios.post('/api/auth/login', { identifier, pin });
      localStorage.setItem('token', response.data.token);
      toast.success('Login successful');
      navigate('/dashboard');
    } catch (error) {
      toast.error(error.response.data.error);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <div className="flex justify-center mb-4">
          <img src={logo} alt="Logo" className="w-fit h-24" />
        </div>
        <h1 className="text-2xl font-bold text-center mb-6">Welcome Back!</h1>
        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label htmlFor="identifier" className="block text-sm font-medium text-gray-700">Mobile Number or Email</label>
            <input
              id="identifier"
              type="text"
              placeholder="Mobile Number or Email"
              value={identifier}
              onChange={(e) => setIdentifier(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-customBlue"
            />
          </div>
          <div>
            <label htmlFor="pin" className="block text-sm font-medium text-gray-700">PIN</label>
            <input
              id="pin"
              type="password"
              placeholder="PIN"
              value={pin}
              onChange={(e) => setPin(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-customBlue"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-customBlue text-white py-2 rounded-lg hover:bg-customBlue-dark focus:outline-none focus:ring-2 focus:ring-customBlue-dark transition duration-150"
          >
            Login
          </button>
        </form>
        <div className="mt-4 text-center">
          <p className="text-sm text-gray-600">Don&apos;t have an account? <a href="/signup" className="text-customBlue hover:underline">Sign Up</a></p>
        </div>
      </div>
    </div>
  );
};

export default Login;
