// Import React and useState hook
import React, { useState } from "react";

// Define the props type for the Story component
interface StoryProps {
    // The genre prop is a string that represents the genre chosen by the user
    genre: string;
    // The character prop is a string that represents the character chosen or created by the user
    character: string;
    // The plot prop is a string that represents the plot chosen or created by the user
    plot: string;
}


const StoryParameters = () => {

    const [maxTokens, setMaxTokens] = useState(200);
    const [temperature, setTemperature] = useState(0.9);

    return (
        <div>
            <label>
                Max Tokens:
                <input
                    type="number"
                    value={maxTokens}
                    onChange={e => setMaxTokens(e.target.value)}
                />
            </label>

            <label>
                Temperature:
                <input
                    type="number"
                    step="0.1"
                    value={temperature}
                    onChange={e => setTemperature(e.target.value)}
                />
            </label>

            <button
                onClick={() => {
                    // Pass params to API
                }}
            >
                Generate Story
            </button>
        </div>
    )

}


// Define the Story component
const Story: React.FC<StoryProps> = ({ genre, character, plot }) => {
    // Define a local state for the story content
    const [story, setStory] = useState("");

    // Define a local state for the story options
    const [options, setOptions] = useState<string[]>([]);

    // Define a local state for the story prompt
    const [prompt, setPrompt] = useState("");

    // Define a local state for the story loading status
    const [loading, setLoading] = useState(false);

    const [feedback, setFeedback] = useState('');

    // Define a handler function for the story generation
    const handleStoryGeneration = async () => {
        // Set the loading state to true
        setLoading(true);
        // Set the story state to an empty string
        setStory("");
        // Set the options state to an empty array
        setOptions([]);
        // Set the prompt state to a string that combines the genre, character, and plot props
        setPrompt(`Genre: ${genre}\nCharacter: ${character}\nPlot: ${plot}\n`);
        // Call the GPT-4 API to generate story content based on the prompt state
        const response = await fetch(
            `https://api.gpt-4.com/text-completions?prompt=${encodeURIComponent(
                prompt
            )}&max_tokens=200&temperature=0.9&top_p=0.9&frequency_penalty=0.5&presence_penalty=0.5&stop=END`
        );
        const data = await response.json();
        // Set the story state to the text property of the data object
        setStory(data.text);
        // Set the options state to the choices property of the data object
        setOptions(data.choices);
        // Set the loading state to false
        setLoading(false);

        try {
            await storyApi.createStory({
                genre,
                character,
                plot,
                content: story,
                options
            });
            console.log('Story saved successfully');
        } catch (err) {
            console.error('Error saving story', err);
        }
    };

    // Define a handler function for the story continuation
    const handleStoryContinuation = async (option: string) => {
        // Set the loading state to true
        setLoading(true);
        // Append the option parameter to the story state
        setStory(story + option);
        // Append the option parameter to the prompt state
        setPrompt(prompt + option);
        // Call the GPT-4 API to generate story content based on the prompt state
        const response = await fetch(
            `https://api.gpt-4.com/text-completions?prompt=${encodeURIComponent(
                prompt
            )}&max_tokens=200&temperature=0.9&top_p=0.9&frequency_penalty=0.5&presence_penalty=0.5&stop=END`
        );
        const data = await response.json();
        // Set the story state to the text property of the data object
        setStory(data.text);
        // Set the options state to the choices property of the data object
        setOptions(data.choices);
        // Set the loading state to false
        setLoading(false);
    };

    // Define a handler function for the story ending
    const handleStoryEnding = () => {
        // Set the options state to an empty array
        setOptions([]);
    };

    // Define a handler function for the story saving
    const handleStorySaving = () => {
        // Save the story state to a local storage or a database using your preferred method
    };

    // Define a handler function for the story sharing
    const handleStorySharing = () => {
        // Share the story state to a social media or a platform using your preferred method
    };

    // Define a handler function for the story restarting
    const handleStoryRestarting = () => {
        // Set the story state to an empty string
        setStory("");
        // Set the options state to an empty array
        setOptions([]);
        // Set the prompt state to an empty string
        setPrompt("");
    };

    // New handler for feedback change
    const handleFeedbackChange = (event) => {
        setFeedback(event.target.value);
    }

    // New handler for feedback submit
    const handleFeedbackSubmit = async () => {

        // Call API to save feedback 
        try {
            await storyApi.createFeedback({
                storyId: story._id,
                feedback
            });

            // Clear feedback
            setFeedback('');

            console.log('Feedback submitted!');

        } catch (err) {
            console.error('Error submitting feedback', err);
        }
    }

    // Return the JSX element for the Story component
    return (
        <div className="story">
            <h2>Your story</h2>
            <p>
                Based on your genre, character, and plot, here is a possible story that you can read and interact with.
            </p>
            <StoryParameters />
            <div className="story-content">
                {loading ? (
                    <p>Loading...</p>
                ) : (
                    <textarea readOnly value={story} />
                )}
            </div>
            <div className="story-options">
                {options.map((o) => (
                    <button
                        key={o}
                        className="story-option"
                        onClick={() => handleStoryContinuation(o)}
                    >
                        {o}
                    </button>
                ))}
            </div>
            <div className="story-actions">
                <button className="story-action" onClick={handleStoryEnding}>
                    End
                </button>
                <button className="story-action" onClick={handleStorySaving}>
                    Save
                </button>
                <button className="story-action" onClick={handleStorySharing}>
                    Share
                </button>
                <button className="story-action" onClick={handleStoryRestarting}>
                    Restart
                </button>
            </div>
            <form onSubmit={handleFeedbackSubmit}>

                <textarea
                    value={feedback}
                    onChange={handleFeedbackChange}
                    placeholder="Enter feedback on the story"
                />

                <button type="submit">Submit Feedback</button>

            </form>
        </div>

    );
};

// Export the Story component
export default Story;
