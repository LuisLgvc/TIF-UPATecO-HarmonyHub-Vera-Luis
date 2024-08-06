import { Outlet, useLocation } from "react-router-dom";
import { AuthProvider } from "../contexts/AuthContext";
import Navbar from "../components/Navbar";

export default function Layout() {
    const location = useLocation();
    const hideNavbar = location.pathname === '/login';

    return (
        <AuthProvider>
            <div>
                {!hideNavbar && <Navbar />}
                <Outlet />
            </div>
        </AuthProvider>
    );
}