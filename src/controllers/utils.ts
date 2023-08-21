// Import Express library and NextFunction type
import express, { NextFunction } from "express";
// Import the Story model from the models folder
import Story from "./models/Story";
// Import some modules for authentication and validation
import jwt from "jsonwebtoken";
import Joi from "joi";

// Define a function to validate the story data using Joi
export function validateStory(
    req: express.Request,
    res: express.Response,
    next: NextFunction
) {
    // Define a schema for the story data
    const schema = Joi.object({
        title: Joi.string().required(),
        content: Joi.string().required(),
        author: Joi.string().required(),
    });

    // Validate the request body against the schema
    const { error } = schema.validate(req.body);

    // If there is an error, send a 400 response with the error message
    if (error) {
        return res.status(400).json({ message: error.details[0].message });
    }

    // Otherwise, proceed to the next handler
    next();
}

// Define a function to check the authentication of the user using JWT
export function authenticateUser(
    req: express.Request,
    res: express.Response,
    next: NextFunction
) {
    // Get the authorization header from the request
    const authHeader = req.headers["authorization"];

    // If there is no authorization header, send a 401 response with an error message
    if (!authHeader) {
        return res.status(401).json({ message: "No authorization header" });
    }

    // Extract the token from the authorization header
    const token = authHeader.split(" ")[1];

    // If there is no token, send a 401 response with an error message
    if (!token) {
        return res.status(401).json({ message: "No token provided" });
    }

    // Verify the token using a secret key
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        // If there is an error, send a 401 response with the error message
        if (err) {
            return res.status(401).json({ message: err.message });
        }

        // Otherwise, set the request user to the decoded payload and proceed to the next handler
        req.user = decoded;
        next();
    });
}

// Define a function to handle errors in Express routes using promises
export function errorHandler(
    err: Error,
    req: express.Request,
    res: express.Response,
    next: NextFunction
) {
    // Log the error to the console
    console.error(err);

    // Send a 500 response with the error message
    res.status(500).json({ message: err.message });
}
