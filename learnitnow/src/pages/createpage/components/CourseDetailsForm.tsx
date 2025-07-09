// external dependencies
import { TextField, Typography, Box, Paper } from "@mui/material";

// internal dependencies
import ThumbnailUploader from "./ThumbnailUploader";

// props type definition for CourseDetailsForm component
type Props = {
    title: string;
    setTitle: (title: string) => void;
    description: string;
    setDescription: (description: string) => void;
    thumbnail: string | null;
    setThumbnail: (thumbnail: string | null) => void;
};

// CourseDetailsForm component
// This component allows users to input basic course information
const CourseDetailsForm: React.FC<Props> = ({ title, setTitle, description, 
    setDescription, thumbnail, setThumbnail, }) => {
    return (
        <Box>
            {/* Paper component for course details form */}
            <Paper elevation={3} sx={{ p: 2, borderRadius: 2, mb: 3 }}>
                <Typography variant="h5" sx={{ fontWeight: "bold", mb: 1 }}>
                    Course Details
                </Typography>
                <Typography variant="body2" sx={{ mb: 2 }}>
                    Provide essential information about your course.
                </Typography>
                {/* Thumbnail uploader component */}
                <ThumbnailUploader thumbnail={thumbnail} setThumbnail={setThumbnail} />
                {/* TextField for course title */}
                <TextField
                    variant="outlined"
                    fullWidth
                    label="Course Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value.slice(0, 50))}
                    helperText={`${title.length}/50 characters`}
                    sx={{ mb: 2 }}/>
                {/* TextField for course description */}
                <TextField
                    variant="outlined"
                    fullWidth
                    multiline
                    rows={3}
                    label="Course Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value.slice(0, 200))}
                    helperText={`${description.length}/200 characters`}/>
            </Paper>
        </Box>
    );
};

export default CourseDetailsForm;
