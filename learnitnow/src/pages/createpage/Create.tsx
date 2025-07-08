// external dependencies
import { useState } from "react";
import { Typography, Box, TextField, Button, MenuItem, Paper, Container, Toolbar, IconButton, } from "@mui/material";
import { DndProvider, useDrag, useDrop, } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

// internal dependencies
import CustomAppBar from "../../components/CustomAppbar";

// icon dependencies
import { Delete, DragIndicator } from "@mui/icons-material";

// Define the Lesson type
type Lesson = {
    id: string;
    type: "Paragraph" | "Quiz";
    title: string;
    content: string;
};

// Each lesson is represented by a LessonCard component
const LessonCard = ({
    lesson,
    index,
    moveLesson,
    deleteLesson,
    handleLessonChange,
    placeholderIndex,
    setPlaceholderIndex,
}: {
    lesson: Lesson;
    index: number;
    moveLesson: (dragIndex: number, hoverIndex: number) => void;
    deleteLesson: (id: string) => void;
    handleLessonChange: (
        id: string,
        field: keyof Omit<Lesson, "id" | "type">,
        value: string
    ) => void;
    placeholderIndex: number | null;
    setPlaceholderIndex: (index: number | null) => void;
}) => {
    const [isRemoving, setIsRemoving] = useState(false);

    const [{ isDragging }, drag, dragPreview] = useDrag({
        type: "lesson",
        item: { index },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    });

    const [, drop] = useDrop({
        accept: "lesson",
        hover(item: { index: number }, monitor) {
            if (!monitor.isOver({ shallow: true })) {
                setPlaceholderIndex(null);
                return;
            }
            if (item.index !== index) {
                setPlaceholderIndex(index);
            }
        },
        drop(item: { index: number }) {
            if (item.index !== index) {
                moveLesson(item.index, index);
            }
            setPlaceholderIndex(null);
        },
    });

    const handleDelete = () => {
        setIsRemoving(true);
        setTimeout(() => deleteLesson(lesson.id), 300);
    };

    return (
        <Box>
            <Paper
                ref={(node) => dragPreview(drop(node))}
                sx={{
                    p: 2,
                    mb: 2,
                    backgroundColor: isDragging ? "#e0e0e0" : "#f9f9f9",
                    border: placeholderIndex === index ? "2px dashed #1976d2" : "none",
                    opacity: isRemoving ? 0 : isDragging ? 0.5 : 1,
                    transform: isRemoving ? "scale(0.95)" : "scale(1)",
                    transition: "all 0.3s ease",
                    borderRadius: 1,
                    display: "flex",
                    flexDirection: "column",
                }}
            >
                <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                    {/* Drag Handle */}
                    <IconButton
                        ref={drag}
                        sx={{ cursor: "grab", mr: 1 }}
                    >
                        <DragIndicator />
                    </IconButton>

                    <Typography variant="subtitle1" sx={{ flexGrow: 1 }}>
                        Lesson {index + 1}: {lesson.type}
                    </Typography>

                    <IconButton onClick={handleDelete}>
                        <Delete />
                    </IconButton>
                </Box>

                <TextField
                    variant="outlined"
                    fullWidth
                    label="Lesson Title"
                    value={lesson.title}
                    onChange={(e) =>
                        handleLessonChange(
                            lesson.id,
                            "title",
                            e.target.value.slice(0, 50)
                        )
                    }
                    helperText={`${lesson.title.length}/50 characters`}
                    sx={{ mb: 2 }}
                />
                <TextField
                    variant="outlined"
                    fullWidth
                    multiline
                    rows={4}
                    label="Lesson Content"
                    value={lesson.content}
                    onChange={(e) =>
                        handleLessonChange(
                            lesson.id,
                            "content",
                            e.target.value.slice(0, 500)
                        )
                    }
                    helperText={`${lesson.content.length}/500 characters`}
                />
            </Paper>
        </Box>
    );
};


function Create() {
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
        setLessons([...lessons, newLesson]);
    };

    const handleDeleteLesson = (id: string) => {
        setLessons(lessons.filter((lesson) => lesson.id !== id));
    };

    const handleLessonChange = (
        id: string,
        field: keyof Omit<Lesson, "id" | "type">,
        value: string
    ) => {
        setLessons(
            lessons.map((lesson) =>
                lesson.id === id ? { ...lesson, [field]: value } : lesson
            )
        );
    };

    const moveLesson = (dragIndex: number, hoverIndex: number) => {
        const updatedLessons = [...lessons];
        const [removed] = updatedLessons.splice(dragIndex, 1);
        updatedLessons.splice(hoverIndex, 0, removed);
        setLessons(updatedLessons);
    };

    return (
        <Box>
            <CustomAppBar />
            <Toolbar />
            <Container>
                <Box>
                    <Typography variant="h4" sx={{ fontWeight: "bold", mb: 1 }}>
                        Create Your Course!
                    </Typography>
                    <Typography variant="subtitle1" sx={{ mb: 2 }}>
                        Share your knowledge and expertise with the world. Start building your course now!
                    </Typography>
                </Box>

                {/* Course Details */}
                <Paper elevation={3} sx={{ p: 2, borderRadius: 2, mb: 3 }}>
                    <Typography variant="h5" sx={{ fontWeight: "bold", mb: 1 }}>
                        Course Details
                    </Typography>
                    <Typography variant="body2" sx={{ mb: 2 }}>
                        Provide the essential information about your course.
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
                        Build your course by adding lessons. Drag and drop to reorder them.
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
                            Your course has no lessons yet. Start by adding your first lesson.
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
                        mb: 5, // add bottom margin so it’s not glued to the screen edge
                        borderRadius: 2,
                        textTransform: "none",
                        fontSize: "1.1rem",
                        fontWeight: "bold",
                    }}
                    onClick={() => {
                        // TODO: Replace this with your publish logic
                        console.log("Publishing course:", {
                            title,
                            description,
                            lessons,
                        });
                    }}
                    disabled={title.trim() === "" || description.trim() === "" || lessons.length < 1}
                >
                    🚀 Publish Course
                </Button>
            </Container>
        </Box>
    );
}

export default Create;
