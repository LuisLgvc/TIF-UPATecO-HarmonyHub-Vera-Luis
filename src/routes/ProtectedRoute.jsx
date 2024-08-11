import { useAuth } from "../contexts/AuthContext";
import { Navigate, useLocation } from "react-router-dom";

// Componente que redirige a la página de inicio de sesión si el usuario no está autenticado
export default function ProtectedRoute({ children }) {
    const { isAuthenticated } = useAuth("state");
    const location = useLocation();

    if (!isAuthenticated) {
        return <Navigate to="/login" state={{ from: location }} />;
    }

    return children;
}