import { Outlet, useLocation } from "react-router-dom";
import { AuthProvider } from "../contexts/AuthContext";
import Navbar from "../components/Navbar";

// Componente que envuelve la aplicación y muestra la barra de navegación y oculta el nav en caso de estar en "/login""
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