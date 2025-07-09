import { Box, Typography, IconButton } from "@mui/material";
import TwitterIcon from "@mui/icons-material/Twitter";
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";

const Footer = () => {
    return (
        <Box
            component="footer"
            sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                px: 3,
                py: 2,
                borderTop: "1px solid #ddd",
                gap: 1,
            }}
        >
            {/* Logo and App Name */}
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                    Learn It Now
                </Typography>
            </Box>

            {/* Copyright */}
            {/* Not real yet also has to be future implimentation */}
            <Typography variant="body2" sx={{ textAlign: "center", flex: 1 }}>
                © {new Date().getFullYear()} Learn It Now. All rights reserved.
            </Typography>

            {/* Social Icons */}
            {/* Does not yet redirect to the real socials, future implimentation */}
            <Box sx={{ display: "flex", gap: 1 }}>
                <IconButton
                    component="a"
                    href="https://twitter.com"
                    target="_blank"
                    rel="noopener"
                    aria-label="Twitter">
                    <TwitterIcon />
                </IconButton>
                <IconButton
                    component="a"
                    href="https://github.com"
                    target="_blank"
                    rel="noopener"
                    aria-label="GitHub">
                    <GitHubIcon />
                </IconButton>
                <IconButton
                    component="a"
                    href="https://linkedin.com"
                    target="_blank"
                    rel="noopener"
                    aria-label="LinkedIn">
                    <LinkedInIcon />
                </IconButton>
            </Box>
        </Box>
    );
};

export default Footer;
