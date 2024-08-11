import { useState, useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";

// Hook que obtiene los datos del perfil del usuario autenticado
const useUserProfile = () => {
    const authState = useAuth("state");
    const [userData, setUserData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (authState && authState.token) { // Verifica si authState está disponible y tiene un token.
            fetch(`${import.meta.env.VITE_API_BASE_URL}users/profiles/profile_data/`, {
                method: "GET",
                headers: {
                    Authorization: `Token ${authState.token}`,
                },
            })
                .then(response => {
                    if (!response.ok) {
                        throw new Error("Error al obtener los datos del usuario");
                    }
                    return response.json();
                })
                .then(data => {
                    setUserData(data);
                    setIsLoading(false);
                })
                .catch(err => {
                    setError(err.message);
                    setIsLoading(false);
                });
        } else {
            setIsLoading(false);
        }
    }, [authState]);

    return { userData, isLoading, error };
};

export default useUserProfile;
