// Import Express library and Router function
import express from "express";
// Create a router object with a prefix of /stories
const router = express.Router({ prefix: "/stories" });

// Import the storyController from the controllers folder
import storyController from "./storyController";

// Import some middleware functions from the utils folder
import { validateStory, authenticateUser, errorHandler } from "./utils";

// Apply the errorHandler middleware to all routes
router.use(errorHandler);

// Define a route for creating a story using the POST method and the / path
router.post("/", validateStory, authenticateUser, storyController.createStory);

// Define a route for reading a story using the GET method and the /:id path
router.get("/:id", storyController.readStory);

// Define a route for updating a story using the PUT method and the /:id path
router.put("/:id", validateStory, authenticateUser, storyController.updateStory);

// Define a route for deleting a story using the DELETE method and the /:id path
router.delete("/:id", authenticateUser, storyController.deleteStory);

// Export the router
export default router;
