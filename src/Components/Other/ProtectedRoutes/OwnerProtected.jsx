import { Navigate, useLocation } from "react-router-dom";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";

export default function OwnerProtected({ children }) {
    const location = useLocation();
    const [isValid, setIsValid] = useState(Cookies.get("role") === "owner");

    useEffect(() => {
        const isLoged = Cookies.get("role");
        setIsValid(isLoged === "owner");
    }, [location]);

    if (!isValid) {
        return <Navigate to="/login" replace />;
    }

    return children;
}
