// Import the storyModel from the models folder
import storyModel from "./storyModel";
import express from "express";

// Define a function that creates a story and saves it to the database
export const createStory = async (req: express.Request, res: express.Response) => {
    // Get the genre, character, plot, content, and options from the request body
    const { genre, character, plot, content, options } = req.body;

    // Try to create a new story using the storyModel and the request body
    try {
        const newStory = await storyModel.create({
            genre,
            character,
            plot,
            content,
            options,
        });

        // Send a success response with the new story
        res.status(201).json({
            message: "Story created successfully",
            data: newStory,
        });
    } catch (error) {
        // If there is an error, send an error response with the error message
        res.status(500).json({
            message: "Story creation failed",
            error: error.message,
        });
    }
};

// Define a function that reads a story and returns it from the database
export const readStory = async (req: express.Request, res: express.Response) => {
    // Get the id from the request parameters
    const { id } = req.params;

    // Try to find a story by id using the storyModel
    try {
        const story = await storyModel.findById(id);

        // If the story exists, send a success response with the story
        if (story) {
            res.status(200).json({
                message: "Story found successfully",
                data: story,
            });
        } else {
            // If the story does not exist, send a not found response with a message
            res.status(404).json({
                message: "Story not found",
            });
        }
    } catch (error) {
        // If there is an error, send an error response with the error message
        res.status(500).json({
            message: "Story retrieval failed",
            error: error.message,
        });
    }
};

// Define a function that updates a story and saves it to the database
export const updateStory = async (req: express.Request, res: express.Response) => {
    // Get the id from the request parameters
    const { id } = req.params;

    // Get the content and options from the request body
    const { content, options } = req.body;

    // Try to find and update a story by id using the storyModel and the request body
    try {
        const updatedStory = await storyModel.findByIdAndUpdate(
            id,
            { content, options },
            { new: true }
        );

        // If the updated story exists, send a success response with the updated story
        if (updatedStory) {
            res.status(200).json({
                message: "Story updated successfully",
                data: updatedStory,
            });
        } else {
            // If the updated story does not exist, send a not found response with a message
            res.status(404).json({
                message: "Story not found",
            });
        }
    } catch (error) {
        // If there is an error, send an error response with the error message
        res.status(500).json({
            message: "Story update failed",
            error: error.message,
        });
    }
};

// Define a function that deletes a story and removes it from the database
export const deleteStory = async (req: express.Request, res: express.Response) => {
    // Get the id from the request parameters
    const { id } = req.params;

    // Try to find and delete a story by id using the storyModel
    try {
        const deletedStory = await storyModel.findByIdAndDelete(id);

        // If the deleted story exists, send a success response with the deleted story
        if (deletedStory) {
            res.status(200).json({
                message: "Story deleted successfully",
                data: deletedStory,
            });
        } else {
            // If the deleted story does not exist, send a not found response with a message
            res.status(404).json({
                message: "Story not found",
            });
        }
    } catch (error) {
        // If there is an error, send an error response with the error message
        res.status(500).json({
            message: "Story deletion failed",
            error: error.message,
        });
    }
};
