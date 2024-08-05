import { createBrowserRouter } from "react-router-dom";
import Home from "../components/Home";
import Login from "../components/Authentication/Login";
import Layout from "./Layout";

const Router = createBrowserRouter([
    {
        element: <Layout />,
        children: [
            {
                index: true,
                element: <Home />,
            },
            {
                path: "login",
                element: <Login />,
            }
        ],
    },
    {
        path: "*",
        element: <h1>Not Found</h1>,
    },
]);

export { Router };
