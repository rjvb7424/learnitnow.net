// external dependencies
import React, { useState } from "react";
import { Typography, Box, Paper, Checkbox, FormControlLabel, TextField, } from "@mui/material";
import CurrencyInput from "react-currency-input-field";

// internal dependencies
import ThumbnailUploader from "./ThumbnailUploader";

// Define the props for the CourseDetailsForm component
type CourseDetailsFormProps = {
  title: string;
  setTitle: (title: string) => void;
  description: string;
  setDescription: (description: string) => void;
  thumbnail: string | null;
  setThumbnail: (thumbnail: string | null) => void;
  price: number | null;
  setPrice: (price: number | null) => void;
};

// CourseDetailsForm component
// This component allows users to input course details such as title, description, thumbnail, and price
const CourseDetailsForm: React.FC<CourseDetailsFormProps> = ({ title, setTitle, description, 
    setDescription, thumbnail, setThumbnail, price, setPrice, }) => {
    // State to manage whether the course is free or not
    const [isFree, setIsFree] = useState(true);
    // Function to handle the change event for the free checkbox
    const handleFreeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setIsFree(event.target.checked);
        // If the course is marked as free, clear the price
        if (event.target.checked) { setPrice(null);}
    };

    // Function to handle price input changes
    const handlePriceChange = (value: string | undefined) => {
        // IMPORTANT CHANGE HERE:
        // If the value from CurrencyInput is undefined or an empty string,
        // it means the input is empty or has been fully deleted.
        // In this case, set the price to null in your state.
        // Otherwise, parse the value to a number.
        if (value === undefined || value === "") {
            setPrice(null);
        } else {
            setPrice(Number(value));
        }
    };

  return (
    <Box>
      {/* Course Details Paper */}
      <Paper elevation={3} sx={{ p: 3, borderRadius: 2, mb: 3 }}>
        <Typography variant="h5" sx={{ fontWeight: "bold", mb: 1 }}>
          Course Details
        </Typography>
        <Typography variant="body2" sx={{ mb: 3, color: "text.secondary" }}>
          Provide essential information about your course, including its title,
          description, a compelling thumbnail, and pricing.
        </Typography>

        {/* Thumbnail Uploader Component */}
        <ThumbnailUploader thumbnail={thumbnail} setThumbnail={setThumbnail} />

        {/* Course Title Input */}
        <TextField
          variant="outlined"
          fullWidth
          label="Course Title"
          value={title}
          onChange={(e) => setTitle(e.target.value.slice(0, 50))}
          helperText={`${title.length}/50 characters`}
          sx={{ mb: 3 }}/>

        {/* Course Description Input */}
        <TextField
          variant="outlined"
          fullWidth
          multiline
          rows={4}
          label="Course Description"
          value={description}
          onChange={(e) => setDescription(e.target.value.slice(0, 200))}
          helperText={`${description.length}/300 characters`}
          sx={{ mb: 2 }}/>

        {/* Price Selection */}
        <FormControlLabel
        control={
            <Checkbox
                checked={isFree}
                onChange={handleFreeChange}
                color="primary"/>}
            label="Is this course free?"
        sx={{ mb: 2 }}/>
        {/* Conditional Price Input for paid courses */}
        {!isFree && (
            <Box>
                <Box sx={{ mb: 3 }}>
                    <Typography variant="subtitle2" sx={{ mb: 1 }}>
                        Course Price (USD)
                    </Typography>
                    <CurrencyInput
                        placeholder="Enter course price"
                        // CRITICAL CHANGE HERE:
                        // If 'price' is null in your state, pass 'undefined' to CurrencyInput.
                        // CurrencyInput treats 'undefined' as an empty input.
                        // Otherwise, pass the number directly.
                        value={price === null ? undefined : price}
                        prefix="$"
                        onValueChange={handlePriceChange}
                        style={{
                            width: "40%",
                            padding: "12px 12px",
                            border: "1px solid rgba(0, 0, 0, 0.23)",
                            borderRadius: "4px",
                            fontFamily: "Roboto, Helvetica, Arial, sans-serif",
                            fontSize: "1rem",
                        }}
                    />
                </Box>
            </Box>
        )}
      </Paper>
    </Box>
  );
};

export default CourseDetailsForm;