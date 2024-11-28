import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
    const navigate = useNavigate();

    // Vérifie si l'utilisateur est connecté (présence d'un token)
    const isAuthenticated = !!localStorage.getItem('token');

    // Gérer la déconnexion
    const handleLogout = () => {
        localStorage.removeItem('token'); // Supprimer le token
        navigate('/login'); // Rediriger vers la page de connexion
    };

    return (
        <nav style={styles.navbar}>
            <h1 style={styles.title}><Link to="/home" style={styles.link}>
                    MERN E-commerce
                </Link></h1>
            <div style={styles.links}>
                {isAuthenticated ? (
                    <>
                        <Link to="/CreateProduct" style={styles.link}>
                            CreateProduct
                        </Link>
                        <Link to="/profile" style={styles.link}>
                            Profile
                        </Link>

                        {/* Bouton Déconnexion pour les utilisateurs connectés */}
                        <button onClick={handleLogout} style={styles.button}>
                            Se déconnecter
                        </button>
                    </>
                ) : (
                    <>
                        {/* Liens pour se connecter ou s'inscrire */}
                        <Link to="/login" style={styles.link}>
                            Se connecter
                        </Link>
                        <Link to="/register" style={styles.link}>
                            S'inscrire
                        </Link>
                    </>
                )}
            </div>
        </nav>
    );
};

const styles = {
    navbar: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '10px 20px',
        backgroundColor: '#007BFF',
        color: '#fff',
    },
    title: {
        margin: 0,
    },
    links: {
        display: 'flex',
        gap: '15px',
    },
    link: {
        color: '#fff',
        textDecoration: 'none',
        fontSize: '16px',
        fontWeight: 'bold',
    },
    button: {
        backgroundColor: '#FF4136',
        color: '#fff',
        border: 'none',
        padding: '8px 15px',
        borderRadius: '5px',
        fontSize: '16px',
        cursor: 'pointer',
    },
};

export default Navbar;
