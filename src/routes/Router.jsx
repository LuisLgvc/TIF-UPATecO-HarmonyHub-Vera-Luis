import { createBrowserRouter } from "react-router-dom";
import Home from "../components/Home";
import Login from "../components/Authentication/Login";
import Songs from "../components/Songs/Songs";
import Profile from "../components/Profile";
import ProtectedRoute from "./ProtectedRoute";	
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
        element: <h1>Not Found</h1>,
    },
]);

export { Router };
