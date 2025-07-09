// external dependencies
import React, { useRef } from "react";
import { Box, Typography } from "@mui/material";

// props type definition for ThumbnailUploader component
type Props = {
    thumbnail: string | null;
    setThumbnail: (thumbnail: string | null) => void;
};

// ThumbnailUploader component
// This component allows users to upload a thumbnail image for their course
const ThumbnailUploader: React.FC<Props> = ({ thumbnail, setThumbnail }) => {
    const fileInputRef = useRef<HTMLInputElement>(null);
    // Function to handle thumbnail upload
    // It reads the selected file and sets the thumbnail state with the file's data URL
    const handleThumbnailUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        // if file is not selected, do nothing
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => setThumbnail(reader.result as string);
            reader.readAsDataURL(file);
        }
    };

    return (
        <Box>
            {/* Box for course thumbnail upload */}
            <Box
                sx={{
                    position: "relative",
                    maxWidth: "50%",
                    border: "2px dashed #ccc",
                    borderRadius: 2,
                    overflow: "hidden",
                    mx: "auto",
                    mb: 3,
                    cursor: "pointer",
                    aspectRatio: "16 / 9",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    backgroundImage: thumbnail
                        ? `url(${thumbnail})`
                        : "url('https://via.placeholder.com/600x400?text=Upload+Thumbnail')",}}
                onClick={() => fileInputRef.current?.click()}>
                {/* Overlay text */}
                {!thumbnail && (
                    <Typography
                        sx={{
                            position: "absolute",
                            top: "50%",
                            left: "50%",
                            transform: "translate(-50%, -50%)",
                            color: "#999",
                        }}>
                        Click to upload your thumbnail.
                    </Typography>
                )}
            </Box>
            {/* Hidden file input for thumbnail upload */}
            <input
                type="file"
                accept="image/*"
                style={{ display: "none" }}
                ref={fileInputRef}
                onChange={handleThumbnailUpload}/>
        </Box>
    );
};

export default ThumbnailUploader;
