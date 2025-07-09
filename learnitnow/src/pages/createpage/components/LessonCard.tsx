// external dependencies
import { useState, useRef, useEffect, useCallback }from "react";
import { Typography, Box, TextField, Paper, IconButton } from "@mui/material";
import { useDrag, useDrop } from "react-dnd";

// icon dependencies
import { Delete, DragIndicator } from "@mui/icons-material";

// lesson type definition
type Lesson = {
    id: string;
    type: "Paragraph" | "Quiz";
    title: string;
    content: string;
};

// props type definition for LessonCard component
type LessonCardProps = {
    lesson: Lesson;
    // index of the lesson in the list
    index: number;
    // function to move lesson from one index to another
    moveLesson: (dragIndex: number, hoverIndex: number) => void;
    deleteLesson: (id: string) => void;
    // function to handle changes in lesson fields
    handleLessonChange: (
        // id of the lesson to change
        id: string,
        // field to change: "title" or "content"
        field: "title" | "content",
        value: string
    // for now the function does not return anything but could return placeholdeIndex
    ) => void;
    // placeholder index indicates where the lesson is being dragged to
    placeholderIndex: number | null;
    setPlaceholderIndex: (index: number | null) => void;
};

// LessonCard component
// Displays a single lesson card with drag-and-drop functionality
// Allows reordering lessons, editing title and content, and deleting lessons
const LessonCard = ({ lesson, index, moveLesson, deleteLesson, handleLessonChange,  
    placeholderIndex, setPlaceholderIndex, }: LessonCardProps) => {
    // State to manage removing animation
    const [isRemoving, setIsRemoving] = useState(false);
    // Ref to the Paper component for drag-and-drop
    const paperRef = useRef<HTMLDivElement>(null);

    // useDrag hook to make the component draggable
    const [{ isDragging }, drag, dragPreview] = useDrag({
        type: "lesson",
        item: { index },
        collect: (monitor) => ({ isDragging: monitor.isDragging(), }),
        end: () => {
            // Clear placeholder on drag end
            setPlaceholderIndex(null);
        },
    });

    // useDrop hook to make the component a drop target
    const [{ isOver }, drop] = useDrop({
        accept: "lesson",
        collect: (monitor) => ({ isOver: monitor.isOver(), }),
        hover: ({ index: dragIndex }: { index: number }) => {
            // If the item is being dragged over itself, do nothing
            if (dragIndex !== index && placeholderIndex !== index) {
                setPlaceholderIndex(index);
            }
        },
        drop: ({ index: dragIndex }: { index: number }) => {
            // If the item is dropped on a different index, move it
            if (dragIndex !== index) { moveLesson(dragIndex, index); }
            // Clear placeholder index after drop
            setPlaceholderIndex(null);
        },
    });

    // Combine refs: drag + drop + Paper
    useEffect(() => {
        if (paperRef.current) { dragPreview(drop(paperRef.current));}
    }, [dragPreview, drop]);

    // Clear placeholder if we exit drop zone
    useEffect(() => {
        if (!isOver) { setPlaceholderIndex(null); }
    }, [isOver, setPlaceholderIndex]);

    // Handle delete action with a delay for animation
    const handleDelete = () => {
        setIsRemoving(true);
        setTimeout(() => deleteLesson(lesson.id), 300);
    };

    // Set the drag ref to the Paper component
    const setDragRef = useCallback(
        (node: HTMLDivElement | null) => {
            // If node is not null, set it as the drag target
            if (node) drag(node);
        }, [drag]
    );

    return (
        <Box>
            {/* Paper component for the lesson card */}
            <Paper
                ref={paperRef}
                sx={{
                    p: 2,
                    mb: 2,
                    backgroundColor: isDragging ? "#e0e0e0" : "#f9f9f9",
                    border: placeholderIndex === index ? "2px dashed" : "1px solid transparent",
                    borderColor: placeholderIndex === index ? "primary.main" : "transparent",
                    opacity: isRemoving ? 0 : isDragging ? 0.5 : 1,
                    transform: isRemoving ? "scale(0.95)" : "scale(1)",
                    transition: "all 0.3s ease",
                    borderRadius: 1,
                    display: "flex",
                    flexDirection: "column",
                }}>
                    {/* LessonCard header */}
                    <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                        <div
                            ref={setDragRef}
                            style={{ display: "flex", alignItems: "center", marginRight: 1 }}>
                            <IconButton sx={{ cursor: "grab" }}>
                                <DragIndicator />
                            </IconButton>
                        </div>
                        <Typography variant="subtitle1" sx={{ flexGrow: 1, display: "flex", gap: 1 }}>
                            <Box component="span" sx={{ fontWeight: "bold" }}>
                                Lesson {index + 1}:
                            </Box>
                            <Box component="span">{lesson.type}</Box>
                        </Typography>
                        <IconButton onClick={handleDelete} color="error">
                            <Delete />
                        </IconButton>
                    </Box>

                {/* Text fields for lesson title */}
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
                        )}
                    helperText={`${lesson.title.length}/50 characters`}
                    sx={{ mb: 2 }}/>
                {/* Text fields for lesson content */}
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
                        )}
                    helperText={`${lesson.content.length}/500 characters`}/>
            </Paper>
        </Box>
    );
};

export default LessonCard;
