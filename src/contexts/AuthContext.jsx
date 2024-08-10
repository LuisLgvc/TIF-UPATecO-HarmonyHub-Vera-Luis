import { createContext, useReducer, useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import CryptoJS from "crypto-js";

const AuthContext = createContext();

const ACTIONS = {
    LOGIN: "LOGIN",
    LOGOUT: "LOGOUT",
};

function reducer(state, action) {
    switch (action.type) {
        case ACTIONS.LOGIN:
            return {
                ...state,
                user__id: action.payload.user__id,
                token: action.payload.token,
                isAuthenticated: true,
            };
        case ACTIONS.LOGOUT:
            return {
                ...state,
                token: null,
                user__id: null,
                isAuthenticated: false,
            };
        default:
            return state;
    }
}

function AuthProvider({ children }) {
    const [state, dispatch] = useReducer(reducer, {
        user__id: localStorage.getItem("user__id"),
        token: decrypt(localStorage.getItem("Token")),
        isAuthenticated: localStorage.getItem("Token") ? true : false,
    });
    const navigate = useNavigate();

    const actions = {
        login: (token, user__id) => {
            const encryptedToken = encrypt(token);
            
            dispatch({
                type: ACTIONS.LOGIN,
                payload: { token, user__id },
            });

            localStorage.setItem("Token", encryptedToken);
            localStorage.setItem("user__id", user__id);
            
            navigate("/");
        },
        logout: () => {
            dispatch({ type: ACTIONS.LOGOUT });
            localStorage.removeItem("Token");
            localStorage.removeItem("user__id");
            navigate("/");
        },
    };

    return (
        <AuthContext.Provider value={{ state, actions }}>
            {children}
        </AuthContext.Provider>
    );
}

function useAuth(type) {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context[type];
}

function encrypt(param) {
    const secretKey = import.meta.env.SECRET_KEY || "default_secret_key";
    return CryptoJS.AES.encrypt(param, secretKey).toString();
}

function decrypt(param) {
    if (!param) return null;
    const secretKey = import.meta.env.SECRET_KEY || "default_secret_key";
    const bytes = CryptoJS.AES.decrypt(param, secretKey);
    return bytes.toString(CryptoJS.enc.Utf8);
}

export { AuthContext, AuthProvider, useAuth };
