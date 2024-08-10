import { useRef, useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { Box, Button, Container, TextField, Typography } from "@mui/material";
import logo from "../../assets/spotixImg.png";

function Login() {
    const usernameRef = useRef(null);
    const passwordRef = useRef(null);
    const [isError, setIsError] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const { login } = useAuth("actions");

    function handleSubmit(event) {
        event.preventDefault();
        if (!isLoading) {
            setIsLoading(true);
            fetch(`${import.meta.env.VITE_API_BASE_URL}api-auth/`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    username: usernameRef.current.value,
                    password: passwordRef.current.value,
                }),
            })
                .then((response) => {
                    if (!response.ok) {
                        throw new Error("No se pudo iniciar sesión");
                    }
                    return response.json();
                })
                .then((responseData) => {
                    console.log(responseData.token);
                    login(responseData.token);
                    if (responseData.token) {
                        fetch(
                            `${
                                import.meta.env.VITE_API_BASE_URL
                            }users/profiles/profile_data/`,
                            {
                                method: "GET",
                                headers: {
                                    Authorization: `Token ${responseData.token}`,
                                },
                            }
                        )
                            .then((profileResponse) => {
                                console.log(profileResponse);
                                if (!profileResponse.ok) {
                                    throw new Error(
                                        "Error al obtener id de usuario"
                                    );
                                }
                                return profileResponse.json();
                            })
                            .then((profileData) =>
                                login(responseData.token, profileData.user__id)
                            )
                            .catch((error) => {
                                console.error(
                                    "Error al obtener id de usuario",
                                    error
                                );
                                setIsError(true);
                            });
                    }
                })
                .catch((error) => {
                    console.error("Error error al iniciar sesión", error);
                    setIsError(true);
                })
                .finally(() => {
                    setIsLoading(false);
                });
        }
    }

    return (
        <Container
            maxWidth="sm"
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                height: '80vh',
                bgcolor: 'grey.200',
                borderRadius: 2,
                p: 4,
                mt: '10vh',
            }}
        >
            <Box
                component="form"
                onSubmit={handleSubmit}
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    width: '100%',
                }}
            >
                <img src={logo} alt="Logo" style={{ marginBottom: '1rem' }} />
                <Typography variant="h5" component="h1" gutterBottom>
                    Iniciar Sesión
                </Typography>
                <TextField
                    label="Username"
                    inputRef={usernameRef}
                    fullWidth
                    margin="normal"
                    variant="outlined"
                />
                <TextField
                    label="Password"
                    type="password"
                    inputRef={passwordRef}
                    fullWidth
                    margin="normal"
                    variant="outlined"
                />
                {isError && (
                    <Typography color="error" variant="body2">
                        Error al iniciar sesión
                    </Typography>
                )}
                <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    sx={{ backgroundColor: '#1FDF64', '&:hover': { backgroundColor: '#189945' } }}
                    disabled={isLoading}
                >
                    {isLoading ? 'Cargando...' : 'Iniciar Sesión'}
                </Button>
            </Box>
        </Container>
    );
}

export default Login;