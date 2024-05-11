import { useContext, useEffect } from "react";
import { Navigate } from "react-router-dom";

import { AuthContext } from "@/providers";
import { setupToken } from "@/utils";

const HOME_PATH = '/login/admin';

export function Logout() {
    const { setIsLogin, setAccount } = useContext(AuthContext);

    useEffect(() => {
        setIsLogin(false);
        setupToken(null, 'token');
        setAccount({ role: 'admin', profile: null });
    }, []);

    return <Navigate to={HOME_PATH} />;
}