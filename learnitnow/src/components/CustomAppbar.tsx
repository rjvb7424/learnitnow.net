import { AppBar, Button, Toolbar, Typography, Box, IconButton, Menu, MenuItem, Divider, Avatar } from "@mui/material";
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from "react";

// Firebase
import { auth, provider, signInWithPopup, signOut } from "../FirebaseConfig.ts";

// Icons
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

// Default Google profile placeholder
const DEFAULT_PROFILE_IMAGE = "https://www.gstatic.com/images/branding/product/1x/avatar_circle_blue_512dp.png";

function CustomAppBar() {
    const navigate = useNavigate();
    const [user, setUser] = useState<null | typeof auth.currentUser>(null);
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(async (u) => {
            if (u) {
                await u.reload(); // Refresh photoURL
                setUser(auth.currentUser);
            } else {
                setUser(null);
            }
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
            handleMenuClose();
        } catch (err) {
            console.error("Sign out error:", err);
        }
    };

    const handleMenuOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
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
                        <>
                            {/* Signed in: Show avatar */}
                            <IconButton onClick={handleMenuOpen} sx={{ p: 0 }}>
                                <Avatar
                                    src={user.photoURL || DEFAULT_PROFILE_IMAGE}
                                    alt={user.displayName || "Profile"}
                                    sx={{ width: 40, height: 40 }}
                                />
                            </IconButton>
                            <Menu
                                anchorEl={anchorEl}
                                open={Boolean(anchorEl)}
                                onClose={handleMenuClose}
                                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                                transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                            >
                                <Box sx={{ px: 2, py: 1 }}>
                                    <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
                                        {user.displayName || "No Name"}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        {user.email || "No Email"}
                                    </Typography>
                                </Box>
                                <Divider />
                                <MenuItem onClick={handleSignOut}>Sign out</MenuItem>
                            </Menu>
                        </>
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
                            onClick={handleSignIn}
                        >
                            Sign in
                        </Button>
                    )}
                </Box>
            </Toolbar>
        </AppBar>
    );
}

export default CustomAppBar;
