// external dependencies
import { AppBar, Button, Toolbar, Typography, Box, IconButton, Menu, MenuItem, Divider, Avatar } from "@mui/material";
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from "react";

// internal dependencies
import { auth, provider, signInWithPopup, signOut } from "../FirebaseConfig.ts";

// icon imports
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import AddIcon from '@mui/icons-material/Add';

// Default profile image URL
const DEFAULT_PROFILE_IMAGE = "https://www.gstatic.com/images/branding/product/1x/avatar_circle_blue_512dp.png";

// CustomAppBar component
// This component renders a custom app bar with sign-in/sign-out functionality
function CustomAppBar() {
    const navigate = useNavigate();
    // State to manage user authentication and menu anchor
    const [user, setUser] = useState<null | typeof auth.currentUser>(null);
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    // Effect to listen for authentication state changes
    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(async (u) => {
            // If user is authenticated, reload to get updated photoURL
            if (u) {
                // Reload user to ensure we have the latest data
                await u.reload();
                setUser(auth.currentUser);
            } else {
                // If no user is authenticated, set user to null
                setUser(null);
            }});
        return unsubscribe;
    }, []);
    // Function to handle sign-in with Google
    const handleSignIn = async () => {
        try {
            await signInWithPopup(auth, provider);
        } catch (err) {
            console.error("Sign in error:", err);
        }
    };
    // Function to handle sign-out
    const handleSignOut = async () => {
        try {
            await signOut(auth);
            handleMenuClose();
        } catch (err) {
            console.error("Sign out error:", err);
        }
    };
    // Function to handle opening the user menu
    const handleMenuOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };
    // Function to handle closing the user menu
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
                    {/* Conditional rendering based on user authentication */}
                    {/* Create button for user to create their course */}
                    {user && (
                        <Button
                            variant="contained"
                            startIcon={<AddIcon />}
                            onClick={() => navigate('/create')}
                            sx={{
                                borderRadius: 20,
                                px: 2,
                            }}>
                            Create
                        </Button>
                    )}
                    {user ? (
                        <Box>
                            {/* Signed in: Show avatar */}
                            <IconButton onClick={handleMenuOpen} sx={{ p: 0 }}>
                                <Avatar
                                    src={user.photoURL || DEFAULT_PROFILE_IMAGE}
                                    alt={user.displayName || "Profile"}
                                    sx={{ width: 40, height: 40 }}/>
                            </IconButton>
                            <Menu
                                anchorEl={anchorEl}
                                open={Boolean(anchorEl)}
                                onClose={handleMenuClose}
                                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                                transformOrigin={{ vertical: 'top', horizontal: 'right' }}>
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
                        </Box>
                    ) : (
                        // Not signed in: Show sign in button
                        <Button
                            variant="outlined"
                            startIcon={<AccountCircleIcon />}
                            sx={{
                                borderRadius: 16,
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
