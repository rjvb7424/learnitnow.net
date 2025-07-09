import { AppBar, Button, Toolbar, Typography, Box, Avatar } from "@mui/material";
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from "react";

// Firebase
import { auth, provider, signInWithPopup, signOut } from "../FirebaseConfig.ts";

// Icons
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

function CustomAppBar() {
    const navigate = useNavigate();
    const [user, setUser] = useState(auth.currentUser);

    // Listen for auth changes
    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((u) => {
            setUser(u);
        });
        return unsubscribe;
    }, []);

    const handleSignIn = async () => {
        try {
            await signInWithPopup(auth, provider);
        } catch (err) {
            console.error("Sign in error:", err);
        }
    };

    const handleSignOut = async () => {
        try {
            await signOut(auth);
        } catch (err) {
            console.error("Sign out error:", err);
        }
    };

    return (
        <AppBar position="absolute" sx={{ backgroundColor: "transparent", boxShadow: "none" }}>
            <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
                
                {/* Left side */}
                <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                    <Button variant="text" size="large" color="primary" onClick={() => navigate('/')}>
                        <Typography variant="h6" color="black" sx={{ fontWeight: "bold" }}>
                            Learn It Now
                        </Typography>
                    </Button>
                </Box>

                {/* Right side */}
                <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                    <Button variant="contained" color="primary" onClick={() => navigate('/create')}>
                        Create
                    </Button>

                    {user ? (
                        // Signed in: Show avatar + sign out
                        <Button
                            variant="outlined"
                            startIcon={
                                user.photoURL ? (
                                    <Avatar src={user.photoURL} sx={{ width: 24, height: 24 }} />
                                ) : (
                                    <AccountCircleIcon />
                                )
                            }
                            sx={{
                                borderRadius: 16,
                                fontWeight: "bold",
                                color: "black",
                                borderWidth: 2,
                            }}
                            onClick={handleSignOut}>
                            Sign out
                        </Button>
                    ) : (
                        // Not signed in: Show sign in button
                        <Button
                            variant="outlined"
                            startIcon={<AccountCircleIcon />}
                            sx={{
                                borderRadius: 16,
                                fontWeight: "bold",
                                color: "black",
                                borderWidth: 2,
                            }}
                            onClick={handleSignIn}>
                            Sign in
                        </Button>
                    )}
                </Box>
            </Toolbar>
        </AppBar>
    );
}

export default CustomAppBar;
