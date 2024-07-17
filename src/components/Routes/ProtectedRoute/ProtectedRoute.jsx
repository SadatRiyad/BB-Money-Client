/* eslint-disable react/prop-types */
import useAuth from "@/components/ui/hooks/useAuth/useAuth";
import { Navigate, useLocation } from "react-router-dom";

const PrivateRoute = ({ children }) => {
    const { user, loading } = useAuth();
    const location = useLocation();

    if (loading) {
        return (
            <div className="flex w-full items-center justify-center h-screen">Loading...</div>
        );
    }
    if (user) {
        return children;
    }
    return <Navigate to="/login" state={{ from: location.pathname || "/" }} />;
};

export default PrivateRoute;