// external dependencies
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
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

// internal dependencies
import CustomAppBar from "../../components/CustomAppbar";
import LessonCard from "./components/LessonCard";

type Lesson = {
    id: string;
    type: "Paragraph" | "Quiz";
    title: string;
    content: string;
};

const Create = () => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [lessons, setLessons] = useState<Lesson[]>([]);
    const [newLessonType, setNewLessonType] = useState<Lesson["type"]>("Paragraph");
    const [placeholderIndex, setPlaceholderIndex] = useState<number | null>(null);

    const handleAddLesson = () => {
        const newLesson: Lesson = {
            id: `lesson-${Date.now()}`,
            type: newLessonType,
            title: "",
            content: "",
        };
        setLessons((prev) => [...prev, newLesson]);
    };

    const handleDeleteLesson = (id: string) => {
        setLessons((prev) => prev.filter((lesson) => lesson.id !== id));
    };

    const handleLessonChange = (
        id: string,
        field: keyof Omit<Lesson, "id" | "type">,
        value: string
    ) => {
        setLessons((prev) =>
            prev.map((lesson) =>
                lesson.id === id ? { ...lesson, [field]: value } : lesson
            )
        );
    };

    const moveLesson = (dragIndex: number, hoverIndex: number) => {
        const updatedLessons = [...lessons];
        const [movedLesson] = updatedLessons.splice(dragIndex, 1);
        updatedLessons.splice(hoverIndex, 0, movedLesson);
        setLessons(updatedLessons);
    };

    const isPublishDisabled =
        title.trim() === "" || description.trim() === "" || lessons.length < 1;

    return (
        <Box>
            <CustomAppBar />
            <Toolbar />
            <Container>
                <Box mb={3}>
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

                    <TextField
                        variant="outlined"
                        fullWidth
                        label="Course Title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value.slice(0, 50))}
                        helperText={`${title.length}/50 characters`}
                        sx={{ mb: 2 }}
                    />
                    <TextField
                        variant="outlined"
                        fullWidth
                        multiline
                        rows={3}
                        label="Course Description"
                        value={description}
                        onChange={(e) =>
                            setDescription(e.target.value.slice(0, 200))
                        }
                        helperText={`${description.length}/200 characters`}
                    />
                </Paper>

                {/* Lessons */}
                <Paper elevation={3} sx={{ p: 2, borderRadius: 2, mb: 3 }}>
                    <Typography variant="h5" sx={{ fontWeight: "bold", mb: 1 }}>
                        Lessons
                    </Typography>
                    <Typography variant="body2" sx={{ mb: 2 }}>
                        Build your course by adding lessons. Drag and drop to reorder.
                    </Typography>

                    {lessons.length === 0 && (
                        <Box
                            sx={{
                                border: "1px dashed #ccc",
                                p: 3,
                                textAlign: "center",
                                borderRadius: 1,
                                mb: 2,
                            }}
                        >
                            No lessons yet. Start by adding your first lesson.
                        </Box>
                    )}

                    <DndProvider backend={HTML5Backend}>
                        {lessons.map((lesson, index) => (
                            <LessonCard
                                key={lesson.id}
                                lesson={lesson}
                                index={index}
                                moveLesson={moveLesson}
                                deleteLesson={handleDeleteLesson}
                                handleLessonChange={handleLessonChange}
                                placeholderIndex={placeholderIndex}
                                setPlaceholderIndex={setPlaceholderIndex}
                            />
                        ))}
                    </DndProvider>

                    <Box sx={{ display: "flex", gap: 2, mt: 2 }}>
                        <TextField
                            select
                            label="Lesson Type"
                            value={newLessonType}
                            onChange={(e) =>
                                setNewLessonType(e.target.value as Lesson["type"])
                            }
                            sx={{ width: 200 }}
                        >
                            <MenuItem value="Paragraph">Paragraph</MenuItem>
                            <MenuItem value="Quiz">Quiz</MenuItem>
                        </TextField>
                        <Button variant="contained" onClick={handleAddLesson}>
                            ➕ Add Lesson
                        </Button>
                    </Box>
                </Paper>

                <Button
                    variant="contained"
                    color="primary"
                    size="large"
                    fullWidth
                    sx={{
                        mt: 3,
                        mb: 5,
                        borderRadius: 2,
                        textTransform: "none",
                        fontSize: "1.1rem",
                        fontWeight: "bold",
                    }}
                    disabled={isPublishDisabled}
                    onClick={() => {
                        console.log("Publishing course:", {
                            title,
                            description,
                            lessons,
                        });
                    }}
                >
                    🚀 Publish Course
                </Button>
            </Container>
        </Box>
    );
};

export default Create;
