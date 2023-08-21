// Import Axios library
import axios from "axios";

// Define the GPT-4 API URL
const GPT4_API_URL = "https://api.openai.com/v1/models";

// Define the GPT-4 API key
const GPT4_API_KEY = process.env.GPT4_API_KEY;

// Define a function that generates story content based on a prompt
export const generateStoryContent = async (prompt: string) => {
    // Define the parameters for the GPT-4 API request
    const params = {
        prompt: prompt, // The prompt is the input for the GPT-4 API
        max_tokens: 200, // The max_tokens is the maximum number of tokens to generate
        temperature: 0.9, // The temperature is the randomness of the generation
        top_p: 0.9, // The top_p is the probability of choosing the most likely token
        frequency_penalty: 0.5, // The frequency_penalty is the penalty for repeating tokens
        presence_penalty: 0.5, // The presence_penalty is the penalty for using tokens that are already in the prompt
        stop: "END", // The stop is the token that indicates the end of the generation
    };

    // Define the headers for the GPT-4 API request
    const headers = {
        Authorization: `Bearer ${GPT4_API_KEY}`, // The Authorization header is the GPT-4 API key
    };

    // Try to send a GET request to the GPT-4 API with the parameters and headers
    try {
        const response = await axios.get(GPT4_API_URL + "/text-completions", {
            params: params,
            headers: headers,
        });

        // Return the data object from the response
        return response.data;
    } catch (error) {
        // If there is an error, throw it
        throw error;
    }
};
