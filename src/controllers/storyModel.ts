// Import Mongoose library
import mongoose from "mongoose";

// Define the schema for the story data
const storySchema = new mongoose.Schema({
    // The id property is a string that represents the unique identifier of the story
    id: {
        type: String,
        required: true,
        unique: true,
    },
    // The genre property is a string that represents the genre chosen by the user
    genre: {
        type: String,
        required: true,
    },
    // The character property is a string that represents the character chosen or created by the user
    character: {
        type: String,
        required: true,
    },
    // The plot property is a string that represents the plot chosen or created by the user
    plot: {
        type: String,
        required: true,
    },
    // The content property is a string that represents the story content generated by the GPT-4 API
    content: {
        type: String,
        required: true,
    },
    // The options property is an array of strings that represents the story options generated by the GPT-4 API
    options: {
        type: [String],
        required: true,
    },
    // The createdAt property is a date that represents the timestamp of when the story was created
    createdAt: {
        type: Date,
        required: true,
        default: Date.now,
    },
});

// Define a function that generates a random id for the story
storySchema.methods.generateId = function () {
    // Use Math.random and Math.floor to generate a random number between 100000 and 999999
    const randomId = Math.floor(Math.random() * (999999 - 100000 + 1)) + 100000;
    // Return the random id as a string
    return randomId.toString();
};

// Define a pre-save hook that assigns a random id to the story before saving it to the database
storySchema.pre("save", function (next) {
    // Assign a random id to the story using the generateId method
    this.id = this.generateId();
    // Call the next middleware function
    next();
});

// Define a model for the story data using the storySchema
const storyModel = mongoose.model("Story", storySchema);

// Export the storyModel
export default storyModel;