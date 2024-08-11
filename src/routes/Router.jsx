import { createBrowserRouter } from "react-router-dom";
import Login from "../components/Authentication/Login";
import Songs from "../components/Songs/Songs";
import Albums from "../components/Albums/Albums";
import Profile from "../components/Profile";
import ProtectedRoute from "./ProtectedRoute";
import NotFound from "../components/NotFound";
import Layout from "./Layout";

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
                path: "profile",
                element: (
                    <ProtectedRoute>
                        <Profile />
                    </ProtectedRoute>),
            }
        ],
    },
    {
        path: "*",
        element: <NotFound />,
    },
]);

export { Router };
