// external dependencies
import { AppBar, Divider, IconButton, Toolbar, Typography } from "@mui/material";

// icon dependencies
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

function CustomAppBar() {
    return (
        <AppBar>
            <Toolbar>
                <Typography>
                    Learn It Now
                </Typography>

                <Divider/>

                <IconButton>
                    <AccountCircleIcon />
                </IconButton>
            </Toolbar>
        </AppBar>
    )
}

export default CustomAppBar;