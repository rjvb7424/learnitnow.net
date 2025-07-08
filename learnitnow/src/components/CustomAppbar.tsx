import { AppBar, Button, Toolbar, Typography, Box } from "@mui/material";
import { useNavigate } from 'react-router-dom';

function CustomAppBar() {
    const navigate = useNavigate();

    return (
        <AppBar sx={{ backgroundColor: "transparent", boxShadow: "none" }}>
            <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
                
                {/* Left side */}
                <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                    <Typography variant="h6" color="primary">
                        Learn It Now
                    </Typography>
                    <Button variant="contained" color="primary" onClick={() => navigate('/')}>
                        Courses
                    </Button>
                </Box>

                {/* Right side */}
                <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                    <Button variant="contained" color="primary" onClick={() => navigate('/create')}>
                        Create
                    </Button>
                    <Button variant="contained" color="primary">
                        Get Started!
                    </Button>
                </Box>
            </Toolbar>
        </AppBar>
    );
}

export default CustomAppBar;
