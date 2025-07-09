// external dependencies
import { Card, Typography, CardMedia, CardContent, CardActions, Button, Box, Chip } from "@mui/material";

// icon dependencies
import PeopleIcon from '@mui/icons-material/People';
import { Favorite } from "@mui/icons-material";

function CourseCard() {
    return (
        <Card sx={{ maxWidth: 345, borderRadius: 2, }}>

            {/* Course Thumbnail */}
            <CardMedia
                image="https://via.placeholder.com/600x400"
                sx={{
                    // Aspect ratio for the thumbnail
                    aspectRatio: "16 / 9",
                }}/>

            <CardContent sx={{ p: 2 }}>
                {/* Category Tag and Rating */}
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                    <Chip label="Coding Tutorial" color="primary"/>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Favorite sx={{ color: 'red', fontSize: 20, mr: 0.5 }} />
                        <Typography variant="body2">
                            1,234
                        </Typography>
                    </Box>
                </Box>

                {/* Title */}
                <Typography gutterBottom variant="h6" component="div" fontWeight={600}>
                    Introduction to Web Development
                </Typography>

                {/* Creator */}
                <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                    By John Doe
                </Typography>

                {/* Students */}
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <PeopleIcon sx={{ fontSize: 20, mr: 0.5, color: 'text.secondary' }} />
                    <Typography variant="body2" color="text.secondary">
                        5,820 students
                    </Typography>
                </Box>
            </CardContent>

            {/* Price and View Details in same row */}
            <CardActions sx={{ px: 2, pb: 2, pt: 0, justifyContent: 'space-between' }}>
                <Typography variant="h6" color="primary" fontWeight={700}>
                    $49.99
                </Typography>
                <Button variant="contained" color="primary">
                    View Details
                </Button>
            </CardActions>
        </Card>
    );
}

export default CourseCard;
