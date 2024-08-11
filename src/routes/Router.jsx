import { createBrowserRouter } from "react-router-dom";
import Login from "../components/Authentication/Login";
import Songs from "../components/Songs/Songs";
import Albums from "../components/Albums/Albums";
import Artists from "../components/Artists/Artists";
import Profile from "../components/Profile";
import ProtectedRoute from "./ProtectedRoute";
import NotFound from "../components/NotFound";
import Layout from "./Layout";

// Router principal de la aplicación donde se encuentran las diferentes rutas que contiene la app
const Router = createBrowserRouter([
    {
        element: <Layout />,
        children: [
            {
                index: true,
                element: <Songs />,
            },
            {
                path: "login",
                element: <Login />,
            },
            {
                path: "/albums",
                element: <Albums />,
            },
            {
                path: "/artists",
                element: <Artists />,
            },
            {
                path: "profile",
                element: (
                    <ProtectedRoute> 
                        <Profile />
                    </ProtectedRoute>), // Solo se asigna la ruta protegida al perfil
            }
        ],
    },
    {
        path: "*", // Comodin que abarca todas las rutas no declaradas
        element: <NotFound />,
    },
]);

export { Router };
