import { Container, Typography, Box, Button, Card, CardContent, CardMedia } from "@mui/material";
import notFoundImg from "../assets/notFoundImg.png";
import useUserProfile from "../hooks/useUserProfile"; // Importa el hook personalizado

function Profile() {
    const { userData, isLoading, error } = useUserProfile(); // Utiliza el hook personalizado

    if (isLoading) return <Typography>Cargando perfil...</Typography>;
    if (error) return <Typography>Error: {error}</Typography>;

    return (
        <Container maxWidth="sm" sx={{ mt: 10, }}>
            {userData ? (
                <Card>
                    <CardContent>
                        <Box display="flex" alignItems="center" mb={2}>
                            {userData.image ? (
                                <CardMedia
                                    component="img"
                                    sx={{ width: 80, height: 80, borderRadius: '50%', mr: 2 }}
                                    image={`${import.meta.env.VITE_API_BASE_URL}${userData.image}`}
                                    alt="Profile Image"
                                />
                            ) : (
                                <CardMedia
                                    component="img"
                                    sx={{ width: 80, height: 80, borderRadius: '50%', mr: 2 }}
                                    image={notFoundImg}
                                    alt="Profile Placeholder"
                                />
                            )}
                            <Typography variant="h5">
                                {userData.first_name} {userData.last_name}
                            </Typography>
                        </Box>
                        <Typography variant="body1">
                            <strong>Username:</strong> {userData.username}
                        </Typography>
                        <Typography variant="body1">
                            <strong>Email:</strong> {userData.email || "No disponible"}
                        </Typography>
                        <Typography variant="body1">
                            <strong>Fecha de Nacimiento:</strong> {userData.dob || "No disponible"}
                        </Typography>
                        <Typography variant="body1">
                            <strong>Biografía:</strong> {userData.bio || "No disponible"}
                        </Typography>
                    </CardContent>
                </Card>
            ) : (
                <Typography>No se encontraron datos del usuario.</Typography>
            )}
        </Container>
    );
}

export default Profile;
