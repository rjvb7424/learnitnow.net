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
    IconButton,
} from "@mui/material";
import { Delete } from "@mui/icons-material";
import CustomAppBar from "../../components/CustomAppbar";
import {
    DndProvider,
    useDrag,
    useDrop,
} from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

type Lesson = {
    id: string;
    type: "Paragraph" | "Quiz";
    title: string;
    content: string;
};

const LessonCard = ({
    lesson,
    index,
    moveLesson,
    deleteLesson,
    handleLessonChange,
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
}) => {
    const [{ isDragging }, drag] = useDrag({
        type: "lesson",
        item: { index },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    });

    const [, drop] = useDrop({
        accept: "lesson",
        hover(item: { index: number }) {
            if (item.index !== index) {
                moveLesson(item.index, index);
                item.index = index;
            }
        },
    });

    return (
        <Box>
            <Paper
            ref={(node) => drag(drop(node))}
            sx={{
                p: 2,
                mb: 2,
                backgroundColor: isDragging ? "#e0e0e0" : "#f9f9f9",
                borderRadius: 1,
                opacity: isDragging ? 0.5 : 1,
            }}
        >
            <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                <Typography variant="subtitle1">
                    Lesson {index + 1}: {lesson.type}
                </Typography>
                <IconButton
                    onClick={() => deleteLesson(lesson.id)}
                    sx={{ ml: "auto" }}
                >
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
            </Container>
        </Box>
    );
}

export default Create;
