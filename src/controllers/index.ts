// Import Express library and create an app instance
import express from "express";
const app = express();

// Import the storyRoutes from the routes folder
import storyRoutes from "./storyRoutes";

// Define the port number for the server
const port = 3000;

// Use the storyRoutes as a middleware for the /api path
app.use("/api", storyRoutes);

// Start the server and listen on the port
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
