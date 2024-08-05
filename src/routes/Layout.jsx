import { Outlet, useLocation } from "react-router-dom";
import { AuthProvider } from "../contexts/AuthContext";

export default function Layout() {
    const location = useLocation();
    const hideNavbar = location.pathname === '/login';

    return (
        <AuthProvider>
            <div>
                <Outlet />
            </div>
        </AuthProvider>
    );
}
