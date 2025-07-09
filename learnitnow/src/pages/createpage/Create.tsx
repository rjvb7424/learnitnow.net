// external dependencies
import { useState } from "react";
import { Typography, Box, TextField, Button, MenuItem, Paper, Container, Toolbar, Menu, } from "@mui/material";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

// internal dependencies
import CustomAppBar from "../../components/CustomAppbar";
import LessonCard from "./components/LessonCard";
import type { Lesson } from "./LessonType";
import Footer from "../../components/Footer";

// Create page component
// This page allows users to create a new course by providing details and adding lessons
const Create = () => {
    // State for course details
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    // State list for lessons
    const [lessons, setLessons] = useState<Lesson[]>([]);
    // State for placeholder index (used for drag-and-drop functionality), 
    // it will be input to the LessonCard component
    const [placeholderIndex, setPlaceholderIndex] = useState<number | null>(null);
    // State for dropdown menu
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const isMenuOpen = Boolean(anchorEl);
    // Function to handle adding a new lesson
    const handleAddLessonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };
    // Once the user selects a lesson type from the dropdown menu,
    // this function will create a new lesson with the selected type
    const handleLessonTypeSelect = (type: Lesson["type"]) => {
        const newLesson: Lesson = {
            id: `lesson-${Date.now()}`,
            type: type,
            title: "",
            content: "",
        };
        // Add the new lesson to the lessons state
        setLessons((prev) => [...prev, newLesson]);
        // Close the dropdown menu
        setAnchorEl(null);
    };
    // Function to close the dropdown menu
    const handleMenuClose = () => {
        setAnchorEl(null);
    };
    // Function to handle deleting a lesson
    const handleDeleteLesson = (id: string) => {
        setLessons((prev) => prev.filter((lesson) => lesson.id !== id));
    };
    // Function to handle changes in lesson fields (title or content)
    const handleLessonChange = (
        id: string,
        field: keyof Omit<Lesson, "id" | "type">,
        value: string
    ) => {
        // Update the specific lesson field based on the id and field type
        // This will update either the title or content of the lesson
        setLessons((prev) =>
            // Map through the lessons and update the specific lesson
            prev.map((lesson) =>
                lesson.id === id ? { ...lesson, [field]: value } : lesson
            )
        );
    };
    // Function to move a lesson from one index to another
    // This is used for drag-and-drop functionality to reorder lessons
    const moveLesson = (dragIndex: number, hoverIndex: number) => {
        const updatedLessons = [...lessons];
        const [movedLesson] = updatedLessons.splice(dragIndex, 1);
        updatedLessons.splice(hoverIndex, 0, movedLesson);
        setLessons(updatedLessons);
    };
    // Disable the publish button if title or description is empty or if there are no lessons,
    // more checks will have to be done in the future.
    const isPublishDisabled =
        title.trim() === "" || description.trim() === "" || lessons.length < 1;

    return (
        <Box>
            <CustomAppBar />
            <Toolbar />
            {/* Main container for the create course page */}
            <Container>
                <Box mb={2}>
                    <Typography variant="h4" sx={{ fontWeight: "bold", mb: 1 }}>
                        Create Your Course!
                    </Typography>
                    <Typography variant="subtitle1">
                        Share your knowledge and expertise with the world.
                    </Typography>
                </Box>
                {/* Course Details */}
                <Paper elevation={3} sx={{ p: 2, borderRadius: 2, mb: 3 }}>
                    <Typography variant="h5" sx={{ fontWeight: "bold", mb: 1 }}>
                        Course Details
                    </Typography>
                    <Typography variant="body2" sx={{ mb: 2 }}>
                        Provide essential information about your course.
                    </Typography>
                    {/* Text fields for course title */}
                    <TextField
                        variant="outlined"
                        fullWidth
                        label="Course Title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value.slice(0, 50))}
                        helperText={`${title.length}/50 characters`}
                        sx={{ mb: 2 }}/>
                    {/* Text fields for course description */}
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

                {/* Lessons */}
                <Paper elevation={3} sx={{ p: 2, borderRadius: 2, mb: 3 }}>
                    <Typography variant="h5" sx={{ fontWeight: "bold", mb: 1 }}>
                        Course Curriculum
                    </Typography>
                    <Typography variant="body2" sx={{ mb: 2 }}>
                        Build your course by adding lessons. Drag and drop to reorder.
                    </Typography>
                    {/* Placeholder for no lessons */}
                    {lessons.length === 0 && (
                        <Box
                            sx={{
                                border: "1px dashed #ccc",
                                p: 3,
                                textAlign: "center",
                                borderRadius: 1,
                                mb: 2,
                            }}>
                            No lessons yet. Start by adding your first lesson!
                        </Box>
                    )}
                    {/* Drag-and-drop provider for lessons */}
                    <DndProvider backend={HTML5Backend}>
                        {/* Reusable LessonCard component for each lesson */}
                        {lessons.map((lesson, index) => (
                            <LessonCard
                                key={lesson.id}
                                lesson={lesson}
                                index={index}
                                moveLesson={moveLesson}
                                deleteLesson={handleDeleteLesson}
                                handleLessonChange={handleLessonChange}
                                placeholderIndex={placeholderIndex}
                                setPlaceholderIndex={setPlaceholderIndex}/>
                        ))}
                    </DndProvider>
                    {/* Button to add a new lesson */}
                    <Box sx={{ display: "flex", }}>
                        <Button
                            variant="contained"
                            size="large"
                            onClick={handleAddLessonClick}
                            fullWidth>
                            Add Lesson
                        </Button>
                        {/* Dropdown menu for selecting lesson type */}
                        <Menu
                            anchorEl={anchorEl}
                            open={isMenuOpen}
                            onClose={handleMenuClose}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'center',
                            }}
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'center',
                            }}
                            slotProps={{
                                paper: {
                                    sx: { width: '40%', },
                                },
                            }}>
                            <MenuItem onClick={() => handleLessonTypeSelect("Paragraph")}>
                                Paragraph
                            </MenuItem>
                        </Menu>
                    </Box>
                </Paper>
                {/* Publish Button */}
                <Button
                    variant="contained"
                    size="large"
                    fullWidth
                    sx={{
                        borderRadius: 2,
                        fontWeight: "bold",
                    }}
                    disabled={isPublishDisabled}
                    onClick={() => {
                        console.log("Publishing course:", {
                            title,
                            description,
                            lessons,
                        });
                    }}>
                    Publish Course
                </Button>
            </Container>
            <Toolbar />
            <Footer />
        </Box>
    );
};

export default Create;
