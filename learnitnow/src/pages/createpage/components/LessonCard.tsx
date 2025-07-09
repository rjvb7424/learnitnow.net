// external dependencies
import { useState } from "react";
import { Typography, Box, TextField, Paper, IconButton } from "@mui/material";
import { useDrag, useDrop } from "react-dnd";

// icon dependencies
import { Delete, DragIndicator } from "@mui/icons-material";

// Types
type Lesson = {
    id: string;
    type: "Paragraph" | "Quiz";
    title: string;
    content: string;
};

type LessonCardProps = {
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
};

const LessonCard = ({
    lesson,
    index,
    moveLesson,
    deleteLesson,
    handleLessonChange,
    placeholderIndex,
    setPlaceholderIndex,
}: LessonCardProps) => {
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
        hover({ index: dragIndex }: { index: number }, monitor) {
            if (monitor.isOver({ shallow: true }) && dragIndex !== index) {
                setPlaceholderIndex(index);
            }
        },
        drop({ index: dragIndex }: { index: number }) {
            if (dragIndex !== index) moveLesson(dragIndex, index);
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
                    <IconButton ref={drag} sx={{ cursor: "grab", mr: 1 }}>
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
                        handleLessonChange(lesson.id, "title", e.target.value.slice(0, 50))
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
                        handleLessonChange(lesson.id, "content", e.target.value.slice(0, 500))
                    }
                    helperText={`${lesson.content.length}/500 characters`}
                />
            </Paper>
        </Box>
    );
};

export default LessonCard;
