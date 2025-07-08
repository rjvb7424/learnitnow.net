import { useState } from "react";
import {
    Typography,
    Box,
    TextField,
    Button,
    MenuItem,
    Paper,
    Container,
    Toolbar,
} from "@mui/material";
import CustomAppBar from "../../components/CustomAppbar";

function Create() {
    // State management for course details
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

    type Module = { type: string; title: string; content: string };
    const [modules, setModules] = useState<Module[]>([]);
    const [newModuleType, setNewModuleType] = useState("Paragraph");

    const handleAddModule = () => {
        setModules([...modules, { type: newModuleType, title: "", content: "" }]);
    };

    const handleModuleChange = (
        index: number,
        field: keyof Module,
        value: string
    ) => {
        const updatedModules = [...modules];
        updatedModules[index][field] = value;
        setModules(updatedModules);
    };

    return (
        <Box>
            {/* Custom AppBar */}
            <CustomAppBar />
            <Toolbar />

            {/* Main Content */}
            <Container>
                {/* Header */}
                <Box>
                    <Typography variant="h4" sx={{ fontWeight: "bold", mb: 1 }}>
                        Create Your Course!
                    </Typography>
                    <Typography variant="subtitle1" sx={{ mb: 2 }}>
                        Share your knowledge and expertise with the world. Start building your course now!
                    </Typography>
                </Box>

                {/* Course Details */}
                <Paper elevation={3} sx={{ p: 2 , borderRadius: 2, mb: 3 }}>
                    <Typography variant="h5" sx={{ fontWeight: "bold", mb: 1 }}>
                        Course Details
                    </Typography>
                    <Typography variant="body2" sx={{ mb: 2 }}>
                        Provide the essential information about your course.
                    </Typography>
                    {/* Course Title */}
                    <TextField
                        variant="outlined"
                        fullWidth
                        label="Course Title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value.slice(0, 50))}
                        helperText={`${title.length}/50 characters`}
                        sx={{ mb: 2 }}
                    />
                    {/* Course Description */}
                    <TextField
                        variant="outlined"
                        fullWidth
                        multiline
                        rows={4}
                        label="Course Description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value.slice(0, 200))}
                        helperText={`${description.length}/200 characters`}
                        sx={{ mb: 1 }}
                    />
                </Paper>

                {/* Course Curriculum */}
                <Paper elevation={3} sx={{ p: 2 , borderRadius: 2, mb: 3 }}>
                    <Typography variant="h5" sx={{ fontWeight: "bold", mb: 1 }}>
                        Course Details
                    </Typography>
                    <Typography variant="body2" sx={{ mb: 2 }}>
                        Provide the essential information about your course.
                    </Typography>

                    {modules.length === 0 && (
                        <Box
                            sx={{
                                border: "1px dashed #ccc",
                                p: 3,
                                textAlign: "center",
                                mb: 3,
                                borderRadius: 1,
                                backgroundColor: "#fff",
                            }}
                        >
                            Your curriculum is empty. Start by adding a lesson.
                        </Box>
                    )}

                    {modules.map((mod, index) => (
                        <Paper
                            key={index}
                            sx={{
                                p: 2,
                                mb: 2,
                                backgroundColor: "#fafafa",
                                borderRadius: 1,
                            }}
                        >
                            <TextField
                                variant="outlined"
                                fullWidth
                                label="Lesson Title"
                                placeholder="Enter lesson title"
                                value={mod.title}
                                onChange={(e) =>
                                    handleModuleChange(
                                        index,
                                        "title",
                                        e.target.value.slice(0, 50)
                                    )
                                }
                                helperText={`${mod.title.length}/50 characters`}
                                sx={{ mb: 2 }}
                            />
                            <TextField
                                variant="outlined"
                                fullWidth
                                multiline
                                rows={3}
                                label="Lesson Content"
                                placeholder="Write the content of your lesson here..."
                                value={mod.content}
                                onChange={(e) =>
                                    handleModuleChange(
                                        index,
                                        "content",
                                        e.target.value.slice(0, 500)
                                    )
                                }
                                helperText={`${mod.content.length}/500 characters`}
                            />
                        </Paper>
                    ))}

                    <Box sx={{ display: "flex", gap: 2, mt: 2 }}>
                        <TextField
                            select
                            label="Content Type"
                            value={newModuleType}
                            onChange={(e) => setNewModuleType(e.target.value)}
                            sx={{ width: 200 }}
                        >
                            <MenuItem value="Paragraph">Paragraph</MenuItem>
                            {/* Future: <MenuItem value="Quiz">Quiz</MenuItem> */}
                        </TextField>
                        <Button variant="contained" onClick={handleAddModule}>
                            ➕ Add Module
                        </Button>
                    </Box>
                </Paper>
            </Container>
        </Box>
    );
}

export default Create;
